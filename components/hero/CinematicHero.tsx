"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { heroCardsData } from "@/lib/data/homepageContent";
import { gsap } from "@/lib/animations/gsap";

interface CinematicHeroProps {
  onOpenEnquiry: (categoryKey?: string) => void;
}

export default function CinematicHero({ onOpenEnquiry }: CinematicHeroProps) {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const bgStageRef = useRef<HTMLDivElement>(null);
  const metricRibbonRef = useRef<HTMLDivElement>(null);

  // Stats number refs for GSAP count-up
  const stat0Ref = useRef<HTMLSpanElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  const activeCard = heroCardsData[activeCategoryIndex] || heroCardsData[0];

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Ken Burns scale-in on the background cinematic stage
      if (bgStageRef.current) {
        gsap.fromTo(
          bgStageRef.current,
          { scale: 1.07, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
          }
        );

        // Parallax drift on scroll
        gsap.to(bgStageRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 2. Headline masked reveal animation
      gsap.fromTo(
        ".hero-reveal-line",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: "power3.out",
          clearProps: "transform,opacity",
          onComplete: () => {
            gsap.set(".mask-reveal-wrap", { overflow: "visible" });
          },
        }
      );

      // 3. Staggered fade for copy and HUD
      gsap.fromTo(
        ".hero-stagger-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.25,
          clearProps: "transform,opacity",
        }
      );

      // 4. Metric ribbon count-up animations on ScrollTrigger
      if (metricRibbonRef.current) {
        gsap.fromTo(
          ".metric-ribbon-card",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metricRibbonRef.current,
              start: "top 92%",
              onEnter: () => {
                // Count up animations
                const counter0 = { val: 0 };
                gsap.to(counter0, {
                  val: 6,
                  duration: 1.4,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (stat0Ref.current) stat0Ref.current.innerText = `${Math.floor(counter0.val)}+`;
                  },
                });

                const counter1 = { val: 0 };
                gsap.to(counter1, {
                  val: 48,
                  duration: 1.5,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (stat1Ref.current) stat1Ref.current.innerText = `${Math.floor(counter1.val)}H`;
                  },
                });

                const counter3 = { val: 0 };
                gsap.to(counter3, {
                  val: 100,
                  duration: 1.6,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (stat3Ref.current) stat3Ref.current.innerText = `${Math.floor(counter3.val)}%`;
                  },
                });
              },
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "var(--surface-ground)",
        overflow: "hidden",
      }}
    >
      {/* Cinematic Full-Bleed Photographic Background Layer */}
      <div
        ref={bgStageRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {/* Pre-rendered layer stack for instantaneous seamless crossfade */}
        {heroCardsData.map((card, idx) => {
          const isActive = activeCategoryIndex === idx;
          return (
            <div
              key={card.id}
              className="hero-bg-photo-wrapper"
              style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 0.75 : 0,
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                filter: "contrast(1.05) saturate(1.1)",
              }}
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="hero-bg-photo"
                style={{ objectFit: "cover" }}
              />
            </div>
          );
        })}

        {/* Master Light Architectural Scrim (Crisp Typography Left, Vivid Showcase Right) */}
        <div
          className="hero-bg-scrim"
          style={{
            position: "absolute",
            inset: 0,
          }}
        />

        {/* Subtle Architectural Blueprint Grid */}
        <div
          className="bg-blueprint-grid"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.5,
          }}
        />
      </div>

      {/* Main Hero Container */}
      <div
        className="editorial-container"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "clamp(44px, 5.5vw, 68px)",
          paddingBottom: "clamp(48px, 6vw, 76px)",
          minHeight: "clamp(680px, 85vh, 880px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Central Display & Architectural Hero Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.95fr",
            gap: "clamp(32px, 5vw, 64px)",
            alignItems: "end",
            marginBottom: "clamp(36px, 5vw, 56px)",
          }}
          className="hero-split-grid"
        >
          {/* Left Column: Bold Display Typography */}
          <div>
            <div
              className="mono-tag hero-stagger-item"
              style={{
                marginBottom: "14px",
              }}
            >
              OPERATING LEASE PLATFORM · AHMEDABAD
            </div>

            <h1
              className="font-display hero-headline"
              style={{
                fontSize: "clamp(2.4rem, 6.5vw, 6.2rem)",
                color: "var(--ink-primary)",
                marginBottom: "20px",
                lineHeight: 1.08,
                letterSpacing: "-0.04em",
                paddingBottom: "4px",
              }}
            >
              <div className="mask-reveal-wrap" style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
                <span className="hero-reveal-line">Assets</span>{" "}
                <span className="hero-reveal-line" style={{ color: "var(--color-copper)" }}>
                  Work.
                </span>
              </div>
              <br />
              <div className="mask-reveal-wrap" style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}>
                <span className="hero-reveal-line">Capital</span>{" "}
                <span className="hero-reveal-line">Stays.</span>
              </div>
            </h1>

            <p
              className="hero-stagger-item"
              style={{
                fontSize: "clamp(0.98rem, 1.35vw, 1.25rem)",
                color: "var(--ink-secondary)",
                lineHeight: 1.55,
                maxWidth: "540px",
                marginBottom: "32px",
                fontWeight: 500,
              }}
            >
              Operating leases for luxury corporate fleets, heavy equipment & enterprise IT. ₹0 down payment · 48-hour delivery pan-India.
            </p>

            {/* Action Group */}
            <div
              className="hero-stagger-item hero-btn-group"
              style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}
            >
              <button
                onClick={() => onOpenEnquiry(activeCard.categoryKey)}
                className="btn-pill-primary hero-btn"
                id="hero-apply-btn"
              >
                <span>Structure Your Lease</span>
                <ArrowRight size={16} weight="bold" />
              </button>

              <Link
                href="#asset-vault"
                className="btn-pill-secondary hero-btn"
                id="hero-explore-btn"
              >
                <span>The Asset Vault</span>
                <CaretDown size={15} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Frosted HUD & Division Controller */}
          <div
            className="hero-stagger-item parchment-hud"
            style={{
              borderRadius: "var(--radius-md)",
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {/* Division Switcher */}
            <div
              role="tablist"
              aria-label="Asset Division Tabs"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
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
                      borderRadius: "var(--radius-sm)",
                      border: isSelected ? "1px solid var(--ink-primary)" : "1px solid var(--surface-hairline)",
                      backgroundColor: isSelected ? "var(--ink-primary)" : "rgba(255, 255, 255, 0.7)",
                      color: isSelected ? "#ffffff" : "var(--ink-secondary)",
                      fontFamily: "var(--font-technical)",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textAlign: "center",
                      boxShadow: isSelected ? "0 4px 14px -2px rgba(18, 19, 22, 0.25)" : "none",
                    }}
                  >
                    {card.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Division Live Info Card */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "var(--radius-sm)",
                padding: "16px",
                border: "1px solid var(--surface-hairline)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: "var(--surface-stone)",
                    color: "var(--ink-secondary)",
                    fontFamily: "var(--font-technical)",
                    fontWeight: 600,
                  }}
                >
                  {activeCard.structureType}
                </span>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--ink-primary)",
                    letterSpacing: "-0.01em",
                    marginBottom: "4px",
                  }}
                >
                  {activeCard.flagshipTitle}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-muted)",
                    lineHeight: 1.4,
                  }}
                >
                  Ready for corporate deployment with customized tenure and zero upfront capital commitment.
                </p>
              </div>

              {/* Specs Pills */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                  paddingTop: "10px",
                  borderTop: "1px solid var(--surface-hairline)",
                }}
              >
                {activeCard.metrics.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    style={{
                      backgroundColor: "var(--surface-stone)",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-xs)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        color: metric.highlight ? "var(--color-copper)" : "var(--ink-primary)",
                      }}
                    >
                      {metric.prefix}
                      {metric.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.62rem",
                        color: "var(--ink-muted)",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                      }}
                    >
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Proposal Action */}
            <button
              onClick={() => onOpenEnquiry(activeCard.categoryKey)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                color: "var(--ink-primary)",
                fontFamily: "var(--font-body)",
                fontSize: "0.84rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--ink-primary)";
                e.currentTarget.style.backgroundColor = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--surface-hairline)";
                e.currentTarget.style.backgroundColor = "var(--surface-stone)";
              }}
            >
              <span>Request Custom Proposal for this Division</span>
              <ArrowRight size={14} color="var(--color-copper)" weight="bold" />
            </button>
          </div>
        </div>
      </div>

      {/* Kinetic Section Transition Datum Line */}
      <div className="kinetic-datum-line" />

      {/* 4-Column Operational Metric Strip with GSAP CountUp */}
      <div
        ref={metricRibbonRef}
        style={{
          backgroundColor: "var(--surface-stone)",
          borderTop: "1px solid var(--surface-hairline)",
          borderBottom: "1px solid var(--surface-hairline)",
          padding: "clamp(28px, 3.5vw, 42px) 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="editorial-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "18px",
            }}
            className="hero-stats-grid"
          >
            {/* 01: Asset Classes */}
            <div
              className="metric-ribbon-card card-tactile card-tactile-hover"
              style={{
                borderRadius: "var(--radius-md)",
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
                  01
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
                  Asset Classes
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                <span ref={stat0Ref}>6+</span> Categories
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.35,
                }}
              >
                Fleet, machinery & enterprise compute
              </div>
            </div>

            {/* 02: Delivery SLA */}
            <div
              className="metric-ribbon-card card-tactile card-tactile-hover"
              style={{
                borderRadius: "var(--radius-md)",
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
                  02
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
                  Delivery SLA
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                <span ref={stat1Ref}>48H</span> SLA
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.35,
                }}
              >
                From digital signature to site handover
              </div>
            </div>

            {/* 03: Down Payment */}
            <div
              className="metric-ribbon-card card-tactile card-tactile-hover"
              style={{
                borderRadius: "var(--radius-md)",
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
                  03
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
                  Down Payment
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                <span ref={stat2Ref} style={{ color: "var(--color-copper)" }}>₹0</span> Required
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.35,
                }}
              >
                100% equipment financing & asset onboarding
              </div>
            </div>

            {/* 04: Onboarding */}
            <div
              className="metric-ribbon-card card-tactile card-tactile-hover"
              style={{
                borderRadius: "var(--radius-md)",
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
                  04
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
                  Onboarding
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                <span ref={stat3Ref}>100%</span> Paperless
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.35,
                }}
              >
                Aadhaar eSign & automated eNACH authorization
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.hero-bg-scrim) {
          background: 
            linear-gradient(90deg, #fbfbf9 0%, rgba(251, 251, 249, 0.97) 38%, rgba(251, 251, 249, 0.70) 58%, rgba(251, 251, 249, 0.18) 100%),
            linear-gradient(180deg, #fbfbf9 0%, rgba(251, 251, 249, 0.4) 15%, transparent 35%, rgba(251, 251, 249, 0.6) 75%, #fbfbf9 100%);
        }

        :global(.hero-bg-photo) {
          object-position: 75% center !important;
        }

        @media (max-width: 960px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          :global(.hero-bg-scrim) {
            background: 
              linear-gradient(180deg, #fbfbf9 0%, rgba(251, 251, 249, 0.94) 28%, rgba(251, 251, 249, 0.72) 58%, rgba(251, 251, 249, 0.96) 100%) !important;
          }
          :global(.hero-bg-photo) {
            object-position: center 30% !important;
          }
        }

        @media (max-width: 640px) {
          .hero-top-descriptor {
            display: none !important;
          }
          .hero-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .hero-btn-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          :global(.hero-btn) {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
