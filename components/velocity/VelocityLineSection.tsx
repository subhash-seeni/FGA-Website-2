"use client";

import React, { useState, useEffect, useRef } from "react";
import { processStepsData } from "@/lib/data/homepageContent";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { gsap } from "@/lib/animations/gsap";

interface VelocityLineSectionProps {
  onOpenEnquiry: () => void;
}

// Condensed 1-line step summaries (User Request: scale down text)
const condensedStepSummaries: Record<number, string> = {
  0: "3-minute requirement lodge. Zero upfront capital commitment.",
  1: "4-hour automated AI banking assessment & credit underwriting.",
  2: "Fixed, transparent monthly rentals with 100% tax-deductible OpEx schedule.",
  3: "100% paperless execution via Aadhaar eSign and NPCI eNACH registration.",
  4: "Direct OEM dealership delivery with comprehensive commercial transit insurance.",
};

export default function VelocityLineSection({ onOpenEnquiry }: VelocityLineSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const step = processStepsData[activeStep] || processStepsData[0];

  // Animate progress bar fill smoothly when activeStep changes
  useEffect(() => {
    if (!progressBarRef.current) return;
    const progressPercent = ((activeStep + 1) / processStepsData.length) * 100;
    gsap.to(progressBarRef.current, {
      width: `${progressPercent}%`,
      duration: 0.45,
      ease: "power2.out",
    });
  }, [activeStep]);

  return (
    <section
      ref={sectionRef}
      id="velocity-line"
      style={{
        padding: "clamp(88px, 9vw, 140px) 0",
        backgroundColor: "var(--surface-ground)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost Numeral 03 */}
      <div
        className="ghost-numeral"
        style={{
          top: "30px",
          right: "clamp(20px, 5vw, 80px)",
        }}
      >
        03
      </div>

      <div className="editorial-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ maxWidth: "800px", marginBottom: "clamp(40px, 5vw, 64px)" }}>
          <div className="mono-tag" style={{ marginBottom: "12px" }}>
            03 / ONBOARDING SPEED
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
            The Velocity Line
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--ink-secondary)",
              lineHeight: 1.55,
              fontWeight: 500,
            }}
          >
            From requirement submission to physical site handover within 48 to 72 hours across India.
          </p>
        </div>

        {/* Dynamic Animated Progress Track */}
        <div
          style={{
            height: "5px",
            backgroundColor: "var(--surface-hairline)",
            borderRadius: "9999px",
            marginBottom: "18px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: "100%",
              width: "20%",
              backgroundColor: "var(--color-copper)",
              borderRadius: "9999px",
            }}
          />
        </div>

        {/* 5-Step Connected Interactive Horizontal Pipeline Grid */}
        <div
          role="tablist"
          aria-label="Lease Application Velocity Steps"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "12px",
            marginBottom: "36px",
          }}
          className="velocity-tabs-grid"
        >
          {processStepsData.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.number}
                role="tab"
                id={`velocity-tab-${s.number}`}
                aria-selected={isActive}
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: "18px 16px",
                  borderRadius: "16px",
                  border: isActive
                    ? "1px solid var(--ink-primary)"
                    : "1px solid var(--surface-hairline)",
                  backgroundColor: isActive ? "var(--surface-card)" : "var(--surface-stone)",
                  boxShadow: isActive ? "0 10px 28px -6px rgba(18, 19, 22, 0.12)" : "none",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  position: "relative",
                }}
              >
                {/* Active Top Accent Bar */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "14px",
                      right: "14px",
                      height: "3px",
                      backgroundColor: "var(--color-copper)",
                      borderRadius: "0 0 4px 4px",
                    }}
                  />
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-technical)",
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: isActive ? "var(--color-copper)" : "var(--ink-muted)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.number}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.68rem",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      backgroundColor: isActive ? "var(--color-copper-light)" : "rgba(0, 0, 0, 0.05)",
                      color: isActive ? "var(--color-copper)" : "var(--ink-muted)",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.timeline}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    color: isActive ? "var(--ink-primary)" : "var(--ink-secondary)",
                    lineHeight: 1.25,
                  }}
                >
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspector Card for Active Milestone */}
        <div
          className="card-tactile"
          style={{
            borderRadius: "22px",
            padding: "clamp(28px, 4.5vw, 48px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr",
              gap: "clamp(32px, 5vw, 56px)",
              alignItems: "center",
            }}
            className="velocity-inspector-split"
          >
            {/* Left: Step Overview & Detail */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "5px 14px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--color-copper-light)",
                  border: "1px solid var(--color-copper-border)",
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--color-copper)",
                  letterSpacing: "0.06em",
                  marginBottom: "16px",
                }}
              >
                <span>STEP {step.number}</span>
                <span>·</span>
                <span>TIMELINE: {step.timeline}</span>
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)",
                  color: "var(--ink-primary)",
                  marginBottom: "12px",
                  letterSpacing: "-0.025em",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--ink-primary)",
                  fontWeight: 600,
                  lineHeight: 1.55,
                  marginBottom: "10px",
                }}
              >
                {step.summary}
              </p>

              {/* Condensed 1-Sentence SLA Takeaway */}
              <div
                style={{
                  backgroundColor: "var(--surface-stone)",
                  borderLeft: "3px solid var(--color-copper)",
                  padding: "14px 18px",
                  borderRadius: "0 10px 10px 0",
                  fontSize: "0.9rem",
                  color: "var(--ink-primary)",
                  fontWeight: 500,
                  marginTop: "18px",
                }}
              >
                <strong>SLA Guarantee:</strong> {condensedStepSummaries[activeStep]}
              </div>
            </div>

            {/* Right: Required Documents / Onboarding Box */}
            <div
              style={{
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                borderRadius: "18px",
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--ink-primary)",
                  textTransform: "uppercase",
                }}
              >
                <FileText size={16} color="var(--color-copper)" />
                <span>REQUIRED DOCUMENTS</span>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {step.requirements.map((req, rIdx) => (
                  <li
                    key={rIdx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.85rem",
                      color: "var(--ink-secondary)",
                      backgroundColor: "var(--surface-card)",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid var(--surface-hairline)",
                    }}
                  >
                    <CheckCircle2 size={15} color="var(--color-copper)" style={{ flexShrink: 0 }} />
                    <span style={{ fontWeight: 500 }}>{req}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenEnquiry}
                className="btn-pill-primary"
                style={{
                  width: "100%",
                  marginTop: "4px",
                }}
              >
                <span>Initiate Application Online</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .velocity-tabs-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
          }
          .velocity-inspector-split {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 640px) {
          .velocity-tabs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 440px) {
          .velocity-tabs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
