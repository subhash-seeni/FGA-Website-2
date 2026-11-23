"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { processStepsData } from "@/lib/data/homepageContent";
import { ArrowRight, Check, Clock, ShieldCheck } from "@phosphor-icons/react";
import { assetPath } from "@/lib/utils/basePath";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

interface VelocityLineSectionProps {
  onOpenEnquiry: () => void;
}

const stepSpecifications = [
  {
    docRequirement: "Corporate PAN & GSTIN (Digital)",
    initialCapital: "₹0 Upfront Deposit",
    slaWindow: "120 Minutes",
    compliance: "Bureau & KYC Validation",
  },
  {
    docRequirement: "Bank Statements & Financials",
    initialCapital: "Zero Collateral Pledge",
    slaWindow: "120 Minutes",
    compliance: "Empaneled Private Syndicates",
  },
  {
    docRequirement: "Rental Schedule Agreement",
    initialCapital: "100% Tax Deductible (Sec 37(1))",
    slaWindow: "120 Minutes",
    compliance: "IND AS 116 / IFRS 16 OpEx",
  },
  {
    docRequirement: "Aadhaar eSign & NPCI eNACH",
    initialCapital: "100% Paperless Execution",
    slaWindow: "360 Minutes",
    compliance: "RBI Statutory Standards",
  },
  {
    docRequirement: "Direct OEM Dealership Allocation",
    initialCapital: "Commercial Transit Insurance",
    slaWindow: "24–48 Hours",
    compliance: "Authorized Factory Corridors",
  },
  {
    docRequirement: "40-Point Pre-Delivery Protocol",
    initialCapital: "Full OEM Warranty & RSA",
    slaWindow: "48–72 Hours Final",
    compliance: "Corporate HQ / Site Handover",
  },
];

export default function VelocityLineSection({ onOpenEnquiry }: VelocityLineSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // GSAP Pinned ScrollTrigger for Desktop (Viewport-bounded, zero overflow)
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
            Math.floor(self.progress * processStepsData.length),
            processStepsData.length - 1
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
      const targetProgress = index / (processStepsData.length - 0.5);
      const targetY = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }
  };

  const currentStep = processStepsData[activeStep] || processStepsData[0];
  const currentSpec = stepSpecifications[activeStep] || stepSpecifications[0];
  const progressPercent = Math.round(((activeStep + 1) / processStepsData.length) * 100);

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

      <div className="editorial-container velocity-container-inner" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Compact Integrated Header (Max ~80px height to prevent vertical push) */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "16px",
            paddingBottom: "12px",
            borderBottom: "1px solid var(--surface-hairline)",
          }}
        >
          <div>
            <div className="mono-tag" style={{ marginBottom: "4px" }}>
              03 · VELOCITY PIPELINE
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              From Application to Handover in 72 Hours.
            </h2>
          </div>

          <div className="velocity-hud-metrics" style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "16px" }}>
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

            <div
              style={{
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                padding: "6px 12px",
                borderRadius: "var(--radius-xs)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--color-copper)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <ShieldCheck size={14} weight="bold" />
              <span>48–72H SLA</span>
            </div>
          </div>
        </div>

        {/* 2-Column Balanced Cockpit Grid (Max Height ~460px on Desktop) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.35fr",
            gap: "clamp(16px, 2.5vw, 32px)",
            alignItems: "stretch",
          }}
          className="velocity-cockpit-grid"
        >
          {/* Left Column: Sleek 6-Node Precision Rail (All 6 points 100% visible) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "8px",
            }}
            className="velocity-rail-column"
          >
            {/* The 6 Compact Nodes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }} className="velocity-rail-list">
              {processStepsData.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep > idx;

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => handleJumpToStep(idx)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: isActive
                        ? "1px solid var(--ink-primary)"
                        : "1px solid var(--surface-hairline)",
                      backgroundColor: isActive
                        ? "var(--surface-card)"
                        : isPassed
                        ? "var(--surface-stone)"
                        : "transparent",
                      boxShadow: isActive ? "0 4px 16px -2px rgba(18, 19, 22, 0.08)" : "none",
                      cursor: "pointer",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      position: "relative",
                      textAlign: "left",
                      width: "100%",
                    }}
                    className="velocity-rail-btn"
                  >
                    {/* Active Left Indicator Bar */}
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

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          color: isActive ? "var(--color-copper)" : isPassed ? "var(--ink-secondary)" : "var(--ink-muted)",
                          minWidth: "22px",
                        }}
                      >
                        {step.number}
                      </span>

                      <div>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "0.92rem",
                            fontWeight: isActive ? 800 : 600,
                            color: isActive ? "var(--ink-primary)" : "var(--ink-secondary)",
                            lineHeight: 1.2,
                            display: "inline-block",
                          }}
                        >
                          {step.title}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.66rem",
                            color: "var(--ink-muted)",
                            marginLeft: "8px",
                          }}
                        >
                          {step.timeline}
                        </span>
                      </div>
                    </div>

                    <div>
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

            {/* Bottom Reassurance & Fast CTA Bar */}
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
                    fontSize: "0.68rem",
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
                  padding: "6px 14px",
                  borderRadius: "var(--radius-xs)",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.78rem",
                }}
              >
                <span>Structure Lease</span>
                <ArrowRight size={13} weight="bold" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Stage Card */}
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
              minHeight: "440px",
            }}
          >
            {/* Embedded Commercial Mobilization Visual */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "190px",
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

              {/* Architectural Stamp */}
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

              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  backgroundColor: "rgba(18, 19, 22, 0.9)",
                  backdropFilter: "blur(8px)",
                  color: "#ffffff",
                  padding: "3px 8px",
                  borderRadius: "var(--radius-xs)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <ShieldCheck size={13} color="var(--color-copper)" weight="bold" />
                <span>NATIONWIDE SLA VERIFIED</span>
              </div>
            </div>

            {/* Stage Detail Body */}
            <div
              style={{
                padding: "16px 22px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "var(--color-copper)",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  PROTOCOL MILESTONE {currentStep.number}
                </div>

                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.4rem",
                    color: "var(--ink-primary)",
                    marginBottom: "6px",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.15,
                  }}
                >
                  {currentStep.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.45,
                    marginBottom: "12px",
                    fontWeight: 500,
                  }}
                >
                  {currentStep.summary}
                </p>

                {/* 2x2 Tabular Precision Spec Grid */}
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
                      padding: "8px 10px",
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
                      }}
                    >
                      SPECIFICATION
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--ink-primary)",
                      }}
                    >
                      {currentSpec.docRequirement}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "8px 10px",
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
                      }}
                    >
                      CAPITAL TERMS
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--color-copper)",
                      }}
                    >
                      {currentSpec.initialCapital}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "8px 10px",
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
                      }}
                    >
                      SLA WINDOW
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--ink-primary)",
                      }}
                    >
                      {currentSpec.slaWindow}
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "8px 10px",
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
                      }}
                    >
                      COMPLIANCE
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--ink-primary)",
                      }}
                    >
                      {currentSpec.compliance}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div
                style={{
                  paddingTop: "10px",
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
                  Next Milestone: {processStepsData[(activeStep + 1) % processStepsData.length].title}
                </span>

                <button
                  type="button"
                  onClick={() => handleJumpToStep((activeStep + 1) % processStepsData.length)}
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
      </div>

      <style jsx>{`
        .velocity-cockpit-section {
          min-height: 100vh;
          height: 100vh;
          max-height: 820px;
          display: flex;
          flex-direction: column;
          justifyContent: center;
          padding: 24px 0;
          overflow: hidden;
        }

        @media (max-height: 780px) and (min-width: 960px) {
          .velocity-cockpit-section {
            padding: 12px 0 !important;
          }
          .velocity-cockpit-grid {
            gap: 16px !important;
          }
        }

        @media (max-width: 960px) {
          .velocity-cockpit-section {
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
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
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
        }

        @media (max-width: 640px) {
          .velocity-rail-list {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 440px) {
          .velocity-rail-list {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
