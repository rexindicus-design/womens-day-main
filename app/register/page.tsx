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
      const response = await fetch('/api/register', {
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
            <SectionHeader number={1} title="Choose Category" bgColor="bg-[#C41E7F]" />
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
            <SectionHeader number={2} title="Participant Information" bgColor="bg-[#D4AF37]" />
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
                    <option value="Male" disabled>Male</option>
                    <option value="Female">Female</option>
                    <option value="Others" disabled>Others</option>
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
                    max="2026-12-31"
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
            <SectionHeader number={3} title="Case Study Section" bgColor="bg-[#6B2D5B]" />
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
            <SectionHeader number={4} title="Supporting Documents" bgColor="bg-[#C41E7F]" />
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
            <SectionHeader number={5} title="Declaration" bgColor="bg-[#2D1B4E]" />
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
              <div className="pt-2">
                <p className="text-sm text-gray-600 italic">
                  By clicking "Submit Nomination" below, you will be asked to review and accept the full Terms and Conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white px-6 py-4 rounded-t-2xl">
                  <h3 className="text-2xl font-bold">SIMATS EmpowerHER Awards 2026 - Terms &amp; Conditions</h3>
                  <p className="text-sm text-white/90 mt-1">Please read and scroll to the bottom to continue</p>
                </div>

                {/* Modal Content - Scrollable */}
                <div 
                  className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-gray-700"
                  onScroll={handleModalScroll}
                >
                  {/* Section 1: Definition */}
                  <div>
                    <h3 className="font-bold text-lg text-[#C41E7F] mb-3">1. Definition</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-[#6a11cb] text-white">
                            <th className="border border-gray-300 px-3 py-2 text-left">Term</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-gray-300 px-3 py-2 font-medium">Listing</td><td className="border border-gray-300 px-3 py-2">SIMATS EmpowerHER Awards 2026</td></tr>
                          <tr><td className="border border-gray-300 px-3 py-2 font-medium">Management</td><td className="border border-gray-300 px-3 py-2">Bennett Coleman &amp; Co. Ltd / or organizers are responsible for the overall conduct of the listing</td></tr>
                          <tr><td className="border border-gray-300 px-3 py-2 font-medium">Participant</td><td className="border border-gray-300 px-3 py-2">Women professionals, entrepreneurs, and artists residing in India since the past two years as on December 31, 2025 are eligible to participate.</td></tr>
                          <tr><td className="border border-gray-300 px-3 py-2 font-medium">Jury</td><td className="border border-gray-300 px-3 py-2">A group of experts identified by Management for evaluation/review of the entries based on pre-defined evaluation parameters.</td></tr>
                          <tr><td className="border border-gray-300 px-3 py-2 font-medium">Terms and conditions</td><td className="border border-gray-300 px-3 py-2">The terms governing the listing, as may be amended from time to time by the Management.</td></tr>
                        <tr><td className="border border-gray-300 px-3 py-2 font-medium">Website and its T&C & Privacy</td><td className="border border-gray-300 px-3 py-2">“Insert website link” – To be updated</td></tr>
                          <tr><td className="border border-gray-300 px-3 py-2 font-medium">Contact ID</td><td className="border border-gray-300 px-3 py-2">“Insert Contact ID / Number” – to be updated</td></tr>
                        
                        </tbody>
                      </table>
                    </div>
                    <ul className="list-disc list-inside mt-3 space-y-2 text-gray-600">
                      <li><strong>1.1</strong> By participating in the Women Impact Awards 2026, the Participant agrees to abide by and be bound by these Terms.</li>
                      <li><strong>1.2</strong> These Terms may be modified without any prior written notification. Participant is advised to regularly review these Terms.</li>
                      <li><strong>1.3</strong> The process and gratification for the listing thereof may be changed/modified/split/merged/increased/decreased or cancelled by the Management based on the number and quality of entries received.</li>
                      <li><strong>1.4</strong> The management reserves the right to add or remove nominations in any category based on the quality of entries received in that category.</li>
                      <li><strong>1.5</strong> If no Participants are found to be worthy of inclusion by the Management, the reward may be cancelled. The decision of the Management in this regard will be final and binding. The Management will not entertain any queries in this regard.</li>
                    </ul>
                  </div>

                  {/* Section 2: Objective */}
                  <div>
                    <h3 className="font-bold text-lg text-[#C41E7F] mb-3">2. Objective of the Awards</h3>
                    <p>Recognise and honour women who have made significant contributions to the social, economic, cultural, scientific, or public development of India, reflecting the country&apos;s commitment to celebrating women professionals who are leading positive change.</p>
                  </div>

                  {/* Section 3: Eligibility */}
                  <div>
                    <h3 className="font-bold text-lg text-[#C41E7F] mb-3">3. Eligibility Criteria</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li><strong>3.1</strong> Woman professional/entrepreneur/artist residing in India since the past two years as on December 31, 2025 can participate.</li>
                      <li><strong>3.2</strong> The initiative/innovation applied for the awards should be implemented between January 01, 2024 to December 31, 2025 with sustained impact falling in the last two years.</li>
                      <li><strong>3.3</strong> Women professionals should be associated with the organisation for minimum two years as on December 31, 2025 and should produce an &apos;NOC&apos; from the organisation for participating in the awards.</li>
                      <li><strong>3.4</strong> Women entrepreneurs participating in the awards should be associated with the organisation for minimum three years as on December 31, 2025 with minimum 30% equity in the firm.</li>
                      <li><strong>3.5</strong> One nominee can apply for maximum two categories.</li>
                    </ul>
                  </div>

                  {/* Section 4: Winner Selection */}
                  <div>
                    <h3 className="font-bold text-lg text-[#C41E7F] mb-3">4. Winner Selection Process</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li><strong>4.1</strong> The entries that qualify based on the defined eligibility criteria shall be presented to the Jury. The decision by the Jury as confirmed by Management shall be final and binding.</li>
                      <li><strong>4.2</strong> The shortlisted entries as well as the winning entries may be featured or covered by the Management on the Website and/or any other platform/media at the sole discretion of the Management.</li>
                      <li><strong>4.3</strong> No correspondence of whatsoever nature relating to shortlisting of entries or selection of winning entries shall be entertained.</li>
                    </ul>
                  </div>
<div>
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">4. Categories</h3>

  {/* A) Professionals & Leaders */}
  <div className="mb-6">
    <h4 className="font-semibold text-[#C41E7F] mb-3">
      A) Professionals & Leaders (8 categories)
    </h4>

    <ul className="list-disc list-inside space-y-3 text-gray-600">

      <li>
        <strong>1) Women in Healthcare Excellence</strong> (Clinical / Hospital / Public Health)  
        <br />
        <strong>Definition:</strong> Recognizes a woman leading measurable improvements in care quality, patient safety, outcomes, or access.  
        <br />
        <strong>Who can apply?</strong> Doctors/nurses/administrators/public health leaders in India.
      </li>

      <li>
        <strong>2) Women in MedTech / HealthTech Innovator</strong>  
        <br />
        <strong>Definition:</strong> Built or deployed a tech solution improving diagnosis, care delivery, hospital operations, or health access.  
        <br />
        <strong>Who can apply?</strong> CTO/product owner/research lead; solution piloted/deployed in India.
      </li>

      <li>
        <strong>3) Women in STEM Research & Applied Innovation</strong>  
        <br />
        <strong>Definition:</strong> Researcher translating work into patents, publications, prototypes, or industry adoption.  
        <br />
        <strong>Who can apply?</strong> Academia/R&D labs/corporate R&D.
      </li>

      <li>
        <strong>4) Women in Education Transformation</strong>  
        <br />
        <strong>Definition:</strong> Improved learning outcomes, employability, or access (especially for girls/underserved).  
        <br />
        <strong>Who can apply?</strong> School/college leaders, edtech leaders, administrators, principals.
      </li>

      <li>
        <strong>5) Women in Manufacturing & Operations Excellence</strong>  
        <br />
        <strong>Definition:</strong> Excellence in plant leadership, quality, safety, lean, supply chain, productivity.  
        <br />
        <strong>Who can apply?</strong> Manufacturing/ops leaders in auto/ancillaries/textiles/electronics/chemicals etc.
      </li>

      <li>
        <strong>6) Women in Sustainability & Climate Action</strong>  
        <br />
        <strong>Definition:</strong> Measurable climate-positive outcomes (energy, water, waste, circularity, biodiversity).  
        <br />
        <strong>Who can apply?</strong> Corporate/NGO/entrepreneur/public sector.
      </li>

      <li>
        <strong>7) Women in Tech Management (AI, Data, Cyber, Product)</strong>  
        <br />
        <strong>Definition:</strong> Senior tech leader delivering business impact through technology programs.  
        <br />
        <strong>Who can apply?</strong> IT/ITES employees, GCCs, product managers, coders, professionals in product firms in India.
      </li>

      <li>
        <strong>8) Women Professional Innovator of the Year (Any Industry)</strong>  
        <br />
        <strong>Definition:</strong> Recognizes a woman professional delivering breakthrough innovation with measurable impact.  
        <br />
        <strong>Who can apply?</strong> Corporate professionals, leaders, engineers, consultants, teachers, clinicians, lawyers—any domain.
      </li>

    </ul>
  </div>

  {/* B) Entrepreneurs & MSMEs */}
  <div className="mb-6">
    <h4 className="font-semibold text-[#C41E7F] mb-3">
      B) Entrepreneurs & MSMEs (4 categories)
    </h4>

    <ul className="list-disc list-inside space-y-3 text-gray-600">

      <li>
        <strong>9) Women Entrepreneur of the Year</strong>  
        <br />
        <strong>Definition:</strong> Woman founder scaling business with strong revenue, sustainable operations, and job creation.  
        <br />
        <strong>Who can apply?</strong> Founder/co-founder operating 3+ years, revenue more than 500cr as on March 31, 2025.
      </li>

      <li>
        <strong>10) Women-led MSME Champion</strong>  
        <br />
        <strong>Definition:</strong> Celebrates MSME leadership demonstrating modernization, resilience, and employment impact.  
        <br />
        <strong>Who can apply?</strong> MSME owner operating 3+ years with upto 500cr revenue and valid MSME/Udhyam registration.
      </li>

      <li>
        <strong>11) Women Founder in DeepTech / IP-led Innovation</strong>  
        <br />
        <strong>Definition:</strong> Founder building defensible innovation with commercialization potential.  
        <br />
        <strong>Who can apply?</strong> Startups with minimum 100cr revenue, less than 10 years incorporation, valid DPIIT certificate.
      </li>

      <li>
        <strong>12) Grassroots Woman Social Changemaker</strong>  
        <br />
        <strong>Definition:</strong> Grassroots leader creating proven community outcomes.  
        <br />
        <strong>Who can apply?</strong> NGO leaders, SHG leaders, frontline leaders in India.
      </li>

    </ul>
  </div>

  {/* C) Arts, Culture & Entertainment */}
  <div>
    <h4 className="font-semibold text-[#C41E7F] mb-3">
      C) Arts, Culture & Entertainment (Celebrity-friendly)
    </h4>

    <ul className="list-disc list-inside space-y-3 text-gray-600">

      <li>
        <strong>13) Rising Star – Indian Cinema/OTT (Under 35)</strong>  
        <br />
        <strong>Definition:</strong> Recognizes breakthrough talent with standout work in last 12–24 months.  
        <br />
        <strong>Who can apply?</strong> Under 35 with at least one major credited work.
      </li>

      <li>
        <strong>14) Excellence in Music (Carnatic / Indie / Film)</strong>  
        <br />
        <strong>Definition:</strong> Honors a musician with strong artistic contribution.  
        <br />
        <strong>Who can apply?</strong> Minimum 5 years experience and notable work in last 24 months.
      </li>

      <li>
        <strong>15) Excellence in Dance & Performing Arts</strong>  
        <br />
        <strong>Definition:</strong> Performer/choreographer contributing to cultural continuity.  
        <br />
        <strong>Who can apply?</strong> Minimum 5 years of active practice with significant public showcases.
      </li>

    </ul>
  </div>
</div>

                {/* Section 3: Winner Selection Process */}
<div>
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    3. Winner Selection Process
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>
      <strong>3.1</strong> The entries that qualify based on the defined eligibility criteria shall be presented to the Jury. The decision by the Jury as confirmed by Management shall be final and binding.
    </li>

    <li>
      <strong>3.2</strong> The shortlisted entries as well as the winning entries may be featured or covered by the Management or brief thereof may be featured on the Website and/or any other platform/media at the sole discretion of the Management.
    </li>

    <li>
      <strong>3.3</strong> No correspondence of whatsoever nature relating to shortlisting of entries or selection of winning entries shall be entertained.
    </li>

    <li>
      <strong>3.4</strong> Management shall screen or display the entries for the Jury.
    </li>

    <li>
      <strong>3.5</strong> The Jury shall select the top finalist along with the winners.
    </li>
  </ul>
</div>
{/* Section 4: Winner Declaration */}
<div>
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    4. Winner Declaration
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">

    <li>
      <strong>4.1</strong> The management reserves the right to offer or withdraw any of the prizes/rewards/gratification as provided herein, at any point of time, including after they have been announced.
    </li>

    <li>
      <strong>4.2</strong> The management shall have the liberty, but not the obligation, to publish information with respect to the submission/entries made by the Participants.
    </li>

    <li>
      <strong>4.3</strong> Participants declare that the details furnished in the application form and supporting documents submitted for the listing are true, correct, and complete and provided after due diligence. Any false or misleading information may result in consequences including indemnifying the Management.
    </li>

    <li>
      <strong>4.4</strong> The Participant authorizes the Management to use the content submitted as part of nomination/participation, in whole or in part, including trade publications, press releases, social media posting, electronic hyperlinks, or any display format selected by the Management.
    </li>

    <li>
      <strong>4.5</strong> The management may exclude a Participant from the listing process on grounds including unfitness to participate, inability to provide documentation, or any reason adversely impacting the listing.
    </li>

    <li>
      <strong>4.6</strong> The Management is not responsible if a call to a winner is unsuccessful due to:
      <ul className="list-[lower-alpha] ml-6 mt-2 space-y-1">
        <li>Line being busy</li>
        <li>Congestion</li>
        <li>No answer received</li>
        <li>Poor call conditions / unclear reception</li>
        <li>Number engaged</li>
        <li>Call drop</li>
        <li>E-mail not delivered</li>
        <li>Other reasons rendering the call unsuccessful</li>
      </ul>
    </li>

    <li>
      <strong>4.7</strong> The Management reserves the right to replace any winner who fails, is disqualified, or breaches Terms with another eligible Participant.
    </li>

    <li>
      <strong>4.8</strong> The Management will attempt to contact winners within 30 days and may make up to three attempts. Failure may result in forfeiture of the prize.
    </li>

    <li>
      <strong>4.9</strong> Winners will be identified using the registered email. Failure to provide identification proof may result in disqualification.
    </li>

    <li>
      <strong>4.10</strong> The Management will make reasonable efforts to enable participation and contact winners but cannot guarantee successful communication.
    </li>

    <li>
      <strong>4.11</strong> The Management has no liability if a Participant cannot participate and may disqualify Participants at its discretion.
    </li>

    <li>
      <strong>4.12</strong> The Management may replace disqualified winners with another eligible Participant, even if previously eliminated.
    </li>

    <li>
      <strong>4.13</strong> If any person tampers with the Website or listing process data, the Management may revoke winnings and initiate legal action.
    </li>

    <li>
      <strong>4.14</strong> The Management will coordinate prize delivery and is not responsible if winners refuse the prize.
    </li>

    <li>
      <strong>4.15</strong> Winners will receive prize communication via registered email. Unclaimed prizes within 30 days will be forfeited.
    </li>

    <li>
      <strong>4.16</strong> Winners must submit attested copies of valid Government-issued photo ID and required documents.
    </li>

    <li>
      <strong>4.17</strong> Prize delivery may be delayed due to document submission delays or force majeure events.
    </li>

    <li>
      <strong>4.18</strong> Winners agree not to hold the Management responsible for delays or disputes related to prizes.
    </li>

    <li>
      <strong>4.19</strong> Any disputes related to prizes shall be addressed directly to the Management.
    </li>

    <li>
      <strong>4.20</strong> The Management may refuse prizes in case of fraud, dishonesty, or non-entitlement.
    </li>

  </ul>
</div>

{/* Section 5: Prohibited Activities */}
<div>
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    5. Prohibited Activities
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>
      <strong>5.1</strong> Viruses, trojan horses, worms, time bombs, corrupted files, malware, spyware, or any other similar software that may damage the operation of another’s computer or property.
    </li>

    <li>
      <strong>5.2</strong> Using the Website in any manner intended to damage, disable, overburden, or impair any server, or the network(s) connected to any server, or interfere with any other party’s use and enjoyment of the Website.
    </li>

    <li>
      <strong>5.3</strong> Attempting to gain unauthorized access to the Website, other accounts, computer systems or networks connected to any server through hacking, password mining or any other means.
    </li>

    <li>
      <strong>5.4</strong> Obtaining or attempting to obtain any materials or information stored on the Website, its servers, or associated computers through any means not intentionally made available through the Website.
    </li>
  </ul>
</div>


{/* Section 6: Phases and Dates */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    6. Phases and Dates
  </h3>

  {/* Table */}
  <div className="overflow-x-auto mb-4">
    <table className="w-full border border-gray-300 text-gray-600">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-left">Event</th>
          <th className="border p-2 text-left">Date</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="border p-2">Submission Opening</td>
          <td className="border p-2">
            13<sup>th</sup> February, 2026
          </td>
        </tr>

        <tr>
          <td className="border p-2">Awards ceremony date</td>
          <td className="border p-2">
            8<sup>th</sup> March, 2026
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>
      <strong>6.1</strong> The schedule may be modified, extended, cancelled, or terminated based on technical requirements at the sole discretion of Management.
    </li>

    <li>
      <strong>6.2</strong> All applications will be evaluated based on pre-defined criteria determined by Management in its sole discretion.
    </li>

    <li>
      <strong>6.3</strong> The decision of Management based on Jury recommendations regarding evaluation, disqualification, or qualification is final and binding.
    </li>
  </ul>
</div>


{/* Section 7: Limitations & Disclaimers */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    7. Limitations & Disclaimers
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>
      <strong>7.1</strong> Management is not responsible for late, incomplete, corrupted, defective, or unreadable entries and such entries will be disqualified.
    </li>

    <li>
      <strong>7.2</strong> Management reserves the right to suspend, cancel, or modify Terms & Conditions or listing rules at any time without notice.
    </li>

    <li>
      <strong>7.3</strong> The listing is provided on an “as-is” basis and Management disclaims all implied warranties including fitness, accuracy, timeliness, and merchantability.
    </li>

    <li>
      <strong>7.4</strong> Management does not guarantee that listing results will meet Participant expectations.
    </li>
  </ul>
</div>

{/* Section 8: General */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    8. General
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">

    <li>
      <strong>8.1</strong> Participant agrees that the Participant is legally capable of entering and, if selected, participating in the listing and agrees to the Terms & Conditions.
    </li>

    <li>
      <strong>8.2</strong> Participant understands that merely participating in this listing process does not entitle the Participant to a prize or any other consideration.
    </li>

    <li>
      <strong>8.3</strong> Participant shall be responsible for handling any infringement or alleged infringement and shall indemnify Management from claims, costs, or damages arising from infringement.
    </li>

    <li>
      <strong>8.4</strong> Participants grant the Management a royalty-free, irrevocable, worldwide, non-exclusive license to use and display entries and related intellectual property for listing purposes.
    </li>

    <li>
      <strong>8.5</strong> Management reserves the right to withdraw or amend Terms & Conditions at any time and is not responsible for losses due to participation or rule changes.
    </li>

    <li>
      <strong>8.6</strong> Participants wishing to withdraw must inform Management in writing at least one week prior to the final ceremony.
    </li>

    <li>
      <strong>8.7</strong> All disputes shall be governed by the laws of India and subject to jurisdiction of courts at New Delhi, India.
    </li>

    <li>
      <strong>8.8</strong> Issues not covered in these Terms shall be decided by Management or an appointed legal body.
    </li>

  </ul>
</div>


{/* Section 9: Website */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    9. Website
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">

    <li>
      <strong>9.1</strong> The Website is informational only. Management is not liable for actions taken based on Website content or listing participation.
    </li>

    <li>
      <strong>9.2</strong> The Management shall not be responsible for:
      <ul className="list-[lower-alpha] ml-6 mt-2 space-y-1">
        <li>Delivery failures relating to registration or uploading presentations.</li>
        <li>SPAM generated messages from accessing the Website.</li>
        <li>Management not receiving or rejecting data.</li>
        <li>Lost, late, or misdirected transmissions or technical failures.</li>
        <li>Other conditions beyond its control.</li>
      </ul>
    </li>

  </ul>
</div>


{/* Section 10: Disclaimers */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    10. Disclaimers
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">

    <li>
      <strong>10.1</strong> Management is not responsible for monitoring entries or preventing violations of intellectual property rights but may investigate and eliminate non-conforming entries.
    </li>

    <li>
      <strong>10.2</strong> Failure to exercise any right does not constitute waiver. Management is not liable for failure to perform obligations due to circumstances beyond control.
    </li>

    <li>
      <strong>10.3</strong> This Agreement represents the complete understanding between parties and supersedes prior agreements.
    </li>

    <li>
      <strong>10.4</strong> No agency, partnership, joint venture, or employment relationship is created under this Agreement.
    </li>

    <li>
      <strong>10.5</strong> Participant agrees not to hold Management or its affiliates liable for losses or claims arising from participation or prizes.
    </li>

  </ul>
</div>
{/* Section 11: Systems and Availability */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    11. Systems and Availability
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">

    <li>
      <strong>11.1</strong> The Management, its affiliates, advisors, contractors, partners, and promotion agencies are not responsible for technical, hardware, software, or communication failures, lost network connections, website availability issues, unauthorized intervention, or transmission errors that may limit participation. Management is not responsible for lost, late, incomplete, invalid, or corrupted submissions. While reasonable efforts will be made to ensure data security and accuracy, such methods are not guaranteed to be infallible.
    </li>

    <li>
      <strong>11.2</strong> Any loss, outage, or dissatisfaction suffered by a Participant during the process shall not be the responsibility of Management or its affiliates.
    </li>

    <li>
      <strong>11.3</strong> Management will attempt to protect data from loss or corruption, but in case of data loss, it may proceed with available data or take reasonable actions as deemed appropriate. Management shall not be held responsible for such loss.
    </li>

    <li>
      <strong>11.4</strong> Participants must ensure that the Website is operational before starting the application process and maintain adequate RAM and device memory for smooth functioning.
    </li>

    <li>
      <strong>11.5</strong> The server includes redundancies; however, if the server is down during the entry period, Management may determine appropriate measures at its discretion.
    </li>

    <li>
      <strong>11.6</strong> Participants acknowledge that all potential technical issues may not be identified and agree to hold Management harmless for any failures, losses, or inconvenience caused.
    </li>

    <li>
      <strong>11.7</strong> Participants shall not initiate litigation against Management or its partners. Any grievance must be submitted through the Website, and Management’s decision shall be final.
    </li>

    <li>
      <strong>11.8</strong> The Management shall not be liable for any failure of the application server or system during the listing process.
    </li>

  </ul>
</div>
{/* Section 12: Publicity */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    12. Publicity
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">

    <li>
      <strong>12.1</strong> The Participant, by providing sensitive personal information, voluntarily agrees that Management may share such information with third parties for the purpose of the listing. Participants shall not file any claim against Management for sharing such information. All information will be handled in accordance with the Management’s privacy policy.
    </li>

    <li>
      <strong>12.2</strong> By entering the listing, Participants agree to participate in media or promotional activities as reasonably requested by Management and consent to the use of their name and/or likeness.
    </li>

    <li>
      <strong>12.3</strong> Management will contact Participants in advance regarding media interviews. Entries may be used for promotional, marketing, press, or media purposes. Participants waive any intellectual property rights in submitted entries and agree that no payment will be made for use of their name, likeness, or submissions.
    </li>

    <li>
      <strong>12.4</strong> Participants shall not speak to the press, media, or any third party regarding the listing without prior written approval from Management. Violation may result in disqualification.
    </li>

    <li>
      <strong>12.5</strong> Participants shall maintain confidentiality of all details related to the listing.
    </li>

    <li>
      <strong>12.6</strong> Any photographs, videos, or materials submitted by Participants become the property of Management and may be used worldwide in perpetuity. Participants must ensure submitted content does not violate laws, rights, or public standards.
    </li>

    <li>
      <strong>12.7</strong> Acceptance of these Terms grants permission to Management and its affiliates to record and use Participant’s name, likeness, voice, and comments for advertising or promotional purposes worldwide without compensation.
    </li>

  </ul>
</div>

{/* Section 13: Privacy */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    13. Privacy
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>
      <strong>13.1</strong> Participants voluntarily agree that personal data submitted with an entry, including name, mailing address, phone number, and email address may be collected, processed, stored, and used by Management and its affiliates for administering the listing process. By entering the listing, Participants agree to the transmission, processing, disclosure, and storage of such personal data. All personal information collected is subject to the applicable Privacy Policy of Management.
    </li>
  </ul>
</div>


{/* Section 14: Warranty and Indemnity */}
<div className="mt-6">
  <h3 className="font-bold text-lg text-[#C41E7F] mb-3">
    14. Warranty and Indemnity
  </h3>

  <ul className="list-disc list-inside space-y-2 text-gray-600">

    <li>
      <strong>14.1</strong> Participants warrant that their submission is original work and that they are the sole owner with rights to submit the entry and grant necessary licenses. Participants agree not to submit entries that infringe third-party intellectual property, proprietary rights, privacy rights, or violate applicable laws.
    </li>

    <li>
      <strong>14.2</strong> Participants agree to indemnify and hold Management harmless from any liability, claims, losses, damages, or expenses arising from breach of Terms, infringement, misrepresentation, participation in the listing, use of prizes, website malfunction, or errors related to the listing process.
    </li>

  </ul>
</div>


{/* Back to Registration Button */}
<div className="mt-8">
  <a
    href="/register"
    className="inline-block px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
  >
    ← Back to Registration
  </a>
</div>


{/* Footer */}
<footer className="mt-10 py-6 text-center text-gray-500 border-t">
  <p>© 2026 SIMATS EmpowerHER Awards | All Rights Reserved</p>
</footer>


                  {/* Scroll indicator */}
                  {!hasScrolledToBottom && (
                    <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent py-4 text-center">
                      <p className="text-[#C41E7F] font-semibold animate-pulse">
                        ↓ Please scroll down to continue ↓
                      </p>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
                  <div className="mb-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={modalAgreed}
                        onChange={(e) => setModalAgreed(e.target.checked)}
                        disabled={!hasScrolledToBottom}
                        className="mt-1 w-5 h-5 text-[#C41E7F] border-pink-300 rounded focus:ring-[#C41E7F] disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span className={`text-sm font-medium ${
                        hasScrolledToBottom ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        I have read and agree to all the terms and conditions stated above. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {!hasScrolledToBottom && (
                      <p className="text-xs text-amber-600 mt-2 ml-8">
                        Please scroll to the bottom to enable this checkbox
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setHasScrolledToBottom(false);
                        setModalAgreed(false);
                      }}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={!modalAgreed || !hasScrolledToBottom}
                      className="px-6 py-2 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      Agree & Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
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
          {/* TOI Logo */}
          <div className="flex items-center gap-2">
            <img src="/TOI1.png" alt="Times of India" className="w-16 h-20 sm:w-40 sm:h-20 object-contain" />
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
