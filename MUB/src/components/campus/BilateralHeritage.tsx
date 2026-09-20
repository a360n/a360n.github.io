'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Globe, ShieldCheck, BookOpen, Plane, Award } from 'lucide-react';
import partnershipsJson from '@/data/scraped/partnerships.json';

export default function BilateralHeritage() {
  const { language, t } = useLanguage();

  const advantages = [
    {
      icon: ShieldCheck,
      titleEn: 'Washington Accord Standards',
      titleAr: 'مطابقة معايير اتفاقية واشنطن',
      descEn: 'Engineering curricula structured in strict accordance with international accreditation guidelines for professional recognition.',
      descAr: 'مناهج هندسية مصممة بدقة لتلبي متطلبات الاعتماد الدولي وحرية ممارسة المهنة دولياً.',
      tag: 'International Quality',
    },
    {
      icon: BookOpen,
      titleEn: 'English-Medium Instruction',
      titleAr: 'تعليم جامعي باللغة الإنجليزية',
      descEn: 'Preparing graduates with global technical fluency in AI, machine learning, and advanced engineering technologies.',
      descAr: 'يتخرج الطالب وهو يتقن المصطلحات التقنية واللغة الإنجليزية بطلاقة، مما يفتح أمامه أبواب الشركات العالمية.',
      tag: 'Global Fluency',
    },
    {
      icon: Plane,
      titleEn: 'Student Mobility & Credit Transfer',
      titleAr: 'التنقل الطلابي ونقل الساعات',
      descEn: 'Formal articulation with leading Malaysian universities allowing exchange study periods and experiential internships.',
      descAr: 'برامج توأمة تتيح للطلبة استكمال فصول دراسية أو تدريب عملي في رحاب الجامعات الماليزية الشريكة.',
      tag: 'Academic Mobility',
    },
    {
      icon: Globe,
      titleEn: 'Official Dual Accreditation',
      titleAr: 'اعتراف وترخيص رسمي مزدوج',
      descEn: 'Licensed by Iraq’s MoHESR and curriculum benchmarked against the Malaysian Qualifications Agency (MQA) framework.',
      descAr: 'حاصلة على ترخيص واعتراف وزارة التعليم العالي العراقية مع استيفاء معايير الجودة لدى وكالة المؤهلات MQA.',
      tag: 'MoHESR & MQA',
    },
  ];

  return (
    <section id="bilateral" className="relative py-16 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-800" />
            <span>{t.bilateral.tagline}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1E36] font-serif tracking-tight mb-3">
            {t.bilateral.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.bilateral.subtitle}
          </p>
        </div>

        {/* Narrative Feature Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          
          {/* Left Narrative Box */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E36] font-serif leading-snug">
              {t.bilateral.heritageHeading}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t.bilateral.heritageText}
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
              <strong className="text-slate-900 block font-sans">
                {language === 'ar' ? 'الجامعات الشريكة في إطار التعاون الثنائي:' : 'Bilateral University Partners in Malaysia:'}
              </strong>
              <div className="flex flex-col gap-1.5">
                {partnershipsJson.malaysiaPartners.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>
                      <strong>{p.name}</strong> — {p.country} ({language === 'ar' ? p.focusAr : p.focusEn})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Bilateral Map/Pillars Card */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-xl font-bold font-serif text-amber-900 shadow-sm">
                    🇮🇶
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Baghdad Campus</h4>
                    <span className="text-xs text-slate-500">Palestine Street</span>
                  </div>
                </div>

                <div className="text-center px-2">
                  <span className="text-[10px] font-mono text-blue-900 font-bold block">
                    BILATERAL ALLIANCE
                  </span>
                  <div className="w-14 h-px bg-slate-300 my-1" />
                  <span className="text-[10px] text-slate-500">MQA & MoHESR</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-xl font-bold font-serif text-blue-900 shadow-sm">
                    🇲🇾
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">Malaysian Partners</h4>
                    <span className="text-xs text-slate-500">UTP & UMPSA</span>
                  </div>
                </div>
              </div>

              {/* Bilateral Areas */}
              <div className="space-y-2 text-xs text-slate-700">
                {partnershipsJson.collaborationAreas.map((area, aIdx) => (
                  <div key={aIdx} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">
                        {language === 'ar' ? area.titleAr : area.titleEn}
                      </strong>
                      <span className="text-slate-600 text-[11px]">
                        {language === 'ar' ? area.descAr : area.descEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 4 Advantage Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-blue-900 border border-slate-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      {adv.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#0F1E36] mb-2 font-serif">
                    {language === 'ar' ? adv.titleAr : adv.titleEn}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'ar' ? adv.descAr : adv.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
