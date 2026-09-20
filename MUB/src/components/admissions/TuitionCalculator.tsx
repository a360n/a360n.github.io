'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Calculator, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { formatCurrencyUSD } from '@/lib/utils';

interface TuitionCalculatorProps {
  onApplyWithScore: (score: number, scholarshipPercent: number) => void;
}

export default function TuitionCalculator({ onApplyWithScore }: TuitionCalculatorProps) {
  const { language, t, direction } = useLanguage();
  const [track, setTrack] = useState<'scientific' | 'literary'>('scientific');
  const [score, setScore] = useState<number>(88);

  const { scholarshipPercent, tierNameEn, tierNameAr, baseTuition, discountedTuition } =
    useMemo(() => {
      const base = track === 'scientific' ? 3800 : 3400;
      let pct = 0;
      let nameEn = 'Standard MoHESR Admission';
      let nameAr = 'القبول الاعتيادي المعتمد';

      if (score >= 95) {
        pct = 50;
        nameEn = 'Presidential Merit Fellowship (50% Deduction)';
        nameAr = 'منحة التميز الرئاسية (خصم 50%)';
      } else if (score >= 90) {
        pct = 35;
        nameEn = 'Deans Honors Scholarship (35% Deduction)';
        nameAr = 'منحة العميد للمتفوقين (خصم 35%)';
      } else if (score >= 85) {
        pct = 25;
        nameEn = 'High Achievers Award (25% Deduction)';
        nameAr = 'منحة أوائل الإعدادية (خصم 25%)';
      } else if (score >= 80) {
        pct = 15;
        nameEn = 'Academic Excellence Grant (15% Deduction)';
        nameAr = 'منحة التميز الأكاديمي (خصم 15%)';
      } else if (score >= 75) {
        pct = 10;
        nameEn = 'Early Bilateral Enrollment Grant (10% Deduction)';
        nameAr = 'منحة التسجيل المبكر (خصم 10%)';
      }

      const discounted = Math.round(base * (1 - pct / 100));
      return {
        scholarshipPercent: pct,
        tierNameEn: nameEn,
        tierNameAr: nameAr,
        baseTuition: base,
        discountedTuition: discounted,
      };
    }, [score, track]);

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Input Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold mb-3">
              <Calculator className="w-3.5 h-3.5 text-blue-800" />
              <span>{language === 'ar' ? 'حاسبة القبول والمنح 2026/2027' : 'Merit Aid Estimator'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E36] font-serif tracking-tight">
              {t.admissions.calculatorTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {t.admissions.calculatorSubtitle}
            </p>
          </div>

          {/* Secondary Track Switcher */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t.admissions.trackSelect}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTrack('scientific')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                  track === 'scientific'
                    ? 'bg-[#0F1E36] text-white border-[#0F1E36] shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.admissions.trackScientific}
              </button>
              <button
                type="button"
                onClick={() => setTrack('literary')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                  track === 'literary'
                    ? 'bg-[#0F1E36] text-white border-[#0F1E36] shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {t.admissions.trackLiterary}
              </button>
            </div>
          </div>

          {/* Interactive GPA / Baccalaureate Slider */}
          <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {t.admissions.gpaLabel}
              </span>
              <span className="text-2xl font-black text-[#0F1E36] font-serif">
                {score}%
              </span>
            </div>

            <input
              type="range"
              min={60}
              max={100}
              step={1}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              aria-label={t.admissions.gpaLabel}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F1E36] focus:outline-none"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>60% (Minimum)</span>
              <span>80%</span>
              <span>100% (Maximum)</span>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center relative overflow-hidden">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-100 text-amber-900 mb-4 border border-amber-300">
              <Award className="w-8 h-8" />
            </div>

            {/* Scholarship Percentage */}
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-1">
              {t.admissions.scholarshipEligible}
            </div>
            <div className="text-5xl font-black text-[#0F1E36] font-serif mb-2">
              {scholarshipPercent > 0 ? `${scholarshipPercent}%` : 'Standard'}
            </div>

            {/* Tier Name */}
            <div className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 py-1 px-3 rounded-full inline-block mb-6">
              {language === 'ar' ? tierNameAr : tierNameEn}
            </div>

            {/* Tuition Breakdown */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-left space-y-2 mb-6">
              <div className="flex justify-between text-xs text-slate-500">
                <span>{language === 'ar' ? 'القسط السنوي الأساسي:' : 'Standard Annual Tuition:'}</span>
                <span className="line-through">{formatCurrencyUSD(baseTuition)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-100">
                <span className="text-blue-950">
                  {language === 'ar' ? 'القسط بعد منحة التفوق:' : 'Estimated Tuition with Merit Aid:'}
                </span>
                <span className="text-emerald-700 text-base">
                  {formatCurrencyUSD(discountedTuition)} / yr
                </span>
              </div>
            </div>

            {/* Apply Action */}
            <button
              onClick={() => onApplyWithScore(score, scholarshipPercent)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.admissions.calcCta}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-4 h-4 text-amber-400" />
              ) : (
                <ArrowRight className="w-4 h-4 text-amber-400" />
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
