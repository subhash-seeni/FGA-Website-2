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
        style={{
          padding: "clamp(72px, 8vw, 110px) 0",
          backgroundColor: "var(--surface-stone)",
          borderTop: "1px solid var(--surface-hairline)",
          borderBottom: "1px solid var(--surface-hairline)",
          position: "relative",
        }}
      >
        <div className="editorial-container">
          {/* Header */}
          <div style={{ maxWidth: "780px", marginBottom: "clamp(36px, 5vw, 56px)" }}>
            <div className="mono-tag" style={{ marginBottom: "12px" }}>
              04 / INSTITUTIONAL TRUST & GOVERNANCE
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              {trustData.title}
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.5,
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
              marginBottom: "40px",
            }}
            className="trust-badges-grid"
          >
            {trustData.badges.map((badge, idx) => (
              <div
                key={idx}
                className="card-tactile card-tactile-hover"
                style={{
                  borderRadius: "12px",
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
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
              gap: "24px",
              paddingTop: "28px",
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
                  marginBottom: "6px",
                }}
              >
                <Landmark size={15} />
                <span>BANKING SYNDICATE</span>
              </div>
              <p style={{ fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
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
                  marginBottom: "6px",
                }}
              >
                <CheckCircle size={15} />
                <span>NPCI & DIGILOCKER</span>
              </div>
              <p style={{ fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
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
                  marginBottom: "6px",
                }}
              >
                <Scale size={15} />
                <span>SARFAESI COMPLIANT</span>
              </div>
              <p style={{ fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                Structured under Indian commercial law and IND AS standards for 100% compliant off-balance-sheet OpEx treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Closing Conversion Stage */}
      <section
        className="ambient-wash-champagne"
        style={{
          padding: "clamp(72px, 8vw, 120px) 0",
          backgroundColor: "var(--surface-ground)",
          position: "relative",
        }}
      >
        <div className="editorial-container">
          <div
            className="card-tactile"
            style={{
              borderRadius: "24px",
              padding: "clamp(48px, 6vw, 76px) clamp(24px, 5vw, 64px)",
              textAlign: "center",
              position: "relative",
              maxWidth: "1040px",
              margin: "0 auto",
            }}
          >
            {/* Top Coordinate Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "9999px",
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                fontFamily: "var(--font-technical)",
                fontSize: "0.72rem",
                color: "var(--color-copper)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "20px",
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
                fontSize: "clamp(2.6rem, 5.2vw, 4.2rem)",
                color: "var(--ink-primary)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                marginBottom: "16px",
              }}
            >
              {conversionData.headline}
            </h2>

            {/* Subtext: 1 Punchy Line */}
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
                color: "var(--ink-secondary)",
                lineHeight: 1.55,
                maxWidth: "640px",
                margin: "0 auto 32px auto",
                fontWeight: 500,
              }}
            >
              Convert capital expenditure into predictable operational liquidity. Access premier fleets, heavy machinery, and enterprise IT with 48-hour delivery.
            </p>

            {/* Dual Action Group */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => onOpenEnquiry("luxury-fleet")}
                className="btn-copper"
                style={{
                  padding: "16px 36px",
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
                className="btn-pill-secondary"
                style={{
                  padding: "16px 30px",
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
        @media (max-width: 540px) {
          .trust-badges-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
