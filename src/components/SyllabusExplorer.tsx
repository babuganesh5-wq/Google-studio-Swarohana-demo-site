import React, { useState } from "react";
import { SYLLABUS_DATA } from "../data";
import { SyllabusLevel, SyllabusItem, ClassRegistration } from "../types";
import { BookOpen, Users, Clock, ArrowRight, ChevronDown, ChevronUp, Copy, Check, Sparkles, Volume, CheckCircle2, Circle } from "lucide-react";
import { TranslationDict } from "../translations";

export default function SyllabusExplorer({
  onSelectPracticePitch,
  onAskTutor,
  t,
  language,
  syllabusChecklist,
  onToggleChecklist,
  activeRegistration,
}: {
  onSelectPracticePitch: (pitchName: string) => void;
  onAskTutor: (prompt: string) => void;
  t: TranslationDict;
  language: "en" | "ta";
  syllabusChecklist: Record<string, boolean>;
  onToggleChecklist: (itemId: string) => void;
  activeRegistration: ClassRegistration | null;
}) {
  const [selectedLevelId, setSelectedLevelId] = useState<"level1" | "level2" | "level3">("level1");
  const [classType, setClassType] = useState<"online" | "live_group">("online");
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Find currently selected level
  const currentLevel = SYLLABUS_DATA.find((l) => l.levelId === selectedLevelId) || SYLLABUS_DATA[0];

  const handleToggleExpand = (id: string) => {
    if (expandedItemId === id) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(id);
    }
  };

  const handleCopyNotation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItemId(id);
    setTimeout(() => {
      setCopiedItemId(null);
    }, 2000);
  };

  // Determine duration and class capacity text based on class type selection
  const getDurationText = (level: SyllabusLevel) => {
    return classType === "online" ? level.onlineDuration : level.groupDuration;
  };

  const getCapacityText = (level: SyllabusLevel) => {
    return classType === "online" 
      ? `${level.onlineStudents} ${language === "en" ? "Students Max" : "மாணவர்கள் அதிகபட்சம்"}` 
      : `${level.groupStudents} ${language === "en" ? "Students Group" : "மாணவர்கள் குழு"}`;
  };

  // Calculate completed items for progress meter
  const totalItems = currentLevel.items.length;
  const completedItems = currentLevel.items.filter(item => !!syllabusChecklist[item.id]).length;
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn max-w-7xl mx-auto px-1">
      {/* HEADER CONTROLS */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-brand-brown-50 p-5 rounded-3xl border border-brand-brown-100">
        {/* Level selection tabs */}
        <div className="flex flex-wrap gap-2">
          {SYLLABUS_DATA.map((level) => {
            const isActive = selectedLevelId === level.levelId;
            return (
              <button
                key={level.levelId}
                onClick={() => {
                  setSelectedLevelId(level.levelId);
                  setExpandedItemId(null);
                }}
                className={`px-5 py-3 rounded-2xl font-serif font-bold text-sm transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-brand-yellow-500 text-white shadow-md border border-brand-yellow-600"
                    : "bg-white text-brand-brown-800 hover:bg-brand-brown-100 border border-brand-brown-100"
                }`}
              >
                <div>
                  <span className={`block text-[10px] uppercase tracking-widest font-sans ${isActive ? "text-brand-yellow-100" : "text-gray-400 font-bold"}`}>
                    {language === "en" ? level.stage : level.tamilStage}
                  </span>
                  {language === "en" ? level.title : level.tamilTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Class Type Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-extrabold text-brand-brown-500 uppercase tracking-wider">
            {t.class_model}
          </span>
          <div className="bg-white p-1 rounded-2xl border border-brand-brown-100 flex gap-1">
            <button
              onClick={() => setClassType("online")}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                classType === "online"
                  ? "bg-brand-yellow-500 text-white font-extrabold shadow-xs"
                  : "text-brand-brown-600 hover:text-brand-brown-950"
              }`}
            >
              {t.online_individual}
            </button>
            <button
              onClick={() => setClassType("live_group")}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                classType === "live_group"
                  ? "bg-brand-yellow-500 text-white font-extrabold shadow-xs"
                  : "text-brand-brown-600 hover:text-brand-brown-950"
              }`}
            >
              {t.live_group}
            </button>
          </div>
        </div>
      </div>

      {/* SYLLABUS OVERVIEW BANNER */}
      <div className="bg-white border border-brand-brown-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2 text-brand-yellow-600 dark:text-brand-yellow-500 font-bold text-xs uppercase tracking-widest">
            <BookOpen className="w-4 h-4" /> 
            {language === "en" 
              ? `${currentLevel.stage} • ${currentLevel.stage}` 
              : `${currentLevel.tamilStage} • ${currentLevel.stage}`}
          </div>
          <h3 className="font-serif text-2xl md:text-3.5xl font-extrabold text-brand-brown-900 flex flex-wrap items-center gap-2">
            {language === "en" ? currentLevel.title : currentLevel.tamilTitle}
            <span className="text-base text-brand-brown-500 font-sans font-medium hidden sm:inline">
              ({language === "en" ? currentLevel.tamilTitle : currentLevel.title})
            </span>
          </h3>
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            {language === "en" 
              ? "Official curriculum of Swarohana Music Studio. Suitable for certification goals." 
              : "ஸ்வரோஹனா இசை அகாடமியின் அதிகாரப்பூர்வ பாடத்திட்டம். சான்றிதழ் தேர்வுகளுக்கு உகந்தது."}
          </p>
        </div>

        {/* Statistics info boxes */}
        <div className="flex flex-wrap gap-4 relative z-10">
          <div className="bg-brand-brown-50 px-4 py-3 rounded-2xl border border-brand-brown-100 flex items-center gap-3">
            <Clock className="w-5 h-5 text-brand-yellow-600 dark:text-brand-yellow-500" />
            <div>
              <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">{t.level_duration}</span>
              <span className="text-xs md:text-sm font-bold text-brand-brown-900">{getDurationText(currentLevel)}</span>
            </div>
          </div>
          <div className="bg-brand-brown-50 px-4 py-3 rounded-2xl border border-brand-brown-100 flex items-center gap-3">
            <Users className="w-5 h-5 text-brand-yellow-600 dark:text-brand-yellow-500" />
            <div>
              <span className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider">{t.batch_size}</span>
              <span className="text-xs md:text-sm font-bold text-brand-brown-900">{getCapacityText(currentLevel)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Syllabus Progress Meter */}
      <div className="bg-white border border-brand-brown-100 rounded-3xl p-5 md:p-6 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-base font-bold text-brand-brown-900 flex items-center gap-2 justify-center sm:justify-start">
            <CheckCircle2 className="w-5 h-5 text-brand-yellow-600" />
            {language === "en" ? "Interactive Progress Tracker" : "ஊடாடும் முன்னேற்ற கண்காணிப்பு"}
          </h4>
          <p className="text-xs text-gray-400 font-medium">
            {language === "en" 
              ? "Check off completed lessons to track your learning milestones. Toggles sync globally."
              : "முன்னேற்றத்தைக் கண்காணிக்க முடிந்த பாடங்களை டிக் செய்யவும். இது முழுமையாக ஒத்திசையும்."}
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto self-stretch sm:self-auto">
          <div className="flex-1 sm:w-44 text-right space-y-1">
            <div className="text-xs font-bold text-brand-brown-800">
              {completedItems} of {totalItems} completed ({progressPercent}%)
            </div>
            <div className="w-full h-2 bg-brand-brown-50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-yellow-500 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMELINE LIST */}
      <div className="space-y-4">
        {currentLevel.items.map((item, index) => {
          const isExpanded = expandedItemId === item.id;
          const isChecked = !!syllabusChecklist[item.id];
          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                isChecked ? "border-brand-yellow-400 bg-brand-yellow-50/10 shadow-2xs" : ""
              } ${
                isExpanded
                  ? "border-brand-yellow-500 ring-4 ring-brand-yellow-50"
                  : "border-brand-brown-100 hover:border-brand-brown-200"
              }`}
            >
              {/* ACCORDION HEADER WITH CHECKBOX INTEGRATION */}
              <div className="flex items-center w-full justify-between pr-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleChecklist(item.id);
                  }}
                  className="pl-6 py-5 flex-shrink-0 text-brand-yellow-500 hover:scale-110 transition-transform cursor-pointer"
                  title={isChecked ? "Mark Incomplete" : "Mark Complete"}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-brand-yellow-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-brand-brown-200 hover:text-brand-yellow-500" />
                  )}
                </button>

                <button
                  onClick={() => handleToggleExpand(item.id)}
                  className="w-full pl-3 py-5 flex items-start gap-4 text-left justify-between cursor-pointer"
                >
                  <div className="flex gap-3">
                    {/* Number index */}
                    <div className="w-8 h-8 rounded-lg bg-brand-brown-50 border border-brand-brown-100 flex items-center justify-center font-serif font-extrabold text-xs text-brand-brown-800 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm md:text-base font-extrabold text-brand-brown-900 flex flex-wrap items-center gap-1.5 leading-snug">
                        {item.name}
                        {isChecked && (
                          <span className="bg-green-100 text-green-800 text-[9px] font-sans font-bold px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-0.5">
                            ✓ Done
                          </span>
                        )}
                        {item.countText && (
                          <span className="bg-brand-yellow-50 text-brand-yellow-800 text-[9px] font-sans font-bold px-2.5 py-0.5 rounded-full border border-brand-yellow-100">
                            {item.countText} {t.syllabus_items_count}
                          </span>
                        )}
                        {classType === "live_group" && item.classCountText && (
                          <span className="bg-brand-brown-50 text-brand-brown-700 text-[9px] font-sans font-bold px-2.5 py-0.5 rounded-full">
                            {t.class_count} {item.classCountText}
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 pr-4 font-medium">{item.description}</p>
                    </div>
                  </div>

                  {/* Dropdown chevron */}
                  <div className="w-8 h-8 rounded-full bg-brand-brown-50 flex items-center justify-center text-brand-brown-700 flex-shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
              </div>

              {/* ACCORDION DETAILS BODY */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-brand-brown-50 space-y-6 animate-fadeIn">
                  {/* Bullet Points */}
                  {item.details && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-brand-brown-500 uppercase tracking-widest block">
                        {t.focus_areas}
                      </span>
                      <ul className="grid sm:grid-cols-2 gap-2 text-xs md:text-sm text-brand-brown-800 font-medium">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow-500 mt-2 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Notation (Swara notation) */}
                  {item.notation && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-brand-brown-500 uppercase tracking-widest block">
                          {t.notation_practice}
                        </span>
                        <button
                          onClick={() => handleCopyNotation(item.notation!, item.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-brand-brown-800 hover:text-brand-yellow-600 transition-colors cursor-pointer"
                        >
                          {copiedItemId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-600" /> {t.copied}
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> {t.copy_swaras}
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="bg-brand-brown-900 text-brand-yellow-100 p-4 rounded-xl font-mono text-[11px] md:text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap select-all shadow-inner border border-brand-brown-800">
                        {item.notation}
                      </pre>
                    </div>
                  )}

                  {/* Operational Controls / Tabs Shortcuts */}
                  <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-brand-brown-50">
                    <button
                      onClick={() => onSelectPracticePitch("C")}
                      className="px-4 py-2.5 rounded-xl border border-brand-brown-100 hover:border-brand-yellow-500 text-brand-brown-800 hover:text-brand-brown-950 bg-white text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
                    >
                      <Volume className="w-4 h-4 text-brand-yellow-500" /> {t.practice_with_shruti}
                    </button>
                    <button
                      onClick={() =>
                        onAskTutor(
                          language === "en" 
                            ? `Guru Swarohana, can you explain the curriculum item "${item.name}" from ${currentLevel.title}? What are some common mistakes students make when practicing this?`
                            : `குரு ஸ்வரோஹனா, ${currentLevel.tamilTitle}-ல் உள்ள "${item.name}" என்ற பாடத்தை எனக்கு விளக்குங்கள். மாணவர்கள் இதனைப் பயிற்சி செய்யும்போது செய்யும் பொதுவான தவறுகள் யாவை?`
                        )
                      }
                      className="px-4 py-2.5 rounded-xl bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white text-xs font-extrabold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" /> {t.ask_ai_tutor}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
