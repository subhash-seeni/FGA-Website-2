"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, EnvelopeSimple, ShieldCheck, Bank, CheckCircle, Scales } from "@phosphor-icons/react";
import { conversionData, trustData, footerData } from "@/lib/data/homepageContent";
import { assetPath } from "@/lib/utils/basePath";

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
            top: "20px",
            right: "clamp(20px, 5vw, 80px)",
          }}
        >
          04
        </div>

        <div className="editorial-container" style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ maxWidth: "800px", marginBottom: "clamp(36px, 4vw, 56px)" }}>
            <div className="mono-tag" style={{ marginBottom: "10px" }}>
              04 · INSTITUTIONAL GOVERNANCE
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
              Institutional Integrity.
              <br />
              Statutory Compliance.
            </h2>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              Operating strictly within India&apos;s recognized banking networks, statutory accounting rules, and legal frameworks.
            </p>
          </div>

          {/* Institutional Partner Badges Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginBottom: "36px",
            }}
            className="trust-badges-grid"
          >
            {trustData.badges.map((badge, idx) => (
              <div
                key={idx}
                className="card-tactile card-tactile-hover"
                style={{
                  borderRadius: "var(--radius-xs)",
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  border: "1px solid var(--surface-hairline)",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: "var(--color-copper-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={18} color="var(--color-copper)" weight="bold" />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
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

          {/* 3 Stately Governance Pillars */}
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
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "var(--color-copper)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <Bank size={16} weight="bold" />
                <span>BANKING SYNDICATES</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.5, fontFamily: "var(--font-sans)" }}>
                Direct underwriting and asset funding through empaneled Tier-1 Indian private banking institutions.
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "var(--color-copper)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <CheckCircle size={16} weight="bold" />
                <span>NPCI & DIGILOCKER</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.5, fontFamily: "var(--font-sans)" }}>
                Legally binding Aadhaar OTP eSign execution and automated NPCI eNACH rental processing.
              </p>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  color: "var(--color-copper)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                <Scales size={16} weight="bold" />
                <span>IND AS & TAX CODE</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.5, fontFamily: "var(--font-sans)" }}>
                Fully compliant with IND AS 116 / IFRS 16 lease accounting and Section 37(1) tax deductions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kinetic Datum Line */}
      <div className="kinetic-datum-line" />

      {/* 2. Closing Conversion Stage with Featured Architecture Image */}
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
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "1px solid var(--surface-hairline)",
              maxWidth: "1120px",
              margin: "0 auto",
              boxShadow: "0 24px 60px -15px rgba(18, 19, 22, 0.08)",
            }}
          >
            {/* Monumental Architecture Visual Banner (Section 5 Visual) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(220px, 25vw, 320px)",
                overflow: "hidden",
                borderBottom: "1px solid var(--surface-hairline)",
              }}
            >
              <Image
                src={assetPath("/images/closing-monolith.jpg")}
                alt="Firstgen Corporate Monumental Headquarters & Advisory"
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1120px"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Conversion Details */}
            <div
              style={{
                padding: "clamp(36px, 5vw, 64px) clamp(24px, 4vw, 56px)",
                textAlign: "center",
              }}
            >
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2.2rem, 4.8vw, 4.2rem)",
                  color: "var(--ink-primary)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                  marginBottom: "16px",
                }}
              >
                {conversionData.headline}
              </h2>

              <p
                style={{
                  fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                  color: "var(--ink-secondary)",
                  lineHeight: 1.55,
                  maxWidth: "680px",
                  margin: "0 auto 32px auto",
                  fontWeight: 500,
                }}
              >
                Eliminate capital expenditure drag. Structure your next corporate fleet, heavy machinery, or enterprise IT deployment with ₹0 down payment and 48-hour delivery.
              </p>

              {/* Action Buttons */}
              <div
                className="monolith-btn-group"
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
                  className="btn-copper monolith-cta"
                  style={{
                    padding: "14px 32px",
                    fontSize: "0.92rem",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-display)",
                  }}
                  id="monolith-primary-cta"
                >
                  <span>{conversionData.ctaPrimary}</span>
                  <ArrowUpRight size={17} weight="bold" />
                </button>

                <a
                  href={`mailto:${footerData.email}`}
                  className="btn-pill-secondary monolith-cta"
                  style={{
                    padding: "14px 28px",
                    fontSize: "0.92rem",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <EnvelopeSimple size={16} weight="bold" />
                  <span>{footerData.email}</span>
                </a>
              </div>
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
