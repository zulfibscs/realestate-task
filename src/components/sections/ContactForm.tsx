"use client";

import { useRef, useState } from "react";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormState, string>>;

const initialState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const fieldClassName =
  "w-full rounded-sm border border-[#E8DCC4]/80 bg-white px-3 py-2.5 text-sm text-[#2C2C2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]";

const labelClassName = "mb-1.5 block text-sm font-medium text-[#1B2A41]";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateContactForm(form: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!validateEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  }

  if (form.message.trim().length < 10) {
    errors.message = "Please include a message of at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  const focusField = (field: keyof ContactFormErrors) => {
    if (field === "name") nameRef.current?.focus();
    if (field === "email") emailRef.current?.focus();
    if (field === "phone") phoneRef.current?.focus();
    if (field === "message") messageRef.current?.focus();
  };

  const updateField = <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K]
  ) => {
    setFormState((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSuccessMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateContactForm(formState);
    setErrors(nextErrors);

    const firstErrorKey = Object.keys(nextErrors)[0] as
      | keyof ContactFormErrors
      | undefined;

    if (firstErrorKey) {
      focusField(firstErrorKey);
      return;
    }

    setFormState(initialState);
    setSuccessMessage(
      "Thanks for reaching out. We will follow up with you shortly."
    );
    // Focus the confirmation message so screen reader users hear the simulated success state immediately.
    window.setTimeout(() => successRef.current?.focus(), 0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-sm border border-[#E8DCC4]/60 bg-white p-6"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClassName}>
            Name
          </label>
          <input
            ref={nameRef}
            id="contact-name"
            name="name"
            type="text"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClassName}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-2 text-sm text-red-700">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClassName}>
            Email
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClassName}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-2 text-sm text-red-700">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-phone" className={labelClassName}>
            Phone
          </label>
          <input
            ref={phoneRef}
            id="contact-phone"
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={fieldClassName}
          />
          {errors.phone ? (
            <p id="contact-phone-error" className="mt-2 text-sm text-red-700">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className={labelClassName}>
            Message
          </label>
          <textarea
            ref={messageRef}
            id="contact-message"
            name="message"
            rows={5}
            value={formState.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            className={fieldClassName}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-2 text-sm text-red-700">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center justify-center rounded-sm bg-[#C4A962] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A41]"
      >
        Send Message
      </button>

      {successMessage ? (
        <p
          ref={successRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className="mt-5 rounded-sm border border-[#2D6A4F]/30 bg-[#2D6A4F]/10 px-4 py-3 text-sm font-medium text-[#2D6A4F] focus:outline-none"
        >
          {successMessage}
        </p>
      ) : null}
    </form>
  );
}
