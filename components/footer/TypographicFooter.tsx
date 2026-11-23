"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, EnvelopeSimple, MapPin, Globe } from "@phosphor-icons/react";
import { footerData } from "@/lib/data/homepageContent";
import { assetPath } from "@/lib/utils/basePath";

export default function TypographicFooter() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="corporate-footer"
      style={{
        backgroundColor: "var(--surface-stone)",
        borderTop: "1px solid var(--surface-hairline)",
        paddingTop: "clamp(60px, 8vw, 96px)",
        paddingBottom: "40px",
        position: "relative",
        color: "var(--ink-primary)",
      }}
    >
      <div className="editorial-container">
        {/* Main 4-Column Directory Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: "clamp(32px, 5vw, 64px)",
            paddingBottom: "clamp(48px, 6vw, 64px)",
            borderBottom: "1px solid var(--surface-hairline)",
            position: "relative",
            zIndex: 1,
          }}
          className="footer-grid-responsive"
        >
          {/* Column 1: Brand & Positioning */}
          <div>
            {/* Prominent Official Logo */}
            <div
              className="footer-logo-box"
              style={{
                position: "relative",
                width: "210px",
                height: "56px",
                marginBottom: "16px",
              }}
            >
              <Image
                src={assetPath("/firstgen-logo-cropped.png")}
                alt="Firstgen Assets Corporate Identity"
                fill
                sizes="210px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </div>

            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: "var(--color-copper)",
                fontWeight: 700,
                marginBottom: "12px",
              }}
            >
              {footerData.tagline}
            </div>

            <p
              style={{
                fontSize: "0.88rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.55,
                marginBottom: "22px",
                maxWidth: "340px",
                fontFamily: "var(--font-sans)",
              }}
            >
              {footerData.descriptor}
            </p>

            {/* Direct Contact Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href={`mailto:${footerData.email}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.84rem",
                  color: "var(--ink-primary)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                <EnvelopeSimple size={16} color="var(--color-copper)" weight="bold" />
                <span>{footerData.email}</span>
              </a>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.84rem",
                  color: "var(--ink-secondary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <MapPin size={16} color="var(--color-copper)" weight="bold" />
                <span>{footerData.location}</span>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.84rem",
                  color: "var(--ink-secondary)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <Globe size={16} color="var(--color-copper)" weight="bold" />
                <span>{footerData.coverage}</span>
              </div>
            </div>
          </div>

          {/* Columns 2-4: Structured Navigation Sections */}
          {footerData.columns.map((col, idx) => (
            <div key={idx}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--ink-primary)",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                {col.title}
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "0.86rem",
                        color: "var(--ink-secondary)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        fontWeight: 500,
                        fontFamily: "var(--font-sans)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-copper)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--ink-secondary)";
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal & Statutory Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "28px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.74rem",
                color: "var(--ink-muted)",
              }}
            >
              {footerData.legalLine}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "var(--ink-faint)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {footerData.jurisdictionLine}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "var(--radius-xs)",
              border: "1px solid var(--surface-hairline)",
              backgroundColor: "var(--surface-card)",
              color: "var(--ink-primary)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface-stone-subtle)";
              e.currentTarget.style.borderColor = "var(--ink-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--surface-card)";
              e.currentTarget.style.borderColor = "var(--surface-hairline)";
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} weight="bold" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-logo-box {
            width: 160px !important;
            height: 44px !important;
          }
        }
        @media (max-width: 580px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
}
