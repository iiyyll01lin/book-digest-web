'use client';
import { useEffect, useRef, useCallback } from 'react';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

// Accessible modal with focus trap and ESC/overlay close.
export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  
  // Stable reference for onClose to prevent effect re-registration
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  
  const handleClose = useCallback(() => {
    onCloseRef.current();
  }, []);

  // Close on ESC key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  // Focus trap and restore focus
  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = (document.activeElement as HTMLElement) || null;
    const container = dialogRef.current;
    const focusable = container?.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    first?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (!focusable || focusable.length === 0) return;
      if (e.key !== 'Tab') return;
      const list = Array.from(focusable).filter((el) => !el.hasAttribute('disabled'));
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
      // restore focus
      lastActiveRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid place-items-center px-4 py-8 overflow-y-auto">
        <div
          ref={dialogRef}
          className="w-full max-w-lg rounded-2xl bg-brand-navy shadow-2xl border border-white/15"
        >
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 id="modal-title" className="text-xl font-bold text-white">{title}</h2>
              <button
                onClick={handleClose}
                aria-label="Close dialog"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 text-white/90 text-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
