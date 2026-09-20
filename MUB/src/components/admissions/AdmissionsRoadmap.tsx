'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import TuitionCalculator from './TuitionCalculator';
import admissionsJson from '@/data/scraped/admissions.json';
import { Sparkles, FileText, CheckCircle2, UserCheck, Award, GraduationCap, ArrowRight, ArrowLeft, AlertCircle, Globe } from 'lucide-react';

interface AdmissionsRoadmapProps {
  onOpenApply: () => void;
  onApplyWithScore: (score: number, scholarshipPercent: number) => void;
}

export default function AdmissionsRoadmap({
  onOpenApply,
  onApplyWithScore,
}: AdmissionsRoadmapProps) {
  const { language, t, direction } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = admissionsJson.admissionsProcedure;
  const docs = admissionsJson.requiredDocuments;
  const englishCerts = admissionsJson.englishRequirements.acceptedCertifications;

  return (
    <section id="admissions" className="relative py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-800" />
            <span>{t.admissions.tagline}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1E36] font-serif tracking-tight mb-3">
            {t.admissions.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.admissions.subtitle}
          </p>

          {/* Official MoHESR Age Notice Callout */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{t.admissions.ageNotice}</span>
          </div>
        </div>

        {/* 5-Step Interactive Roadmap */}
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {steps.map((step) => {
              const isCurrent = activeStep === step.step;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isCurrent
                      ? 'bg-[#0F1E36] border-[#0F1E36] text-white shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h4
                    className={`text-xs sm:text-sm font-bold mb-1 line-clamp-1 ${
                      isCurrent ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {language === 'ar' ? step.titleAr : step.titleEn}
                  </h4>
                  <p
                    className={`text-[11px] line-clamp-2 leading-relaxed ${
                      isCurrent ? 'text-slate-200' : 'text-slate-500'
                    }`}
                  >
                    {language === 'ar' ? step.descAr : step.descEn}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Callout */}
          <div className="mt-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs uppercase font-bold text-blue-900 tracking-wider">
                {language === 'ar' ? `المرحلة ${activeStep} من 5` : `Phase ${activeStep} of 5`}
              </span>
              <p className="text-sm text-slate-700 font-medium">
                {language === 'ar' ? steps[activeStep - 1].descAr : steps[activeStep - 1].descEn}
              </p>
            </div>
            <button
              onClick={onOpenApply}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] transition-colors"
            >
              <span>{language === 'ar' ? 'ابدأ التسجيل الآن' : 'Start Enrollment'}</span>
              {direction === 'rtl' ? (
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              )}
            </button>
          </div>
        </div>

        {/* Embedded Interactive Tuition & Scholarship Estimator */}
        <div className="mb-14">
          <TuitionCalculator onApplyWithScore={onApplyWithScore} />
        </div>

        {/* English Requirements & Required Documents Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* English Requirements */}
          <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#0F1E36] font-bold text-base font-serif">
              <Globe className="w-5 h-5 text-blue-800" />
              <h3>{t.admissions.englishRequirementsTitle}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'ar'
                ? admissionsJson.englishRequirements.overviewAr
                : admissionsJson.englishRequirements.overviewEn}
            </p>

            <div className="space-y-2 pt-2">
              {englishCerts.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800">{cert.name}</span>
                  <span className="text-[11px] font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {cert.minScore}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Documents Checklist */}
          <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#0F1E36] font-bold text-base font-serif">
              <FileText className="w-5 h-5 text-amber-700" />
              <h3>{t.admissions.docsChecklistTitle}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'ar'
                ? 'الوثائق الرسمية المطلوبة من المتقدمين لإتمام التسجيل لدى قسم القبول في شارع فلسطين:'
                : 'Mandatory documentation required by the MUB Admissions Directorate on Palestine Street:'}
            </p>

            <div className="space-y-2 pt-2">
              {docs.map((d, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">
                    {language === 'ar' ? d.itemAr : d.itemEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
