import { SECTION_IDS } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";

export type ContactsProps = {
  contact: SiteContent["contact"];
};

const CONTACT_BUTTONS: Array<{
  key: "telegram" | "whatsapp" | "instagram";
  label: string;
}> = [
  { key: "telegram", label: "TELEGRAM" },
  { key: "whatsapp", label: "WA" },
  { key: "instagram", label: "INST" },
];

export const Contacts = ({ contact }: ContactsProps) => {
  return (
    <section
      id={SECTION_IDS.contact}
      className="bg-background py-16"
      aria-labelledby="contacts-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center md:px-10">
        <h2 id="contacts-heading" className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
          Контакты
        </h2>
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          {CONTACT_BUTTONS.map((button) => {
            const href = contact[button.key];
            if (!href) return null;
            return (
              <a
                key={button.key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-border px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-foreground transition hover:border-foreground hover:bg-muted"
              >
                {button.label}
              </a>
            );
          })}
        </div>
        {contact.phone ? (
          <p className="text-sm text-muted-foreground">{contact.phone}</p>
        ) : null}
      </div>
    </section>
  );
};
