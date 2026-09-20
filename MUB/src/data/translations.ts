import generalInfo from './scraped/general_info.json';
import admissionsJson from './scraped/admissions.json';
import partnershipsJson from './scraped/partnerships.json';

export type Language = 'en' | 'ar';

export interface TranslationDictionary {
  topBar: {
    announcement: string;
    contactPhone: string;
    campusLocation: string;
    portalLogin: string;
    quickApply: string;
    langSwitch: string;
  };
  nav: {
    programs: string;
    admissions: string;
    bilateralHeritage: string;
    research: string;
    campus: string;
    applyNow: string;
    prospectus: string;
  };
  hero: {
    badge: string;
    titlePrimary: string;
    titleAccent: string;
    subtitle: string;
    ctaApply: string;
    ctaExplore: string;
    ctaTour: string;
    partnersBadge: string;
    intakeNotice: string;
  };
  metrics: {
    stat1Number: string;
    stat1Label: string;
    stat1Desc: string;
    stat2Number: string;
    stat2Label: string;
    stat2Desc: string;
    stat3Number: string;
    stat3Label: string;
    stat3Desc: string;
    stat4Number: string;
    stat4Label: string;
    stat4Desc: string;
  };
  programs: {
    tagline: string;
    title: string;
    subtitle: string;
    allColleges: string;
    collegeAI: string;
    collegeEngineering: string;
    collegeLaw: string;
    filterAllLevels: string;
    filterUndergraduate: string;
    filterDualDegree: string;
    viewCurriculum: string;
    duration: string;
    credits: string;
    language: string;
    degreeAwarded: string;
    careerOutcomes: string;
    keyLabs: string;
    applyForProgram: string;
    malaysiaPathway: string;
  };
  admissions: {
    tagline: string;
    title: string;
    subtitle: string;
    calculatorTitle: string;
    calculatorSubtitle: string;
    trackSelect: string;
    trackScientific: string;
    trackLiterary: string;
    gpaLabel: string;
    scholarshipEligible: string;
    tuitionEstimate: string;
    calcCta: string;
    docsChecklistTitle: string;
    ageNotice: string;
    englishRequirementsTitle: string;
  };
  bilateral: {
    tagline: string;
    title: string;
    subtitle: string;
    heritageHeading: string;
    heritageText: string;
  };
  campus: {
    tagline: string;
    title: string;
    subtitle: string;
    exploreTour: string;
  };
  research: {
    tagline: string;
    title: string;
    subtitle: string;
    symposiumTitle: string;
    symposiumDate: string;
    symposiumDesc: string;
  };
  portal: {
    title: string;
    subtitle: string;
    studentTab: string;
    facultyTab: string;
    applicantTab: string;
    idPlaceholder: string;
    passwordPlaceholder: string;
    loginBtn: string;
    forgotPassword: string;
  };
  applyModal: {
    title: string;
    stepIndicator: string;
    step1: string;
    step2: string;
    step3: string;
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
    preferredCollege: string;
    highSchoolScore: string;
    next: string;
    back: string;
    submit: string;
    successTitle: string;
    successMessage: string;
  };
  footer: {
    tagline: string;
    accreditationNotice: string;
    collegesHeading: string;
    quickLinksHeading: string;
    contactHeading: string;
    legalHeading: string;
    rights: string;
    address: string;
    phone: string;
    email: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    topBar: {
      announcement: "🎓 Admissions Open for Academic Year 2026/2027 • Licensed by MoHESR Iraq • Aligned with Malaysian MQA Standards",
      contactPhone: generalInfo.contact.phone,
      campusLocation: "Palestine St, 14th of July District, Baghdad",
      portalLogin: "University Portal",
      quickApply: "Apply Now",
      langSwitch: "العربية",
    },
    nav: {
      programs: "Academic Programs",
      admissions: "Admissions & Criteria",
      bilateralHeritage: "Malaysian Partnership",
      research: "Labs & Research",
      campus: "Palestine St. Campus",
      applyNow: "Apply for 2026/27",
      prospectus: "Download Prospectus",
    },
    hero: {
      badge: "Official Iraq-Malaysia Higher Education Institution",
      titlePrimary: "Malaysian University of Baghdad",
      titleAccent: "World-Class Academic Rigor in AI, Engineering & Law",
      subtitle: generalInfo.description.en,
      ctaApply: "Apply for 2026/2027 Admission",
      ctaExplore: "Explore Academic Programs",
      ctaTour: "Campus Facilities Tour",
      partnersBadge: "In Partnership with Universiti Teknologi PETRONAS (UTP) & UMPSA",
      intakeNotice: "Admissions Office on Palestine Street is open Saturday – Thursday, 8:30 AM – 4:30 PM",
    },
    metrics: {
      stat1Number: "100%",
      stat1Label: "MoHESR & MQA Aligned",
      stat1Desc: "Fully accredited by Iraq Ministry of Higher Education & Malaysian Qualifications Agency",
      stat2Number: "English",
      stat2Label: "Medium of Instruction",
      stat2Desc: "Global curriculum standards for AI and Engineering specializations",
      stat3Number: "12+",
      stat3Label: "Dedicated Laboratories",
      stat3Desc: "Advanced GPU computing, robotics hangars, smart grid benches & digital moot court",
      stat4Number: "Top Tier",
      stat4Label: "Strategic Twinning",
      stat4Desc: "MoUs with premier Malaysian universities for academic and student mobility",
    },
    programs: {
      tagline: "Accredited Faculties & Departments",
      title: "Undergraduate & Twinning Degree Programs",
      subtitle: "Each degree program is benchmarked to international accreditation standards, combining deep foundational principles with direct experiential laboratory immersion.",
      allColleges: "All Faculties",
      collegeAI: "College of AI Engineering",
      collegeEngineering: "College of Engineering",
      collegeLaw: "College of Law",
      filterAllLevels: "All Degree Levels",
      filterUndergraduate: "Undergraduate (B.Sc. / LL.B)",
      filterDualDegree: "Twinning & Dual Degree",
      viewCurriculum: "View Curriculum Details",
      duration: "Duration",
      credits: "Credit Hours",
      language: "Language of Study",
      degreeAwarded: "Degree Conferred",
      careerOutcomes: "Career Pathways",
      keyLabs: "Dedicated Teaching & Research Laboratories",
      applyForProgram: "Apply for this Program",
      malaysiaPathway: "Malaysian Partner Articulation",
    },
    admissions: {
      tagline: "Admissions & Entry Standards",
      title: "Admissions Guidelines for 2026/2027",
      subtitle: "Admissions are governed by official regulations of the Iraqi Ministry of Higher Education and Scientific Research (MoHESR) and MUB institutional standards.",
      calculatorTitle: "Interactive Baccalaureate & Merit Aid Estimator",
      calculatorSubtitle: "Calculate your estimated scholarship eligibility based on your certified secondary school examination score.",
      trackSelect: "Select Secondary Education Branch",
      trackScientific: "Scientific / Applied / Biological (العلمي / التطبيقي / الأحيائي)",
      trackLiterary: "Literary / Humanities (الأدبي)",
      gpaLabel: "Baccalaureate Score / Secondary School Percentage",
      scholarshipEligible: "Merit Scholarship Assessment",
      tuitionEstimate: "Estimated Annual Tuition After Merit Deduction",
      calcCta: "Lock In Merit Aid — Start Application",
      docsChecklistTitle: "Mandatory Registration Documentation",
      ageNotice: admissionsJson.generalConditions.ageRequirementEn,
      englishRequirementsTitle: "English Language Proficiency Guidelines",
    },
    bilateral: {
      tagline: "Bilateral Higher Education Alliance",
      title: "The Malaysian Advantage in Central Baghdad",
      subtitle: "MUB combines the academic prestige and quality frameworks of premier Malaysian universities with deep roots in Baghdad's historic intellectual center.",
      heritageHeading: "Strategic Twinning with Leading Malaysian Universities",
      heritageText: "Through established partnerships with Universiti Teknologi PETRONAS (UTP) and Universiti Malaysia Pahang Al-Sultan Abdullah (UMPSA), MUB provides students with credit mobility, joint curriculum oversight, and internationally recognized credentials.",
    },
    campus: {
      tagline: "Palestine Street Campus Facilities",
      title: "Modern Infrastructure Engineered for Academic Rigor",
      subtitle: "Located on Palestine Street, Baghdad, featuring modern computing facilities, robotics bays, smart amphitheatres, and a dedicated judicial courtroom.",
      exploreTour: "Explore Campus Facilities",
    },
    research: {
      tagline: "Research & Institutional News",
      title: "Academic Collaboration & Scientific Endeavors",
      subtitle: "Official announcements, bilateral delegations, and institutional partnerships advancing Iraq's higher education landscape.",
      symposiumTitle: "Annual Baghdad-Malaysia Academic & Tech Forum",
      symposiumDate: "Academic Year 2026/2027 | MUB Campus Amphitheatre",
      symposiumDesc: "Convening international academic experts and industry delegates to discuss AI governance, renewable power systems, and digital law.",
    },
    portal: {
      title: "Unified University Portal Access",
      subtitle: "Secure institutional gateway for students, faculty, and new applicants",
      studentTab: "Student SIS",
      facultyTab: "Faculty LMS",
      applicantTab: "Applicant Portal",
      idPlaceholder: "Academic ID / Applicant File Number",
      passwordPlaceholder: "Portal Access Password",
      loginBtn: "Sign In to Portal",
      forgotPassword: "Need assistance with your portal credentials?",
    },
    applyModal: {
      title: "Official Undergraduate Admission Form — 2026/2027",
      stepIndicator: "Step",
      step1: "Personal Information",
      step2: "Academic Preference",
      step3: "Document Checklist & Submit",
      fullName: "Full Legal Name (as printed on National ID)",
      email: "Email Address",
      phone: "Mobile Phone (+964)",
      nationality: "Nationality",
      preferredCollege: "Selected College & Program",
      highSchoolScore: "Baccalaureate Score (%)",
      next: "Continue",
      back: "Back",
      submit: "Submit Admission Request",
      successTitle: "Admission Application Received",
      successMessage: "Your reference number is MUB-2026-8942. The Admissions Directorate on Palestine Street will verify your records within 48 hours.",
    },
    footer: {
      tagline: generalInfo.description.en,
      accreditationNotice: "Accredited and officially licensed by the Iraqi Ministry of Higher Education and Scientific Research (MoHESR), benchmarked to Malaysian Qualifications Agency (MQA) quality frameworks.",
      collegesHeading: "Colleges & Faculties",
      quickLinksHeading: "Quick Navigation",
      contactHeading: "Campus & Contact Information",
      legalHeading: "Institutional Policies",
      rights: "All rights reserved. Malaysian University of Baghdad (MUB).",
      address: generalInfo.address.street + ", " + generalInfo.address.city + ", " + generalInfo.address.country,
      phone: generalInfo.contact.phone,
      email: generalInfo.contact.email,
    },
  },
  ar: {
    topBar: {
      announcement: "🎓 فتح باب التقديم للعام الدراسي 2026/2027 • مرخصة من وزارة التعليم العالي والبحث العلمي • معتمدة وفق معايير MQA الماليزية",
      contactPhone: generalInfo.contact.phone,
      campusLocation: "شارع فلسطين، محلة 14 تموز، بغداد",
      portalLogin: "بوابة الجامعة",
      quickApply: "قدّم الآن",
      langSwitch: "English",
    },
    nav: {
      programs: "البرامج الأكاديمية",
      admissions: "شروط القبول والتسجيل",
      bilateralHeritage: "الشراكة الماليزية",
      research: "المختبرات والبحوث",
      campus: "حرم شارع فلسطين",
      applyNow: "التقديم للعام 2026/27",
      prospectus: "دليل الجامعة الرسمي",
    },
    hero: {
      badge: "مؤسسة جامعية دولية رائدة — شراكة عراقية ماليزية",
      titlePrimary: "الجامعة الماليزية في بغداد",
      titleAccent: "تعليم جامعي عالمي في الذكاء الاصطناعي والهندسة والقانون",
      subtitle: generalInfo.description.ar,
      ctaApply: "التقديم للعام الدراسي 2026/2027",
      ctaExplore: "استكشف البرامج والكليات",
      ctaTour: "مرافق الحرم الجامعي",
      partnersBadge: "بالشراكة مع جامعة التكنولوجيا بتروناس (UTP) وجامعة ماليزيا باهانج (UMPSA)",
      intakeNotice: "يستقبل قسم القبول والتسجيل المراجعين في مقر الجامعة بشارع فلسطين من السبت إلى الخميس (8:30 ص – 4:30 م)",
    },
    metrics: {
      stat1Number: "100%",
      stat1Label: "معتمدة ومرخصة رسمياً",
      stat1Desc: "مرخصة من وزارة التعليم العالي والبحث العلمي العراقية ومطابقة لمعايير MQA",
      stat2Number: "الإنجليزية",
      stat2Label: "لغة التدريس الأكاديمية",
      stat2Desc: "تدريس باللغة الإنجليزية في تخصصات الذكاء الاصطناعي والهندسة لمواكبة سوق العمل",
      stat3Number: "+12",
      stat3Label: "مختبراً تخصصياً",
      stat3Desc: "عناقيد حوسبة رسومية، حظائر روبوتات، محطات طاقة متجددة، ومحكمة صورية رقمية",
      stat4Number: "رائدة",
      stat4Label: "شراكات وتوأمة استراتيجية",
      stat4Desc: "مذكرات تفاهم مع كبرى الجامعات الماليزية للتبادل الأكاديمي والطلابي",
    },
    programs: {
      tagline: "كليات وتخصصات معتمدة",
      title: "برامج البكالوريوس والتوأمة الأكاديمية",
      subtitle: "صُممت البرامج الأكاديمية وفق أعلى معايير الجودة الدولية، لتجمع بين الرصانة النظرية والتدريب المخبري التطبيقي المباشر.",
      allColleges: "كافة الكليات",
      collegeAI: "كلية هندسة الذكاء الاصطناعي",
      collegeEngineering: "كلية الهندسة",
      collegeLaw: "كلية القانون",
      filterAllLevels: "كافة المسارات",
      filterUndergraduate: "البكالوريوس (B.Sc. / LL.B)",
      filterDualDegree: "مسارات التوأمة والتبادل",
      viewCurriculum: "تفاصيل الخطة الدراسية",
      duration: "مدة الدراسة",
      credits: "الساعات المعتمدة",
      language: "لغة التدريس",
      degreeAwarded: "الدرجة العلمية الممنوحة",
      careerOutcomes: "المستقبل الوظيفي",
      keyLabs: "المختبرات التخصصية التابعة للبرنامج",
      applyForProgram: "التقديم لهذا البرنامج",
      malaysiaPathway: "المعادلة والتبادل مع الجامعات الماليزية",
    },
    admissions: {
      tagline: "الضوابط وشروط القبول",
      title: "دليل القبول للعام الدراسي 2026/2027",
      subtitle: "تخضع شروط القبول لضوابط وتعليمات وزارة التعليم العالي والبحث العلمي العراقية ولائحة القبول المعتمدة في الجامعة.",
      calculatorTitle: "حاسبة المعدل ومنح التفوق التقديرية",
      calculatorSubtitle: "احسب نسبة منحة التفوق التقديرية وفقاً لمعدل شهادة الدراسة الإعدادية (البكالوريا).",
      trackSelect: "اختر الفرع الدراسي للإعدادية",
      trackScientific: "العلمي / التطبيقي / الأحيائي",
      trackLiterary: "الأدبي / الإنساني",
      gpaLabel: "معدل البكالوريا / النسبة المئوية",
      scholarshipEligible: "تقدير منحة التفوق الأكاديمي",
      tuitionEstimate: "القسط السنوي التقديري بعد المنحة",
      calcCta: "تثبيت المنحة — بدء التقديم",
      docsChecklistTitle: "المستمسكات والوثائق الرسمية المطلوبة",
      ageNotice: admissionsJson.generalConditions.ageRequirementAr,
      englishRequirementsTitle: "ضوابط الكفاءة في اللغة الإنجليزية",
    },
    bilateral: {
      tagline: "ميزة التعليم الماليزي الرصين",
      title: "الشراكة الأكاديمية العراقية الماليزية في بغداد",
      subtitle: "تجمع الجامعة بين رصانة التجربة الأكاديمية الماليزية وعراقة العاصمة بغداد لتوفير بيئة جامعية استثنائية.",
      heritageHeading: "توأمة استراتيجية مع كبرى الجامعات التقنية في ماليزيا",
      heritageText: "من خلال مذكرات التفاهم والشراكات مع جامعة التكنولوجيا بتروناس (UTP) وجامعة ماليزيا باهانج (UMPSA)، تتيح الجامعة للطلبة فرص التبادل الأكاديمي، والمطابقة الدورية للمناهج، ونيل شهادات معترف بها دولياً.",
    },
    campus: {
      tagline: "مقر الجامعة بشارع فلسطين",
      title: "بنية تحتية جامعية مصممة للتفوق الأكاديمي",
      subtitle: "يقع الحرم في شارع فلسطين ببغداد ويضم أحدث القاعات الذكية، ومختبرات الحوسبة المتقدمة، وحظائر الروبوتات، والمحكمة الصورية الرقمية.",
      exploreTour: "استكشف مرافق الحرم",
    },
    research: {
      tagline: "أخبار وأنشطة الجامعة",
      title: "التعاون الأكاديمي والأنشطة العلمية",
      subtitle: "متابعة مستمرة للشراكات الدولية، والمؤتمرات العلمية، والوفود الأكاديمية في رحاب الجامعة.",
      symposiumTitle: "ملتقى بغداد - ماليزيا السنوي للتعليم والتكنولوجيا",
      symposiumDate: "العام الدراسي 2026/2027 | القاعة الكبرى بحرم الجامعة",
      symposiumDesc: "يجمع الخبراء الأكاديميين وصناع القرار لبحث تطبيقات الذكاء الاصطناعي وهندسة الطاقة المستدامة والقوانين الرقمية.",
    },
    portal: {
      title: "بوابة الجامعة الإلكترونية الموحدة",
      subtitle: "النظام الجامعي لتسجيل الدخول للطلبة والأساتذة والمتقدمين الجدد",
      studentTab: "بوابة الطالب (SIS)",
      facultyTab: "بوابة التدريسيين",
      applicantTab: "بوابة المتقدمين",
      idPlaceholder: "الرقم الجامعي / رقم ملف التقديم",
      passwordPlaceholder: "كلمة مرور الحساب",
      loginBtn: "تسجيل الدخول",
      forgotPassword: "هل تواجه مشكلة في تسجيل الدخول؟",
    },
    applyModal: {
      title: "استمارة القبول الرسمية — العام الدراسي 2026/2027",
      stepIndicator: "المرحلة",
      step1: "البيانات الشخصية",
      step2: "الرغبة والكلية",
      step3: "الوثائق والتقديم",
      fullName: "الاسم الرباعي واللقب (كما في البطاقة الوطنية)",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف المحمول (07xxxxxxxxx)",
      nationality: "الجنسية",
      preferredCollege: "الكلية والتخصص المطلوب",
      highSchoolScore: "معدل البكالوريا (%)",
      next: "التالي",
      back: "السابق",
      submit: "إرسال طلب القبول",
      successTitle: "تم استلام استمارة التقديم بنجاح",
      successMessage: "رقم ملفك الأكاديمي هو MUB-2026-8942. سيقوم قسم القبول والتسجيل بتدقيق بياناتك والتواصل معك خلال 48 ساعة.",
    },
    footer: {
      tagline: generalInfo.description.ar,
      accreditationNotice: "معترف بها ومرخصة رسمياً من وزارة التعليم العالي والبحث العلمي العراقية، ومطابقة لمعايير أطر الجودة لدى وكالة المؤهلات الماليزية (MQA).",
      collegesHeading: "الكليات والأقسام الأكاديمية",
      quickLinksHeading: "روابط الوصول السريع",
      contactHeading: "معلومات الحرم والتواصل",
      legalHeading: "اللوائح والسياسات الجامعية",
      rights: "جميع الحقوق محفوظة. الجامعة الماليزية في بغداد.",
      address: generalInfo.address.streetAr + "، " + generalInfo.address.cityAr + "، " + generalInfo.address.countryAr,
      phone: generalInfo.contact.phone,
      email: generalInfo.contact.email,
    },
  },
};
