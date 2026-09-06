"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Deterministic, privacy-safe preview data. Not imported by product routes.
const COVER_PREVIEW_DATA = {
  plot: { title: "漂流历险", order: 2 },
  children: [
    { label: "波塞冬", color: "#9c3b2e", angle: -60 },
    { label: "独眼巨人岛", color: "#4f7c6b", angle: -15 },
    { label: "傲慢与神罚", color: "#b0842f", angle: 30 },
    { label: "瑟茜", color: "#9c3b2e", angle: 75 },
  ],
};

const INK = "#643631";
const PARCH = "#d7d1b3";
const PARCH_WARM = "#efe0bc";

/** Autonomous 3–5s loop: a plot beat unfolds its people/places/themes. */
export default function CoverPreview() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cycle = () => {
      setOpen(true);
      const t1 = setTimeout(() => setOpen(false), 2600);
      return t1;
    };
    let t1 = cycle();
    const loop = setInterval(() => {
      clearTimeout(t1);
      t1 = cycle();
    }, 4200);
    return () => {
      clearTimeout(t1);
      clearInterval(loop);
    };
  }, []);

  return (
    <div
      className="relative grid h-full min-h-[100dvh] w-full place-items-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 30% 20%, ${PARCH_WARM}, ${PARCH} 70%)`,
      }}
    >
      <div className="relative h-[300px] w-[300px]">
        {/* center plot node */}
        <div
          className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
        >
          <span
            className="relative grid h-16 w-16 place-items-center rounded-full"
            style={{
              background: PARCH_WARM,
              border: `2px solid ${INK}`,
              color: INK,
              boxShadow: "0 6px 16px rgba(58,25,23,.28)",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M12 3.5l2.4 8.5-2.4 8.5-2.4-8.5z" fill="currentColor" />
              <path d="M3.5 12l8.5-2.4 8.5 2.4-8.5 2.4z" fill="currentColor" opacity="0.55" />
            </svg>
            <span
              className="absolute -top-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold"
              style={{ background: INK, color: PARCH_WARM }}
            >
              {COVER_PREVIEW_DATA.plot.order}
            </span>
            <span
              className="absolute -bottom-1 grid h-5 w-5 place-items-center rounded-full text-sm leading-none"
              style={{ background: "#9c3b2e", color: PARCH_WARM }}
            >
              {open ? "−" : "+"}
            </span>
          </span>
          <span className="text-sm font-bold" style={{ color: INK }}>
            {COVER_PREVIEW_DATA.plot.title}
          </span>
        </div>

        {/* children fan out */}
        <AnimatePresence>
          {open &&
            COVER_PREVIEW_DATA.children.map((c, i) => {
              const rad = (c.angle * Math.PI) / 180;
              const R = 118;
              const x = Math.cos(rad) * R;
              const y = Math.sin(rad) * R;
              return (
                <motion.div
                  key={c.label}
                  className="absolute left-1/2 top-1/2 z-0 flex flex-col items-center gap-1"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x, y, scale: 1 }}
                  exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  transition={{ duration: 0.42, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                  style={{ marginLeft: -22, marginTop: -22 }}
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full text-xs font-bold"
                    style={{
                      background: PARCH,
                      border: `2px solid ${c.color}`,
                      color: c.color,
                    }}
                  >
                    ✦
                  </span>
                  <span
                    className="rounded px-1 text-[10px] font-semibold"
                    style={{ color: INK, background: `${PARCH_WARM}cc` }}
                  >
                    {c.label}
                  </span>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* connector lines */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 300 300">
          <AnimatePresence>
            {open &&
              COVER_PREVIEW_DATA.children.map((c) => {
                const rad = (c.angle * Math.PI) / 180;
                const R = 118;
                return (
                  <motion.line
                    key={c.label}
                    x1={150}
                    y1={150}
                    x2={150 + Math.cos(rad) * R}
                    y2={150 + Math.sin(rad) * R}
                    stroke={c.color}
                    strokeWidth={1.4}
                    strokeDasharray="2 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                );
              })}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  );
}
