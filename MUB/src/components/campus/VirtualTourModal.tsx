'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { virtualTourHotspots, TourHotspot } from '@/data/campusData';
import { X, Video, MapPin, CheckCircle2, Layers } from 'lucide-react';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VirtualTourModal({ isOpen, onClose }: VirtualTourModalProps) {
  const { language } = useLanguage();
  const [activeHotspotId, setActiveHotspotId] = useState<string>(virtualTourHotspots[0].id);

  if (!isOpen) return null;

  const currentHotspot =
    virtualTourHotspots.find((h) => h.id === activeHotspotId) || virtualTourHotspots[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-5xl bg-white border border-slate-300 rounded-3xl shadow-2xl text-slate-900 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0F1E36] font-serif">
                {language === 'ar'
                  ? 'جولة مرافق الحرم الجامعي — شارع فلسطين، بغداد'
                  : 'Campus Facilities Showcase — Palestine St., Baghdad'}
              </h3>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                <span>
                  {language === 'ar' ? currentHotspot.floorAr : currentHotspot.floorEn}
                </span>
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-200 transition-colors"
            aria-label="Close tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport */}
        <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] bg-slate-100 overflow-hidden group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
            style={{ backgroundImage: `url(${currentHotspot.bgImage})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

          {/* Floating Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl text-slate-900">
            <h4 className="text-sm sm:text-base font-bold text-[#0F1E36] font-serif mb-1">
              {language === 'ar' ? currentHotspot.nameAr : currentHotspot.nameEn}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {language === 'ar' ? currentHotspot.descAr : currentHotspot.descEn}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(language === 'ar' ? currentHotspot.featuresAr : currentHotspot.featuresEn).map(
                (feat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{feat}</span>
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Hotspots Switcher Navigation Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-600 shrink-0 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-blue-900" />
              <span>{language === 'ar' ? 'المواقع:' : 'Spaces:'}</span>
            </span>
            {virtualTourHotspots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveHotspotId(spot.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeHotspotId === spot.id
                    ? 'bg-[#0F1E36] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {language === 'ar' ? spot.nameAr : spot.nameEn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
