"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { heroData, heroCardsData } from "@/lib/data/homepageContent";
import { gsap } from "@/lib/animations/gsap";

interface CinematicHeroProps {
  onOpenEnquiry: (categoryKey?: string) => void;
}

export default function CinematicHero({ onOpenEnquiry }: CinematicHeroProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const activeCard = heroCardsData[activeCategoryIndex] || heroCardsData[0];

  // GSAP Masked Headline Reveal & Parallax Motion
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Masked split-line headline entrance reveal
      gsap.fromTo(
        ".hero-reveal-line",
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.16,
          ease: "power3.out",
          clearProps: "transform,opacity",
        }
      );

      // 2. Subtitle & CTA Stagger Fade-In
      gsap.fromTo(
        ".hero-fade-item",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.35,
          clearProps: "transform,opacity",
        }
      );

      // 3. Parallax subtle scroll drift on asset stage
      if (stageRef.current) {
        gsap.to(stageRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 4. Staggered reveal for bottom 4 metric cards
      gsap.fromTo(
        ".hero-metric-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.5,
          clearProps: "transform,opacity",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="bg-blueprint-grid ambient-wash-champagne"
      style={{
        paddingTop: "clamp(36px, 5vw, 64px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Warm Ambient Glow Sphere */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230, 106, 31, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="editorial-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top Minimal Coordinates & Sector Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--surface-hairline)",
            marginBottom: "clamp(28px, 4vw, 44px)",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div className="mono-tag">{heroData.locationTag}</div>
          <div
            style={{
              fontFamily: "var(--font-technical)",
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              color: "var(--ink-muted)",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            OPERATING LEASE PLATFORM · COMMERCIAL ASSET FINANCE
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "clamp(36px, 5vw, 64px)",
            alignItems: "center",
            marginBottom: "clamp(48px, 6vw, 72px)",
          }}
          className="hero-grid-split"
        >
          {/* Left Column: Bold Display Typography & Direct Value Statement */}
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(3.4rem, 6.8vw, 6rem)",
                color: "var(--ink-primary)",
                marginBottom: "20px",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
              }}
            >
              <div className="mask-reveal-wrap">
                <span className="hero-reveal-line">Assets</span>{" "}
                <span className="hero-reveal-line" style={{ color: "var(--color-copper)" }}>Work.</span>
              </div>
              <br />
              <div className="mask-reveal-wrap">
                <span className="hero-reveal-line">Capital</span>{" "}
                <span className="hero-reveal-line">Stays.</span>
              </div>
            </h1>

            {/* Scaled-Down Punchy Subhead (User Feedback: Don't overwhelm with text) */}
            <p
              className="hero-fade-item"
              style={{
                fontSize: "clamp(1.05rem, 1.35vw, 1.25rem)",
                color: "var(--ink-secondary)",
                lineHeight: 1.55,
                maxWidth: "520px",
                marginBottom: "32px",
                fontWeight: 500,
              }}
            >
              Operating leases for luxury fleets, heavy equipment & enterprise IT. ₹0 down payment · 48-hour delivery pan-India.
            </p>

            {/* Action Group */}
            <div className="hero-fade-item" style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={() => onOpenEnquiry(activeCard.categoryKey)}
                className="btn-pill-primary"
                id="hero-apply-btn"
              >
                <span>Structure Your Lease</span>
                <ArrowRight size={16} />
              </button>

              <Link
                href="#asset-vault"
                className="btn-pill-secondary"
                id="hero-explore-btn"
              >
                <span>The Asset Vault</span>
                <ChevronDown size={15} />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Asset Showcase Stage */}
          <div
            ref={stageRef}
            className="hero-stage-card card-tactile"
            style={{
              borderRadius: "20px",
              padding: "20px",
              position: "relative",
            }}
          >
            {/* Division Selector Tabs */}
            <div
              role="tablist"
              aria-label="Asset Division Tabs"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              {heroCardsData.map((card, idx) => {
                const isSelected = activeCategoryIndex === idx;
                return (
                  <button
                    key={card.id}
                    role="tab"
                    id={`hero-tab-${card.id}`}
                    aria-selected={isSelected}
                    onClick={() => setActiveCategoryIndex(idx)}
                    style={{
                      padding: "10px 8px",
                      borderRadius: "10px",
                      border: isSelected ? "1px solid var(--ink-primary)" : "1px solid var(--surface-hairline)",
                      backgroundColor: isSelected ? "var(--ink-primary)" : "var(--surface-stone)",
                      color: isSelected ? "#ffffff" : "var(--ink-secondary)",
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "center",
                      boxShadow: isSelected ? "0 4px 12px -2px rgba(18, 19, 22, 0.2)" : "none",
                    }}
                  >
                    {card.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Photographic Window */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "290px",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid var(--surface-hairline)",
                marginBottom: "18px",
              }}
            >
              <Image
                src={activeCard.image}
                alt={activeCard.alt}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
                priority
              />

              {/* Top Meta Capsule */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  backgroundColor: "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(8px)",
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-copper)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "var(--ink-primary)",
                  }}
                >
                  {activeCard.badge}
                </span>
              </div>
            </div>

            {/* Active Card Specs Ledger */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--ink-primary)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {activeCard.flagshipTitle}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.72rem",
                      color: "var(--color-copper)",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {activeCard.structureType}
                  </span>
                </div>

                <button
                  onClick={() => onOpenEnquiry(activeCard.categoryKey)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "var(--ink-primary)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  }}
                >
                  <span>Request Proposal</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Spec Metric Capsules */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--surface-hairline)",
                }}
              >
                {activeCard.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "10px 14px",
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
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: metric.highlight ? "var(--color-copper)" : "var(--ink-primary)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {metric.prefix}
                      {metric.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.64rem",
                        color: "var(--ink-muted)",
                        letterSpacing: "0.08em",
                        fontWeight: 700,
                      }}
                    >
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-Column Operational Metric Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
          className="hero-stats-grid"
        >
          {heroData.stats.map((stat) => (
            <div
              key={stat.number}
              className="hero-metric-card card-tactile card-tactile-hover"
              style={{
                borderRadius: "14px",
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-technical)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--color-copper)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--ink-muted)",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>

              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.35,
                }}
              >
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .hero-grid-split {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 580px) {
          .hero-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
