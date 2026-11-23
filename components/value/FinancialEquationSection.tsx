"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { businessValueData } from "@/lib/data/homepageContent";
import { Check, X } from "@phosphor-icons/react";
import { assetPath } from "@/lib/utils/basePath";
import { gsap } from "@/lib/animations/gsap";

const condensedLedger = [
  {
    dimension: "Capital Outlay",
    traditional: "20–30% Upfront Equity Locked",
    operatingLease: "₹0 Down Payment",
    advantageNote: "100% working capital stays in operations",
  },
  {
    dimension: "Balance Sheet",
    traditional: "Heavy Debt & Multi-Year Deprec.",
    operatingLease: "100% Off-Balance Sheet (OpEx)",
    advantageNote: "Zero borrowing liability; 100% tax deductible",
  },
  {
    dimension: "Deployment Speed",
    traditional: "3–6 Weeks Bank Underwriting",
    operatingLease: "48-Hour Mobilization",
    advantageNote: "Digital lease structuring to site delivery",
  },
];

export default function FinancialEquationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".comparison-row-anim",
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

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
          top: "20px",
          right: "clamp(20px, 5vw, 80px)",
        }}
      >
        02
      </div>

      <div className="editorial-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ maxWidth: "800px", marginBottom: "clamp(36px, 4vw, 56px)" }}>
          <div className="mono-tag" style={{ marginBottom: "10px" }}>
            02 · CAPITAL EFFICIENCY
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)",
              color: "var(--ink-primary)",
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              marginBottom: "12px",
            }}
          >
            CapEx is Drag.
            <br />
            OpEx is Velocity.
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--ink-secondary)",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Direct comparison: eliminate bank loan amortization, trapped capital, and residual asset risk.
          </p>
        </div>

        {/* 2-Column Grid: Condensed Comparison Ledger + Imagery & Credo */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.95fr",
            gap: "clamp(24px, 3.5vw, 44px)",
            alignItems: "stretch",
          }}
          className="equation-grid-split"
        >
          {/* Left Column: Condensed Architectural Comparison Ledger */}
          <div
            className="card-tactile"
            style={{
              borderRadius: "var(--radius-md)",
              padding: "clamp(24px, 3.5vw, 38px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--surface-hairline)",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "14px",
                  borderBottom: "1px solid var(--surface-hairline)",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--ink-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  COMPARATIVE CAPITAL AUDIT
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "var(--color-copper)",
                    backgroundColor: "var(--color-copper-light)",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-xs)",
                    letterSpacing: "0.04em",
                  }}
                >
                  OFF-BALANCE SHEET
                </span>
              </div>

              {/* Condensed Comparison Rows */}
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
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.74rem",
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
                        gap: "10px",
                      }}
                      className="comparison-row-inner"
                    >
                      {/* Traditional */}
                      <div
                        style={{
                          backgroundColor: "var(--surface-stone)",
                          padding: "10px 12px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.82rem",
                          color: "var(--ink-secondary)",
                          border: "1px solid var(--surface-hairline)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <X size={15} color="#9ca3af" weight="bold" style={{ flexShrink: 0 }} />
                        <span style={{ fontWeight: 500 }}>{item.traditional}</span>
                      </div>

                      {/* Firstgen Operating Lease Advantage */}
                      <div
                        style={{
                          backgroundColor: "var(--color-copper-light)",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-copper-border)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <Check size={16} color="var(--color-copper)" weight="bold" style={{ flexShrink: 0 }} />
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "1.05rem",
                              fontWeight: 700,
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
                            paddingLeft: "22px",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.01em",
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
                fontFamily: "var(--font-sans)",
                lineHeight: 1.45,
              }}
            >
              Every lease structured with Firstgen includes 100% tax write-off under Section 37(1), zero capital impairment, and comprehensive OEM maintenance SLA.
            </div>
          </div>

          {/* Right Column: High-Res Architectural Photography + Founder Credo */}
          <div
            className="founder-card-anim card-tactile"
            style={{
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--surface-hairline)",
            }}
          >
            {/* Embedded Architectural Photography (Section 3 Visual) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "210px",
                overflow: "hidden",
                borderBottom: "1px solid var(--surface-hairline)",
              }}
            >
              <Image
                src={assetPath("/images/financial-capital.jpg")}
                alt="Firstgen Institutional Capital Advisory Boardroom"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-xs)",
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "var(--ink-primary)",
                  letterSpacing: "0.06em",
                }}
              >
                BOARDROOM ADVISORY · ₹250CR+ ASSETS DEPLOYED
              </div>
            </div>

            {/* Credo & Metrics */}
            <div
              style={{
                padding: "clamp(24px, 3vw, 32px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <div>
                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.15rem, 1.5vw, 1.35rem)",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    color: "var(--ink-primary)",
                    letterSpacing: "-0.015em",
                    marginBottom: "18px",
                  }}
                >
                  “Capital belongs in growth markets and operational momentum, never locked in depreciating steel and silicon.”
                </blockquote>

                <div
                  style={{
                    borderLeft: "2px solid var(--color-copper)",
                    paddingLeft: "14px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--ink-primary)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {businessValueData.founderQuote.author}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--ink-muted)",
                      letterSpacing: "0.04em",
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
                  marginTop: "20px",
                  paddingTop: "16px",
                  borderTop: "1px solid var(--surface-hairline)",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "var(--surface-stone)",
                    padding: "12px",
                    borderRadius: "var(--radius-xs)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    border: "1px solid var(--surface-hairline)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "var(--ink-primary)",
                    }}
                  >
                    100%
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.66rem",
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
                    padding: "12px",
                    borderRadius: "var(--radius-xs)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    border: "1px solid var(--surface-hairline)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      color: "var(--color-copper)",
                    }}
                  >
                    ₹0
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.66rem",
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
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .equation-grid-split {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .comparison-row-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
