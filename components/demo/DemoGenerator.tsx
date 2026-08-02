'use client';

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import {
  compressImageFile,
  DEMO_TEMPLATES,
  saveDemoPayload,
  type DemoTemplateId,
} from '@/lib/demo-payload';

const MAX_IMAGES = 5;

type FormState = {
  businessName: string;
  phone: string;
  address: string;
  description: string;
  tagline: string;
};

const EMPTY_FORM: FormState = {
  businessName: '',
  phone: '',
  address: '',
  description: '',
  tagline: '',
};

export function DemoGenerator() {
  const [templateId, setTemplateId] = useState<DemoTemplateId>('realtor');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedTemplate = useMemo(
    () => DEMO_TEMPLATES.find((t) => t.id === templateId) ?? DEMO_TEMPLATES[0],
    [templateId],
  );

  const updateField =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setError(null);
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      setError(`You can upload up to ${MAX_IMAGES} images.`);
      event.target.value = '';
      return;
    }

    try {
      const selected = files.slice(0, remaining);
      const compressed = await Promise.all(selected.map(compressImageFile));
      setImages((prev) => [...prev, ...compressed].slice(0, MAX_IMAGES));
      if (files.length > remaining) {
        setError(`Only ${MAX_IMAGES} images are allowed. Extra files were skipped.`);
      }
    } catch {
      setError('Could not process one or more images. Try smaller JPG/PNG files.');
    }

    event.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImages([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.businessName.trim()) {
      setError('Business name is required.');
      return;
    }
    if (!form.phone.trim()) {
      setError('Phone is required.');
      return;
    }
    if (!form.address.trim()) {
      setError('Address is required.');
      return;
    }
    if (!form.description.trim()) {
      setError('Description is required.');
      return;
    }

    setSubmitting(true);
    try {
      saveDemoPayload({
        templateId,
        businessName: form.businessName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        description: form.description.trim(),
        tagline: form.tagline.trim(),
        images,
      });

      const opened = window.open(selectedTemplate.href, '_blank');
      if (!opened) {
        setError('Popup blocked. Allow popups for this site, then try again.');
      }
    } catch {
      setError(
        'Could not save demo data. Images may be too large — try fewer or smaller files.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#e8e6e1]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
        <aside className="border-b border-white/10 px-6 py-8 lg:w-72 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#9a958c]">
            Demo Studio
          </p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight text-white">
            Templates
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#9a958c]">
            Pick a template, fill in the business details, and open a live preview
            in a new tab.
          </p>

          <nav className="mt-8 flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
            {DEMO_TEMPLATES.map((template) => {
              const active = template.id === templateId;
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setTemplateId(template.id)}
                  className={`whitespace-nowrap rounded-md px-4 py-3 text-left text-sm transition-colors ${
                    active
                      ? 'bg-white text-[#0f1115]'
                      : 'text-[#c9c4ba] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {template.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9a958c]">
                Selected
              </p>
              <h2 className="mt-1 text-2xl font-medium tracking-tight text-white">
                {selectedTemplate.label}
              </h2>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-[#9a958c] underline-offset-4 hover:text-white hover:underline"
            >
              Clear form
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Business name" required>
                <input
                  value={form.businessName}
                  onChange={updateField('businessName')}
                  className={inputClass}
                  placeholder="Acme Construction"
                  required
                />
              </Field>
              <Field label="Phone" required>
                <input
                  value={form.phone}
                  onChange={updateField('phone')}
                  className={inputClass}
                  placeholder="(555) 123-4567"
                  required
                />
              </Field>
            </div>

            <Field label="Address" required>
              <input
                value={form.address}
                onChange={updateField('address')}
                className={inputClass}
                placeholder="123 Main St, Los Angeles, CA"
                required
              />
            </Field>

            <Field
              label="Tagline / headline"
              hint="Optional. Use a period, |, or a line break for two headline lines."
            >
              <input
                value={form.tagline}
                onChange={updateField('tagline')}
                className={inputClass}
                placeholder="Built to last. Crafted with care."
              />
            </Field>

            <Field label="Description" required>
              <textarea
                value={form.description}
                onChange={updateField('description')}
                className={`${inputClass} min-h-[120px] resize-y`}
                placeholder="A short description for the hero and about sections."
                required
              />
            </Field>

            <Field
              label="Images"
              hint={`Up to ${MAX_IMAGES}. Compressed in-browser — not stored on a server.`}
            >
              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImages}
                  className="block w-full text-sm text-[#9a958c] file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#0f1115] hover:file:bg-[#e8e6e1]"
                />

                {images.length > 0 ? (
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {images.map((src, index) => (
                      <li key={`${index}-${src.slice(0, 24)}`} className="relative">
                        <img
                          src={src}
                          alt={`Upload ${index + 1}`}
                          className="aspect-square w-full rounded-md object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute right-1.5 top-1.5 rounded bg-black/70 px-2 py-0.5 text-xs text-white"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Field>

            {error ? (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-white px-6 py-3 text-sm font-medium text-[#0f1115] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Preparing…' : 'Open demo in new tab'}
              </button>
              <p className="text-xs text-[#9a958c]">
                Nothing is saved. Close the tab and the demo data is gone.
              </p>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline gap-2 text-sm text-[#c9c4ba]">
        {label}
        {required ? <span className="text-[#9a958c]">*</span> : null}
      </span>
      {children}
      {hint ? <span className="mt-1.5 block text-xs text-[#7a756c]">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  'w-full rounded-md border border-white/10 bg-[#181b21] px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-[#5f5a52] focus:border-white/30';
