import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  User,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import axios from "axios";

// Types
interface BookingData {
  image: string;
  service: string;
  date: string;
  time?: string;
  name: string;
  phone: string;
  complain: string;
}

interface Service {
  id: string;
  image: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  duration: string;
  rating: number;
}

// Constants
const SERVICES: Service[] = [
  {
    id: "cupping",
    image: "/images/hijama2.jpg",
    name: "Cupping Therapy",
    nameAr: "حجامة",
    description:
      "Improve blood circulation, boost immunity, relieve headaches and body pain",
    descriptionAr:
      "تنشيط الدورة الدموية، تقوية المناعة، تخفيف الصداع وآلام الجسم",
    duration: "60 min",
    rating: 4.9,
  },
  {
    id: "acupuncture",
    image: "/images/dry.jpg",
    name: "Acupuncture",
    nameAr: "إبر صينية",
    description:
      "Pain relief for neck, knee, and joints, treat headaches and migraines",
    descriptionAr:
      "تخفيف الآلام، علاج الرقبة والركبة والمفاصل، علاج الصداع والشقيقة",
    duration: "45 min",
    rating: 4.8,
  },
  {
    id: "spinal",
    image: "/images/backInjury.jpg",
    name: "Spinal Injury Treatment",
    nameAr: "إصابة العمود الفقري",
    description: "Herniated disc, vertebral alignment, lower back pain relief",
    descriptionAr: "إنزلاق غضروفي، تمثيل فقرات، آلام أسفل الظهر",
    duration: "75 min",
    rating: 4.7,
  },
  {
    id: "sports",
    image: "/images/dahry.jpg",
    name: "Sports Injuries",
    nameAr: "إصابات ملاعب",
    description: "ACL injury, ankle injuries, shoulder joint injuries",
    descriptionAr: "إصابة الرباط الصليبي، إصابات الكواحل، إصابة مفصل الكتف",
    duration: "60 min",
    rating: 4.8,
  },
  {
    id: "weight",
    image: "/images/diet.jpg",
    name: "Weight Management",
    nameAr: "علاج السمنة والنحافة",
    description:
      "Specialized programs for weight management and fitness improvement",
    descriptionAr: "برامج متخصصة لإدارة الوزن وتحسين اللياقة البدنية",
    duration: "90 min",
    rating: 4.6,
  },
  {
    id: "recovery",
    image: "/images/recovery2.jpg",
    name: "Full Body Recovery",
    nameAr: "استشفاء عضلي للجسم كامل",
    description:
      "Reduce muscle pain, accelerate muscle fiber rebuilding, improve circulation",
    descriptionAr:
      "تقليل ألم العضلات بعد التمارين, تسريع إعادة بناء الألياف العضلية, تحسين الدورة الدموية",
    duration: "80 min",
    rating: 4.9,
  },
];

const TIME_SLOTS = [
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
  "10:00 PM",
];

// Components
const ServiceCard: React.FC<{
  service: Service;
  language: string;
  onSelect: (serviceName: string) => void;
  index: number;
}> = ({ service, language, onSelect }) => {
  const serviceName = language === "ar" ? service.nameAr : service.name;
  const description = language === "ar"
    ? service.descriptionAr
    : service.description;

  return (
    <div className="overflow-hidden relative bg-white rounded-xl border border-gray-100 shadow-lg transition-all duration-300 group dark:bg-gray-800 dark:shadow-gray-900/50 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900">
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 to-yellow-400" />

      {/* Image container */}
      <div className="overflow-hidden relative h-48">
        <img
          src={service.image}
          alt={serviceName}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent from-black/40" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3
            className={`text-xl font-bold text-gray-900 dark:text-white ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {serviceName}
          </h3>
          <div className="flex items-center px-2 py-1 bg-yellow-100 rounded-full dark:bg-yellow-900/30">
            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="ml-1 text-xs font-medium text-yellow-800 dark:text-yellow-200">
              {service.rating}
            </span>
          </div>
        </div>

        <p
          className={`text-gray-600 dark:text-gray-300 text-sm mb-6 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {description}
        </p>

        <button
          onClick={() => onSelect(service.name)}
          className="flex justify-center items-center px-4 py-3 w-full font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg transition-all duration-300 hover:from-yellow-600 hover:to-yellow-700 group-hover:shadow-yellow-200 dark:group-hover:shadow-yellow-900/50 group-hover:shadow-md"
        >
          <Calendar className={language === "ar" ? "ml-2" : "mr-2"} size={18} />
          {language === "ar" ? "احجز الآن" : "Book Now"}
        </button>
      </div>
    </div>
  );
};

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <React.Fragment key={step}>
          <div
            className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
              currentStep >= step
                ? "bg-yellow-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-300"
            }`}
          >
            {currentStep > step
              ? <CheckCircle className="w-5 h-5" />
              : <span className="font-semibold">{step}</span>}
            {currentStep === step && (
              <div className="absolute -inset-1 rounded-full border-2 border-yellow-300 animate-pulse" />
            )}
          </div>
          {step < totalSteps && (
            <div
              className={`h-1 w-12 transition-all duration-300 ${
                currentStep > step
                  ? "bg-yellow-500"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const BackButton: React.FC<{
  onClick: () => void;
  language: string;
  text: string;
}> = ({ onClick, language, text }) => (
  <button
    onClick={onClick}
    className="flex items-center px-3 py-2 mb-6 text-yellow-600 rounded-lg transition-colors duration-300 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-gray-700"
  >
    <ArrowLeft
      className={`h-5 w-5 ${language === "ar" ? "ml-2 rotate-180" : "mr-2"}`}
    />
    {text}
  </button>
);

// Main Component
const BookingSystem: React.FC = () => {
  // Email sending utility
  const sendBookingEmail = async (bookingData: BookingData): Promise<boolean> => {
    try {
      const res = await fetch("https://sendmail-api-docs.vercel.app/api/send", {
        method: "POST",
        body: JSON.stringify({
          to: "drsohelmohamed@gmail.com",
          subject: `PhysioGold New Booking: ${bookingData.service} - ${bookingData.name}`,
          message: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 24px; text-align: left; border: 1px solid #e9ecef;">
                <h2 style="color: #1a73e8; margin-bottom: 16px; font-size: 24px;">New Booking Received</h2>
                <div style="background-color: #ffffff; border-radius: 4px; padding: 16px; border: 1px solid #e9ecef; margin-bottom: 12px;">
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Service:</strong> ${bookingData.service}</p>
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Name:</strong> ${bookingData.name}</p>
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Phone:</strong> ${bookingData.phone}</p>
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Date:</strong> ${bookingData.date}</p>
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Time:</strong> ${bookingData.time || "Not specified"}</p>
                  <p style="color: #3c4043; margin: 8px 0;"><strong>Complain:</strong> ${bookingData.complain}</p>
                </div>
                <p style="color: #5f6368; margin-top: 16px; font-size: 14px; text-align: center;">Sent via PhysioWell Booking System</p>
              </div>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Booking confirmation email sent successfully!");
      return true;
    } catch (error) {
      console.error("Error sending booking email:", error);
      toast.error("Failed to send booking confirmation email");
      return false;
    }
  };

  const { language } = useLanguage();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingData, setBookingData] = useState<BookingData>({
    image: "",
    service: "",
    date: "",
    name: "",
    phone: "",
    complain: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const currentServiceName = SERVICES.find((service) =>
    service.name === bookingData.service
  )?.[language == "ar" ? "nameAr" : "name"];

  // Helper functions
  const isSlotBooked = (date: string, time: string) => {
    return bookings.some((booking) =>
      booking.date === date && booking.time === time
    );
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addBooking = async (data: BookingData) => {
    // First check local state to avoid unnecessary API calls
    const isAvailable = !isSlotBooked(data.date, data.time || "");
    if (!isAvailable) return false;

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: data.service,
          date: data.date,
          time: data.time,
          name: data.name,
          phone: data.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          // Time slot was just booked by someone else
          setBookingError(
            language === "ar"
              ? "هذا الموعد محجوز بالفعل. يرجى اختيار وقت آخر."
              : "This time slot has just been booked by another patient. Please select a different time.",
          );
          return false;
        } else {
          throw new Error(errorData.error || "Failed to create booking");
        }
      }

      // Add to local state as well
      setBookings([...bookings, data]);

      // Send Email to the Website Owner
      const sendEmailSuccess = await sendBookingEmail(data);
      if (!sendEmailSuccess) {
        console.error("Failed to send booking confirmation email");
      }

      return true;
    } catch (error) {
      console.error("Error creating booking:", error);
      setBookingError(
        language === "ar"
          ? "حدث خطأ أثناء إنشاء الحجز. يرجى المحاولة مرة أخرى."
          : "An error occurred while creating your booking. Please try again.",
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      bookingTitle: {
        en: "Book Your Appointment",
        ar: "احجز موعدك",
      },
      bookingSubtitle: {
        en:
          "Experience premium physiotherapy services with our gold-standard care",
        ar: "جرب خدمات العلاج الطبيعي المتميزة مع رعايتنا ذات المعايير الذهبية",
      },
      selectService: {
        en: "Select a Service",
        ar: "اختر الخدمة",
      },
      selectDate: {
        en: "Choose a Date",
        ar: "اختر تاريخ",
      },
      selectTime: {
        en: "Select Time Slot",
        ar: "اختر الوقت",
      },
      yourInfo: {
        en: "Your Information",
        ar: "معلوماتك",
      },
      fullName: {
        en: "Full Name",
        ar: "الاسم الكامل",
      },
      email: {
        en: "Email Address",
        ar: "البريد الإلكتروني",
      },
      phone: {
        en: "Phone Number",
        ar: "رقم الهاتف",
      },
      confirmBooking: {
        en: "Confirm Booking",
        ar: "تأكيد الحجز",
      },
      bookingConfirmed: {
        en: "Booking Confirmed!",
        ar: "تم تأكيد الحجز!",
      },
      bookingSuccess: {
        en:
          "Your appointment has been successfully booked. We look forward to seeing you!",
        ar: "تم حجز موعدك بنجاح. نتطلع إلى رؤيتك!",
      },
      bookAnother: {
        en: "Book Another Appointment",
        ar: "احجز موعد آخر",
      },
      back: {
        en: "Back",
        ar: "رجوع",
      },
    };

    return translations[key]?.[language] || key;
  };

  // Handlers
  const handleServiceSelect = (service: string) => {
    const selectedServiceObj = SERVICES.find((s) =>
      (language === "ar" ? s.nameAr : s.name) === service
    );

    setSelectedService(service);
    setBookingData((prev) => ({
      ...prev,
      service,
      image: selectedServiceObj?.image || "",
    }));
    setBookingStep(2);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setBookingData((prev) => ({ ...prev, date }));
    setBookingStep(3);
  };

  const handleTimeSelect = (time: string) => {
    if (isSlotBooked(selectedDate, time)) {
      setBookingError(
        language === "ar"
          ? "هذا الموعد محجوز بالفعل. يرجى اختيار وقت آخر."
          : "This time slot is already booked. Please select another time.",
      );
      return;
    }

    setBookingError("");
    setSelectedTime(time);
    setBookingData((prev) => ({ ...prev, time }));
    setBookingStep(4);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    const success = await addBooking(bookingData);

    if (success === true) {
      setShowSuccess(true);
    } else {
      // Error message is set in addBooking function
      setBookingStep(3);
    }
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setBookingData({
      image: "",
      service: "",
      date: "",
      name: "",
      phone: "",
      complain: "",
    });
    setBookingError("");
    setShowSuccess(false);
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    const days = [0, 2, 4]; // Sunday, Tuesday, Thursday
    for (let i = 0; i < 28; i += 2) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (days.includes(date.getDay())) {
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    return dates;
  };

  useEffect(() => {
    const getBookings = async () => {
      const res = await axios.get("http://localhost:5000/bookings");
      setBookings(res.data);
    };

    getBookings();
  }, []);

  // Success Screen
  if (showSuccess) {
    return (
      <div className="flex fixed inset-0 z-50 justify-center items-center p-6 bg-black/30 animate-fadeIn">
        <div className="overflow-hidden relative w-full max-w-md bg-white rounded-3xl shadow-2xl dark:bg-gray-800 animate-scaleIn">
          {/* Gold header */}
          <div className="px-6 py-8 text-center bg-gradient-to-r from-yellow-500 to-yellow-600">
            <div className="inline-block relative">
              <CheckCircle className="mx-auto w-16 h-16 text-white" />
              <div className="absolute inset-0 rounded-full animate-ping bg-white/20" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              {t("bookingConfirmed")}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {t("bookingSuccess")}
            </p>

            {/* Booking summary */}
            <div className="p-6 mb-8 text-left bg-gray-50 rounded-xl dark:bg-gray-700">
              <h3 className="mb-3 font-medium text-gray-900 dark:text-white">
                {language === "ar" ? "تفاصيل الحجز" : "Booking Details"}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="text-gray-500 dark:text-gray-400">
                    {language === "ar" ? "الخدمة:" : "Service:"}
                  </span>{" "}
                  {selectedService}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="text-gray-500 dark:text-gray-400">
                    {language === "ar" ? "التاريخ:" : "Date:"}
                  </span>{" "}
                  {new Date(selectedDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="text-gray-500 dark:text-gray-400">
                    {language === "ar" ? "الوقت:" : "Time:"}
                  </span>{" "}
                  {selectedTime}
                </p>
              </div>
            </div>

            <button
              onClick={resetBooking}
              className="py-4 w-full font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl shadow-md transition-all duration-300 hover:from-yellow-600 hover:to-yellow-700 hover:shadow-lg"
            >
              {t("bookAnother")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Header */}

      {/* Main Content */}
      <main className="px-4 py-12 pt-28 mx-auto -mt-12 max-w-6xl sm:px-6 lg:px-8">
        <header className="mb-16">
          {/* Logo and title */}
          <div className="relative mx-auto text-center">
            <div className="flex absolute inset-0 z-10 justify-center items-center">
              <div>
                <StepIndicator currentStep={bookingStep} totalSteps={4} />
              </div>
            </div>
          </div>
        </header>
        <div className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-2xl dark:bg-gray-800 dark:shadow-gray-900/50 dark:border-gray-700">
          {/* Error Message */}
          {bookingError && (
            <div className="p-6 m-6 bg-red-50 rounded-xl border-l-4 border-red-500 dark:bg-red-900/20 animate-shake">
              <div className="flex items-center">
                <AlertCircle className="flex-shrink-0 mr-3 w-6 h-6 text-red-500 dark:text-red-400" />
                <p className="font-medium text-red-700 dark:text-red-300">
                  {bookingError}
                </p>
              </div>
            </div>
          )}

          <div className="p-8 lg:p-12">
            {/* Step 1: Service Selection */}
            {bookingStep === 1 && (
              <div className="animate-fadeInUp">
                <h2
                  className={`text-3xl font-bold text-gray-900 dark:text-white mb-8 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("selectService")}
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {SERVICES.map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      language={language}
                      onSelect={handleServiceSelect}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {bookingStep === 2 && (
              <div className="animate-fadeInUp">
                <BackButton
                  onClick={() => setBookingStep(1)}
                  language={language}
                  text={t("back")}
                />

                <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                  {t("selectDate")}
                </h2>

                {/* Selected Service Summary */}
                <div className="p-6 mb-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-900/30 dark:border-yellow-800">
                  <p
                    className={`text-yellow-800 dark:text-yellow-200 text-lg ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    <strong>
                      {language === "ar"
                        ? "الخدمة المختارة:"
                        : "Selected Service:"}
                    </strong>{" "}
                    {currentServiceName}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                  {generateDateOptions().map((date, index) => (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className="p-4 text-center rounded-2xl border-2 border-gray-200 transition-all duration-300 transform dark:border-gray-600 hover:border-yellow-500 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:scale-105 animate-fadeInUp hover:shadow-lg dark:hover:shadow-gray-900"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Calendar className="mx-auto mb-2 w-6 h-6 text-gray-600 dark:text-gray-300" />
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(date).toLocaleDateString(
                          language === "ar" ? "ar-EG" : "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Time Selection */}
            {bookingStep === 3 && (
              <div className="animate-fadeInUp">
                <BackButton
                  onClick={() => setBookingStep(2)}
                  language={language}
                  text={t("back")}
                />

                <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                  {t("selectTime")}
                </h2>

                {/* Booking Summary */}
                <div className="p-6 mb-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-900/30 dark:border-yellow-800">
                  <p
                    className={`text-yellow-800 dark:text-yellow-200 text-lg ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    <strong>
                      {language === "ar" ? "المختار:" : "Selected:"}
                    </strong>{" "}
                    {currentServiceName} {language === "ar" ? "في" : "on"}{" "}
                    {new Date(selectedDate).toLocaleDateString(
                      language === "ar" ? "ar-EG" : "en-US",
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {TIME_SLOTS.map((time, index) => {
                    const isBooked = isSlotBooked(selectedDate, time);
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isBooked}
                        className={`p-6 border-2 rounded-2xl transition-all duration-300 text-center transform animate-fadeInUp ${
                          isBooked
                            ? "text-red-400 bg-red-50 border-red-200 cursor-not-allowed dark:border-red-800 dark:bg-red-900/20 dark:text-red-500"
                            : "border-gray-200 dark:border-gray-600 hover:border-yellow-500 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-900"
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Clock
                          className={`h-6 w-6 mx-auto mb-2 ${
                            isBooked
                              ? "text-red-400 dark:text-red-500"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        />
                        <p
                          className={`text-lg font-medium ${
                            isBooked
                              ? "text-red-400 dark:text-red-500"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {time}
                        </p>
                        {isBooked && (
                          <p className="mt-2 text-sm font-medium text-red-500 dark:text-red-400">
                            {language === "ar" ? "محجوز" : "Booked"}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Contact Information */}
            {bookingStep === 4 && (
              <div className="animate-fadeInUp">
                <BackButton
                  onClick={() => setBookingStep(3)}
                  language={language}
                  text={t("back")}
                />

                <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
                  {t("yourInfo")}
                </h2>

                {/* Comprehensive Booking Summary */}
                <div className="p-8 mb-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-3xl border border-yellow-200 shadow-inner dark:from-yellow-900/20 dark:to-yellow-900/30 dark:border-yellow-800">
                  <h3
                    className={`text-xl font-bold text-gray-900 dark:text-white mb-6 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {language === "ar" ? "ملخص الحجز" : "Booking Summary"}
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div
                      className={`${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {language === "ar" ? "الخدمة" : "Service"}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {currentServiceName}
                      </p>
                    </div>
                    <div
                      className={`${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {language === "ar" ? "التاريخ" : "Date"}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {new Date(selectedDate).toLocaleDateString(
                          language === "ar" ? "ar-EG" : "en-US",
                        )}
                      </p>
                    </div>
                    <div
                      className={`${
                        language === "ar" ? "text-right" : "text-left"
                      }`}
                    >
                      <p className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                        {language === "ar" ? "الوقت" : "Time"}
                      </p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label
                        className={`block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {t("fullName")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.name}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))}
                        className={`w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500 
                                  focus:border-yellow-500 transition-all duration-300 text-lg dark:bg-gray-700 dark:text-white ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
                        placeholder={language === "ar"
                          ? "اسمك الكامل"
                          : "Your full name"}
                        dir={language === "ar" ? "rtl" : "ltr"}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {t("phone")} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingData.phone}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))}
                        className="px-6 py-4 w-full text-lg rounded-xl border-2 border-gray-300 transition-all duration-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
                        placeholder="(555) 123-4567"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 ${
                          language === "ar" ? "text-right" : "text-left"
                        }`}
                      >
                        {language === "ar" ? "الشكوى" : "Complain"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.complain}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            complain: e.target.value,
                          }))}
                        className="px-6 py-4 w-full text-lg rounded-xl border-2 border-gray-300 transition-all duration-300 dark:border-gray-600 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:text-white"
                        placeholder={language === "ar" ? "ادخل الشكوى" : "Enter the complain"}
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex justify-center items-center px-8 py-5 w-full text-lg font-bold text-white rounded-2xl border-2 border-transparent shadow-xl transition-all duration-300 transform ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 hover:scale-105 hover:shadow-2xl group hover:border-yellow-300"
                    }`}
                  >
                    {isSubmitting
                      ? (
                        <>
                          <svg
                            className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            >
                            </circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            >
                            </path>
                          </svg>
                          {language === "ar"
                            ? "جاري الحجز..."
                            : "Processing..."}
                        </>
                      )
                      : (
                        <>
                          <User
                            className={`${
                              language === "ar" ? "ml-3" : "mr-3"
                            } h-6 w-6`}
                          />
                          {t("confirmBooking")}
                        </>
                      )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingSystem;
