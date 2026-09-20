'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { verifiedPrograms, DepartmentProgram } from '@/data/programsData';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface QuickApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedProgram?: DepartmentProgram | null;
  preCalculatedScore?: number | null;
}

export default function QuickApplyModal({
  isOpen,
  onClose,
  preSelectedProgram,
  preCalculatedScore,
}: QuickApplyModalProps) {
  const { language, t, direction } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('Iraqi');
  const [selectedProgramId, setSelectedProgramId] = useState(
    preSelectedProgram ? preSelectedProgram.id : verifiedPrograms[0].id
  );
  const [highSchoolScore, setHighSchoolScore] = useState(
    preCalculatedScore ? preCalculatedScore.toString() : '85'
  );
  const [hasUploadedDocs, setHasUploadedDocs] = useState(true);

  useEffect(() => {
    if (preSelectedProgram) {
      setSelectedProgramId(preSelectedProgram.id);
    }
  }, [preSelectedProgram]);

  useEffect(() => {
    if (preCalculatedScore) {
      setHighSchoolScore(preCalculatedScore.toString());
    }
  }, [preCalculatedScore]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F1E36', '#B48C20', '#1E3A8A', '#10B981'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-300 rounded-3xl shadow-2xl text-slate-900 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors z-20"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-800" />
            <span>{language === 'ar' ? 'استمارة القبول والتسجيل' : 'Official Admissions Portal'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0F1E36] font-serif">
            {t.applyModal.title}
          </h3>

          {/* Stepper Indicator */}
          {!isSubmitted && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 text-xs">
              <div
                className={`flex items-center gap-2 ${
                  currentStep >= 1 ? 'text-[#0F1E36] font-bold' : 'text-slate-400'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[11px]">
                  1
                </span>
                <span className="hidden sm:inline">{t.applyModal.step1}</span>
              </div>
              <div className="w-12 h-px bg-slate-200" />
              <div
                className={`flex items-center gap-2 ${
                  currentStep >= 2 ? 'text-[#0F1E36] font-bold' : 'text-slate-400'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[11px]">
                  2
                </span>
                <span className="hidden sm:inline">{t.applyModal.step2}</span>
              </div>
              <div className="w-12 h-px bg-slate-200" />
              <div
                className={`flex items-center gap-2 ${
                  currentStep >= 3 ? 'text-[#0F1E36] font-bold' : 'text-slate-400'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[11px]">
                  3
                </span>
                <span className="hidden sm:inline">{t.applyModal.step3}</span>
              </div>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-[#0F1E36] font-serif">
                {t.applyModal.successTitle}
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {t.applyModal.successMessage}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 max-w-xs mx-auto">
                <span className="text-xs text-slate-500 block mb-1">
                  {language === 'ar' ? 'رقم ملف القبول الأكاديمي' : 'Official Application ID'}
                </span>
                <span className="text-xl font-mono font-bold text-[#0F1E36]">
                  MUB-2026-8942
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F1E36] hover:bg-[#182F57]"
                >
                  {language === 'ar' ? 'العودة للرئيسية' : 'Return to University Portal'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.applyModal.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: أحمد علي محمد السعدي' : 'e.g. Ahmed Ali Mohammed'}
                      className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.applyModal.email} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@example.com"
                        className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {t.applyModal.phone} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0770 123 4567"
                        className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.applyModal.nationality}
                    </label>
                    <input
                      type="text"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] transition-colors"
                    >
                      <span>{t.applyModal.next}</span>
                      {direction === 'rtl' ? (
                        <ArrowLeft className="w-4 h-4 text-amber-400" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.applyModal.preferredCollege} *
                    </label>
                    <select
                      value={selectedProgramId}
                      onChange={(e) => setSelectedProgramId(e.target.value)}
                      className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
                    >
                      {verifiedPrograms.map((prog) => (
                        <option key={prog.id} value={prog.id}>
                          {language === 'ar'
                            ? `${prog.collegeNameAr} — ${prog.nameAr}`
                            : `${prog.collegeNameEn} — ${prog.nameEn}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.applyModal.highSchoolScore} *
                    </label>
                    <input
                      type="number"
                      min={60}
                      max={100}
                      required
                      value={highSchoolScore}
                      onChange={(e) => setHighSchoolScore(e.target.value)}
                      className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {language === 'ar'
                        ? 'معدل 75% فما فوق مؤهل لمنحة تفوق أكاديمية جزئية وفق التعليمات'
                        : 'Baccalaureate scores 75%+ qualify for academic merit discounts.'}
                    </span>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
                    >
                      {t.applyModal.back}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] transition-colors"
                    >
                      <span>{t.applyModal.next}</span>
                      {direction === 'rtl' ? (
                        <ArrowLeft className="w-4 h-4 text-amber-400" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">{language === 'ar' ? 'مقدم الطلب:' : 'Applicant:'}</span>
                      <strong className="text-slate-900">{fullName || 'Not specified'}</strong>
                    </div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500">{language === 'ar' ? 'البرنامج المطلوب:' : 'Program:'}</span>
                      <strong className="text-blue-900">
                        {verifiedPrograms.find((p) => p.id === selectedProgramId)?.nameEn}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{language === 'ar' ? 'المعدل الوزاري:' : 'Baccalaureate Score:'}</span>
                      <strong className="text-emerald-700">{highSchoolScore}%</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <input
                      type="checkbox"
                      id="confirmDocs"
                      checked={hasUploadedDocs}
                      onChange={(e) => setHasUploadedDocs(e.target.checked)}
                      className="mt-1 rounded accent-[#0F1E36]"
                    />
                    <label htmlFor="confirmDocs" className="text-xs text-slate-700 cursor-pointer">
                      {language === 'ar'
                        ? 'أؤكد صحة البيانات المدخلة واستيفاء شرط العمر (تولد 2002 فما فوق) وتقديم الوثائق الأصلية عند مراجعة قسم التسجيل.'
                        : 'I confirm the accuracy of submitted data, compliance with the birth year criterion (2002+), and agree to present original certificates.'}
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
                    >
                      {t.applyModal.back}
                    </button>
                    <button
                      type="submit"
                      disabled={!hasUploadedDocs}
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] transition-all disabled:opacity-50"
                    >
                      <span>{t.applyModal.submit}</span>
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
