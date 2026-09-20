'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { X, Lock, UserCheck, BookOpen, GraduationCap, ShieldCheck } from 'lucide-react';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortalModal({ isOpen, onClose }: PortalModalProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'student' | 'faculty' | 'applicant'>('student');
  const [idInput, setIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: 'success',
        text:
          language === 'ar'
            ? 'تم الاتصال بالبوابة الآمنة بنجاح. جاري تحويلك إلى لوحة التحكم...'
            : 'Authenticated successfully. Redirecting to your secure university workspace...',
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-white border border-slate-300 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close portal dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#0F1E36] font-serif">{t.portal.title}</h3>
          <p className="text-xs text-slate-500 mt-1">{t.portal.subtitle}</p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 mb-6">
          <button
            onClick={() => {
              setActiveTab('student');
              setStatusMessage(null);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'student'
                ? 'bg-[#0F1E36] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t.portal.studentTab}</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('faculty');
              setStatusMessage(null);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'faculty'
                ? 'bg-[#0F1E36] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.portal.facultyTab}</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('applicant');
              setStatusMessage(null);
            }}
            className={`flex items-center justify-center gap-1.5 py-2 px-1 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'applicant'
                ? 'bg-[#0F1E36] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{t.portal.applicantTab}</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {activeTab === 'applicant'
                ? language === 'ar'
                  ? 'رقم ملف التقديم (Application Ref)'
                  : 'Application Reference / National ID'
                : language === 'ar'
                ? 'الرقم الجامعي الرسمي'
                : 'Institutional ID'}
            </label>
            <input
              type="text"
              required
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder={
                activeTab === 'applicant'
                  ? 'MUB-2026-XXXX'
                  : activeTab === 'faculty'
                  ? 'FAC-XXXXX'
                  : 'STU-2026-XXXX'
              }
              className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 shadow-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    language === 'ar'
                      ? 'يرجى مراجعة شعبة تكنولوجيا المعلومات في الحرم الجامعي بشارع فلسطين أو الاتصال بـ info@mub.edu.iq'
                      : 'Please contact MUB IT Helpdesk on Palestine Street or email info@mub.edu.iq.'
                  );
                }}
                className="text-[11px] text-blue-900 hover:underline font-semibold"
              >
                {t.portal.forgotPassword}
              </a>
            </div>
            <input
              type="password"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white border border-slate-300 focus:border-blue-900 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 shadow-sm"
            />
          </div>

          {statusMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-700" />
              <span>{statusMessage.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#0F1E36] hover:bg-[#182F57] shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Lock className="w-4 h-4 text-amber-400" />
            )}
            <span>{t.portal.loginBtn}</span>
          </button>
        </form>

        {/* Security Stamp */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-bit TLS Encrypted Institutional Portal</span>
        </div>
      </div>
    </div>
  );
}
