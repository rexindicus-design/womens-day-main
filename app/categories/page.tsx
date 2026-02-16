"use client";

import { useState } from "react";
import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Menu,
  X,
  Trophy,
  Star,
} from "lucide-react";

// Navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories", active: true },
  { name: "Register", href: "/register" },
];

// SIMATS Award categories from the document
const categoryGroups = [
  {
    title: "Professionals & Leaders",
    subtitle: "6 Awards",
    color: "navy",
    categories: [
      {
        title: "Healthcare Excellence",
        description: "Recognising women who have made exceptional contributions to healthcare, medicine, and public health.",
      },
      {
        title: "STEM Research & Applied Innovation",
        description: "Honouring women advancing scientific research and creating innovative solutions with real-world impact.",
      },
      {
        title: "Women in Education Transformation",
        description: "Celebrating educators and leaders revolutionizing learning and academic excellence.",
      },
      {
        title: "Women in Sustainability & Climate Action",
        description: "Recognising women driving environmental sustainability and climate change solutions.",
      },
      {
        title: "Women in Tech & Management Leadership",
        description: "Honouring women who have risen to executive positions in technology and business management.",
      },
      {
        title: "Sports",
        description: "Celebrating women athletes and sports professionals who inspire through athletic excellence.",
      },
    ],
  },
  {
    title: "Entrepreneurs",
    subtitle: "6 Awards",
    color: "gold",
    categories: [
      {
        title: "Woman Entrepreneur of the Year(All Industries)",
        description: "Recognising outstanding entrepreneurial achievement across all industries and sectors.",
      },
      {
        title: "Woman Founder – DeepTech/IP-led Innovation",
        description: "Honouring women building technology companies based on intellectual property and deep tech.",
      },
      {
        title: "Grassroots Woman Social Changemaker",
        description: "Celebrating women creating social impact through community-driven initiatives and grassroots movements.",
      },
    ],
  },
  {
    title: "Arts, Culture & Entertainment",
    subtitle: "3 Awards",
    color: "red",
    categories: [
      {
        title: "Star – Tamil Cinema, Television",
        description: "Recognising exceptional talent and contribution to Tamil cinema and television industry.",
      },
      {
        title: "Excellence in Music (Carnatic / Film)",
        description: "Honouring women who have achieved mastery in classical Carnatic or film music.",
      },
      {
        title: "Excellence in Dance & Performing Arts",
        description: "Celebrating excellence in Bharatanatyam, Folk, Theatre, and other performing arts forms.",
      },
    ],
  },
  {
    title: "Special Recognition",
    subtitle: "Lifetime Award",
    color: "special",
    categories: [
      {
        title: "SIMATS Life Time Achievement Award",
        description: "The highest honour recognising a lifetime of extraordinary achievement, leadership, and contribution to society.",
      },
    ],
  },
];

// News ticker items
const newsTickerItems = [
  "🏆 Nominations Open: Women's Day Achievement Awards 2026",
  "📅 Event Date: March 8, 2026 at SIMATS Campus",
  "🎓 SIMATS (Saveetha Institute of Medical and Technical Sciences) celebrates 25 years of excellence",
  "📰 Times of India - India's leading English daily partners for Awards",
  "📅 The last date for nomination is 23rd February 2026",
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
       <div className="h-8 sm:h-10 w-px bg-gray-300"></div>

      <div className="flex items-center gap-2">
        <img 
          src="/simats.png" 
          alt="SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES" 
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
    <section className="relative h-[300px] sm:h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#C41E7F]/80 via-[#6B2D5B]/70 to-[#2D1B4E]/60"></div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center sm:justify-end sm:pr-12 lg:pr-24">
        <div className="relative">
          <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-2xl">
            <div className="border-4 border-[#D4AF37] px-6 sm:px-10 py-5 sm:py-8 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#D4AF37]" />
                <Star className="w-5 h-5 text-[#D4AF37]" />
                <Star className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-[#C41E7F] text-center">
                AWARD<br/>CATEGORIES
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Breadcrumbs Component
function Breadcrumbs() {
  return (
    <nav className="py-4 text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        <li>
          <a href="/" className="text-gray-500 hover:text-[#C41E7F] transition-colors">
            Home
          </a>
        </li>
        <li className="text-gray-400">&gt;</li>
        <li className="text-[#C41E7F] font-medium">Award Categories</li>
      </ol>
    </nav>
  );
}

// Category Card Component
function CategoryCard({ title, description, accentColor }: { title: string; description: string; accentColor: string }) {
  const borderColors: Record<string, string> = {
    navy: "hover:border-[#C41E7F]",
    gold: "hover:border-[#D4AF37]",
    red: "hover:border-[#E31837]",
    special: "hover:border-[#D4AF37]",
  };
  
  const textColors: Record<string, string> = {
    navy: "group-hover:text-[#C41E7F]",
    gold: "group-hover:text-[#D4AF37]",
    red: "group-hover:text-[#E31837]",
    special: "group-hover:text-[#D4AF37]",
  };

  const iconColors: Record<string, string> = {
    navy: "text-[#C41E7F]",
    gold: "text-[#D4AF37]",
    red: "text-[#E31837]",
    special: "text-[#D4AF37]",
  };

  return (
    <div className={`border border-pink-100 p-6 transition-all group ${borderColors[accentColor]} bg-white rounded-xl shadow-sm hover:shadow-lg`}>
      <div className="flex items-start gap-3 mb-3">
        <Trophy className={`w-5 h-5 ${iconColors[accentColor]} flex-shrink-0 mt-1`} />
        <h3 className={`font-serif text-xl sm:text-2xl text-[#6B2D5B] font-semibold ${textColors[accentColor]} transition-colors`}>
          {title}
        </h3>
      </div>
      <p className="text-gray-600 leading-relaxed pl-8">{description}</p>
    </div>
  );
}

// Category Group Component
function CategoryGroup({ group }: { group: typeof categoryGroups[0] }) {
  const bgColors: Record<string, string> = {
    navy: "bg-[#C41E7F]",
    gold: "bg-[#D4AF37]",
    red: "bg-[#E31837]",
    special: "bg-gradient-to-r from-[#C41E7F] to-[#D4AF37]",
  };

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className={`h-1 w-16 rounded-full ${bgColors[group.color]}`}></div>
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#C41E7F] font-bold">{group.title}</h2>
          <p className="text-gray-500 text-sm">{group.subtitle}</p>
        </div>
      </div>
      <div className={`grid gap-6 ${group.categories.length === 1 ? 'max-w-2xl' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
        {group.categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            description={category.description}
            accentColor={group.color}
          />
        ))}
      </div>
    </div>
  );
}

// Categories Content Component
function CategoriesContent() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-pink-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-24 h-1 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] mx-auto mb-8 rounded-full"></div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#C41E7F] mb-4 font-bold">
            Award Categories
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            The Women&apos;s Day Achievement Awards 2026 celebrates excellence across multiple categories, 
            recognizing outstanding women who are making a difference in their respective fields. 
            
          </p>
        </div>

        {categoryGroups.map((group) => (
          <CategoryGroup key={group.title} group={group} />
        ))}

        {/* CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-100">
          <h3 className="font-serif text-2xl text-[#C41E7F] mb-4 font-bold">Ready to Nominate?</h3>
          <p className="text-gray-600 mb-6">
            Know someone who deserves recognition? Submit your nomination today.
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C41E7F] to-[#D4AF37] text-white font-bold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all hover:scale-105"
          >
            <Trophy className="w-5 h-5" />
            Submit Nomination
          </a>
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
        <div className="text-center mb-4">
          <p className="text-[#6B2D5B] text-sm uppercase tracking-wider font-medium">In Association With</p>
        </div>
        <div className="flex items-center justify-center gap-8 sm:gap-16">
          <div className="flex items-center gap-3">
            <img 
              src="/simats.png" 
              alt="SAVEETHA INSTITUTE OF MEDICAL AND TECHNICAL SCIENCES" 
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-[#C41E7F] font-bold">Saveetha Institute of Medical and Technical Sciences</div>
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
          <p>&copy; {new Date().getFullYear()} Women&apos;s Day Achievement Awards. Saveetha Institute of Medical and Technical Sciences & Times of India.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Categories Page
export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NewsTicker />
      <NavigationHeader />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>

        <CategoriesContent />
      </main>

      <PartnershipBanner />
      <Footer />
    </div>
  );
}
