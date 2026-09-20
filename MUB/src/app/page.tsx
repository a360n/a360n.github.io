'use client';

import React, { useState } from 'react';
import TopBar from '@/components/navigation/TopBar';
import Navbar from '@/components/navigation/Navbar';
import PortalModal from '@/components/navigation/PortalModal';
import ProspectusModal from '@/components/navigation/ProspectusModal';
import HeroSection from '@/components/hero/HeroSection';
import MetricCounters from '@/components/hero/MetricCounters';
import ProgramExplorer from '@/components/programs/ProgramExplorer';
import AdmissionsRoadmap from '@/components/admissions/AdmissionsRoadmap';
import QuickApplyModal from '@/components/admissions/QuickApplyModal';
import BilateralHeritage from '@/components/campus/BilateralHeritage';
import CampusLifeGrid from '@/components/campus/CampusLifeGrid';
import VirtualTourModal from '@/components/campus/VirtualTourModal';
import InnovationHub from '@/components/research/InnovationHub';
import Footer from '@/components/footer/Footer';
import { DepartmentProgram } from '@/data/programsData';

export default function Home() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isProspectusModalOpen, setIsProspectusModalOpen] = useState(false);

  const [selectedProgram, setSelectedProgram] = useState<DepartmentProgram | null>(null);
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  const handleOpenApply = (program?: DepartmentProgram | null, score?: number | null) => {
    setSelectedProgram(program || null);
    setCalculatedScore(score || null);
    setIsApplyModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 relative selection:bg-amber-100 selection:text-amber-900">
      
      {/* Dynamic Admissions Ticker & Top Bar */}
      <TopBar
        onOpenPortal={() => setIsPortalModalOpen(true)}
        onOpenApply={() => handleOpenApply()}
      />

      {/* Sticky Academic Header */}
      <Navbar
        onOpenApply={() => handleOpenApply()}
        onOpenProspectus={() => setIsProspectusModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* High-Impact Academic Hero (No Sci-Fi / Split Layout) */}
        <HeroSection
          onOpenApply={() => handleOpenApply()}
          onOpenTour={() => setIsTourModalOpen(true)}
        />

        {/* Live Academic Counters & Verified Metrics */}
        <MetricCounters />

        {/* Interactive Academic Programs & Faculties Explorer */}
        <ProgramExplorer
          onOpenApplyWithProgram={(prog) => handleOpenApply(prog)}
        />

        {/* Admissions Journey Roadmap & Interactive Tuition / Scholarship Calculator */}
        <AdmissionsRoadmap
          onOpenApply={() => handleOpenApply()}
          onApplyWithScore={(score) => handleOpenApply(null, score)}
        />

        {/* Bilateral Heritage: Mesopotamia Meets Malaysian Innovation (UTP & UMPSA) */}
        <BilateralHeritage />

        {/* Campus Life & State-of-the-Art Infrastructure (Palestine St.) */}
        <CampusLifeGrid
          onOpenTour={() => setIsTourModalOpen(true)}
        />

        {/* Research & Innovation Hub (Official Announcements & Symposium) */}
        <InnovationHub />
      </main>

      {/* Institutional Enterprise Footer & Accreditation Seals */}
      <Footer
        onOpenApply={() => handleOpenApply()}
        onOpenPortal={() => setIsPortalModalOpen(true)}
      />

      {/* Global Interactive Modals */}
      <QuickApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        preSelectedProgram={selectedProgram}
        preCalculatedScore={calculatedScore}
      />

      <PortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
      />

      <VirtualTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

      <ProspectusModal
        isOpen={isProspectusModalOpen}
        onClose={() => setIsProspectusModalOpen(false)}
      />

    </div>
  );
}
