'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { campusFacilities } from '@/data/campusData';
import { Sparkles, Video, MapPin, CheckCircle2, ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import generalInfo from '@/data/scraped/general_info.json';

interface CampusLifeGridProps {
  onOpenTour: () => void;
}

export default function CampusLifeGrid({ onOpenTour }: CampusLifeGridProps) {
  const { language, t, direction } = useLanguage();

  return (
    <section id="campus" className="relative py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-800" />
              <span>{t.campus.tagline}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1E36] font-serif tracking-tight mb-2">
              {t.campus.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.campus.subtitle}
            </p>
          </div>

          <button
            onClick={onOpenTour}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] shadow-sm transition-all self-start md:self-auto shrink-0"
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>{t.campus.exploreTour}</span>
            {direction === 'rtl' ? (
              <ArrowLeft className="w-4 h-4 text-amber-400" />
            ) : (
              <ArrowRight className="w-4 h-4 text-amber-400" />
            )}
          </button>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campusFacilities.map((fac) => (
            <div
              key={fac.id}
              className="group rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
            >
              {/* Facility Photography */}
              <div className="relative h-60 sm:h-64 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${fac.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    {language === 'ar' ? fac.categoryAr : fac.categoryEn}
                  </span>
                </div>
              </div>

              {/* Facility Body */}
              <div className="p-6 sm:p-7 space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F1E36] font-serif group-hover:text-blue-900 transition-colors">
                  {language === 'ar' ? fac.titleAr : fac.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'ar' ? fac.descAr : fac.descEn}
                </p>

                {/* Technical Specifications */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    {language === 'ar' ? 'المواصفات والتجهيزات المخبرية:' : 'Laboratory Specifications:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {(language === 'ar' ? fac.specsAr : fac.specsEn).map((spec, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Baghdad Campus Location & Admissions Desk Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#0F1E36] font-serif mb-1">
                {language === 'ar' ? 'مقر الجامعة الدائم — شارع فلسطين، بغداد' : 'Palestine Street Campus — Baghdad'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                {language === 'ar' ? generalInfo.address.streetAr : generalInfo.address.street}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-slate-700">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {language === 'ar'
                    ? generalInfo.contact.workingHours.ar
                    : generalInfo.contact.workingHours.en}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href="https://maps.google.com/?q=Palestine+Street+Baghdad+Iraq"
              target="_blank"
              rel="noreferrer"
              className="w-full lg:w-auto text-center px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
            >
              {language === 'ar' ? 'عرض على خرائط Google' : 'Open in Google Maps'}
            </a>
            <button
              onClick={onOpenTour}
              className="w-full lg:w-auto text-center px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] transition-colors"
            >
              {language === 'ar' ? 'مرافق الحرم' : 'Explore Facilities'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
