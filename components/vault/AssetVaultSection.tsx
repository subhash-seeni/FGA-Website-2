"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Check } from "@phosphor-icons/react";
import { categoryCardsData } from "@/lib/data/homepageContent";
import { assetPath } from "@/lib/utils/basePath";
import { gsap } from "@/lib/animations/gsap";

interface AssetVaultSectionProps {
  onOpenEnquiry: (categoryId: string) => void;
}

const condensedDescriptions: Record<string, string> = {
  "luxury-fleet": "Executive saloons, armoured escorts, and VIP transport deployed with zero capital lock-in.",
  "construction-warehouse": "Heavy excavators, reach stackers, and industrial fleets mobilized across India's logistics corridors.",
  "it-hardware": "Enterprise AI servers, cloud compute racks, and workstations with 3-year OEM ProSupport.",
};

export default function AssetVaultSection({ onOpenEnquiry }: AssetVaultSectionProps) {
  const [activeId, setActiveId] = useState("luxury-fleet");
  const sectionRef = useRef<HTMLElement>(null);
  const featuredCardRef = useRef<HTMLDivElement>(null);

  const activeCategory =
    categoryCardsData.find((cat) => cat.id === activeId) || categoryCardsData[0];
  const otherCategories = categoryCardsData.filter((cat) => cat.id !== activeId);

  // GSAP Entrance
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vault-spread-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
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

  const handleSelectDivision = (id: string) => {
    if (id === activeId) return;
    if (featuredCardRef.current) {
      gsap.fromTo(
        featuredCardRef.current,
        { opacity: 0.75, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
    setActiveId(id);
  };

  const getDivisionAccent = (id: string) => {
    if (id === "luxury-fleet") return "var(--accent-fleet)";
    if (id === "construction-warehouse") return "var(--accent-construction)";
    return "var(--accent-compute)";
  };

  return (
    <section
      ref={sectionRef}
      id="asset-vault"
      style={{
        padding: "clamp(88px, 9vw, 140px) 0",
        backgroundColor: "var(--surface-ground)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost Numeral Background Watermark */}
      <div
        className="ghost-numeral"
        style={{
          top: "20px",
          right: "clamp(20px, 5vw, 80px)",
        }}
      >
        01
      </div>

      <div className="editorial-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "clamp(36px, 4vw, 56px)",
            paddingBottom: "20px",
            borderBottom: "1px solid var(--surface-hairline)",
          }}
        >
          <div>
            <div className="mono-tag" style={{ marginBottom: "10px" }}>
              01 · ASSET VAULT
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
              }}
            >
              Institutional Assets.
              <br />
              Zero Balance Sheet Drag.
            </h2>
          </div>

          <div style={{ maxWidth: "440px" }}>
            <p
              style={{
                fontSize: "1.02rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.5,
                fontWeight: 500,
                marginBottom: "14px",
              }}
            >
              Direct off-balance-sheet deployment across 3 dedicated divisions. Turn depreciating capex into pure operational agility.
            </p>
            {/* Division Selector Buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categoryCardsData.map((cat) => {
                const isSelected = cat.id === activeId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectDivision(cat.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: isSelected ? "1px solid var(--ink-primary)" : "1px solid var(--surface-hairline)",
                      backgroundColor: isSelected ? "var(--ink-primary)" : "var(--surface-card)",
                      color: isSelected ? "#ffffff" : "var(--ink-secondary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Magazine Editorial Spread Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr 0.9fr",
            gap: "clamp(20px, 3vw, 36px)",
            alignItems: "stretch",
          }}
          className="vault-editorial-spread"
        >
          {/* Main Featured Editorial Card (Left Column) */}
          <div
            ref={featuredCardRef}
            className="vault-spread-anim card-tactile"
            style={{
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--surface-hairline)",
            }}
          >
            <div>
              {/* Division Accent Top Line */}
              <div
                style={{
                  height: "4px",
                  width: "100%",
                  backgroundColor: getDivisionAccent(activeCategory.id),
                }}
              />

              {/* Cinematic Featured Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(280px, 32vw, 380px)",
                  overflow: "hidden",
                  borderBottom: "1px solid var(--surface-hairline)",
                }}
              >
                <Image
                  src={assetPath(activeCategory.image)}
                  alt={activeCategory.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 60vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    right: "14px",
                    backgroundColor: "rgba(18, 19, 22, 0.9)",
                    backdropFilter: "blur(8px)",
                    color: "#ffffff",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-xs)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  {activeCategory.startingRate}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "clamp(24px, 3.5vw, 36px)" }}>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.9rem, 2.5vw, 2.4rem)",
                    color: "var(--ink-primary)",
                    marginBottom: "10px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {activeCategory.title}
                </h3>

                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.55,
                    marginBottom: "24px",
                    fontWeight: 500,
                    maxWidth: "580px",
                  }}
                >
                  {condensedDescriptions[activeCategory.id] || activeCategory.description}
                </p>

                {/* Minimal Architectural Ledger Specs */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "12px",
                    padding: "16px",
                    backgroundColor: "var(--surface-stone)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--surface-hairline)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--ink-muted)",
                        display: "block",
                        letterSpacing: "0.06em",
                        marginBottom: "2px",
                      }}
                    >
                      TYPICAL TENURE
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "var(--ink-primary)",
                      }}
                    >
                      {activeCategory.typicalTenure}
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--ink-muted)",
                        display: "block",
                        letterSpacing: "0.06em",
                        marginBottom: "2px",
                      }}
                    >
                      CAPITAL ALLOCATION
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        color: "var(--color-copper)",
                      }}
                    >
                      100% Tax Deductible
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div
              className="vault-footer-bar"
              style={{
                padding: "16px clamp(16px, 3.5vw, 36px)",
                borderTop: "1px solid var(--surface-hairline)",
                backgroundColor: "var(--surface-stone)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-copper)" weight="bold" />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--ink-secondary)",
                    fontWeight: 600,
                  }}
                >
                  Zero Maintenance & Insurance Liability
                </span>
              </div>

              <button
                onClick={() => onOpenEnquiry(activeCategory.id)}
                className="btn-pill-primary vault-cta-btn"
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.86rem",
                }}
              >
                <span className="vault-btn-text-full">Structure {activeCategory.title} Lease</span>
                <span className="vault-btn-text-short">Structure Lease</span>
                <ArrowUpRight size={15} weight="bold" />
              </button>
            </div>
          </div>

          {/* Right Column: Stacked Secondary Division Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {otherCategories.map((cat) => (
              <div
                key={cat.id}
                className="vault-spread-anim card-tactile card-tactile-hover"
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  border: "1px solid var(--surface-hairline)",
                  cursor: "pointer",
                }}
                onClick={() => handleSelectDivision(cat.id)}
              >
                {/* Division Accent Line */}
                <div
                  style={{
                    height: "3px",
                    width: "100%",
                    backgroundColor: getDivisionAccent(cat.id),
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "160px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={assetPath(cat.image)}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      padding: "3px 8px",
                      borderRadius: "var(--radius-xs)",
                      backgroundColor: "rgba(18, 19, 22, 0.85)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {cat.startingRate}
                  </div>
                </div>

                <div
                  style={{
                    padding: "18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <div>
                    <h4
                      className="font-display"
                      style={{
                        fontSize: "1.35rem",
                        color: "var(--ink-primary)",
                        letterSpacing: "-0.02em",
                        marginBottom: "6px",
                      }}
                    >
                      {cat.title}
                    </h4>

                    <p
                      style={{
                        fontSize: "0.86rem",
                        color: "var(--ink-secondary)",
                        lineHeight: 1.45,
                        marginBottom: "12px",
                      }}
                    >
                      {condensedDescriptions[cat.id]}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "12px",
                      borderTop: "1px solid var(--surface-hairline)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.74rem",
                        color: "var(--ink-muted)",
                        fontFamily: "var(--font-mono)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Tenure: {cat.typicalTenure}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEnquiry(cat.id);
                      }}
                      className="btn-pill-secondary"
                      style={{
                        padding: "6px 12px",
                        borderRadius: "var(--radius-xs)",
                        fontSize: "0.76rem",
                      }}
                    >
                      <span>Select</span>
                      <ArrowRight size={13} weight="bold" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .vault-btn-text-short {
          display: none;
        }

        @media (max-width: 960px) {
          .vault-editorial-spread {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .vault-footer-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          :global(.vault-cta-btn) {
            width: 100% !important;
            justify-content: center !important;
          }
          .vault-btn-text-full {
            display: none !important;
          }
          .vault-btn-text-short {
            display: inline !important;
          }
        }
      `}</style>
    </section>
  );
}
