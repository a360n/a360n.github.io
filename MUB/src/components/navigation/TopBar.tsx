'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Phone, MapPin, Globe, Shield, Sparkles } from 'lucide-react';

interface TopBarProps {
  onOpenPortal: () => void;
  onOpenApply: () => void;
}

export default function TopBar({ onOpenPortal, onOpenApply }: TopBarProps) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <aside aria-label="University announcements and quick access" className="w-full bg-[#0F1E36] text-slate-200 text-xs border-b border-slate-800/80 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Dynamic Admissions Announcement Ticker */}
        <div className="flex items-center gap-2 text-center md:text-left overflow-hidden">
          <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider shrink-0 shadow-sm">
            <Sparkles className="w-3 h-3 text-slate-950" />
            2026/2027
          </span>
          <p className="text-slate-200 font-medium truncate text-[11px] sm:text-xs">
            {t.topBar.announcement}
          </p>
        </div>

        {/* Quick Contact & Action Buttons */}
        <div className="flex items-center gap-4 text-[11px] shrink-0">
          <a
            href="tel:+9647760800707"
            className="hidden lg:flex items-center gap-1.5 text-slate-200 hover:text-amber-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span dir="ltr">{t.topBar.contactPhone}</span>
          </a>

          <div className="hidden xl:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.topBar.campusLocation}</span>
          </div>

          <div className="h-3.5 w-px bg-slate-700 hidden md:block" />

          {/* Portal Gateway Login */}
          <button
            onClick={onOpenPortal}
            className="flex items-center gap-1.5 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-600/60 px-2.5 py-1 rounded transition-colors"
            title="Access Student SIS, Faculty LMS, or Applicant Portal"
          >
            <Shield className="w-3 h-3 text-amber-400" />
            <span>{t.topBar.portalLogin}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/40 px-2.5 py-1 rounded font-semibold transition-all shadow-sm"
            aria-label="Switch Language"
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span>{t.topBar.langSwitch}</span>
          </button>
        </div>

      </div>
    </aside>
  );
}
