import React, { useState, useEffect } from "react";
import { Filter, Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon, CheckSquare, Square, Upload, Plus, Trash2, Check } from "lucide-react";
import { TranslationDict } from "../translations";

interface GalleryTabProps {
  t: TranslationDict;
  language: "en" | "ta";
}

interface GalleryItem {
  id: string;
  url: string;
  titleEn: string;
  titleTa: string;
  category: "concerts" | "classes" | "instruments" | "awards";
  descEn: string;
  descTa: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b1?auto=format&fit=crop&q=80&w=800",
    titleEn: "Mridangam Percussion Session",
    titleTa: "மிருதங்க லய பயிற்சி வகுப்பு",
    category: "instruments",
    descEn: "Traditional South Indian classical drum practice keeping steady rhythm.",
    descTa: "தாள லயத்தைக் காக்கும் பாரம்பரிய தென்னிந்திய மிருதங்க இசைப்பயிற்சி."
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    titleEn: "Saraswati Veena Recital",
    titleTa: "சரஸ்வதி வீணை இன்னிசை",
    category: "instruments",
    descEn: "Strumming classical gamakas on the sacred stringed instrument.",
    descTa: "புனிதமான வீணை நரம்புகளில் பாரம்பரிய கமகங்களை இசைத்தல்."
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=800",
    titleEn: "Annual Vocal Concert",
    titleTa: "ஆண்டு குரலிசை பெருவிழா",
    category: "concerts",
    descEn: "Students presenting complex Geethams and Varnams on a live stage.",
    descTa: "நேரடி மேடையில் மாணவர்கள் கீதங்கள் மற்றும் வர்ணங்களைப் பாடுதல்."
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ee?auto=format&fit=crop&q=80&w=800",
    titleEn: "Carnatic Violin Training",
    titleTa: "கர்நாடக வயலின் பயிற்சி",
    category: "instruments",
    descEn: "Precise fingerboard positioning and bowing to replicate vocal microtones.",
    descTa: "குரலிசை நுணுக்கங்களை வயலினில் கொண்டுவர விரல் மற்றும் வில் பயிற்சி."
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    titleEn: "Guru-Shishya Devotional Class",
    titleTa: "குரு-சீடர் இசை வகுப்பறை",
    category: "classes",
    descEn: "Micro-grouped interactive lessons ensuring pure pitch alignment.",
    descTa: "துல்லியமான ஸ்ருதி மற்றும் ராக ஞானத்தை வளர்க்கும் நேரடி வகுப்புகள்."
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800",
    titleEn: "Global Margazhi Festival",
    titleTa: "உலகளாவிய மார்கழி இசைத் திருவிழா",
    category: "concerts",
    descEn: "Choral rendition of traditional slokams and keerthanais by online batches.",
    descTa: "ஆன்லைன் குழுக்களின் பாரம்பரிய ஸ்லோகங்கள் மற்றும் கீர்த்தனைகள் பாடும் விழா."
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&q=80&w=800",
    titleEn: "Swarohana Merit Recipient",
    titleTa: "ஸ்வரோஹனா தகுதி சான்றிதழ் விருது",
    category: "awards",
    descEn: "Celebrating top scorers from our Level 1 and Level 2 evaluations.",
    descTa: "நிலை 1 மற்றும் நிலை 2 தேர்வுகளில் சிறந்த மதிப்பெண் பெற்ற மாணவர்களைக் கொண்டாடுதல்."
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&q=80&w=800",
    titleEn: "Flute Practice Session",
    titleTa: "புல்லாங்குழல் பயிற்சி",
    category: "classes",
    descEn: "Bamboo flute practice under banyan trees recreating classical aesthetics.",
    descTa: "இயற்கை சூழலில் புல்லாங்குழல் கொண்டு ராகங்களை இசைக்கும் பயிற்சி."
  },
  {
    id: "g9",
    url: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&q=80&w=800",
    titleEn: "Vocal Studio Recording Session",
    titleTa: "குரலிசை ஒலிப்பதிவு பயிற்சி",
    category: "classes",
    descEn: "A talented young disciple practicing alignment under studio microphonic feed.",
    descTa: "தொழில்முறை ஒலிப்பதிவு கூடத்தில் தம்பூரா இசையுடன் குரலிசையை பதிவு செய்யும் பயிற்சி."
  },
  {
    id: "g10",
    url: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=800",
    titleEn: "Harmonium & Keyboard Alignment",
    titleTa: "ஹார்மோனியம் மற்றும் விசைப்பலகை பயிற்சி",
    category: "classes",
    descEn: "Developing perfect finger placements and swarasthanas on keyboard.",
    descTa: "விசைப்பலகை மூலம் ஸ்வரஸ்தானங்களை துல்லியமாக உணரும் விரல் பயிற்சி."
  },
  {
    id: "g11",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    titleEn: "Traditional Vocal Performance",
    titleTa: "பாரம்பரிய பக்திப் பாடல் அரங்கேற்றம்",
    category: "concerts",
    descEn: "A dedicated female disciple presenting devotional slokams during community prayers.",
    descTa: "அமைதியான ஆன்மீக சூழலில் அழகிய பக்தி ஸ்லோகங்களை அரங்கேற்றும் மாணவி."
  },
  {
    id: "g12",
    url: "https://images.unsplash.com/photo-1531058020387-3be344559be6?auto=format&fit=crop&q=80&w=800",
    titleEn: "Swarohana Temple Choral Recital",
    titleTa: "ஸ்வரோஹனா கோயில் குழு பஜனை",
    category: "concerts",
    descEn: "Our team of young disciples performing sacred group bhajans at a historic temple.",
    descTa: "அகாடமி குழுவினர் வரலாற்று சிறப்புமிக்க கோயில் விழாவில் பாடிய குழு இசை."
  }
];

export default function GalleryTab({ t, language }: GalleryTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Server-saved custom gallery items
  const [serverItems, setServerItems] = useState<GalleryItem[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);

  // Persistent checked images state
  const [checkedImageIds, setCheckedImageIds] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("swarohana_gallery_checked_images");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  // Fetch custom images from the backend on mount
  const fetchServerItems = async () => {
    setLoadingItems(true);
    try {
      const res = await fetch("/api/gallery/items");
      if (res.ok) {
        const data = await res.json();
        setServerItems(data);
      }
    } catch (e) {
      console.error("Error fetching custom server items:", e);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchServerItems();
  }, []);

  // Save changes to localStorage for checked state
  useEffect(() => {
    localStorage.setItem("swarohana_gallery_checked_images", JSON.stringify(checkedImageIds));
  }, [checkedImageIds]);

  // Queue of local files being edited for upload
  interface QueueItem {
    id: string;
    file: File;
    previewUrl: string;
    titleEn: string;
    titleTa: string;
    category: "concerts" | "classes" | "instruments" | "awards";
    descEn: string;
    descTa: string;
  }

  const [uploadQueue, setUploadQueue] = useState<QueueItem[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [manualUrl, setManualUrl] = useState("");
  const [manualTitle, setManualTitle] = useState("");

  // Handler for multiple file selection (supports 10-20 files at once)
  const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newQueueItems: QueueItem[] = [];
    const filesLimit = Math.min(files.length, 20); // support up to 20 files

    for (let i = 0; i < filesLimit; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      const baseName = file.name.split(".")[0] || "Uploaded Image";
      newQueueItems.push({
        id: `queue_${Date.now()}_${Math.floor(Math.random() * 1000)}_${i}`,
        file,
        previewUrl: URL.createObjectURL(file),
        titleEn: baseName.replace(/[-_]/g, " "),
        titleTa: "பதிவேற்றப்பட்ட படம்",
        category: "classes",
        descEn: "Disciples practicing during standard studio sessions.",
        descTa: "வகுப்பறை பயிற்சி வகுப்புகள்."
      });
    }

    setUploadQueue(prev => [...prev, ...newQueueItems]);
    setUploadError(null);
  };

  // Handler to change attributes of an item in the upload queue
  const updateQueueItem = (id: string, fields: Partial<QueueItem>) => {
    setUploadQueue(prev => prev.map(item => item.id === id ? { ...item, ...fields } : item));
  };

  // Handler to remove a file from the upload queue
  const removeQueueItem = (id: string) => {
    setUploadQueue(prev => {
      const target = prev.find(item => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  // Perform bulk upload of the entire queue to server disk
  const handleUploadQueue = async () => {
    if (uploadQueue.length === 0) return;
    setIsUploading(true);
    setUploadError(null);

    try {
      const addedItems = [];

      for (const qItem of uploadQueue) {
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            if (ev.target && typeof ev.target.result === "string") {
              resolve(ev.target.result);
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(qItem.file);
        });

        const imgPayload = {
          base64Data,
          titleEn: qItem.titleEn,
          titleTa: qItem.titleTa,
          category: qItem.category,
          descEn: qItem.descEn,
          descTa: qItem.descTa,
        };

        const response = await fetch("/api/gallery/upload-single", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: imgPayload }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.item) {
            addedItems.push(result.item);
          }
        } else {
          const errText = await response.text();
          let msg = "Failed to upload one of the images.";
          try {
            const errJson = JSON.parse(errText);
            msg = errJson.error || msg;
          } catch (e) {}
          throw new Error(msg);
        }
      }

      setServerItems(prev => [...addedItems, ...prev]);
      
      // Revoke previews to clean up memory
      uploadQueue.forEach(qItem => URL.revokeObjectURL(qItem.previewUrl));
      setUploadQueue([]);
    } catch (err: any) {
      console.error("Upload queue error:", err);
      setUploadError(err.message || "Network error occurred during upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Permanent external URL adding
  const handleAddManualUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualUrl) return;

    try {
      const response = await fetch("/api/gallery/upload-single", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: {
            url: manualUrl,
            titleEn: manualTitle || "External Image Link",
            titleTa: "வெளிப்புற படம்",
            category: "classes",
            descEn: "Linked external image added to gallery.",
            descTa: "இணைக்கப்பட்ட வெளிப்புற படம்."
          }
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.item) {
          setServerItems(prev => [result.item, ...prev]);
          setManualUrl("");
          setManualTitle("");
          setUploadError(null);
        }
      } else {
        const errText = await response.text();
        let msg = "Failed to link URL.";
        try {
          const errJson = JSON.parse(errText);
          msg = errJson.error || msg;
        } catch (e) {}
        setUploadError(msg);
      }
    } catch (err: any) {
      console.error("Link manual URL error:", err);
      setUploadError("Network error occurred. Please try again.");
    }
  };

  // Permanent server deletion
  const handleDeleteItem = async (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(language === "en" ? "Delete this image permanently from the gallery?" : "இந்த படத்தை கேலரியில் இருந்து நிரந்தரமாக நீக்கவா?")) {
      return;
    }

    try {
      const res = await fetch(`/api/gallery/item/${itemId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setServerItems(prev => prev.filter(item => item.id !== itemId));
        const updatedChecked = { ...checkedImageIds };
        delete updatedChecked[itemId];
        setCheckedImageIds(updatedChecked);
      } else {
        alert("Failed to delete image from server.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleToggleCheckImage = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedImageIds(prev => {
      const updated = {
        ...prev,
        [itemId]: !prev[itemId]
      };
      return updated;
    });
  };

  // Merge server-side custom items with local default items
  const items = [...serverItems, ...GALLERY_ITEMS];
  const checkedItems = items.filter(item => !!checkedImageIds[item.id]);

  // Filtered Items
  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const categories = [
    { id: "all", label: t.gallery_all },
    { id: "concerts", label: t.gallery_concerts },
    { id: "classes", label: t.gallery_classes },
    { id: "instruments", label: t.gallery_instruments },
    { id: "awards", label: t.gallery_awards }
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn max-w-7xl mx-auto px-1">
      {/* Banner Title */}
      <div className="relative bg-white border border-brand-brown-100 rounded-3xl p-6 md:p-8 overflow-hidden shadow-xs">
        <div className="absolute top-0 left-0 w-36 h-36 bg-brand-yellow-50 rounded-full -translate-x-1/4 -translate-y-1/4 opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-brand-brown-100/30 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-brand-yellow-100 text-brand-yellow-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-brand-yellow-200">
            <ImageIcon className="w-3.5 h-3.5" /> {t.interactive_gallery}
          </div>
          <h2 className="font-serif text-2xl md:text-3.5xl font-extrabold text-brand-brown-900 leading-tight">
            {t.gallery_title}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-2xl font-medium">
            {t.gallery_subtitle}
          </p>
        </div>
      </div>

      {/* CHECKED IMAGES PREVIEW CAROUSEL */}
      {checkedItems.length > 0 && (
        <div className="bg-brand-brown-900 text-white rounded-3xl p-6 border border-brand-yellow-400 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow-500 animate-pulse"></span>
              <h3 className="font-serif text-base font-extrabold text-brand-yellow-100 uppercase tracking-wider">
                {language === "en" ? "Live Checked Images Preview" : "தேர்ந்தெடுக்கப்பட்ட படங்களின் முன்னோட்டம்"}
              </h3>
            </div>
            <span className="text-[11px] font-mono font-bold bg-brand-yellow-500/20 text-brand-yellow-400 px-3 py-1 rounded-full uppercase">
              {checkedItems.length} {language === "en" ? "Selected" : "தேர்வு செய்யப்பட்டுள்ளது"}
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin snap-x max-h-[220px]">
            {checkedItems.map((item) => {
              const title = language === "en" ? item.titleEn : item.titleTa;
              return (
                <div 
                  key={item.id}
                  className="snap-start flex-shrink-0 w-52 bg-white/5 border border-white/10 rounded-2xl p-2.5 space-y-2 relative group"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40">
                    <img 
                      src={item.url} 
                      alt={title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => handleToggleCheckImage(item.id, e)}
                      className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors shadow-md cursor-pointer"
                      title="Uncheck image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-xs font-bold text-brand-yellow-100 line-clamp-1">{title}</h4>
                    <span className="text-[9px] uppercase tracking-wider text-brand-brown-400 font-bold">{item.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* IMAGE IMPORT & UPLOAD CENTER */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-3xl border border-brand-brown-100">
          {/* Upload multiple files card */}
          <div className="space-y-3 flex flex-col justify-between p-4 bg-brand-brown-50/50 rounded-2xl border border-dashed border-brand-brown-200">
            <div>
              <h3 className="font-serif text-base font-bold text-brand-brown-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-brand-yellow-600" />
                {language === "en" ? "Bulk Image Uploader" : "ஒரே நேரத்தில் பல படங்கள் பதிவேற்றவும்"}
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-1">
                {language === "en" 
                  ? "Select and upload up to 20 images simultaneously to save them permanently on the server."
                  : "ஒரே நேரத்தில் 10-20 படங்கள் வரை தேர்வு செய்து இணையதளத்தில் நிரந்தரமாக சேமிக்கவும்."}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="file"
                accept="image/*"
                multiple
                id="gallery-file-uploader"
                onChange={handleMultipleFilesChange}
                className="hidden"
              />
              <label
                htmlFor="gallery-file-uploader"
                className="w-full py-3 bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer text-center block shadow-2xs uppercase tracking-wider"
              >
                {language === "en" ? "Select Multiple Files (Max 20)" : "கோப்புகளை தேர்வு செய்க (அதிகபட்சம் 20)"}
              </label>
              {uploadError && <p className="text-[11px] font-bold text-red-600">{uploadError}</p>}
            </div>
          </div>

          {/* Import URL card */}
          <form onSubmit={handleAddManualUrl} className="space-y-3 p-4 bg-brand-brown-50/50 rounded-2xl border border-brand-brown-100 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-brand-brown-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-brand-yellow-600" />
                {language === "en" ? "Link Single Image URL" : "படத்தின் இணைய முகவரியை இணைக்கவும்"}
              </h3>
              <p className="text-xs text-gray-400 font-medium mt-1">
                {language === "en"
                  ? "Paste any direct image web link (HTTPS) to register it permanently in the gallery."
                  : "இணையத்தில் உள்ள நேரடிப் படத்தின் இணைப்பை உள்ளிட்டு அகாடமி கேலரியில் இணைக்கவும்."}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="text"
                placeholder={language === "en" ? "Image Title (Optional)" : "தலைப்பு (விருப்பம்)"}
                value={manualTitle}
                onChange={(e) => setManualTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-brand-brown-200 rounded-lg focus:outline-none focus:border-brand-yellow-500 font-medium bg-white"
              />
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  placeholder="https://example.com/image.jpg"
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-brand-brown-200 rounded-lg focus:outline-none focus:border-brand-yellow-500 font-medium bg-white flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-brown-900 hover:bg-brand-brown-950 text-white font-extrabold text-xs rounded-lg transition-all cursor-pointer whitespace-nowrap uppercase tracking-wider"
                >
                  {language === "en" ? "Add Link" : "சேர்க்கவும்"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* BATCH UPLOAD QUEUE MANAGER PANEL */}
        {uploadQueue.length > 0 && (
          <div className="bg-brand-brown-50 border border-brand-brown-200 rounded-3xl p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-brand-brown-200/50 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow-600 animate-pulse"></span>
                <h3 className="font-serif text-sm md:text-base font-extrabold text-brand-brown-900 uppercase tracking-wider">
                  {language === "en" ? "Configure Selected Images Queue" : "தேர்வு செய்யப்பட்ட படங்களின் விவரங்கள்"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    uploadQueue.forEach(item => URL.revokeObjectURL(item.previewUrl));
                    setUploadQueue([]);
                  }}
                  className="text-xs font-bold text-red-600 hover:text-red-700 underline cursor-pointer bg-transparent border-none"
                >
                  {language === "en" ? "Clear Queue" : "வரிசையை காலியாக்கு"}
                </button>
                <span className="text-[11px] font-mono font-bold bg-brand-brown-900 text-white px-3 py-1 rounded-full">
                  {uploadQueue.length} / 20
                </span>
              </div>
            </div>

            {/* Grid of Queued Items with Individual Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[350px] overflow-y-auto pr-1">
              {uploadQueue.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white border border-brand-brown-100 rounded-2xl p-3 flex gap-3 relative shadow-2xs hover:border-brand-yellow-500 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/5 flex-shrink-0 relative">
                    <img 
                      src={item.previewUrl} 
                      alt="Queued thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeQueueItem(item.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                      title="Remove from queue"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Title input */}
                    <input
                      type="text"
                      placeholder={language === "en" ? "English Title" : "ஆங்கில தலைப்பு"}
                      value={item.titleEn}
                      onChange={(e) => updateQueueItem(item.id, { titleEn: e.target.value })}
                      className="w-full px-2 py-1 text-[11px] font-bold border border-brand-brown-100 rounded focus:outline-none focus:border-brand-yellow-500"
                    />
                    {/* Tamil Title input */}
                    <input
                      type="text"
                      placeholder={language === "en" ? "Tamil Title" : "தமிழ் தலைப்பு"}
                      value={item.titleTa}
                      onChange={(e) => updateQueueItem(item.id, { titleTa: e.target.value })}
                      className="w-full px-2 py-1 text-[11px] font-bold border border-brand-brown-100 rounded focus:outline-none focus:border-brand-yellow-500"
                    />
                    {/* Category Selector */}
                    <select
                      value={item.category}
                      onChange={(e) => updateQueueItem(item.id, { category: e.target.value as any })}
                      className="w-full px-1.5 py-1 text-[10px] font-extrabold text-brand-brown-800 bg-brand-brown-50 border border-brand-brown-100 rounded focus:outline-none focus:border-brand-yellow-500 cursor-pointer uppercase tracking-wider"
                    >
                      <option value="classes">{language === "en" ? "Classes" : "வகுப்புகள்"}</option>
                      <option value="concerts">{language === "en" ? "Concerts" : "நிகழ்ச்சிகள்"}</option>
                      <option value="instruments">{language === "en" ? "Instruments" : "இசைக்கருவிகள்"}</option>
                      <option value="awards">{language === "en" ? "Awards" : "விருதுகள்"}</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons to save queue */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-brown-200/50">
              {uploadError && (
                <p className="text-xs font-bold text-red-600 mr-auto">{uploadError}</p>
              )}
              <button
                onClick={handleUploadQueue}
                disabled={isUploading}
                className="px-6 py-3 bg-brand-brown-900 hover:bg-brand-brown-950 disabled:bg-gray-400 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 uppercase tracking-widest"
              >
                {isUploading ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    {language === "en" ? "Uploading & Saving..." : "சேமிக்கப்படுகிறது..."}
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-brand-yellow-400" />
                    {language === "en" ? "Save Queue to Server Permanently" : "இணையதளத்தில் நிரந்தரமாக சேமிக்கவும்"}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Categories Filter tab selectors */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-brand-brown-500 flex items-center gap-1 flex-shrink-0 uppercase tracking-wider pl-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        <div className="flex gap-1.5 bg-brand-brown-50 p-1 rounded-2xl border border-brand-brown-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-brand-yellow-500 text-white shadow-xs font-extrabold"
                  : "text-brand-brown-800 hover:bg-brand-brown-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of gallery assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, idx) => {
          const title = language === "en" ? item.titleEn : item.titleTa;
          const desc = language === "en" ? item.descEn : item.descTa;
          const isChecked = !!checkedImageIds[item.id];
          return (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative bg-white border border-brand-brown-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-brand-yellow-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video sm:aspect-square overflow-hidden bg-brand-brown-50">
                <img
                  src={item.url}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Checked Overlay Checkbox */}
                <button
                  onClick={(e) => handleToggleCheckImage(item.id, e)}
                  className="absolute top-2 left-2 z-20 p-1.5 rounded-full bg-white/95 text-brand-brown-900 transition-colors shadow-md hover:scale-110 cursor-pointer"
                  title={isChecked ? "Uncheck image" : "Check image"}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-brand-yellow-600" />
                  ) : (
                    <Square className="w-4 h-4 text-brand-brown-300" />
                  )}
                </button>

                {/* Delete button if it's custom */}
                {item.id.startsWith("custom_") && (
                  <button
                    onClick={(e) => handleDeleteItem(item.id, e)}
                    className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors shadow-md hover:scale-110 cursor-pointer"
                    title="Delete custom image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/95 text-brand-brown-900 flex items-center justify-center shadow-md scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-brand-yellow-700 bg-brand-yellow-50 px-2 py-0.5 rounded-md uppercase border border-brand-yellow-100/50 inline-block">
                    {item.category}
                  </span>
                  {isChecked && (
                    <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                      ✓ Checked
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-sm font-bold text-brand-brown-900 line-clamp-1">
                  {title}
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed font-medium">
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (() => {
        const item = filteredItems[lightboxIndex];
        const title = language === "en" ? item.titleEn : item.titleTa;
        const desc = language === "en" ? item.descEn : item.descTa;
        return (
          <div
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn"
            onClick={closeLightbox}
          >
            {/* Top Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Center Content Container */}
            <div
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full bg-brand-brown-900/60 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
                <img
                  src={item.url}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] md:max-h-[65vh] object-contain max-w-full"
                />
              </div>

              {/* Caption metadata bar */}
              <div className="w-full text-center space-y-1 p-4 bg-brand-brown-100/10 rounded-2xl border border-white/5 max-w-xl">
                <span className="text-[10px] font-bold text-brand-yellow-500 uppercase tracking-widest">
                  {item.category} • {lightboxIndex + 1} of {filteredItems.length}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-bold text-white">
                  {title}
                </h3>
                <p className="text-xs text-brand-brown-500 max-w-md mx-auto leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        );
      })()}
    </div>
  );
}
