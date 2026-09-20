'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Calendar, Award, ArrowRight, ArrowLeft, CheckCircle2, Building } from 'lucide-react';
import newsJson from '@/data/scraped/news.json';

export default function InnovationHub() {
  const { language, t, direction } = useLanguage();
  const [symposiumRegistered, setSymposiumRegistered] = useState(false);

  return (
    <section id="research" className="relative py-16 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-800" />
            <span>{t.research.tagline}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1E36] font-serif tracking-tight mb-3">
            {t.research.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.research.subtitle}
          </p>
        </div>

        {/* Real Ground Truth News & Partnerships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {newsJson.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 bg-blue-100 px-2.5 py-1 rounded-md">
                    <Building className="w-3.5 h-3.5 text-blue-800" />
                    <span>{language === 'ar' ? item.categoryAr : item.category}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] font-serif mb-2 leading-snug">
                  {language === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {language === 'ar' ? item.summaryAr : item.summaryEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                <span>{language === 'ar' ? 'المكتب الإعلامي لرئاسة الجامعة' : 'MUB Communications Office'}</span>
                <span className="text-blue-900 font-bold hover:underline cursor-pointer">
                  {language === 'ar' ? 'قراءة البيان ←' : 'Read Announcement →'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Annual Symposium Card */}
        <div className="rounded-3xl bg-[#0F1E36] text-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
                <Calendar className="w-3.5 h-3.5 text-slate-950" />
                <span>{t.research.symposiumDate}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                {t.research.symposiumTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {t.research.symposiumDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-3">
              {symposiumRegistered ? (
                <div className="p-3.5 rounded-xl bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-center gap-2 w-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {language === 'ar'
                      ? 'تم تسجيل طلب المشاركة بنجاح!'
                      : 'Seat reservation recorded successfully!'}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setSymposiumRegistered(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <span>{language === 'ar' ? 'حضور الجلسات العلمية' : 'Register for Keynotes'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
