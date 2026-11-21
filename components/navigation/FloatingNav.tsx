"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/utils/basePath";

interface FloatingNavProps {
  onOpenEnquiry: () => void;
}

export default function FloatingNav({ onOpenEnquiry }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const headerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { label: "Asset Vault", href: "#asset-vault" },
    { label: "The Equation", href: "#financial-equation" },
    { label: "Velocity", href: "#velocity-line" },
    { label: "Credentials", href: "#closing-monolith" },
  ];

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKey);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion) {
        const sections = [
          { id: "#hero", trigger: "#hero" },
          { id: "#asset-vault", trigger: "#asset-vault" },
          { id: "#financial-equation", trigger: "#financial-equation" },
          { id: "#velocity-line", trigger: "#velocity-line" },
          { id: "#closing-monolith", trigger: "#closing-monolith" },
        ];

        const triggers: ScrollTrigger[] = [];

        sections.forEach(({ id, trigger }) => {
          const el = document.querySelector(trigger);
          if (el) {
            const st = ScrollTrigger.create({
              trigger: el,
              start: "top center",
              end: "bottom center",
              onEnter: () => setActiveSection(id),
              onEnterBack: () => setActiveSection(id),
            });
            triggers.push(st);
          }
        });

        return () => {
          window.removeEventListener("scroll", handleScroll);
          triggers.forEach((st) => st.kill());
        };
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Architectural Light Masthead with Frosted Glass & Hairline */}
      <header
        ref={headerRef}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(251, 251, 249, 0.94)" : "var(--surface-ground)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--surface-hairline)",
          boxShadow: scrolled ? "0 4px 24px -2px rgba(18, 19, 22, 0.06)" : "none",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        id="architectural-masthead"
      >
        <div
          className="editorial-container"
          style={{
            height: "82px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Brand Identity: Prominent Cropped Firstgen Logo (Much Bigger & Bolder) */}
          <Link
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            aria-label="Firstgen Assets - Return to top"
          >
            <div className="nav-logo-box" style={{ position: "relative" }}>
              <Image
                src={assetPath("/firstgen-logo-cropped.png")}
                alt="Firstgen Assets Private Limited"
                fill
                sizes="(max-width: 640px) 150px, 185px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </div>

            {/* Subtle Corporate Micro-Badge */}
            <div
              className="nav-brand-descriptor"
              style={{
                borderLeft: "1px solid var(--surface-hairline)",
                paddingLeft: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.16em",
                  color: "var(--color-copper)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                OPERATING LEASE
              </span>
              <span
                style={{
                  fontSize: "0.64rem",
                  letterSpacing: "0.06em",
                  color: "var(--ink-muted)",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  lineHeight: 1.1,
                }}
              >
                Ahmedabad · India
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            className="desktop-only"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--ink-primary)" : "var(--ink-secondary)",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    backgroundColor: isActive ? "var(--surface-stone)" : "transparent",
                    transition: "all 0.2s ease",
                    letterSpacing: "-0.01em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--ink-primary)";
                      e.currentTarget.style.backgroundColor = "var(--surface-stone-subtle)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--ink-secondary)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-copper)",
                      }}
                    />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {/* Direct Contact Hotline Info for C-suite */}
            <div
              className="desktop-only"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginRight: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-technical)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  color: "var(--ink-muted)",
                  fontWeight: 600,
                }}
              >
                48-HR MOBILIZATION
              </span>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--ink-primary)",
                }}
              >
                leasing@firstgenassets.in
              </span>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="btn-copper nav-cta-btn"
              id="nav-begin-lease-btn"
            >
              <span className="nav-btn-text-full">Begin Lease</span>
              <span className="nav-btn-text-short">Lease</span>
              <ArrowUpRight size={15} />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none",
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                color: "var(--ink-primary)",
                padding: "9px",
                borderRadius: "9999px",
                cursor: "pointer",
              }}
              className="mobile-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            backgroundColor: "rgba(251, 251, 249, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "24px",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          {/* Top Bar with Cropped Logo & Close */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ position: "relative", width: "160px", height: "45px" }}>
              <Image
                src={assetPath("/firstgen-logo-cropped.png")}
                alt="Firstgen Assets"
                fill
                sizes="160px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              style={{
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                color: "var(--ink-primary)",
                padding: "10px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              padding: "20px 0",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.85rem",
                  color: "var(--ink-primary)",
                  textDecoration: "none",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  borderBottom: "1px solid var(--surface-hairline)",
                  paddingBottom: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={20} color="var(--color-copper)" />
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                fontFamily: "var(--font-technical)",
                fontSize: "0.78rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.06em",
              }}
            >
              AHMEDABAD HEADQUARTERS · GUJARAT
            </div>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenEnquiry();
              }}
              className="btn-copper"
              style={{
                width: "100%",
                padding: "16px 28px",
                fontSize: "1rem",
                borderRadius: "9999px",
              }}
            >
              Begin Lease Application
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-logo-box {
          width: 185px;
          height: 52px;
        }

        .nav-btn-text-short {
          display: none;
        }

        @media (max-width: 960px) {
          :global(.desktop-only) {
            display: none !important;
          }
          :global(.mobile-toggle) {
            display: flex !important;
          }
        }

        @media (max-width: 640px) {
          .nav-logo-box {
            width: 150px;
            height: 42px;
          }
          .nav-brand-descriptor {
            display: none !important;
          }
          .nav-btn-text-full {
            display: none;
          }
          .nav-btn-text-short {
            display: inline;
          }
        }
      `}</style>
    </>
  );
}
