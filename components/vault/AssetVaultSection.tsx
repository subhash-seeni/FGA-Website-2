"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { categoryCardsData } from "@/lib/data/homepageContent";
import { assetPath } from "@/lib/utils/basePath";
import { gsap } from "@/lib/animations/gsap";

interface AssetVaultSectionProps {
  onOpenEnquiry: (categoryId: string) => void;
}

// Condensed 1-line high-impact descriptions (User Request: scale down text)
const condensedDescriptions: Record<string, string> = {
  "luxury-fleet": "Premier corporate mobility with full insurance coverage & white-glove concierge.",
  "construction-warehouse": "Heavy earthmoving & warehouse equipment across India's key industrial corridors.",
  "it-hardware": "Enterprise servers, workstations & compute infrastructure with 3-year OEM ProSupport.",
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
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
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

  // GSAP crossfade on active division switch
  const handleSelectDivision = (id: string) => {
    if (id === activeId) return;
    if (featuredCardRef.current) {
      gsap.fromTo(
        featuredCardRef.current,
        { opacity: 0.7, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
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
          top: "30px",
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
            marginBottom: "clamp(40px, 5vw, 64px)",
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
                fontSize: "clamp(2.2rem, 5.2vw, 4.8rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
              }}
            >
              The Asset Vault
            </h2>
          </div>

          <div style={{ maxWidth: "480px" }}>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.5,
                fontWeight: 500,
                marginBottom: "14px",
              }}
            >
              Operating leases across three capital verticals with zero capital lock-in and guaranteed rapid delivery.
            </p>
            {/* Division Switcher Buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {categoryCardsData.map((cat) => {
                const isSelected = cat.id === activeId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectDivision(cat.id)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      border: isSelected ? "1px solid var(--ink-primary)" : "1px solid var(--surface-hairline)",
                      backgroundColor: isSelected ? "var(--ink-primary)" : "var(--surface-card)",
                      color: isSelected ? "#ffffff" : "var(--ink-secondary)",
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      cursor: "pointer",
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
            gap: "clamp(24px, 3.5vw, 40px)",
            alignItems: "stretch",
          }}
          className="vault-editorial-spread"
        >
          {/* Main Featured Editorial Card (Left Column) */}
          <div
            ref={featuredCardRef}
            className="vault-spread-anim card-tactile"
            style={{
              borderRadius: "24px",
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
                  height: "5px",
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

                {/* Floating Meta Pills */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(255, 255, 255, 0.94)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.72rem",
                      color: "var(--ink-primary)",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    FEATURED DIVISION · {activeCategory.num}
                  </span>
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    backgroundColor: "rgba(18, 19, 22, 0.85)",
                    color: "#ffffff",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  {activeCategory.startingRate}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "clamp(24px, 3.5vw, 36px)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.72rem",
                    color: getDivisionAccent(activeCategory.id),
                    letterSpacing: "0.12em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  {activeCategory.badge}
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.9rem, 2.6vw, 2.5rem)",
                    color: "var(--ink-primary)",
                    marginBottom: "8px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {activeCategory.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.98rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.55,
                    marginBottom: "24px",
                    fontWeight: 500,
                    maxWidth: "600px",
                  }}
                >
                  {condensedDescriptions[activeCategory.id] || activeCategory.description}
                </p>

                {/* Representative Fleet Chips */}
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "var(--font-technical)",
                      color: "var(--ink-muted)",
                      letterSpacing: "0.1em",
                      fontWeight: 700,
                      marginBottom: "8px",
                    }}
                  >
                    DEPLOYED ASSETS:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {activeCategory.assets.map((asset) => (
                      <span
                        key={asset}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "var(--surface-stone)",
                          border: "1px solid var(--surface-hairline)",
                          borderRadius: "8px",
                          fontSize: "0.78rem",
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
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--surface-hairline)",
                  }}
                  className="inclusions-grid"
                >
                  {activeCategory.inclusions.map((inc, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.84rem",
                        color: "var(--ink-secondary)",
                      }}
                    >
                      <Check size={14} color="var(--color-copper)" style={{ flexShrink: 0 }} />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div
              className="vault-footer-bar"
              style={{
                padding: "20px clamp(16px, 3.5vw, 36px)",
                borderTop: "1px solid var(--surface-hairline)",
                backgroundColor: "var(--surface-stone)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.72rem",
                    color: "var(--ink-muted)",
                    display: "block",
                  }}
                >
                  TYPICAL TENURE
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--ink-primary)",
                  }}
                >
                  {activeCategory.typicalTenure}
                </span>
              </div>

              <button
                onClick={() => onOpenEnquiry(activeCategory.id)}
                className="btn-pill-primary vault-cta-btn"
                style={{
                  padding: "12px 24px",
                }}
              >
                <span className="vault-btn-text-full">Structure {activeCategory.title} Lease</span>
                <span className="vault-btn-text-short">Structure Lease</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Column: Stacked Secondary Division Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {otherCategories.map((cat) => (
              <div
                key={cat.id}
                className="vault-spread-anim card-tactile card-tactile-hover"
                style={{
                  borderRadius: "20px",
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
                    height: "4px",
                    width: "100%",
                    backgroundColor: getDivisionAccent(cat.id),
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "170px",
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
                      top: "12px",
                      left: "12px",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(255, 255, 255, 0.92)",
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "var(--ink-primary)",
                    }}
                  >
                    {cat.num}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(18, 19, 22, 0.8)",
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {cat.startingRate}
                  </div>
                </div>

                <div
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.68rem",
                        color: getDivisionAccent(cat.id),
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        marginBottom: "4px",
                      }}
                    >
                      {cat.badge}
                    </div>

                    <h4
                      className="font-display"
                      style={{
                        fontSize: "1.45rem",
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
                        fontSize: "0.78rem",
                        color: "var(--color-copper)",
                        fontWeight: 700,
                        fontFamily: "var(--font-technical)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Sparkles size={13} />
                      Click to Feature
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEnquiry(cat.id);
                      }}
                      className="btn-pill-secondary"
                      style={{
                        padding: "8px 14px",
                        fontSize: "0.78rem",
                      }}
                    >
                      <span>Lease Options</span>
                      <ArrowUpRight size={13} />
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
          .inclusions-grid {
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
