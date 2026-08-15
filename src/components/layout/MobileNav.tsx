"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

type MobileNavProps = {
  navLinks: NavLink[];
};

/*
 * MobileNav is a Client Component because menu open/close state and Escape-key handling
 * depend on browser APIs; keeping that logic here lets Header remain a Server Component
 * and avoids pushing client boundaries up into the entire site shell.
 */
export default function MobileNav({ navLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-[#E8DCC4] transition-colors hover:bg-[#3D4F63]/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 top-16 z-40 bg-[#2C2C2C]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
            onClick={closeMenu}
          />
          <nav
            id={menuId}
            aria-label="Mobile navigation"
            className="fixed inset-x-0 top-16 z-50 border-b border-[#E8DCC4]/30 bg-[#1B2A41] px-4 py-6 shadow-lg sm:px-6"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="block rounded-sm px-3 py-3 text-base font-medium text-[#E8DCC4] transition-colors hover:bg-[#3D4F63]/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-[#E8DCC4]/20 pt-6">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="block rounded-sm bg-[#C4A962] px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Schedule a Viewing
              </Link>
            </div>
          </nav>
        </>
      ) : null}
    </div>
  );
}
