export type LeadPayload = {
  name: string;
  phone: string;
  goal: string;
  note?: string;
};

export type SubmitResult = { ok: true } | { ok: false; message: string };

const fallbackMessage = 'ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید.';

/**
 * Sends a consultation request to the club's API, which stores it in the
 * club database (see server/). The form is a real submission, not a mock.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/leads', {
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
