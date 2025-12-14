'use client';
import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

type Location = 'TW' | 'NL';

export type SignupFormProps = {
  location: Location;
  endpoint?: string;
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
  website: z.string().optional(),
});

export default function SignupForm({ location, endpoint }: SignupFormProps) {
  const t = useTranslations('form');
  const tEvents = useTranslations('events');
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
    website: '',
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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);

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
        await new Promise((r) => setTimeout(r, 800));
      }

      setSuccess('ok');
      setValues({
        firstName: '', lastName: '', age: '', profession: '', email: '', instagram: '', referral: 'Instagram', referralOther: '', consent: false, website: ''
      });
    } catch {
      setSuccess('error');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg bg-[#2a3f5f] px-4 py-3 text-white placeholder-white/40 outline-none border-0 focus:ring-2 focus:ring-brand-pink ${hasError ? 'ring-2 ring-red-400' : ''}`;

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-6">
        Sign up — {location === 'TW' ? tEvents('taiwan') : tEvents('netherlands')}
      </h3>

      {success === 'ok' ? (
        <div className="rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 p-4" role="status">
          {t('success')}
        </div>
      ) : success === 'error' ? (
        <div className="rounded-lg bg-red-500/15 border border-red-400/30 text-red-200 p-4" role="status">
          {t('error')}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Honeypot */}
        <input type="text" name="website" value={values.website} onChange={onChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">{t('firstName')}</label>
            <input
              id="firstName" name="firstName" value={values.firstName} onChange={onChange}
              className={inputClass(!!errors.firstName)}
              autoComplete="given-name"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-300">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">{t('lastName')}</label>
            <input
              id="lastName" name="lastName" value={values.lastName} onChange={onChange}
              className={inputClass(!!errors.lastName)}
              autoComplete="family-name"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-300">{errors.lastName}</p>}
          </div>
        </div>

        {/* Age & Profession */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-white mb-2">{t('age')}</label>
            <input
              id="age" name="age" inputMode="numeric" pattern="[0-9]*" value={values.age} onChange={onChange}
              className={inputClass(!!errors.age)}
            />
            <p className="mt-1 text-xs text-white/50">13–120</p>
            {errors.age && <p className="text-xs text-red-300">{errors.age}</p>}
          </div>
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-white mb-2">{t('profession')}</label>
            <input
              id="profession" name="profession" value={values.profession} onChange={onChange}
              className={inputClass(!!errors.profession)}
            />
            {errors.profession && <p className="mt-1 text-xs text-red-300">{errors.profession}</p>}
          </div>
        </div>

        {/* Email & Instagram */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">{t('email')}</label>
            <input
              id="email" name="email" type="email" value={values.email} onChange={onChange}
              className={inputClass(!!errors.email)}
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-white mb-2">{t('instagram')}</label>
            <input
              id="instagram" name="instagram" value={values.instagram} onChange={onChange}
              className={inputClass(false)}
            />
          </div>
        </div>

        {/* Referral */}
        <div>
          <label htmlFor="referral" className="block text-sm font-medium text-white mb-2">{t('referral')}</label>
          <select
            id="referral" name="referral" value={values.referral} onChange={onChange}
            className={`${inputClass(false)} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22white%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.25rem]`}
          >
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {values.referral === 'Others' && (
          <div>
            <label htmlFor="referralOther" className="block text-sm font-medium text-white mb-2">{t('referralOther')}</label>
            <input
              id="referralOther" name="referralOther" value={values.referralOther} onChange={onChange}
              className={inputClass(!!errors.referralOther)}
            />
            {errors.referralOther && <p className="mt-1 text-xs text-red-300">{errors.referralOther}</p>}
          </div>
        )}

        {/* Consent */}
        <div className="flex items-start gap-3 pt-2">
          <input
            id="consent" name="consent" type="checkbox" checked={values.consent} onChange={onChange}
            className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-brand-pink focus:ring-brand-pink"
          />
          <label htmlFor="consent" className="text-sm text-white/80 leading-relaxed">
            I agree to receive occasional emails related to Book Digest events and confirm I am 13 years or older.
          </label>
        </div>
        {errors.consent && <p className="text-xs text-red-300">{errors.consent}</p>}

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center rounded-full bg-brand-pink text-brand-navy px-6 py-2.5 font-semibold shadow hover:brightness-110 transition-all disabled:opacity-60"
          >
            {submitting ? t('submitting') : t('submit')}
          </button>
        </div>
      </form>
    </div>
  );
}
