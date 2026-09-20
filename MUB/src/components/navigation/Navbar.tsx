'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Download, ArrowRight, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  onOpenApply: () => void;
  onOpenProspectus: () => void;
}

export default function Navbar({ onOpenApply, onOpenProspectus }: NavbarProps) {
  const { language, t, direction } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#programs', label: t.nav.programs },
    { href: '#admissions', label: t.nav.admissions },
    { href: '#bilateral', label: t.nav.bilateralHeritage },
    { href: '#campus', label: t.nav.campus },
    { href: '#research', label: t.nav.research },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
          : 'bg-white border-b border-slate-200/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official University Identity & Emblem */}
          <a
            href="#"
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1"
          >
            {/* Deep Royal Navy Emblem Container */}
            <div className="relative w-12 h-12 flex items-center justify-center bg-[#0F1E36] border border-amber-500/40 rounded-xl p-1.5 shadow-md group-hover:border-amber-500 transition-colors shrink-0">
              <Image
                src="/logo.png"
                alt="Malaysian University of Baghdad Official Emblem"
                width={48}
                height={48}
                className="w-full h-full object-contain filter brightness-105"
                priority
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0F1E36] font-serif">
                  MUB
                </span>
                <span className="text-[10px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded tracking-wider">
                  v2.0
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {language === 'ar' ? 'الجامعة الماليزية في بغداد' : 'Malaysian University of Baghdad'}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline-block">
                {language === 'ar'
                  ? 'مرخصة من وزارة التعليم العالي والبحث العلمي • معتمدة وفق معايير MQA'
                  : 'Licensed by MoHESR Iraq • Aligned with Malaysian MQA'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#0F1E36] hover:bg-slate-100 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenProspectus}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.nav.prospectus}</span>
            </button>

            <button
              onClick={onOpenApply}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#162A4C] border border-amber-500/30 shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t.nav.applyNow}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-4 h-4 text-amber-400" />
              ) : (
                <ArrowRight className="w-4 h-4 text-amber-400" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenApply}
              className="px-3 py-1.5 rounded-md text-xs font-bold text-white bg-[#0F1E36] hover:bg-[#162A4C] sm:hidden shadow-sm"
            >
              {language === 'ar' ? 'قدّم الآن' : 'Apply'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:text-[#0F1E36] hover:bg-slate-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenProspectus();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-300"
            >
              <Download className="w-4 h-4 text-amber-700" />
              <span>{t.nav.prospectus}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenApply();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-white bg-[#0F1E36] shadow-md"
            >
              <span>{t.nav.applyNow}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-4 h-4 text-amber-400" />
              ) : (
                <ArrowRight className="w-4 h-4 text-amber-400" />
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
