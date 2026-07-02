import React from "react";
import { Award, Star, Trophy, Target, Globe, Music, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { TranslationDict } from "../translations";

interface AchievementsTabProps {
  t: TranslationDict;
}

export default function AchievementsTab({ t }: AchievementsTabProps) {
  const milestones = [
    {
      icon: <Globe className="w-6 h-6 text-brand-yellow-500" />,
      title: t.ach_milestone_1_title,
      desc: t.ach_milestone_1_desc,
      tag: "GLOBAL",
      metric: "300+ Students"
    },
    {
      icon: <Trophy className="w-6 h-6 text-brand-yellow-500" />,
      title: t.ach_milestone_2_title,
      desc: t.ach_milestone_2_desc,
      tag: "HONOR",
      metric: "Winner 2025"
    },
    {
      icon: <Music className="w-6 h-6 text-brand-yellow-500" />,
      title: t.ach_milestone_3_title,
      desc: t.ach_milestone_3_desc,
      tag: "COMMUNITY",
      metric: "15+ Festivals"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-yellow-500" />,
      title: t.ach_milestone_4_title,
      desc: t.ach_milestone_4_desc,
      tag: "ACADEMICS",
      metric: "100% Pass Rate"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-yellow-500" />,
      title: t.ach_milestone_5_title,
      desc: t.ach_milestone_5_desc,
      tag: "INNOVATION",
      metric: "First Ever"
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn max-w-7xl mx-auto px-1">
      {/* Banner / Title Header */}
      <div className="relative bg-white border border-brand-brown-100 rounded-3xl p-6 md:p-8 overflow-hidden shadow-xs">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-yellow-100 rounded-full translate-x-1/3 -translate-y-1/3 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-brand-brown-50 rounded-full -translate-x-1/4 translate-y-1/4 opacity-40"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-brand-yellow-100 text-brand-yellow-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-yellow-200">
              <Award className="w-3.5 h-3.5" /> Swarohana Excellence
            </div>
            <h2 className="font-serif text-2xl md:text-3.5xl font-extrabold text-brand-brown-900 leading-tight">
              {t.achievements_title}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-2xl font-medium">
              {t.achievements_subtitle}
            </p>
          </div>
          
          <div className="bg-brand-brown-50 px-5 py-4 rounded-2xl border border-brand-brown-100 flex items-center gap-3 self-stretch md:self-auto justify-center">
            <Trophy className="w-10 h-10 text-brand-yellow-500" />
            <div>
              <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">ACCREDITATION</span>
              <span className="text-xs font-bold text-brand-brown-900">Grade-A Carnatic Studio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid layout with low vertical height requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className="group relative bg-white border border-brand-brown-100 rounded-2xl p-5 shadow-xs hover:border-brand-yellow-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Background shimmer */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow-50/50 rounded-full translate-x-1/4 -translate-y-1/4 group-hover:scale-125 transition-transform duration-500"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-brand-brown-50 flex items-center justify-center group-hover:bg-brand-yellow-100 transition-colors">
                  {m.icon}
                </div>
                <span className="text-[9px] font-bold tracking-widest text-brand-yellow-700 bg-brand-yellow-50 px-2 py-0.5 rounded-md uppercase border border-brand-yellow-100">
                  {m.tag}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-extrabold text-brand-brown-900 group-hover:text-brand-yellow-800 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">
                  {m.desc}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 mt-4 border-t border-brand-brown-50 flex items-center justify-between text-xs font-bold text-brand-brown-700">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-sans">Achievement metric</span>
              <span className="text-brand-yellow-600 font-mono">{m.metric}</span>
            </div>
          </div>
        ))}

        {/* Dynamic Success Rates / Live Performance tracker item */}
        <div className="bg-brand-brown-50/60 border border-brand-brown-100 rounded-2xl p-5 shadow-inner flex flex-col justify-between">
          <div className="space-y-3">
            <span className="inline-block text-[10px] font-bold text-brand-yellow-800 uppercase tracking-widest bg-brand-yellow-100 px-2 py-0.5 rounded-full border border-brand-yellow-200">
              LIVE ACCREDITATION METRIC
            </span>
            <h3 className="font-serif text-lg font-bold text-brand-brown-900">
              Empowering Devotion
            </h3>
            <p className="text-xs text-brand-brown-800 leading-relaxed font-medium">
              We track daily active musical training and ensure absolute voice safety and breath control metrics. Join our worldwide learner network.
            </p>
          </div>
          
          <div className="pt-4 border-t border-brand-brown-100/60 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-brand-brown-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">PR</div>
              <div className="w-7 h-7 rounded-full bg-brand-yellow-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">AK</div>
              <div className="w-7 h-7 rounded-full bg-brand-brown-700 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">SV</div>
            </div>
            <span className="text-[10px] font-bold text-brand-brown-700">Join 300+ Active Performers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
