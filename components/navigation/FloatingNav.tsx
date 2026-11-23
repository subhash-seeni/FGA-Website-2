"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
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
    { label: "Governance", href: "#closing-monolith" },
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

      {/* Architectural Light Masthead */}
      <header
        ref={headerRef}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(251, 251, 249, 0.95)" : "var(--surface-ground)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--surface-hairline)",
          boxShadow: scrolled ? "0 4px 20px -2px rgba(18, 19, 22, 0.05)" : "none",
          transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        id="architectural-masthead"
      >
        <div
          className="editorial-container"
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {/* Brand Identity: Prominent Cropped Firstgen Logo */}
          <Link
            href="#hero"
            style={{
              display: "flex",
              alignItems: "center",
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
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
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
                    fontSize: "0.86rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--ink-primary)" : "var(--ink-secondary)",
                    textDecoration: "none",
                    padding: "7px 14px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: isActive ? "var(--surface-stone)" : "transparent",
                    transition: "all 0.2s ease",
                    letterSpacing: "-0.01em",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
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
                        color: "var(--color-copper)",
                        fontWeight: 700,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                      }}
                    >
                      /
                    </span>
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <div
              className="desktop-only nav-hotline"
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "6px",
              }}
            >
              <a
                href="mailto:leasing@firstgenassets.in"
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "var(--ink-secondary)",
                  fontFamily: "var(--font-mono)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-copper)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--ink-secondary)";
                }}
              >
                leasing@firstgenassets.in
              </a>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="btn-copper nav-cta-btn"
              id="nav-begin-lease-btn"
              style={{
                padding: "9px 18px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
              }}
            >
              <span className="nav-btn-text-full">Begin Lease</span>
              <span className="nav-btn-text-short">Lease</span>
              <ArrowUpRight size={15} weight="bold" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none",
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                color: "var(--ink-primary)",
                padding: "8px",
                borderRadius: "var(--radius-xs)",
                cursor: "pointer",
              }}
              className="mobile-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
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
            padding: "clamp(16px, 4vw, 24px)",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
        >
          {/* Top Bar with Cropped Logo & Close */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ position: "relative", width: "150px", height: "42px" }}>
              <Image
                src={assetPath("/firstgen-logo-cropped.png")}
                alt="Firstgen Assets"
                fill
                sizes="150px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
              />
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              style={{
                backgroundColor: "var(--surface-stone)",
                border: "1px solid var(--surface-hairline)",
                color: "var(--ink-primary)",
                padding: "8px",
                borderRadius: "var(--radius-xs)",
                cursor: "pointer",
              }}
              aria-label="Close menu"
            >
              <X size={22} weight="bold" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              padding: "20px 0",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 4vw, 1.85rem)",
                  color: "var(--ink-primary)",
                  textDecoration: "none",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  borderBottom: "1px solid var(--surface-hairline)",
                  paddingBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={20} color="var(--color-copper)" weight="bold" />
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0, paddingTop: "12px" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
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
                padding: "14px 20px",
                fontSize: "0.92rem",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-display)",
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
          height: 50px;
        }

        .nav-btn-text-short {
          display: none;
        }

        @media (max-width: 1200px) {
          :global(.nav-hotline) {
            display: none !important;
          }
        }

        @media (max-width: 1024px) {
          :global(.desktop-only) {
            display: none !important;
          }
          :global(.mobile-toggle) {
            display: flex !important;
          }
        }

        @media (max-width: 640px) {
          .nav-logo-box {
            width: 145px;
            height: 40px;
          }
          .nav-btn-text-full {
            display: none;
          }
          .nav-btn-text-short {
            display: inline;
          }
        }

        @media (max-width: 400px) {
          .nav-logo-box {
            width: 120px;
            height: 34px;
          }
          :global(.nav-cta-btn) {
            padding: 7px 10px !important;
            font-size: 0.78rem !important;
          }
        }
      `}</style>
    </>
  );
}
