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
  { name: "Register", href: "#register", active: true },
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
       {/* TOI Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="/TOI1.png" 
          alt="Times of India" 
          className="w-16 h-20 sm:w-40 sm:h-20 object-contain"
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
      <div className="font-medium text-[#6B2D5B] mb-3">
        Attachment {index + 1}
        {index === 0 && <span className="text-red-500 ml-1">*</span>}
      </div>
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

  // LocalStorage keys
  const FORM_DATA_KEY = "registerFormData";
  const ATTACHMENTS_KEY = "registerAttachments";

  // Restore form data and attachments from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Restore form data
      const savedForm = localStorage.getItem(FORM_DATA_KEY);
      const initialFormData: FormData = savedForm ? JSON.parse(savedForm) : {
        category: "",
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
        sector: "",
        otherSector: "",
        initiativeTitle: "",
        startDate: "",
        endDate: "",
        innovationDescription: "",
        outcomesAchieved: "",
        executionLeadership: "",
        sustainScale: "",
        declarationAccepted: false,
      };
      setFormData(initialFormData);

      // Restore attachments (files cannot be restored, only name/link)
      const savedAttachments = localStorage.getItem(ATTACHMENTS_KEY);
      let initialAttachments = [
        { name: "", file: null as File | null, link: "" },
        { name: "", file: null as File | null, link: "" },
        { name: "", file: null as File | null, link: "" },
        { name: "", file: null as File | null, link: "" },
        { name: "", file: null as File | null, link: "" },
      ];
      if (savedAttachments) {
        try {
          const parsed = JSON.parse(savedAttachments);
          initialAttachments = initialAttachments.map((a, i) => ({
            ...a,
            name: parsed[i]?.name || "",
            link: parsed[i]?.link || "",
          }));
        } catch {}
      }
      setAttachments(initialAttachments);
    }
  }, []);

  const [formData, setFormData] = useState<FormData>({
    category: "",
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
    sector: "",
    otherSector: "",
    initiativeTitle: "",
    startDate: "",
    endDate: "",
    innovationDescription: "",
    outcomesAchieved: "",
    executionLeadership: "",
    sustainScale: "",
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
  const [showModal, setShowModal] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [modalAgreed, setModalAgreed] = useState(false);

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
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value
      };
      // Persist to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(FORM_DATA_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleAttachmentChange = (index: number, field: string, value: string | File | null) => {
    setAttachments(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      // Only persist name and link (not file)
      if (typeof window !== "undefined") {
        const persist = updated.map(a => ({ name: a.name, link: a.link }));
        localStorage.setItem(ATTACHMENTS_KEY, JSON.stringify(persist));
      }
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

    // Attachment 1 (index 0) is mandatory
    const attachment1 = attachments[0];
    if (!(attachment1.file || (attachment1.link && attachment1.link.trim() !== ""))) {
      validationErrors.push("Attachment 1 (Supporting Document) is mandatory.");
    }
    attachments.forEach((attachment, index) => {
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
    // Show modal instead of submitting directly
    setShowModal(true);
    setHasScrolledToBottom(false);
    setModalAgreed(false);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setShowModal(false);
    
    // User has agreed to T&C via modal, set declarationAccepted to true
    const submissionData = {
      ...formData,
      declarationAccepted: true,
    };
    
    try {
      // Prepare attachments data (name and link for initial submission)
      const attachmentData = attachments
        .filter(a => a.name || a.link || a.file)
        .map(a => ({ name: a.name, link: a.link }));

      // Submit form data to API
      const response = await fetch('/api#register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submissionData,
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

      // Success: clear localStorage for form and attachments
      if (typeof window !== "undefined") {
        localStorage.removeItem(FORM_DATA_KEY);
        localStorage.removeItem(ATTACHMENTS_KEY);
      }
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(['Network error. Please check your connection and try again.']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 50;
    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
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
              <div className="flex justify-center">
                <p className="text-3xl font-bold text-center">closed</p>
              </div>
      </div>
    </section>
  );
}

// Partnership Banner
function PartnershipBanner() {
  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-8 border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
