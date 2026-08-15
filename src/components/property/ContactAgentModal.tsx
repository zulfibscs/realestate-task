"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Property } from "@/types/property";

type ContactAgentModalProps = {
  property: Property;
  triggerClassName?: string;
};

const initialForm = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  message: "",
  consent: false,
};

export default function ContactAgentModal({
  property,
  triggerClassName,
}: ContactAgentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const updateField = (
    key: keyof typeof initialForm,
    value: string | boolean
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSuccess(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          triggerClassName ??
          "inline-flex min-h-11 items-center justify-center rounded-sm bg-[#C4A962] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A41]"
        }
      >
        Contact Agent
      </button>

      {isOpen ? (
        <div
          role="presentation"
          className="fixed inset-0 z-[85] flex items-stretch justify-center bg-[#1B2A41]/60 backdrop-blur-[2px] sm:items-center sm:px-6 sm:py-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`contact-agent-${property.id}`}
            className="flex h-full w-full flex-col overflow-hidden bg-white shadow-[0_30px_80px_rgba(27,42,65,0.28)] sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-sm"
          >
            <div className="flex items-center justify-between border-b border-[#E8DCC4]/70 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#E8DCC4]/40">
                  <Image
                    src={property.agent.photo}
                    alt={property.agent.name}
                    fill
                    unoptimized
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2
                    id={`contact-agent-${property.id}`}
                    className="font-serif text-xl font-semibold text-[#1B2A41]"
                  >
                    {property.agent.name}
                  </h2>
                  <p className="text-sm text-[#6B7280]">
                    Walton Dean Realty
                  </p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close contact form"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#1B2A41] hover:bg-[#FAFAF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A41]"
              >
                X
              </button>
            </div>

            <form
              className="flex-1 overflow-y-auto px-5 py-5"
              onSubmit={(event) => {
                event.preventDefault();
                setSuccess(true);
                setForm(initialForm);
              }}
            >
              <p className="mb-5 rounded-sm bg-[#FAFAF8] px-4 py-3 text-sm text-[#3D4F63]">
                I am interested in {property.title}.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <ContactField
                  id={`email-${property.id}`}
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(value) => updateField("email", value)}
                />
                <ContactField
                  id={`phone-${property.id}`}
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                />
                <ContactField
                  id={`first-name-${property.id}`}
                  label="First name"
                  value={form.firstName}
                  onChange={(value) => updateField("firstName", value)}
                />
                <ContactField
                  id={`last-name-${property.id}`}
                  label="Last name"
                  value={form.lastName}
                  onChange={(value) => updateField("lastName", value)}
                />
              </div>

              <label
                htmlFor={`message-${property.id}`}
                className="mt-4 block text-sm font-semibold text-[#1B2A41]"
              >
                Message
              </label>
              <textarea
                id={`message-${property.id}`}
                rows={5}
                maxLength={1000}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                className="mt-2 w-full rounded-sm border border-[#D9D0BC] bg-white px-4 py-3 text-sm text-[#2C2C2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
              />
              <p className="mt-1 text-right text-xs text-[#6B7280]">
                {form.message.length}/1000
              </p>

              <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed text-[#3D4F63]">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(event) =>
                    updateField("consent", event.target.checked)
                  }
                  className="mt-1 h-5 w-5 accent-[#1B2A41]"
                />
                I agree to be contacted by Walton Dean Realty by phone, email,
                or text about this inquiry. Message and data rates may apply.
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#1B2A41] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#3D4F63]"
              >
                Send Message
              </button>

              {success ? (
                <p
                  role="status"
                  className="mt-4 rounded-sm border border-[#2D6A4F]/30 bg-[#2D6A4F]/10 px-4 py-3 text-sm font-medium text-[#2D6A4F]"
                >
                  Message sent. The agent will follow up shortly.
                </p>
              ) : null}
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}

function ContactField({
  id,
  label,
  value,
  type = "text",
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-semibold text-[#1B2A41]">
        {label}
      </span>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-sm border border-[#D9D0BC] bg-white px-4 py-3 text-sm text-[#2C2C2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
      />
    </label>
  );
}
