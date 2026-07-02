import React, { useState, useEffect } from "react";
import { ClassRegistration, SyllabusLevel } from "../types";
import { SYLLABUS_DATA } from "../data";
import {
  Calendar,
  User,
  Mail,
  Phone,
  Clock,
  Award,
  CheckCircle,
  Sparkles,
  AlertCircle,
  FileText,
  Flame,
  TrendingUp,
  Plus
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

// Helper to get past 30 days
const getPast30Days = () => {
  const dates = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    dates.push(d);
  }
  return dates;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-brown-900 text-white p-3 md:p-3.5 rounded-xl border border-brand-yellow-700/30 shadow-lg text-xs space-y-1">
        <p className="font-serif font-bold text-brand-yellow-100">{label}</p>
        <p className="font-mono text-white flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow-500"></span>
          Practice: <span className="text-brand-yellow-100 font-extrabold">{payload[0].value} mins</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function BookingPortal({
  onSelectTab,
  activeRegistration,
  setActiveRegistration,
  syllabusChecklist,
  setSyllabusChecklist,
}: {
  onSelectTab: (tab: string) => void;
  activeRegistration: ClassRegistration | null;
  setActiveRegistration: React.Dispatch<React.SetStateAction<ClassRegistration | null>>;
  syllabusChecklist: Record<string, boolean>;
  setSyllabusChecklist: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  // Booking Form State
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<"level1" | "level2" | "level3">("level1");
  const [classType, setClassType] = useState<"online" | "live_group">("online");
  const [preferredTiming, setPreferredTiming] = useState("Weekend Morning (8:00 AM - 10:00 AM)");
  const [musicalGoal, setMusicalGoal] = useState("");

  // System states
  const [showSuccess, setShowSuccess] = useState(false);

  // Practice logs state
  const [practiceLogs, setPracticeLogs] = useState<Record<string, number>>({});
  
  // Manual logger form state
  const [selectedLogDate, setSelectedLogDate] = useState("");
  const [logMinutes, setLogMinutes] = useState(30);

  // Load existing registration on mount
  useEffect(() => {
    // Load practice logs
    const savedLogs = localStorage.getItem("swarohana_practice_logs");
    if (savedLogs) {
      try {
        setPracticeLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial logs
      const initialLogs: Record<string, number> = {};
      const dates = getPast30Days();
      dates.forEach((d, index) => {
        const dateString = d.toISOString().split("T")[0];
        const dayOfWeek = d.getDay(); // 0 Sunday, 6 Saturday
        let baseMinutes = 20;
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          baseMinutes = 45; // weekends
        } else if (dayOfWeek === 5) {
          baseMinutes = 35; // Friday
        }
        const growth = Math.round(index * 0.7);
        const randomShift = Math.floor(Math.sin(index) * 8);
        let totalMinutes = Math.max(5, baseMinutes + growth + randomShift);
        
        // Add a couple of low/rest days
        if (index === 6 || index === 18) {
          totalMinutes = 0;
        }
        initialLogs[dateString] = totalMinutes;
      });
      localStorage.setItem("swarohana_practice_logs", JSON.stringify(initialLogs));
      setPracticeLogs(initialLogs);
    }
  }, []);

  // Set default selected date for manual logger
  useEffect(() => {
    const dates = getPast30Days();
    if (dates.length > 0) {
      setSelectedLogDate(dates[dates.length - 1].toISOString().split("T")[0]);
    }
  }, []);

  const handleLogPractice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLogDate) return;
    
    const updated = {
      ...practiceLogs,
      [selectedLogDate]: logMinutes
    };
    setPracticeLogs(updated);
    localStorage.setItem("swarohana_practice_logs", JSON.stringify(updated));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName || !studentAge || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const newReg: ClassRegistration = {
      id: `reg_${Date.now()}`,
      studentName,
      studentAge: parseInt(studentAge),
      email,
      phone,
      selectedLevel,
      classType,
      preferredTiming,
      musicalGoal,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("swarohana_student_registration", JSON.stringify(newReg));
    setActiveRegistration(newReg);
    setShowSuccess(true);
    
    // Auto-create initial progress checklist
    const initialChecklist: Record<string, boolean> = {};
    const levelData = SYLLABUS_DATA.find((l) => l.levelId === selectedLevel);
    if (levelData) {
      levelData.items.forEach((item) => {
        initialChecklist[item.id] = false;
      });
    }
    localStorage.setItem("swarohana_syllabus_progress", JSON.stringify(initialChecklist));
    setSyllabusChecklist(initialChecklist);
  };

  const handleToggleChecklist = (itemId: string) => {
    const updated = {
      ...syllabusChecklist,
      [itemId]: !syllabusChecklist[itemId],
    };
    setSyllabusChecklist(updated);
    localStorage.setItem("swarohana_syllabus_progress", JSON.stringify(updated));
  };

  const handleResetRegistration = () => {
    if (window.confirm("Are you sure you want to cancel your registration? This will clear your student workspace progress.")) {
      localStorage.removeItem("swarohana_student_registration");
      localStorage.removeItem("swarohana_syllabus_progress");
      setActiveRegistration(null);
      setSyllabusChecklist({});
      setShowSuccess(false);
      
      // Reset form fields
      setStudentName("");
      setStudentAge("");
      setEmail("");
      setPhone("");
      setSelectedLevel("level1");
      setClassType("online");
    }
  };

  // Get syllabus level object for registered user
  const enrolledLevelInfo = SYLLABUS_DATA.find(
    (l) => l.levelId === activeRegistration?.selectedLevel
  );

  const calculateProgressPercentage = () => {
    if (!enrolledLevelInfo || Object.keys(syllabusChecklist).length === 0) return 0;
    const items = enrolledLevelInfo.items;
    const completedCount = items.filter((item) => syllabusChecklist[item.id]).length;
    return Math.round((completedCount / items.length) * 100);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* CASE 1: USER IS ALREADY ENROLLED (STUDENT WORKSPACE DASHBOARD) */}
      {activeRegistration ? (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
          {/* Left panel: Certificate & Enrollment Info */}
          <div className="md:col-span-1 bg-white rounded-3xl p-6 border border-brand-brown-100 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-brand-brown-100">
                <div className="w-14 h-14 bg-brand-yellow-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-md">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-brown-900">Student ID Card</h3>
                <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mt-1.5 inline-block">
                  Class Registered
                </span>
              </div>

              {/* ID Card Fields */}
              <div className="space-y-3.5 text-sm">
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Student Name
                  </span>
                  <span className="font-semibold text-brand-brown-900">{activeRegistration.studentName}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Age Group
                  </span>
                  <span className="font-semibold text-brand-brown-900">{activeRegistration.studentAge} years</span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Assigned Level
                  </span>
                  <span className="font-serif font-bold text-brand-brown-800">
                    {enrolledLevelInfo?.title}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Class Structure
                  </span>
                  <span className="font-semibold text-brand-brown-900 capitalize">
                    {activeRegistration.classType === "online"
                      ? "Online Individual (1-on-5)"
                      : "Live Group (1-on-10)"}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Scheduled Slot
                  </span>
                  <span className="font-semibold text-brand-brown-900">{activeRegistration.preferredTiming}</span>
                </div>
                {activeRegistration.musicalGoal && (
                  <div>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Musical Goal
                    </span>
                    <span className="text-xs italic text-brand-brown-700 block mt-0.5 bg-brand-brown-50 p-2.5 rounded-xl border border-brand-brown-50">
                      "{activeRegistration.musicalGoal}"
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-brown-100">
              <button
                onClick={handleResetRegistration}
                className="w-full py-3 text-xs font-bold text-red-600 hover:text-white border border-red-200 hover:bg-red-500 rounded-xl transition-all"
              >
                Cancel Registration
              </button>
            </div>
          </div>

          {/* Right panel: Syllabus Progress Checklist */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-brand-brown-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-brand-brown-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-yellow-100 text-brand-yellow-700 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-brand-brown-900">Curriculum Syllabus Progress</h3>
                    <p className="text-xs text-gray-400 font-medium">Keep track of lessons you have completed practicing</p>
                  </div>
                </div>
                
                {/* Progress Circle visual */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-extrabold text-brand-brown-900">
                    {calculateProgressPercentage()}% Done
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-brand-brown-50 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-brand-yellow-500 transition-all duration-500"
                  style={{ width: `${calculateProgressPercentage()}%` }}
                ></div>
              </div>

              {/* Checkbox Timeline list */}
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                {enrolledLevelInfo?.items.map((item, index) => {
                  const isChecked = !!syllabusChecklist[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleChecklist(item.id)}
                      className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? "bg-brand-yellow-50/40 border-brand-yellow-400"
                          : "bg-white border-brand-brown-100 hover:border-brand-brown-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // Swallowed since parent click handles it
                        className="w-4 h-4 text-brand-yellow-500 accent-brand-brown-900 rounded-md focus:ring-0 border-brand-brown-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-sm font-bold text-brand-brown-900">
                            {index + 1}. {item.name}
                          </span>
                          <span className="text-[10px] text-brand-brown-500 font-bold">
                            {item.countText ? `${item.countText} Units` : "Syllabus Core"}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-brand-brown-100 mt-6">
              <button
                onClick={() => onSelectTab("practice")}
                className="px-4 py-2.5 rounded-xl border border-brand-brown-100 hover:border-brand-yellow-500 text-brand-brown-800 text-xs font-bold transition-all"
              >
                Go to Practice Studio
              </button>
              <button
                onClick={() => onSelectTab("tutor")}
                className="px-4 py-2.5 rounded-xl bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white text-xs font-bold transition-all"
              >
                Ask AI Guru for tips
              </button>
            </div>
          </div>
        </div>

        {/* Daily Practice Duration Progress Section */}
          {(() => {
            const chartData = getPast30Days().map((d) => {
              const key = d.toISOString().split("T")[0];
              const val = practiceLogs[key] !== undefined ? practiceLogs[key] : 0;
              return {
                dateKey: key,
                dateLabel: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
                minutes: val,
              };
            });

            const totalMinutes = chartData.reduce((acc, curr) => acc + curr.minutes, 0);
            const dailyAverage = chartData.length > 0 ? Math.round(totalMinutes / chartData.length) : 0;
            
            let peakDay = { dateLabel: "N/A", minutes: 0 };
            chartData.forEach((item) => {
              if (item.minutes > peakDay.minutes) {
                peakDay = { dateLabel: `${item.dateLabel} (${item.weekday})`, minutes: item.minutes };
              }
            });

            let activeStreak = 0;
            for (let i = chartData.length - 1; i >= 0; i--) {
              if (chartData[i].minutes > 0) {
                activeStreak++;
              } else {
                if (i === chartData.length - 1) {
                  continue;
                }
                break;
              }
            }

            let maxStreak = 0;
            let currentStreakRun = 0;
            chartData.forEach((item) => {
              if (item.minutes > 0) {
                currentStreakRun++;
                if (currentStreakRun > maxStreak) {
                  maxStreak = currentStreakRun;
                }
              } else {
                currentStreakRun = 0;
              }
            });

            return (
              <div className="bg-white rounded-[32px] p-6 md:p-8 border border-brand-brown-100 shadow-sm space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-brown-100 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-yellow-100 text-brand-yellow-500 rounded-2xl flex items-center justify-center shadow-xs">
                      <Flame className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-brand-brown-900">
                        Riyaz & Sadhana Analytics
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        Sadhana (சாதகம்) is the key to vocal clarity and absolute pitch command
                      </p>
                    </div>
                  </div>
                  <div className="text-xs bg-brand-brown-50 px-3 py-1.5 rounded-full border border-brand-brown-100 text-brand-brown-600 font-bold self-start md:self-auto">
                    📅 Past 30 Days Activity
                  </div>
                </div>

                {/* Stats Dashboard Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-brand-brown-50/50 p-5 rounded-2xl border border-brand-brown-100/50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-yellow-100 text-brand-yellow-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Total practice
                      </span>
                      <span className="font-serif text-base md:text-lg font-bold text-brand-brown-900 block">
                        {Math.floor(totalMinutes / 60) > 0
                          ? `${Math.floor(totalMinutes / 60)}h ${Math.round(totalMinutes % 60)}m`
                          : `${Math.round(totalMinutes)}m`}
                      </span>
                    </div>
                  </div>

                  <div className="bg-brand-brown-50/50 p-5 rounded-2xl border border-brand-brown-100/50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Daily Average
                      </span>
                      <span className="font-serif text-base md:text-lg font-bold text-brand-brown-900 block">
                        {dailyAverage} mins/day
                      </span>
                    </div>
                  </div>

                  <div className="bg-brand-brown-50/50 p-5 rounded-2xl border border-brand-brown-100/50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Sadhana Streak
                      </span>
                      <span className="font-serif text-base md:text-lg font-bold text-brand-brown-900 block">
                        {activeStreak} Days
                      </span>
                    </div>
                  </div>

                  <div className="bg-brand-brown-50/50 p-5 rounded-2xl border border-brand-brown-100/50 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        Peak Session
                      </span>
                      <span className="font-serif text-xs md:text-sm font-bold text-brand-brown-900 block truncate" title={`Peak: ${Math.round(peakDay.minutes)}m on ${peakDay.dateLabel}`}>
                        {Math.round(peakDay.minutes)}m on {peakDay.dateLabel.split(" (")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Section */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Chart Column (2/3 width) */}
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-base font-bold text-brand-brown-900">
                        Sadhana Practice Duration
                      </h4>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow-500 inline-block"></span>
                          Riyaz (mins)
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-brand-brown-50/30 p-4 rounded-2xl border border-brand-brown-100/50 h-[320px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8B1E1E" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#8B1E1E" stopOpacity={0.0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#EFEAE2" vertical={false} />
                          <XAxis 
                            dataKey="dateLabel" 
                            tick={{ fill: '#8C7160', fontSize: 9 }} 
                            axisLine={{ stroke: '#EFEAE2' }} 
                            tickLine={false} 
                          />
                          <YAxis 
                            tick={{ fill: '#8C7160', fontSize: 10 }} 
                            axisLine={{ stroke: '#EFEAE2' }} 
                            tickLine={false} 
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Area 
                            type="monotone" 
                            dataKey="minutes" 
                            stroke="#8B1E1E" 
                            strokeWidth={2.5} 
                            fillOpacity={1} 
                            fill="url(#colorMinutes)" 
                            activeDot={{ r: 5, fill: '#8B1E1E', stroke: '#FFF', strokeWidth: 1.5 }} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Log Form Column (1/3 width) */}
                  <div className="bg-brand-brown-50/40 border border-brand-brown-100 p-6 rounded-2xl flex flex-col justify-between">
                    <form onSubmit={handleLogPractice} className="space-y-4">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-brand-brown-900">
                          Log Custom Sadhana
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium">
                          Select a date and record your classical riyaz session minutes
                        </p>
                      </div>

                      {/* Date selection dropdown */}
                      <div className="space-y-1">
                        <label className="block text-[10px] text-brand-brown-600 font-bold uppercase tracking-wider">
                          Select Practice Date
                        </label>
                        <select
                          value={selectedLogDate}
                          onChange={(e) => setSelectedLogDate(e.target.value)}
                          className="w-full p-2.5 text-xs rounded-xl bg-white border border-brand-brown-100 focus:outline-none focus:border-brand-yellow-500 font-medium text-brand-brown-900"
                        >
                          {getPast30Days().map((d) => {
                            const dateString = d.toISOString().split("T")[0];
                            const label = d.toLocaleDateString("en-US", { 
                              weekday: "short", 
                              month: "short", 
                              day: "numeric" 
                            });
                            const isTodayStr = dateString === new Date().toISOString().split("T")[0] ? " (Today)" : "";
                            return (
                              <option key={dateString} value={dateString}>
                                {label}{isTodayStr}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Presets and duration selection */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-[10px] text-brand-brown-600 font-bold uppercase tracking-wider">
                            Practice Duration
                          </label>
                          <span className="text-xs font-mono font-extrabold text-brand-yellow-500">
                            {logMinutes} mins
                          </span>
                        </div>

                        {/* Presets Quick Grid */}
                        <div className="grid grid-cols-4 gap-1.5">
                          {[15, 30, 45, 60].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setLogMinutes(preset)}
                              className={`py-1 rounded-lg text-[10px] font-bold border transition-all ${
                                logMinutes === preset
                                  ? "bg-brand-yellow-500 border-transparent text-white"
                                  : "bg-white border-brand-brown-100 text-brand-brown-700 hover:border-brand-brown-200"
                              }`}
                            >
                              +{preset}m
                            </button>
                          ))}
                        </div>

                        <input
                          type="range"
                          min="0"
                          max="180"
                          step="5"
                          value={logMinutes}
                          onChange={(e) => setLogMinutes(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-brand-brown-100 rounded-lg appearance-none cursor-pointer accent-brand-brown-900 mt-2"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-xs"
                      >
                        <Plus className="w-4 h-4" /> Save Practice Log
                      </button>
                    </form>

                    {/* Live Practice Studio Tip */}
                    <div className="mt-4 pt-4 border-t border-brand-brown-100/80 text-[10px] text-brand-brown-600 space-y-1.5">
                      <p className="font-semibold flex items-center gap-1 text-brand-yellow-500 uppercase tracking-wider">
                        ⚡ Auto-Tracking Tip
                      </p>
                      <p className="leading-relaxed">
                        Time spent practicing with the drone or metronome active in the <span className="font-bold">Practice Studio</span> is automatically recorded in today's Sadhana score!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* CASE 2: REGISTRATION FORM */
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-brand-brown-100 shadow-sm overflow-hidden grid md:grid-cols-12">
          {/* Promotional side panel */}
          <div className="md:col-span-4 bg-brand-brown-900 text-brand-yellow-100 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-brown-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
            <div className="relative z-10 space-y-6">
              <div className="w-10 h-10 rounded-xl bg-brand-yellow-500 text-brand-brown-900 flex items-center justify-center font-serif font-extrabold text-xl">
                S
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-bold text-white">Join Swarohana</h4>
                <p className="text-xs text-brand-yellow-200/80 leading-relaxed font-medium">
                  Experience authentic South Indian classical music education structured with contemporary digital tools.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-brand-brown-800 text-xs">
                <div className="flex gap-2 items-start">
                  <CheckCircle className="w-4 h-4 text-brand-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Free Demo Class arranged with senior classical Gurus.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle className="w-4 h-4 text-brand-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Custom levels and progress logs.</span>
                </div>
                <div className="flex gap-2 items-start">
                  <CheckCircle className="w-4 h-4 text-brand-yellow-500 flex-shrink-0 mt-0.5" />
                  <span>Interactive AI Carnatic mentor to assist anytime.</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 text-[10px] text-brand-yellow-300/60 font-semibold uppercase tracking-wider">
              © Swarohana Music Studio
            </div>
          </div>

          {/* Core Registration Form */}
          <form onSubmit={handleRegister} className="md:col-span-8 p-6 md:p-8 space-y-6">
            <div className="border-b border-brand-brown-100 pb-4">
              <h3 className="font-serif text-2xl font-bold text-brand-brown-900">Schedule Demo / Register</h3>
              <p className="text-xs text-gray-400 font-medium">Fill in the fields below. No advance credit card required.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-brown-700 uppercase tracking-wider block">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-xl focus:outline-none focus:border-brand-yellow-500"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-brown-700 uppercase tracking-wider block">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="5"
                  max="100"
                  value={studentAge}
                  onChange={(e) => setStudentAge(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full px-4 py-2 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-xl focus:outline-none focus:border-brand-yellow-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-brown-700 uppercase tracking-wider block">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-xl focus:outline-none focus:border-brand-yellow-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-brown-700 uppercase tracking-wider block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full pl-9 pr-4 py-2 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-xl focus:outline-none focus:border-brand-yellow-500"
                  />
                </div>
              </div>

              {/* Level selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-brown-700 uppercase tracking-wider block">
                  Select Level Interest <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value as any)}
                  className="w-full px-4 py-2 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-xl focus:outline-none focus:border-brand-yellow-500"
                >
                  <option value="level1">Level 1: Basic (Swaras & Alankarams)</option>
                  <option value="level2">Level 2: Intermediate (Geetham & Swarajathi)</option>
                  <option value="level3">Level 3: Advance (Varnam & Keerthanai)</option>
                </select>
              </div>

              {/* Class Model Toggle */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-brown-700 uppercase tracking-wider block">
                  Class Model <span className="text-red-500">*</span>
                </label>
                <select
                  value={classType}
                  onChange={(e) => setClassType(e.target.value as any)}
                  className="w-full px-4 py-2 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-xl focus:outline-none focus:border-brand-yellow-500"
                >
                  <option value="online">Online Individual (1:5 micro batch)</option>
                  <option value="live_group">Live Group Class (8-10 students)</option>
                </select>
              </div>
            </div>

            {/* Timing selection */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-brown-700 uppercase tracking-wider block">
                Preferred Timing Slot
              </label>
              <select
                value={preferredTiming}
                onChange={(e) => setPreferredTiming(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-xl focus:outline-none focus:border-brand-yellow-500"
              >
                <option value="Weekend Morning (8:00 AM - 10:00 AM)">Weekend Morning (8:00 AM - 10:00 AM)</option>
                <option value="Weekend Evening (5:00 PM - 7:00 PM)">Weekend Evening (5:00 PM - 7:00 PM)</option>
                <option value="Weekday Evening (6:30 PM - 8:30 PM)">Weekday Evening (6:30 PM - 8:30 PM)</option>
              </select>
            </div>

            {/* Goals */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-brand-brown-700 uppercase tracking-wider block">
                Your Musical Goals / Comments
              </label>
              <textarea
                value={musicalGoal}
                onChange={(e) => setMusicalGoal(e.target.value)}
                rows={3}
                placeholder="Describe what you want to achieve (e.g., learn classical singing, learn violin accompaniment, voice therapy...)"
                className="w-full px-4 py-2 text-sm bg-brand-brown-50 border border-brand-brown-100 rounded-xl focus:outline-none focus:border-brand-yellow-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white font-bold rounded-2xl transition-all shadow-md mt-4 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Free Demo & Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
