'use client';
import { useMemo, useState } from 'react';
import { z } from 'zod';

type Location = 'TW' | 'NL';

export type SignupFormProps = {
  location: Location;
  endpoint?: string; // optional external processor endpoint
};

const baseSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  age: z
    .string()
    .transform((v) => (v.trim() === '' ? NaN : Number(v)))
    .refine((n) => Number.isInteger(n) && n >= 13 && n <= 120, {
      message: 'Age must be an integer between 13 and 120',
    }),
  profession: z.string().min(1, 'Profession is required').max(120),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  instagram: z.string().optional(),
  referral: z.enum(['Instagram', 'Facebook', 'Others']),
  referralOther: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the consent to proceed' }),
  }),
  // honeypot
  website: z.string().optional(),
});

export default function SignupForm({ location, endpoint }: SignupFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<null | 'ok' | 'error'>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    age: '',
    profession: '',
    email: '',
    instagram: '',
    referral: 'Instagram' as 'Instagram' | 'Facebook' | 'Others',
    referralOther: '',
    consent: false,
    website: '', // honeypot
  });

  const schema = useMemo(() =>
    baseSchema.superRefine((data, ctx) => {
      if (data.referral === 'Others') {
        if (!data.referralOther || data.referralOther.trim().length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['referralOther'],
            message: 'Please specify at least 2 characters',
          });
        }
      }
    }),
  []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement & HTMLSelectElement;
    const { name } = target;
    const isCheckbox = (target as HTMLInputElement).type === 'checkbox';
    const nextValue = isCheckbox ? (target as HTMLInputElement).checked : target.value;
    setValues((v) => ({ ...v, [name]: nextValue }));
    // clear field-level error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);

    // validate
    const res = schema.safeParse(values);
    if (!res.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of res.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setSubmitting(false);
      return;
    }

    // honeypot: silently succeed to avoid signaling bots
    if (values.website && values.website.trim().length > 0) {
      setSuccess('ok');
      setSubmitting(false);
      setValues({
        firstName: '', lastName: '', age: '', profession: '', email: '', instagram: '', referral: 'Instagram', referralOther: '', consent: false, website: ''
      });
      return;
    }

    try {
      if (endpoint) {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            location,
            firstName: values.firstName,
            lastName: values.lastName,
            age: Number(values.age),
            profession: values.profession,
            email: values.email,
            instagram: values.instagram || undefined,
            referral: values.referral,
            referralOther: values.referral === 'Others' ? values.referralOther : undefined,
            consent: values.consent,
            timestamp: new Date().toISOString(),
          }),
        });
        if (!resp.ok) throw new Error('Request failed');
      } else {
        // simulate network
        await new Promise((r) => setTimeout(r, 800));
      }

      setSuccess('ok');
      // clear PII from client state after success
      setValues({
        firstName: '', lastName: '', age: '', profession: '', email: '', instagram: '', referral: 'Instagram', referralOther: '', consent: false, website: ''
      });
    } catch (err) {
      setSuccess('error');
    } finally {
      setSubmitting(false);
    }
  };

  const field = (
    id: string,
    label: string,
    input: JSX.Element,
    help?: string
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-white">{label}</label>
      <div className="mt-1">{input}</div>
      <p className="mt-1 text-xs text-red-300" aria-live="polite">{errors[id]}</p>
      {help ? <p className="mt-1 text-xs text-white/70">{help}</p> : null}
    </div>
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6">
      <h3 className="text-lg font-semibold text-white">Sign up — {location === 'TW' ? 'Taiwan' : 'Netherlands'}</h3>
      {success === 'ok' ? (
        <div className="mt-3 rounded-md bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 p-3" role="status" aria-live="polite">
          Thanks! Your registration has been received. We’ll be in touch soon.
        </div>
      ) : success === 'error' ? (
        <div className="mt-3 rounded-md bg-red-500/15 border border-red-400/30 text-red-200 p-3" role="status" aria-live="polite">
          Sorry, something went wrong. Please try again later or email us.
        </div>
      ) : null}
      <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit} noValidate>
        {/* honeypot */}
        <input type="text" name="website" value={values.website} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        {field('firstName', 'First name', (
          <input
            id="firstName" name="firstName" value={values.firstName} onChange={onChange}
            className={`w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ${errors.firstName ? 'ring-red-400' : 'ring-white/20'} focus:ring-2 focus:ring-brand-pink`}
            autoComplete="given-name" aria-invalid={Boolean(errors.firstName)}
          />
        ))}

        {field('lastName', 'Last name', (
          <input
            id="lastName" name="lastName" value={values.lastName} onChange={onChange}
            className={`w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ${errors.lastName ? 'ring-red-400' : 'ring-white/20'} focus:ring-2 focus:ring-brand-pink`}
            autoComplete="family-name" aria-invalid={Boolean(errors.lastName)}
          />
        ))}

        {field('age', 'Age', (
          <input
            id="age" name="age" inputMode="numeric" pattern="[0-9]*" value={values.age} onChange={onChange}
            className={`w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ${errors.age ? 'ring-red-400' : 'ring-white/20'} focus:ring-2 focus:ring-brand-pink`}
            aria-invalid={Boolean(errors.age)}
          />
        ), '13–120')}

        {field('profession', 'Profession', (
          <input
            id="profession" name="profession" value={values.profession} onChange={onChange}
            className={`w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ${errors.profession ? 'ring-red-400' : 'ring-white/20'} focus:ring-2 focus:ring-brand-pink`}
            aria-invalid={Boolean(errors.profession)}
          />
        ))}

        {field('email', 'Email', (
          <input
            id="email" name="email" type="email" value={values.email} onChange={onChange}
            className={`w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ${errors.email ? 'ring-red-400' : 'ring-white/20'} focus:ring-2 focus:ring-brand-pink`}
            autoComplete="email" aria-invalid={Boolean(errors.email)}
          />
        ))}

        {field('instagram', 'Instagram (optional)', (
          <input
            id="instagram" name="instagram" value={values.instagram} onChange={onChange}
            className="w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-brand-pink"
          />
        ))}

        {field('referral', 'How did you hear about us?', (
          <select id="referral" name="referral" value={values.referral} onChange={onChange}
                  className="w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-brand-pink">
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Others</option>
          </select>
        ))}

        {values.referral === 'Others' && field('referralOther', 'Please specify', (
          <input
            id="referralOther" name="referralOther" value={values.referralOther} onChange={onChange}
            className={`w-full rounded-md bg-white/10 px-3 py-2 outline-none ring-1 ${errors.referralOther ? 'ring-red-400' : 'ring-white/20'} focus:ring-2 focus:ring-brand-pink`}
            aria-invalid={Boolean(errors.referralOther)}
          />
        ))}

        <div className="md:col-span-2 flex items-start gap-2">
          <input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={onChange}
                 className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10" aria-invalid={Boolean(errors.consent)} />
          <label htmlFor="consent" className="text-sm text-white/90">
            I agree to receive occasional emails related to Book Digest events and confirm I am 13 years or older.
          </label>
        </div>
        {errors.consent ? <p className="md:col-span-2 text-xs text-red-300" aria-live="polite">{errors.consent}</p> : null}

        <div className="md:col-span-2 mt-2">
          <button type="submit" disabled={submitting}
                  className="inline-flex items-center rounded-full bg-brand-pink text-brand-navy px-5 py-2.5 font-semibold shadow disabled:opacity-60">
            {submitting ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
