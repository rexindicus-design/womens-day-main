"use client";

import { useState, useEffect } from "react";
import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Menu,
  X,
  Check,
  ChevronUp,
  Award,
  Trophy,
  Star,
  Upload,
  User,
  Mail,
  Phone,
  Building,
  FileText,
} from "lucide-react";

// Navigation items
const navItems = [
  { name: "Home", href: "/", active: true },
  { name: "Categories", href: "/categories" },
  { name: "Register", href: "/register" },
];

// News ticker items
const newsTickerItems = [
  "🏆 Nominations Open: Women's Day Achievement Awards 2026",
  "📅 Event Date: March 8, 2026 at SIMATS Campus",
  "🎓 SIMATS (Saveetha Institute of Medical and Technical Sciences) celebrates 25 years of excellence",
  "📰 The Times of India - India's leading English daily partners for Awards",
  "🌟 Special Lifetime Achievement Award announced",
  "📅 The last date for nomination is 23rd February 2026",
];

// Award categories for nomination
const awardCategories = [
  "Technology & Innovation",
  "Research & Academia",
  "Social Impact & Community Service",
  "Healthcare & Medicine",
  "Business & Entrepreneurship",
  "Arts & Culture",
  "Lifetime Achievement",
];

// News Ticker Component
function NewsTicker() {
  return (
    <div className="bg-gradient-to-r from-[#C41E7F] to-[#6B2D5B] text-white py-2 overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...newsTickerItems, ...newsTickerItems].map((item, index) => (
          <span key={index} className="mx-8 text-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// Dual Logo Component
function DualLogo() {
  return (
    <a href="/" className="flex items-center gap-3 sm:gap-4">
     {/* empowher_award */}
      <div className="flex items-center gap-2">
        <img 
          src="/logo.png" 
          alt="SIMATS (empowher_award) " 
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
        />
        <div className="hidden sm:block">
          <div className="text-[#C41E7F] font-bold text-sm leading-tight">EMPOWHER</div>
          <div className="text-gray-500 text-xs">Awards</div>
        </div>
      </div>
       {/* Divider */}
      <div className="h-8 sm:h-10 w-px bg-gray-300"></div>

      {/* SIMATS Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/simats.png" 
          alt="SIMATS (Saveetha Institute of Medical and Technical Sciences) " 
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
        />
        <div className="hidden sm:block">
          <div className="text-[#C41E7F] font-bold text-sm leading-tight">SIMATS</div>
          <div className="text-gray-500 text-xs">Saveetha Institute of Medical and Technical Sciences</div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-8 sm:h-10 w-px bg-gray-300"></div>
      
      {/* TOI Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/TOI1.png" 
          alt="Times of India" 
          className="w-16 h-16 sm:w-35 sm:h-20 object-contain"
        />
             </div>
    </a>
  );
}

// Navigation Header Component
function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-pink-100 sticky top-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <DualLogo />

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  item.active
                    ? "text-[#D4AF37]"
                    : "text-gray-700 hover:text-[#C41E7F]"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2 text-gray-600 hover:text-[#C41E7F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="xl:hidden py-4 border-t border-pink-100">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium py-2 transition-colors ${
                    item.active
                      ? "text-[#D4AF37]"
                      : "text-gray-700 hover:text-[#C41E7F]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Hero Section Component with Banner
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Banner Image */}
      <div className="w-full max-h-[590px] overflow-hidden relative">
        <img 
          src="/banner.png" 
          alt="Women's Day Awards Nomination" 
          className="w-full h-auto object-cover"
        />
        {/* Overlay clickable area for 'Nominate Now' */}
        <a
          href="/register"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block"
          style={{ width: '220px', height: '60px', zIndex: 10 }}
          aria-label="Nominate Now"
        >
          {/* Optionally, add a visually hidden span for accessibility */}
          <span className="sr-only">Nominate Now</span>
        </a>
      </div>
    </section>
  );
}

// Announcement Box Component
function AnnouncementBox() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12 sm:py-16 lg:py-20" id="nominate">
      {/* Decorative gold top border */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#C41E7F] mx-auto mb-4 sm:mb-8"></div>

      {/* Main headline */}
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#C41E7F] m1-1 sm:mb-1 leading-relaxed font-bold">
        Saveetha Institute of Medical and Technical Sciences
      </h2>
        {/* Main headline */}
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#C41E7F] mb-1 sm:mb-1 leading-tight font-bold">
        &
      </h2>
        {/* Main headline */}
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#C41E7F] mb-5 sm:mb-8 leading-tight font-bold">
        The Times of India 
      </h2>
         {/* Main headline */}
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#C41E7F] mb-1 sm:mb-2 leading-tight font-bold">
        invite nominations for the "SIMATS EmpowHER Awards 2026"
      </h2>

      {/* Body text */}
      <div className="font-serif text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto space-y-4 mb-8">
        <p className="text-xl text-[#C41E7F] font-medium">
          The SIMATS EmpowHer Awards serve as a prestigious platform to recognize formidable and unstoppable women leaders,emboding a multi faceted brillance, blending empathetic leadership with unwavering intelligence rigor to redefine success, lighting the path for aspirant generations.
        </p>
       
      </div>

      {/* Submit Button */}
      <a
        href="/register"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white font-bold px-8 py-4 text-lg rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all hover:scale-105"
      >
        <Award className="w-6 h-6" />
        Submit Your Nomination
      </a>

      {/* Decorative bottom border */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] mx-auto mt-4 sm:mt-8"></div>
    </div>
  );
}

// Checkmark Item Component
function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="w-5 h-5 text-[#C41E7F] mt-0.5 flex-shrink-0" />
      <span className="text-gray-700 font-serif">{children}</span>
    </div>
  );
}

// Being Nominated & Judges Section
function NominationInfoSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Being nominated for an award */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#C41E7F] mb-8 font-bold">
              Why Nominate?
            </h2>
            <div className="space-y-4">
              <CheckItem>Celebrates success of extraordinary women</CheckItem>
              <CheckItem>Amplifies visibility and credibility</CheckItem>
              <CheckItem>Inspires the next generation of women leaders</CheckItem>
               <CheckItem>Drives gender equity & social change</CheckItem>
              <CheckItem>Get recognised by a prominent dignitary</CheckItem>
            </div>
          </div>

          {/* What are judges looking for? */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#C41E7F] mb-8 font-bold">
              What Judges Look For
            </h2>
            <div className="space-y-4">
              <CheckItem>Outstanding achievements </CheckItem>
              <CheckItem>Leadership and Mentorship</CheckItem>
              <CheckItem>Commitment to diversity and inclusion</CheckItem>
              <CheckItem>Innovation and Creativity</CheckItem>
               <CheckItem>Impact on community and society at large</CheckItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Numbered Item Component for How to Nominate
function NumberedItem({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-4xl sm:text-5xl font-light text-[#D4AF37]">{number}.</span>
      <p className="text-white/90 pt-2 border-b border-white/30 pb-4">{children}</p>
    </div>
  );
}

// How to Nominate Section
function HowToNominateSection() {
  return (
    <section className="bg-gradient-to-br from-[#C41E7F] via-[#6B2D5B] to-[#2D1B4E] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left column - Title and intro */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6 font-bold">
              How to Nominate
            </h2>
            <p className="text-white/90 mb-6">
              “You can nominate only yourself for the Award. Self-nomination is allowed in up to two categories, if appropriate. Nominating others is not allowed.”
            </p>
            <p className="text-white/90 mb-6">
              The Last of nomination is 23rd February 2026.
            </p>

            <p className="text-white/70 text-sm italic">
              All nominations will be kept confidential and only viewed by the judging panel.
            </p>
            
          </div>

          {/* Middle column - Items 1-4 */}
          <div className="space-y-6">
            <NumberedItem number={1}>
              The candidate's career track record across organisations.
            </NumberedItem>
            <NumberedItem number={2}>
              Her achievements to date
            </NumberedItem>
            <NumberedItem number={3}>
              A vision for the future and unique value proposition.
            </NumberedItem>
           
          </div>

          {/* Right column - Items 5-7 and notice */}
          <div className="space-y-6">
            <NumberedItem number={4}>
              High quality photo of nominee (2MB JPEG).
            </NumberedItem>
           
            <NumberedItem number={5}>
              Supporting submission material. For example LinkedIn profile, statements of recommendation, 
              relevant press coverage.
            </NumberedItem>
            
            {/* Important notice box */}
            <div className="border border-[#D4AF37] p-4 mt-8 rounded-lg bg-white/5">
            <h6 className="font-serif text-base sm:text-lg text-white mb-2 font-bold">
              Terms & Conditions
            </h6>
              <p className="text-white/90 text-sm">
                “This nomination process is strictly for self-nomination; therefore, the nominee must review and 
                accept the terms and conditions and confirm the submission.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Nomination Form Component
function NominationForm() {
  const [formData, setFormData] = useState({
    nominatorName: "",
    nominatorEmail: "",
    nominatorPhone: "",
    nominatorOrganization: "",
    nomineeName: "",
    nomineeEmail: "",
    nomineePhone: "",
    nomineeDesignation: "",
    nomineeOrganization: "",
    category: "",
    achievements: "",
    biography: "",
    futureVision: "",
    recommendation: "",
    yearsExperience: "",
    yearsDesignation: "",
    yearIncorporation: "",
    revenue: "",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const [errors, setErrors] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: string[] = [];
    if (!formData.yearsExperience) validationErrors.push("Years of experience in current organisation is required");
    if (!formData.yearsDesignation) validationErrors.push("Years at same designation is required");
    if (!formData.yearIncorporation) validationErrors.push("Year of Incorporation is required");
    if (!formData.revenue) validationErrors.push("Revenue as on March 31, 2025 is required");
    // Add any other required field checks here as needed
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setErrors([]);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        nominatorName: "",
        nominatorEmail: "",
        nominatorPhone: "",
        nominatorOrganization: "",
        nomineeName: "",
        nomineeEmail: "",
        nomineePhone: "",
        nomineeDesignation: "",
        nomineeOrganization: "",
        category: "",
        achievements: "",
        biography: "",
        futureVision: "",
        recommendation: "",
        yearsExperience: "",
        yearsDesignation: "",
        yearIncorporation: "",
        revenue: "",
        termsAccepted: false,
      });
    }, 3000);
  };

  if (submitSuccess) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-50 to-purple-50" id="nomination-form">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-pink-100">
            <div className="w-20 h-20 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#C41E7F] mb-4">Nomination Submitted!</h3>
            <p className="text-gray-600 text-lg">
              Thank you for your nomination. We will review it and get back to you soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-50 to-purple-50" id="nomination-form">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Nominations Open
            <Star className="w-4 h-4" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#C41E7F] font-bold mb-4">
            Nomination Form
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete the form below to nominate an exceptional woman for the Women&apos;s Day Achievement Awards 2026
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-pink-100">
          {/* Nominator Details */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#6B2D5B] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#C41E7F]" />
              Your Details (Nominator)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="nominatorName"
                  value={formData.nominatorName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="nominatorEmail"
                  value={formData.nominatorEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="nominatorPhone"
                  value={formData.nominatorPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                <input
                  type="text"
                  name="nominatorOrganization"
                  value={formData.nominatorOrganization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="Your organization name"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-10"></div>

          {/* Nominee Details */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#6B2D5B] mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#D4AF37]" />
              Nominee Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nominee&apos;s Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="nomineeName"
                  value={formData.nomineeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="Nominee's full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nominee&apos;s Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="nomineeEmail"
                  value={formData.nomineeEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="nominee@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="nomineePhone"
                  value={formData.nomineePhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="nomineeDesignation"
                  value={formData.nomineeDesignation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="Current designation/role"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="nomineeOrganization"
                  value={formData.nomineeOrganization}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="Nominee's organization"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of experience in current organisation</label>
                <input
                  type="number"
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="e.g., 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years at same designation</label>
                <input
                  type="number"
                  name="yearsDesignation"
                  value={formData.yearsDesignation}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="e.g., 3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Incorporation</label>
                <input
                  type="number"
                  name="yearIncorporation"
                  value={formData.yearIncorporation}
                  onChange={handleInputChange}
                  required
                  min="1900"
                  max="2026"
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="e.g., 2015"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Revenue as on March 31, 2025</label>
                <input
                  type="text"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all"
                  placeholder="e.g., ₹10 Crores"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-10"></div>

          {/* Category Selection */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#6B2D5B] mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C41E7F]" />
              Award Category
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all bg-white"
              >
                <option value="">Choose a category</option>
                {awardCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-10"></div>

          {/* Nomination Details */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#6B2D5B] mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              Nomination Details
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Achievements *
                  <span className="text-gray-400 font-normal ml-2">(What has the nominee achieved?)</span>
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all resize-none"
                  placeholder="Describe the nominee's key achievements, awards, and notable contributions..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Biography *
                  <span className="text-gray-400 font-normal ml-2">(50 words max)</span>
                </label>
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all resize-none"
                  placeholder="A brief biography for use in the awards programme..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Future Vision
                  <span className="text-gray-400 font-normal ml-2">(What makes her special?)</span>
                </label>
                <textarea
                  name="futureVision"
                  value={formData.futureVision}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all resize-none"
                  placeholder="Describe the nominee's vision and plans for the future..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why This Nominee Deserves the Award *
                </label>
                <textarea
                  name="recommendation"
                  value={formData.recommendation}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent transition-all resize-none"
                  placeholder="Explain why this nominee deserves to be recognized..."
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-10"></div>

          {/* File Upload Section */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#6B2D5B] mb-6 flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#C41E7F]" />
              Supporting Documents
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-pink-200 rounded-xl p-6 text-center hover:border-[#C41E7F] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-[#C41E7F] mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Upload Photo</p>
                <p className="text-xs text-gray-400 mt-1">JPEG, max 2MB</p>
              </div>
              <div className="border-2 border-dashed border-pink-200 rounded-xl p-6 text-center hover:border-[#C41E7F] transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-[#C41E7F] mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Upload CV/Resume</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC, max 5MB</p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                required
                className="mt-1 w-5 h-5 text-[#C41E7F] border-pink-300 rounded focus:ring-[#C41E7F]"
              />
              <span className="text-sm text-gray-600">
                I confirm that the nominee is aware of this nomination and has agreed to be nominated. 
                I have read and accept the <a href="#" className="text-[#C41E7F] hover:underline">Terms & Conditions</a>.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white font-bold py-4 px-8 rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                <Trophy className="w-5 h-5" />
                Submit Nomination
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
      {/* Sparkle decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#C41E7F] rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-[#C41E7F] rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-10 right-1/4 w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse delay-300"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#C41E7F] mb-4 font-bold">
          Ready to Nominate ?
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Don&apos;t miss the opportunity to recognize extraordinary women making a difference
        </p>
        <a
          href="/register"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white font-bold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all hover:scale-105 text-lg"
        >
          <Trophy className="w-5 h-5" />
          Submit Nomination Now
        </a>
      </div>
    </section>
  );
}

// Partnership Banner
function PartnershipBanner() {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-8 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-[#6B2D5B] text-sm uppercase tracking-wider font-medium">In Association With</p>
        </div>
        <div className="flex items-center justify-center gap-8 sm:gap-16">
          {/* SIMATS Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/simats.png" 
              alt="SIMATS (Saveetha Institute of Medical and Technical Sciences) " 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-[#C41E7F] font-bold">SIMATS (Saveetha Institute of Medical and Technical Sciences) </div>
              <div className="text-gray-500 text-sm">Excellence in Education</div>
            </div>
          </div>
          {/* Divider */}
      <div className="h-8 sm:h-10 w-px bg-gray-300"></div>
      
      {/* TOI Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/TOI1.png" 
          alt="Times of India" 
          className="w-16 h-20 sm:w-40 sm:h-20 object-contain"
        />
             </div>
            
        </div>
        
        {/* Knowledge Partner Section */}
        <div className="text-center mt-8 mb-4">
          <p className="text-[#6B2D5B] text-sm uppercase tracking-wider font-medium">Process framework set and evaluated</p>
        </div>
        <div className="flex items-center justify-center">
          {/* EY Logo */}
          
            <div className="hidden sm:block text-center w-full">
              <div className="font-bold">by</div>
              <div className="font-text-2xl">Ernst & Young</div>
            </div>
          
        </div>
      </div>
    </section>
  );
}

// Scroll to Top Button
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white p-3 rounded-full shadow-lg hover:shadow-pink-500/30 transition-all ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#6B2D5B] to-[#2D1B4E] text-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#D4AF37]">About the Awards</h3>
            <p className="text-white/70 text-sm">
              The Women&apos;s Day Achievement Awards celebrate extraordinary women who are making 
              a difference in Technology, Research, and Social Impact. A prestigious collaboration 
              between SIMATS (Saveetha Institute of Medical and Technical Sciences)  and TheTimes of India.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#D4AF37]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-white/70 hover:text-[#D4AF37] transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#D4AF37]">Contact Us</h3>
            <div className="text-white/70 text-sm space-y-2">
              <p>SIMATS (Saveetha Institute of Medical and Technical Sciences) Campus</p>
              <p>Chennai, Tamil Nadu, India</p>
              <p className="font-medium text-white/90">Dr. GUNITA ARUN CHANDHOK - 9003286689</p>
              <p className="font-medium text-white/90">Dr. JOTHILAKSHMY - 9941912481</p>
              <p>Email: <a href="mailto:simatsempowher.toi@gmail.com" className="hover:text-[#D4AF37] transition-colors">simatsempowher.toi@gmail.com</a></p>
            </div>
              
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Women&apos;s Day Achievement Awards. SIMATS (Saveetha Institute of Medical and Technical Sciences)  & The Times of India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NewsTicker />
      <NavigationHeader />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnnouncementBox />
        </div>

        <NominationInfoSection />
        <HowToNominateSection />
        <CTASection />
      </main>

      <PartnershipBanner />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
