"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, ArrowRight, ShieldCheck, Car, HardHat, Cpu } from "@phosphor-icons/react";

interface LeaseEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export default function LeaseEnquiryModal({
  isOpen,
  onClose,
  initialCategory = "luxury-fleet",
}: LeaseEnquiryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [assetRequirement, setAssetRequirement] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory);
  if (initialCategory !== prevInitialCategory) {
    setPrevInitialCategory(initialCategory);
    setSelectedCategory(initialCategory);
  }

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setCompanyName("");
    setContactName("");
    setContactEmail("");
    setPhone("");
    setAssetRequirement("");
    onClose();
  };

  const categories = [
    { id: "luxury-fleet", label: "Luxury Fleet", icon: Car },
    { id: "construction-warehouse", label: "Construction", icon: HardHat },
    { id: "it-hardware", label: "IT Hardware", icon: Cpu },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 250,
        backgroundColor: "rgba(18, 19, 22, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(12px, 3vw, 24px)",
      }}
      onClick={onClose}
    >
      <div
        className="modal-content-card"
        style={{
          backgroundColor: "var(--surface-card)",
          border: "1px solid var(--surface-hairline)",
          borderRadius: "var(--radius-md)",
          width: "100%",
          maxWidth: "580px",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px -16px rgba(18, 19, 22, 0.25)",
          color: "var(--ink-primary)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "var(--surface-stone)",
            border: "1px solid var(--surface-hairline)",
            borderRadius: "var(--radius-xs)",
            color: "var(--ink-primary)",
            cursor: "pointer",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 10,
          }}
          aria-label="Close modal dialog"
        >
          <X size={16} weight="bold" />
        </button>

        {!submitted ? (
          <div style={{ padding: "clamp(24px, 4vw, 36px)" }}>
            {/* Header */}
            <div style={{ marginBottom: "20px" }}>
              <div className="mono-tag" style={{ marginBottom: "8px" }}>
                COMMERCIAL LEASING DESK · AHMEDABAD
              </div>
              <h2
                id="modal-title"
                className="font-display"
                style={{
                  fontSize: "clamp(1.6rem, 2.4vw, 2rem)",
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.025em",
                  marginBottom: "6px",
                }}
              >
                Structure Operating Lease
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--ink-secondary)",
                  lineHeight: 1.45,
                }}
              >
                Direct digital submission for 48-hour underwriting and site handover protocol.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  fontSize: "0.72rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink-muted)",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                SELECT DIVISION:
              </div>
              <div
                className="modal-categories-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                }}
              >
                {categories.map((c) => {
                  const isSelected = selectedCategory === c.id;
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategory(c.id)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: "var(--radius-xs)",
                        border: isSelected
                          ? "1px solid var(--ink-primary)"
                          : "1px solid var(--surface-hairline)",
                        backgroundColor: isSelected ? "var(--ink-primary)" : "var(--surface-stone)",
                        color: isSelected ? "#ffffff" : "var(--ink-secondary)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.74rem",
                        fontWeight: 700,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Icon size={14} color={isSelected ? "var(--color-copper)" : "inherit"} weight="bold" />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label
                    htmlFor="company-name"
                    style={{
                      display: "block",
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      color: "var(--ink-muted)",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    Entity / Corporate Name *
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Adani Infra Ltd"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--surface-hairline)",
                      backgroundColor: "var(--surface-stone)",
                      color: "var(--ink-primary)",
                      fontSize: "0.86rem",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: "block",
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      color: "var(--ink-muted)",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    Authorised Signatory *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Rajesh Mehta"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--surface-hairline)",
                      backgroundColor: "var(--surface-stone)",
                      color: "var(--ink-primary)",
                      fontSize: "0.86rem",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: "block",
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      color: "var(--ink-muted)",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    Corporate Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="cfo@adaniinfra.in"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--surface-hairline)",
                      backgroundColor: "var(--surface-stone)",
                      color: "var(--ink-primary)",
                      fontSize: "0.86rem",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    style={{
                      display: "block",
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      color: "var(--ink-muted)",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    Mobile (Aadhaar linked) *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-xs)",
                      border: "1px solid var(--surface-hairline)",
                      backgroundColor: "var(--surface-stone)",
                      color: "var(--ink-primary)",
                      fontSize: "0.86rem",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="asset-spec"
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    color: "var(--ink-muted)",
                    letterSpacing: "0.06em",
                    marginBottom: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  Asset Model & Volume *
                </label>
                <textarea
                  id="asset-spec"
                  required
                  rows={2}
                  value={assetRequirement}
                  onChange={(e) => setAssetRequirement(e.target.value)}
                  placeholder="e.g. 2x Mercedes-Benz S-Class or 4x JCB 3CX Backhoe Loaders (36-month tenure)..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-xs)",
                    border: "1px solid var(--surface-hairline)",
                    backgroundColor: "var(--surface-stone)",
                    color: "var(--ink-primary)",
                    fontSize: "0.86rem",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Bottom Guarantee */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.76rem",
                  color: "var(--ink-muted)",
                  padding: "4px 0",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <ShieldCheck size={16} color="var(--color-copper)" weight="bold" style={{ flexShrink: 0 }} />
                <span>₹0 Down Payment · 48H Underwriting · Section 37(1) Deductible</span>
              </div>

              <button
                type="submit"
                className="btn-copper"
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "0.9rem",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-display)",
                }}
              >
                <span>Submit Lease Application</span>
                <ArrowRight size={15} weight="bold" />
              </button>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div
            style={{
              padding: "clamp(36px, 6vw, 48px)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-xs)",
                backgroundColor: "var(--color-copper-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={28} color="var(--color-copper)" weight="bold" />
            </div>

            <div className="mono-tag">APPLICATION RECEIVED · DAY 1</div>

            <h3
              className="font-display"
              style={{
                fontSize: "1.7rem",
                color: "var(--ink-primary)",
                letterSpacing: "-0.025em",
              }}
            >
              Proposal Initiated
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.55,
                maxWidth: "400px",
              }}
            >
              Thank you, <strong>{contactName}</strong>. Our commercial credit desk has logged your requirement for{" "}
              <strong>{companyName}</strong>. An operating lease schedule will be dispatched within 4 working hours.
            </p>

            <button
              onClick={handleReset}
              className="btn-pill-primary"
              style={{
                marginTop: "8px",
                padding: "10px 24px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
              }}
            >
              Return to Website
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 600px) {
          form > div {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 440px) {
          .modal-categories-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
