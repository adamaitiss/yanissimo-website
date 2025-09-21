"use client";

import { useEffect, useRef, useState } from "react";

import { SECTION_IDS } from "@/lib/constants";

const FORM_ACTION = "https://script.google.com/macros/s/AKfycbzgBUE1CbIdJdzy01unV8aiVlzLjB4M0G_9ZAZKAW9A9QZSG3z-wYolGEmSWPTFjF0P/exec";

type FormStatus = {
  message: string;
  tone: "success" | "error";
} | null;

export const BookingForm = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);
  const submittedFlagRef = useRef(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      if (!submittedFlagRef.current) return;
      submittedFlagRef.current = false;
      setIsSubmitting(false);
      setStatus({ message: "Заявка отправлена, скоро я свяжусь с вами.", tone: "success" });
      formRef.current?.reset();
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, []);

  const handleBeforeSubmit = () => {
    const form = formRef.current;
    if (!form) return;

    const submissionId = (crypto as typeof crypto & { randomUUID?: () => string })?.randomUUID?.() ?? String(Date.now());
    const subIdInput = form.querySelector<HTMLInputElement>('input[name="submission_id"]');
    const sourceInput = form.querySelector<HTMLInputElement>('input[name="source_page"]');

    if (subIdInput) subIdInput.value = submissionId;
    if (sourceInput) sourceInput.value = window.location.href;

    submittedFlagRef.current = true;
    setIsSubmitting(true);
    setStatus(null);
  };

  return (
    <section
      id={SECTION_IDS.bookingForm}
      aria-labelledby="booking-form-heading"
      className="bg-background py-16 md:py-20"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="rounded-[2.75rem] border border-border/50 bg-muted/15 p-8 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm md:p-12">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent/75">Бронирование</p>
            <h2 id="booking-form-heading" className="text-3xl font-semibold text-foreground md:text-4xl">
              Забронировать участие
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Оставьте заявку — я вернусь к вам для подтверждения деталей в течение суток.
            </p>
          </div>
        <iframe
          ref={iframeRef}
          name="booking_iframe"
          title="booking submission receiver"
          style={{ display: "none" }}
          aria-hidden="true"
        />
        <form
          ref={formRef}
          action={FORM_ACTION}
          method="POST"
          target="booking_iframe"
          acceptCharset="utf-8"
          className="mt-10 grid gap-6 rounded-[2rem] border border-border/60 bg-background/95 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] md:mt-12 md:gap-8 md:p-10"
          onSubmit={handleBeforeSubmit}
        >
          <label className="block space-y-2 text-sm font-medium text-foreground/80">
            <span>Имя</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Ваше имя"
              className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-base font-light text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 placeholder:text-foreground/40"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-foreground/80">
            <span>Телефон или ник в Telegram</span>
            <input
              type="text"
              name="contact"
              required
              placeholder="+7… или @username"
              className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-base font-light text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30 placeholder:text-foreground/40"
            />
          </label>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-medium text-foreground/80">
              <span>Номер</span>
              <select
                name="room"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-base font-light text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              >
                <option value="" disabled>
                  Выберите
                </option>
                <option value="Beachfront">Beachfront</option>
                <option value="Beachside">Beachside</option>
              </select>
            </label>
            <label className="block space-y-2 text-sm font-medium text-foreground/80">
              <span>Проживание</span>
              <select
                name="occupancy"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-base font-light text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              >
                <option value="" disabled>
                  Выберите
                </option>
                <option value="Одноместное">Одноместное</option>
                <option value="Двухместное">Двухместное</option>
              </select>
            </label>
          </div>
          <input type="hidden" name="submission_id" />
          <input type="hidden" name="source_page" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-base font-medium tracking-[0.08em] text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:bg-foreground/60"
          >
            {isSubmitting ? "Отправка…" : "Отправить"}
          </button>
          {status ? (
            <p
              className={`text-sm font-medium ${status.tone === "success" ? "text-emerald-600" : "text-red-600"}`}
            >
              {status.message}
            </p>
          ) : null}
        </form>
        </div>
      </div>
    </section>
  );
};
