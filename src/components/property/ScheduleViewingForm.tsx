"use client";

import { useRef, useState } from "react";

type ScheduleViewingFormProps = {
  propertyId: string;
  title: string;
};

type ScheduleFormState = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type ScheduleFormErrors = Partial<Record<keyof ScheduleFormState, string>>;

const initialState: ScheduleFormState = {
  name: "",
  email: "",
  phone: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

const fieldClassName =
  "w-full rounded-sm border border-[#D9D0BC] bg-white px-4 py-3 text-sm text-[#2C2C2C] shadow-sm outline-none transition-colors focus:border-[#102033] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]";

const labelClassName = "mb-2 block text-sm font-semibold text-[#102033]";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateScheduleForm(form: ScheduleFormState): ScheduleFormErrors {
  const errors: ScheduleFormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!validateEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  }

  if (!form.preferredDate) {
    errors.preferredDate = "Please choose a preferred date.";
  }

  if (!form.preferredTime) {
    errors.preferredTime = "Please choose a preferred time.";
  }

  if (form.message.trim().length < 10) {
    errors.message = "Please add a short note about the viewing.";
  }

  return errors;
}

export default function ScheduleViewingForm({
  propertyId,
  title,
}: ScheduleViewingFormProps) {
  const [formState, setFormState] = useState<ScheduleFormState>(initialState);
  const [errors, setErrors] = useState<ScheduleFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const preferredDateRef = useRef<HTMLInputElement>(null);
  const preferredTimeRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  const focusField = (field: keyof ScheduleFormErrors) => {
    if (field === "name") nameRef.current?.focus();
    if (field === "email") emailRef.current?.focus();
    if (field === "phone") phoneRef.current?.focus();
    if (field === "preferredDate") preferredDateRef.current?.focus();
    if (field === "preferredTime") preferredTimeRef.current?.focus();
    if (field === "message") messageRef.current?.focus();
  };

  const updateField = <K extends keyof ScheduleFormState>(
    key: K,
    value: ScheduleFormState[K]
  ) => {
    setFormState((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSuccessMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateScheduleForm(formState);
    setErrors(nextErrors);

    const firstErrorKey = Object.keys(nextErrors)[0] as
      | keyof ScheduleFormErrors
      | undefined;

    if (firstErrorKey) {
      focusField(firstErrorKey);
      return;
    }

    setFormState(initialState);
    setSuccessMessage(
      `Your viewing request for ${title} has been received.`
    );
    // Focus the live confirmation so the simulated submission is announced after validation passes.
    window.setTimeout(() => successRef.current?.focus(), 0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-sm border border-[#E8DCC4]/70 bg-white p-5 shadow-[0_18px_60px_rgba(16,32,51,0.08)] sm:p-7"
    >
      <input type="hidden" name="propertyId" value={propertyId} />

      <div className="mb-7 rounded-sm border border-[#E8DCC4]/70 bg-[#FAFAF8] px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
          Requested Property
        </p>
        <p className="mt-1 font-semibold text-[#1B2A41]">{title}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="schedule-name" className={labelClassName}>
            Name
          </label>
          <input
            ref={nameRef}
            id="schedule-name"
            name="name"
            type="text"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "schedule-name-error" : undefined}
            className={fieldClassName}
          />
          {errors.name ? (
            <p id="schedule-name-error" className="mt-2 text-sm text-red-700">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="schedule-email" className={labelClassName}>
            Email
          </label>
          <input
            ref={emailRef}
            id="schedule-email"
            name="email"
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={
              errors.email ? "schedule-email-error" : undefined
            }
            className={fieldClassName}
          />
          {errors.email ? (
            <p id="schedule-email-error" className="mt-2 text-sm text-red-700">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="schedule-phone" className={labelClassName}>
            Phone
          </label>
          <input
            ref={phoneRef}
            id="schedule-phone"
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={
              errors.phone ? "schedule-phone-error" : undefined
            }
            className={fieldClassName}
          />
          {errors.phone ? (
            <p id="schedule-phone-error" className="mt-2 text-sm text-red-700">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="schedule-date" className={labelClassName}>
            Preferred Date
          </label>
          <input
            ref={preferredDateRef}
            id="schedule-date"
            name="preferredDate"
            type="date"
            value={formState.preferredDate}
            onChange={(event) =>
              updateField("preferredDate", event.target.value)
            }
            aria-invalid={errors.preferredDate ? "true" : "false"}
            aria-describedby={
              errors.preferredDate ? "schedule-date-error" : undefined
            }
            className={fieldClassName}
          />
          {errors.preferredDate ? (
            <p id="schedule-date-error" className="mt-2 text-sm text-red-700">
              {errors.preferredDate}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="schedule-time" className={labelClassName}>
            Preferred Time
          </label>
          <input
            ref={preferredTimeRef}
            id="schedule-time"
            name="preferredTime"
            type="time"
            value={formState.preferredTime}
            onChange={(event) =>
              updateField("preferredTime", event.target.value)
            }
            aria-invalid={errors.preferredTime ? "true" : "false"}
            aria-describedby={
              errors.preferredTime ? "schedule-time-error" : undefined
            }
            className={fieldClassName}
          />
          {errors.preferredTime ? (
            <p id="schedule-time-error" className="mt-2 text-sm text-red-700">
              {errors.preferredTime}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="schedule-message" className={labelClassName}>
            Message
          </label>
          <textarea
            ref={messageRef}
            id="schedule-message"
            name="message"
            rows={4}
            value={formState.message}
            onChange={(event) => updateField("message", event.target.value)}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={
              errors.message ? "schedule-message-error" : undefined
            }
            className={fieldClassName}
          />
          {errors.message ? (
            <p
              id="schedule-message-error"
              className="mt-2 text-sm text-red-700"
            >
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-[#102033] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#2E4A6B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A41] sm:w-auto"
      >
        Request Viewing
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
