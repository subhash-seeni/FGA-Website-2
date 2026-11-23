"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Check, Clock, ShieldCheck, Bank } from "@phosphor-icons/react";
import { assetPath } from "@/lib/utils/basePath";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

interface VelocityLineSectionProps {
  onOpenEnquiry: () => void;
}

export interface VelocityStage {
  number: string;
  title: string;
  timeline: string;
  subtitle: string;
  specs: {
    specification: string;
    capitalTerms: string;
    slaWindow: string;
    compliance: string;
  };
}

export const velocityStages: VelocityStage[] = [
  {
    number: "01",
    title: "Requirement Lodge",
    timeline: "Hour 0–2",
    subtitle: "Instant corporate onboarding initiated through our secure web portal.",
    specs: {
      specification: "Verified PAN & GSTIN",
      capitalTerms: "₹0 Upfront Deposit",
      slaWindow: "2 Hours",
      compliance: "Automated KYC Check",
    },
  },
  {
    number: "02",
    title: "Underwriting Desk",
    timeline: "Hour 2–4",
    subtitle: "Private syndicate appraisal evaluating commercial entity exposure.",
    specs: {
      specification: "Tier-1 Banking Desk",
      capitalTerms: "Credit-Line Structuring",
      slaWindow: "120 Minutes",
      compliance: "Institutional Risk Standards",
    },
  },
  {
    number: "03",
    title: "Lease Structuring",
    timeline: "Hour 4–6",
    subtitle: "Tailored monthly payment schedules engineered for corporate capital agility.",
    specs: {
      specification: "Custom Tenures & Residuals",
      capitalTerms: "100% Tax-Deductible OpEx",
      slaWindow: "2 Hours",
      compliance: "IND AS 116 Alignment",
    },
  },
  {
    number: "04",
    title: "Digital Execution",
    timeline: "Hour 6–12",
    subtitle: "Legally binding agreement execution with automated recurring payment authorization.",
    specs: {
      specification: "Aadhaar OTP & eNACH",
      capitalTerms: "100% Paperless Facility",
      slaWindow: "6 Hours",
      compliance: "RBI & IT Act",
    },
  },
  {
    number: "05",
    title: "OEM Allocation",
    timeline: "Day 1–2",
    subtitle: "Direct manufacturer allocation with comprehensive nationwide logistics coverage.",
    specs: {
      specification: "Authorized OEM Dispatch",
      capitalTerms: "Zero Upfront CapEx",
      slaWindow: "Day 1–2",
      compliance: "Commercial Transit Insurance",
    },
  },
  {
    number: "06",
    title: "Site Handover",
    timeline: "Day 2–3",
    subtitle: "Physical delivery to corporate premises with official client acceptance.",
    specs: {
      specification: "40-Point Inspection Protocol",
      capitalTerms: "Active Lease Commencement",
      slaWindow: "Day 2–3",
      compliance: "Statutory Handover Signoff",
    },
  },
];

export default function VelocityLineSection({ onOpenEnquiry }: VelocityLineSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // GSAP Pinned ScrollTrigger for Desktop (Balanced split cockpit)
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 960px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1800",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            Math.floor(self.progress * velocityStages.length),
            velocityStages.length - 1
          );
          setActiveStep(stepIndex);
        },
      });

      scrollTriggerRef.current = trigger;

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  // Quick jump helper when a user clicks any milestone
  const handleJumpToStep = (index: number) => {
    setActiveStep(index);
    if (scrollTriggerRef.current && window.innerWidth >= 960) {
      const st = scrollTriggerRef.current;
      const targetProgress = index / (velocityStages.length - 0.5);
      const targetY = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  const currentStep = velocityStages[activeStep] || velocityStages[0];
  const progressPercent = Math.round(((activeStep + 1) / velocityStages.length) * 100);

  return (
    <section
      ref={sectionRef}
      id="velocity-line"
      className="velocity-cockpit-section"
      style={{
        backgroundColor: "var(--surface-ground)",
        position: "relative",
      }}
    >
      {/* Ghost Numeral 03 */}
      <div
        className="ghost-numeral"
        style={{
          top: "16px",
          right: "clamp(20px, 5vw, 80px)",
        }}
      >
        03
      </div>

      <div
        className="editorial-container velocity-container-inner"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            paddingBottom: "10px",
            borderBottom: "1px solid var(--surface-hairline)",
          }}
        >
          <div>
            <div className="mono-tag" style={{ marginBottom: "4px" }}>
              03 · VELOCITY TIMELINE
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.7rem, 2.5vw, 2.3rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              From Application to Handover in 72 Hours.
            </h2>
          </div>

          <div className="velocity-hud-metrics" style={{ textAlign: "right" }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--ink-muted)",
                  letterSpacing: "0.06em",
                  marginBottom: "2px",
                }}
              >
                STAGE PROGRESS: {currentStep.number} OF 06 ({progressPercent}%)
              </div>
              <div
                style={{
                  height: "3px",
                  width: "140px",
                  backgroundColor: "var(--surface-hairline)",
                  borderRadius: "var(--radius-xs)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    backgroundColor: "var(--color-copper)",
                    transition: "width 0.25s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Balanced Cockpit Grid (Fills Space Proportionately, Zero Dead Space) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.08fr 1.25fr",
            gap: "clamp(18px, 2.5vw, 32px)",
            alignItems: "stretch",
            maxHeight: "clamp(470px, 58vh, 540px)",
            flex: 1,
            margin: "clamp(10px, 1.6vh, 18px) 0",
            minHeight: 0,
          }}
          className="velocity-cockpit-grid"
        >
          {/* Left Column: 6 Single-Row Milestone Cards + CTA Bar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              gap: "8px",
            }}
            className="velocity-rail-column"
          >
            {/* The 6 Single-Row Stepper Cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                flex: 1,
                justifyContent: "space-between",
              }}
              className="velocity-rail-list"
            >
              {velocityStages.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => handleJumpToStep(idx)}
                    style={{
                      flex: 1,
                      minHeight: "44px",
                      maxHeight: "62px",
                      padding: "0 16px",
                      borderRadius: "var(--radius-sm)",
                      border: isActive
                        ? "1px solid var(--ink-primary)"
                        : "1px solid var(--surface-hairline)",
                      backgroundColor: isActive
                        ? "var(--surface-card)"
                        : isPassed
                        ? "var(--surface-stone)"
                        : "rgba(255, 255, 255, 0.6)",
                      boxShadow: isActive ? "0 4px 18px -2px rgba(18, 19, 22, 0.08)" : "none",
                      cursor: "pointer",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      position: "relative",
                      width: "100%",
                      textAlign: "left",
                    }}
                    className="velocity-rail-btn"
                  >
                    {/* Active Left Indicator Accent */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "3px",
                          backgroundColor: "var(--color-copper)",
                          borderRadius: "var(--radius-xs) 0 0 var(--radius-xs)",
                        }}
                      />
                    )}

                    {/* Left 3 Elements: Number + Title + Time Badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: isActive
                            ? "var(--color-copper)"
                            : isPassed
                            ? "var(--ink-secondary)"
                            : "var(--ink-muted)",
                          minWidth: "22px",
                        }}
                      >
                        {step.number}
                      </span>

                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "0.92rem",
                          fontWeight: isActive ? 700 : 600,
                          color: isActive ? "var(--ink-primary)" : "var(--ink-secondary)",
                          lineHeight: 1.2,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {step.title}
                      </span>

                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.64rem",
                          color: "var(--ink-muted)",
                          backgroundColor: "var(--surface-stone)",
                          padding: "2px 6px",
                          borderRadius: "var(--radius-xs)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {step.timeline}
                      </span>
                    </div>

                    {/* Right-aligned 4th Element: Status Indicator */}
                    <div style={{ display: "flex", alignItems: "center", flexShrink: 0, marginLeft: "8px" }}>
                      {isPassed ? (
                        <Check size={14} color="var(--color-copper)" weight="bold" />
                      ) : isActive ? (
                        <span
                          style={{
                            fontSize: "0.64rem",
                            fontFamily: "var(--font-mono)",
                            color: "var(--color-copper)",
                            fontWeight: 700,
                            backgroundColor: "var(--color-copper-light)",
                            padding: "2px 6px",
                            borderRadius: "var(--radius-xs)",
                          }}
                        >
                          ACTIVE
                        </span>
                      ) : (
                        <Clock size={13} color="var(--ink-muted)" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Action Strip on Left Column */}
            <div
              style={{
                paddingTop: "8px",
                borderTop: "1px solid var(--surface-hairline)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Check size={14} color="var(--color-copper)" weight="bold" />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--ink-muted)",
                    fontWeight: 600,
                  }}
                >
                  Zero Physical Paperwork Required
                </span>
              </div>

              <button
                onClick={onOpenEnquiry}
                className="btn-pill-primary"
                style={{
                  padding: "7px 16px",
                  borderRadius: "var(--radius-xs)",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.8rem",
                }}
              >
                <span>Structure Lease</span>
                <ArrowRight size={13} weight="bold" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Stage Card (Height Matches Left Column) */}
          <div
            ref={stageRef}
            className="card-tactile"
            style={{
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid var(--surface-hairline)",
              height: "100%",
            }}
          >
            {/* Embedded Commercial Mobilization Visual */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(240px, 28vh, 275px)",
                overflow: "hidden",
                borderBottom: "1px solid var(--surface-hairline)",
              }}
            >
              <Image
                src={assetPath("/images/velocity-mobilization.jpg")}
                alt="Firstgen Commercial Mobilization Staging Hub"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 55vw"
                style={{ objectFit: "cover" }}
              />

              {/* Single Architectural Overlay Pill */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(8px)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    color: "var(--ink-primary)",
                    letterSpacing: "0.06em",
                  }}
                >
                  STAGE {currentStep.number} · {currentStep.timeline.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Stage Detail Body (Header + 2x2 Grid + Card Footer) */}
            <div
              style={{
                padding: "clamp(12px, 1.6vh, 18px) clamp(16px, 2vw, 22px)",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.3rem, 1.7vw, 1.55rem)",
                    color: "var(--ink-primary)",
                    marginBottom: "3px",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.15,
                  }}
                >
                  {currentStep.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.45,
                    marginBottom: "12px",
                    fontWeight: 500,
                  }}
                >
                  {currentStep.subtitle}
                </p>

                {/* 2x2 Spec Grid (Strict 2-4 words per value, zero repetition) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--surface-hairline)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--ink-muted)",
                        letterSpacing: "0.06em",
                        display: "block",
                        textTransform: "uppercase",
                        marginBottom: "3px",
                      }}
                    >
                      SPECIFICATION
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--ink-primary)",
                      }}
                    >
                      {currentStep.specs.specification}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--surface-hairline)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--ink-muted)",
                        letterSpacing: "0.06em",
                        display: "block",
                        textTransform: "uppercase",
                        marginBottom: "3px",
                      }}
                    >
                      CAPITAL TERMS
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--color-copper)",
                      }}
                    >
                      {currentStep.specs.capitalTerms}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--surface-hairline)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--ink-muted)",
                        letterSpacing: "0.06em",
                        display: "block",
                        textTransform: "uppercase",
                        marginBottom: "3px",
                      }}
                    >
                      SLA WINDOW
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--ink-primary)",
                      }}
                    >
                      {currentStep.specs.slaWindow}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--surface-hairline)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        color: "var(--ink-muted)",
                        letterSpacing: "0.06em",
                        display: "block",
                        textTransform: "uppercase",
                        marginBottom: "3px",
                      }}
                    >
                      COMPLIANCE
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "var(--ink-primary)",
                      }}
                    >
                      {currentStep.specs.compliance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Next Stage & Advance Button */}
              <div
                style={{
                  paddingTop: "8px",
                  borderTop: "1px solid var(--surface-hairline)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--ink-muted)",
                  }}
                >
                  Next: {velocityStages[(activeStep + 1) % velocityStages.length].title}
                </span>

                <button
                  type="button"
                  onClick={() => handleJumpToStep((activeStep + 1) % velocityStages.length)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-copper)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>Advance Stage</span>
                  <ArrowRight size={13} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Statutory Telemetry Bar (3 Badges on Left; Right Text Removed) */}
        <div
          style={{
            paddingTop: "10px",
            borderTop: "1px solid var(--surface-hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "12px",
          }}
          className="velocity-telemetry-bar"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={14} color="var(--color-copper)" weight="bold" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "var(--ink-secondary)",
                  letterSpacing: "0.04em",
                }}
              >
                SARFAESI PROTECTED
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Bank size={14} color="var(--color-copper)" weight="bold" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "var(--ink-secondary)",
                  letterSpacing: "0.04em",
                }}
              >
                IND AS 116 COMPLIANT
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Check size={14} color="var(--color-copper)" weight="bold" />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  color: "var(--ink-secondary)",
                  letterSpacing: "0.04em",
                }}
              >
                SECTION 37(1) DEDUCTIBLE
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .velocity-cockpit-section {
          min-height: 100vh;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justifyContent: space-between;
          padding: clamp(20px, 2.5vh, 36px) 0;
          overflow: hidden;
        }

        @media (max-width: 960px) {
          .velocity-cockpit-section {
            height: auto !important;
            min-height: auto !important;
            padding: clamp(60px, 8vw, 96px) 0 !important;
            overflow: visible !important;
          }
          .velocity-hud-metrics {
            display: none !important;
          }
          .velocity-cockpit-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .velocity-rail-list {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .velocity-telemetry-bar {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .velocity-rail-list {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
