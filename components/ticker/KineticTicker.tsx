"use client";

import React, { useEffect, useRef } from "react";
import { heroData } from "@/lib/data/homepageContent";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

export default function KineticTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !tickerRef.current || !trackRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const clamp = gsap.utils.clamp(-25, 25);

    const st = ScrollTrigger.create({
      trigger: tickerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const vel = self.getVelocity();
        const nudge = clamp(vel * 0.015);
        gsap.to(trackRef.current, {
          x: `+=${nudge}`,
          ease: "power1.out",
          duration: 0.35,
          overwrite: "auto",
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={tickerRef}
      style={{
        borderTop: "1px solid var(--surface-hairline)",
        borderBottom: "1px solid var(--surface-hairline)",
        backgroundColor: "var(--surface-stone)",
        padding: "16px 0",
        overflow: "hidden",
        position: "relative",
      }}
      id="live-inventory-ribbon"
      aria-label="Commercial Asset Inventory Ticker"
    >
      <div style={{ display: "flex", overflow: "hidden" }}>
        <div ref={trackRef} className="kinetic-ticker-track">
          {[...heroData.liveTicker, ...heroData.liveTicker].map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                padding: "0 28px",
                fontSize: "0.82rem",
                fontFamily: "var(--font-technical)",
                color: "var(--ink-secondary)",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {/* Refined Geometric Delimiter */}
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  backgroundColor: "var(--color-copper)",
                  transform: "rotate(45deg)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
