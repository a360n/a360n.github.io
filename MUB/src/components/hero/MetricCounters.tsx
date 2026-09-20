'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Award, BookOpen, Cpu, ShieldCheck } from 'lucide-react';

export default function MetricCounters() {
  const { t } = useLanguage();

  const metrics = [
    {
      icon: ShieldCheck,
      stat: t.metrics.stat1Number,
      label: t.metrics.stat1Label,
      desc: t.metrics.stat1Desc,
      iconColor: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      icon: BookOpen,
      stat: t.metrics.stat2Number,
      label: t.metrics.stat2Label,
      desc: t.metrics.stat2Desc,
      iconColor: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      icon: Cpu,
      stat: t.metrics.stat3Number,
      label: t.metrics.stat3Label,
      desc: t.metrics.stat3Desc,
      iconColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Award,
      stat: t.metrics.stat4Number,
      label: t.metrics.stat4Label,
      desc: t.metrics.stat4Desc,
      iconColor: 'text-purple-700 bg-purple-50 border-purple-200',
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {metrics.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border ${item.iconColor}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Stat number */}
                <div className="text-2xl sm:text-3xl font-black text-[#0F1E36] font-serif tracking-tight mb-1">
                  {item.stat}
                </div>

                {/* Label */}
                <div className="text-sm font-bold text-slate-800 mb-1">
                  {item.label}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
