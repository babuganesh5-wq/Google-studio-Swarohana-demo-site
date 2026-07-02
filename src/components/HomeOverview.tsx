import React from "react";
import { Award, Music, BookOpen, Clock, Users, ArrowRight, Star, Heart, Volume2, CheckCircle2, Circle } from "lucide-react";
import { TranslationDict } from "../translations";
import { ClassRegistration } from "../types";
import { SYLLABUS_DATA } from "../data";

export default function HomeOverview({
  onSelectTab,
  t,
  language,
  activeRegistration,
  syllabusChecklist,
}: {
  onSelectTab: (tab: string) => void;
  t: TranslationDict;
  language: "en" | "ta";
  activeRegistration: ClassRegistration | null;
  syllabusChecklist: Record<string, boolean>;
}) {
  const stats = [
    { value: "300+", label: t.stats_students, desc: t.stats_students_desc },
    { value: "3 Levels", label: t.stats_structure, desc: t.stats_structure_desc },
    { value: "100%", label: t.stats_live, desc: t.stats_live_desc },
    { value: "4.9 ★", label: t.stats_rating, desc: t.stats_rating_desc },
  ];

  const highlights = [
    {
      icon: <Award className="w-6 h-6 text-brand-yellow-600 dark:text-brand-yellow-500" />,
      title: t.certified_curr_title,
      desc: t.certified_curr_desc,
    },
    {
      icon: <Volume2 className="w-6 h-6 text-brand-yellow-600 dark:text-brand-yellow-500" />,
      title: t.interactive_shruti_title,
      desc: t.interactive_shruti_desc,
    },
    {
      icon: <Users className="w-6 h-6 text-brand-yellow-600 dark:text-brand-yellow-500" />,
      title: t.micro_batches_title,
      desc: t.micro_batches_desc,
    },
  ];

  const testimonials = language === "en" ? [
    {
      quote: "Swarohana has completely refined my vocal alignment. The detailed curriculum structure for Level 1 Sarali and Jandai exercises was excellent.",
      author: "Priya Ramachandran",
      level: "Level 1 Graduate",
    },
    {
      quote: "Learning Geethams and Janya Ragas under Swarohana Gurus was incredibly beautiful. They focus heavily on ear training and swarajnanam.",
      author: "Aditya Krishnan",
      level: "Level 2 Student",
    },
  ] : [
    {
      quote: "ஸ்வரோஹனா எனது குரல் அமைப்பை முற்றிலும் செம்மைப்படுத்தியுள்ளது. நிலை 1-ன் சரளி மற்றும் ஜண்டை வரிசைகளின் விரிவான பாடத்திட்டம் மிகவும் சிறப்பாக இருந்தது.",
      author: "பிரியா ராமச்சந்திரன்",
      level: "நிலை 1 பட்டதாரி",
    },
    {
      quote: "ஸ்வரோஹனா குருக்களின் கீழ் கீதங்கள் மற்றும் ஜன்ய ராகங்களை கற்றுக் கொண்டது மிகவும் அழகாக இருந்தது. அவர்கள் ஸ்வரஞானப் பயிற்சியில் அதிக கவனம் செலுத்துகிறார்கள்.",
      author: "ஆதித்யா கிருஷ்ணன்",
      level: "நிலை 2 மாணவர்",
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn max-w-7xl mx-auto">
      {/* HERO SECTION */}
      <div className="relative bg-white border border-brand-brown-100 rounded-3xl p-8 md:p-16 text-center space-y-6 overflow-hidden shadow-xs">
        {/* Background blobs for premium depth */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-brown-100/30 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

        <div className="relative z-10 space-y-4">
          <span className="bg-brand-yellow-100 text-brand-yellow-900 text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest inline-block border border-brand-yellow-200">
            {t.brand_title} {language === "en" ? "Music Academy" : "இசை அகாடமி"}
          </span>
          
          <h1 className="font-serif text-3xl md:text-5.5xl font-extrabold text-brand-brown-900 tracking-tight leading-tight max-w-4xl mx-auto">
            {language === "en" ? (
              <>
                Nurturing the Divine Tradition of{" "}
                <span className="text-brand-yellow-600 dark:text-brand-yellow-500">Carnatic Music</span>
              </>
            ) : (
              <>
                கர்நாடக இசையின்{" "}
                <span className="text-brand-yellow-600 dark:text-brand-yellow-500">தெய்வீக பாரம்பரியத்தை</span> வளர்த்தல்
              </>
            )}
          </h1>

          {/* Bilingual sub-heading overlay */}
          <p className="font-serif italic text-base md:text-lg text-brand-brown-700 dark:text-brand-brown-200 max-w-2xl mx-auto font-medium">
            {t.welcome_subtitle}
          </p>

          <p className="text-xs md:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            {t.welcome_desc}
          </p>
        </div>

        {/* Call to Actions */}
        <div className="relative z-10 flex flex-wrap justify-center gap-4 pt-4">
          <button
            onClick={() => onSelectTab("curriculum")}
            className="px-6 py-3.5 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white font-extrabold rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            {t.explore_syllabus} <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTab("practice")}
            className="px-6 py-3.5 bg-white hover:bg-brand-brown-50 text-brand-brown-800 font-extrabold rounded-2xl transition-all border border-brand-brown-200 flex items-center gap-2 cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-brand-yellow-500" /> {t.start_shruti}
          </button>
        </div>
      </div>

      {/* STUDENT DASHBOARD / ADMISSIONS CALLOUT */}
      {(() => {
        const enrolledLevel = activeRegistration ? SYLLABUS_DATA.find((l) => l.levelId === activeRegistration.selectedLevel) : null;
        const enrolledLevelItems = enrolledLevel ? enrolledLevel.items : [];
        const totalEnrolledItems = enrolledLevelItems.length;
        const completedEnrolledItems = enrolledLevelItems.filter(item => !!syllabusChecklist[item.id]).length;
        const progressEnrolledPercent = totalEnrolledItems > 0 ? Math.round((completedEnrolledItems / totalEnrolledItems) * 100) : 0;

        return activeRegistration ? (
          <div className="bg-white border border-brand-yellow-400 rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-brand-yellow-50 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50"></div>
            <div className="relative z-10 space-y-3 flex-1">
              <div className="inline-flex items-center gap-1.5 bg-brand-yellow-100 text-brand-yellow-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-yellow-200">
                ✓ {language === "en" ? "Active Learner Portal" : "செயலில் உள்ள மாணவர் தளம்"}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-brown-900">
                {language === "en" ? `Welcome back, ${activeRegistration.studentName}!` : `மீண்டும் வருக, ${activeRegistration.studentName}!`}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {language === "en"
                  ? `You are enrolled in Swarohana ${enrolledLevel?.title} (${activeRegistration.classType === "online" ? "Online Individual" : "Live Group"}). Keep practicing to achieve certification!`
                  : `நீங்கள் ஸ்வரோஹனாவின் ${enrolledLevel?.tamilTitle} வகுப்பில் சேர்ந்துள்ளீர்கள் (${activeRegistration.classType === "online" ? "ஆன்லைன் தனிநபர்" : "நேரடி குழு"}).`}
              </p>

              <div className="pt-1 flex flex-wrap gap-4 text-xs font-bold text-brand-brown-800">
                <span className="bg-brand-brown-50 px-3 py-1.5 rounded-lg border border-brand-brown-100">
                  {language === "en" ? `Timing: ${activeRegistration.preferredTiming}` : `வகுப்பு நேரம்: ${activeRegistration.preferredTiming}`}
                </span>
                <span className="bg-brand-brown-50 px-3 py-1.5 rounded-lg border border-brand-brown-100">
                  {language === "en" ? `Goal: ${activeRegistration.musicalGoal || "Excellence"}` : `இலக்கு: ${activeRegistration.musicalGoal || "சிறப்பு"}`}
                </span>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-64 bg-brand-brown-50/60 p-5 rounded-2xl border border-brand-brown-100 flex flex-col justify-between gap-4 self-stretch md:self-auto">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  {language === "en" ? "Syllabus Progress" : "பாடத்திட்ட முன்னேற்றம்"}
                </span>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-brown-900">
                  <span>{progressEnrolledPercent}% Completed</span>
                  <span>{completedEnrolledItems}/{totalEnrolledItems}</span>
                </div>
                <div className="w-full h-2 bg-brand-brown-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-yellow-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressEnrolledPercent}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => onSelectTab("curriculum")}
                className="w-full py-2.5 bg-brand-brown-900 hover:bg-brand-brown-950 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-2 shadow-2xs"
              >
                {language === "en" ? "Open Curriculum Progress" : "பாடத்திட்டத்தை திறக்கவும்"} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-brand-brown-900 text-white rounded-3xl p-6 md:p-8 shadow-xs relative overflow-hidden flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-brand-yellow-500/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
            <div className="relative z-10 space-y-2 flex-1">
              <span className="inline-block text-[9px] font-bold text-brand-yellow-400 bg-brand-yellow-950 border border-brand-yellow-800/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {language === "en" ? "Admissions Open" : "சேர்க்கை நடைபெறுகிறது"}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-yellow-100">
                {language === "en" ? "Start Your Structured Carnatic Journey" : "உங்கள் கர்நாடக இசைப் பயணத்தைத் தொடங்குங்கள்"}
              </h3>
              <p className="text-xs text-brand-yellow-100/70 max-w-xl font-medium leading-relaxed">
                {language === "en"
                  ? "Enroll in Level 1, 2, or 3 to access live batch classrooms, voice safety monitoring, and complete personalized progress checkmarks!"
                  : "நேரடி வகுப்புகள், குரல் பாதுகாப்பு கண்காணிப்பு மற்றும் தனிப்பயனாக்கப்பட்ட முன்னேற்றக் கண்காணிப்பை அணுக நிலை 1, நிலை 2 அல்லது நிலை 3-ல் சேருங்கள்!"}
              </p>
            </div>

            <button
              onClick={() => onSelectTab("booking")}
              className="relative z-10 w-full md:w-auto px-6 py-3.5 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-brown-950 font-extrabold text-xs rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap text-center"
            >
              {language === "en" ? "Register Student Workspace" : "மாணவர் சேர்க்கை பதிவு செய்க"}
            </button>
          </div>
        );
      })()}

      {/* STATS SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-brand-brown-100 rounded-2xl p-5 text-center shadow-xs hover:border-brand-yellow-500 transition-all duration-300"
          >
            <div className="font-serif text-2xl md:text-3.5xl font-extrabold text-brand-brown-900">
              {stat.value}
            </div>
            <div className="font-bold text-[11px] text-brand-brown-700 mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed font-semibold">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* WHY SWAROHANA HIGHLIGHTS */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-brown-900">
            {language === "en" ? "The Swarohana Standard" : "ஸ்வரோஹனா தரநிலை"}
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
            {language === "en" ? "Why families choose our structured curriculum" : "குடும்பங்கள் ஏன் எங்களை தேர்வு செய்கிறார்கள்"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((h, idx) => (
            <div
              key={idx}
              className="bg-white border border-brand-brown-100 rounded-2xl p-6 shadow-xs flex flex-col space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-brown-50 flex items-center justify-center">
                {h.icon}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-base md:text-lg font-bold text-brand-brown-900">{h.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEWS & PHRASES */}
      <div className="bg-brand-brown-50/50 rounded-3xl p-6 md:p-8 border border-brand-brown-100 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-brown-900">
            {t.guru_precepts_title}
          </h3>
          <p className="text-xs md:text-sm text-brand-brown-800 dark:text-brand-brown-100 leading-relaxed italic font-medium">
            {t.guru_precepts_quote}
          </p>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 text-brand-yellow-500 fill-brand-yellow-500" />
            ))}
          </div>
        </div>

        {/* Testimonials timeline */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
            {t.testimonials_title}
          </h4>
          {testimonials.map((tItem, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-brand-brown-100 space-y-2">
              <p className="text-xs text-gray-500 italic leading-relaxed font-medium">"{tItem.quote}"</p>
              <div className="flex items-center justify-between text-[11px] font-extrabold">
                <span className="text-brand-brown-900">{tItem.author}</span>
                <span className="text-brand-yellow-800 bg-brand-yellow-50 px-2 py-0.5 rounded-full border border-brand-yellow-100/50">
                  {tItem.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
