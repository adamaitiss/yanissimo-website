import { SECTION_IDS } from "@/lib/constants";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer id={SECTION_IDS.contact + "-footer"} className="bg-muted py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {year} Yanissimo Yoga</p>
        <p>Самозанятая Ли Яна Игоревна</p>
      </div>
    </footer>
  );
};
