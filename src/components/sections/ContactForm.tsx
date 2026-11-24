import { useRef, useState } from 'react';
import { contact } from '../../data/site';
import { submitContact } from '../../lib/api';
import { Icon } from '../ui/Icon';

type Values = { name: string; email: string; message: string };
type FieldName = keyof Values;
type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: Values = { name: '', email: '', message: '' };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Values) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Please add a little more detail (10+ characters).';
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [notice, setNotice] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === 'error') {
      setStatus('idle');
      setNotice('');
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    const result = await submitContact(values);

    if (result.ok) {
      setStatus('success');
      setValues(EMPTY);
    } else {
      setStatus('error');
      setNotice(result.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="cform cform--done" role="status">
        <span className="cform__check" aria-hidden="true">
          <Icon name="check" size={22} />
        </span>
        <h3 className="cform__done-title">{contact.form.successTitle}</h3>
        <p className="cform__done-text">{contact.form.successText}</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="cform">
      <div className="cform__head">
        <h3 className="cform__title">{contact.form.title}</h3>
        <p className="cform__subtitle">{contact.form.subtitle}</p>
      </div>

      <form className="cform__form" ref={formRef} onSubmit={onSubmit} noValidate>
        <div className="cform__split">
          <div className={`cform__field${errors.name ? ' has-error' : ''}`}>
            <label htmlFor="cf-name">{contact.form.fields.name.label}</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={contact.form.fields.name.placeholder}
              value={values.name}
              onChange={(event) => update('name', event.target.value)}
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={errors.name ? 'cf-name-error' : undefined}
            />
            {errors.name ? (
              <p className="cform__error" id="cf-name-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className={`cform__field${errors.email ? ' has-error' : ''}`}>
            <label htmlFor="cf-email">{contact.form.fields.email.label}</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={contact.form.fields.email.placeholder}
              value={values.email}
              onChange={(event) => update('email', event.target.value)}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'cf-email-error' : undefined}
            />
            {errors.email ? (
              <p className="cform__error" id="cf-email-error">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className={`cform__field${errors.message ? ' has-error' : ''}`}>
          <label htmlFor="cf-message">{contact.form.fields.message.label}</label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            placeholder={contact.form.fields.message.placeholder}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'cf-message-error' : undefined}
          />
          {errors.message ? (
            <p className="cform__error" id="cf-message-error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="cform__foot">
          <button type="submit" className="btn btn--primary cform__submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : contact.form.submit}
            {status === 'sending' ? <span className="cform__spinner" aria-hidden="true" /> : <Icon name="arrow" />}
          </button>
          <p className="cform__privacy">Your details are only used to reply to this message.</p>
        </div>

        <p className="cform__notice" role="alert" aria-live="assertive">
          {status === 'error' ? notice : ''}
        </p>
      </form>
    </div>
  );
}
