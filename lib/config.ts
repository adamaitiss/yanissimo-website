import baseConfig from "@/content/config.json";

type BaseConfig = typeof baseConfig;

export type SiteConfig = BaseConfig & {
  form_url: string;
  contact_tg: string;
  whatsapp: string;
};

export const getSiteConfig = (): SiteConfig => {
  return {
    ...baseConfig,
    form_url: process.env.NEXT_PUBLIC_FORM_URL ?? baseConfig.form_url,
    contact_tg: process.env.NEXT_PUBLIC_CONTACT_TG ?? baseConfig.contact_tg,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? baseConfig.whatsapp,
  };
};

export const getPlaceholderMap = (config: SiteConfig) => ({
  DATES: config.dates,
  PRICE_DOUBLE: config.price_double,
  PRICE_SINGLE: config.price_single,
  PAYMENT_POLICY: config.payment_policy,
  YEAR: new Date().getFullYear().toString(),
});
