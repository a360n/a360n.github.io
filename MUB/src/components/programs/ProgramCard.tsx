'use client';

import React from 'react';
import { DepartmentProgram } from '@/data/programsData';
import { useLanguage } from '@/context/LanguageContext';
import { Clock, BookOpen, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface ProgramCardProps {
  program: DepartmentProgram;
  onSelectProgram: (program: DepartmentProgram) => void;
  onApplyProgram: (program: DepartmentProgram) => void;
}

export default function ProgramCard({
  program,
  onSelectProgram,
  onApplyProgram,
}: ProgramCardProps) {
  const { language, t, direction } = useLanguage();

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md p-6 transition-all duration-200 overflow-hidden">
      <div>
        {/* Badges Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
            {language === 'ar' ? program.collegeNameAr : program.collegeNameEn}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {language === 'ar' ? program.levelBadgeAr : program.levelBadgeEn}
          </span>
        </div>

        {/* Program Title */}
        <h3 className="text-lg sm:text-xl font-bold text-[#0F1E36] group-hover:text-blue-900 transition-colors font-serif mb-2 leading-snug">
          {language === 'ar' ? program.nameAr : program.nameEn}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {language === 'ar' ? program.descriptionAr : program.descriptionEn}
        </p>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 text-xs text-slate-700">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="truncate text-[11px]">
              {language === 'ar' ? program.durationAr : program.durationEn}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span className="text-[11px]">{program.credits} {t.programs.credits}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2 pt-1.5 border-t border-slate-200/70 text-[11px] text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              {language === 'ar' ? 'الحد الأدنى للمعدل العلمي:' : 'Min. Baccalaureate:'}{' '}
              <strong className="text-slate-900">{program.minBaccalaureateScientific}%</strong>
            </span>
          </div>
        </div>

        {/* Laboratories Preview */}
        <div className="mb-5 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            {language === 'ar' ? 'المختبرات التخصصية:' : 'Specialized Laboratories:'}
          </span>
          <div className="flex flex-wrap gap-1">
            {program.laboratories.slice(0, 2).map((lab, lIdx) => (
              <span
                key={lIdx}
                className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 line-clamp-1"
              >
                {language === 'ar' ? lab.nameAr : lab.nameEn}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onSelectProgram(program)}
          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 border border-slate-200 transition-colors text-center"
        >
          {t.programs.viewCurriculum}
        </button>

        <button
          onClick={() => onApplyProgram(program)}
          className="inline-flex items-center justify-center p-2.5 rounded-xl text-white bg-[#0F1E36] hover:bg-[#182F57] shadow-sm transition-transform active:scale-95"
          title={t.programs.applyForProgram}
          aria-label={t.programs.applyForProgram}
        >
          {direction === 'rtl' ? (
            <ArrowLeft className="w-4 h-4 text-amber-400" />
          ) : (
            <ArrowRight className="w-4 h-4 text-amber-400" />
          )}
        </button>
      </div>
    </div>
  );
}
