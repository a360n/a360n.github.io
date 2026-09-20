'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, ArrowLeft, Compass, Video, Sparkles, CheckCircle2, ShieldCheck, Award, Building2 } from 'lucide-react';
import partnershipsJson from '@/data/scraped/partnerships.json';

interface HeroSectionProps {
  onOpenApply: () => void;
  onOpenTour: () => void;
}

export default function HeroSection({ onOpenApply, onOpenTour }: HeroSectionProps) {
  const { language, t, direction } = useLanguage();

  return (
    <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-[#F1F5F9] border-b border-slate-200">
      
      {/* Subtle background architectural line grid */}
      <div className="absolute inset-0 bg-academic-grid opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Academic Manifesto & Admissions Conversion */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Official Prestige Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300/80 text-amber-900 text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-[#0F1E36] tracking-tight leading-[1.12] font-serif">
              <span>{t.hero.titlePrimary}</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#0F1E36] via-[#1E3A8A] to-[#B48C20]">
                {t.hero.titleAccent}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* Conversion Actions Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] shadow-lg shadow-slate-900/15 transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-amber-500/30"
              >
                <span>{t.hero.ctaApply}</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="w-5 h-5 text-amber-400" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-amber-400" />
                )}
              </button>

              <a
                href="#programs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 transition-all shadow-sm"
              >
                <Compass className="w-4 h-4 text-blue-800" />
                <span>{t.hero.ctaExplore}</span>
              </a>

              <button
                onClick={onOpenTour}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
              >
                <Video className="w-4 h-4 text-amber-700" />
                <span>{t.hero.ctaTour}</span>
              </button>
            </div>

            {/* Institutional Trust Badges */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 font-medium">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'مرخصة رسمياً من وزارة التعليم العالي'
                    : 'Licensed by MoHESR Iraq'}
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'معايير الجودة MQA الماليزية'
                    : 'MQA Standards Aligned'}
                </span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'شراكة وتوأمة مع UTP و UMPSA'
                    : 'UTP & UMPSA Bilateral Alliance'}
                </span>
              </div>
            </div>

            {/* Palestine St Campus Intake Notice */}
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 flex items-center justify-center lg:justify-start gap-2.5">
              <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
              <span>{t.hero.intakeNotice}</span>
            </div>

          </div>

          {/* Right Column: Prestigious Institutional Visual Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden p-6 space-y-6">
              
              {/* Top Card: Official Crest & Bilateral Seal */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#0F1E36] rounded-2xl p-2 flex items-center justify-center shadow-md">
                    <Image
                      src="/logo.png"
                      alt="MUB Emblem"
                      width={44}
                      height={44}
                      className="object-contain filter brightness-105"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0F1E36] font-serif">
                      {language === 'ar' ? 'الجامعة الماليزية في بغداد' : 'Malaysian University of Baghdad'}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {language === 'ar' ? 'حرم شارع فلسطين الأكاديمي' : 'Palestine Street Campus'}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full">
                  {language === 'ar' ? 'معتمدة وزارياً' : 'Accredited'}
                </span>
              </div>

              {/* Verified Malaysian University Partners Banner */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  {language === 'ar' ? 'الجامعات الشريكة في ماليزيا:' : 'Strategic Malaysian University Partners:'}
                </span>

                <div className="space-y-2">
                  {partnershipsJson.malaysiaPartners.map((partner, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Award className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <strong className="text-slate-900 block font-sans">
                            {language === 'ar' ? partner.nameAr : partner.name}
                          </strong>
                          <span className="text-[11px] text-slate-500">
                            {partner.country} • {language === 'ar' ? 'توأمة وتبادل أكاديمي' : 'Academic Twinning'}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                        MoU Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campus Architecture Photography Preview */}
              <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80)',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36]/90 via-[#0F1E36]/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                    {language === 'ar' ? 'حرم بغداد — شارع فلسطين' : 'Baghdad Campus — Palestine Street'}
                  </span>
                  <span className="text-xs text-slate-200">
                    {language === 'ar'
                      ? 'قاعات ذكية، مختبرات حوسبة متقدمة، ومحكمة صورية'
                      : 'Smart amphitheaters, supercomputing clusters & digital moot court'}
                  </span>
                </div>
              </div>

              {/* Dual Accreditation Summary Footer */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-950 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {language === 'ar'
                    ? 'مرخصة بقرار مجلس الوزراء ووزارة التعليم العالي والبحث العلمي'
                    : 'Formally licensed by Iraqi Council of Ministers & MoHESR'}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
