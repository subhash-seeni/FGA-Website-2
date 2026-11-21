"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Car, HardHat, Cpu } from "lucide-react";

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
        backgroundColor: "rgba(18, 19, 22, 0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
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
          borderRadius: "24px",
          width: "100%",
          maxWidth: "600px",
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
            top: "20px",
            right: "20px",
            background: "var(--surface-stone)",
            border: "1px solid var(--surface-hairline)",
            borderRadius: "50%",
            color: "var(--ink-primary)",
            cursor: "pointer",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            zIndex: 10,
          }}
          aria-label="Close modal dialog"
        >
          <X size={17} />
        </button>

        {!submitted ? (
          <div style={{ padding: "clamp(28px, 4.5vw, 40px)" }}>
            {/* Header */}
            <div style={{ marginBottom: "24px" }}>
              <div className="mono-tag" style={{ marginBottom: "8px" }}>
                COMMERCIAL LEASING DESK · AHMEDABAD
              </div>
              <h2
                id="modal-title"
                className="font-display"
                style={{
                  fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)",
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "8px",
                }}
              >
                Structure Your Operating Lease
              </h2>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--ink-secondary)",
                  lineHeight: 1.5,
                }}
              >
                Submit your corporate asset requirement for our 48-hour underwriting and site handover workflow.
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "0.74rem",
                  fontFamily: "var(--font-technical)",
                  color: "var(--ink-muted)",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                SELECT ASSET DIVISION:
              </div>
              <div
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
                        padding: "10px 8px",
                        borderRadius: "10px",
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
                        fontFamily: "var(--font-technical)",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Icon size={14} color={isSelected ? "var(--color-copper)" : "inherit"} />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label
                    htmlFor="company-name"
                    style={{
                      display: "block",
                      fontSize: "0.74rem",
                      fontFamily: "var(--font-technical)",
                      fontWeight: 700,
                      color: "var(--ink-muted)",
                      letterSpacing: "0.06em",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                    }}
                  >
                    Enterprise / Entity Name *
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Adani Infra / Torrent Pharma"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--surface-hairline)",
                      backgroundColor: "var(--surface-stone)",
                      color: "var(--ink-primary)",
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: "block",
                      fontSize: "0.74rem",
                      fontFamily: "var(--font-technical)",
                      fontWeight: 700,
                      color: "var(--ink-muted)",
                      letterSpacing: "0.06em",
                      marginBottom: "6px",
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
                    placeholder="e.g. Kartik Shah"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--surface-hairline)",
                      backgroundColor: "var(--surface-stone)",
                      color: "var(--ink-primary)",
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: "block",
                      fontSize: "0.74rem",
                      fontFamily: "var(--font-technical)",
                      fontWeight: 700,
                      color: "var(--ink-muted)",
                      letterSpacing: "0.06em",
                      marginBottom: "6px",
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
                    placeholder="kartik@company.in"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--surface-hairline)",
                      backgroundColor: "var(--surface-stone)",
                      color: "var(--ink-primary)",
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    style={{
                      display: "block",
                      fontSize: "0.74rem",
                      fontFamily: "var(--font-technical)",
                      fontWeight: 700,
                      color: "var(--ink-muted)",
                      letterSpacing: "0.06em",
                      marginBottom: "6px",
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
                      padding: "11px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--surface-hairline)",
                      backgroundColor: "var(--surface-stone)",
                      color: "var(--ink-primary)",
                      fontSize: "0.88rem",
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
                    fontSize: "0.74rem",
                    fontFamily: "var(--font-technical)",
                    fontWeight: 700,
                    color: "var(--ink-muted)",
                    letterSpacing: "0.06em",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  Specific Asset Model & Quantity *
                </label>
                <textarea
                  id="asset-spec"
                  required
                  rows={3}
                  value={assetRequirement}
                  onChange={(e) => setAssetRequirement(e.target.value)}
                  placeholder="e.g. 2x Mercedes-Benz S-Class or 4x JCB 3CX Backhoe Loaders for 36-month lease..."
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--surface-hairline)",
                    backgroundColor: "var(--surface-stone)",
                    color: "var(--ink-primary)",
                    fontSize: "0.88rem",
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
                  gap: "8px",
                  fontSize: "0.78rem",
                  color: "var(--ink-muted)",
                  padding: "8px 0",
                }}
              >
                <ShieldCheck size={16} color="var(--color-copper)" style={{ flexShrink: 0 }} />
                <span>Zero capital lock-in · 48-hour underwriting SLA · PAN-India mobilization</span>
              </div>

              <button
                type="submit"
                className="btn-copper"
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: "0.95rem",
                  borderRadius: "12px",
                }}
              >
                <span>Submit Lease Application</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          /* Submission Success State */
          <div
            style={{
              padding: "clamp(36px, 6vw, 56px)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "var(--color-copper-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={32} color="var(--color-copper)" />
            </div>

            <div className="mono-tag">APPLICATION RECEIVED · DAY 1</div>

            <h3
              className="font-display"
              style={{
                fontSize: "1.8rem",
                color: "var(--ink-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Lease Proposal Initiated
            </h3>

            <p
              style={{
                fontSize: "0.92rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.6,
                maxWidth: "420px",
              }}
            >
              Thank you, <strong>{contactName}</strong>. Our commercial credit desk has logged your requirement for{" "}
              <strong>{companyName}</strong>. A transparent operating lease schedule will be dispatched within 4 working hours.
            </p>

            <button
              onClick={handleReset}
              className="btn-pill-primary"
              style={{
                marginTop: "12px",
                padding: "12px 28px",
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
      `}</style>
    </div>
  );
}
