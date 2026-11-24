import express from 'express';
import { Pool } from 'pg';

/**
 * Contact API for the portfolio.
 *
 * Messages are validated here and stored in the `messages` table of the
 * application database — the form on the site is a real submission.
 */

const PORT = Number(process.env.PORT ?? 8000);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? '';

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.PGHOST ?? 'db',
      port: Number(process.env.PGPORT ?? 5432),
      user: process.env.PGUSER ?? 'postgres',
      password: process.env.PGPASSWORD ?? 'postgres',
      database: process.env.PGDATABASE ?? 'postgres',
    });

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(express.json({ limit: '16kb' }));

/* Simple per-IP throttle, enough to stop accidental form spam. */
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;

function rateLimit(req, res, next) {
  const key = req.ip ?? 'unknown';
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many messages. Please try again in a few minutes.' });
  }
  return next();
}

const clean = (value) => (typeof value === 'string' ? value.trim() : '');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch {
    res.status(503).json({ ok: false });
  }
});

app.post('/api/contact', rateLimit, async (req, res) => {
  const name = clean(req.body?.name).slice(0, 80);
  const email = clean(req.body?.email).slice(0, 160).toLowerCase();
  const message = clean(req.body?.message).slice(0, 2000);
  const source = clean(req.body?.source).slice(0, 40) || 'website';

  if (name.length < 2) {
    return res.status(400).json({ message: 'Please enter your name.' });
  }
  if (!EMAIL.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }
  if (message.length < 10) {
    return res.status(400).json({ message: 'Please add a little more detail to your message.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO messages (name, email, message, source)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, email, message, source],
    );
    return res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (error) {
    console.error('[contact] insert failed:', error.message);
    return res.status(500).json({ message: 'Your message could not be saved. Please try again.' });
  }
});

/* Read-only listing for the site owner; disabled unless ADMIN_TOKEN is set. */
app.get('/api/messages', async (req, res) => {
  if (!ADMIN_TOKEN) {
    return res.status(503).json({ message: 'Admin access is not configured.' });
  }
  if (req.get('x-admin-token') !== ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }
  try {
    const result = await pool.query(
      'SELECT id, name, email, message, source, created_at FROM messages ORDER BY created_at DESC LIMIT 200',
    );
    return res.json({ ok: true, messages: result.rows });
  } catch (error) {
    console.error('[contact] list failed:', error.message);
    return res.status(500).json({ message: 'Could not read messages.' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found.' });
});

app.use((error, _req, res, _next) => {
  console.error('[api] unhandled error:', error.message);
  res.status(500).json({ message: 'Server error.' });
});

async function ensureSchema(attempt = 1) {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id serial PRIMARY KEY,
        name text NOT NULL,
        email text NOT NULL,
        message text NOT NULL,
        source text NOT NULL DEFAULT 'website',
        created_at timestamptz NOT NULL DEFAULT now()
      )
    `);
    console.log('[api] database ready');
  } catch (error) {
    console.error(`[api] database not ready (attempt ${attempt}):`, error.message);
    if (attempt >= 20) process.exit(1);
    setTimeout(() => ensureSchema(attempt + 1), 2000);
  }
}

await ensureSchema();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[api] listening on ${PORT}`);
});
