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
  Plus,
  Minus,
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
  { name: "Home", href: "#", active: true },
  { name: "Categories", href: "/categories" },
];

// News ticker items
const newsTickerItems = [
  "🏆 Nominations Open: Women's Day Achievement Awards 2026",
  "📅 Event Date: March 8, 2026 at SIMATS Campus",
  "⭐ Last Year's Winner Dr. Priya Sharma receives National Recognition",
  "🎓 SIMATS Engineering celebrates 25 years of excellence",
  "📰 Times of India - India's leading English daily partners for Awards",
  "🌟 Special Lifetime Achievement Award announced",
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
      {/* SIMATS Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/simats.png" 
          alt="SIMATS Engineering" 
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
        />
        <div className="hidden sm:block">
          <div className="text-[#C41E7F] font-bold text-sm leading-tight">SIMATS</div>
          <div className="text-gray-500 text-xs">Engineering</div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="h-8 sm:h-10 w-px bg-gray-300"></div>
      
      {/* TOI Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/toi.png" 
          alt="Times of India" 
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
        />
        <div className="hidden sm:block">
          <div className="text-[#E31837] font-bold text-sm leading-tight">Times of India</div>
          <div className="text-gray-500 text-xs">Since 1838</div>
        </div>
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
      <div className="w-full max-h-[590px] overflow-hidden">
        <img 
          src="/banner.png" 
          alt="Women's Day Awards Nomination" 
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}

// Announcement Box Component
function AnnouncementBox() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12 sm:py-16 lg:py-20" id="nominate">
      {/* Decorative gold top border */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#C41E7F] mx-auto mb-8 sm:mb-12"></div>

      {/* Main headline */}
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#C41E7F] mb-6 sm:mb-8 leading-relaxed font-bold">
        SIMATS Engineering & Times of India Celebrate the Trailblazers of 2026
      </h2>

      {/* Body text */}
      <div className="font-serif text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto space-y-4 mb-8">
        <p className="text-xl text-[#C41E7F] font-medium">
          Nominations are now OPEN for the annual Women&apos;s Day Awards, recognizing excellence in 
          Technology, Research, and Social Impact.
        </p>
        <p>
          This prestigious collaboration between SIMATS Engineering and Times of India honors 
          extraordinary women who are shaping the future through innovation, leadership, and 
          dedication to their fields.
        </p>
      </div>

      {/* Submit Button */}
      <a
        href="#nomination-form"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white font-bold px-8 py-4 text-lg rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all hover:scale-105"
      >
        <Award className="w-6 h-6" />
        Submit Your Nomination
      </a>

      {/* Decorative bottom border */}
      <div className="w-24 h-1 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] mx-auto mt-8 sm:mt-12"></div>
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
              <CheckItem>Recognizes and celebrates success of inspirational women</CheckItem>
              <CheckItem>Boosts professional credibility and visibility</CheckItem>
              <CheckItem>Creates role models for the next generation of women leaders</CheckItem>
              <CheckItem>Showcases your organization&apos;s commitment to diversity and excellence</CheckItem>
              <CheckItem>National media coverage through Times of India</CheckItem>
            </div>
          </div>

          {/* What are judges looking for? */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-pink-100">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#C41E7F] mb-8 font-bold">
              What Judges Look For
            </h2>
            <div className="space-y-4">
              <CheckItem>Significant and ground-breaking achievements to date</CheckItem>
              <CheckItem>High potential and vision for the future</CheckItem>
              <CheckItem>Distinctive, innovative contribution in their field</CheckItem>
              <CheckItem>Ability and willingness to act as a role model</CheckItem>
              <CheckItem>Impact on community, industry, or society at large</CheckItem>
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
              If you believe that you, or somebody you know deserves one of the Awards, then please 
              complete the online nomination form. You will be required to complete the following details:
            </p>
            <p className="text-white/70 text-sm italic">
              All nominations are treated in confidence and only seen by the judging panel.
            </p>
          </div>

          {/* Middle column - Items 1-4 */}
          <div className="space-y-6">
            <NumberedItem number={1}>
              The track record of the candidate within her current and previous organisations.
            </NumberedItem>
            <NumberedItem number={2}>
              Her key achievements to date.
            </NumberedItem>
            <NumberedItem number={3}>
              A sense of the candidate&apos;s vision/plans for the future, both personally and for the organisation 
              she works. What makes her special?
            </NumberedItem>
            <NumberedItem number={4}>
              A 50-word biography for use in the awards programme should the candidate be shortlisted. 
              This may be edited by our editorial team.
            </NumberedItem>
          </div>

          {/* Right column - Items 5-7 and notice */}
          <div className="space-y-6">
            <NumberedItem number={5}>
              High quality photo of nominee (2MB JPEG).
            </NumberedItem>
            <NumberedItem number={6}>
              Curriculum Vitae.
            </NumberedItem>
            <NumberedItem number={7}>
              Supporting submission material. For example LinkedIn profile, statements of recommendation, 
              relevant press coverage.
            </NumberedItem>
            
            {/* Important notice box */}
            <div className="border border-[#D4AF37] p-4 mt-8 rounded-lg bg-white/5">
              <p className="text-white/90 text-sm">
                It is essential that both nominee and nominator are aware of the terms & conditions of the 
                nomination and that both parties are aware that the submission has been made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ data
const faqData = [
  {
    question: "CAN I SUBMIT MY NOMINATION AT MIDNIGHT ON THE DEADLINE?",
    answer: "Yes, but we would always advise you to leave plenty of time before the deadline – this allows us to assist with any issues in a timely manner before the shortlisting process begins. Please be aware that we are unable to offer technical assistance outside of office hours."
  },
  {
    question: "I DON'T HAVE A CV/A HIGH RESOLUTION PHOTO – WHAT SHOULD I DO?",
    answer: "While a CV and high-resolution photo are preferred, you can still submit your nomination. Please provide as much relevant information as possible about the nominee's achievements and background. You can submit additional materials at a later date if needed."
  },
  {
    question: "CAN I INCLUDE A WEBSITE/VIDEO/ONLINE PROFILE TO MY ENTRY?",
    answer: "Yes, you can include links to relevant websites, videos, and online profiles as supporting material for your nomination. These can help demonstrate the nominee's achievements and impact."
  },
  {
    question: "CAN I ATTACH MORE THAN 10 PAGES OF SUPPORTING MATERIAL?",
    answer: "We recommend keeping supporting materials concise and relevant. While there is no strict limit, our judges appreciate clear and focused submissions. Please include only the most pertinent information."
  },
  {
    question: "CAN I GIVE YOU THE CONTACT DETAILS OF THE PEOPLE PROVIDING MY REFERENCES?",
    answer: "We prefer to receive written testimonials or letters of recommendation with your submission. This ensures we have all necessary information during the judging process. However, you may provide contact details as supplementary information."
  },
  {
    question: "I AM NOT SURE WHAT CATEGORY I SHOULD ENTER, WHAT SHOULD I DO?",
    answer: "Review the category descriptions on our Award Categories page to find the best fit. If you're still unsure, contact our team for guidance. You may also submit nominations into multiple categories if appropriate."
  }
];

// FAQ Item Component
function FAQItem({ question, answer, isOpen, onClick }: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void 
}) {
  return (
    <div className="border-b border-pink-200">
      <button
        className="w-full py-4 flex items-center justify-between text-left"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-[#6B2D5B] font-medium pr-4">{question}</span>
        <span className="flex-shrink-0 text-[#C41E7F]">
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-600 font-serif">{answer}</p>
        </div>
      )}
    </div>
  );
}

// FAQs Section
function FAQsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#C41E7F] text-center mb-12 font-bold">
          Frequently Asked Questions
        </h2>
        <div>
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={`${index + 1}. ${faq.question}`}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Nominee&apos;s Full Name *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Nominee&apos;s Email *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization *</label>
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
    <section className="bg-gradient-to-r from-[#C41E7F] via-[#6B2D5B] to-[#2D1B4E] py-16 sm:py-20 relative overflow-hidden">
      {/* Sparkle decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-10 right-1/4 w-3 h-3 bg-[#D4AF37] rounded-full animate-pulse delay-300"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white mb-4 font-bold">
          Ready to Nominate a Trailblazer?
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Don&apos;t miss the opportunity to recognize extraordinary women making a difference
        </p>
        <a
          href="#nomination-form"
          className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#6B2D5B] font-bold px-8 py-4 rounded-full hover:bg-white transition-colors text-lg shadow-xl"
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
              alt="SIMATS Engineering" 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-[#C41E7F] font-bold">SIMATS Engineering</div>
              <div className="text-gray-500 text-sm">Excellence in Education</div>
            </div>
          </div>
          
          {/* TOI Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/toi.png" 
              alt="Times of India" 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-[#E31837] font-bold">Times of India</div>
              <div className="text-gray-500 text-sm">India&apos;s Leading Daily</div>
            </div>
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
              between SIMATS Engineering and Times of India.
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
              <p>SIMATS Engineering Campus</p>
              <p>Chennai, Tamil Nadu, India</p>
              <p>Email: awards@simats.edu.in</p>
              <p>Phone: +91 44 2745 1234</p>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Women&apos;s Day Achievement Awards. SIMATS Engineering & Times of India. All rights reserved.</p>
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
        <FAQsSection />
        <CTASection />
      </main>

      <PartnershipBanner />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
