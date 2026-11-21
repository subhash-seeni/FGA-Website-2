"use client";

import React, { useEffect, useRef } from "react";
import { businessValueData } from "@/lib/data/homepageContent";
import { Check, X } from "lucide-react";
import { gsap } from "@/lib/animations/gsap";

// High-impact condensed comparison points (User Request: reduce content, show only main points)
const condensedLedger = [
  {
    dimension: "Capital Outlay",
    traditional: "20–30% Cash Locked Upfront",
    operatingLease: "₹0 Down Payment",
    advantageNote: "100% working capital retained",
  },
  {
    dimension: "Balance Sheet",
    traditional: "Heavy Debt & Long Depreciation",
    operatingLease: "100% Off-Balance Sheet (OpEx)",
    advantageNote: "Enhances corporate liquidity ratios",
  },
  {
    dimension: "Deployment Speed",
    traditional: "3–6 Weeks Bank Underwriting",
    operatingLease: "48-Hour Delivery to Site",
    advantageNote: "Digital eSign to physical handover",
  },
];

export default function FinancialEquationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for comparison rows
      gsap.fromTo(
        ".comparison-row-anim",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Founder Card Entrance
      gsap.fromTo(
        ".founder-card-anim",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="financial-equation"
      className="section-band-parchment bg-blueprint-grid ambient-wash-copper"
      style={{
        padding: "clamp(88px, 9vw, 140px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost Numeral 02 */}
      <div
        className="ghost-numeral"
        style={{
          top: "30px",
          right: "clamp(20px, 5vw, 80px)",
        }}
      >
        02
      </div>

      <div className="editorial-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ maxWidth: "800px", marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <div className="mono-tag" style={{ marginBottom: "12px" }}>
            {businessValueData.sectionNum}
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5.2vw, 4.8rem)",
              color: "var(--ink-primary)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              marginBottom: "12px",
            }}
          >
            {businessValueData.title}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--ink-secondary)",
              lineHeight: 1.55,
              fontWeight: 500,
            }}
          >
            Convert heavy capital expenditures into predictable, tax-deductible operational liquidity.
          </p>
        </div>

        {/* 2-Column Grid: Condensed Comparison Ledger + Founder's Statement */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.9fr",
            gap: "clamp(32px, 5vw, 56px)",
            alignItems: "stretch",
          }}
          className="equation-grid-split"
        >
          {/* Left Column: Condensed Architectural Comparison Ledger */}
          <div
            className="card-tactile"
            style={{
              borderRadius: "22px",
              padding: "clamp(26px, 4vw, 40px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "16px",
                  borderBottom: "1px solid var(--surface-hairline)",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--ink-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  COMPARATIVE FINANCIAL ANALYSIS
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "var(--color-copper)",
                    backgroundColor: "var(--color-copper-light)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                  }}
                >
                  OFF-BALANCE SHEET
                </span>
              </div>

              {/* Condensed Comparison Rows (Main Points Only) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {condensedLedger.map((item, idx) => (
                  <div
                    key={idx}
                    className="comparison-row-anim"
                    style={{
                      borderBottom:
                        idx !== condensedLedger.length - 1
                          ? "1px solid var(--surface-hairline)"
                          : "none",
                      paddingBottom: idx !== condensedLedger.length - 1 ? "16px" : "0",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--ink-muted)",
                        marginBottom: "8px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.dimension}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1.25fr",
                        gap: "12px",
                      }}
                      className="comparison-row-inner"
                    >
                      {/* Traditional */}
                      <div
                        style={{
                          backgroundColor: "var(--surface-stone)",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          fontSize: "0.85rem",
                          color: "var(--ink-secondary)",
                          border: "1px solid var(--surface-hairline)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <X size={15} color="#9ca3af" style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: 500 }}>{item.traditional}</span>
                      </div>

                      {/* Firstgen Operating Lease Advantage */}
                      <div
                        style={{
                          backgroundColor: "var(--color-copper-light)",
                          padding: "10px 14px",
                          borderRadius: "10px",
                          border: "1px solid var(--color-copper-border)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Check size={16} color="var(--color-copper)" style={{ flexShrink: 0 }} />
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.05rem",
                              fontWeight: 800,
                              color: "var(--ink-primary)",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {item.operatingLease}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "var(--color-copper)",
                            fontWeight: 600,
                            paddingLeft: "24px",
                            fontFamily: "var(--font-technical)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {item.advantageNote}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                paddingTop: "14px",
                borderTop: "1px solid var(--surface-hairline)",
                fontSize: "0.82rem",
                color: "var(--ink-secondary)",
                fontStyle: "italic",
              }}
            >
              Firstgen structures operating leases that convert heavy capital expenditure to predictable monthly liquidity, freeing enterprises to invest in core growth.
            </div>
          </div>

          {/* Right Column: Founder's Credo & Stature Card */}
          <div
            className="founder-card-anim card-tactile"
            style={{
              borderRadius: "22px",
              padding: "clamp(28px, 4vw, 42px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Quote Mark */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3.5rem",
                  color: "var(--color-copper)",
                  lineHeight: 0.8,
                  marginBottom: "16px",
                  fontWeight: 900,
                }}
              >
                “
              </div>

              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)",
                  fontWeight: 600,
                  lineHeight: 1.45,
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.015em",
                  marginBottom: "24px",
                }}
              >
                {businessValueData.founderQuote.quote}
              </blockquote>

              <div
                style={{
                  borderLeft: "3px solid var(--color-copper)",
                  paddingLeft: "16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "var(--ink-primary)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {businessValueData.founderQuote.author}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.74rem",
                    color: "var(--ink-muted)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {businessValueData.founderQuote.title} · {businessValueData.founderQuote.location}
                </div>
              </div>
            </div>

            {/* Credential Metrics Bar */}
            <div
              style={{
                marginTop: "28px",
                paddingTop: "20px",
                borderTop: "1px solid var(--surface-hairline)",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "14px",
              }}
            >
              <div
                style={{
                  backgroundColor: "var(--surface-stone)",
                  padding: "14px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  border: "1px solid var(--surface-hairline)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--ink-primary)",
                  }}
                >
                  100%
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.68rem",
                    color: "var(--ink-muted)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  TAX DEDUCTIBLE
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "var(--surface-stone)",
                  padding: "14px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  border: "1px solid var(--surface-hairline)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--color-copper)",
                  }}
                >
                  ₹0
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.68rem",
                    color: "var(--ink-muted)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                  }}
                >
                  DOWN PAYMENT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .equation-grid-split {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .comparison-row-inner {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .equation-grid-split {
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
