import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import HomeOverview from "./components/HomeOverview";
import SyllabusExplorer from "./components/SyllabusExplorer";
import PracticeStudio from "./components/PracticeStudio";
import AITutor from "./components/AITutor";
import BookingPortal from "./components/BookingPortal";
import AchievementsTab from "./components/AchievementsTab";
import GalleryTab from "./components/GalleryTab";
import { translations } from "./translations";
import { ClassRegistration } from "./types";
import {
  Music,
  BookOpen,
  Sparkles,
  Calendar,
  Home,
  PhoneCall,
  Sun,
  Moon,
  Trophy,
  Image as ImageIcon,
  Languages
} from "lucide-react";
import SwarohanaBrandLogo from "./components/SwarohanaBrandLogo";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("swarohana_theme");
    return (saved as "light" | "dark") || "light";
  });
  const [language, setLanguage] = useState<"en" | "ta">(() => {
    const saved = localStorage.getItem("swarohana_language");
    return (saved as "en" | "ta") || "en";
  });
  
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("swarohana_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("swarohana_language", language);
  }, [language]);
  
  // Shared state: when a user clicks 'Practice this swara' or 'Ask AI Tutor' on a syllabus item
  const [selectedPracticePitch, setSelectedPracticePitch] = useState<string | undefined>(undefined);
  const [tutorPrefilledPrompt, setTutorPrefilledPrompt] = useState<string | null>(null);

  // Lifted state from BookingPortal to make progress visible globally
  const [activeRegistration, setActiveRegistration] = useState<ClassRegistration | null>(() => {
    const saved = localStorage.getItem("swarohana_student_registration");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [syllabusChecklist, setSyllabusChecklist] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("swarohana_syllabus_progress");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    if (activeRegistration) {
      localStorage.setItem("swarohana_student_registration", JSON.stringify(activeRegistration));
    } else {
      localStorage.removeItem("swarohana_student_registration");
    }
  }, [activeRegistration]);

  useEffect(() => {
    localStorage.setItem("swarohana_syllabus_progress", JSON.stringify(syllabusChecklist));
  }, [syllabusChecklist]);

  // Transition helper from Syllabus to Practice Studio
  const handleSelectPracticePitch = (pitchName: string) => {
    setSelectedPracticePitch(pitchName);
    setActiveTab("practice");
  };

  // Transition helper from Syllabus to AI Tutor
  const handleAskTutor = (promptText: string) => {
    setTutorPrefilledPrompt(promptText);
    setActiveTab("tutor");
  };

  const handleClearPrefilledPrompt = () => {
    setTutorPrefilledPrompt(null);
  };

  const t = translations[language];

  // Render current active tab view
  const renderView = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeOverview
            onSelectTab={(tab) => setActiveTab(tab)}
            t={t}
            language={language}
            activeRegistration={activeRegistration}
            syllabusChecklist={syllabusChecklist}
          />
        );
      case "curriculum":
        return (
          <SyllabusExplorer
            onSelectPracticePitch={handleSelectPracticePitch}
            onAskTutor={handleAskTutor}
            t={t}
            language={language}
            syllabusChecklist={syllabusChecklist}
            onToggleChecklist={(itemId) => {
              const updated = {
                ...syllabusChecklist,
                [itemId]: !syllabusChecklist[itemId],
              };
              setSyllabusChecklist(updated);
            }}
            activeRegistration={activeRegistration}
          />
        );
      case "achievements":
        return <AchievementsTab t={t} />;
      case "gallery":
        return <GalleryTab t={t} language={language} />;
      case "practice":
        return <PracticeStudio selectedSyllabusPitch={selectedPracticePitch} />;
      case "tutor":
        return (
          <AITutor
            prefilledPrompt={tutorPrefilledPrompt}
            onClearPrefill={handleClearPrefilledPrompt}
          />
        );
      case "booking":
        return (
          <BookingPortal
            onSelectTab={(tab) => setActiveTab(tab)}
            activeRegistration={activeRegistration}
            setActiveRegistration={setActiveRegistration}
            syllabusChecklist={syllabusChecklist}
            setSyllabusChecklist={setSyllabusChecklist}
          />
        );
      default:
        return (
          <HomeOverview
            onSelectTab={(tab) => setActiveTab(tab)}
            t={t}
            language={language}
            activeRegistration={activeRegistration}
            syllabusChecklist={syllabusChecklist}
          />
        );
    }
  };

  const navItems = [
    { id: "home", label: t.academy_home, icon: <Home className="w-4 h-4" /> },
    { id: "curriculum", label: t.syllabus_explorer, icon: <BookOpen className="w-4 h-4" /> },
    { id: "achievements", label: t.achievements, icon: <Trophy className="w-4 h-4" /> },
    { id: "gallery", label: t.interactive_gallery, icon: <ImageIcon className="w-4 h-4" /> },
    { id: "practice", label: t.practice_studio, icon: <Music className="w-4 h-4" /> },
    { id: "tutor", label: t.ai_music_tutor, icon: <Sparkles className="w-4 h-4" /> },
    { id: "booking", label: t.admissions_progress, icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-brand-brown-50 text-brand-brown-900 flex flex-col justify-between selection:bg-brand-yellow-100 selection:text-brand-brown-900 transition-colors duration-300">
      
      {/* GLOBAL HEADER BAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-brown-100 px-4 md:px-8 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Academy Brand Logo */}
          <div className="cursor-pointer self-center lg:self-auto" onClick={() => setActiveTab("home")}>
            <SwarohanaBrandLogo language={language} theme={theme} size="md" />
          </div>

          {/* Navigation Items (Tabs) */}
          <nav className="flex items-center gap-1 bg-brand-brown-50 p-1 rounded-2xl border border-brand-brown-100 overflow-x-auto max-w-full scrollbar-none py-1 px-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  // If transitioning away from practice, reset any temporary pitch parameter
                  if (item.id !== "practice") {
                    setSelectedPracticePitch(undefined);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === item.id
                    ? "bg-brand-yellow-500 text-white shadow-xs font-extrabold"
                    : "text-brand-brown-900/80 hover:text-brand-brown-900 hover:bg-brand-brown-100/60"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Controls: Theme & Language Toggle & CTA */}
          <div className="flex items-center flex-wrap justify-center gap-2.5">
            
            {/* Language Switcher button */}
            <button
              onClick={() => setLanguage(language === "en" ? "ta" : "en")}
              className="p-2.5 rounded-xl border border-brand-brown-100 dark:border-brand-brown-200/50 hover:bg-brand-brown-100/50 dark:hover:bg-brand-brown-200/50 text-brand-brown-700 dark:text-brand-brown-100 transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              title={language === "en" ? "தமிழ் மொழிக்கு மாறவும்" : "Switch to English"}
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4 text-brand-yellow-600 dark:text-brand-yellow-500" />
              <span className="text-xs font-serif font-extrabold">
                {language === "en" ? "தமிழ்" : "English"}
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2.5 rounded-xl border border-brand-brown-100 dark:border-brand-brown-200/50 hover:bg-brand-brown-100/50 dark:hover:bg-brand-brown-200/50 text-brand-brown-700 dark:text-brand-yellow-700 transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
              title={theme === "light" ? t.midnight_mode : t.natural_tones}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-4 h-4 text-brand-brown-600" />
                  <span className="hidden sm:inline text-xs font-serif font-extrabold text-brand-brown-800">{t.midnight_mode}</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-brand-yellow-500 animate-spin-slow" />
                  <span className="hidden sm:inline text-xs font-serif font-extrabold text-brand-yellow-800">{t.natural_tones}</span>
                </>
              )}
            </button>

            {/* Book Free Trial button */}
            <button
              onClick={() => setActiveTab("booking")}
              className="px-4 py-2.5 text-xs font-extrabold text-white bg-brand-yellow-500 hover:bg-brand-yellow-600 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer border border-brand-yellow-600"
            >
              <PhoneCall className="w-3.5 h-3.5" /> <span>{t.book_trial}</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN VIEW CONTROLLER (WITH ANIMATIONS) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER BAR */}
      <footer className="bg-brand-brown-900 text-brand-brown-100 border-t border-brand-brown-800 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Footer Branding Column */}
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start">
              <SwarohanaBrandLogo language={language} theme={theme} size="sm" />
            </div>
            <p className="text-xs text-brand-brown-200/70 max-w-sm leading-relaxed font-medium">
              {language === "en" 
                ? "Swarohana Carnatic Music Academy (a unit of Swarohana Music Studio) is dedicated to delivering certified, high-standard music programs to students worldwide."
                : "ஸ்வரோஹனா கர்நாடக இசை அகாடமி உலகெங்கிலும் உள்ள மாணவர்களுக்கு சான்றளிக்கப்பட்ட, உயர்தர இசைத் திட்டங்களை வழங்குவதற்காக அர்ப்பணிக்கப்பட்டுள்ளது."}
            </p>
          </div>

          {/* Footer Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow-500 font-sans">
              {language === "en" ? "Interactive Features" : "ஊடாடும் அம்சங்கள்"}
            </h4>
            <div className="flex flex-col gap-2 text-xs font-bold text-brand-brown-200/80">
              <button onClick={() => setActiveTab("curriculum")} className="hover:text-white transition-colors cursor-pointer text-left self-center md:self-start">
                {language === "en" ? "Levels 1-3 Syllabus explorer" : "நிலைகள் 1-3 பாடத்திட்டங்கள்"}
              </button>
              <button onClick={() => setActiveTab("practice")} className="hover:text-white transition-colors cursor-pointer text-left self-center md:self-start">
                {language === "en" ? "Online Shruthi Box drone synthesizer" : "ஸ்ருதி பெட்டி பயிற்சி அரங்கம்"}
              </button>
              <button onClick={() => setActiveTab("tutor")} className="hover:text-white transition-colors cursor-pointer text-left self-center md:self-start">
                {language === "en" ? "AI Music Tutor chat mentor" : "AI இசை குரு அரட்டை"}
              </button>
              <button onClick={() => setActiveTab("booking")} className="hover:text-white transition-colors cursor-pointer text-left self-center md:self-start">
                {language === "en" ? "Free Trial Class scheduling" : "இலவச சேர்க்கை & முன்னேற்றம்"}
              </button>
            </div>
          </div>

          {/* Footer Contact Column */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow-500 font-sans">
              {language === "en" ? "Contact & Hours" : "தொடர்பு & நேரம்"}
            </h4>
            <p className="text-brand-brown-200/80 font-medium">
              {language === "en" ? "Swarohana Music Studios, Chennai, India" : "ஸ்வரோஹனா மியூசிக் ஸ்டுடியோஸ், சென்னை, இந்தியா"}<br />
              Email: contact@swarohana.com<br />
              {language === "en" ? "Hours: Mon - Sun (8:00 AM - 9:00 PM IST)" : "நேரம்: திங்கள் - ஞாயிறு (காலை 8:00 - இரவு 9:00 IST)"}
            </p>
            <div className="pt-2 text-[10px] text-brand-yellow-500/40 font-bold uppercase tracking-widest">
              {language === "en" ? "Built on ancient heritage & modern technology" : "பண்டைய பாரம்பரியம் மற்றும் நவீன தொழில்நுட்பம்"}
            </div>
          </div>

        </div>

        {/* Legal bar */}
        <div className="max-w-7xl mx-auto border-t border-brand-brown-800 mt-8 pt-6 text-center text-[10px] text-brand-brown-400 font-semibold uppercase tracking-widest">
          © {new Date().getFullYear()} Swarohana Music Studios. {language === "en" ? "All rights reserved." : "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."}
        </div>
      </footer>

    </div>
  );
}
