"use client";

import React, { useState } from "react";
import FloatingNav from "@/components/navigation/FloatingNav";
import CinematicHero from "@/components/hero/CinematicHero";
import KineticTicker from "@/components/ticker/KineticTicker";
import AssetVaultSection from "@/components/vault/AssetVaultSection";
import FinancialEquationSection from "@/components/value/FinancialEquationSection";
import VelocityLineSection from "@/components/velocity/VelocityLineSection";
import ClosingMonolith from "@/components/monolith/ClosingMonolith";
import TypographicFooter from "@/components/footer/TypographicFooter";
import LeaseEnquiryModal from "@/components/modal/LeaseEnquiryModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState("luxury-fleet");

  const handleOpenEnquiry = (category: string = "luxury-fleet") => {
    setModalCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--surface-ground)" }}>
      {/* 1. Architectural Masthead Navigation (Light & Clean, True-Color Logo) */}
      <FloatingNav onOpenEnquiry={() => handleOpenEnquiry("luxury-fleet")} />

      <main id="main-content" style={{ flex: 1 }}>
        {/* 2. Editorial Hero with Interactive 3-Division Asset Showcase */}
        <CinematicHero onOpenEnquiry={handleOpenEnquiry} />

        {/* 3. Refined Light Asset Horizon Ribbon */}
        <KineticTicker />

        {/* 4. The Asset Vault: Museum-Grade Specification Cards & Financial Terms */}
        <AssetVaultSection onOpenEnquiry={handleOpenEnquiry} />

        {/* 5. The Financial Equation: CapEx vs OpEx Comparison Ledger & Founder's Statement */}
        <FinancialEquationSection />

        {/* 6. The Velocity Line: Interactive 5-Step Digital Pipeline */}
        <VelocityLineSection onOpenEnquiry={() => handleOpenEnquiry("luxury-fleet")} />

        {/* 7. Institutional Governance & Closing Conversion Stage */}
        <ClosingMonolith onOpenEnquiry={handleOpenEnquiry} />
      </main>

      {/* 8. Corporate Architectural Footer */}
      <TypographicFooter />

      {/* Interactive Commercial Lease Enquiry Modal */}
      <LeaseEnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        initialCategory={modalCategory}
      />
    </div>
  );
}
