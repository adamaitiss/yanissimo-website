"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

type MotionBundle = typeof import("framer-motion");

type AnimatedSectionProps = {
  children: ReactNode;
};

export const AnimatedSection = ({ children }: AnimatedSectionProps) => {
  const [motion, setMotion] = useState<MotionBundle | null>(null);

  useEffect(() => {
    let mounted = true;
    import("framer-motion").then((mod) => {
      if (mounted) {
        setMotion(mod);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!motion) {
    return <div>{children}</div>;
  }

  const { LazyMotion, domAnimation, m } = motion;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        variants={variants}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};
