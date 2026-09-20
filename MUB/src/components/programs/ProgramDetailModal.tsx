'use client';

import React from 'react';
import { DepartmentProgram } from '@/data/programsData';
import { useLanguage } from '@/context/LanguageContext';
import { X, Cpu, Briefcase, Globe, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProgramDetailModalProps {
  program: DepartmentProgram | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (program: DepartmentProgram) => void;
}

export default function ProgramDetailModal({
  program,
  isOpen,
  onClose,
  onApply,
}: ProgramDetailModalProps) {
  const { language, t, direction } = useLanguage();

  if (!isOpen || !program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-4xl bg-white border border-slate-300 rounded-2xl shadow-2xl text-slate-900 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold text-blue-900 bg-blue-100 border border-blue-200 px-3 py-0.5 rounded-md">
              {language === 'ar' ? program.collegeNameAr : program.collegeNameEn}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-200 px-2.5 py-0.5 rounded">
              {language === 'ar' ? program.levelBadgeAr : program.levelBadgeEn}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E36] font-serif mb-3">
            {language === 'ar' ? program.nameAr : program.nameEn}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {language === 'ar' ? program.descriptionAr : program.descriptionEn}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">{t.programs.duration}</span>
              <span className="font-bold text-slate-900">
                {language === 'ar' ? program.durationAr : program.durationEn}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">{t.programs.credits}</span>
              <span className="font-bold text-blue-900">{program.credits} Hours</span>
            </div>
            <div>
              <span className="text-slate-500 block">{t.programs.language}</span>
              <span className="font-bold text-slate-900">
                {language === 'ar' ? program.languageAr : program.languageEn}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">
                {language === 'ar' ? 'الحد الأدنى للقبول العلمي' : 'Min. Baccalaureate'}
              </span>
              <span className="font-bold text-emerald-700">
                {program.minBaccalaureateScientific}%
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-slate-200">
          
          {/* Specialized Laboratories from Ground Truth */}
          <div>
            <h4 className="text-base font-bold text-[#0F1E36] flex items-center gap-2 mb-4 font-serif">
              <Cpu className="w-4 h-4 text-blue-800" />
              <span>{t.programs.keyLabs}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {program.laboratories.map((lab, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                >
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>{language === 'ar' ? lab.nameAr : lab.nameEn}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed pl-5">
                    {language === 'ar' ? lab.descAr : lab.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Malaysian Academic Articulation */}
          <div className="pt-6">
            <h4 className="text-base font-bold text-[#0F1E36] flex items-center gap-2 mb-3 font-serif">
              <Globe className="w-4 h-4 text-amber-700" />
              <span>{t.programs.malaysiaPathway}</span>
            </h4>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {language === 'ar' ? program.partnerExchangeAr : program.partnerExchangeEn}
            </div>
          </div>

          {/* Career Outcomes from Ground Truth */}
          <div className="pt-6">
            <h4 className="text-base font-bold text-[#0F1E36] flex items-center gap-2 mb-4 font-serif">
              <Briefcase className="w-4 h-4 text-emerald-700" />
              <span>{t.programs.careerOutcomes}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {program.careerOutcomes.map((career, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-xs text-slate-800 font-semibold"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            {language === 'ar'
              ? 'التقديم متاح الآن للعام الدراسي 2026/2027 لدى قسم التسجيل'
              : 'Admissions currently accepting applicants for Fall 2026/2027'}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 transition-colors"
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(program);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] shadow-sm transition-all"
            >
              <span>{t.programs.applyForProgram}</span>
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
