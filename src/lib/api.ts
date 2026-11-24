export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export type SubmitResult = { ok: true } | { ok: false; message: string };

const fallbackMessage = 'Something went wrong while sending. Please try again.';

/** Posts to the site's own API, which validates and stores the message. */
export async function submitContact(payload: ContactPayload): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = fallbackMessage;
      try {
        const data: unknown = await response.json();
        if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
          message = data.message;
        }
      } catch {
        /* keep the fallback message */
      }
      return { ok: false, message };
    }

    return { ok: true };
  } catch {
    return { ok: false, message: fallbackMessage };
  }
}
