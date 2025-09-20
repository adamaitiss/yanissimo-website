import type { SiteCopy } from "@/lib/copy";
import type { SiteConfig } from "@/lib/config";
import type { PlaceholderMap } from "@/lib/text";
import { RichText } from "@/components/rich-text";
import { SECTION_IDS } from "@/lib/constants";
import { sourcesList } from "@/lib/sources";

export type SiteFooterProps = {
  content: SiteCopy["footer"];
  replacements: PlaceholderMap;
  config: SiteConfig;
};

export const SiteFooter = ({ content, replacements, config }: SiteFooterProps) => {
  return (
    <footer
      id={SECTION_IDS.footer}
      className="bg-[#0C2C33] px-6 py-16 text-white sm:px-10"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="space-y-3 text-sm text-white/80">
          <p>
            Программа подлежит подтверждению. Стоимость перелёта Мале—Ханимаадху и обратного
            трансфера оплачивается отдельно.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1fr_1fr_1fr]">
          <div className="space-y-2 text-sm text-white/70">
            <RichText text={content.legal} replacements={replacements} />
            <RichText text={content.credit} replacements={replacements} />
          </div>
          <div className="text-sm text-white/70">
            <p className="font-semibold uppercase tracking-wide text-white/80">Контакты</p>
            <ul className="mt-2 space-y-1">
              <li>
                <a
                  href={config.form_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Форма заявки
                </a>
              </li>
              <li>
                <a
                  href={config.contact_tg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={config.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div className="text-sm text-white/70">
            <p className="font-semibold uppercase tracking-wide text-white/80">Источники</p>
            <ul className="mt-2 space-y-1">
              {sourcesList.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    [{source.id}] {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
