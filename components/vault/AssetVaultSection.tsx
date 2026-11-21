"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { categoryCardsData } from "@/lib/data/homepageContent";
import { assetPath } from "@/lib/utils/basePath";
import { gsap } from "@/lib/animations/gsap";

interface AssetVaultSectionProps {
  onOpenEnquiry: (categoryId: string) => void;
}

// Condensed 1-line high-impact descriptions (User Request: scale down text)
const condensedDescriptions: Record<string, string> = {
  "luxury-fleet": "Premier corporate & executive mobility with comprehensive insurance and dedicated concierge.",
  "construction-warehouse": "Heavy earthmoving, lifting & warehouse machinery for major industrial corridors across India.",
  "it-hardware": "Enterprise servers, workstations & network infrastructure with 3-year OEM ProSupport included.",
};

export default function AssetVaultSection({ onOpenEnquiry }: AssetVaultSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP Staggered Entrance on Scroll
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vault-card-anim",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="asset-vault"
      style={{
        padding: "clamp(72px, 8vw, 120px) 0",
        backgroundColor: "var(--surface-ground)",
        position: "relative",
      }}
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "clamp(36px, 5vw, 56px)",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--surface-hairline)",
          }}
        >
          <div>
            <div className="mono-tag" style={{ marginBottom: "12px" }}>
              01 / THREE SPECIALIZED DIVISIONS
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              The Asset Vault
            </h2>
          </div>

          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--ink-secondary)",
              maxWidth: "460px",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Commercial operating leases across three core verticals with zero capital lock-in.
          </p>
        </div>

        {/* 3 Architectural Asset Specification Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
          className="vault-cards-grid"
        >
          {categoryCardsData.map((cat) => {
            const isHovered = hoveredCard === cat.id;

            // Division-specific signature colors
            const divisionAccent =
              cat.id === "luxury-fleet"
                ? "var(--accent-fleet)"
                : cat.id === "construction-warehouse"
                ? "var(--accent-construction)"
                : "var(--accent-compute)";

            return (
              <div
                key={cat.id}
                className="vault-card-anim card-tactile card-tactile-hover"
                onMouseEnter={() => setHoveredCard(cat.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: "relative",
                  borderRadius: "18px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Division Accent Top Hairline */}
                <div
                  style={{
                    height: "4px",
                    width: "100%",
                    backgroundColor: divisionAccent,
                  }}
                />

                {/* Photographic Window */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "230px",
                    overflow: "hidden",
                    borderBottom: "1px solid var(--surface-hairline)",
                  }}
                >
                  <Image
                    src={assetPath(cat.image)}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{
                      objectFit: "cover",
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />

                  {/* Top Floating Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(0, 0, 0, 0.08)",
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.68rem",
                        color: "var(--ink-primary)",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      {cat.num}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Badge & Subtitle */}
                    <div
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.68rem",
                        color: divisionAccent,
                        letterSpacing: "0.12em",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      {cat.badge}
                    </div>

                    <h3
                      className="font-display"
                      style={{
                        fontSize: "1.7rem",
                        color: "var(--ink-primary)",
                        marginBottom: "10px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {cat.title}
                    </h3>

                    {/* Scaled-Down 1-Line Description */}
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--ink-secondary)",
                        lineHeight: 1.5,
                        marginBottom: "18px",
                        fontWeight: 500,
                      }}
                    >
                      {condensedDescriptions[cat.id] || cat.description}
                    </p>

                    {/* Curated Asset Pill List */}
                    <div style={{ marginBottom: "18px" }}>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-technical)",
                          color: "var(--ink-muted)",
                          letterSpacing: "0.08em",
                          fontWeight: 700,
                          marginBottom: "6px",
                        }}
                      >
                        REPRESENTATIVE FLEET:
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                        }}
                      >
                        {cat.assets.map((asset) => (
                          <span
                            key={asset}
                            style={{
                              padding: "4px 9px",
                              backgroundColor: "var(--surface-stone)",
                              border: "1px solid var(--surface-hairline)",
                              borderRadius: "6px",
                              fontSize: "0.74rem",
                              color: "var(--ink-primary)",
                              fontFamily: "var(--font-technical)",
                              fontWeight: 600,
                            }}
                          >
                            {asset}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Inclusions Checklist */}
                    <div style={{ marginBottom: "20px" }}>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {cat.inclusions.map((inc, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "0.82rem",
                              color: "var(--ink-secondary)",
                            }}
                          >
                            <Check size={14} color="var(--color-copper)" style={{ flexShrink: 0 }} />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Financial Terms Bar & Direct Action */}
                  <div
                    style={{
                      borderTop: "1px solid var(--surface-hairline)",
                      paddingTop: "16px",
                      marginTop: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.25rem",
                          fontWeight: 800,
                          color: "var(--ink-primary)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {cat.startingRate}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-technical)",
                          fontSize: "0.7rem",
                          color: "var(--ink-muted)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Tenure: {cat.typicalTenure}
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenEnquiry(cat.id)}
                      className="btn-pill-primary"
                      style={{
                        padding: "10px 18px",
                        fontSize: "0.82rem",
                        borderRadius: "9999px",
                      }}
                    >
                      <span>Lease {cat.title}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .vault-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
