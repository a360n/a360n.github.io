'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle } from 'lucide-react';

export default function AccreditationBadges() {
  const { language } = useLanguage();

  const badges = [
    {
      titleEn: 'Ministry of Higher Education & Scientific Research',
      titleAr: 'وزارة التعليم العالي والبحث العلمي العراقية',
      subtitleEn: 'Official Institutional License & Accreditation',
      subtitleAr: 'ترخيص واعتراف أكاديمي وزاري كامل',
      flag: '🇮🇶',
      code: 'MoHESR Iraq',
    },
    {
      titleEn: 'Malaysian Qualifications Agency (MQA)',
      titleAr: 'وكالة المؤهلات الماليزية (MQA)',
      subtitleEn: 'Curriculum Benchmarking & Quality Standards',
      subtitleAr: 'مطابقة مناهج وأطر الجودة التعليمية الماليزية',
      flag: '🇲🇾',
      code: 'MQA Benchmark',
    },
    {
      titleEn: 'Washington Accord Standards',
      titleAr: 'مطابقة معايير اتفاقية واشنطن للهندسة',
      subtitleEn: 'International Engineering Recognition',
      subtitleAr: 'اعتراف دولي بالشهادات والمؤهلات الهندسية',
      flag: '🌐',
      code: 'Washington Accord',
    },
    {
      titleEn: 'Iraqi Engineers Union & Bar Association',
      titleAr: 'نقابة المهندسين ونقابة المحامين',
      subtitleEn: 'Direct Professional Registration for Graduates',
      subtitleAr: 'تسجيل مهني فوري للخريجين في النقابات المعنية',
      flag: '⚖️',
      code: 'Professional Guilds',
    },
  ];

  return (
    <div className="py-12 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#0F1E36]">
            {language === 'ar' ? 'الاعتمادات والتراخيص الرسمية المعتمدة' : 'Official Institutional Accreditations & Recognitions'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-3.5 group"
            >
              <div className="text-2xl p-2 rounded-xl bg-white border border-slate-200 shadow-sm shrink-0">
                {b.flag}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-blue-900 uppercase">
                    {b.code}
                  </span>
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {language === 'ar' ? b.titleAr : b.titleEn}
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {language === 'ar' ? b.subtitleAr : b.subtitleEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
