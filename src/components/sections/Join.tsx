import { useState } from 'react';
import type { FormEvent } from 'react';
import { site, toFa } from '../../data/site';
import { submitLead } from '../../lib/api';
import { IconArrowLeft, IconCheck, IconLock } from '../ui/Icons';
import { Reveal } from '../ui/Reveal';
import { SectionLabel } from '../ui/SectionLabel';
import './Join.css';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Errors = { name?: string; phone?: string };

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/** Accepts Persian/Arabic digits and returns a normalised latin phone number. */
function normalizePhone(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
    .replace(/[\s-]/g, '');
}

const emptyForm = { name: '', phone: '', goal: site.join.goals[0], note: '' };

export function Join() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const validate = (): boolean => {
    const next: Errors = {};
    if (values.name.trim().length < 3) {
      next.name = 'نام و نام خانوادگی را کامل وارد کنید.';
    }
    if (!/^09\d{9}$/.test(normalizePhone(values.phone))) {
      next.phone = 'شمارهٔ موبایل معتبر وارد کنید؛ مثال: ۰۹۱۲۳۴۵۶۷۸۹';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    if (!validate()) return;

    setStatus('sending');
    setErrorMessage('');

    const result = await submitLead({
      name: values.name.trim(),
      phone: normalizePhone(values.phone),
      goal: values.goal,
      note: values.note.trim() ? values.note.trim() : undefined,
    });

    if (result.ok) {
      setSubmittedName(values.name.trim());
      setStatus('success');
      setValues(emptyForm);
      setErrors({});
    } else {
      setStatus('error');
      setErrorMessage(result.message);
    }
  };

  const field = (key: keyof typeof emptyForm, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (key === 'name' || key === 'phone') {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  return (
    <section id="join" className="section join">
      <div className="container join__inner">
        <div className="join__intro">
          <Reveal>
            <SectionLabel index="04">{site.join.label}</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title join__title">{site.join.title}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-lead join__lead">{site.join.lead}</p>
          </Reveal>

          <ol className="join__steps">
            {site.join.steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={200 + index * 80} className="join-step">
                <span className="join-step__index">{toFa(String(index + 1).padStart(2, '0'))}</span>
                <span className="join-step__text">
                  <span className="join-step__title">{step.title}</span>
                  <span className="join-step__desc">{step.text}</span>
                </span>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={440}>
            <p className="join__note">
              <IconLock size={15} />
              {site.join.formNote}
            </p>
          </Reveal>
        </div>

        <Reveal delay={160} className="join__card">
          {status === 'success' ? (
            <div className="join-success" role="status">
              <span className="join-success__icon" aria-hidden="true">
                <IconCheck size={26} />
              </span>
              <h3 className="join-success__title">درخواست شما ثبت شد</h3>
              <p className="join-success__text">
                {submittedName} عزیز، درخواست مشاورهٔ شما در سیستم باشگاه ثبت شد. برای هماهنگی جلسهٔ ارزیابی با شما
                تماس می‌گیریم.
              </p>
              <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
                ارسال درخواست دیگر
              </button>
            </div>
          ) : (
            <form className="join-form" onSubmit={onSubmit} noValidate>
              <div className="join-form__head">
                <h3 className="join-form__title">فرم درخواست مشاوره</h3>
                <p className="join-form__sub">فقط نام و شمارهٔ تماس لازم است.</p>
              </div>

              <div className="join-field">
                <label htmlFor="lead-name">نام و نام خانوادگی</label>
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => field('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'lead-name-error' : undefined}
                  placeholder="مثلاً محمد رضایی"
                  required
                />
                {errors.name && (
                  <p className="join-field__error" id="lead-name-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="join-field">
                <label htmlFor="lead-phone">شمارهٔ تماس</label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  className="join-field__ltr"
                  value={values.phone}
                  onChange={(event) => field('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'lead-phone-error' : 'lead-phone-hint'}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  required
                />
                {errors.phone ? (
                  <p className="join-field__error" id="lead-phone-error">
                    {errors.phone}
                  </p>
                ) : (
                  <p className="join-field__hint" id="lead-phone-hint">
                    شمارهٔ موبایل ۱۱ رقمی با ۰۹ شروع می‌شود.
                  </p>
                )}
              </div>

              <div className="join-field">
                <label htmlFor="lead-goal">هدف تمرینی</label>
                <div className="join-field__select">
                  <select id="lead-goal" name="goal" value={values.goal} onChange={(event) => field('goal', event.target.value)}>
                    {site.join.goals.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                  <span aria-hidden="true">▾</span>
                </div>
              </div>

              <div className="join-field">
                <label htmlFor="lead-note">
                  توضیحات <span className="join-field__optional">(اختیاری)</span>
                </label>
                <textarea
                  id="lead-note"
                  name="note"
                  rows={3}
                  value={values.note}
                  onChange={(event) => field('note', event.target.value)}
                  placeholder="سابقهٔ ورزشی، زمان مناسب برای تماس…"
                />
              </div>

              {status === 'error' && (
                <p className="join-form__error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button type="submit" className="btn btn--primary btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? 'در حال ارسال…' : 'ارسال درخواست مشاوره'}
                <IconArrowLeft size={17} />
              </button>

              <p className="join-form__foot">{site.join.formNote}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
