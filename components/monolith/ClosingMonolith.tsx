"use client";

import React from "react";
import { ArrowUpRight, Mail, ShieldCheck, Landmark, CheckCircle, Scale } from "lucide-react";
import { conversionData, trustData, footerData } from "@/lib/data/homepageContent";

interface ClosingMonolithProps {
  onOpenEnquiry: (category?: string) => void;
}

export default function ClosingMonolith({ onOpenEnquiry }: ClosingMonolithProps) {
  return (
    <div id="closing-monolith">
      {/* 1. Institutional Trust & Banking Ecosystem Stage */}
      <section
        id="institutional-trust"
        className="section-band-stone"
        style={{
          padding: "clamp(88px, 9vw, 140px) 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ghost Numeral 04 */}
        <div
          className="ghost-numeral"
          style={{
            top: "30px",
            right: "clamp(20px, 5vw, 80px)",
          }}
        >
          04
        </div>

        <div className="editorial-container" style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ maxWidth: "800px", marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div className="mono-tag" style={{ marginBottom: "12px" }}>
              04 / INSTITUTIONAL TRUST & GOVERNANCE
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
              {trustData.title}
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.55,
                fontWeight: 500,
              }}
            >
              Operating within India&apos;s recognized banking, credit reporting, and statutory regulatory ecosystems.
            </p>
          </div>

          {/* Institutional Partner Badges Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "14px",
              marginBottom: "44px",
            }}
            className="trust-badges-grid"
          >
            {trustData.badges.map((badge, idx) => (
              <div
                key={idx}
                className="card-tactile card-tactile-hover"
                style={{
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "var(--color-copper-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={18} color="var(--color-copper)" />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color: "var(--ink-primary)",
                  }}
                >
                  {badge}
                </span>
              </div>
            ))}
          </div>

          {/* 3 Stately Governance Pillars (Condensed 1-Liners) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "28px",
              paddingTop: "32px",
              borderTop: "1px solid var(--surface-hairline)",
            }}
            className="governance-pillars-grid"
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  color: "var(--color-copper)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <Landmark size={15} />
                <span>BANKING SYNDICATE</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                Direct integration with top Indian private banking lenders ensures competitive leasing rates and swift underwriting.
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  color: "var(--color-copper)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <CheckCircle size={15} />
                <span>NPCI & DIGILOCKER</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                Legally binding Aadhaar eSign execution and automated eNACH mandate processing compliant with RBI standards.
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  color: "var(--color-copper)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <Scale size={15} />
                <span>SARFAESI COMPLIANT</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                Structured under Indian commercial law and IND AS standards for 100% compliant off-balance-sheet OpEx treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kinetic Datum Line */}
      <div className="kinetic-datum-line" />

      {/* 2. Closing Conversion Stage */}
      <section
        className="ambient-wash-champagne"
        style={{
          padding: "clamp(88px, 9vw, 140px) 0",
          backgroundColor: "var(--surface-ground)",
          position: "relative",
        }}
      >
        <div className="editorial-container">
          <div
            className="card-tactile"
            style={{
              borderRadius: "28px",
              padding: "clamp(52px, 7vw, 84px) clamp(24px, 5vw, 68px)",
              textAlign: "center",
              position: "relative",
              maxWidth: "1060px",
              margin: "0 auto",
              boxShadow: "0 28px 60px -15px rgba(18, 19, 22, 0.08), inset 0 1px 0 #ffffff",
            }}
          >
            {/* Top Coordinate Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "9999px",
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                fontFamily: "var(--font-technical)",
                fontSize: "0.72rem",
                color: "var(--color-copper)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-copper)",
                }}
              />
              <span>{conversionData.locationStamp}</span>
            </div>

            {/* Headline */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.2rem, 5.2vw, 4.4rem)",
                color: "var(--ink-primary)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                marginBottom: "18px",
              }}
            >
              {conversionData.headline}
            </h2>

            {/* Subtext: 1 Punchy Line */}
            <p
              style={{
                fontSize: "clamp(0.98rem, 1.3vw, 1.25rem)",
                color: "var(--ink-secondary)",
                lineHeight: 1.55,
                maxWidth: "660px",
                margin: "0 auto 36px auto",
                fontWeight: 500,
              }}
            >
              Convert capital expenditure into predictable operational liquidity. Access premier fleets, heavy machinery, and enterprise IT with 48-hour delivery.
            </p>

            {/* Dual Action Group */}
            <div
              className="monolith-btn-group"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => onOpenEnquiry("luxury-fleet")}
                className="btn-copper monolith-cta"
                style={{
                  padding: "16px 38px",
                  fontSize: "0.95rem",
                  borderRadius: "9999px",
                }}
                id="monolith-primary-cta"
              >
                <span>{conversionData.ctaPrimary}</span>
                <ArrowUpRight size={17} />
              </button>

              <a
                href={`mailto:${footerData.email}`}
                className="btn-pill-secondary monolith-cta"
                style={{
                  padding: "16px 32px",
                  fontSize: "0.95rem",
                  borderRadius: "9999px",
                }}
              >
                <Mail size={16} />
                <span>{footerData.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 960px) {
          .trust-badges-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .governance-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .monolith-btn-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          :global(.monolith-cta) {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .trust-badges-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
