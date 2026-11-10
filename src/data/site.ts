/**
 * Entire site copy lives here.
 * Everything is editable from one place — replace the sample values (statistics,
 * testimonials, contact details, media) with the club's real data.
 */

export type NavItem = { label: string; href: string };

export type Stat = {
  label: string;
  value?: number;
  decimals?: number;
  suffix?: string;
  staticValue?: string;
};

export type Program = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  meta: { label: string; value: string }[];
  image: string;
  icon: 'muscle' | 'flame' | 'barbell' | 'endurance' | 'spark';
};

export type Facility = { id: string; title: string; description: string; image: string };

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
};

export const site = {
  brand: {
    persian: 'ایران زمین',
    latin: 'IRAN ZAMIN',
    full: 'باشگاه بدنسازی ایران زمین',
    coach: 'محسن اصانلو',
  },

  nav: [
    { label: 'صفحه اصلی', href: '#home' },
    { label: 'برنامه‌های تمرینی', href: '#programs' },
    { label: 'عضویت', href: '#join' },
    { label: 'مربی', href: '#coach' },
    { label: 'امکانات باشگاه', href: '#facilities' },
    { label: 'داستان ما', href: '#story' },
    { label: 'تماس با ما', href: '#contact' },
  ] as NavItem[],

  hero: {
    eyebrow: 'بیشتر از یک باشگاه',
    titleLead: 'قدرتت',
    titleRest: 'رو بساز',
    titleGhost: 'نسخهٔ قوی‌تر خودت باش',
    lead: 'تمرین حرفه‌ای، مربیگری تخصصی، نتیجه واقعی.',
    points: ['تمرین نخبگان', 'مربیگری واقعی', 'نتیجه ماندگار'],
    primaryCta: { label: 'مشاهده برنامه‌های تمرینی', href: '#programs' },
    secondaryCta: { label: 'آشنایی با مربی', href: '#coach' },
    panels: [
      { title: 'تمرین شخصی', caption: 'برنامه اختصاصی با مربی', href: '#join' },
      { title: 'امکانات حرفه‌ای', caption: 'تجهیزات کامل باشگاهی', href: '#facilities' },
    ],
    videoLabel: 'تماشای داستان ما',
    videoDuration: '۰۱:۲۴',
    statsNote: 'اعداد نمونه — آمادهٔ جایگزینی با آمار واقعی باشگاه',
  },

  /**
   * Placeholder figures: replace with the club's real numbers before launch.
   * They are labelled as sample data in the interface so nothing is presented
   * as a verified fact.
   */
  stats: [
    { label: 'ورزشکار', value: 500, suffix: '+' },
    { label: 'امتیاز رضایت اعضا', value: 4.9, decimals: 1, suffix: ' از ۵' },
    { label: 'ساعات فعالیت باشگاه', staticValue: '۲۴/۷' },
    { label: 'تجربهٔ مربیگری', value: 12, suffix: ' سال' },
  ] as Stat[],

  coach: {
    label: 'مربی',
    title: 'با هدایت یک مربی حرفه‌ای، قوی‌تر شو',
    name: 'محسن اصانلو',
    latin: 'MOHSEN OSANLOO',
    role: 'مربی بدنسازی و آمادگی جسمانی',
    bio: 'مربیگری برای من یعنی شناخت بدن هر ورزشکار و ساختن برنامه‌ای که با زندگی او هماهنگ باشد. از جلسهٔ اول، مسیر تمرین بر اساس وضعیت بدنی، سابقهٔ ورزشی و هدف شما طراحی می‌شود و در طول مسیر بازبینی و اصلاح می‌شود.',
    principles: ['برنامه‌ریزی اختصاصی', 'اصلاح تکنیک', 'پیگیری مستمر'],
    cta: 'دربارهٔ مربی بیشتر بدانید',
    modal: {
      intro:
        'در ایران زمین، تمرین فقط تکرار حرکت نیست؛ قرار است بدن شما با برنامه، با کنترل و با ریکاوری درست پیش برود. هر جلسه با هدف مشخص شروع می‌شود و پیشرفت شما ثبت و بازبینی می‌شود.',
      approach: [
        'ارزیابی اولیه: وضعیت بدنی، سابقهٔ تمرین و محدودیت‌ها پیش از شروع برنامه بررسی می‌شود.',
        'برنامهٔ اختصاصی: حجم، شدت و تعداد جلسات بر اساس هدف و زمان در دسترس شما تنظیم می‌شود.',
        'اصلاح تکنیک: اجرای صحیح حرکات، پایهٔ پیشرفت بدون آسیب است و در هر جلسه بازبینی می‌شود.',
        'پیگیری و بازبینی: برنامه در فواصل منظم بر اساس پیشرفت واقعی شما به‌روزرسانی می‌شود.',
      ],
      note: 'سوابق، مدارک و گواهی‌نامه‌های رسمی مربی پس از تأیید، در همین بخش درج می‌شود.',
    },
  },

  programs: [
    {
      id: 'muscle',
      index: '۰۱',
      title: 'بدنسازی و عضله‌سازی',
      tagline: 'هایپرتروفی کنترل‌شده',
      description: 'برنامهٔ حجم و ترکیب بدنی با تمرکز بر هایپرتروفی، کیفیت حرکت و ریکاوری هدفمند.',
      highlights: [
        'تقسیم‌بندی تمرین بر اساس سطح و سابقه',
        'پیشرفت تدریجی بار و حجم تمرین',
        'تغذیهٔ هماهنگ با دورهٔ عضله‌سازی',
      ],
      meta: [
        { label: 'جلسات', value: '۳ تا ۵ در هفته' },
        { label: 'سطح', value: 'مقدماتی تا پیشرفته' },
      ],
      image: '/images/program-muscle.webp',
      icon: 'muscle',
    },
    {
      id: 'fatloss',
      index: '۰۲',
      title: 'چربی‌سوزی و تناسب اندام',
      tagline: 'ترکیب مقاومتی و هوازی',
      description: 'ترکیب تمرین مقاومتی و هوازی با کالری و ریکاوری هدفمند برای کاهش چربی پایدار.',
      highlights: [
        'تمرین تناوبی با شدت کنترل‌شده',
        'حفظ عضله در دورهٔ کاهش وزن',
        'پایش هفتگی شاخص‌های پیشرفت',
      ],
      meta: [
        { label: 'جلسات', value: '۳ تا ۴ در هفته' },
        { label: 'سطح', value: 'همهٔ سطوح' },
      ],
      image: '/images/program-fatloss.webp',
      icon: 'flame',
    },
    {
      id: 'strength',
      index: '۰۳',
      title: 'تمرین قدرتی',
      tagline: 'پایه‌های قدرت واقعی',
      description: 'دورهٔ قدرت پایه شامل اسکات، ددلیفت و پرس با پروگرسیون هفتگی و اصلاح تکنیک.',
      highlights: [
        'پروگرسیون هفتگی بار',
        'اصلاح تکنیک حرکات پایه',
        'مدیریت ریسک آسیب',
      ],
      meta: [
        { label: 'جلسات', value: '۳ در هفته' },
        { label: 'سطح', value: 'متوسط تا پیشرفته' },
      ],
      image: '/images/program-strength.webp',
      icon: 'barbell',
    },
    {
      id: 'endurance',
      index: '۰۴',
      title: 'تمرینات استقامتی',
      tagline: 'ظرفیت قلبی–عروقی',
      description: 'افزایش ظرفیت قلبی–عروقی و استقامت عضلانی با تمرین‌های تناوبی و پیوسته.',
      highlights: [
        'تمرین تناوبی و پیوسته',
        'بهبود آمادگی هوازی',
        'برنامهٔ مکمل برای ورزش‌های دیگر',
      ],
      meta: [
        { label: 'جلسات', value: '۲ تا ۵ در هفته' },
        { label: 'سطح', value: 'همهٔ سطوح' },
      ],
      image: '/images/program-endurance.webp',
      icon: 'endurance',
    },
    {
      id: 'custom',
      index: '۰۵',
      title: 'برنامهٔ تمرینی اختصاصی',
      tagline: 'کاملاً شخصی‌سازی‌شده',
      description: 'برنامهٔ کاملاً اختصاصی بر پایهٔ ارزیابی اولیه، هدف و زمان در دسترس شما.',
      highlights: [
        'ارزیابی اولیهٔ اختصاصی',
        'زمان‌بندی متناسب با زندگی روزمره',
        'بازبینی منظم برنامه',
      ],
      meta: [
        { label: 'جلسات', value: 'توافقی' },
        { label: 'سطح', value: 'اختصاصی' },
      ],
      image: '/images/program-custom.webp',
      icon: 'spark',
    },
  ] as Program[],

  facilities: [
    {
      id: 'equipment',
      title: 'تجهیزات بدنسازی',
      description: 'دستگاه‌های حرفه‌ای برای تمرین تمام گروه‌های عضلانی.',
      image: '/images/facility-equipment.webp',
    },
    {
      id: 'floor',
      title: 'فضای تمرین حرفه‌ای',
      description: 'سالن وسیع با نورپردازی سینمایی و کف مناسب تمرین.',
      image: '/images/facility-floor.webp',
    },
    {
      id: 'freeweights',
      title: 'دمبل و وزنه‌های آزاد',
      description: 'ست کامل دمبل، هالتر و صفحه‌های وزنه در محدودهٔ گسترده.',
      image: '/images/facility-weights.webp',
    },
    {
      id: 'cardio',
      title: 'دستگاه‌های هوازی',
      description: 'تردمیل، دوچرخه و دستگاه قایقرانی برای تمرین هوازی.',
      image: '/images/facility-strength.webp',
    },
    {
      id: 'strength',
      title: 'فضای تمرین قدرتی',
      description: 'محدودهٔ مجزا برای حرکات پایه و تمرین‌های قدرتی.',
      image: '/images/facility-machines.webp',
    },
    {
      id: 'ropes',
      title: 'منطقهٔ تمرین عملکردی',
      description: 'فضای طناب بتل‌روپ و تمرین‌های عملکردی.',
      image: '/images/facility-ropes.webp',
    },
  ] as Facility[],

  video: {
    label: 'ویدیو',
    title: 'داستان قدرت در ایران زمین',
    subtitle: 'نگاهی به فضای باشگاه و مسیر تمرین اعضای ایران زمین.',
    duration: '۰۱:۲۴',
    poster: '/images/facility-floor.webp',
    /**
     * Put the real club film here (for example '/video/iran-zamin.mp4').
     * While it is empty, an editable sample reel of the club photos plays in
     * the modal and is labelled as a preview.
     */
    src: '',
    reel: [
      '/images/facility-floor.webp',
      '/images/hero-rope.webp',
      '/images/program-strength.webp',
      '/images/facility-weights.webp',
    ],
  },

  /** Sample testimonials — flagged as test content in the interface. */
  testimonials: [
    {
      id: 't1',
      name: 'سارا محمدی',
      role: 'عضو باشگاه',
      quote:
        'متنی که اینجا می‌بینید نمونه است. پس از دریافت نظرات واقعی اعضا، همین کارت‌ها با نظر و نام آن‌ها تکمیل می‌شود.',
      rating: 5,
      avatar: '/images/avatar-3.webp',
    },
    {
      id: 't2',
      name: 'امیر کاظمی',
      role: 'عضو باشگاه',
      quote:
        'متنی که اینجا می‌بینید نمونه است. پس از دریافت نظرات واقعی اعضا، همین کارت‌ها با نظر و نام آن‌ها تکمیل می‌شود.',
      rating: 5,
      avatar: '/images/avatar-1.webp',
    },
    {
      id: 't3',
      name: 'نگار توکلی',
      role: 'عضو باشگاه',
      quote:
        'متنی که اینجا می‌بینید نمونه است. پس از دریافت نظرات واقعی اعضا، همین کارت‌ها با نظر و نام آن‌ها تکمیل می‌شود.',
      rating: 5,
      avatar: '/images/avatar-2.webp',
    },
  ] as Testimonial[],

  join: {
    label: 'عضویت',
    title: 'شروع تغییر از همین امروز',
    lead: 'درخواست مشاورهٔ رایگان بفرستید؛ برای انتخاب برنامهٔ مناسب و تعیین جلسهٔ ارزیابی با شما تماس می‌گیریم.',
    steps: [
      { title: 'مشاورهٔ اولیه', text: 'گفت‌وگو دربارهٔ هدف، سابقه و زمان در دسترس شما.' },
      { title: 'ارزیابی و انتخاب برنامه', text: 'انتخاب برنامهٔ تمرینی متناسب با وضعیت و هدف شما.' },
      { title: 'شروع تمرین', text: 'آغاز تمرین با پیگیری مربی و بازبینی منظم برنامه.' },
    ],
    goals: [
      'عضله‌سازی و افزایش حجم',
      'کاهش وزن و چربی‌سوزی',
      'افزایش قدرت',
      'آمادگی جسمانی عمومی',
      'هنوز مطمئن نیستم — مشاوره می‌خواهم',
    ],
    formNote: 'اطلاعات شما فقط برای تماس و هماهنگی مشاوره استفاده می‌شود و در اختیار شخص دیگری قرار نمی‌گیرد.',
  },

  contact: {
    label: 'تماس',
    /**
     * Replace with the club's confirmed details. Values are intentionally
     * neutral until the administration confirms them.
     */
    phone: '۰۲۱ ۰۰۰۰ ۰۰۰۰',
    phoneHref: 'tel:+98210000000',
    email: 'info@iranzamin.fit',
    address: 'تهران — نشانی دقیق باشگاه پس از تأیید مدیریت درج می‌شود',
    hours: 'شنبه تا پنجشنبه، ۷:۰۰ تا ۲۳:۰۰',
    socials: [
      { label: 'اینستاگرام', href: '#', icon: 'instagram' as const },
      { label: 'تلگرام', href: '#', icon: 'telegram' as const },
      { label: 'واتساپ', href: '#', icon: 'whatsapp' as const },
    ],
    note: 'شمارهٔ تماس، نشانی و شبکه‌های اجتماعی پس از تأیید باشگاه تکمیل می‌شود.',
  },

  footer: {
    tagline: 'باشگاه بدنسازی ایران زمین — تمرین حرفه‌ای، مربیگری تخصصی، نتیجهٔ واقعی.',
    quickLinks: [
      { label: 'برنامه‌های تمرینی', href: '#programs' },
      { label: 'امکانات باشگاه', href: '#facilities' },
      { label: 'مربی', href: '#coach' },
      { label: 'عضویت', href: '#join' },
    ],
    copyright: '© ۱۴۰۴ باشگاه بدنسازی ایران زمین — تمام حقوق محفوظ است.',
  },
};

/** Converts latin digits to Persian digits for display. */
export function toFa(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}
