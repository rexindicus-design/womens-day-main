"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Menu,
  X,
  Check,
  ChevronUp,
  Trophy,
  Star,
  Upload,
  User,
  FileText,
  Building,
  Calendar,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";

// Navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Register", href: "/register", active: true },
];

// Award categories (from categories page)
const awardCategories = [
  "Healthcare Excellence",
  "STEM Research & Applied Innovation",
  "Women in Education Transformation",
  "Women in Sustainability & Climate Action",
  "Women in Tech & Management Leadership",
  "Sports",
  "Woman Entrepreneur of the Year(All Industries)",
  "Woman Founder – DeepTech/IP-led Innovation",
  "Grassroots Woman Social Changemaker",
  "Star – Indian Cinema, Television",
  "Excellence in Music (Carnatic / Film)",
  "Excellence in Dance & Performing Arts(Bharatanatyam / Folk / Theatre)",
  "SIMATS Life Time Achievement Award",
  "Others",
];

// Sector/Industry options
const sectorOptions = [
  "Healthcare & Hospitals / Public Health",
  "IT / Software / Digital & GCCs",
  "Manufacturing (Auto, Electronics, Industrial, Engineering)",
  "Textiles, Apparel & Tiruppur Ecosystem",
  "Education (Schools / Higher Ed / EdTech)",
  "Pharma, Life Sciences & Biotechnology",
  "FMCG / Food Processing / Dairy",
  "Retail, D2C & E-commerce",
  "Sustainability / CleanTech / Renewable Energy",
  "Media, Entertainment & Performing Arts",
  "Other",
];

// Pan-India Cities/Districts (sample major cities, can be expanded as needed)
const panIndiaCities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Vadodara",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Allahabad",
  "Ranchi",
  "Howrah",
  "Gwalior",
  "Jabalpur",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
  "Guwahati",
  "Chandigarh",
  "Solapur",
  "Hubli–Dharwad",
  "Mysore",
  "Tiruchirappalli",
  "Bareilly",
  "Aligarh",
  "Tiruppur",
  "Moradabad",
  "Jalandhar",
  "Bhubaneswar",
  "Salem",
  "Warangal",
  "Guntur",
  "Bhiwandi",
  "Saharanpur",
  "Gorakhpur",
  "Bikaner",
  "Amravati",
  "Noida",
  "Jamshedpur",
  "Bhilai",
  "Cuttack",
  "Firozabad",
  "Kochi",
  "Nellore",
  "Bhavnagar",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Rourkela",
  "Nanded",
  "Kolhapur",
  "Ajmer",
  "Akola",
  "Gulbarga",
  "Jamnagar",
  "Ujjain",
  "Loni",
  "Siliguri",
  "Jhansi",
  "Ulhasnagar",
  "Jammu",
  "Sangli-Miraj & Kupwad",
  "Mangalore",
  "Erode",
  "Belgaum",
  "Kurnool",
  "Kozhikode",
  "Udaipur",
  "Maheshtala",
  "Davanagere",
  "Kamarhati",
  "South Dumdum",
  "Tirunelveli",
  "Malegaon",
  "Gaya",
  "Tirupati",
  "Dharwad",
  "Other",
];

// News ticker items
const newsTickerItems = [
  "🏆 Nominations Open: Women's Day Achievement Awards 2026",
  "📅 Event Date: March 8, 2026 at SIMATS Campus",
  "🎓 SIMATS (Saveetha Institute of Medical and Technical Sciences) celebrates 25 years of excellence",
  "📰 Times of India - India's leading English daily partners for Awards",
  "📅 The last date for nomination is 23rd February 2026",
];

// Word count helper function
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

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
       <div className="h-8 sm:h-10 w-px bg-gray-300"></div>
      
      <div className="flex items-center gap-2">
        <img 
          src="/simats.png" 
          alt="SIMATS" 
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
        />
        <div className="hidden sm:block">
          <div className="text-[#C41E7F] font-bold text-sm leading-tight">SIMATS</div>
          <div className="text-gray-500 text-xs">Saveetha Institute of Medical and Technical Sciences</div>
        </div>
      </div>
      <div className="h-8 sm:h-10 w-px bg-gray-300"></div>
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

          <button
            className="xl:hidden p-2 text-gray-600 hover:text-[#C41E7F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

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

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative h-[200px] sm:h-[250px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#C41E7F]/80 via-[#6B2D5B]/70 to-[#2D1B4E]/60"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-2xl">
            <div className="border-4 border-[#D4AF37] px-6 sm:px-10 py-5 sm:py-8 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#D4AF37]" />
                <Star className="w-5 h-5 text-[#D4AF37]" />
                <Star className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-[#C41E7F] text-center">
                NOMINATION<br/>REGISTRATION
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section Header Component
function SectionHeader({ number, title, bgColor = "bg-[#D4AF37]" }: { number: number; title: string; bgColor?: string }) {
  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-t-xl font-bold text-lg flex items-center gap-3`}>
      <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">Section {number}</span>
      {title}
    </div>
  );
}

// Form Field Label Component
function FieldLabel({ label, required = false, hint }: { label: string; required?: boolean; hint?: string }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
      {hint && <span className="text-gray-400 font-normal ml-2">({hint})</span>}
    </label>
  );
}

// Word Count Display Component
function WordCount({ current, max, exceeded }: { current: number; max: number; exceeded: boolean }) {
  return (
    <div className={`text-xs mt-1 flex items-center gap-1 ${exceeded ? "text-red-500" : "text-gray-400"}`}>
      {exceeded && <AlertCircle className="w-3 h-3" />}
      {current}/{max} words {exceeded && "- Exceeds limit!"}
    </div>
  );
}

// Attachment Upload Component
function AttachmentField({ 
  index, 
  attachment, 
  onChange 
}: { 
  index: number; 
  attachment: { name: string; file: File | null; link: string }; 
  onChange: (field: string, value: string | File | null) => void;
}) {
  return (
    <div className="border border-pink-100 rounded-xl p-4 bg-pink-50/30">
      <div className="font-medium text-[#6B2D5B] mb-3">Attachment {index + 1}</div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">a) Name of document</label>
          <input
            type="text"
            value={attachment.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent text-sm"
            placeholder="Document name"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">b) Upload file</label>
          <label className="flex items-center gap-2 px-3 py-2 border border-pink-200 rounded-lg cursor-pointer hover:bg-pink-50 transition-colors text-sm">
            <Upload className="w-4 h-4 text-[#C41E7F]" />
            <span className="text-gray-500 truncate">
              {attachment.file ? attachment.file.name : "Choose file"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => onChange("file", e.target.files?.[0] || null)}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">c) Paste a link</label>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="url"
              value={attachment.link}
              onChange={(e) => onChange("link", e.target.value)}
              className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent text-sm"
              placeholder="https://"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Form interface
interface FormData {
  // Section 0
  category: string;
  // Section 1: Participant Info
  nomineeName: string;
  gender: string;
  dateOfBirth: string;
  mobileNumber: string;
  emailId: string;
  cityDistrict: string;
  designation: string;
  organization: string;
  officeAddress: string;
  yearsInOrg: string;
  yearsInDesignation: string;
  yearOfIncorporation: string;
  revenue: string;
  websiteUrl: string;
  socialMediaLinks: string;
  // Section 2: Case Study
  sector: string;
  otherSector: string;
  initiativeTitle: string;
  startDate: string;
  endDate: string;
  innovationDescription: string;
  outcomesAchieved: string;
  executionLeadership: string;
  sustainScale: string;
  // Section 4: Declaration
  declarationAccepted: boolean;
}

// Main Registration Form Component
function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    // Section 0
    category: "",
    // Section 1
    nomineeName: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: "",
    emailId: "",
    cityDistrict: "",
    designation: "",
    organization: "",
    officeAddress: "",
    yearsInOrg: "",
    yearsInDesignation: "",
    yearOfIncorporation: "",
    revenue: "",
    websiteUrl: "",
    socialMediaLinks: "",
    // Section 2
    sector: "",
    otherSector: "",
    initiativeTitle: "",
    startDate: "",
    endDate: "",
    innovationDescription: "",
    outcomesAchieved: "",
    executionLeadership: "",
    sustainScale: "",
    // Section 4
    declarationAccepted: false,
  });

  const [attachments, setAttachments] = useState([
    { name: "", file: null as File | null, link: "" },
    { name: "", file: null as File | null, link: "" },
    { name: "", file: null as File | null, link: "" },
    { name: "", file: null as File | null, link: "" },
    { name: "", file: null as File | null, link: "" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Word counts
  const wordCounts = {
    innovationDescription: countWords(formData.innovationDescription),
    outcomesAchieved: countWords(formData.outcomesAchieved),
    executionLeadership: countWords(formData.executionLeadership),
    sustainScale: countWords(formData.sustainScale),
  };

  const wordLimits = {
    innovationDescription: 180,
    outcomesAchieved: 200,
    executionLeadership: 180,
    sustainScale: 150,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAttachmentChange = (index: number, field: string, value: string | File | null) => {
    setAttachments(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const validateForm = useCallback((): string[] => {
    const validationErrors: string[] = [];

    // Required fields validation
    if (!formData.category) validationErrors.push("Category is required");
    if (!formData.nomineeName) validationErrors.push("Nominee Name is required");
    if (!formData.mobileNumber) validationErrors.push("Mobile Number is required");
    if (!formData.emailId) validationErrors.push("Email ID is required");
    if (!formData.cityDistrict) validationErrors.push("City & District is required");
    if (!formData.designation) validationErrors.push("Designation is required");
    if (!formData.organization) validationErrors.push("Organization is required");
    if (!formData.sector) validationErrors.push("Sector/Industry is required");
    if (!formData.initiativeTitle) validationErrors.push("Title of Innovation/Initiative is required");
    if (!formData.startDate) validationErrors.push("Initiative Start Date is required");
    if (!formData.endDate) validationErrors.push("Initiative End Date is required");
    if (!formData.innovationDescription) validationErrors.push("Innovation description is required");
    if (!formData.outcomesAchieved) validationErrors.push("Outcomes achieved is required");
    if (!formData.executionLeadership) validationErrors.push("Execution & leadership description is required");
    if (!formData.declarationAccepted) validationErrors.push("You must accept the declaration to submit");

    // Word limit validation
    if (wordCounts.innovationDescription > wordLimits.innovationDescription) {
      validationErrors.push(`Innovation description exceeds ${wordLimits.innovationDescription} word limit`);
    }
    if (wordCounts.outcomesAchieved > wordLimits.outcomesAchieved) {
      validationErrors.push(`Outcomes achieved exceeds ${wordLimits.outcomesAchieved} word limit`);
    }
    if (wordCounts.executionLeadership > wordLimits.executionLeadership) {
      validationErrors.push(`Execution & leadership exceeds ${wordLimits.executionLeadership} word limit`);
    }
    if (wordCounts.sustainScale > wordLimits.sustainScale) {
      validationErrors.push(`Sustain & scale exceeds ${wordLimits.sustainScale} word limit`);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.emailId && !emailRegex.test(formData.emailId)) {
      validationErrors.push("Please enter a valid email address");
    }

    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (formData.mobileNumber && !phoneRegex.test(formData.mobileNumber)) {
      validationErrors.push("Please enter a valid mobile number");
    }

    // File size and type validation (5MB per file)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
    let totalFileSize = 0;

    let atLeastOneAttachment = false;
    attachments.forEach((attachment, index) => {
      // Require at least one of file or link for each attachment
      if (attachment.file || (attachment.link && attachment.link.trim() !== "")) {
        atLeastOneAttachment = true;
      }
      // If file is present, validate type and size
      if (attachment.file) {
        const fileExtension = '.' + attachment.file.name.split('.').pop()?.toLowerCase();
        if (!allowedTypes.includes(attachment.file.type) && !allowedExtensions.includes(fileExtension)) {
          validationErrors.push(`Attachment ${index + 1}: Only PDF, JPG, JPEG, PNG files are allowed`);
        }
        if (attachment.file.size > 5 * 1024 * 1024) {
          validationErrors.push(`Attachment ${index + 1} exceeds 5MB limit`);
        }
      }
    });
    if (!atLeastOneAttachment) {
      validationErrors.push("At least one supporting document (file upload or link) is required.");
    }


    return validationErrors;
  }, [formData, wordCounts, wordLimits, attachments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors([]);
    setIsSubmitting(true);
    
    try {
      // Prepare attachments data (name and link for initial submission)
      const attachmentData = attachments
        .filter(a => a.name || a.link || a.file)
        .map(a => ({ name: a.name, link: a.link }));

      // Submit form data to API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          attachments: attachmentData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from server
        if (result.errors && Array.isArray(result.errors)) {
          setErrors(result.errors);
        } else {
          setErrors([result.error || 'Failed to submit nomination. Please try again.']);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Upload files if any exist
      const hasFiles = attachments.some(a => a.file !== null);
      if (hasFiles && result.nominationId) {
        const uploadFormData = new FormData();
        uploadFormData.append('nominationId', result.nominationId.toString());
        
        attachments.forEach((attachment, index) => {
          if (attachment.file) {
            uploadFormData.append(`file_${index}`, attachment.file);
          }
          uploadFormData.append(`name_${index}`, attachment.name);
          uploadFormData.append(`link_${index}`, attachment.link);
        });

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          console.warn('File upload warning:', uploadResult.error);
          // Don't fail the whole submission, just log the warning
        }
      }

      // Success
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(['Network error. Please check your connection and try again.']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-pink-100">
            <div className="w-20 h-20 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#C41E7F] mb-4">Registration Submitted Successfully!</h3>
            <p className="text-gray-600 text-lg mb-6">
              Thank you for your nomination. We have received your application and will review it shortly.
              You will receive a confirmation email at {formData.emailId}.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white font-bold px-8 py-4 rounded-full hover:shadow-lg transition-all"
            >
              Return to Home
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-4 sm:pt-6 pb-12 sm:pb-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Header */}
        <div className="text-center mb-10">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="mx-auto mb-6 w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain drop-shadow-lg"
          />
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            SIMATS EmpowerHER Awards 2026
            <Star className="w-4 h-4" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#C41E7F] font-bold mb-4">
            Nomination Registration Form
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete all sections below. Fields marked with <span className="text-red-500">*</span> are mandatory.
          </p>
        </div>

        {/* Error Display */}
        {errors.length > 0 && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-2 text-red-700 font-bold mb-3">
              <AlertCircle className="w-5 h-5" />
              Please fix the following errors:
            </div>
            <ul className="list-disc list-inside text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Choose Category */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
            <SectionHeader number={0} title="Choose Category" bgColor="bg-[#C41E7F]" />
            <div className="p-6">
              <FieldLabel label="Category applying for" required />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent bg-white"
              >
                <option value="">Select a category</option>
                {awardCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Participant Information */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
            <SectionHeader number={1} title="Participant Information" bgColor="bg-[#D4AF37]" />
            <div className="p-6 space-y-6">
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel label="Nominee Name" required />
                  <input
                    type="text"
                    name="nomineeName"
                    value={formData.nomineeName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <FieldLabel label="Gender" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent bg-white"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel label="Date of Birth" hint="DD/MM/YYYY" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                  />
                </div>
                <div>
                  <FieldLabel label="Mobile Number" required />
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel label="Email ID" required />
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <FieldLabel label="City & District (Pan-India)" required />
                  <select
                    name="cityDistrict"
                    value={formData.cityDistrict}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent bg-white"
                  >
                    <option value="">Select city/district</option>
                    {panIndiaCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel label="Current Designation / Role Title" required />
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="e.g., CEO, Director, Professor"
                  />
                </div>
                <div>
                  <FieldLabel label="Organization / Company / Institution / Freelancer" required />
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="Organization name"
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div>
                <FieldLabel label="Office Address" />
                <textarea
                  name="officeAddress"
                  value={formData.officeAddress}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent resize-none"
                  placeholder="Full office address"
                />
              </div>

              {/* Row 6 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel label="Years of experience in current organisation" />
                  <input
                    type="number"
                    name="yearsInOrg"
                    value={formData.yearsInOrg}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="e.g., 5"
                    min="0"
                  />
                </div>
                <div>
                  <FieldLabel label="Years at same designation" />
                  <input
                    type="number"
                    name="yearsInDesignation"
                    value={formData.yearsInDesignation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="e.g., 3"
                    min="0"
                  />
                </div>
              </div>

              {/* Row 7 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel label="Year of Incorporation" hint="For businesses/Start-ups/Others" />
                  <input
                    type="number"
                    name="yearOfIncorporation"
                    value={formData.yearOfIncorporation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="e.g., 2015"
                    min="1900"
                    max="2026"
                  />
                </div>
                <div>
                  <FieldLabel label="Revenue as on March 31, 2025" hint="If applicable" />
                  <input
                    type="text"
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="e.g., ₹10 Crores"
                  />
                </div>
              </div>

              {/* Row 8 */}
              <div>
                <FieldLabel label="Website URL" />
                <input
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                  placeholder="https://www.example.com"
                />
              </div>

              {/* Row 9 */}
              <div>
                <FieldLabel label="Social Media Links" hint="Instagram / Twitter / Facebook / YouTube / LinkedIn" />
                <textarea
                  name="socialMediaLinks"
                  value={formData.socialMediaLinks}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent resize-none"
                  placeholder="Paste your social media profile links (one per line)"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Case Study */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
            <SectionHeader number={2} title="Case Study Section" bgColor="bg-[#6B2D5B]" />
            <div className="p-6 space-y-6">
              {/* Sector Selection */}
              <div>
                <FieldLabel label="Select the relevant Sector / Industry" required />
                <select
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent bg-white"
                >
                  <option value="">Select sector/industry</option>
                  {sectorOptions.map((sector) => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </select>
              </div>

              {formData.sector === "Other" && (
                <div>
                  <FieldLabel label="Please specify sector" required />
                  <input
                    type="text"
                    name="otherSector"
                    value={formData.otherSector}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                    placeholder="Specify your sector"
                  />
                </div>
              )}

              {/* Initiative Title */}
              <div>
                <FieldLabel label="Title of Innovation / Work / Initiative" required />
                <input
                  type="text"
                  name="initiativeTitle"
                  value={formData.initiativeTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                  placeholder="Enter the title of your innovation/initiative"
                />
              </div>

              {/* Date Range */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel label="Initiative Start Date" required hint="DD/MM/YYYY" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                  />
                </div>
                <div>
                  <FieldLabel label="Initiative End Date" required hint="DD/MM/YYYY" />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Text Areas with Word Limits */}
              <div>
                <FieldLabel 
                  label="Describe the innovative/initiative/achievement taken by you and highlight the uniqueness" 
                  required 
                  hint={`max ${wordLimits.innovationDescription} words`}
                />
                <p className="text-xs text-gray-500 mb-2">
                  (New approach/process, new tech, new model, unique collaboration, breakthrough creativity, first-of-its-kind, measurable improvement over existing.)
                </p>
                <textarea
                  name="innovationDescription"
                  value={formData.innovationDescription}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent resize-none ${
                    wordCounts.innovationDescription > wordLimits.innovationDescription 
                      ? "border-red-400 bg-red-50" 
                      : "border-pink-200"
                  }`}
                  placeholder="Describe your innovation/initiative..."
                />
                <WordCount 
                  current={wordCounts.innovationDescription} 
                  max={wordLimits.innovationDescription} 
                  exceeded={wordCounts.innovationDescription > wordLimits.innovationDescription}
                />
              </div>

              <div>
                <FieldLabel 
                  label="What outcomes were achieved and highlight the beneficiary?" 
                  required 
                  hint={`max ${wordLimits.outcomesAchieved} words`}
                />
                <p className="text-xs text-gray-500 mb-2">
                  (Quantify results—revenue, cost savings, efficiency, jobs created, patients served, student outcomes, production gains, emission reduction, reach, etc.)
                </p>
                <textarea
                  name="outcomesAchieved"
                  value={formData.outcomesAchieved}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent resize-none ${
                    wordCounts.outcomesAchieved > wordLimits.outcomesAchieved 
                      ? "border-red-400 bg-red-50" 
                      : "border-pink-200"
                  }`}
                  placeholder="Describe the outcomes achieved..."
                />
                <WordCount 
                  current={wordCounts.outcomesAchieved} 
                  max={wordLimits.outcomesAchieved} 
                  exceeded={wordCounts.outcomesAchieved > wordLimits.outcomesAchieved}
                />
              </div>

              <div>
                <FieldLabel 
                  label="How did you execute and lead, key challenges that you resolved?" 
                  required 
                  hint={`max ${wordLimits.executionLeadership} words`}
                />
                <p className="text-xs text-gray-500 mb-2 italic">
                  (Stakeholders, cross-functional leadership, resources, decision-making, governance, timelines.)
                </p>
                <textarea
                  name="executionLeadership"
                  value={formData.executionLeadership}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent resize-none ${
                    wordCounts.executionLeadership > wordLimits.executionLeadership 
                      ? "border-red-400 bg-red-50" 
                      : "border-pink-200"
                  }`}
                  placeholder="Describe your execution and leadership..."
                />
                <WordCount 
                  current={wordCounts.executionLeadership} 
                  max={wordLimits.executionLeadership} 
                  exceeded={wordCounts.executionLeadership > wordLimits.executionLeadership}
                />
              </div>

              <div>
                <FieldLabel 
                  label="How will the impact sustain and scale over the next 12–24 months?" 
                  hint={`max ${wordLimits.sustainScale} words`}
                />
                <p className="text-xs text-gray-500 mb-2">
                  (Systems, funding, SOPs, adoption plan, institutionalization, capacity building.)
                </p>
                <textarea
                  name="sustainScale"
                  value={formData.sustainScale}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#C41E7F] focus:border-transparent resize-none ${
                    wordCounts.sustainScale > wordLimits.sustainScale 
                      ? "border-red-400 bg-red-50" 
                      : "border-pink-200"
                  }`}
                  placeholder="Describe how the impact will sustain and scale..."
                />
                <WordCount 
                  current={wordCounts.sustainScale} 
                  max={wordLimits.sustainScale} 
                  exceeded={wordCounts.sustainScale > wordLimits.sustainScale}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Supporting Documents */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
            <SectionHeader number={3} title="Supporting Documents" bgColor="bg-[#C41E7F]" />
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-amber-800 text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Supported formats: JPEG, JPG, PNG, PDF. Maximum size per file: 5MB.
                </p>
                <p className="text-amber-700 text-xs mt-1">
                  Please refer to the sample guidelines for each category and upload the documents accordingly, ensuring files are appropriately named.
                  Entries must submit a minimum of 1 proof of role and a minimum of 2 evidence documents/links and Nominee Photo.
                </p>
              </div>

              {attachments.map((attachment, index) => (
                <AttachmentField
                  key={index}
                  index={index}
                  attachment={attachment}
                  onChange={(field, value) => handleAttachmentChange(index, field, value)}
                />
              ))}
            </div>
          </div>

          {/* Section 5: Declaration */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
            <SectionHeader number={4} title="Declaration" bgColor="bg-[#2D1B4E]" />
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 space-y-4">
                <p>
                  I/We, for and on behalf of my/our organization, declare that we have read and understood the rules and regulations governing the Awards and voluntarily express our interest in participating in the Awards.
                </p>
                <p>
                  I/We declare that all information submitted as part of our application is complete, true, and accurate. We understand that any misrepresentation/false claims may lead to disqualification at any stage of evaluation.
                </p>
                <p>
                  I/We declare that the participating entity and its promoters/key managerial personnel are not subject to any litigations, disqualifications, or adverse orders by any court of law or regulatory authority that could impact eligibility for the Awards.
                </p>
                <p>
                  We authorize the Awards Management/BCCL to use the content submitted as part of our entry, in whole or in part, for purposes including (but not limited to) evaluation, event communication, trade publications, press releases, electronic posting on the Awards website, electronic hyperlinks to the Participant&apos;s website, and any display format selected by the Awards Management during or after the Awards event.
                </p>
                <p>
                  I/We further agree that the decision of the Jury/Awards Management/BCCL shall be final and binding. I/We shall not raise any claims or initiate any action against BCCL, its affiliates, directors, management, employees, agents, or authorized representatives in relation to participation, selection, shortlisting, or winning. Any public statements/claims (including on social media) that misrepresent the Awards process may lead to disqualification.
                </p>
              </div>

              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="declarationAccepted"
                    checked={formData.declarationAccepted}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-[#C41E7F] border-pink-300 rounded focus:ring-[#C41E7F]"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    I/We agree to all the above declarations and terms. <span className="text-red-500">*</span>
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-2 ml-8">
                  (This checkbox must be ticked to submit the form)
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formData.declarationAccepted}
              className="w-full max-w-md bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white font-bold py-4 px-12 rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Trophy className="w-6 h-6" />
                  Submit Nomination
                </>
              )}
            </button>
          </div>
        </form>
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
          <div className="flex items-center gap-3">
            <img 
              src="/simats.png" 
              alt="SIMATS" 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-[#C41E7F] font-bold">SIMATS</div>
              <div className="text-gray-500 text-sm">Excellence in Education</div>
            </div>
          </div>
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
    <footer className="bg-gradient-to-br from-[#6B2D5B] to-[#2D1B4E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#D4AF37]">About the Awards</h3>
            <p className="text-white/70 text-sm">
              The Women&apos;s Day Achievement Awards celebrate extraordinary women who are making 
              a difference in Technology, Research, and Social Impact.
            </p>
          </div>
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
          <p>&copy; {new Date().getFullYear()} Women&apos;s Day Achievement Awards. SIMATS & Times of India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Register Page Component
export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NewsTicker />
      <NavigationHeader />
      
      <main className="flex-1">
        <HeroSection />
        <RegistrationForm />
      </main>

      <PartnershipBanner />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
