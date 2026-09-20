'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Download, FileText, CheckCircle2, Sparkles } from 'lucide-react';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProspectusModal({ isOpen, onClose }: ProspectusModalProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white border border-slate-300 rounded-3xl shadow-2xl text-slate-900 overflow-hidden my-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 mb-3 shadow-sm">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#0F1E36] font-serif">
            {language === 'ar'
              ? 'دليل الجامعة الأكاديمي الرسمي 2026/2027'
              : 'Official University Prospectus 2026/2027'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'ar'
              ? 'تفاصيل الخطط الدراسية، المختبرات التخصصية، وضوابط المعادلة مع الجامعات الماليزية'
              : 'Complete syllabi, specialized laboratories, and credit transfer guidelines with Malaysia'}
          </p>
        </div>

        {downloaded ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#0F1E36] font-serif">
              {language === 'ar'
                ? 'جاري تنزيل الدليل الأكاديمي!'
                : 'Your Download Has Commenced!'}
            </h4>
            <p className="text-xs text-slate-600">
              {language === 'ar'
                ? 'تم إرسال نسخة رقمية أيضاً إلى بريدك الإلكتروني.'
                : 'A high-resolution PDF copy has been dispatched to your email address.'}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F1E36] hover:bg-[#182F57]"
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleDownload} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {language === 'ar' ? 'البريد الإلكتروني لاستلام الدليل' : 'Your Email for Digital Dispatch'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 shadow-sm"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Prospectus Contents (52 Pages):</span>
              </div>
              <ul className="text-[11px] text-slate-600 space-y-1 pl-5 list-disc">
                <li>Complete 4-year curriculum for AI Engineering, Engineering, and Law</li>
                <li>Strategic partnerships with UTP and UMPSA details</li>
                <li>English language requirements & equivalency options</li>
                <li>Palestine Street campus lab facilities and admissions guide</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'ar'
                  ? 'تنزيل الدليل الأكاديمي (PDF)'
                  : 'Download Academic Prospectus (PDF)'}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
