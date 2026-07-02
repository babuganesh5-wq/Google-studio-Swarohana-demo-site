import { SyllabusLevel, ShrutiPitch } from "./types";

export const SHRUTI_PITCHES: ShrutiPitch[] = [
  { name: "C (1 Kattai)", tamilName: "C (1 கட்டை)", frequency: 130.81, label: "C3" },
  { name: "C# (1.5 Kattai)", tamilName: "C# (1.5 கட்டை)", frequency: 138.59, label: "C#3" },
  { name: "D (2 Kattai)", tamilName: "D (2 கட்டை)", frequency: 146.83, label: "D3" },
  { name: "D# (2.5 Kattai)", tamilName: "D# (2.5 கட்டை)", frequency: 155.56, label: "D#3" },
  { name: "E (3 Kattai)", tamilName: "E (3 கட்டை)", frequency: 164.81, label: "E3" },
  { name: "F (4 Kattai)", tamilName: "F (4 கட்டை)", frequency: 174.61, label: "F3" },
  { name: "F# (4.5 Kattai)", tamilName: "F# (4.5 கட்டை)", frequency: 185.00, label: "F#3" },
  { name: "G (5 Kattai)", tamilName: "G (5 கட்டை)", frequency: 196.00, label: "G3" },
  { name: "G# (5.5 Kattai)", tamilName: "G# (5.5 கட்டை)", frequency: 207.65, label: "G#3" },
  { name: "A (6 Kattai)", tamilName: "A (6 கட்டை)", frequency: 220.00, label: "A3" },
];

export const SYLLABUS_DATA: SyllabusLevel[] = [
  {
    levelId: "level1",
    title: "Carnatic Level 1",
    tamilTitle: "கர்நாடக இசை நிலை 1",
    stage: "Basic",
    tamilStage: "அடிப்படை வகுப்பு",
    onlineDuration: "6 to 9 months",
    onlineStudents: 5,
    groupDuration: "9 to 12 months",
    groupStudents: "8 to 10",
    items: [
      {
        id: "l1_sarali",
        index: 1,
        name: "Sarali Varisai",
        countText: "14",
        classCountText: "( 8 Class )",
        description: "Fundamental step-by-step swara sequences that introduce the basic scale structure, pitch stabilization, and rhythmic intervals.",
        notation: "1st Speed (1 swara per beat):\nS   R   G   M  |  P   D   N   S'\nS'  N   D   P  |  M   G   R   S\n\n2nd Speed (2 swaras per beat):\nSR  GM  PD  NS' | S'N DP MG RS\n\n3rd Speed (4 swaras per beat):\nSRGM PDNS' | S'NDP MGRS",
        details: [
          "Set in Raga Mayamalavagowla (15th Melakarta).",
          "Includes 14 progressive patterns.",
          "Practiced in 3 different speeds to achieve steady rhythm (Laya).",
          "Focus on steady posture, vocal control, and synchronization with Shruthi."
        ]
      },
      {
        id: "l1_jandai",
        index: 2,
        name: "Jandai Varisai",
        countText: "9",
        classCountText: "( 8 Class )",
        description: "Twin-note combinations (double swaras) that strengthen vocal force, clarity, and finger coordination on instruments.",
        notation: "Pattern 1:\nS-S  R-R  G-G  M-M  |  P-P  D-D  N-N  S'-S'\nS'-S' N-N  D-D  P-P  |  M-M  G-G  R-R  S-S\n\n(Pronounced as 'Sa-Sa Ri-Ri Ga-Ga' with gentle emphasis / Jaru / Sphuritam on the second note.)",
        details: [
          "Teaches double-note patterns (Sphuritam ornament).",
          "Improves vocal stamina and ability to transition between notes rapidly.",
          "Essential for developing vocal weight and modulation."
        ]
      },
      {
        id: "l1_upper",
        index: 3,
        name: "Upper Sthayee Varisaikal",
        countText: "5",
        classCountText: "( 4 Class )",
        description: "Vocal and instrumental exercises to gradually expand range up into the higher octaves (Tara Sthayee).",
        notation: "Example pattern:\nS R G M | P D N S'\nS' - - - | S' - - -\nS' R' S' N | D P N S'\nS' N D P | M G R S",
        details: [
          "Introduces notes above higher Shadjam (S' to R', G', M').",
          "Helps reach higher notes without straining.",
          "Teaches breath support techniques for higher registers."
        ]
      },
      {
        id: "l1_lower",
        index: 4,
        name: "Lower Sthayee Varisaikal",
        countText: "5",
        classCountText: "( 4 Class )",
        description: "Exercises to dive safely into the lower octaves (Mandra Sthayee), securing depth and resonance.",
        notation: "Example pattern:\nS N D P | M G R S\nS - - - | S - - -\nS N, S R | G M R S\nS R G M | P D N S'",
        details: [
          "Teaches notes below the starting middle Shadjam (N,, D,, P,).",
          "Secures a rich, bass-like resonance in vocalists.",
          "Establishes a solid foundational anchor for all ragas."
        ]
      },
      {
        id: "l1_dhattu",
        index: 5,
        name: "Dhattu Varisaikal",
        countText: "2",
        classCountText: "( 8 Class )",
        description: "Zig-zag / skip-note patterns that challenge swara memory and expand spatial perception of pitches.",
        notation: "Pattern 1:\nS G R M | G P M D | P N D S'\nS' D N P | D M P G | M R G S\n\n(Pattern skip order: 1-3-2-4, 3-5-4-6, etc.)",
        details: [
          "Skip-note exercises (e.g. Sa to Ga, Ri to Ma).",
          "Crucial for advanced melodic improvisation (Kalpanaswaram).",
          "Improves cognitive mapping of note intervals."
        ]
      },
      {
        id: "l1_pancha",
        index: 6,
        name: "Pancha Thalam Practice (3 Speeds)",
        countText: "Pancha Thalam",
        classCountText: "( 4 Class )",
        description: "Introduction to five basic rhythmic meters (Thalams) to establish deep metric precision.",
        notation: "Practicing basic sequences in:\n- Dhruva Thalam (14 beats)\n- Matya Thalam (10 beats)\n- Rupaka Thalam (6 beats)\n- Jhampa Thalam (10 beats)\n- Triputa Thalam (7 beats)",
        details: [
          "Develops cross-rhythmic calculation abilities.",
          "Teaches the system of Laghu, Dhrutam, and Anudhrutam.",
          "A foundational pillar for rhythmic mastery in Carnatic concert formats."
        ]
      },
      {
        id: "l1_alankaram",
        index: 7,
        name: "Alankaram",
        countText: "9",
        classCountText: "( 16 Class )",
        description: "Multi-measure metric formulas set to the Sapta Thalams, bringing structure, beauty, and ornaments to the basic swaras.",
        notation: "Eka Thalam (4 beats):\nS   R   G   M\nP   D   N   S'\n\nDhruva Thalam Alankaram:\nS R G M | G R | S R G M | S R G M\n(Practiced across various beats to create perfect tempo synchronization.)",
        details: [
          "Seven fundamental Thalams practiced with specific structural swara combinations.",
          "Excellent for finger dexterity on violin, veena, and flute.",
          "Develops a rigid sense of the metric cycle."
        ]
      },
      {
        id: "l1_slokam",
        index: 8,
        name: "Level 1 Slokam",
        countText: "5",
        classCountText: "( 8 Class )",
        description: "Introduction to singing devotional and traditional sanskrit verses in melodious ragas.",
        notation: "Slokam 1: Ganesha Slokam - 'Shuklambaradharam Vishnum'\nSlokam 2: Guru Slokam - 'Gurur Brahma Gurur Vishnu'\nSlokam 3: Saraswathi Slokam - 'Saraswathi Namasthubhyam'",
        details: [
          "Taught in easy, soothing ragas like Mayamalavagowla or Kalyani.",
          "Improves Sanskrit diction and breath control over words (sahitya).",
          "Brings emotional devotion (bhakti bhava) to the singing style."
        ]
      },
      {
        id: "l1_songs",
        index: 9,
        name: "Level 1 Songs",
        countText: "20",
        classCountText: "( 24 Class )",
        description: "Twenty simple devotional songs (Nottuswaras, Bhajans) that merge swara notation with lyrics.",
        notation: "Nottuswaram Examples:\n- 'Shyamale Meenakshi' in Shankarabharanam Raga\n- 'Vara Veena' (Geetham prep) or Bhajans set to Adi Thalam",
        details: [
          "Combines musical syllables with meaningful text.",
          "Prepares the student for the rhythmic constraints of standard compositions.",
          "Builds an impressive repertoire of 20 performable basic pieces."
        ]
      },
      {
        id: "l1_theory",
        index: 10,
        name: "Level 1 Theory",
        countText: "Theory",
        classCountText: "( 4 Class )",
        description: "Theoretical study of fundamental Carnatic terminology, raga classifications, and biographies of ancient saints.",
        notation: "Definitions: Nadam, Sruthi, Swara (Siddha/Vikruthi swaras), Sthayee, Thalam, Laya, and introduction to Trinity composers (Thyagaraja, Muthuswami Dikshitar, Syama Sastri).",
        details: [
          "Structured theory sheets for exams.",
          "Understanding the structure of Raga Mayamalavagowla.",
          "History of Indian Classical Music origins."
        ]
      },
      {
        id: "l1_ear",
        index: 11,
        name: "Level 1 Ear Training",
        countText: "Ear Training",
        classCountText: "( 8 Class )",
        description: "Interactive pitch matching and rhythmic detection exercises to build a musical ear.",
        notation: "Aural tests:\n- Identifying if a note is Sa, Pa, or S'.\n- Replicating simple swara phrases sung by the teacher.",
        details: [
          "Develops relative pitch recognition (Swarajnanam).",
          "Improves alignment with the Tambura/Shruti box.",
          "Trains students to identify rhythmic errors instantly."
        ]
      },
      {
        id: "l1_instruments",
        index: 12,
        name: "Identify Music Instruments",
        countText: "Instruments",
        classCountText: "( 4 Class )",
        description: "Visual and acoustic identification of traditional Carnatic musical instruments and their structural ranges.",
        notation: "Instruments studied: Veena, Violin, Flute, Mridangam, Ghatam, Kanjira, Tambura.",
        details: [
          "Understanding String, Wind, Percussion, and Drone categories.",
          "Learning the specific sound signature and timbre of each instrument.",
          "Understanding acoustic ranges and accompaniment dynamics."
        ]
      }
    ]
  },
  {
    levelId: "level2",
    title: "Carnatic Level 2",
    tamilTitle: "கர்நாடக இசை நிலை 2",
    stage: "Intermediate",
    tamilStage: "இடைநிலை வகுப்பு",
    onlineDuration: "8 to 12 months",
    onlineStudents: 5,
    groupDuration: "8 to 12 months",
    groupStudents: "8 to 10",
    items: [
      {
        id: "l2_geetham",
        index: 1,
        name: "Geetham",
        countText: "5",
        description: "The simplest melodic compositions in Carnatic music, introducing continuous lyric and swara synchronization.",
        notation: "Geetham 1: 'Sri Gananatha' in Malahari Raga, Rupaka Thalam.\nSwara:   M P | D S' | D P | M P ||\nLyrics:  Sri | Ga na | na tha | si dhi ||",
        details: [
          "Teaches 5 classic Geethams (including Malahari, Mohanam, and Kalyani Ragas).",
          "Brings together melody, rhythm, and lyrical meaning (Sahitya) seamlessly.",
          "Set to easy, graceful rhythmic patterns like Rupaka or Triputa Thalam."
        ]
      },
      {
        id: "l2_swarajathi",
        index: 2,
        name: "Swarajathi",
        countText: "2",
        description: "Slightly more complex than Geethams, swarajathis feature structural sections (Pallavi, Anupallavi, Charanam) with alternating swara and lyric blocks.",
        notation: "Example: Swarajathi in Bilahari Raga or Khamas Raga.\nPallavi: S , , R G , M P | G , M R S , N, D, ||",
        details: [
          "Introduces the three-tier compositional structure (Pallavi, Anupallavi, Charanam).",
          "Teaches aesthetic movements of swaras (Gamakas).",
          "Improves rhythmic control over complex pauses."
        ]
      },
      {
        id: "l2_jathiswaram",
        index: 3,
        name: "Jathiswaram",
        countText: "2",
        description: "A purely melodic form with no lyrics (sahitya), featuring dance-like rhythmic patterns (Jathis) expressed through swaras.",
        notation: "Jathiswaram in Kalyani or Sankarabharanam Raga.\nStructure: Pallavi followed by multiple Charanams with distinct swara groupings.",
        details: [
          "Focus on pure technical singing and absolute pitch accuracy.",
          "Excellent for finger strength and velocity on string instruments.",
          "Bridges the gap between basic lessons and advanced concert pieces."
        ]
      },
      {
        id: "l2_janya",
        index: 4,
        name: "Alankaram in 5 Janya Ragas",
        countText: "5 Ragas",
        description: "Practicing the 9 foundational Alankarams in child ragas (Janya Ragas) to master diverse scale intervals and moods.",
        notation: "Ragas practiced:\n- Mohanam (Pentatonic Scale)\n- Hamsadhwani\n- Hindolam\n- Madhyamavati\n- Suddha Dhanyasi",
        details: [
          "Moves beyond the standard Mayamalavagowla scale.",
          "Introduces ragas with missing swaras (Varja ragas).",
          "Familiarizes the student's ear with the aesthetic color of different ragas."
        ]
      },
      {
        id: "l2_slokam",
        index: 5,
        name: "Level 2 Slokam",
        countText: "5",
        description: "Slightly more complex Sanskrit verses set to ragas requiring beautiful ornamentations (Gamakas).",
        notation: "Example: Slokams set to Ragas Kalyani, Shankarabharanam, Madhyamavati, Sahana, and Hindolam.",
        details: [
          "Introduces expressive emotional singing (Bhava).",
          "Teaches how to transition between multiple ragas (Ragamalika slokams).",
          "Focus on perfect pronounciation and lyrical pause intervals."
        ]
      },
      {
        id: "l2_songs",
        index: 6,
        name: "Level 2 Songs",
        countText: "25",
        description: "A collection of 25 intermediate-level devotional compositions like Purandara Dasa Devaranamas, Annamacharya Kirthanas, and simple Tamil/Telugu bhajans.",
        notation: "Compositions like 'Kereya Neeranu Kerege Chelli' or simple Keerthanas set to Adi/Rupaka Thalams.",
        details: [
          "Develops a performable stage repertoire of 25 pieces.",
          "Teaches musical storytelling and lyrical expression.",
          "Builds incredible breath control and stamina for longer compositions."
        ]
      },
      {
        id: "l2_theory",
        index: 7,
        name: "Level 2 Theory",
        countText: "Theory",
        description: "Deep theoretical study of Raga classification systems, Janya Raga types, and the metric structure of Thalams.",
        notation: "Topics: Janaka-Janya raga system, Upanga/Bhashanga classification, Varja/Vakra ragas, Lakshana of 5 studied Ragas, and metric calculations.",
        details: [
          "Understanding the 72 Melakarta scheme basics.",
          "Writing notations for Geethams and Swarajathis with metric division lines.",
          "Lives and works of secondary prominent composers."
        ]
      },
      {
        id: "l2_ear",
        index: 8,
        name: "Level 2 Ear Training",
        countText: "Ear Training",
        description: "Advanced relative pitch training, focusing on identifying individual notes in fast phrases and recognizing common ragas.",
        notation: "Aural tests:\n- Identifying the raga (e.g., Mohanam vs Hamsadhwani) from a short melody.\n- Writing down swaras for a simple 3-note melody phrase.",
        details: [
          "Sharpens the ear to recognize subtle pitch shifts.",
          "Prepares students for raga identification in concerts.",
          "Builds transcription skills."
        ]
      },
      {
        id: "l2_sounds",
        index: 9,
        name: "Identify Music Instruments Sounds",
        countText: "Acoustics",
        description: "Aural identification and micro-tonal acoustic analysis of classic Indian instruments from solo audio samples.",
        notation: "Acoustic signatures of Veena, Chitraveena, Flute, Violin, Mridangam, Tavil.",
        details: [
          "Focus on auditory identification of string plucks, wind blows, and leather strikes.",
          "Understanding the role of Gati and Sollukattu (percussion syllables).",
          "Appreciating accompaniment hierarchy in classical concerts."
        ]
      },
      {
        id: "l2_voice",
        index: 10,
        name: "Voice Culture Level 1",
        countText: "Voice Culture",
        description: "Vocal health, breathing dynamics, posture correction, and articulation drills to achieve a rich, honeyed, open voice.",
        notation: "Exercises:\n- Akaara, Ukaara, Mkaara breathing loops.\n- Sustaining a single Shadjam note for 20+ seconds with perfect pitch clarity.",
        details: [
          "Eliminates vocal strain and breathiness.",
          "Teaches open-throat singing techniques.",
          "Builds a uniform vocal texture across middle and high octaves."
        ]
      }
    ]
  },
  {
    levelId: "level3",
    title: "Carnatic Level 3",
    tamilTitle: "கர்நாடக இசை நிலை 3",
    stage: "Advance",
    tamilStage: "உயர்நிலை வகுப்பு",
    onlineDuration: "18 to 24 months",
    onlineStudents: 5,
    groupDuration: "18 to 24 months",
    groupStudents: "5",
    items: [
      {
        id: "l3_thana",
        index: 1,
        name: "Thana Varnam",
        countText: "10",
        description: "Highly complex, foundational masterworks of Carnatic music that combine intricate gamakas, mathematical swara structures, and rapid transitions across multiple speeds.",
        notation: "Example: 'Ninnukori' in Mohana Raga, Adi Thalam.\nPallavi:\nG G P D P D S' , | D S' R' G' R' S' D P ||\n(Set to rapid rhythmic subdivisions, crucial for concert-ready posture.)",
        details: [
          "Mastering 10 major Varnams (including Mohanam, Kalyani, Shankarabharanam, and Abhogi).",
          "Taught in both Chowka Kalam (slow) and Madhyama Kalam (fast) speeds.",
          "The ultimate training for speed, precision, and complete control over Carnatic gamakas."
        ]
      },
      {
        id: "l3_ada",
        index: 2,
        name: "Ada Thala Varnam",
        countText: "2",
        description: "Varnams set to the massive 14-beat Ada Thalam cycle, demanding exceptional rhythmic calculation and extreme vocal breath sustainability.",
        notation: "Example: 'Viriboni' in Bhairavi Raga, Ada Thalam (14 beats).\nPallavi: S' , , , N D P , | M G R , | S R G M ||",
        details: [
          "Explores advanced musical structures and rare classic ragas.",
          "Tests the limits of rhythm division and breath suspension.",
          "Highly prestigious pieces, rarely mastered by casual learners."
        ]
      },
      {
        id: "l3_keerthanai",
        index: 3,
        name: "Keerthanai",
        countText: "10",
        description: "Ten standard concert compositions composed by the classical Trinity (Thyagaraja, Dikshitar, Sastri) and other legendary masters.",
        notation: "Compositions like 'Vatapi Ganapatim' in Hamsadhwani or 'Sobhillu Saptaswara' in Jaganmohini.",
        details: [
          "Introduces the full expressive beauty of Carnatic compositions.",
          "Teaches multiple Sangatis (melodic variations of a single line).",
          "Focuses on delivering word lyrics with correct emotional mood (Bhava)."
        ]
      },
      {
        id: "l3_pancharathna",
        index: 4,
        name: "Pancharathna Keerthanai",
        countText: "1",
        description: "Study of 1 major composition from Saint Thyagaraja's immortal 'Five Gems' (Pancharathnas), which feature grand, majestic choral structures.",
        notation: "Usually starting with 'Jagadanandakaraka' in Nata Raga or 'Dudukugala' in Gowla Raga.",
        details: [
          "A major milestone for any Carnatic musician.",
          "Highly complex, features long, flowing charanam swara passages.",
          "Often sung in mass gatherings and major music festivals."
        ]
      },
      {
        id: "l3_other_ragas",
        index: 5,
        name: "Alankaram in 5 Other Ragas",
        countText: "5 Ragas",
        description: "Practicing Alankarams in highly complex, microtonal ragas (Bhairavi, Todi, Kambhoji, Kharaharapriya, Purvikalyani) containing intricate, delicate gamakas.",
        notation: "Vibrato (Kampita gamaka) and glide (Jaru) techniques applied to complex musical intervals.",
        details: [
          "Builds deep familiarity with heavy, classical ragas (Gana Ragas).",
          "Develops the skill to transition between natural notes and flat/sharp notes.",
          "Secures advanced intonation accuracy."
        ]
      },
      {
        id: "l3_speeds",
        index: 6,
        name: "Alankaram in 4 Speeds",
        countText: "4 Speeds",
        description: "Rhythmic acceleration drills, practicing Alankarams in 1st, 2nd, 3rd, and 4th speeds (from 1 swara per beat up to 8 swaras per beat).",
        notation: "1st Speed: 1 note per beat\n2nd Speed: 2 notes per beat\n3rd Speed: 4 notes per beat\n4th Speed: 8 notes per beat (extremely rapid!)",
        details: [
          "Creates lightning-fast vocal articulation and tongue coordination.",
          "Increases mental agility to calculate tempo subdivisions instantly.",
          "Prerequisite for singing fast-tempo Tanam and Kalpanaswaram."
        ]
      },
      {
        id: "l3_voice_alankaram",
        index: 7,
        name: "Alankaram in Voice Culture",
        countText: "Vocal Gym",
        description: "Applying vocal exercises directly to Alankaram structures, using vowel variations (Akaara, Ikaara, Ukaara) at high velocities.",
        notation: "Singing Alankarams purely on 'Aa', 'Ee', 'Oo' sounds without pronouncing the swara syllables.",
        details: [
          "Brings incredible liquidity and brightness to the voice.",
          "Allows the singer to produce fast runs without sliding or losing pitch accuracy.",
          "Establishes absolute voice clarity."
        ]
      },
      {
        id: "l3_slokam",
        index: 8,
        name: "Level 3 Slokam",
        countText: "5",
        description: "Five highly classical Slokams set to grand ragas, incorporating intricate, unmetered melodic improvisations (Virutham style).",
        notation: "Slokams set to Ragas Shanmukhapriya, Keeravani, Charukesi, Arabhi, and Anandabhairavi.",
        details: [
          "Introduces unmetered, expressive classical singing (Virutham / Slokam singing).",
          "Allows students to express their own creative phrasing (Manodharma).",
          "Perfect for launching classical concerts."
        ]
      },
      {
        id: "l3_songs",
        index: 9,
        name: "Level 3 Songs",
        countText: "20",
        description: "Twenty advanced classical compositions, including Javalis, Ashtapadis, Tarangams, and complex compositions by Swathi Thirunal and Patnam Subramania Iyer.",
        notation: "Repertoire include 'Radha Sametha Krishna' (Ashtapadi) or classical Javalis set to medium speeds.",
        details: [
          "A balanced, classical concert-ready repertoire of 20 advanced pieces.",
          "Teaches romantic, dramatic, and spiritual expressions in lyrics.",
          "Familiarizes the student with multiple languages (Sanskrit, Telugu, Tamil, Kannada)."
        ]
      },
      {
        id: "l3_thillana",
        index: 10,
        name: "Thillana",
        countText: "2",
        description: "Joyous, fast-paced, highly rhythmic concluding pieces in Carnatic concerts, featuring crisp rhythmic syllables (Dheem, Thana, Thirana) and short lyrical segments.",
        notation: "Thillana in Raga Dhanasree or Raga Kadanakuthuhalam set to Adi Thalam.\nLyrics: 'Dheem ta dharatā dhīm ta dharatā' followed by short swara patterns.",
        details: [
          "Taught in lively, cheerful ragas.",
          "Requires extreme tongue coordination to articulate rapid rhythmic syllables.",
          "Provides a brilliant, high-energy finish to a classical performance."
        ]
      },
      {
        id: "l3_ragam",
        index: 11,
        name: "Ragam Singing Practice Level 1",
        countText: "Improvisation",
        description: "The beginning of creative music (Manodharma Sangeetham) — learning to sketch and improvise a raga outline (Raga Alapana) without any notation or metric limits.",
        notation: "Learning to weave beautiful phrases in Mohanam or Kalyani raga using standard aesthetic rules (Arohana/Avarohana boundaries).",
        details: [
          "Unlocks the student's inner creativity and imagination.",
          "Teaches how to elaborate a raga systematically from the lower octave to the higher octave.",
          "The defining hallmark of a professional classical Carnatic musician."
        ]
      },
      {
        id: "l3_theory",
        index: 12,
        name: "Level 3 Theory",
        countText: "Theory",
        description: "Advanced theoretical study of Melakarta system derivation, 22 Shrutis (microtones), musical forms (Varnam, Kriti, Padam), and notation systems.",
        notation: "Katapayadi Sankhya formula (numerical coding for ragas), calculations of microtonal frequencies, and full notations writing for Varnams.",
        details: [
          "Complete mathematical formulation of Melakarta raga system.",
          "Understanding ancient scriptures: Natya Shastra, Sangeetha Ratnakara.",
          "In-depth biographical studies of major musicologists."
        ]
      },
      {
        id: "l3_ear",
        index: 13,
        name: "Level 3 Ear Training",
        countText: "Ear Training",
        description: "Concert-level ear training: identifying rapid, highly ornamented swara phrases, transcribing live vocals, and naming rare ragas.",
        notation: "Aural tests:\n- Listening to a 5-second fast swara run and writing it down with metric dots.\n- Naming overlapping ragas in Ragamalika compositions.",
        details: [
          "Achieving perfect, absolute pitch tracking.",
          "Builds capability to sing or play back any melody instantly after hearing it once.",
          "Develops extreme focus and rapid auditory comprehension."
        ]
      },
      {
        id: "l3_sounds_range",
        index: 14,
        name: "Identify Music Instruments Sounds & Range",
        countText: "Acoustics",
        description: "Understanding the exact pitch frequencies, structural limitations, ranges, and tuning methods of all major Indian classical instruments.",
        notation: "Frequencies: C# (1.5 Kattai) to G# (5.5 Kattai) ranges, microtonal adjustments, and open string notes.",
        details: [
          "Tuning procedures for Veena strings and Mridangam drumheads.",
          "Understanding how temperature and materials affect tuning.",
          "Conducting sound checks and acoustic balancing for live concerts."
        ]
      },
      {
        id: "l3_voice",
        index: 15,
        name: "Voice Culture Level 2",
        countText: "Voice Culture",
        description: "Advanced vocal range expansion, pitch stability, volume dynamics (singing soft vs strong), and safeguarding vocal cords against fatigue.",
        notation: "Exercises:\n- Practicing the 'Swarasthana' jump (jumping from low Sa directly to high Sa' or higher Pa' with pinpoint pitch accuracy).",
        details: [
          "Teaches head-voice, chest-voice, and nasal register mixing.",
          "Develops volume modulation capabilities (singing with soft micro-tones vs high projection).",
          "Essential vocal care and lifestyle recommendations for professional performers."
        ]
      }
    ]
  }
];
