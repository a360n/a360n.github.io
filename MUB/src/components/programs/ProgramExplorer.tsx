'use client';

import React, { useState, useMemo } from 'react';
import { verifiedPrograms, DepartmentProgram } from '@/data/programsData';
import { useLanguage } from '@/context/LanguageContext';
import ProgramCard from './ProgramCard';
import ProgramDetailModal from './ProgramDetailModal';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProgramExplorerProps {
  onOpenApplyWithProgram: (program: DepartmentProgram) => void;
}

export default function ProgramExplorer({ onOpenApplyWithProgram }: ProgramExplorerProps) {
  const { language, t } = useLanguage();
  const [selectedCollege, setSelectedCollege] = useState<'all' | 'college-ai' | 'college-engineering' | 'college-law'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'undergraduate' | 'dual_degree'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProgram, setActiveModalProgram] = useState<DepartmentProgram | null>(null);

  const filteredPrograms = useMemo(() => {
    return verifiedPrograms.filter((prog) => {
      // College filter
      if (selectedCollege !== 'all' && prog.collegeId !== selectedCollege) {
        return false;
      }
      // Level filter
      if (selectedLevel !== 'all' && prog.level !== selectedLevel) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchEn =
          prog.nameEn.toLowerCase().includes(q) ||
          prog.collegeNameEn.toLowerCase().includes(q) ||
          prog.descriptionEn.toLowerCase().includes(q);
        const matchAr =
          prog.nameAr.includes(q) ||
          prog.collegeNameAr.includes(q) ||
          prog.descriptionAr.includes(q);
        return matchEn || matchAr;
      }
      return true;
    });
  }, [selectedCollege, selectedLevel, searchQuery]);

  return (
    <section id="programs" className="relative py-16 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>{t.programs.tagline}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1E36] font-serif tracking-tight mb-3">
            {t.programs.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.programs.subtitle}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Top row: College Tabs & Search */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* College Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 w-full lg:w-auto">
              <button
                onClick={() => setSelectedCollege('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCollege === 'all'
                    ? 'bg-[#0F1E36] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {t.programs.allColleges}
              </button>
              <button
                onClick={() => setSelectedCollege('college-ai')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCollege === 'college-ai'
                    ? 'bg-[#0F1E36] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {t.programs.collegeAI}
              </button>
              <button
                onClick={() => setSelectedCollege('college-engineering')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCollege === 'college-engineering'
                    ? 'bg-[#0F1E36] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {t.programs.collegeEngineering}
              </button>
              <button
                onClick={() => setSelectedCollege('college-law')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCollege === 'college-law'
                    ? 'bg-[#0F1E36] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {t.programs.collegeLaw}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ar' ? 'بحث في التخصصات...' : 'Search programs...'
                }
                className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl py-2.5 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 shadow-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 pointer-events-none" />
            </div>

          </div>

          {/* Bottom row: Degree Level Sub-filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-900" />
              <span>{language === 'ar' ? 'المسار الأكاديمي:' : 'Degree Level:'}</span>
            </span>
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3 py-1 rounded-full border transition-all shrink-0 font-medium ${
                selectedLevel === 'all'
                  ? 'bg-blue-900 border-blue-900 text-white font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.programs.filterAllLevels}
            </button>
            <button
              onClick={() => setSelectedLevel('undergraduate')}
              className={`px-3 py-1 rounded-full border transition-all shrink-0 font-medium ${
                selectedLevel === 'undergraduate'
                  ? 'bg-blue-900 border-blue-900 text-white font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.programs.filterUndergraduate}
            </button>
            <button
              onClick={() => setSelectedLevel('dual_degree')}
              className={`px-3 py-1 rounded-full border transition-all shrink-0 font-medium ${
                selectedLevel === 'dual_degree'
                  ? 'bg-blue-900 border-blue-900 text-white font-bold'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.programs.filterDualDegree}
            </button>
          </div>

        </div>

        {/* Programs Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
              <ProgramCard
                key={prog.id}
                program={prog}
                onSelectProgram={(p) => setActiveModalProgram(p)}
                onApplyProgram={(p) => onOpenApplyWithProgram(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-sm">
              {language === 'ar'
                ? 'لا توجد برامج مطابقة لمعايير البحث.'
                : 'No programs match your selected filter criteria.'}
            </p>
            <button
              onClick={() => {
                setSelectedCollege('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-1.5 rounded-lg text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200 hover:bg-blue-100"
            >
              {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset All Filters'}
            </button>
          </div>
        )}

      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={activeModalProgram}
        isOpen={!!activeModalProgram}
        onClose={() => setActiveModalProgram(null)}
        onApply={(p) => {
          setActiveModalProgram(null);
          onOpenApplyWithProgram(p);
        }}
      />
    </section>
  );
}
