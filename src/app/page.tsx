"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Room {
  id: string;
  name: string;
  price: number; // NPR per night
  size: number;
  occupancy: number;
  description: string;
  image: string;
  features: string[];
  badge?: string;
}

interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
  icon: string;
}

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  avatar: string;
}

// ─── Utility ──────────────────────────────────────────────────────────────────
const formatNPR = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-NP")}`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const ROOMS: Room[] = [
  {
    id: "standard",
    name: "Himalayan Standard",
    price: 3500,
    size: 32,
    occupancy: 2,
    description:
      "Warmly appointed with hand-carved wooden furniture, traditional Dhaka textiles, and views of the lush Kathmandu valley streets below.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200",
    features: ["Wooden Carved Bed", "Dhaka Textile Décor", "Valley View", "Free Wi-Fi"],
  },
  {
    id: "deluxe",
    name: "Mountain Deluxe",
    price: 6500,
    size: 48,
    occupancy: 2,
    description:
      "Step onto your private balcony to greet the sunrise over Langtang's snow-capped peaks. Modern amenities fused with Newari artistry.",
    image:
      "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=1200",
    features: ["Private Balcony", "Mountain Panorama", "King-size Bed", "Rainfall Shower"],
    badge: "Popular",
  },
  {
    id: "family",
    name: "Family Sanctuary",
    price: 9500,
    size: 72,
    occupancy: 4,
    description:
      "Two interconnected rooms with a shared living area, child-safe furnishings, and a dedicated family concierge to make every moment special.",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200",
    features: ["Two Bedrooms", "Kids' Play Corner", "Living Lounge", "Airport Transfer"],
  },
  {
    id: "mountainview",
    name: "Everest View Suite",
    price: 13500,
    size: 58,
    occupancy: 2,
    description:
      "Floor-to-ceiling windows frame the Everest massif. Warm wooden interiors, hand-painted Thanka art, and an in-room soaking tub await.",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
    features: ["Everest Panorama", "Thanka Art Walls", "In-room Soaking Tub", "Butler On Call"],
    badge: "Signature",
  },
  {
    id: "suite",
    name: "Royal Himalaya Suite",
    price: 18000,
    size: 95,
    occupancy: 3,
    description:
      "The pinnacle of Nepali luxury. Private terrace, personal butler, exclusive access to the spa sanctum, and bespoke cultural experiences.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200",
    features: ["Private Terrace", "Personal Butler", "Exclusive Spa Access", "Bespoke Cultural Tours"],
    badge: "Prestige",
  },
];

const EXPERIENCES: Experience[] = [
  {
    id: "spa",
    title: "Himalayan Serenity Spa",
    description:
      "Surrender to ancient Ayurvedic therapies, hot Himalayan stone massages, and aromatic herbal steam rituals performed by master healers — all with sweeping peak views.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1400",
    highlights: [
      "Ayurvedic Full-Body Ritual",
      "Himalayan Stone Therapy",
      "Herbal Steam & Soak",
      "Meditation with Singing Bowls",
    ],
    icon: "✦",
  },
  {
    id: "cuisine",
    title: "Authentic Nepali Cuisine",
    description:
      "A culinary journey through Nepal's diverse flavours — from steaming Thakali dal bhat to delicate yak-cheese momos, paired with locally grown Himalayan tea.",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=1400",
    highlights: [
      "Traditional Thakali Feast",
      "Momo Crafting Workshop",
      "Organic Farm-to-Table Dinners",
      "Chef's Himalayan Table",
    ],
    icon: "❧",
  },
  {
    id: "trekking",
    title: "Guided Himalayan Trekking",
    description:
      "Set out on legendary trails to Annapurna Base Camp, Langtang Valley, and hidden Mustang valleys with expert guides, porter support, and sunrise summit camps.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1400",
    highlights: [
      "Annapurna Base Camp Trek",
      "Langtang Valley Expedition",
      "Private Mustang Journey",
      "Summit Sunrise Celebration",
    ],
    icon: "⛰",
  },
  {
    id: "culture",
    title: "Cultural Heritage Tours",
    description:
      "Walk the cobblestones of Bhaktapur Durbar Square, offer butter lamps at Pashupatinath, and witness ancient Newari craftsmanship with your personal heritage guide.",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1400",
    highlights: [
      "Pashupatinath Temple Dawn",
      "Bhaktapur Heritage Walk",
      "Living Goddess (Kumari) Visit",
      "Newari Artisan Workshops",
    ],
    icon: "卐",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The sunrise gilding Everest from our suite terrace was a spiritual experience. Everest Himalaya Resort is not a hotel — it is a pilgrimage.",
    author: "Lena Müller",
    location: "Berlin, Germany",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
  },
  {
    quote:
      "The Thakali feast under lantern-lit skies, singing bowls echoing through the valley — I have stayed in palaces, but nothing compares to this.",
    author: "Carlos Ramirez",
    location: "Madrid, Spain",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
  },
  {
    quote:
      "Our Bhaktapur heritage walk and the genuine warmth of every single staff member made us feel like honoured guests of Nepal itself.",
    author: "Aisha Khan & Omar Patel",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100",
  },
];

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
    alt: "Swayambhunath Stupa at sunrise",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1605649461784-ebc1f1cf5de0?auto=format&fit=crop&q=80&w=800",
    alt: "Himalayan mountain peak",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    alt: "Traditional Newari architecture",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1543965170-e399653a7f60?auto=format&fit=crop&q=80&w=800",
    alt: "Himalayan trekking trail",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1601224727494-7d5a70e3dff0?auto=format&fit=crop&q=80&w=800",
    alt: "Prayer flags in wind",
    span: "col-span-2",
  },
];

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return { ref, visible };
}

// ─── Reveal Wrapper Component ─────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const { ref, visible } = useScrollReveal();
  const cls = direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
  return (
    <div
      ref={ref}
      className={`${cls} ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Decorative Divider ───────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center my-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-600/60" />
      <span className="text-yellow-500/70 text-xs">✦</span>
      <div className="h-px w-16 bg-gradient-to-r from-yellow-600/60 via-yellow-400/80 to-yellow-600/60" />
      <span className="text-yellow-500/70 text-xs">✦</span>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-600/60" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  // Booking state
  const [roomType, setRoomType] = useState<string>("deluxe");
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [includeButler, setIncludeButler] = useState<boolean>(false);
  const [includeSpa, setIncludeSpa] = useState<boolean>(false);
  const [includeTransfer, setIncludeTransfer] = useState<boolean>(false);

  // Form state
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<any>(null);

  // UI state
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("spa");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Contact state
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactSubject, setContactSubject] = useState<string>("General Inquiry");

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sticky nav scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Default dates
  useEffect(() => {
    const today = new Date();
    const checkout = new Date();
    checkout.setDate(today.getDate() + 3);
    const fmt = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setCheckIn(fmt(today));
    setCheckOut(fmt(checkout));
  }, []);

  // Pricing
  const selectedRoom = ROOMS.find((r) => r.id === roomType) || ROOMS[1];
  let nights = 0;
  if (checkIn && checkOut) {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    nights = Math.max(1, Math.ceil(diff / 86400000));
  }
  if (nights <= 0) nights = 1;

  const basePrice = selectedRoom.price * nights;
  const butlerPrice = includeButler ? 2500 * nights : 0;
  const spaPrice = includeSpa ? 1500 * guests * nights : 0;
  const transferPrice = includeTransfer ? 3500 : 0;
  const subtotal = basePrice + butlerPrice + spaPrice + transferPrice;
  const taxRate = 0.13; // Nepal VAT 13%
  const taxes = Math.round(subtotal * taxRate);
  const serviceFee = 1200;
  const total = subtotal + taxes + serviceFee;

  // Scroll helper
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const selectRoom = useCallback((id: string) => {
    setRoomType(id);
    scrollTo("booking-suite");
  }, [scrollTo]);

  // Booking submit
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      alert("Please provide your full name and email address.");
      return;
    }
    const id = "EHR-" + Math.floor(100000 + Math.random() * 900000);
    setReceipt({ id, fullName, email, phone, nationality, roomName: selectedRoom.name, checkIn, checkOut, nights, guests, butler: includeButler, spa: includeSpa, transfer: includeTransfer, total, specialRequests });
    setBookingConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Contact submit
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 7000);
  };

  const NAV_LINKS = [
    { label: "Suites", id: "suites" },
    { label: "Experiences", id: "experiences" },
    { label: "Gallery", id: "gallery" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="bg-[#0d0b08] text-[#e8e0d0] min-h-screen overflow-x-hidden">

      {/* ─── STICKY NAVIGATION ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0d0b08]/95 backdrop-blur-xl shadow-2xl border-b border-yellow-700/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 border border-yellow-500/50 flex items-center justify-center group-hover:border-yellow-400 transition-colors duration-300">
              <span className="text-yellow-400 text-xs font-serif">✦</span>
            </div>
            <div className="leading-tight">
              <span className="font-serif text-lg tracking-widest text-yellow-100 uppercase font-light block">
                Everest <span className="font-semibold text-yellow-400">Himalaya</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-yellow-600/80 font-light">
                Resort · Kathmandu
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="nav-link text-xs uppercase tracking-widest text-[#c0b090] hover:text-yellow-300 transition-colors duration-300 font-light"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("booking-suite")}
              className="btn-gold px-6 py-2.5 border border-yellow-500/40 text-yellow-200 text-xs uppercase tracking-widest font-semibold hover:bg-yellow-500 hover:text-[#0d0b08] transition-all duration-300"
            >
              Book Your Stay
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-6 bg-yellow-400 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block h-px w-6 bg-yellow-400 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-yellow-400 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            mobileMenuOpen ? "max-h-96 border-b border-yellow-700/20" : "max-h-0"
          } bg-[#0d0b08]/98 backdrop-blur-xl`}
        >
          <div className="px-6 py-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block text-sm uppercase tracking-widest text-[#c0b090] hover:text-yellow-300 transition-colors w-full text-left py-2 border-b border-yellow-900/20"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking-suite")}
              className="w-full mt-4 py-3 bg-yellow-500 text-[#0d0b08] text-xs font-bold uppercase tracking-widest"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605649461784-ebc1f1cf5de0?auto=format&fit=crop&q=85&w=2400"
            alt="Himalayan mountain panorama"
            className="hero-image absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b08]/50 via-[#0d0b08]/30 to-[#0d0b08]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b08]/40 via-transparent to-[#0d0b08]/40" />
        </div>

        {/* Decorative borders */}
        <div className="absolute top-24 left-8 right-8 bottom-24 border border-yellow-500/10 pointer-events-none hidden lg:block" />
        <div className="absolute top-26 left-10 right-10 bottom-26 border border-yellow-500/5 pointer-events-none hidden lg:block" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8 pt-20">
          <div
            className="inline-block px-6 py-2 border-y border-yellow-500/30"
            style={{ animation: "fadeInUp 1s ease 0.2s both" }}
          >
            <span className="text-xs uppercase tracking-[0.5em] text-yellow-400 font-semibold font-sans">
              Luxury Retreat · Nepal
            </span>
          </div>

          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase font-light leading-[1.1]"
            style={{ animation: "fadeInUp 1s ease 0.4s both" }}
          >
            Where the{" "}
            <span className="block font-normal italic text-yellow-200">
              Himalayas
            </span>
            <span className="block text-3xl md:text-5xl font-light mt-2">
              Meet Luxury
            </span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-[#c0b090] font-light text-sm md:text-base tracking-wide leading-relaxed"
            style={{ animation: "fadeInUp 1s ease 0.6s both" }}
          >
            Nestled among the world's highest peaks, Everest Himalaya Resort
            blends authentic Nepali hospitality with world-class luxury — where
            ancient traditions meet modern elegance.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
            style={{ animation: "fadeInUp 1s ease 0.8s both" }}
          >
            <button
              onClick={() => scrollTo("suites")}
              className="btn-gold w-full sm:w-auto px-10 py-3.5 bg-gold-gradient text-[#0d0b08] font-bold uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
            >
              Explore Rooms
            </button>
            <button
              onClick={() => scrollTo("experiences")}
              className="btn-gold w-full sm:w-auto px-10 py-3.5 border border-yellow-500/40 text-yellow-200 hover:bg-yellow-500 hover:text-[#0d0b08] font-semibold uppercase tracking-widest text-xs transition-all duration-300"
            >
              Our Experiences
            </button>
          </div>
        </div>

        {/* Quick booking bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 hidden lg:block">
          <div className="max-w-5xl mx-auto px-6 pb-0">
            <div className="glass-card border-t border-x border-yellow-600/20 px-8 py-5 flex items-center gap-6">
              <div className="flex-1">
                <label className="text-[10px] uppercase tracking-widest text-yellow-400 font-semibold block mb-1">Room</label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="bg-transparent border-b border-[#3a2e1a] text-xs text-[#e8e0d0] focus:outline-none w-full pb-1 cursor-pointer"
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id} className="bg-[#1a1208]">
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-px h-8 bg-yellow-700/20" />
              <div>
                <label className="text-[10px] uppercase tracking-widest text-yellow-400 font-semibold block mb-1">Check-In</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent border-b border-[#3a2e1a] text-xs text-[#e8e0d0] focus:outline-none pb-1 cursor-pointer"
                />
              </div>
              <div className="w-px h-8 bg-yellow-700/20" />
              <div>
                <label className="text-[10px] uppercase tracking-widest text-yellow-400 font-semibold block mb-1">Check-Out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent border-b border-[#3a2e1a] text-xs text-[#e8e0d0] focus:outline-none pb-1 cursor-pointer"
                />
              </div>
              <div className="w-px h-8 bg-yellow-700/20" />
              <div>
                <label className="text-[10px] uppercase tracking-widest text-yellow-400 font-semibold block mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="bg-transparent border-b border-[#3a2e1a] text-xs text-[#e8e0d0] focus:outline-none w-16 pb-1 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} className="bg-[#1a1208]">{n}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => scrollTo("booking-suite")}
                className="bg-yellow-500 hover:bg-yellow-400 text-[#0d0b08] text-xs font-bold uppercase tracking-widest px-7 py-3 transition-colors duration-300 whitespace-nowrap"
              >
                Check Rates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-yellow-700/15 bg-[#0f0d09]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "98%", label: "Guest Satisfaction" },
                { num: "5★", label: "Nepal Tourism Board" },
                { num: "24/7", label: "Personal Concierge" },
                { num: "50+", label: "Cultural Experiences" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="font-serif text-3xl md:text-4xl text-yellow-300 font-light">{stat.num}</div>
                  <div className="text-xs uppercase tracking-wider text-[#8a7a5a] font-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ABOUT / HERITAGE SECTION ──────────────────────────────────── */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="left" className="space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-yellow-500 font-semibold block mb-4">
                Heritage of the Himalayas
              </span>
              <h2 className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light leading-tight">
                A Legacy of{" "}
                <span className="italic text-yellow-200 font-normal">
                  Nepali Warmth
                </span>
              </h2>
            </div>
            <GoldDivider />
            <p className="text-[#b0a080] text-sm md:text-base leading-relaxed font-light">
              Founded at the foot of the world's greatest peaks, Everest Himalaya Resort
              has been welcoming explorers, royalty, and dreamers since 1962. We curate
              every stay around the philosophy of <em className="text-yellow-200">Atithi Devo Bhava</em> —
              the guest is god.
            </p>
            <p className="text-[#8a7a5a] text-sm leading-relaxed font-light">
              Every room features hand-carved Newari woodwork, original Thanka paintings
              commissioned from Bhaktapur artisans, and locally woven Dhaka textiles —
              each piece telling a story of Nepal's living cultural heritage.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-yellow-700/15">
              {[
                { num: "60+", label: "Years of Excellence" },
                { num: "12", label: "UNESCO Sites Nearby" },
                { num: "100%", label: "Nepali-Owned" },
              ].map((item) => (
                <div key={item.label}>
                  <span className="font-serif text-3xl text-yellow-300 block">{item.num}</span>
                  <p className="text-[10px] uppercase tracking-wider text-[#6a5a3a] mt-1 font-light">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Photo mosaic */}
          <Reveal direction="right">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="overflow-hidden border border-yellow-700/15 rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=700"
                    alt="Stupa at dawn"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden border border-yellow-700/15 rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1605649461784-ebc1f1cf5de0?auto=format&fit=crop&q=80&w=700"
                    alt="Mountain peaks"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="space-y-3 pt-10">
                <div className="overflow-hidden border border-yellow-700/15 rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1601224727494-7d5a70e3dff0?auto=format&fit=crop&q=80&w=700"
                    alt="Prayer flags"
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden border border-yellow-700/15 rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1543965170-e399653a7f60?auto=format&fit=crop&q=80&w=700"
                    alt="Trekking trail"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ROOMS / SUITES SECTION ────────────────────────────────────── */}
      <section id="suites" className="py-28 bg-[#0f0d09] border-y border-yellow-700/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-yellow-500 font-semibold block">
              Curated Accommodations
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light">
              Our Suites & Rooms
            </h2>
            <GoldDivider />
            <p className="max-w-xl mx-auto text-[#8a7a5a] text-sm font-light">
              From cozy valley-view rooms to panoramic Everest suites — every space is a sanctuary.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ROOMS.map((room, i) => (
              <Reveal key={room.id} delay={i * 100}>
                <div className="room-card bg-[#13100a] border border-yellow-700/15 rounded-sm flex flex-col overflow-hidden group h-full">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#13100a] via-transparent to-transparent z-10" />
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    />
                    {/* Badge */}
                    {room.badge && (
                      <div className="absolute top-4 left-4 z-20 bg-yellow-500 text-[#0d0b08] text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                        {room.badge}
                      </div>
                    )}
                    {/* Price */}
                    <div className="absolute bottom-4 right-4 z-20 glass-card px-3 py-1.5 border border-yellow-600/20">
                      <span className="text-yellow-300 text-xs font-semibold">{formatNPR(room.price)}</span>
                      <span className="text-[#8a7a5a] text-[9px] font-light"> / night</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 space-y-5 flex flex-col flex-grow">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-serif text-xl text-yellow-100 font-normal leading-tight">{room.name}</h3>
                        <div className="flex gap-2 text-[9px] text-[#8a7a5a] font-light shrink-0 mt-1">
                          <span>{room.size}m²</span>
                          <span>•</span>
                          <span>Max {room.occupancy}</span>
                        </div>
                      </div>
                      <p className="text-[#8a7a5a] text-xs leading-relaxed font-light">{room.description}</p>
                    </div>

                    <div className="flex-grow">
                      <h4 className="text-[9px] uppercase tracking-widest text-yellow-600 font-bold mb-2">Included</h4>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        {room.features.map((f) => (
                          <li key={f} className="flex items-center gap-1.5 text-[11px] text-[#8a7a5a] font-light">
                            <span className="h-1 w-1 rounded-full bg-yellow-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => selectRoom(room.id)}
                      className="btn-gold w-full py-3 border border-yellow-600/30 text-yellow-200 text-xs font-semibold uppercase tracking-widest hover:bg-yellow-500 hover:text-[#0d0b08] hover:border-yellow-500 transition-all duration-300 mt-auto"
                    >
                      Reserve This Room
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCES SECTION ───────────────────────────────────────── */}
      <section id="experiences" className="py-28 max-w-7xl mx-auto px-6">
        <Reveal className="text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-yellow-500 font-semibold block">
            Immersive Journeys
          </span>
          <h2 className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light">
            Himalayan Experiences
          </h2>
          <GoldDivider />
        </Reveal>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 border-b border-yellow-700/15 pb-4">
          {EXPERIENCES.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(exp.id)}
              className={`relative px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                activeTab === exp.id
                  ? "text-yellow-300 tab-active-indicator"
                  : "text-[#6a5a3a] hover:text-yellow-200"
              }`}
            >
              <span className="mr-2">{exp.icon}</span>
              {exp.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.id}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[420px] transition-all duration-500 ${
              activeTab === exp.id ? "block" : "hidden"
            }`}
            style={{ animation: activeTab === exp.id ? "fadeInUp 0.5s ease both" : "none" }}
          >
            <div className="lg:col-span-7 relative overflow-hidden border border-yellow-700/15 rounded-sm h-[320px] sm:h-[440px]">
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b08]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 border border-yellow-500/30 px-4 py-2 glass-card">
                <span className="text-yellow-300 text-xs uppercase tracking-widest font-semibold">{exp.icon} {exp.title}</span>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-7">
              <h3 className="font-serif text-3xl md:text-4xl text-yellow-100 font-normal leading-tight">{exp.title}</h3>
              <p className="text-[#8a7a5a] text-sm md:text-base leading-relaxed font-light">{exp.description}</p>
              <div className="space-y-3">
                <h4 className="text-[9px] uppercase tracking-widest text-yellow-500 font-bold">Highlights</h4>
                <ul className="space-y-2.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-[#8a7a5a] font-light">
                      <span className="w-5 h-5 rounded-full border border-yellow-600/40 flex items-center justify-center text-yellow-400 text-[10px] shrink-0">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => scrollTo("booking-suite")}
                className="btn-gold px-7 py-3 border border-yellow-600/30 text-yellow-200 text-xs font-semibold uppercase tracking-widest hover:bg-yellow-500 hover:text-[#0d0b08] transition-all duration-300"
              >
                Book This Experience
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ─── PHOTO GALLERY ─────────────────────────────────────────────── */}
      <section id="gallery" className="py-28 bg-[#0f0d09] border-y border-yellow-700/10">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center space-y-4 mb-14">
            <span className="text-xs uppercase tracking-[0.4em] text-yellow-500 font-semibold block">
              Visual Journey
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light">
              Nepal Through Our Lens
            </h2>
            <GoldDivider />
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-3 gap-3 auto-rows-[220px]">
              <div className="col-span-2 overflow-hidden border border-yellow-700/10 rounded-sm group">
                <img
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1000"
                  alt="Swayambhunath stupa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="overflow-hidden border border-yellow-700/10 rounded-sm group">
                <img
                  src="https://images.unsplash.com/photo-1605649461784-ebc1f1cf5de0?auto=format&fit=crop&q=80&w=600"
                  alt="Everest peak"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="overflow-hidden border border-yellow-700/10 rounded-sm group">
                <img
                  src="https://images.unsplash.com/photo-1601224727494-7d5a70e3dff0?auto=format&fit=crop&q=80&w=600"
                  alt="Prayer flags"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="overflow-hidden border border-yellow-700/10 rounded-sm group">
                <img
                  src="https://images.unsplash.com/photo-1543965170-e399653a7f60?auto=format&fit=crop&q=80&w=600"
                  alt="Himalayan trail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="overflow-hidden border border-yellow-700/10 rounded-sm group">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
                  alt="Mountain view"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── BOOKING SUITE ─────────────────────────────────────────────── */}
      <section id="booking-suite" className="py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-yellow-500 font-semibold block">
              Reserve Your Stay
            </span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light">
              Bespoke Reservations
            </h2>
            <GoldDivider />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form Column */}
            <div className="lg:col-span-7">
              {!bookingConfirmed ? (
                <form
                  onSubmit={handleBooking}
                  className="glass-card p-8 rounded-sm space-y-6 shadow-2xl"
                >
                  <h3 className="font-serif text-2xl text-yellow-100 pb-4 border-b border-yellow-700/20 font-normal">
                    Reservation Details
                  </h3>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Check-In</label>
                      <input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] focus:outline-none focus:border-yellow-500 cursor-pointer transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Check-Out</label>
                      <input type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] focus:outline-none focus:border-yellow-500 cursor-pointer transition-colors" />
                    </div>
                  </div>

                  {/* Room & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Select Room</label>
                      <select value={roomType} onChange={(e) => setRoomType(e.target.value)}
                        className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] focus:outline-none focus:border-yellow-500 cursor-pointer">
                        {ROOMS.map((r) => (
                          <option key={r.id} value={r.id} className="bg-[#13100a]">
                            {r.name} · {formatNPR(r.price)}/night
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Guests</label>
                      <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] focus:outline-none focus:border-yellow-500 cursor-pointer">
                        {[1,2,3,4,5,6].map((n) => (
                          <option key={n} value={n} className="bg-[#13100a]">{n} {n === 1 ? "Guest" : "Guests"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Enhancements */}
                  <div className="space-y-3">
                    <label className="block text-[10px] uppercase tracking-widest text-yellow-400 font-semibold">Add-on Services</label>
                    <div className="space-y-2">
                      {[
                        { state: includeButler, setter: setIncludeButler, label: "Personal Butler Service", sub: `+${formatNPR(2500)} / night` },
                        { state: includeSpa, setter: setIncludeSpa, label: "Himalayan Spa Pass", sub: `+${formatNPR(1500)} / guest / night` },
                        { state: includeTransfer, setter: setIncludeTransfer, label: "Airport Transfer (TIA)", sub: `+${formatNPR(3500)} one-way` },
                      ].map((item) => (
                        <label key={item.label} className="flex items-center gap-3 bg-[#13100a] border border-yellow-700/10 px-4 py-3 rounded-sm cursor-pointer hover:border-yellow-600/30 transition-colors">
                          <input
                            type="checkbox"
                            checked={item.state}
                            onChange={(e) => item.setter(e.target.checked)}
                            className="accent-yellow-500 w-4 h-4 cursor-pointer"
                          />
                          <div>
                            <p className="text-xs font-semibold text-yellow-100">{item.label}</p>
                            <p className="text-[10px] text-[#6a5a3a] font-light">{item.sub}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Guest Info */}
                  <h3 className="font-serif text-xl text-yellow-100 pt-4 pb-3 border-b border-yellow-700/20 font-normal">
                    Guest Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Full Name</label>
                      <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Tenzin Sherpa"
                        className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Phone</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                          placeholder="+977 98XXXXXXXX"
                          className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-500 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Nationality</label>
                      <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)}
                        placeholder="e.g. Nepali, German, Japanese"
                        className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Special Requests</label>
                      <textarea rows={3} value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Dietary needs, room preferences, celebration arrangements..."
                        className="w-full bg-[#13100a] border border-yellow-700/20 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-500 resize-none transition-colors" />
                    </div>
                  </div>

                  <button type="submit"
                    className="btn-gold w-full py-4 bg-gold-gradient text-[#0d0b08] font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl hover:shadow-yellow-500/20 mt-4">
                    Confirm Reservation
                  </button>

                  <p className="text-[10px] text-center text-[#4a3a1a] font-light">
                    All prices in Nepali Rupees (NPR) inclusive of 13% VAT. Free cancellation up to 7 days before arrival.
                  </p>
                </form>
              ) : (
                // ─── RECEIPT ───────────────────────────────────────────
                <div
                  className="glass-card p-8 rounded-sm border border-yellow-500/30 shadow-2xl space-y-6"
                  style={{ animation: "fadeInUp 0.6s ease both" }}
                >
                  <div className="text-center space-y-3 border-b border-yellow-700/20 pb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-yellow-500/40 mb-2 pulse-gold">
                      <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-3xl text-yellow-200 tracking-wide">Reservation Confirmed</h3>
                    <p className="text-[#6a5a3a] text-xs font-light">We look forward to welcoming you to the Himalayas</p>
                  </div>

                  <div className="space-y-4 text-sm font-light">
                    <div className="flex justify-between items-center bg-[#13100a] px-4 py-3 border border-yellow-700/10">
                      <span className="text-[10px] uppercase tracking-widest text-yellow-500 font-bold">Booking ID</span>
                      <span className="font-mono text-yellow-200 font-semibold">{receipt?.id}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-[9px] uppercase tracking-widest text-[#4a3a1a] font-bold">Guest</p><p className="text-yellow-100">{receipt?.fullName}</p></div>
                      <div><p className="text-[9px] uppercase tracking-widest text-[#4a3a1a] font-bold">Room</p><p className="text-yellow-100">{receipt?.roomName}</p></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><p className="text-[9px] uppercase tracking-widest text-[#4a3a1a] font-bold">Check-In</p><p className="text-[#b0a080]">{receipt?.checkIn}</p></div>
                      <div><p className="text-[9px] uppercase tracking-widest text-[#4a3a1a] font-bold">Check-Out</p><p className="text-[#b0a080]">{receipt?.checkOut}</p></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-t border-yellow-700/10 pt-4">
                      <div><p className="text-[9px] uppercase tracking-widest text-[#4a3a1a] font-bold">Nights</p><p className="text-[#b0a080]">{receipt?.nights}</p></div>
                      <div><p className="text-[9px] uppercase tracking-widest text-[#4a3a1a] font-bold">Guests</p><p className="text-[#b0a080]">{receipt?.guests}</p></div>
                      <div><p className="text-[9px] uppercase tracking-widest text-[#4a3a1a] font-bold">Add-ons</p>
                        <p className="text-[#b0a080]">
                          {[receipt?.butler && "Butler", receipt?.spa && "Spa", receipt?.transfer && "Transfer"].filter(Boolean).join(", ") || "None"}
                        </p>
                      </div>
                    </div>
                    {receipt?.specialRequests && (
                      <div className="bg-[#13100a]/60 p-3 border border-yellow-700/10 rounded-sm">
                        <p className="text-[9px] uppercase tracking-widest text-[#4a3a1a] font-bold mb-1">Special Requests</p>
                        <p className="text-xs text-[#8a7a5a] italic">"{receipt.specialRequests}"</p>
                      </div>
                    )}
                    <div className="border-t border-yellow-700/10 pt-4 flex justify-between items-baseline">
                      <span className="font-serif text-lg text-yellow-200 uppercase tracking-wider">Total Amount</span>
                      <span className="font-serif text-2xl text-yellow-300 font-bold">{formatNPR(receipt?.total)}</span>
                    </div>
                    <p className="text-[10px] text-[#4a3a1a] font-light">
                      Confirmation sent to <strong className="text-yellow-600">{receipt?.email}</strong>. Please present booking ID at front desk on arrival.
                    </p>
                  </div>

                  <button
                    onClick={() => { setBookingConfirmed(false); setReceipt(null); }}
                    className="w-full py-3 border border-yellow-600/30 text-yellow-200 text-xs font-bold uppercase tracking-widest hover:bg-yellow-500 hover:text-[#0d0b08] transition-all duration-300"
                  >
                    Make Another Booking
                  </button>
                </div>
              )}
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-5">
              <div className="glass-card p-8 rounded-sm space-y-5 border border-yellow-700/15 sticky top-28 shadow-xl">
                <h3 className="font-serif text-2xl text-yellow-100 pb-4 border-b border-yellow-700/20 font-normal">Rate Summary</h3>

                {/* Selected room preview */}
                <div className="relative h-36 overflow-hidden rounded-sm border border-yellow-700/10">
                  <img src={selectedRoom.image} alt={selectedRoom.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/80 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-yellow-200 text-sm font-serif">{selectedRoom.name}</p>
                    <p className="text-[#8a7a5a] text-[10px]">{selectedRoom.size}m² · Max {selectedRoom.occupancy} guests</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-light text-[#8a7a5a]">
                  <div className="flex justify-between">
                    <span>Base Rate ({nights} {nights === 1 ? "night" : "nights"})</span>
                    <span className="text-[#b0a080]">{formatNPR(selectedRoom.price * nights)}</span>
                  </div>
                  {includeButler && (
                    <div className="flex justify-between text-yellow-400/70">
                      <span>Butler Service</span>
                      <span>+{formatNPR(2500 * nights)}</span>
                    </div>
                  )}
                  {includeSpa && (
                    <div className="flex justify-between text-yellow-400/70">
                      <span>Spa Pass ({guests} guests)</span>
                      <span>+{formatNPR(1500 * guests * nights)}</span>
                    </div>
                  )}
                  {includeTransfer && (
                    <div className="flex justify-between text-yellow-400/70">
                      <span>Airport Transfer</span>
                      <span>+{formatNPR(3500)}</span>
                    </div>
                  )}
                  <div className="h-px bg-yellow-700/10 my-2" />
                  <div className="flex justify-between">
                    <span>VAT (13%)</span>
                    <span>+{formatNPR(taxes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resort Service Fee</span>
                    <span>+{formatNPR(serviceFee)}</span>
                  </div>
                  <div className="h-px bg-yellow-700/15 my-3" />
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-serif text-lg text-yellow-200 uppercase tracking-wider font-semibold">Total</span>
                    <span className="font-serif text-2xl text-yellow-300 font-bold">{formatNPR(total)}</span>
                  </div>
                </div>

                <div className="bg-[#13100a] p-4 border border-yellow-700/10 rounded-sm space-y-2 text-[11px] text-[#6a5a3a] font-light">
                  <p><strong className="text-[#8a7a5a]">Check-in:</strong> 14:00 NST &nbsp;|&nbsp; <strong className="text-[#8a7a5a]">Check-out:</strong> 12:00 NST</p>
                  <p><strong className="text-[#8a7a5a]">Cancellation:</strong> Free up to 7 days before arrival.</p>
                  <p><strong className="text-[#8a7a5a]">Currency:</strong> Nepali Rupees (NPR / Rs.)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-28 bg-[#0f0d09] border-y border-yellow-700/10 select-none">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <Reveal className="space-y-4 mb-14">
            <span className="text-xs uppercase tracking-[0.4em] text-yellow-500 font-semibold block">Guest Reflections</span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide uppercase font-light">What Guests Say</h2>
            <GoldDivider />
          </Reveal>

          <div className="min-h-[200px] flex flex-col items-center justify-center gap-6"
            key={activeTestimonial}
            style={{ animation: "fadeInUp 0.5s ease both" }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-yellow-600/60 to-transparent" />
            <p className="font-serif text-xl md:text-3xl italic text-yellow-100 font-light leading-relaxed max-w-3xl">
              &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
            </p>
            <div className="flex flex-col items-center gap-2">
              <img
                src={TESTIMONIALS[activeTestimonial].avatar}
                alt={TESTIMONIALS[activeTestimonial].author}
                className="w-12 h-12 rounded-full object-cover border-2 border-yellow-600/40"
              />
              <p className="text-sm uppercase tracking-widest text-yellow-300 font-semibold">{TESTIMONIALS[activeTestimonial].author}</p>
              <p className="text-xs text-[#6a5a3a] font-light">{TESTIMONIALS[activeTestimonial].location}</p>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  activeTestimonial === idx ? "bg-yellow-400 w-8" : "bg-[#3a2e1a] w-2 hover:bg-[#6a5a3a]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT SECTION ───────────────────────────────────────────── */}
      <section id="contact" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.4em] text-yellow-500 font-semibold block">Get In Touch</span>
            <h2 className="font-serif text-4xl md:text-6xl tracking-wide uppercase font-light">Location & Inquiries</h2>
            <GoldDivider />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left: Info */}
            <Reveal direction="left" className="space-y-10">
              <div className="space-y-4">
                <p className="text-[#8a7a5a] text-sm md:text-base leading-relaxed font-light">
                  We are located in the heart of Thamel, Kathmandu — Nepal's premier hospitality district,
                  just 20 minutes from Tribhuvan International Airport (TIA).
                </p>
              </div>

              {/* Map graphic */}
              <div className="h-60 border border-yellow-700/15 bg-[#13100a] relative overflow-hidden rounded-sm group">
                <div className="absolute inset-0 bg-[radial-gradient(#d4a943_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
                <svg className="absolute inset-0 w-full h-full text-yellow-600/8 stroke-current" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 30 Q 25 55, 55 28 T 100 45" strokeWidth="0.4" fill="none" />
                  <path d="M0 65 Q 35 40, 70 72 T 100 58" strokeWidth="0.4" fill="none" />
                  <line x1="48" y1="0" x2="48" y2="100" strokeWidth="0.2" />
                  <line x1="0" y1="52" x2="100" y2="52" strokeWidth="0.2" />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
                  <span className="h-5 w-5 rounded-full bg-yellow-400 animate-ping absolute opacity-60" style={{ animation: "pingGold 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
                  <span className="h-5 w-5 rounded-full bg-yellow-500 border-2 border-[#0d0b08] z-20 relative flex items-center justify-center shadow-lg">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0d0b08]" />
                  </span>
                  <span className="glass-card border border-yellow-600/30 text-[9px] uppercase tracking-widest text-yellow-200 px-3 py-1.5 shadow-xl whitespace-nowrap mt-1">
                    Everest Himalaya Resort
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-[#0d0b08]/80 border border-yellow-700/10 px-2.5 py-1 text-[9px] text-[#6a5a3a] font-light">
                  27.7172° N, 85.3240° E · Thamel, Kathmandu
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                {[
                  { title: "Reservations", email: "reservations@everesthimalaya.com", phone: "+977-1-442-1234" },
                  { title: "General Inquiries", email: "info@everesthimalaya.com", phone: "+977-1-442-5678" },
                  { title: "Experiences & Tours", email: "tours@everesthimalaya.com", phone: "+977-98-4100-0000" },
                  { title: "Events & Celebrations", email: "events@everesthimalaya.com", phone: "+977-98-4200-0000" },
                ].map((c) => (
                  <div key={c.title} className="space-y-1">
                    <h4 className="text-[9px] uppercase tracking-widest text-yellow-500 font-bold mb-1">{c.title}</h4>
                    <a href={`mailto:${c.email}`} className="text-[#b0a080] hover:text-yellow-300 transition-colors block font-medium truncate">{c.email}</a>
                    <a href={`tel:${c.phone}`} className="text-[#6a5a3a] hover:text-yellow-300 transition-colors block">{c.phone}</a>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: Contact Form */}
            <Reveal direction="right">
              <div className="glass-card p-8 rounded-sm border border-yellow-700/15 shadow-2xl">
                <h3 className="font-serif text-2xl text-yellow-100 pb-4 border-b border-yellow-700/20 font-normal mb-6">
                  Send Us a Message
                </h3>

                {contactSubmitted ? (
                  <div
                    className="bg-[#13100a] border border-yellow-500/30 p-8 text-center space-y-4 rounded-sm"
                    style={{ animation: "fadeInUp 0.5s ease both" }}
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-yellow-500/40 text-yellow-400">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-serif text-xl text-yellow-200">Message Received!</p>
                    <p className="text-xs text-[#6a5a3a] font-light">
                      Namaste, <strong className="text-yellow-600">{contactName}</strong>! Our guest relations team will respond within 4 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContact} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Your Name</label>
                        <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)}
                          placeholder="Aarav Sharma"
                          className="w-full bg-[#13100a] border border-yellow-700/15 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-500 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Email</label>
                        <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-[#13100a] border border-yellow-700/15 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-500 transition-colors" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Subject</label>
                      <select value={contactSubject} onChange={(e) => setContactSubject(e.target.value)}
                        className="w-full bg-[#13100a] border border-yellow-700/15 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] focus:outline-none focus:border-yellow-500 cursor-pointer">
                        {["General Inquiry", "Room Reservations", "Trekking & Tours", "Spa & Wellness", "Cultural Experiences", "Corporate / Group Events"].map((s) => (
                          <option key={s} value={s} className="bg-[#13100a]">{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-yellow-400 mb-2 font-semibold">Message</label>
                      <textarea rows={5} required value={contactMessage} onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Tell us how we can make your Himalayan journey unforgettable..."
                        className="w-full bg-[#13100a] border border-yellow-700/15 rounded-sm px-4 py-2.5 text-xs text-[#e8e0d0] placeholder-[#3a2e1a] focus:outline-none focus:border-yellow-500 resize-none transition-colors" />
                    </div>
                    <button type="submit"
                      className="btn-gold w-full py-3.5 border border-yellow-600/30 text-yellow-200 hover:bg-yellow-500 hover:text-[#0d0b08] font-semibold uppercase tracking-widest text-xs transition-all duration-300">
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
