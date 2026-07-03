import React, { useState } from "react";
import {
  Award,
  Music,
  BookOpen,
  Clock,
  Users,
  ArrowRight,
  Star,
  Volume2,
  Check,
  GraduationCap,
  Sparkles,
  Trophy,
  Shield,
  Globe,
  Mail,
  Calendar,
  ThumbsUp,
  MapPin,
  Phone
} from "lucide-react";
import { TranslationDict } from "../translations";
import { ClassRegistration } from "../types";
import { SYLLABUS_DATA } from "../data";

export default function HomeOverview({
  onSelectTab,
  t,
  language,
  theme,
  activeRegistration,
  syllabusChecklist,
}: {
  onSelectTab: (tab: string) => void;
  t: TranslationDict;
  language: "en" | "ta";
  theme: "light" | "dark";
  activeRegistration: ClassRegistration | null;
  syllabusChecklist: Record<string, boolean>;
}) {
  // Pricing toggle state
  const [isYearly, setIsYearly] = useState<boolean>(false);
  // Email newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  // Animated-style statistics data
  const stats = [
    { value: "300+", label: t.stats_students, desc: t.stats_students_desc },
    { value: "3 Levels", label: t.stats_structure, desc: t.stats_structure_desc },
    { value: "100%", label: t.stats_live, desc: t.stats_live_desc },
    { value: "4.9 ★", label: t.stats_rating, desc: t.stats_rating_desc },
  ];

  // The 4-step Pedagogical Roadmap (How it works)
  const steps = language === "en" ? [
    {
      stepNum: "01",
      title: "Set Your Pitch & Goal",
      desc: "Customize your Shruthi drone in our digital practice studio and align with your natural vocal register."
    },
    {
      stepNum: "02",
      title: "Explore Level Syllabus",
      desc: "Go through structured Carnatic modules (Level 1, 2, or 3) with full notation breakdowns and audio help."
    },
    {
      stepNum: "03",
      title: "Submit Class Practice",
      desc: "Mark completed items, log practice metrics, and receive guidance on voice culture and raga grammar."
    },
    {
      stepNum: "04",
      title: "AI Guru Mentorship",
      desc: "Interact with our AI Carnatic Tutor to receive immediate answers on musical compositions, ragas, and history."
    }
  ] : [
    {
      stepNum: "01",
      title: "ஸ்ருதி & இலக்கு அமைத்தல்",
      desc: "உங்களுக்கான தம்புரா ஸ்ருதியை அமைத்து, உங்கள் குரல் வளத்திற்கு ஏற்றபடி பயிற்சியைத் தொடங்குங்கள்."
    },
    {
      stepNum: "02",
      title: "பாடத்திட்டங்களை ஆராய்தல்",
      desc: "ஸ்வர வரிசைகள், கீதங்கள் மற்றும் வர்ணங்கள் அடங்கிய கட்டமைக்கப்பட்ட பாடங்களை விரிவான குறிப்புகளுடன் கற்கலாம்."
    },
    {
      stepNum: "03",
      title: "பயிற்சி நிலையை கண்காணித்தல்",
      desc: "முடிந்த பாடங்களைக் குறியிட்டு, தினசரி பயிற்சி நேரத்தைப் பதிவு செய்து தேர்வுகளுக்குத் தயாராகுங்கள்."
    },
    {
      stepNum: "04",
      title: "AI இசை குரு வழிகாட்டுதல்",
      desc: "ராகங்கள், தாளங்கள் மற்றும் இசை வரலாற்றுச் சந்தேகங்களை எங்களது AI இசை குருவிடம் உடனுக்குடன் கேட்டுத் தெளிவுபெறுங்கள்."
    }
  ];

  // Extended testimonial quotes for marquee infinite scrolling banner effect
  const rawTestimonials = [
    {
      quote: "Swarohana has completely refined my vocal alignment. The structured curriculum for Level 1 Sarali and Jandai exercises was excellent.",
      author: "Priya Ramachandran",
      level: "Level 1 Graduate",
      stars: 5,
      instrument: "Vocal"
    },
    {
      quote: "Learning Geethams and Janya Ragas under Swarohana Gurus was incredibly beautiful. They focus heavily on ear training and swarajnanam.",
      author: "Aditya Krishnan",
      level: "Level 2 Student",
      stars: 5,
      instrument: "Violin"
    },
    {
      quote: "The Shruthi Box tool and AI Tutor make home practice extremely engaging! I cleared my certification with distinction.",
      author: "Meera Viswanathan",
      level: "Level 3 Graduate",
      stars: 5,
      instrument: "Vocal"
    },
    {
      quote: "The micro-batch size of 5 students means you get immediate correction from the guru. Absolutely world-class Carnatic pedagogy.",
      author: "Sanjay Subramaniam",
      level: "Level 2 Graduate",
      stars: 5,
      instrument: "Veena"
    },
    {
      quote: "As an intermediate violinist, the detailed notation breakdown of Level 3 Varnams saved me hours of confusing practice. Outstanding academy!",
      author: "Rajesh Sekhar",
      level: "Level 3 Student",
      stars: 5,
      instrument: "Violin"
    }
  ];

  // Tamil translation helper for testimonials
  const tamilTestimonials = [
    {
      quote: "ஸ்வரோஹனா எனது குரல் அமைப்பை முற்றிலும் செம்மைப்படுத்தியுள்ளது. நிலை 1-ன் சரளி மற்றும் ஜண்டை வரிசைகளின் விரிவான பாடத்திட்டம் மிகவும் சிறப்பாக இருந்தது.",
      author: "பிரியா ராமச்சந்திரன்",
      level: "நிலை 1 பட்டதாரி",
      stars: 5,
      instrument: "பாட்டு"
    },
    {
      quote: "ஸ்வரோஹனா குருக்களின் கீழ் கீதங்கள் மற்றும் ஜன்ய ராகங்களைக் கற்றுக் கொண்டது மிகவும் அழகாக இருந்தது. அவர்கள் ஸ்வரஞானப் பயிற்சியில் அதிக கவனம் செலுத்துகிறார்கள்.",
      author: "ஆதித்யா கிருஷ்ணன்",
      level: "நிலை 2 மாணவர்",
      stars: 5,
      instrument: "வயலின்"
    },
    {
      quote: "இணையதளத்தில் உள்ள ஸ்ருதி பெட்டியும் AI குருவும் வீட்டில் பயிற்சி செய்வதை மிகவும் எளிதாக்குகின்றன! நான் எனது நிலை 1 தேர்வை சிறந்த மதிப்பெண்களுடன் முடித்தேன்.",
      author: "மீரா விஸ்வநாதன்",
      level: "நிலை 3 பட்டதாரி",
      stars: 5,
      instrument: "பாட்டு"
    },
    {
      quote: "ஒரு வகுப்பிற்கு 5 மாணவர்கள் மட்டுமே இருப்பதால், குரு ஒவ்வொருவரிடமும் தனி கவனம் செலுத்துகிறார். குரல் வளம் மற்றும் ஸ்ருதி சுத்தம் பெற சிறந்த இடம்.",
      author: "சஞ்சய் சுப்பிரமணியம்",
      level: "நிலை 2 பட்டதாரி",
      stars: 5,
      instrument: "வீணை"
    }
  ];

  const activeTestimonials = language === "en" ? rawTestimonials : tamilTestimonials;
  // Duplicate arrays to create a seamless infinite loop scrolling effect
  const marqueeTestimonialsLeft = [...activeTestimonials, ...activeTestimonials];
  const marqueeTestimonialsRight = [...activeTestimonials.reverse(), ...activeTestimonials];

  // Pricing Packages
  const pricingPackages = language === "en" ? [
    {
      name: "Basic Starter",
      price: "Free",
      originalPrice: "$0",
      description: "Perfect for testing your pitch alignment and learning foundational swara exercises.",
      features: [
        "Syllabus Level 1 Core access",
        "Digital Shruthi Box practice tool",
        "Limited AI Tutor queries (3 daily)",
        "Basic pitch-matching guide",
        "Community forum entry"
      ],
      popular: false,
      cta: "Explore Free Syllabus",
      tab: "curriculum"
    },
    {
      name: "Pro Masterclass",
      price: isYearly ? "$23" : "$29",
      period: "/month",
      originalPrice: isYearly ? "$29" : "$35",
      description: "Our most popular batch. Live virtual classrooms limited to strictly 5 students.",
      features: [
        "Levels 1, 2, and 3 full curriculum",
        "100% Live Batches (1:5 micro groups)",
        "Unlimited AI Music Tutor mentor",
        "Automatic practice session logging",
        "Certified board evaluation prep",
        "Monthly masterclass with guest veterans"
      ],
      popular: true,
      cta: "Schedule Free Trial Class",
      tab: "booking"
    },
    {
      name: "Elite Guru Mentoring",
      price: isYearly ? "$63" : "$79",
      period: "/month",
      originalPrice: isYearly ? "$79" : "$95",
      description: "Exclusive 1-on-1 intensive mentorship with premier musicians and concert artists.",
      features: [
        "1-on-1 Private Live Lessons",
        "Personalized raga improvisation guides",
        "Unlimited AI Carnatic Tutor access",
        "Solo stage concert opportunities",
        "Voice Culture Level 1 & 2 premium training",
        "Lifetime progress reports & support"
      ],
      popular: false,
      cta: "Apply for Elite Admission",
      tab: "booking"
    }
  ] : [
    {
      name: "அடிப்படைத் திட்டம்",
      price: "இலவசம்",
      originalPrice: "₹0",
      description: "ஸ்ருதி மற்றும் அடிப்படை ஸ்வர வரிசைகளைப் பயிற்சி செய்ய விரும்புபவர்களுக்கு ஏற்றது.",
      features: [
        "நிலை 1 அடிப்படை பாடங்கள்",
        "டிஜிட்டல் ஸ்ருதி பெட்டி வசதி",
        "வரம்புக்குட்பட்ட AI குரு உதவிகள்",
        "அடிப்படை ஸ்வர குறிப்புகள்",
        "பாடத்திட்ட முன்னேற்றக் கண்காணிப்பு"
      ],
      popular: false,
      cta: "இலவசமாகப் பயில்க",
      tab: "curriculum"
    },
    {
      name: "புரோ வகுப்புகள்",
      price: isYearly ? "₹1,900" : "₹2,400",
      period: "/மாதம்",
      originalPrice: isYearly ? "₹2,400" : "₹3,000",
      description: "எங்கள் மிகவும் பிரபலமான நேரடி வகுப்பு. ஒரு குழுவிற்கு அதிகபட்சம் 5 மாணவர்கள் மட்டுமே.",
      features: [
        "நிலைகள் 1, 2 மற்றும் 3 முழு அணுகல்",
        "100% நேரடி சிறிய குழு வகுப்புகள் (1:5)",
        "வரம்பற்ற AI குரு வழிகாட்டுதல்கள்",
        "தானியங்கி பயிற்சி நேர பதிவு",
        "அகாடமி சான்றிதழ் தேர்வுகள்",
        "மாதாந்திர சிறப்பு இசை நிகழ்ச்சிகள்"
      ],
      popular: true,
      cta: "இலவச வகுப்புக்கு பதிவு செய்க",
      tab: "booking"
    },
    {
      name: "எலைட் குரு வழிகாட்டுதல்",
      price: isYearly ? "₹5,200" : "₹6,500",
      period: "/மாதம்",
      originalPrice: isYearly ? "₹6,500" : "₹8,000",
      description: "முன்னணி கலைஞர்களின் கீழ் நேரடி 1-on-1 தீவிர தனிப்பட்ட பயிற்சி வகுப்பு.",
      features: [
        "நேரடி தனிநபர் வகுப்புகள் (1:1)",
        "தனிப்பயனாக்கப்பட்ட ராக ஆலாபனை பயிற்சிகள்",
        "முழுமையான குரல் பாதுகாப்பு பயிற்சிகள்",
        "நேரடி அரங்கு கச்சேரி வாய்ப்புகள்",
        "வாழ்நாள் முழுவதும் சிறந்த வழிகாட்டுதல்கள்",
        "முழுமையான முன்னேற்ற சான்றிதழ்கள்"
      ],
      popular: false,
      cta: "எலைட் வகுப்பில் சேரவும்",
      tab: "booking"
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <div className="space-y-16 animate-fadeIn max-w-6xl mx-auto pb-12 select-none">
      
      {/* 1. HERO SECTION (MODERN SPLIT LAYOUT WITH DESIGN FIDELITY) */}
      <div className="relative bg-white dark:bg-brand-brown-100 border border-brand-brown-100 dark:border-brand-brown-200/50 rounded-4xl p-6 md:p-12 lg:p-16 overflow-hidden shadow-xs">
        {/* Ambient aesthetic background vector blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-brand-yellow-100/30 dark:bg-brand-yellow-200/5 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-brown-100/40 dark:bg-brand-brown-200/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Column (65% width equivalent on large screens) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-brand-yellow-100/70 dark:bg-brand-yellow-100/10 text-brand-yellow-900 dark:text-brand-yellow-700 text-[10px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-brand-yellow-200/40 dark:border-brand-yellow-700/30">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-yellow-700" />
              <span>{t.brand_title} {language === "en" ? "Music Academy" : "இசை அகாடமி"}</span>
            </div>
            
            <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-5.5xl font-extrabold text-brand-brown-900 dark:text-brand-brown-800 tracking-tight leading-tight">
              {language === "en" ? (
                <>
                  Nurturing the Divine Tradition of{" "}
                  <span className="text-brand-yellow-700 dark:text-brand-yellow-500 bg-linear-to-r from-brand-yellow-700 via-brand-yellow-800 to-brand-yellow-600 bg-clip-text text-transparent">
                    Carnatic Music
                  </span>
                </>
              ) : (
                <>
                  கர்நாடக இசையின்{" "}
                  <span className="text-brand-yellow-700 dark:text-brand-yellow-500 bg-linear-to-r from-brand-yellow-700 via-brand-yellow-800 to-brand-yellow-600 bg-clip-text text-transparent">
                    தெய்வீக பாரம்பரியத்தை
                  </span> வளர்த்தல்
                </>
              )}
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-brand-brown-700 dark:text-brand-brown-600 font-medium">
              {t.welcome_subtitle}
            </p>

            <p className="text-xs sm:text-sm text-gray-500 dark:text-brand-brown-500 leading-relaxed font-semibold max-w-2xl mx-auto lg:mx-0">
              {t.welcome_desc}
            </p>

            {/* Micro-social badges underneath description */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-[11px] font-bold text-brand-brown-700 dark:text-brand-brown-600">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-brand-yellow-700 dark:text-brand-yellow-500" />
                <span>{language === "en" ? "ISO Certified Academy" : "ISO தரச்சான்றிதழ்"}</span>
              </div>
              <div className="w-1.5 h-1.5 bg-brand-brown-200 rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-brand-yellow-700 dark:text-brand-yellow-500" />
                <span>{language === "en" ? "Students in 12+ Countries" : "12+ நாடுகள்"}</span>
              </div>
              <div className="w-1.5 h-1.5 bg-brand-brown-200 rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-brand-yellow-700 dark:text-brand-yellow-500" />
                <span>{language === "en" ? "National Excellence Award" : "தேசிய விருது"}</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => onSelectTab("curriculum")}
                className="px-7 py-4 bg-brand-yellow-500 hover:bg-brand-yellow-600 hover:scale-102 hover:shadow-md active:scale-98 text-white font-extrabold text-xs rounded-2xl transition-all flex items-center gap-2 cursor-pointer border border-brand-yellow-600 shadow-sm"
              >
                <span>{t.explore_syllabus}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onSelectTab("practice")}
                className="px-7 py-4 bg-white dark:bg-brand-brown-200/30 hover:bg-brand-brown-50 dark:hover:bg-brand-brown-200/50 hover:scale-102 active:scale-98 text-brand-brown-800 dark:text-brand-brown-900 font-extrabold text-xs rounded-2xl transition-all border border-brand-brown-200 dark:border-brand-brown-200/50 flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-brand-yellow-700 dark:text-brand-yellow-500" />
                <span>{t.start_shruti}</span>
              </button>
            </div>
          </div>

          {/* Hero Right Column: Beautiful custom vector / dashboard graphics (35% width) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm bg-brand-brown-50 dark:bg-[#160D0B] border border-brand-brown-100 dark:border-brand-brown-200/50 p-6 rounded-3xl shadow-md space-y-4">
              {/* Overlay elements */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-brand-yellow-700 text-white flex items-center justify-center rounded-2xl shadow-md rotate-12 text-sm font-extrabold">
                1:5
              </div>

              {/* Graphical representation of Soundwaves & Swarasthana pitch matching */}
              <div className="h-44 bg-white dark:bg-[#0C0706] rounded-2xl border border-brand-brown-100 dark:border-brand-brown-200/40 relative overflow-hidden flex flex-col justify-between p-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-brand-yellow-700 animate-ping"></div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                      {language === "en" ? "Tonic Shruthi Live" : "நேரடி தம்புரா அலை"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-extrabold text-brand-yellow-700">C# 1.5 Kattai</span>
                </div>

                {/* Animated graphic wave simulation */}
                <div className="flex items-end justify-center gap-1.5 h-20 px-4">
                  {[40, 60, 20, 80, 50, 95, 30, 70, 45, 85, 35, 60, 25, 50].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-brand-yellow-700/80 rounded-full transition-all duration-300 hover:bg-brand-yellow-800"
                      style={{
                        height: `${h}%`,
                        animation: `tanpura-wave ${1.2 + (i % 3) * 0.4}s ease-in-out infinite`
                      }}
                    ></div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[9px] font-bold text-gray-400">
                  <span>Sa (138.5Hz)</span>
                  <span>Pa (207.6Hz)</span>
                  <span>S' (277.1Hz)</span>
                </div>
              </div>

              {/* Highlight facts block */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-yellow-100 dark:bg-brand-yellow-200/10 flex items-center justify-center text-brand-yellow-700 dark:text-brand-yellow-500">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-brown-900 dark:text-brand-brown-800">
                      {language === "en" ? "Certified Carnatic Curriculum" : "சான்றளிக்கப்பட்ட பாடத்திட்டம்"}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium">Levels 1-3 step-by-step milestones</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-yellow-100 dark:bg-brand-yellow-200/10 flex items-center justify-center text-brand-yellow-700 dark:text-brand-yellow-500">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-brown-900 dark:text-brand-brown-800">
                      {language === "en" ? "Virtual Shruthi Box & Laya" : "டிஜிட்டல் தம்புரா & தாள மீட்டர்"}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium">Practice directly in browser</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-yellow-100 dark:bg-brand-yellow-200/10 flex items-center justify-center text-brand-yellow-700 dark:text-brand-yellow-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-brown-900 dark:text-brand-brown-800">
                      {language === "en" ? "Intelligent AI Tutor Support" : "அறிவுசார் AI இசை வழிகாட்டி"}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-medium">Ask questions, understand raga theory</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. STUDENT DASHBOARD / ADMISSIONS PORTAL (DURABLE CLOUD PERSISTENCE CALLOUT) */}
      {(() => {
        const enrolledLevel = activeRegistration ? SYLLABUS_DATA.find((l) => l.levelId === activeRegistration.selectedLevel) : null;
        const enrolledLevelItems = enrolledLevel ? enrolledLevel.items : [];
        const totalEnrolledItems = enrolledLevelItems.length;
        const completedEnrolledItems = enrolledLevelItems.filter(item => !!syllabusChecklist[item.id]).length;
        const progressEnrolledPercent = totalEnrolledItems > 0 ? Math.round((completedEnrolledItems / totalEnrolledItems) * 100) : 0;

        return activeRegistration ? (
          <div className="bg-white dark:bg-brand-brown-100 border border-brand-yellow-400 dark:border-brand-yellow-700/50 rounded-4xl p-6 md:p-8 shadow-xs relative overflow-hidden flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="absolute top-0 right-0 w-36 h-36 bg-brand-yellow-50 dark:bg-brand-yellow-200/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-xl pointer-events-none"></div>
            <div className="relative z-10 space-y-3 flex-1">
              <div className="inline-flex items-center gap-1.5 bg-brand-yellow-100 dark:bg-brand-yellow-200/10 text-brand-yellow-900 dark:text-brand-yellow-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-yellow-200 dark:border-brand-yellow-700/20">
                ✓ {language === "en" ? "Active Student Workspace" : "செயலில் உள்ள மாணவர் தளம்"}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
                {language === "en" ? `Welcome back, ${activeRegistration.studentName}!` : `மீண்டும் வருக, ${activeRegistration.studentName}!`}
              </h3>
              <p className="text-xs text-gray-500 dark:text-brand-brown-500 font-medium">
                {language === "en"
                  ? `You are currently studying Swarohana ${enrolledLevel?.title} (${activeRegistration.classType === "online" ? "Online Individual" : "Live Group"}). Keep practicing with Shruthi Box to clear milestones!`
                  : `நீங்கள் ஸ்வரோஹனாவின் ${enrolledLevel?.tamilTitle} வகுப்பில் சேர்ந்துள்ளீர்கள் (${activeRegistration.classType === "online" ? "ஆன்லைன் தனிநபர்" : "நேரடி குழு"}).`}
              </p>

              <div className="pt-1 flex flex-wrap gap-4 text-xs font-bold text-brand-brown-800 dark:text-brand-brown-800">
                <span className="bg-brand-brown-50 dark:bg-brand-brown-200/20 px-3 py-1.5 rounded-lg border border-brand-brown-100 dark:border-brand-brown-200/30">
                  {language === "en" ? `Timing: ${activeRegistration.preferredTiming}` : `வகுப்பு நேரம்: ${activeRegistration.preferredTiming}`}
                </span>
                <span className="bg-brand-brown-50 dark:bg-brand-brown-200/20 px-3 py-1.5 rounded-lg border border-brand-brown-100 dark:border-brand-brown-200/30">
                  {language === "en" ? `Goal: ${activeRegistration.musicalGoal || "Excellence"}` : `இலக்கு: ${activeRegistration.musicalGoal || "சிறப்பு"}`}
                </span>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-72 bg-brand-brown-50/60 dark:bg-brand-brown-200/20 p-5 rounded-2xl border border-brand-brown-100 dark:border-brand-brown-200/30 flex flex-col justify-between gap-4 self-stretch md:self-auto">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                  {language === "en" ? "Syllabus Progress" : "பாடத்திட்ட முன்னேற்றம்"}
                </span>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-brand-brown-900 dark:text-brand-yellow-700">
                  <span>{progressEnrolledPercent}% Completed</span>
                  <span>{completedEnrolledItems}/{totalEnrolledItems}</span>
                </div>
                <div className="w-full h-2 bg-brand-brown-100 dark:bg-brand-brown-200/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-yellow-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressEnrolledPercent}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => onSelectTab("curriculum")}
                className="w-full py-2.5 bg-brand-brown-900 hover:bg-brand-brown-950 dark:bg-brand-yellow-500 dark:hover:bg-brand-yellow-600 dark:text-brand-brown-950 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>{language === "en" ? "Open Curriculum Milestones" : "பாடத்திட்டத்தை திறக்கவும்"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-brand-brown-900 dark:bg-[#160D0B] text-white rounded-4xl p-6 md:p-10 shadow-xs relative overflow-hidden flex flex-col md:flex-row gap-6 items-center justify-between border border-brand-brown-800 dark:border-brand-brown-200/40">
            <div className="absolute bottom-0 right-0 w-44 h-44 bg-brand-yellow-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-xl pointer-events-none"></div>
            <div className="relative z-10 space-y-2 flex-1 text-center md:text-left">
              <span className="inline-block text-[9px] font-bold text-brand-yellow-400 bg-brand-yellow-950 border border-brand-yellow-800/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {language === "en" ? "Admissions Open" : "சேர்க்கை நடைபெறுகிறது"}
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-extrabold text-brand-yellow-100 dark:text-brand-yellow-700">
                {language === "en" ? "Start Your Structured Carnatic Journey" : "உங்கள் கர்நாடக இசைப் பயணத்தைத் தொடங்குங்கள்"}
              </h3>
              <p className="text-xs text-brand-yellow-100/70 dark:text-brand-brown-500 max-w-xl font-semibold leading-relaxed mx-auto md:mx-0">
                {language === "en"
                  ? "Enroll in Level 1, 2, or 3 to access live batch classrooms, voice safety monitoring, and complete personalized progress checkmarks!"
                  : "நேரடி வகுப்புகள், குரல் பாதுகாப்பு கண்காணிப்பு மற்றும் தனிப்பயனாக்கப்பட்ட முன்னேற்றக் கண்காணிப்பை அணுக நிலை 1, நிலை 2 அல்லது நிலை 3-ல் சேருங்கள்!"}
              </p>
            </div>

            <button
              onClick={() => onSelectTab("booking")}
              className="relative z-10 w-full md:w-auto px-7 py-4 bg-brand-yellow-500 hover:bg-brand-yellow-600 hover:scale-102 text-brand-brown-950 font-extrabold text-xs rounded-2xl transition-all shadow-md cursor-pointer whitespace-nowrap text-center border border-brand-yellow-600"
            >
              {language === "en" ? "Register Student Workspace" : "மாணவர் சேர்க்கை பதிவு செய்க"}
            </button>
          </div>
        );
      })()}

      {/* 3. TRUST INSTRUMENTS (LOGO BAR INSPIRED BY BMUSICIAN.COM CLONE) */}
      <div className="bg-white/40 dark:bg-brand-brown-100/10 border-y border-brand-brown-100 dark:border-brand-brown-200/50 py-8 px-4 text-center">
        <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-6">
          {language === "en" ? "INSTRUMENTS & SPECIALIZATIONS OFFERED" : "வழங்கப்படும் சிறப்பு இசைப்பிரிவுகள்"}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-5xl mx-auto">
          {[
            { name: "Carnatic Vocal", tamil: "பாட்டு", icon: "🎤" },
            { name: "Violin", tamil: "வயலின்", icon: "🎻" },
            { name: "Veena", tamil: "வீணை", icon: "🎸" },
            { name: "Flute", tamil: "புல்லாங்குழல்", icon: "🌬️" },
            { name: "Mridangam", tamil: "மிருதங்கம்", icon: "🥁" },
            { name: "Raga Theory", tamil: "ராக இலக்கணம்", icon: "🎼" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
              <span className="text-2xl">{item.icon}</span>
              <div className="text-left leading-none">
                <span className="text-xs font-serif font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
                  {item.name}
                </span>
                <span className="block text-[8px] font-bold text-gray-400 mt-0.5">
                  {item.tamil}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ANIMATED STATISTIC BLOCKS (SCROLL-TRIGGERED PERFORMANCE TARGETS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-brand-brown-100 border border-brand-brown-100 dark:border-brand-brown-200/50 rounded-3xl p-6 text-center shadow-2xs hover:border-brand-yellow-500 dark:hover:border-brand-yellow-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="font-serif text-3xl md:text-4.5xl font-extrabold text-brand-yellow-700 dark:text-brand-yellow-500">
              {stat.value}
            </div>
            <div className="font-extrabold text-xs text-brand-brown-800 dark:text-brand-brown-900 mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
            <p className="text-[10px] text-gray-400 font-bold mt-0.5 leading-relaxed">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* 5. FEATURED COURSE CARDS (SECTION 7.4 SPECIFICATION) */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[9px] font-extrabold text-brand-yellow-700 dark:text-brand-yellow-500 bg-brand-yellow-100/60 dark:bg-brand-yellow-200/10 px-3 py-1 rounded-full uppercase tracking-widest border border-brand-yellow-200/30">
            {language === "en" ? "EXPLORE ACADEMY SYLLABUS" : "அகாடமி பாடத்திட்டங்கள்"}
          </span>
          <h2 className="font-serif text-2.5xl md:text-3.5xl font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
            {language === "en" ? "Structured Academy Certificate Levels" : "முறைப்படுத்தப்பட்ட சான்றிதழ் நிலைகள்"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-brand-brown-500 font-semibold max-w-xl mx-auto">
            {language === "en" 
              ? "From raw beginner vocal alignment to advanced concert kirthanas and manodharma improvisation." 
              : "அடிப்படை ஸ்வர பயிற்சி முதல் கச்சேரிகளில் பாடக்கூடிய வர்ணங்கள் வரை அனைத்தையும் முறைப்படி கற்கலாம்."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SYLLABUS_DATA.map((lvl) => {
            const syllabusItemsCount = lvl.items.length;
            
            // Icon assignment based on level
            const getLvlIcon = (id: string) => {
              if (id === "level1") return <BookOpen className="w-6 h-6" />;
              if (id === "level2") return <Music className="w-6 h-6" />;
              return <Trophy className="w-6 h-6" />;
            };

            return (
              <div
                key={lvl.levelId}
                className="bg-white dark:bg-brand-brown-100 border border-brand-brown-100 dark:border-brand-brown-200/50 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 border-b-4 hover:border-b-brand-yellow-500 dark:hover:border-b-brand-yellow-700"
              >
                <div className="space-y-4">
                  {/* Card head: level and icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-brown-50 dark:bg-brand-brown-200/30 text-brand-yellow-700 dark:text-brand-yellow-500 flex items-center justify-center">
                      {getLvlIcon(lvl.levelId)}
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-brand-yellow-50 dark:bg-brand-yellow-200/10 border border-brand-yellow-200/40 dark:border-brand-yellow-700/20 text-brand-yellow-800 dark:text-brand-yellow-700">
                      {language === "en" ? lvl.stage : lvl.tamilStage}
                    </span>
                  </div>

                  {/* Level title and duration */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg md:text-xl font-extrabold text-brand-brown-900 dark:text-brand-brown-800 group-hover:text-brand-yellow-700 dark:group-hover:text-brand-yellow-500 transition-colors">
                      {language === "en" ? lvl.title : lvl.tamilTitle}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lvl.onlineDuration} {language === "en" ? "Duration" : "கால அளவு"}</span>
                    </div>
                  </div>

                  {/* Syllabus focus bullets */}
                  <div className="space-y-2 pt-2 border-t border-brand-brown-100 dark:border-brand-brown-200/40">
                    <div className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                      {language === "en" ? `Includes ${syllabusItemsCount} Core Subjects:` : `${syllabusItemsCount} முக்கிய பாடப்பிரிவுகள்:`}
                    </div>
                    
                    <ul className="space-y-1.5 text-xs text-gray-500 dark:text-brand-brown-500 font-medium">
                      {lvl.items.slice(0, 4).map((item) => (
                        <li key={item.id} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-yellow-700 dark:text-brand-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item.name}</span>
                        </li>
                      ))}
                      {syllabusItemsCount > 4 && (
                        <li className="text-[10px] text-brand-yellow-700 dark:text-brand-yellow-500 font-extrabold pl-5 uppercase tracking-wide">
                          + {syllabusItemsCount - 4} {language === "en" ? "more topics..." : "கூடுதல் பாடங்கள்..."}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectTab("curriculum")}
                  className="w-full py-3 mt-6 bg-brand-brown-50 hover:bg-brand-brown-100 dark:bg-brand-brown-200/20 dark:hover:bg-brand-brown-200/40 text-brand-brown-800 dark:text-brand-brown-900 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-brand-brown-100 dark:border-brand-brown-200/40"
                >
                  <span>{language === "en" ? "Explore Full Curriculum" : "பாடத்திட்டத்தை ஆராய்க"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. HOW IT WORKS (PEDAGOGICAL STEP ROADMAP) */}
      <div className="bg-white dark:bg-brand-brown-100 border border-brand-brown-100 dark:border-brand-brown-200/50 rounded-4xl p-6 md:p-12 space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow-100/20 dark:bg-brand-yellow-200/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="text-center space-y-2">
          <span className="text-[9px] font-extrabold text-brand-yellow-700 dark:text-brand-yellow-500 bg-brand-yellow-100/60 dark:bg-brand-yellow-200/10 px-3 py-1 rounded-full uppercase tracking-widest border border-brand-yellow-200/30">
            {language === "en" ? "SWAROHANA PATHWAY" : "பாடப் பயிற்சி முறை"}
          </span>
          <h2 className="font-serif text-2.5xl md:text-3.5xl font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
            {language === "en" ? "How Swarohana Studio Refines Your Skills" : "ஸ்வரோஹனா அகாடமியின் தனித்துவ முறை"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-brand-brown-500 font-semibold max-w-xl mx-auto">
            {language === "en"
              ? "We combine ancient oral traditions (Guru-Shishya Parampara) with interactive browser tools and artificial intelligence."
              : "பாரம்பரிய கற்பித்தல் முறையை நவீனத் தொழில்நுட்பப் பயிற்சிக் கருவிகளுடன் இணைத்துள்ளோம்."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative space-y-3 bg-brand-brown-50/50 dark:bg-[#160D0B] border border-brand-brown-100 dark:border-brand-brown-200/30 p-5 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-extrabold text-brand-yellow-700/20 dark:text-brand-yellow-500/10 block">
                  {step.stepNum}
                </span>
                <div className="w-2 h-2 rounded-full bg-brand-yellow-700 dark:bg-brand-yellow-500"></div>
              </div>
              <h4 className="font-serif text-base font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
                {step.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-brand-brown-500 leading-relaxed font-semibold">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. TESTIMONIALS INFINITE MARQUEE (SECTION 7.6 SPECIFICATION) */}
      <div className="space-y-8 overflow-hidden py-4 select-none relative">
        <div className="text-center space-y-2">
          <span className="text-[9px] font-extrabold text-brand-yellow-700 dark:text-brand-yellow-500 bg-brand-yellow-100/60 dark:bg-brand-yellow-200/10 px-3 py-1 rounded-full uppercase tracking-widest border border-brand-yellow-200/30">
            {t.testimonials_title}
          </span>
          <h2 className="font-serif text-2.5xl md:text-3.5xl font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
            {language === "en" ? "Resonance Worldwide: Student Voices" : "மாணவர்களின் உண்மை அனுபவங்கள்"}
          </h2>
        </div>

        {/* Floating gradient overlays left & right to fade the infinite text marquee smoothly */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-linear-to-r from-brand-brown-50 via-brand-brown-50/50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-linear-to-l from-brand-brown-50 via-brand-brown-50/50 to-transparent z-10 pointer-events-none"></div>

        <div className="space-y-4">
          {/* Row 1 - scrolling left */}
          <div className="flex overflow-hidden w-full group">
            <div className="animate-marquee-left flex gap-4 pr-4 group-hover:[animation-play-state:paused]">
              {marqueeTestimonialsLeft.map((tItem, idx) => (
                <div
                  key={idx}
                  className="w-80 md:w-96 flex-shrink-0 bg-white dark:bg-brand-brown-100 border border-brand-brown-100 dark:border-brand-brown-200/50 p-5 rounded-2xl shadow-2xs space-y-3"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(tItem.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-brand-yellow-700 fill-brand-yellow-700" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-brand-brown-500 italic leading-relaxed font-semibold">
                    "{tItem.quote}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-extrabold border-t border-brand-brown-100 dark:border-brand-brown-200/40 pt-2.5">
                    <div>
                      <span className="text-brand-brown-900 dark:text-brand-brown-800 block">{tItem.author}</span>
                      <span className="text-[9px] text-gray-400 font-bold block">{tItem.instrument} Learner</span>
                    </div>
                    <span className="text-brand-yellow-800 bg-brand-yellow-50 dark:bg-brand-yellow-200/10 px-2.5 py-1 rounded-full border border-brand-yellow-200/30 text-[9px]">
                      {tItem.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - scrolling right */}
          <div className="flex overflow-hidden w-full group">
            <div className="animate-marquee-right flex gap-4 pr-4 group-hover:[animation-play-state:paused]">
              {marqueeTestimonialsRight.map((tItem, idx) => (
                <div
                  key={idx}
                  className="w-80 md:w-96 flex-shrink-0 bg-white dark:bg-brand-brown-100 border border-brand-brown-100 dark:border-brand-brown-200/50 p-5 rounded-2xl shadow-2xs space-y-3"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(tItem.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-brand-yellow-700 fill-brand-yellow-700" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-brand-brown-500 italic leading-relaxed font-semibold">
                    "{tItem.quote}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-extrabold border-t border-brand-brown-100 dark:border-brand-brown-200/40 pt-2.5">
                    <div>
                      <span className="text-brand-brown-900 dark:text-brand-brown-800 block">{tItem.author}</span>
                      <span className="text-[9px] text-gray-400 font-bold block">{tItem.instrument} Learner</span>
                    </div>
                    <span className="text-brand-yellow-800 bg-brand-yellow-50 dark:bg-brand-yellow-200/10 px-2.5 py-1 rounded-full border border-brand-yellow-200/30 text-[9px]">
                      {tItem.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 8. ADMISSIONS PACKAGES & PRICING TIERS WITH TOGGLE (SECTION 7.5 SPECIFICATION) */}
      <div className="space-y-8 select-none">
        <div className="text-center space-y-3">
          <span className="text-[9px] font-extrabold text-brand-yellow-700 dark:text-brand-yellow-500 bg-brand-yellow-100/60 dark:bg-brand-yellow-200/10 px-3 py-1 rounded-full uppercase tracking-widest border border-brand-yellow-200/30">
            {language === "en" ? "ADMISSIONS PACKAGES" : "கட்டண விபரங்கள்"}
          </span>
          <h2 className="font-serif text-2.5xl md:text-3.5xl font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
            {language === "en" ? "Affordable, Structured Academy Plans" : "எளிய, முறைப்படுத்தப்பட்ட சேர்க்கைக் கட்டணம்"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-brand-brown-500 font-semibold max-w-xl mx-auto">
            {language === "en"
              ? "Choose the plan that fits your pace. Save up to 20% by subscribing to our annual packages!"
              : "உங்கள் பயிற்சி வேகத்திற்கு ஏற்ற திட்டத்தைத் தேர்வு செய்யுங்கள். வருடக் கட்டணங்களில் 20% வரை சேமிக்கலாம்!"}
          </p>

          {/* Monthly / Yearly sliding pill toggle selector */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className={`text-xs font-bold ${!isYearly ? "text-brand-brown-900" : "text-gray-400"}`}>
              {language === "en" ? "Monthly" : "மாதாந்திர கட்டணம்"}
            </span>
            
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 bg-brand-brown-200 dark:bg-brand-brown-200/50 rounded-full relative p-1 transition-all duration-300 cursor-pointer"
              aria-label="Toggle billing frequency"
            >
              <div
                className={`w-4 h-4 bg-brand-yellow-700 rounded-full transition-all duration-300 transform ${
                  isYearly ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
            
            <span className={`text-xs font-bold ${isYearly ? "text-brand-brown-900" : "text-gray-400"} flex items-center gap-1.5`}>
              <span>{language === "en" ? "Yearly" : "வருடாந்திர கட்டணம்"}</span>
              <span className="bg-brand-yellow-700 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider scale-95">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPackages.map((pkg, idx) => (
            <div
              key={idx}
              className={`bg-white dark:bg-brand-brown-100 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative border ${
                pkg.popular
                  ? "border-brand-yellow-500 dark:border-brand-yellow-700 shadow-sm scale-102 ring-2 ring-brand-yellow-400/20"
                  : "border-brand-brown-100 dark:border-brand-brown-200/50 shadow-2xs hover:shadow-md"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-yellow-700 text-white text-[9px] font-extrabold px-4 py-1 rounded-full uppercase tracking-widest shadow-xs">
                  {language === "en" ? "Most Popular" : "விருப்பமான தேர்வு"}
                </span>
              )}

              <div className="space-y-5">
                {/* Package Head */}
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
                    {pkg.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed font-semibold">
                    {pkg.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-serif font-extrabold text-brand-brown-950 dark:text-brand-yellow-700">
                    {pkg.price}
                  </span>
                  {pkg.period && (
                    <span className="text-[11px] font-bold text-gray-400">
                      {pkg.period}
                    </span>
                  )}
                  {isYearly && pkg.originalPrice && (
                    <span className="text-[11px] text-gray-400 line-through pl-1">
                      {pkg.originalPrice}
                    </span>
                  )}
                </div>

                {/* List features */}
                <ul className="space-y-2 pt-4 border-t border-brand-brown-100 dark:border-brand-brown-200/30">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-500 dark:text-brand-brown-500 font-semibold leading-tight">
                      <Check className="w-4 h-4 text-brand-yellow-700 dark:text-brand-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package CTA */}
              <button
                onClick={() => onSelectTab(pkg.tab)}
                className={`w-full py-3.5 mt-8 font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center ${
                  pkg.popular
                    ? "bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white border border-brand-yellow-600 shadow-xs"
                    : "bg-brand-brown-50 hover:bg-brand-brown-100 dark:bg-brand-brown-200/20 dark:hover:bg-brand-brown-200/40 text-brand-brown-800 dark:text-brand-brown-900 border border-brand-brown-100 dark:border-brand-brown-200/40"
                }`}
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ACADEMY CONTACT & LOCATION */}
      <div className="bg-white dark:bg-brand-brown-100 border border-brand-brown-100 dark:border-brand-brown-200/50 rounded-4xl p-6 md:p-10 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          
          {/* Address and WhatsApp Info Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-brand-brown-50 dark:bg-brand-brown-200/10 border border-brand-brown-100 dark:border-brand-brown-200/30 px-3 py-1 rounded-full text-brand-yellow-700 dark:text-brand-yellow-500 text-[9px] font-extrabold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === "en" ? "Visit Our Academy" : "எங்கள் அகாடமி முகவரி"}</span>
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-brown-900 dark:text-brand-brown-800 leading-tight">
                {language === "en" ? "Swarohana Music Academy" : "ஸ்வரோஹனா மியூசிக் அகாடமி"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-brand-brown-500 font-semibold leading-relaxed">
                {language === "en"
                  ? "Come learn with us in a pristine traditional atmosphere. Feel free to contact our support team via WhatsApp for any admission or class schedule queries."
                  : "தூய்மையான பாரம்பரிய சூழலில் எங்களுடன் இணைந்து இசை கற்க வாருங்கள். சேர்க்கை அல்லது வகுப்பு அட்டவணை பற்றிய சந்தேகங்களுக்கு எங்களை வாட்ஸ்அப்பில் தொடர்பு கொள்ளவும்."}
              </p>
            </div>

            {/* Address Details */}
            <div className="bg-brand-brown-50/50 dark:bg-brand-brown-200/10 border border-brand-brown-100 dark:border-brand-brown-200/20 rounded-2xl p-5 space-y-3.5 text-xs">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-yellow-700 dark:text-brand-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 font-semibold text-brand-brown-800 dark:text-brand-brown-900 leading-relaxed">
                  <p className="font-bold text-sm text-brand-brown-900 dark:text-brand-brown-800">
                    {language === "en" ? "Academy Address" : "அஞ்சல் முகவரி"}
                  </p>
                  {language === "en" ? (
                    <div className="space-y-0.5">
                      <p>Swarohana Music Academy,</p>
                      <p>54. Shanmugapuram,</p>
                      <p>O. Rajapalayam Post,</p>
                      <p>Tiruchengode Tk,</p>
                      <p>Namakkal District.</p>
                      <p className="font-extrabold text-brand-brown-950 dark:text-brand-brown-900">Pin : 637211</p>
                    </div>
                  ) : (
                    <div className="space-y-0.5">
                      <p>ஸ்வரோஹனா மியூசிக் அகாடமி,</p>
                      <p>54. சண்முகபுரம்,</p>
                      <p>ஒ. ராஜபாளையம் அஞ்சல்,</p>
                      <p>திருச்செங்கோடு வட்டம்,</p>
                      <p>நாமக்கல் மாவட்டம்.</p>
                      <p className="font-extrabold text-brand-brown-950 dark:text-brand-brown-900">பின்கோடு : 637211</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-brand-brown-100 dark:border-brand-brown-200/30 pt-3.5 flex gap-3">
                <Phone className="w-5 h-5 text-brand-yellow-700 dark:text-brand-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 font-semibold">
                  <p className="font-bold text-sm text-brand-brown-900 dark:text-brand-brown-800">
                    {language === "en" ? "WhatsApp Support Number" : "வாட்ஸ்அப் உதவி எண்"}
                  </p>
                  <a
                    href="https://wa.me/919842592718"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-yellow-700 dark:text-brand-yellow-500 font-extrabold text-sm hover:underline flex items-center gap-1.5"
                  >
                    +91 98425 92718
                    <span className="text-[10px] font-bold text-gray-400">({language === "en" ? "Click to Chat" : "அரட்டை செய்ய கிளிக் செய்யவும்"})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map & Interactive Invitation Panel */}
          <div className="relative h-64 md:h-80 bg-brand-brown-50 dark:bg-brand-brown-200/10 rounded-3xl overflow-hidden border border-brand-brown-100 dark:border-brand-brown-200/20 flex flex-col justify-center items-center text-center p-6 space-y-4">
            {/* Visual representation of an elegant musical map / locator */}
            <div className="absolute inset-0 bg-brand-brown-50/60 dark:bg-brand-brown-100/60 backdrop-blur-2xs flex flex-col justify-center items-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-yellow-100 dark:bg-brand-yellow-200/20 flex items-center justify-center text-brand-yellow-700 dark:text-brand-yellow-500 animate-pulse border border-brand-yellow-200/50">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-extrabold text-brand-brown-900 dark:text-brand-brown-800">
                  {language === "en" ? "Tiruchengode, Namakkal, TN" : "திருச்செங்கோடு, நாமக்கல், தமிழ்நாடு"}
                </h4>
                <p className="text-[11px] text-gray-400 font-bold max-w-xs">
                  {language === "en"
                    ? "Located in Namakkal district, welcoming Carnatic scholars of all levels."
                    : "நாமக்கல் மாவட்டத்தில் அமைந்துள்ளது. அனைத்து நிலை இசை ஆர்வலர்களையும் வரவேற்கிறோம்."}
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Swarohana+Music+Academy,+54.+Shanmugapuram,+O.+Rajapalayam,+Tiruchengode"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white dark:text-brand-brown-50 font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer border border-brand-yellow-600"
              >
                <span>{language === "en" ? "Open Google Maps" : "கூகுள் மேப்பில் காண்க"}</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 9. NEWSLETTER / COMMUNITY ENGAGEMENT (SECTION 7.12 SPECIFICATION) */}
      <div className="bg-brand-brown-900 dark:bg-[#160D0B] text-white rounded-4xl p-6 md:p-12 border border-brand-brown-800 dark:border-brand-brown-200/40 relative overflow-hidden flex flex-col lg:flex-row gap-8 items-center justify-between">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-2 flex-1 text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 bg-brand-yellow-950 border border-brand-yellow-800/40 px-3 py-1 rounded-full text-brand-yellow-400 text-[9px] font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>{language === "en" ? "Swarohana Newsletter" : "ஸ்வரோஹனா செய்திமடல்"}</span>
          </span>
          <h3 className="font-serif text-xl md:text-2.5xl font-extrabold text-brand-yellow-100 dark:text-brand-yellow-700">
            {language === "en" ? "Receive Masterclass Updates & Free Guides" : "இலவச இசை வழிகாட்டிகளைப் பெறுங்கள்"}
          </h3>
          <p className="text-xs text-brand-yellow-100/70 dark:text-brand-brown-500 max-w-xl font-semibold leading-relaxed">
            {language === "en"
              ? "Join more than 5,000 music scholars who receive our bi-weekly updates on Carnatic raga grammar, voice culture tips, and upcoming live concerts."
              : "5,000-க்கும் மேற்பட்ட இசை மாணவர்களுடன் இணைந்து, ராக இலக்கணம், குரல் பாதுகாப்பு குறிப்புகள் மற்றும் நேரடி இசை கச்சேரி விபரங்களை உடனுக்குடன் பெறுங்கள்."}
          </p>
        </div>

        <div className="w-full lg:w-96">
          {newsletterSubscribed ? (
            <div className="bg-brand-yellow-950/40 border border-brand-yellow-700/50 rounded-2xl p-6 text-center space-y-2 animate-fadeIn">
              <ThumbsUp className="w-8 h-8 text-brand-yellow-700 mx-auto animate-bounce" />
              <h4 className="font-serif text-sm font-extrabold text-brand-yellow-100">
                {language === "en" ? "Subscription Successful!" : "பதிவு வெற்றிகரமாக முடிந்தது!"}
              </h4>
              <p className="text-[11px] text-gray-400 font-bold">
                {language === "en"
                  ? "We've added you to our community list. Keep practicing!"
                  : "எங்கள் அஞ்சல் பட்டியலில் இணைந்துள்ளீர்கள். தொடர்ந்து பயிற்சி செய்யுங்கள்!"}
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={language === "en" ? "Enter your email address" : "மின்னஞ்சல் முகவரி"}
                className="flex-1 px-4 py-3.5 bg-brand-yellow-950/50 dark:bg-black/40 border border-brand-brown-800 dark:border-brand-brown-200/30 text-white rounded-xl text-xs placeholder-gray-500 font-semibold focus:outline-none focus:border-brand-yellow-700"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-brand-brown-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs border border-brand-yellow-600 whitespace-nowrap text-center"
              >
                {language === "en" ? "Subscribe Now" : "இணைந்து கொள்க"}
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
