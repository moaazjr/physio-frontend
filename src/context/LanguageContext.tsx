import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    contact: 'اتصل بنا',
    bookSession: 'احجز جلسة',
    timeslotBooked: 'هذا الموعد محجوز بالفعل. يرجى اختيار وقت آخر.',
    timeslotJustBooked: 'تم حجز هذا الموعد للتو من قبل مريض آخر. يرجى اختيار وقت مختلف.',
    
    // Hero Section
    heroTitle: 'استعد صحتك',
    heroTitleSuffix: ' بسهولة',
    clinic: 'عيادة متخصصة',
    heroSubtitle: 'استعد حياتك',
    heroDescription: 'خدمات العلاج الطبيعي المتخصصة المصممة لمساعدتك على الحركة بشكل أفضل، والشعور بقوة أكبر، والعيش بدون ألم. رحلتك نحو الصحة المثلى تبدأ هنا.',
    bookYourSession: 'احجز جلستك',
    viewServices: 'عرض الخدمات',
    patientCount: '+500',
    happyPatients: 'مرضى سعداء',
    successRateValue: '%98',
    successRate: 'نسبة النجاح',
    rating: 'تقييم 5.0',
    licensedClinic: 'عيادة مرخصة',
    startJourneyToday: 'ابدأ رحلتك اليوم',
    readyToTransform: 'مستعد لبدء رحلة التعافي؟',
    dontLetPain: 'لا تدع الألم يعيقك. احجز استشارتك اليوم واتخذ الخطوة الأولى نحو حياة أكثر صحة وخالية من الألم.',
    bookConsultation: 'احجز استشارتك',
    freeConsultation: 'استشارة',
    noCommitment: 'بدون التزام',
    
    // Services
    servicesTitle: 'خدماتنا',
    servicesSubtitle: 'خدمات العلاج الطبيعي الشاملة المصممة خصيصاً لاحتياجاتك وأهداف التعافي الخاصة بك',
    
    // Service Names
    cupping: 'حجامة',
    cuppingDesc: 'تنشيط الدورة الدموية، تقوية المناعة، تخفيف الصداع وآلام الجسم، تحسين مستوى السكر والضغط',
    
    acupuncture: 'إبر صينية',
    acupunctureDesc: 'تخفيف الآلام، الرقبة، الركبة، والمفاصل، علاج الصداع والشقيقة، فعالة في تقليل تكرار وحدة نوبات الصداع، تقليل التوتر والقلق',
    
    spinalInjury: 'إصابة العمود الفقري',
    spinalInjuryDesc: 'إنزلاق غضروفي، تمثيل فقرات، آلام أسفل الظهر',
    
    sportsInjury: 'إصابات ملاعب',
    sportsInjuryDesc: 'إصابة في الرباط الصليبي، الكواحل، إصابة في مفصل الكتف',
    
    obesityTreatment: 'علاج السمنة والنحافة',
    obesityTreatmentDesc: 'برامج متخصصة لإدارة الوزن وتحسين اللياقة البدنية',
    
    // About
    aboutTitle: 'عن الدكتور سهيل محمد',
    aboutSubtitle: 'مكرس لمساعدة المرضى على تحقيق أعلى مستوى من الوظائف والعودة إلى الأنشطة التي يحبونها',
    bookAppointment: 'احجز موعد',
    whyDifferent: 'لماذا نحن مختلفون',
    whyChooseUs: 'لماذا تختار فيزيوجولد؟',
    whyChooseUsDesc: 'نجمع بين الخبرة والتكنولوجيا والرعاية الشخصية لتقديم نتائج استثنائية',
    personalizedCare: 'رعاية شخصية',
    personalizedCareDesc: 'كل خطة علاج مصممة خصيصاً لاحتياجاتك وأهدافك المحددة للحصول على أفضل تعافي.',
    expertTreatment: 'علاج متخصص',
    expertTreatmentDesc: 'متخصصون مرخصون مع سنوات من الخبرة في تقنيات العلاج الطبيعي المتقدمة.',
    provenResults: 'نتائج مثبتة',
    provenResultsDesc: 'سجل حافل من العلاجات الناجحة والمرضى الراضين الذين حققوا أهدافهم الصحية.',
    doctorName: 'الدكتور سهيل محمد',
    doctorSpecialty: 'أخصائي العلاج الطبيعي',
    doctorDescription: 'دكتور سهيل محمد حياته المهنية لمساعدة المرضى على التغلب على الألم واستعادة الوظائف وتحقيق أهدافهم الصحية الشخصية. يتخصص في العلاج الطبيعي العظمي والرياضي، مع تدريب متقدم في العلاج اليدوي وتحليل الحركة.',
    doctorApproach: 'يؤمن الدكتور سهيل محمد بنهج يركز على المريض، حيث يجمع بين العلاجات القائمة على الأدلة والرعاية الرحيمة. يعمل بشكل وثيق مع كل مريض لوضع خطط علاج شخصية تعالج ليس فقط الأعراض، بل الأسباب الجذرية للخلل الوظيفي.',
    educationAndCertifications: 'التعليم والشهادات',
    educationAndCertificationsDesc: 'ملتزم بالتعلم المستمر ومواكبة أحدث تقنيات العلاج',
    certification1: 'بكالريوس في العلاج الطبيعي - جامعة MTI',
    certification2: 'شهادة الوخز الجاف',
    certification3: 'إقامة العلاج الطبيعي الرياضي',
    certification4: 'شهادة العلاج اليدوي',
    certification5: 'شهادة فحص الحركة الوظيفية',
    certification6: 'شهادة حجامة علاجية',
    treatmentPhilosophy: 'فلسفة العلاج',
    treatmentQuote: 'كل مريض فريد من نوعه، وعلاجه يجب أن يكون كذلك أيضًا. أؤمن بتمكين مرضاي بالمعرفة والأدوات التي يحتاجونها ليس فقط للتعافي، بل لمنع الإصابات المستقبلية والحفاظ على الصحة المثلى مدى الحياة.',
    doctorCredentials: 'الدكتور سهيل محمد، بكالريوس في العلاج الطبيعي',
    
    // Contact
    contactTitle: 'تواصل معنا',
    contactSubtitle: 'مستعد لبدء رحلتك نحو صحة أفضل؟ نحن هنا للمساعدة والإجابة على أي أسئلة قد تكون لديك.',
    
    // Booking
    bookingTitle: 'احجز موعدك',
    bookingSubtitle: 'جرب خدمات العلاج الطبيعي المتميزة مع رعايتنا ذات المعايير الذهبية',
    selectService: 'اختر الخدمة',
    selectDate: 'اختر تاريخ',
    selectTime: 'اختر الوقت',
    yourInfo: 'معلوماتك',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    confirmBooking: 'تأكيد الحجز',
    bookingConfirmed: 'تم تأكيد الحجز!',
    bookingSuccess: 'تم حجز موعدك بنجاح. نتطلع إلى رؤيتك!',
    bookAnother: 'احجز موعد آخر',
    back: 'رجوع',
    bookingDetails: 'تفاصيل الحجز',
    service: 'الخدمة',
    date: 'التاريخ',
    time: 'الوقت',
    booked: 'محجوز',
    selectedService: 'الخدمة المختارة',
    selected: 'المختار',
    on: 'في',
    bookNow: 'احجز الآن',
    
    // Footer
    footerText: 'نساعدك على الحركة بشكل أفضل، والشعور بقوة أكبر، والعيش بدون ألم.',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Common
    next: 'التالي',
    submit: 'إرسال',
    cancel: 'إلغاء',
    close: 'إغلاق',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    
    // Time slots
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءً',
    
    // Days
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    bookSession: 'Book Session',
    
    // Hero Section
    heroTitle: 'Restore Your Body',
    heroTitleSuffix: ' Easily',
    clinic: 'Specialized Clinic',
    heroSubtitle: 'Reclaim Your Life',
    heroDescription: 'Expert physical therapy services designed to help you move better, feel stronger, and live without pain. Your journey to optimal health starts here.',
    bookYourSession: 'Book Your Session',
    viewServices: 'View Services',
    patientCount: '500+',
    happyPatients: 'Happy Patients',
    successRateValue: '98%',
    successRate: 'Success Rate',
    rating: '5.0 Rating',
    licensedClinic: 'Licensed Clinic',
    startJourneyToday: 'Start Your Journey Today',
    readyToTransform: 'Ready to Transform Your Life?',
    dontLetPain: 'Don\'t let pain define your limits. Book your consultation today and take the first step towards a healthier, pain-free future.',
    bookConsultation: 'Book Consultation',
    freeConsultation: 'Consultation',
    noCommitment: 'No Commitment Required',
    
    // Services
    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive physical therapy services tailored to your unique needs and recovery goals',
    
    // Service Names
    cupping: 'Cupping Therapy',
    cuppingDesc: 'Improve blood circulation, boost immunity, relieve headaches and body pain, improve blood sugar and pressure levels',
    
    acupuncture: 'Acupuncture',
    acupunctureDesc: 'Pain relief for neck, knee, and joints, treat headaches and migraines, effective in reducing frequency and intensity of headache episodes, reduce stress and anxiety',
    
    spinalInjury: 'Spinal Injury Treatment',
    spinalInjuryDesc: 'Herniated disc, vertebral representation, lower back pain',
    
    sportsInjury: 'Sports Injuries',
    sportsInjuryDesc: 'ACL injury, ankle injuries, shoulder joint injuries',
    
    obesityTreatment: 'Obesity & Weight Management',
    obesityTreatmentDesc: 'Specialized programs for weight management and fitness improvement',
    
    // About
    aboutTitle: 'About Dr. Sohel Mohamed',
    aboutSubtitle: 'Dedicated to helping patients achieve their highest level of function and return to the activities they love',
    bookAppointment: 'Book Appointment',
    whyDifferent: 'Why We\'re Different',
    whyChooseUs: 'Why Choose Physio Gold?',
    whyChooseUsDesc: 'We combine cutting-edge expertise, advanced technology, and personalized care to deliver exceptional results that transform lives',
    personalizedCare: 'Personalized Care',
    personalizedCareDesc: 'Every treatment plan is meticulously crafted to your unique needs, ensuring optimal recovery and long-lasting results.',
    expertTreatment: 'Expert Treatment',
    expertTreatmentDesc: 'Board-certified professionals with decades of experience in cutting-edge physical therapy techniques and rehabilitation.',
    provenResults: 'Proven Results',
    provenResultsDesc: 'Outstanding track record of successful treatments with 98% patient satisfaction and measurable health improvements.',
    doctorName: 'Dr. Sohel Mohamed',
    doctorSpecialty: 'Physical Therapy Specialist',
    doctorDescription: 'Dr. Sohel Mohamed has dedicated his career to helping patients overcome pain, restore function, and achieve their personal health goals. He specializes in orthopedic and sports physical therapy, with advanced training in manual therapy and movement analysis.',
    doctorApproach: 'Dr. Sohel Mohamed believes in a patient-centered approach, combining evidence-based treatments with compassionate care. He works closely with each patient to develop personalized treatment plans that address not just symptoms, but the root causes of dysfunction.',
    educationAndCertifications: 'Education & Certifications',
    educationAndCertificationsDesc: 'Committed to continuous learning and staying current with the latest treatment techniques',
    certification1: 'Bachelor of Physical Therapy - MTI University',
    certification2: 'Dry Needling Certification',
    certification3: 'Sports Physical Therapy Residency',
    certification4: 'Manual Therapy Certification',
    certification5: 'Functional Movement Assessment Certification',
    certification6: 'Therapeutic Cupping Certification',
    treatmentPhilosophy: 'Treatment Philosophy',
    treatmentQuote: 'Every patient is unique, and their treatment should be too. I believe in empowering my patients with the knowledge and tools they need to not just recover, but to prevent future injuries and maintain optimal health for life.',
    doctorCredentials: 'Dr. Sohel Mohamed, DPT, OCS',
    
    // Contact
    contactTitle: 'Get In Touch',
    contactSubtitle: 'Ready to start your journey to better health? We\'re here to help and answer any questions you may have.',
    
    // Booking
    bookingTitle: 'Book Your Session',
    bookingSubtitle: 'Schedule your appointment in just a few simple steps',
    selectService: 'Select a Service',
    selectDate: 'Select a Date',
    selectTime: 'Select a Time',
    yourInfo: 'Your Information',
    timeslotBooked: 'This time slot is already booked. Please select another time.',
    timeslotJustBooked: 'This time slot is already booked. Please select another time.',
    
    // Form
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    confirmBooking: 'Confirm Booking',
    
    // Success
    bookingConfirmed: 'Booking Confirmed!',
    bookingSuccess: 'Thank you for booking with PhysioWell. We\'ve sent a confirmation email with all the details. We look forward to seeing you soon!',
    bookAnother: 'Book Another Session',
    
    // Footer
    footerText: 'Helping you move better, feel stronger, and live without pain.',
    allRightsReserved: 'All rights reserved',
    
    // Common
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    cancel: 'Cancel',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Time slots
    morning: 'AM',
    afternoon: 'PM',
    evening: 'PM',
    
    // Days
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}