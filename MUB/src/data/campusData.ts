export interface Facility {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  descEn: string;
  descAr: string;
  specsEn: string[];
  specsAr: string[];
  image: string;
}

export const campusFacilities: Facility[] = [
  {
    id: 'ai-supercomputing-center',
    titleEn: 'NVIDIA AI Supercomputing Lab',
    titleAr: 'مختبر الحوسبة الفائقة والذكاء الاصطناعي',
    categoryEn: 'Computing & Research',
    categoryAr: 'الحوسبة والبحوث',
    descEn: 'Equipped with dedicated enterprise GPU clusters (NVIDIA A100 & RTX Ada series) enabling students and researchers to train deep neural networks, run distributed LLM inferences, and simulate complex physical systems.',
    descAr: 'مزوّد بعناقيد حوسبة رسومية فائقة (NVIDIA A100 وسلسلة RTX Ada) لتدريب الشبكات العصبية العميقة وتشغيل نماذج الذكاء الاصطناعي التوليدي ومحاكاة الأنظمة الفيزيائية المعقدة.',
    specsEn: [
      'Dual 100Gbps InfiniBand internal fabric',
      'Over 2.4 PFLOPS aggregate AI computing power',
      'Direct integration with PyTorch & HuggingFace pipelines',
      'Liquid-cooled silent high-efficiency server racks'
    ],
    specsAr: [
      'شبكة ألياف داخلية فائقة السرعة 100 جيجابت/ثانية',
      'قدرة حوسبة تراكمية تتجاوز 2.4 بيتافلوبس للذكاء الاصطناعي',
      'ربط مباشر مع منصات PyTorch ومكتبات HuggingFace',
      'منظومة تبريد سائل فائقة الكفاءة وصامتة'
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mechatronics-hangar',
    titleEn: 'Robotics & Mechatronics Prototyping Hangar',
    titleAr: 'حظيرة الروبوتات وهندسة الميكاترونكس',
    categoryEn: 'Engineering Prototyping',
    categoryAr: 'التصنيع والنماذج الهندسية',
    descEn: 'A high-bay engineering hangar housing 6-axis industrial manipulator arms, multi-spindle CNC machining centers, additive 3D manufacturing stations, and automated guided vehicles (AGV) testing track.',
    descAr: 'حظيرة هندسية متطورة تضم أذرع روبوتية صناعية سداسية المحاور، أجهزة تصنيع رقمي CNC دقيقة، محطات طباعة ثلاثية الأبعاد، ومسار اختبار للمركبات الصناعية ذاتية القيادة.',
    specsEn: [
      '6-Axis KUKA & FANUC industrial robotic arms',
      '5-Axis CNC Precision vertical milling station',
      'High-precision optical motion capture tracking rig',
      'Dedicated pneumatic & hydraulic test benches'
    ],
    specsAr: [
      'أذرع روبوتية صناعية KUKA و FANUC سداسية المحاور',
      'محطة تفريز CNC رأسية خماسية المحاور عالية الدقة',
      'منظومة التقاط حركة بصرية ثلاثية الأبعاد لتتبع المسارات',
      'منصات اختبار هيدروليكية وهوائية متقدمة'
    ],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'digital-moot-court',
    titleEn: 'Digital Moot Court & Cyber Litigation Chamber',
    titleAr: 'المحكمة الصورية الرقمية وقاعة التقاضي السيبراني',
    categoryEn: 'Legal Advocacy & Technology',
    categoryAr: 'القضاء والتكنولوجيا القانونية',
    descEn: 'A full-scale judicial courtroom configured for modern cyber law, digital evidence hearings, and international commercial arbitration with integrated dual-language real-time transcription and video streaming.',
    descAr: 'قاعة محكمة نموذجية متكاملة مصممة لنظر قضايا الجرائم السيبرانية والأدلة الجنائية الرقمية والتحكيم التجاري الدولي، مع نظام ترجمة فورية وتسجيل مرئي عالي الدقة.',
    specsEn: [
      'Bench seating for 3-judge tribunals & jury box',
      'Digital evidence projection onto interactive 85-inch screens',
      'Simultaneous English/Arabic interpretation booths',
      'Live streaming for moot competition adjudicators in Malaysia'
    ],
    specsAr: [
      'منصة قضائية مجهزة لهيئات تحكيم ثلاثية وقسم المحلفين',
      'شاشات عرض تفاعلية 85 بوصة لعرض الأدلة الرقمية وتحليلها',
      'كبائن ترجمة فورية ثنائية اللغة (عربي - إنجليزي)',
      'نظام بث مباشر لمحكمين ومحامين دوليين من كوالالمبور'
    ],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'smart-grid-station',
    titleEn: 'Clean Energy & Smart Grid Dynamics Lab',
    titleAr: 'مختبر أبحاث الطاقة النظيفة والشبكات الذكية',
    categoryEn: 'Sustainable Infrastructure',
    categoryAr: 'الطاقة المستدامة',
    descEn: 'Focuses on solar microgrid telemetry, grid-tied lithium battery storage management, inverter efficiency, and real-time AI dispatch algorithms to address regional electrical stability challenges.',
    descAr: 'يركز على مراقبة الشبكات الشمسية المصغرة، إدارة منظومات تخزين البطاريات المتصلة بالشبكة، وتطوير خوارزميات ذكاء اصطناعي لإدارة واستقرار الأحمال الكهربائية.',
    specsEn: [
      'Campus rooftop 45kW testbed solar installation',
      'Real-time phasor measurement units (PMU)',
      'SCADA microgrid simulator with load shedding test rig',
      'Battery thermal management testing chamber'
    ],
    specsAr: [
      'محطة طاقة شمسية بحثية بقدرة 45 كيلوواط على سطح المبنى',
      'وحدات قياس متزامنة لحظية للشبكات الكهربائية (PMU)',
      'محاكي شبكات ذكية بنظام SCADA لاختبار فصل وموازنة الأحمال',
      'غرفة اختبار الإدارة الحرارية لمنظومات البطاريات'
    ],
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  }
];

export interface TourHotspot {
  id: string;
  nameEn: string;
  nameAr: string;
  floorEn: string;
  floorAr: string;
  descEn: string;
  descAr: string;
  bgImage: string;
  featuresEn: string[];
  featuresAr: string[];
}

export const virtualTourHotspots: TourHotspot[] = [
  {
    id: 'central-atrium',
    nameEn: 'Grand Academic Atrium & Innovation Concourse',
    nameAr: 'البهو الأكاديمي الرئيسي ومجمع الابتكار',
    floorEn: 'Ground Floor — Main Entrance',
    floorAr: 'الطابق الأرضي — المدخل الرئيسي',
    descEn: 'The central welcoming hub where Mesopotamian geometric motifs meet sleek Malaysian architectural lines. Houses student services, admissions advising, and an interactive digital directory.',
    descAr: 'نقطة اللقاء المركزية التي تلتقي فيها الزخارف الهندسية الرافدينية مع جماليات المعمار الماليزي الحديث. يضم خدمات الطلبة وقسم التسجيل وشاشات التوجيه الذكية.',
    bgImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1400&q=80',
    featuresEn: ['Biometric check-in turnstiles', 'Digital admissions touchscreens', 'Green indoor botanical courtyard'],
    featuresAr: ['بوابات دخول بيومترية ذكية', 'شاشات لمس تفاعلية للاستعلام والتقديم', 'حديقة داخلية مستدامة'],
  },
  {
    id: 'ai-amphitheater',
    nameEn: 'Turing-Al-Khwarizmi Smart Amphitheater',
    nameAr: 'مدرج الخوارزمي وتورينغ الذكي',
    floorEn: 'Level 2 — East Wing',
    floorAr: 'الطابق الثاني — الجناح الشرقي',
    descEn: 'Tiered 250-seat lecture theater with multi-camera lecture capture, immersive audio, and dual-language teleconferencing connected directly to Malaysian partner university auditoriums.',
    descAr: 'مدرج يتسع لـ 250 مقعداً مزوّد بكاميرات ذكية لتسجيل المحاضرات ونظام صوتي محيطي وربط مباشر عبر الأقمار الصناعية والألياف مع قاعات الجامعات الماليزية.',
    bgImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
    featuresEn: ['Ultra-HD panoramic dual projection', 'Wireless student response microphones', 'Acoustically tuned sound dampening'],
    featuresAr: ['شاشتا عرض بانوراميتان فائقات الدقة', 'ميكروفونات لاسلكية تفاعلية لكل مقعد', 'معالجة صوتية هندسية مانعة للصدى'],
  },
  {
    id: 'supercomputing-facility',
    nameEn: 'Deep Learning & Cloud Cluster Room',
    nameAr: 'قاعة الحوسبة السحابية والتعلّم العميق',
    floorEn: 'Level 3 — AI Faculty',
    floorAr: 'الطابق الثالث — كلية الذكاء الاصطناعي',
    descEn: 'State-of-the-art server environment where students deploy containerized machine learning models and test autonomous computer vision systems in real time.',
    descAr: 'بيئة خوادم فائقة التطور حيث يطلق الطلبة نماذج تعلّم الآلة واختبارات الرؤية الحاسوبية على خوادم محلية فائقة السرعة.',
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
    featuresEn: ['24/7 dedicated compute quotas for students', 'Redundant UPS power backup', 'Real-time telemetry dashboard'],
    featuresAr: ['حصص حوسبة مخصصة لكل طالب على مدار الساعة', 'منظومة طاقة طوارئ UPS ثلاثية المراحل', 'لوحة تحكم فورية بموارد الخوادم'],
  },
  {
    id: 'courtroom',
    nameEn: 'Hammurabi Cyber Moot Court',
    nameAr: 'محكمة حمورابي الصورية لقضايا الفضاء السيبراني',
    floorEn: 'Level 4 — Law Faculty',
    floorAr: 'الطابق الرابع — كلية القانون',
    descEn: 'Realistic simulation court designed for cyber defense trials, AI intellectual property disputes, and commercial arbitration contests.',
    descAr: 'قاعة محاكاة قضائية واقعية مخصصة لمرافعات الدفاع السيبراني، ونزاعات الملكية الفكرية للخوارزميات، ومسابقات التحكيم الدولية.',
    bgImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80',
    featuresEn: ['Judge dais with integrated monitor controls', 'Evidence witness terminal', 'Recording & archival studio'],
    featuresAr: ['منصة قضاة مع أزرار تحكم مدمجة', 'منصة شاهد وعرض أدلة رقمية', 'أستوديو توثيق وأرشفة مرئية للجلسات'],
  }
];
