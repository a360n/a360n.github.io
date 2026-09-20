'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import AccreditationBadges from './AccreditationBadges';
import { MapPin, Phone, Mail, Globe, CheckCircle2, Clock } from 'lucide-react';
import generalInfo from '@/data/scraped/general_info.json';

interface FooterProps {
  onOpenApply: () => void;
  onOpenPortal: () => void;
}

export default function Footer({ onOpenApply, onOpenPortal }: FooterProps) {
  const { language, t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#0A1324] text-slate-300 text-xs border-t border-slate-800">
      
      {/* Accreditation Badges Banner */}
      <AccreditationBadges />

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & University Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center bg-[#0F1E36] border border-amber-500/40 rounded-xl p-1.5 shadow-md">
                <Image
                  src="/logo.png"
                  alt="Malaysian University of Baghdad Official Emblem"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain filter brightness-105"
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white font-serif block">
                  {language === 'ar' ? 'الجامعة الماليزية في بغداد' : 'Malaysian University of Baghdad'}
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  {language === 'ar' ? 'مؤسسة جامعية معتمدة رسمياً' : 'MoHESR Licensed Higher Education'}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-md">
              {t.footer.tagline}
            </p>

            <p className="text-slate-400 text-[11px] leading-relaxed max-w-md border-l-2 border-amber-500/50 pl-3">
              {t.footer.accreditationNotice}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-2">
                {language === 'ar' ? 'النشرة الأكاديمية الرسمية' : 'Subscribe to Academic Bulletin'}
              </span>
              {isSubscribed ? (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {language === 'ar'
                      ? 'تم تسجيل بريدك بنجاح لتلقي المستجدات.'
                      : 'Subscribed successfully to MUB Academic Gazette.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={language === 'ar' ? 'بريدك الإلكتروني...' : 'Enter your email...'}
                    className="flex-1 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-colors shrink-0"
                  >
                    {language === 'ar' ? 'اشتراك' : 'Join'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Academic Faculties */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif tracking-wider">
              {t.footer.collegesHeading}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'كلية هندسة الذكاء الاصطناعي' : 'College of AI Engineering'}
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'الذكاء الاصطناعي وتعلّم الآلة' : 'Artificial Intelligence & ML'}
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'كلية الهندسة' : 'College of Engineering'}
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'هندسة الميكاترونكس والروبوتات' : 'Mechatronics & Robotics'}
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'هندسة الحاسوب والأنظمة الرقمية' : 'Computer Engineering'}
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'كلية القانون والتشريعات الرقمية' : 'College of Law & Cyber Governance'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Admissions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif tracking-wider">
              {t.footer.quickLinksHeading}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={onOpenApply}
                  className="text-amber-400 hover:text-amber-300 font-bold"
                >
                  {language === 'ar' ? 'التقديم للعام 2026/2027' : 'Apply for 2026/2027'}
                </button>
              </li>
              <li>
                <a href="#admissions" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'حاسبة المعدل ومنح التفوق' : 'Merit Aid & Tuition Calculator'}
                </a>
              </li>
              <li>
                <a href="#admissions" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'شروط القبول والوثائق' : 'Admissions Roadmap'}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {language === 'ar' ? 'بوابة الطالب (SIS)' : 'Student Portal (SIS)'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  {language === 'ar' ? 'بوابة التدريسيين' : 'Faculty Portal'}
                </button>
              </li>
              <li>
                <a href="#bilateral" className="hover:text-amber-300 transition-colors">
                  {language === 'ar' ? 'الشراكة مع جامعات ماليزيا' : 'Malaysian Twinning (UTP / UMPSA)'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Campus Address & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-serif tracking-wider">
              {t.footer.contactHeading}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${generalInfo.contact.phone}`}
                  dir="ltr"
                  className="hover:text-amber-300 transition-colors"
                >
                  {generalInfo.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${generalInfo.contact.email}`}
                  className="hover:text-amber-300 transition-colors"
                >
                  {generalInfo.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-slate-400">
                  {language === 'ar'
                    ? generalInfo.contact.workingHours.ar
                    : generalInfo.contact.workingHours.en}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-slate-300 font-mono">mub.edu.iq</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© 2026 {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#regulations" className="hover:text-slate-300 transition-colors">
              MoHESR Regulations
            </a>
            <span>•</span>
            <a href="#mqa" className="hover:text-slate-300 transition-colors">
              MQA Framework
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
