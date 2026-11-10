import express from 'express';
import { Pool } from 'pg';

/**
 * Minimal API for the club's consultation form.
 *
 * Every submitted request is validated here and stored in the `leads` table of
 * the club's PostgreSQL database. Nothing is faked in the browser.
 */

const PORT = Number(process.env.PORT ?? 8000);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? '';

/**
 * Connection settings come either from a single DATABASE_URL or from the
 * discrete PG* variables that the compose stack provides.
 */
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.PGHOST ?? 'db',
      port: Number(process.env.PGPORT ?? 5432),
      user: process.env.PGUSER ?? 'iranzamin',
      password: process.env.PGPASSWORD ?? 'iranzamin_dev',
      database: process.env.PGDATABASE ?? 'iranzamin',
    });

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(express.json({ limit: '16kb' }));

/* Simple per-IP throttle, enough to stop accidental form spam. */
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;

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
    return res.status(429).json({ message: 'تعداد درخواست‌ها زیاد است. لطفاً چند دقیقهٔ دیگر تلاش کنید.' });
  }
  return next();
}

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch {
    res.status(503).json({ ok: false });
  }
});

app.post('/api/leads', rateLimit, async (req, res) => {
  const name = clean(req.body?.name).slice(0, 80);
  const phone = clean(req.body?.phone);
  const goal = clean(req.body?.goal).slice(0, 80);
  const note = clean(req.body?.note).slice(0, 500);

  if (name.length < 3) {
    return res.status(400).json({ message: 'نام و نام خانوادگی را کامل وارد کنید.' });
  }
  if (!/^09\d{9}$/.test(phone)) {
    return res.status(400).json({ message: 'شمارهٔ موبایل معتبر نیست. نمونه: ۰۹۱۲۳۴۵۶۷۸۹' });
  }
  if (!goal) {
    return res.status(400).json({ message: 'هدف تمرینی را انتخاب کنید.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO leads (name, phone, goal, note, source)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [name, phone, goal, note || null, 'website'],
    );
    return res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (error) {
    console.error('[leads] insert failed:', error.message);
    return res.status(500).json({ message: 'ثبت درخواست با خطا مواجه شد. لطفاً دوباره تلاش کنید.' });
  }
});

/* Read-only listing for the club team; disabled unless ADMIN_TOKEN is set. */
app.get('/api/leads', async (req, res) => {
  if (!ADMIN_TOKEN) {
    return res.status(503).json({ message: 'دسترسی مدیریتی تنظیم نشده است.' });
  }
  if (req.get('x-admin-token') !== ADMIN_TOKEN) {
    return res.status(401).json({ message: 'دسترسی غیرمجاز.' });
  }
  try {
    const result = await pool.query(
      'SELECT id, name, phone, goal, note, source, created_at FROM leads ORDER BY created_at DESC LIMIT 200',
    );
    return res.json({ ok: true, leads: result.rows });
  } catch (error) {
    console.error('[leads] list failed:', error.message);
    return res.status(500).json({ message: 'خواندن درخواست‌ها ممکن نشد.' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ message: 'مسیر یافت نشد.' });
});

app.use((error, _req, res, _next) => {
  console.error('[api] unhandled error:', error.message);
  res.status(500).json({ message: 'خطای سرور.' });
});

async function ensureSchema(attempt = 1) {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id serial PRIMARY KEY,
        name text NOT NULL,
        phone text NOT NULL,
        goal text NOT NULL,
        note text,
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
