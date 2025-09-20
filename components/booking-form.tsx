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
      setStatus({ message: "Спасибо! Заявка отправлена.", tone: "success" });
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
      className="bg-muted py-20"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="space-y-4">
          <h2 id="booking-form-heading" className="text-3xl font-semibold text-foreground md:text-4xl">
            Забронировать участие
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            Оставьте заявку — мы подтвердим детали и вернёмся к вам в течение двух дней.
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
          className="mt-10 space-y-6 rounded-3xl border border-border bg-background p-6 shadow-sm md:p-10"
          onSubmit={handleBeforeSubmit}
        >
          <label className="block space-y-2 text-sm font-medium text-muted-foreground">
            <span>Имя</span>
            <input
              type="text"
              name="name"
              required
              placeholder="Ваше имя"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="block space-y-2 text-sm font-medium text-muted-foreground">
            <span>Телефон или ник в Telegram</span>
            <input
              type="text"
              name="contact"
              required
              placeholder="+7… или @username"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-medium text-muted-foreground">
              <span>Номер</span>
              <select
                name="room"
                required
                defaultValue=""
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
              >
                <option value="" disabled>
                  Выберите
                </option>
                <option value="Beachfront">Beachfront</option>
                <option value="Beachside">Beachside</option>
              </select>
            </label>
            <label className="block space-y-2 text-sm font-medium text-muted-foreground">
              <span>Проживание</span>
              <select
                name="occupancy"
                required
                defaultValue=""
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground shadow-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
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
            className="inline-flex w-full items-center justify-center rounded-xl bg-foreground px-6 py-3 text-base font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:bg-foreground/60"
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
    </section>
  );
};
