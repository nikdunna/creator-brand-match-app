"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./loading-spinner";

interface FieldError {
  companyName?: string;
  industry?: string;
  targetAudience?: string;
  creatorCriteria?: string;
}

export function SessionForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<FieldError>({});

  const [form, setForm] = useState({
    companyName: "",
    industry: "",
    targetAudience: "",
    creatorCriteria: "",
  });

  function validate(): boolean {
    const next: FieldError = {};
    if (!form.companyName.trim()) next.companyName = "Company name is required";
    if (!form.industry.trim()) next.industry = "Industry is required";
    if (!form.targetAudience.trim())
      next.targetAudience = "Target audience is required";
    if (!form.creatorCriteria.trim())
      next.creatorCriteria = "Creator criteria is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong");
      }

      const { session } = await res.json();
      router.push(`/sessions/${session.id}`);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong",
      );
      setSubmitting(false);
    }
  }

  if (submitting) {
    return <LoadingSpinner message="Lil' Andy is searching for the perfect creator partners..."/>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <div className="rounded-lg border border-error bg-error/10 px-4 py-3 text-sm text-error">
          {serverError}
        </div>
      )}

      <Field
        label="Company Name"
        name="companyName"
        value={form.companyName}
        onChange={handleChange}
        error={errors.companyName}
        placeholder="What&apos;s your company called? (e.g. Crisp & Crave)"
      />
      <Field
        label="Industry"
        name="industry"
        value={form.industry}
        onChange={handleChange}
        error={errors.industry}
        placeholder="What space are you in? (e.g. fintech, wellness, AI tools)"
      />
      <Field
        label="Target Audience"
        name="targetAudience"
        value={form.targetAudience}
        onChange={handleChange}
        error={errors.targetAudience}
        placeholder="Who are you trying to reach? (e.g. College students who love trying new food spots and sharing on TikTok)"
        multiline
      />
      <Field
        label="What you're looking for in a creator"
        name="creatorCriteria"
        value={form.creatorCriteria}
        onChange={handleChange}
        error={errors.creatorCriteria}
        placeholder="What kind of creator would be a great fit? (e.g. TikTok food reviewers who drive foot traffic and try new spots)"
        multiline
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover hover:cursor-pointer"
      >
        Find Creator Partners
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  multiline = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const shared =
    "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" +
    (error ? " border-error" : " border-border");

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={shared}
        />
      )}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
