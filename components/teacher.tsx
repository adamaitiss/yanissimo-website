import Image from "next/image";

import { SECTION_IDS } from "@/lib/constants";
import type { TeacherSection } from "@/lib/content";

export type TeacherProps = {
  section: TeacherSection;
};

export const Teacher = ({ section }: TeacherProps) => {
  return (
    <section
      id={SECTION_IDS.teacher}
      aria-labelledby="teacher-heading"
      className="bg-background py-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-12 px-6 md:flex-row md:px-10">
        <div className="mx-auto flex-shrink-0 overflow-hidden rounded-3xl bg-muted shadow-md md:mx-0">
          <Image
            src={`/images/${section.image}`}
            alt={section.imageAlt}
            width={360}
            height={480}
            className="h-auto w-[260px] object-cover md:w-[300px]"
            priority={false}
          />
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h2
              id="teacher-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-accent"
            >
              {section.title}
            </h2>
            <p className="mt-4 text-2xl font-semibold text-foreground md:text-3xl">
              {section.name}
            </p>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            {section.timeline.map((entry, index) => (
              <li key={index} className="relative pl-5">
                <span className="absolute left-0 top-2 size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {entry}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
