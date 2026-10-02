import React, { useState, useEffect, useMemo } from 'react';
import { supabase, supabaseConfigured } from './lib_supabase.js';

// Icons using inline SVG helpers for high performance and zero dependency failures
const IconPhone = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const IconMessageSquare = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconMapPin = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconCalendar = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconUsers = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconCar = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zm-8 1h8M3 10l2-4h10l2 4M3 10v6a1 1 0 001 1h1m12-7v6a1 1 0 01-1 1h-1M3 10h18" />
  </svg>
);

const IconShieldCheck = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconClock = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconCheck = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const IconSearch = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconPlus = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const IconMinus = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const IconX = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconMenu = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconStar = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const IconDatabase = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const IconCompass = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const DEFAULT_SETTINGS = {
  companyName: 'ASWAROODA TREKS & TRAVELS',
  tagline: 'Your Journey. Our Responsibility.',
  secondaryTagline: 'Safe. Comfortable. On Time.',
  phone: '+91 8125130488',
  whatsapp: '918125130488',
  email: 'aswaroodatreksandtravels@gmail.com',
  address: 'No. 12, Main Temple Road, Near Central Station, Tirupati, AP 517501',
  googleMapsUrl: 'https://maps.google.com'
};

const INITIAL_PACKAGES = [
  {
    id: 'pkg-1',
    name: '1 Day Arunachalam Package',
    duration: '1 Day (18 Hours)',
    route: 'Tirupati → Kanipakam → Arunachalam → Golden Temple → Tirupati',
    distance: '395 KM Approx',
    startingPrice: 6500,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'Special one-day divine tour covering Kanipakam Vinayaka, Arunachaleswara Temple, and Vellore Sripuram Golden Temple.',
    itinerary: [
      { time: '06:00 AM', title: 'Pickup from Tirupati', detail: 'Doorstep / Hotel / Station pickup in Tirupati' },
      { time: '07:15 AM', title: 'Tirupati → Kanipakam', detail: '~68 KM drive through comfortable highway' },
      { time: '07:15 AM – 08:15 AM', title: 'Kanipakam Swamy Darshan', detail: 'Darshan of Swayambu Sri Varasiddhi Vinayaka Swamy' },
      { time: '08:15 AM – 09:00 AM', title: 'Breakfast Halt', detail: '45 Minutes break at hygienic restaurant' },
      { time: '09:00 AM – 11:30 AM', title: 'Kanipakam → Arunachalam', detail: '~131 KM highway drive' },
      { time: '11:30 AM – 02:30 PM', title: 'Arunachalam Darshan', detail: '3 Hours dedicated for Arunachaleswara Temple & Lingam' },
      { time: '02:30 PM – 03:15 PM', title: 'Lunch Halt', detail: '45 Minutes lunch break' },
      { time: '03:15 PM – 04:45 PM', title: 'Arunachalam → Golden Temple', detail: '~80 KM journey to Vellore' },
      { time: '04:45 PM – 06:45 PM', title: 'Golden Temple Visit', detail: '2 Hours visit to Sripuram Golden Temple' },
      { time: '06:45 PM – 07:30 PM', title: 'Golden Temple → Tirupati', detail: '~116 KM return drive starts' },
      { time: '07:30 PM – 08:30 PM', title: 'Dinner Halt', detail: '1 Hour relaxed dinner halt' },
      { time: '08:30 PM', title: 'Start Return to Tirupati', detail: 'Smooth smooth highway drive back' },
      { time: '10:30 PM – 10:45 PM', title: 'Tirupati Drop', detail: 'Drop off at your original pickup location' }
    ],
    pricing: {
      'Sedan (4+1)': 6500,
      'Ertiga (6+1)': 8500,
      'Innova (7+1)': 9000,
      'Innova Crysta (7+1)': 9500,
      'Tempo Traveller (12+1)': 13500,
      'Tempo Traveller (17+1)': 14500,
      'Bus (20+1)': 16000
    },
    inclusions: ['AC Vehicle with Professional Driver', 'State Permits & Toll Taxes', 'Parking Fees', 'Fuel Charges'],
    exclusions: ['Temple Darshan Tickets', 'Food & Refreshments', 'Accommodation / Room Stays'],
    note: 'For group strength above 20 passengers, please request a special custom bus quotation.'
  },
  {
    id: 'pkg-2',
    name: '2 Days Arunachalam & Kanchipuram Package',
    duration: '2 Days / 1 Night',
    route: 'Tirupati → Arunachalam → Kanchipuram → Tirupati',
    distance: '520 KM Approx',
    startingPrice: 10000,
    image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive 2-day pilgrimage covering Kanipakam, Golden Temple, Arunachalam, Vishnu & Shiva Kanchi, and Tiruthani.',
    itinerary: [
      { time: 'Day 1 Morning', title: 'Pickup & Kanipakam Visit', detail: 'Pickup from Station/Hotel -> Kanipakam Vinayaka Temple' },
      { time: 'Day 1 Afternoon', title: 'Golden Temple & Arunachalam', detail: 'Sripuram Golden Temple -> Reach Arunachalam' },
      { time: 'Day 1 Evening', title: 'Arunachaleswara Temple & Girivalam', detail: 'Night Darshan / Girivalam at Arunachalam. Night stay at Arunachalam.' },
      { time: 'Day 2 Morning', title: 'Kanchipuram Temples', detail: 'Vishnu Kanchi (Varadaraja Perumal) & Shiva Kanchi (Ekambareswarar)' },
      { time: 'Day 2 Afternoon', title: 'Kanchi Kamakshi & Tiruthani', detail: 'Kamakshi Amman Temple -> Tiruthani Murugan Swamy Temple' },
      { time: 'Day 2 Night', title: 'Return to Tirupati', detail: 'Safe return drop off in Tirupati' }
    ],
    pricing: {
      'New Dzire (4+1)': 10000,
      'New Ertiga (6+1)': 12000,
      'Innova (7+1)': 14000,
      'Innova Crysta (7+1)': 15000
    },
    inclusions: ['Vehicle + Driver', 'Toll + Parking Charges', 'All India Tourist Permit'],
    exclusions: ['Hotel Accommodation (Can be requested)', 'Special Darshan Tickets', 'Driver Food Allowance'],
    note: 'Accommodation is NOT included in basic package unless requested separately in custom notes.'
  },
  {
    id: 'pkg-3',
    name: 'Kanipakam Special Offer',
    duration: 'Half Day (5 Hours)',
    route: 'Tirupati → Kanipakam → Tirupati',
    distance: '135 KM Roundtrip',
    startingPrice: 3500,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'A Journey to Divine Blessings! Quick hassle-free round trip from Tirupati to Kanipakam Swamy Temple.',
    itinerary: [
      { time: 'Flexible Pickup', title: 'Pickup from Tirupati', detail: 'As per your preferred departure time' },
      { time: '1.5 Hours', title: 'Tirupati to Kanipakam', detail: 'Comfortable air-conditioned ride' },
      { time: '2 Hours', title: 'Kanipakam Darshan & Special Puja', detail: 'Darshan time at Swayambu temple' },
      { time: 'Return', title: 'Kanipakam to Tirupati Drop', detail: 'Direct return drop to Tirupati' }
    ],
    pricing: {
      'Sedan (4+1)': 3500,
      'Ertiga (6+1)': 4000,
      'Innova (7+1)': 4500,
      'Innova Crysta (7+1)': 5000,
      'Normal Tempo Traveller (12+1)': 6000
    },
    inclusions: ['Clean Vehicles', 'Safe & Reliable Service', 'Experienced Drivers', 'Tolls & Parking'],
    exclusions: ['Darshan Tickets', 'Meals'],
    note: 'Family friendly quick trip with zero hidden charges.'
  }
];

const INITIAL_VEHICLES = [
  { id: 'v-1', name: 'Sedan (Dzire / Etios)', capacity: '4+1 Passengers', pricePerKm: '₹13/km', startPrice: 3500, ac: true, luggage: '2 Large Bags', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80', rating: 4.9 },
  { id: 'v-2', name: 'Maruti Ertiga', capacity: '6+1 Passengers', pricePerKm: '₹16/km', startPrice: 4000, ac: true, luggage: '3 Medium Bags', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80', rating: 4.8 },
  { id: 'v-3', name: 'Toyota Innova', capacity: '7+1 Passengers', pricePerKm: '₹19/km', startPrice: 4500, ac: true, luggage: '4 Large Bags', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', rating: 4.9 },
  { id: 'v-4', name: 'Innova Crysta', capacity: '7+1 Passengers', pricePerKm: '₹22/km', startPrice: 5000, ac: true, luggage: '4 Large Bags', image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80', rating: 5.0 },
  { id: 'v-5', name: 'Tempo Traveller (12+1)', capacity: '12+1 Passengers', pricePerKm: '₹26/km', startPrice: 6000, ac: true, luggage: '8 Large Bags', image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80', rating: 4.9 },
  { id: 'v-6', name: 'Tempo Traveller Luxury (17+1)', capacity: '17+1 Passengers', pricePerKm: '₹30/km', startPrice: 14500, ac: true, luggage: '12 Bags', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80', rating: 4.9 },
  { id: 'v-7', name: 'Luxury Bus (20+1)', capacity: '20+1 Passengers', pricePerKm: '₹38/km', startPrice: 16000, ac: true, luggage: 'Full Boot Space', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80', rating: 4.9 }
];

const DESTINATIONS = [
  { id: 'd-1', name: 'Tirupati', tag: 'Divine Abode', description: 'Home of Lord Venkateswara Temple on Seven Hills.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-2', name: 'Kanipakam', tag: 'Swayambu Vinayaka', description: 'Famous for the water-growing Swayambu Varasiddhi Vinayaka Swamy.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-3', name: 'Arunachalam', tag: 'Agni Lingam', description: 'Tiruvannamalai temple of Lord Shiva and sacred Girivalam path.', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-4', name: 'Kanchipuram', tag: 'City of Temples', description: 'Famous for Kamakshi Amman Temple and world-renowned silk sarees.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-5', name: 'Vellore', tag: 'Sripuram Golden Temple', description: 'Magnificent golden temple surrounded by spiritual star path.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-6', name: 'Chennai', tag: 'Metropolitan Gateway', description: 'Marina Beach, Kapaleeshwarar Temple, and heritage culture.', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-7', name: 'Hyderabad', tag: 'City of Pearls', description: 'Charminar, Golconda Fort, Ramoji Film City, and royal cuisine.', image: 'https://images.unsplash.com/photo-1572252821143-2041ee77238b?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-8', name: 'Goa', tag: 'Coastal Paradise', description: 'Pristine beaches, Portuguese architecture, and nightlife.', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-9', name: 'Ooty', tag: 'Queen of Hill Stations', description: 'Tea gardens, cool mountain air, lakes, and toy train rides.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 'd-10', name: 'Kerala', tag: 'God’s Own Country', description: 'Backwaters of Alleppey, Munnar tea hills, and serene beaches.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80' }
];

const INITIAL_BOOKINGS = [
  {
    id: 'AST-2026-0001',
    customerName: 'Kamesh Sharma',
    mobile: '8125130488',
    whatsapp: '9876543210',
    pickup: 'Tirupati Central Station',
    destination: 'Arunachalam',
    travelDate: '2026-10-15',
    pickupTime: '06:00 AM',
    travellers: 6,
    packageName: '1 Day Arunachalam Package',
    vehicleName: 'Innova Crysta (7+1)',
    totalPrice: 9500,
    specialNotes: 'Senior citizens travelling, please assign an experienced gentle driver.',
    status: 'NEW',
    createdAt: '2026-09-30 14:20'
  },
  {
    id: 'AST-2026-0002',
    customerName: 'Priya Rajan',
    mobile: '8125130488',
    whatsapp: '815130488',
    pickup: 'Hotel Fortune Select, Tirupati',
    destination: 'Kanipakam',
    travelDate: '2026-10-02',
    pickupTime: '07:30 AM',
    travellers: 4,
    packageName: 'Kanipakam Special Offer',
    vehicleName: 'Sedan (4+1)',
    totalPrice: 3500,
    specialNotes: 'Need AC on throughout.',
    status: 'CONFIRMED',
    createdAt: '2026-09-29 10:15'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, packages, vehicles, destinations, mytrips, custom, contact, admin
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('aswooroda_settings');
    if (!saved) return DEFAULT_SETTINGS;
    try {
      const parsed = JSON.parse(saved);
      // Migrate the old invalid WhatsApp number saved by earlier builds.
      if (String(parsed.whatsapp || '').replace(/\D/g, '') === '91815130488' || parsed.whatsapp === '91 815130488') {
        parsed.whatsapp = DEFAULT_SETTINGS.whatsapp;
      }
      return { ...DEFAULT_SETTINGS, ...parsed, whatsapp: parsed.whatsapp || DEFAULT_SETTINGS.whatsapp };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('aswooroda_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('aswooroda_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('aswooroda_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // Booking Flow State
  const [searchParams, setSearchParams] = useState({
    pickup: 'Tirupati',
    destination: 'Arunachalam',
    travellers: 4,
    date: new Date().toISOString().split('T')[0]
  });

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [packageDetailModal, setPackageDetailModal] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminTab, setAdminTab] = useState('requests'); // requests, packages, vehicles, settings, sql
  const [adminPinInput, setAdminPinInput] = useState('');
  const [editingPackage, setEditingPackage] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [fleetEditorOpen, setFleetEditorOpen] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({
    id: '', name: '', type: 'Sedan', capacity: '4+1 Passengers', startPrice: 0,
    pricePerKm: '₹13/km', ac: true, luggage: '2 Large Bags', image: '', rating: 5,
    registrationNumber: '', driverName: '', status: 'AVAILABLE', notes: ''
  });
  const [packageEditorOpen, setPackageEditorOpen] = useState(false);
  const [packageForm, setPackageForm] = useState({
    id: '', name: '', duration: '1 Day', route: 'Tirupati → ', distance: '', startingPrice: 0,
    image: '', description: '', note: '', pricingText: '', inclusionsText: '', exclusionsText: '', itineraryText: ''
  });
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aswooroda_notifications') || '[]'); } catch { return []; }
  });
  const [notificationPermission, setNotificationPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  // Booking Form Fields
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    whatsapp: '',
    pickup: 'Tirupati Railway Station',
    destination: 'Arunachalam',
    travelDate: new Date().toISOString().split('T')[0],
    pickupTime: '06:00 AM',
    travellers: 4,
    packageName: '1 Day Arunachalam Package',
    vehicleName: 'Innova (7+1)',
    price: 9000,
    specialNotes: '',
    accommodation: false,
    darshanAssistance: true
  });

  // Track / Search Booking State
  const [trackerSearch, setTrackerSearch] = useState('');
  const [searchedBooking, setSearchedBooking] = useState(null);

  useEffect(() => {
    const safeSettings = {
      ...settings,
      whatsapp: normalizeWhatsAppNumber(settings.whatsapp) === '91815130488'
        ? DEFAULT_SETTINGS.whatsapp
        : normalizeWhatsAppNumber(settings.whatsapp)
    };
    if (safeSettings.whatsapp !== settings.whatsapp) {
      setSettings(prev => ({ ...prev, whatsapp: safeSettings.whatsapp }));
      return;
    }
    localStorage.setItem('aswooroda_settings', JSON.stringify(safeSettings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('aswooroda_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('aswooroda_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('aswooroda_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('aswooroda_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Load fleet from Supabase when configured; localStorage remains the offline fallback.
  useEffect(() => {
    let cancelled = false;
    const loadVehicles = async () => {
      if (!supabaseConfigured || !supabase) return;
      const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: true });
      if (cancelled || error || !data?.length) return;
      setVehicles(data.map(v => ({
        id: v.id, name: v.name, type: v.type || 'Vehicle', capacity: v.capacity || '',
        startPrice: Number(v.start_price || 0), pricePerKm: v.price_per_km || '', ac: v.ac !== false,
        luggage: v.luggage || '', image: v.image || '', rating: Number(v.rating || 5),
        registrationNumber: v.registration_number || '', driverName: v.driver_name || '',
        status: v.status || 'AVAILABLE', notes: v.notes || ''
      })));
    };
    loadVehicles();
    return () => { cancelled = true; };
  }, []);

  // Load the real booking list from Supabase and keep it live across devices/tabs.
  // This is the main customer -> Owner Dashboard realtime bridge.
  useEffect(() => {
    if (!supabaseConfigured || !supabase) return;

    let cancelled = false;

    const mapBookingRow = (b) => ({
      id: b.id,
      customerName: b.customer_name || '',
      mobile: b.mobile || '',
      whatsapp: b.whatsapp || b.mobile || '',
      pickup: b.pickup || '',
      destination: b.destination || '',
      travelDate: b.travel_date || '',
      pickupTime: b.pickup_time || '',
      travellers: Number(b.travellers || 1),
      packageName: b.package_name || '',
      vehicleName: b.vehicle_name || '',
      totalPrice: b.total_price == null ? 0 : Number(b.total_price),
      specialNotes: b.special_notes || '',
      status: b.status || 'NEW',
      createdAt: b.created_at || new Date().toISOString()
    });

    const loadBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (cancelled) return;
      if (error) {
        console.error('Supabase booking load failed:', error);
        return;
      }
      if (data) setBookings(data.map(mapBookingRow));
    };

    loadBookings();

    const channel = supabase
      .channel('aswooroda-bookings-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          if (cancelled) return;

          if (payload.eventType === 'INSERT' && payload.new) {
            const booking = mapBookingRow(payload.new);
            setBookings(prev => [booking, ...prev.filter(b => b.id !== booking.id)]);
            setNotifications(prev => {
              const alreadyExists = prev.some(n => String(n.desc || '').includes(booking.id));
              if (alreadyExists) return prev;
              const item = {
                id: Date.now(),
                title: `New booking ${booking.id}`,
                desc: `${booking.customerName} requested ${booking.packageName || 'a trip'} for ${booking.travelDate}.`,
                type: 'BOOKING',
                unread: true,
                createdAt: new Date().toISOString()
              };
              return [item, ...prev].slice(0, 100);
            });
          }

          if (payload.eventType === 'UPDATE' && payload.new) {
            const booking = mapBookingRow(payload.new);
            setBookings(prev => {
              const exists = prev.some(b => b.id === booking.id);
              return exists
                ? prev.map(b => b.id === booking.id ? booking : b)
                : [booking, ...prev];
            });
          }

          if (payload.eventType === 'DELETE' && payload.old) {
            setBookings(prev => prev.filter(b => b.id !== payload.old.id));
          }
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') console.error('Supabase bookings realtime channel error');
      });

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  // Keep an already-open tracking result live when the owner changes its status.
  useEffect(() => {
    if (!searchedBooking?.id) return;
    const latest = bookings.find(b => b.id === searchedBooking.id);
    if (latest) setSearchedBooking(latest);
  }, [bookings, searchedBooking?.id]);

  // Keep customer and owner tabs in sync when they are opened in the same browser.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'aswooroda_packages' && event.newValue) { try { setPackages(JSON.parse(event.newValue)); } catch {} }
      if (event.key === 'aswooroda_vehicles' && event.newValue) { try { setVehicles(JSON.parse(event.newValue)); } catch {} }
      if (event.key === 'aswooroda_bookings' && event.newValue) { try { setBookings(JSON.parse(event.newValue)); } catch {} }
      if (event.key === 'aswooroda_notifications' && event.newValue) { try { setNotifications(JSON.parse(event.newValue)); } catch {} }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openVehicleEditor = (vehicle = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setVehicleForm({
        id: vehicle.id || '', name: vehicle.name || '', type: vehicle.type || 'Sedan',
        capacity: vehicle.capacity || '', startPrice: Number(vehicle.startPrice || 0),
        pricePerKm: vehicle.pricePerKm || '', ac: vehicle.ac !== false,
        luggage: vehicle.luggage || '', image: vehicle.image || '', rating: Number(vehicle.rating || 5),
        registrationNumber: vehicle.registrationNumber || '', driverName: vehicle.driverName || '',
        status: vehicle.status || 'AVAILABLE', notes: vehicle.notes || ''
      });
    } else {
      setEditingVehicle(null);
      setVehicleForm({
        id: '', name: '', type: 'Sedan', capacity: '4+1 Passengers', startPrice: 0,
        pricePerKm: '₹13/km', ac: true, luggage: '2 Large Bags', image: '', rating: 5,
        registrationNumber: '', driverName: '', status: 'AVAILABLE', notes: ''
      });
    }
    setFleetEditorOpen(true);
  };

  const saveVehicle = async () => {
    if (!vehicleForm.name.trim()) { showToast('Vehicle name is required'); return; }
    const vehicle = {
      ...vehicleForm,
      id: vehicleForm.id || `v-${Date.now()}`,
      name: vehicleForm.name.trim(),
      startPrice: Number(vehicleForm.startPrice || 0),
      rating: Number(vehicleForm.rating || 5)
    };

    setVehicles(prev => {
      const exists = prev.some(v => v.id === vehicle.id);
      return exists ? prev.map(v => v.id === vehicle.id ? vehicle : v) : [vehicle, ...prev];
    });

    if (supabaseConfigured && supabase) {
      const payload = {
        id: vehicle.id, name: vehicle.name, type: vehicle.type, capacity: vehicle.capacity,
        start_price: vehicle.startPrice, price_per_km: vehicle.pricePerKm, ac: vehicle.ac,
        luggage: vehicle.luggage, image: vehicle.image, rating: vehicle.rating,
        registration_number: vehicle.registrationNumber || null, driver_name: vehicle.driverName || null,
        status: vehicle.status, notes: vehicle.notes || null
      };
      const { error } = await supabase.from('vehicles').upsert(payload);
      if (error) showToast(`Saved locally. Supabase vehicle sync failed: ${error.message}`);
      else showToast('Vehicle saved to Supabase');
    } else {
      showToast('Vehicle saved');
    }
    setFleetEditorOpen(false);
    setEditingVehicle(null);
  };

  const deleteVehicle = async (vehicle) => {
    if (!window.confirm(`Delete ${vehicle.name}?`)) return;
    setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
    if (supabaseConfigured && supabase) {
      const { error } = await supabase.from('vehicles').delete().eq('id', vehicle.id);
      if (error) showToast(`Deleted locally. Supabase delete failed: ${error.message}`);
      else showToast('Vehicle deleted from Supabase');
    } else {
      showToast('Vehicle deleted');
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchParams(prev => ({ ...prev, pickup: 'Current Location (Tirupati Region)' }));
          setFormData(prev => ({ ...prev, pickup: 'Current Location (Tirupati Region)' }));
          showToast('📍 Location acquired: Tirupati Region');
        },
        () => {
          showToast('⚠️ Could not auto-detect location. Defaulted to Tirupati.');
        }
      );
    } else {
      showToast('⚠️ Geolocation is not supported by your browser.');
    }
  };

  const normalizeWhatsAppNumber = (value) => String(value || '').replace(/\D/g, '');

  const generateWhatsAppUrl = (booking, isOwnerView = false) => {
    const text = isOwnerView
      ? `Hello ${booking.customerName}, this is ASWAROODA TREKS & TRAVELS regarding your trip request #${booking.id} (${booking.packageName || 'Custom Trip'}). We have reviewed your request!`
      : `*NEW TRIP REQUEST - ASWAROODA TREKS & TRAVELS*\n\n*Booking ID:* ${booking.id}\n*Customer:* ${booking.customerName}\n*Mobile:* ${booking.mobile}\n*WhatsApp:* ${booking.whatsapp || booking.mobile}\n*Pickup:* ${booking.pickup}\n*Destination:* ${booking.destination}\n*Date:* ${booking.travelDate} at ${booking.pickupTime}\n*Travellers:* ${booking.travellers}\n*Package:* ${booking.packageName}\n*Vehicle:* ${booking.vehicleName}\n*Estimated Price:* ₹${booking.totalPrice || 'Quotation Required'}\n*Notes:* ${booking.specialNotes || 'None'}\n\nPlease contact the customer and confirm availability.`;
    const targetPhone = isOwnerView ? (booking.whatsapp || booking.mobile) : settings.whatsapp;
    const digits = normalizeWhatsAppNumber(targetPhone);
    return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
  };

  const addNotification = (title, desc, type = 'BOOKING') => {
    const item = { id: Date.now(), title, desc, type, unread: true, createdAt: new Date().toISOString() };
    setNotifications(prev => [item, ...prev].slice(0, 100));
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try { new Notification(title, { body: desc, icon: '/icon-192.png' }); } catch {}
    }
  };

  const enableBrowserNotifications = async () => {
    if (typeof Notification === 'undefined') { showToast('Browser notifications are not supported here.'); return; }
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        addNotification('Notifications enabled', 'ASWAROODA TREKS & TRAVELS browser notifications are now enabled.', 'SYSTEM');
        showToast('🔔 Browser notifications enabled.');
      } else { showToast('Notifications permission was not granted.'); }
    } catch { showToast('Could not enable browser notifications.'); }
  };


  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.mobile || !formData.pickup || !formData.destination) {
      showToast('⚠️ Please fill in all required customer details.');
      return;
    }

    const newId = `AST-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newId,
      customerName: formData.customerName,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      pickup: formData.pickup,
      destination: formData.destination,
      travelDate: formData.travelDate,
      pickupTime: formData.pickupTime,
      travellers: formData.travellers,
      packageName: formData.packageName,
      vehicleName: formData.vehicleName,
      totalPrice: formData.price,
      specialNotes: formData.specialNotes,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    if (supabaseConfigured && supabase) {
      const { error } = await supabase.from('bookings').insert({
        id: newBooking.id,
        customer_name: newBooking.customerName,
        mobile: newBooking.mobile,
        whatsapp: newBooking.whatsapp,
        pickup: newBooking.pickup,
        destination: newBooking.destination,
        travel_date: newBooking.travelDate,
        pickup_time: newBooking.pickupTime,
        travellers: newBooking.travellers,
        package_name: newBooking.packageName,
        vehicle_name: newBooking.vehicleName,
        total_price: newBooking.totalPrice || null,
        special_notes: newBooking.specialNotes || null,
        status: 'NEW'
      });
      if (error) {
        console.error('Supabase booking insert failed:', error);
        showToast(`⚠️ Booking could not be saved to database: ${error.message}`);
        return;
      }
    }

    setBookings(prev => [newBooking, ...prev]);
    addNotification(
      `New booking ${newId}`,
      `${newBooking.customerName} requested ${newBooking.packageName} for ${newBooking.travelDate}.`,
      'BOOKING'
    );
    setConfirmedBooking(newBooking);
    setBookingModalOpen(false);
    showToast(supabaseConfigured
      ? `✅ ${newId} saved. Owner WhatsApp notification will be sent by Supabase.`
      : `✅ Trip Request ${newId} saved locally. Connect Supabase + WhatsApp API for automatic notification.`
    );
  };

  const handleCustomTripSubmit = async (e) => {
    e.preventDefault();
    const newId = `AST-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: newId,
      customerName: formData.customerName,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || formData.mobile,
      pickup: formData.pickup,
      destination: formData.destination,
      travelDate: formData.travelDate,
      pickupTime: formData.pickupTime,
      travellers: formData.travellers,
      packageName: 'Custom Trip Quotation Request',
      vehicleName: formData.vehicleName,
      totalPrice: 0,
      specialNotes: `Places to visit: ${formData.specialNotes}. Accommodation: ${formData.accommodation ? 'Yes' : 'No'}. Darshan: ${formData.darshanAssistance ? 'Yes' : 'No'}`,
      status: 'NEW',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    if (supabaseConfigured && supabase) {
      const { error } = await supabase.from('bookings').insert({
        id: newBooking.id,
        customer_name: newBooking.customerName,
        mobile: newBooking.mobile,
        whatsapp: newBooking.whatsapp,
        pickup: newBooking.pickup,
        destination: newBooking.destination,
        travel_date: newBooking.travelDate,
        pickup_time: newBooking.pickupTime,
        travellers: newBooking.travellers,
        package_name: newBooking.packageName,
        vehicle_name: newBooking.vehicleName,
        total_price: null,
        special_notes: newBooking.specialNotes,
        status: 'NEW'
      });
      if (error) {
        console.error('Supabase custom trip insert failed:', error);
        showToast(`⚠️ Custom trip could not be saved: ${error.message}`);
        return;
      }
    }

    setBookings(prev => [newBooking, ...prev.filter(b => b.id !== newBooking.id)]);
    setConfirmedBooking(newBooking);
    showToast(supabaseConfigured
      ? '🚀 Custom Trip Request Sent! Owner WhatsApp notification will be sent automatically.'
      : '🚀 Custom Trip Request saved locally. Connect Supabase + WhatsApp Cloud API for automatic owner notification.'
    );
  };

  const startPackageBooking = (pkg, vehicleName = null) => {
    const selectedVehName = vehicleName || Object.keys(pkg.pricing || {})[0] || 'Innova (7+1)';
    const calculatedPrice = pkg.pricing ? (pkg.pricing[selectedVehName] || pkg.startingPrice) : pkg.startingPrice;

    setSelectedPackage(pkg);
    setFormData(prev => ({
      ...prev,
      packageName: pkg.name,
      destination: pkg.route.split('→')[1]?.trim() || pkg.name,
      vehicleName: selectedVehName,
      price: calculatedPrice
    }));
    setBookingModalOpen(true);
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    if (supabaseConfigured && supabase) {
      const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
      if (error) {
        console.error('Supabase booking status update failed:', error);
        showToast(`⚠️ Status update failed: ${error.message}`);
        return;
      }
    }

    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    addNotification(`Booking ${id} → ${newStatus}`, `${booking.customerName} / ${booking.packageName}`, 'STATUS');
    showToast(supabaseConfigured
      ? `✅ ${id} updated. Customer WhatsApp notification will be sent automatically.`
      : `Updated ${id} status to ${newStatus}`
    );
  };

  // Delete a booking from the Owner Dashboard.
  // If Supabase is connected, only remove it from the UI after the database delete succeeds.
  const handleDeleteBooking = async (booking) => {
    if (!booking?.id) return;

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete booking ${booking.id}?`
    );
    if (!confirmed) return;

    if (supabaseConfigured && supabase) {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', booking.id);

      if (error) {
        console.error('Supabase booking delete failed:', error);
        showToast(`Delete failed: ${error.message}`);
        return;
      }
    }

    setBookings(prev => prev.filter(item => item.id !== booking.id));
    setNotifications(prev =>
      prev.filter(item => !String(item.desc || '').includes(booking.id))
    );
    showToast(
      supabaseConfigured
        ? `Booking ${booking.id} deleted successfully.`
        : `Booking ${booking.id} deleted from this browser.`
    );
  };

  const openPackageEditor = (pkg = null) => {
    const p = pkg || { name: '', duration: '1 Day', route: 'Tirupati → ', distance: '', startingPrice: 0, image: '', description: '', note: '', pricing: {}, inclusions: [], exclusions: [], itinerary: [] };
    setEditingPackage(pkg);
    setPackageForm({
      id: p.id || '', name: p.name || '', duration: p.duration || '', route: p.route || '', distance: p.distance || '',
      startingPrice: p.startingPrice || 0, image: p.image || '', description: p.description || '', note: p.note || '',
      pricingText: Object.entries(p.pricing || {}).map(([k,v]) => `${k}=${v}`).join('\n'),
      inclusionsText: (p.inclusions || []).join('\n'), exclusionsText: (p.exclusions || []).join('\n'),
      itineraryText: (p.itinerary || []).map(x => `${x.time || ''}|${x.title || ''}|${x.detail || ''}`).join('\n')
    });
    setPackageEditorOpen(true);
  };

  const savePackageFromEditor = (e) => {
    e.preventDefault();
    if (!packageForm.name.trim() || !packageForm.route.trim()) { showToast('Package name and route are required.'); return; }
    const pricing = {};
    packageForm.pricingText.split('\n').map(x => x.trim()).filter(Boolean).forEach(line => {
      const [name, price] = line.split('=');
      if (name && price) pricing[name.trim()] = Number(String(price).replace(/[^0-9.]/g, '')) || 0;
    });
    const itinerary = packageForm.itineraryText.split('\n').map(x => x.trim()).filter(Boolean).map(line => {
      const [time='', title='', detail=''] = line.split('|');
      return { time: time.trim(), title: title.trim(), detail: detail.trim() };
    });
    const pkg = {
      id: packageForm.id || `pkg-${Date.now()}`, name: packageForm.name.trim(), duration: packageForm.duration.trim(), route: packageForm.route.trim(),
      distance: packageForm.distance.trim(), startingPrice: Number(packageForm.startingPrice) || Math.min(...Object.values(pricing).filter(Boolean), 0),
      image: packageForm.image.trim() || 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
      description: packageForm.description.trim(), note: packageForm.note.trim(), pricing, itinerary,
      inclusions: packageForm.inclusionsText.split('\n').map(x => x.trim()).filter(Boolean),
      exclusions: packageForm.exclusionsText.split('\n').map(x => x.trim()).filter(Boolean)
    };
    setPackages(prev => prev.some(x => x.id === pkg.id) ? prev.map(x => x.id === pkg.id ? pkg : x) : [pkg, ...prev]);
    setPackageEditorOpen(false);
    setEditingPackage(null);
    addNotification(editingPackage ? 'Package updated' : 'New package added', pkg.name, 'PACKAGE');
    showToast(editingPackage ? `Updated ${pkg.name}` : `Added ${pkg.name}`);
  };

  return (
    <div className="aasw-site-shell min-h-screen text-slate-800 font-sans pb-20 md:pb-0 relative">
      <style>{`
        .aasw-site-shell { isolation: isolate; background: transparent; }
        /* HIGH-CONTRAST TEXT: keep every section title readable over the car photo */
        .aasw-site-shell h1,
        .aasw-site-shell h2,
        .aasw-site-shell h3,
        .aasw-site-shell h4 {
          color: #ffffff !important;
          font-weight: 900 !important;
          text-shadow: 0 2px 5px rgba(0,0,0,.98), 0 5px 16px rgba(0,0,0,.85);
          letter-spacing: .015em;
        }
        .aasw-site-shell h2 { text-decoration-color: #fbbf24; }
        .aasw-site-shell h1 { text-shadow: 0 3px 7px #000, 0 0 22px rgba(0,0,0,.85); }
        .aasw-site-shell .aasw-section-title { color: #ffd166 !important; }
        .aasw-site-shell header {
          background: rgba(3, 12, 24, .94) !important;
          border-color: rgba(255,255,255,.16) !important;
          backdrop-filter: blur(12px);
        }
        .aasw-site-shell header button,
        .aasw-site-shell header a,
        .aasw-site-shell header span { text-shadow: 0 1px 3px rgba(0,0,0,.65); }
        .aasw-site-shell header .text-slate-900 { color: #ffffff !important; }
        .aasw-site-shell header .text-orange-600 { color: #ffd166 !important; }
        .aasw-site-shell header .text-slate-500,
        .aasw-site-shell header .text-slate-600 { color: #e2e8f0 !important; }
        .aasw-site-shell header .bg-slate-100 { background: rgba(255,255,255,.12) !important; }
        .aasw-site-shell header .hover\:bg-slate-100:hover { background: rgba(255,255,255,.16) !important; }
        .aasw-site-shell .aasw-section-title { color: #ffd166 !important; }
        .aasw-site-shell .aasw-readable-text { color: #fff !important; text-shadow: 0 2px 5px #000; }
        /* Keep the cinematic car landscape visible behind the entire site, not just the hero. */
        .aasw-site-shell::before { background-attachment: fixed; }
        .aasw-site-shell section.bg-slate-100,
        .aasw-site-shell section.bg-white {
          background: rgba(4, 14, 27, .58) !important;
          color: #f8fafc;
          border-color: rgba(255,255,255,.12);
          backdrop-filter: blur(2px);
        }
        .aasw-site-shell section.bg-slate-100 h1,
        .aasw-site-shell section.bg-slate-100 h2,
        .aasw-site-shell section.bg-slate-100 h3,
        .aasw-site-shell section.bg-white h1,
        .aasw-site-shell section.bg-white h2,
        .aasw-site-shell section.bg-white h3 { color: #fff !important; }
        .aasw-site-shell footer {
          background: rgba(2, 8, 16, .86) !important;
          backdrop-filter: blur(8px);
          border-color: rgba(255,255,255,.12);
        }
        .aasw-site-shell::before {
          content: ""; position: fixed; inset: 0; z-index: -2;
          background: url("/aswarooda-car-background.png") center 72% / cover no-repeat;
          transform: translateZ(0);
        }
        .aasw-site-shell::after {
          content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
          background: linear-gradient(180deg, rgba(3,12,24,.42), rgba(3,12,24,.62));
        }
        @keyframes aaswCinematicDrive {
          0% { transform: scale(1.02) translate3d(0, 0, 0); }
          50% { transform: scale(1.06) translate3d(-0.4%, -0.2%, 0); }
          100% { transform: scale(1.02) translate3d(0, 0, 0); }
        }
        @keyframes aaswLightSweep {
          0% { opacity: 0.05; transform: translateX(-25%); }
          50% { opacity: 0.24; }
          100% { opacity: 0.05; transform: translateX(25%); }
        }
        .aasw-hero-car { animation: aaswCinematicDrive 24s ease-in-out infinite; will-change: transform; }
        .aasw-light-sweep { background: linear-gradient(115deg, transparent 25%, rgba(255,190,80,.12) 48%, transparent 70%); animation: aaswLightSweep 12s ease-in-out infinite alternate; mix-blend-mode: screen; }
        @keyframes aaswDestinationMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .aasw-destination-track { display:flex; width:max-content; animation: aaswDestinationMarquee 42s linear infinite; }
        .aasw-destination-track:hover { animation-play-state: paused; }
        .aasw-destination-card { width:220px; height:250px; flex:0 0 auto; }
        @media (max-width:640px) { .aasw-destination-card { width:172px; height:218px; } .aasw-destination-track { animation-duration:34s; } }
        @media (prefers-reduced-motion: reduce) { .aasw-destination-track { animation:none !important; } }
        @media (prefers-reduced-motion: reduce) { .aasw-hero-car, .aasw-light-sweep { animation: none !important; } }
        /* Homepage polish: clear visual hierarchy, balanced hero, and accessible trip planner. */
        .aasw-site-shell .aasw-home-title { max-width: 12ch; font-size: clamp(2.55rem, 4.4vw, 4.35rem); line-height: 1.02; text-wrap: balance; }
        .aasw-site-shell .aasw-trip-planner { background: rgba(5, 16, 31, .94) !important; border: 1px solid rgba(255, 190, 72, .58) !important; box-shadow: 0 24px 70px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.08); }
        .aasw-site-shell .aasw-trip-planner label { color: #f8fafc !important; font-size: .72rem; letter-spacing: .07em; }
        .aasw-site-shell .aasw-trip-planner input { min-height: 48px; }
        .aasw-site-shell .aasw-trip-planner input[type="text"] { padding-left: 2.7rem !important; }
        .aasw-site-shell .aasw-trip-planner input[type="text"][placeholder="Enter pickup location"] { padding-right: 7.3rem !important; }
        .aasw-site-shell .aasw-trip-planner .relative > svg { z-index: 2; pointer-events: none; }
        .aasw-site-shell .aasw-trip-planner button[type="submit"] { min-height: 50px; letter-spacing: .035em; box-shadow: 0 10px 26px rgba(234,88,12,.24); }
        .aasw-site-shell .aasw-destination-card { width: 236px; height: 270px; transition: transform .25s ease, border-color .25s ease; }
        .aasw-site-shell .aasw-destination-card:hover { transform: translateY(-4px); border-color: rgba(251,191,36,.8); }
        .aasw-site-shell .aasw-destination-card img { background: linear-gradient(135deg,#14243a,#050b14); }
        .aasw-site-shell .aasw-destination-card h3 { font-size: 1.2rem; line-height: 1.2; }
        .aasw-site-shell .aasw-destination-card > div:last-child { padding: 1rem; }
        .aasw-site-shell section:has(.aasw-destination-track) { padding-top: 2.75rem; padding-bottom: 3rem; }
        @media (max-width: 1023px) { .aasw-site-shell .aasw-home-title { max-width: 15ch; } }
        @media (max-width: 640px) {
          .aasw-site-shell .aasw-home-title { font-size: clamp(2.25rem, 10vw, 3.2rem); }
          .aasw-site-shell .aasw-trip-planner { border-radius: 1.25rem; padding: 1.15rem !important; }
          .aasw-site-shell .aasw-destination-card { width: 190px; height: 232px; }
          .aasw-site-shell .aasw-destination-track { animation-duration: 48s; }
        }

        /* Screenshot fixes: clear hero planner fields, icons never overlap values, and readable counter. */
        .aasw-site-shell input[type="text"], .aasw-site-shell input[type="date"], .aasw-site-shell select { min-height: 44px; }
        .aasw-site-shell .lg\:col-span-5 input[type="text"] { padding-left: 42px !important; padding-right: 12px !important; }
        .aasw-site-shell .lg\:col-span-5 input[type="text"][placeholder="Enter pickup location"] { padding-right: 112px !important; }
        .aasw-site-shell .lg\:col-span-5 input::placeholder { color: #cbd5e1 !important; }
        .aasw-site-shell .lg\:col-span-5 label { color: #f8fafc !important; letter-spacing: .04em; }
        .aasw-site-shell .lg\:col-span-5 .bg-slate-50 { background: #f8fafc !important; color: #0f172a !important; }
        .aasw-site-shell .lg\:col-span-5 .bg-slate-50 span { color: #0f172a !important; }
        .aasw-site-shell .lg\:col-span-5 button.w-7 { background: #fff !important; color: #0f172a !important; border: 1px solid #cbd5e1 !important; }
        .aasw-site-shell .lg\:col-span-5 button.w-7 svg { color: #0f172a !important; }
        .aasw-site-shell .aasw-destination-card img { background: #172337; }
        .aasw-site-shell .aasw-destination-card img:not([src]), .aasw-site-shell .aasw-destination-card img[src=""] { display:none; }
        @media (max-width: 640px) { .aasw-site-shell .lg\:col-span-5 { padding: 1.1rem !important; } .aasw-site-shell .lg\:col-span-5 .grid-cols-2 { gap: .65rem; } }

        /* FIX: form controls should not appear as plain white boxes over the photo. */
        .aasw-site-shell input:not([type="checkbox"]):not([type="radio"]),
        .aasw-site-shell select,
        .aasw-site-shell textarea {
          background-color: rgba(8, 20, 36, .92) !important;
          color: #f8fafc !important;
          border: 1px solid rgba(251, 191, 36, .58) !important;
          border-radius: 10px;
          caret-color: #fbbf24;
          color-scheme: dark;
        }
        .aasw-site-shell input::placeholder,
        .aasw-site-shell textarea::placeholder { color: #cbd5e1 !important; opacity: 1; }
        .aasw-site-shell select option { background: #0b1728; color: #f8fafc; }
        .aasw-site-shell input:focus,
        .aasw-site-shell select:focus,
        .aasw-site-shell textarea:focus {
          outline: 2px solid rgba(251, 191, 36, .75);
          outline-offset: 1px;
          border-color: #fbbf24 !important;
        }
        /* Premium Bootstrap-inspired surface system: strong contrast, tidy spacing, no dependency required. */
        .aasw-site-shell form,
        .aasw-site-shell .bg-white.rounded-2xl,
        .aasw-site-shell .bg-white.rounded-3xl {
          background: linear-gradient(145deg, rgba(10, 25, 43, .97), rgba(5, 14, 27, .94)) !important;
          border: 1px solid rgba(255, 198, 89, .30) !important;
          border-radius: 18px;
          color: #f8fafc;
          box-shadow: 0 18px 48px rgba(0,0,0,.26), inset 0 1px 0 rgba(255,255,255,.05);
          backdrop-filter: blur(14px);
        }
        .aasw-site-shell form label,
        .aasw-site-shell .bg-white.rounded-2xl label,
        .aasw-site-shell .bg-white.rounded-3xl label { color: #f8fafc !important; font-weight: 700; }
        .aasw-site-shell form p,
        .aasw-site-shell form small { color: #cbd5e1 !important; }
        /* Correct the global white-heading rule inside dark panels, including modal titles. */
        .aasw-site-shell form h1, .aasw-site-shell form h2,
        .aasw-site-shell form h3, .aasw-site-shell form h4,
        .aasw-site-shell .bg-white.rounded-2xl h1,
        .aasw-site-shell .bg-white.rounded-2xl h2,
        .aasw-site-shell .bg-white.rounded-2xl h3,
        .aasw-site-shell .bg-white.rounded-2xl h4,
        .aasw-site-shell .bg-white.rounded-3xl h1,
        .aasw-site-shell .bg-white.rounded-3xl h2,
        .aasw-site-shell .bg-white.rounded-3xl h3,
        .aasw-site-shell .bg-white.rounded-3xl h4 { color: #fff !important; text-shadow: 0 2px 8px rgba(0,0,0,.45); }
        .aasw-site-shell form .text-slate-900,
        .aasw-site-shell form .text-slate-800,
        .aasw-site-shell form .text-slate-700,
        .aasw-site-shell form .text-gray-900,
        .aasw-site-shell form .text-gray-800,
        .aasw-site-shell .bg-white.rounded-2xl .text-slate-900,
        .aasw-site-shell .bg-white.rounded-2xl .text-slate-800,
        .aasw-site-shell .bg-white.rounded-2xl .text-slate-700,
        .aasw-site-shell .bg-white.rounded-3xl .text-slate-900,
        .aasw-site-shell .bg-white.rounded-3xl .text-slate-800,
        .aasw-site-shell .bg-white.rounded-3xl .text-slate-700 { color: #f8fafc !important; }
        .aasw-site-shell form .text-slate-500,
        .aasw-site-shell form .text-slate-600,
        .aasw-site-shell .bg-white.rounded-2xl .text-slate-500,
        .aasw-site-shell .bg-white.rounded-2xl .text-slate-600,
        .aasw-site-shell .bg-white.rounded-3xl .text-slate-500,
        .aasw-site-shell .bg-white.rounded-3xl .text-slate-600 { color: #cbd5e1 !important; }
        .aasw-site-shell input:not([type="checkbox"]):not([type="radio"]),
        .aasw-site-shell select, .aasw-site-shell textarea {
          display: block; width: 100%; min-height: 46px; padding: .7rem .9rem;
          background: rgba(3, 11, 22, .92) !important; color: #f8fafc !important;
          border: 1px solid rgba(203,213,225,.35) !important; border-radius: 11px;
          transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .aasw-site-shell input:hover, .aasw-site-shell select:hover, .aasw-site-shell textarea:hover { border-color: rgba(251,191,36,.75) !important; }
        .aasw-site-shell input:focus, .aasw-site-shell select:focus, .aasw-site-shell textarea:focus {
          border-color: #fbbf24 !important; box-shadow: 0 0 0 4px rgba(251,191,36,.16); outline: none;
        }
        .aasw-site-shell input::placeholder, .aasw-site-shell textarea::placeholder { color: #aebdce !important; opacity: 1; }
        .aasw-site-shell select option { background: #0b1728; color: #f8fafc; }
        .aasw-site-shell button { transition: transform .18s ease, box-shadow .18s ease, filter .18s ease; }
        .aasw-site-shell button:hover { filter: brightness(1.06); }
        .aasw-site-shell button:active { transform: translateY(1px); }
        .aasw-site-shell form button[type="submit"] { min-height: 48px; border-radius: 12px; font-weight: 800; letter-spacing: .01em; }
        .aasw-site-shell input[type="checkbox"], .aasw-site-shell input[type="radio"] { accent-color: #f59e0b; }

        /* HOME TRIP PLANNER: larger, friendly, easy-to-read booking controls. */
        .aasw-site-shell .aasw-trip-planner { padding: clamp(1.35rem, 2.3vw, 2rem) !important; }
        .aasw-site-shell .aasw-trip-planner > div:first-child { margin-bottom: 1.35rem !important; }
        .aasw-site-shell .aasw-trip-planner > div:first-child p { font-size: .9rem !important; line-height: 1.5; }
        .aasw-site-shell .aasw-trip-planner label { font-size: .82rem !important; font-weight: 800 !important; margin-bottom: .45rem !important; color: #fff7e6 !important; }
        .aasw-site-shell .aasw-trip-planner input[type="text"],
        .aasw-site-shell .aasw-trip-planner input[type="date"],
        .aasw-site-shell .aasw-trip-planner select {
          min-height: 54px !important; font-size: 16px !important; font-weight: 600 !important;
          background: #fffaf0 !important; color: #142033 !important; border: 1px solid #e8c98b !important;
          border-radius: 13px !important; caret-color: #111827 !important; color-scheme: light;
          box-shadow: inset 0 1px 2px rgba(15,23,42,.05);
        }
        .aasw-site-shell .aasw-trip-planner input::placeholder { color: #687386 !important; opacity: 1 !important; font-weight: 500 !important; }
        .aasw-site-shell .aasw-trip-planner input:focus { border-color: #f59e0b !important; box-shadow: 0 0 0 4px rgba(245,158,11,.2) !important; outline: none !important; }
        .aasw-site-shell .aasw-trip-planner .relative > svg { color: #b45309 !important; }
        .aasw-site-shell .aasw-trip-planner .flex.items-center.justify-between.bg-slate-50 { min-height: 54px; background: #fffaf0 !important; border-color: #e8c98b !important; border-radius: 13px !important; }
        .aasw-site-shell .aasw-trip-planner .flex.items-center.justify-between.bg-slate-50 span { font-size: 16px !important; font-weight: 800 !important; }
        .aasw-site-shell .aasw-trip-planner .flex.items-center.justify-between.bg-slate-50 button { width: 36px !important; height: 36px !important; border-radius: 10px !important; }
        .aasw-site-shell .aasw-trip-planner button[type="button"] { min-height: 32px; }
        .aasw-site-shell .aasw-trip-planner button[type="submit"] { min-height: 58px !important; font-size: 1.02rem !important; border-radius: 14px !important; }
        .aasw-site-shell .aasw-trip-planner form { gap: 1.15rem; }
        /* Destination + travellers alignment/readability correction */
        .aasw-site-shell .aasw-trip-planner label { display:block !important; color:#fff7e6 !important; font-size:.9rem !important; line-height:1.35 !important; }
        .aasw-site-shell .aasw-trip-planner input[placeholder="Where are you going?"] { padding-left:2.8rem !important; padding-right:1rem !important; width:100% !important; box-sizing:border-box !important; }
        .aasw-site-shell .aasw-trip-planner .grid.grid-cols-2 { align-items:start !important; }
        .aasw-site-shell .aasw-trip-planner .grid.grid-cols-2 > div { min-width:0 !important; }
        .aasw-site-shell .aasw-trip-planner .flex.items-center.justify-between.bg-slate-50 { display:flex !important; gap:.5rem !important; padding:.45rem .55rem !important; box-sizing:border-box !important; }
        .aasw-site-shell .aasw-trip-planner .flex.items-center.justify-between.bg-slate-50 span { white-space:nowrap !important; text-align:center !important; flex:1 1 auto !important; color:#142033 !important; }
        .aasw-site-shell .aasw-trip-planner .flex.items-center.justify-between.bg-slate-50 button { flex:0 0 36px !important; }
        .aasw-site-shell .aasw-trip-planner input[type="date"] { width:100% !important; min-width:0 !important; box-sizing:border-box !important; padding-left:.65rem !important; padding-right:.45rem !important; }
        .aasw-site-shell .aasw-trip-planner select option { background: #fffaf0; color: #142033; }
        @media (max-width: 640px) {
          .aasw-site-shell .aasw-trip-planner { padding: 1.2rem !important; }
          .aasw-site-shell .aasw-trip-planner input[type="text"], .aasw-site-shell .aasw-trip-planner input[type="date"] { min-height: 52px !important; font-size: 16px !important; }
        }
        /* CONTACT PAGE FIX: the phone/email links were inheriting pale backgrounds,
           which made the contact details disappear against the scenic photo. */
        .aasw-site-shell a[href^="tel:"],
        .aasw-site-shell a[href^="mailto:"],
        .aasw-site-shell a[href*="wa.me/"] {
          display: flex;
          align-items: center;
          gap: .75rem;
          width: 100%;
          min-height: 48px;
          padding: .8rem .95rem;
          border: 1px solid rgba(255, 193, 7, .28) !important;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(18, 36, 57, .98), rgba(7, 18, 32, .98)) !important;
          color: #f8fafc !important;
          text-decoration: none !important;
          box-shadow: 0 8px 20px rgba(0,0,0,.14);
          overflow-wrap: anywhere;
          transition: transform .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease;
        }
        .aasw-site-shell a[href^="tel:"]:hover,
        .aasw-site-shell a[href^="mailto:"]:hover {
          transform: translateY(-1px);
          border-color: rgba(255, 193, 7, .8) !important;
          box-shadow: 0 10px 26px rgba(0,0,0,.24);
        }
        .aasw-site-shell a[href*="wa.me/"] {
          background: linear-gradient(135deg, #d8fff0, #b9f6dc) !important;
          border-color: rgba(16, 185, 129, .5) !important;
          color: #065f46 !important;
        }
        .aasw-site-shell a[href^="tel:"] span,
        .aasw-site-shell a[href^="mailto:"] span { color: #f8fafc !important; }
        .aasw-site-shell a[href*="wa.me/"] span { color: #065f46 !important; }
        .aasw-site-shell a[href^="mailto:"] { word-break: break-word; }
        .aasw-site-shell .grid.grid-cols-1.md\:grid-cols-2 > div { min-width: 0; }
        @media (max-width: 640px) {
          .aasw-site-shell a[href^="mailto:"] { font-size: .78rem; }
        }
        .aasw-site-shell form input[type="checkbox"],
        .aasw-site-shell form input[type="radio"] { accent-color: #f59e0b; }
        .aasw-site-shell button:focus-visible,
        .aasw-site-shell a:focus-visible { outline: 2px solid #fbbf24; outline-offset: 3px; }
        .aasw-site-shell form button[type="submit"] { min-height: 46px; }
        @media (max-width: 640px) {
          .aasw-site-shell form { padding: 1rem !important; }
          .aasw-site-shell input:not([type="checkbox"]):not([type="radio"]),
          .aasw-site-shell select,
          .aasw-site-shell textarea { font-size: 16px; min-height: 44px; }
        }
      `}</style>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-bounce">
          <IconCheck className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer min-w-0" onClick={() => setActiveTab('home')}>
            <img
              src="/aswoorooda-logo.jpeg"
              alt="ASWAROODA Treks & Travels logo"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border-2 border-amber-400 shadow-lg shadow-amber-500/20 shrink-0"
            />
            <div className="min-w-0">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 block leading-none">
                ASWAROODA <span className="text-orange-600">TREKS &amp; TRAVELS</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase block mt-1">
                {settings.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-slate-600">
            {[
              { id: 'home', label: 'Home' },
              { id: 'packages', label: 'Packages' },
              { id: 'vehicles', label: 'Vehicles' },
              { id: 'destinations', label: 'Destinations' },
              { id: 'mytrips', label: 'My Trips' },
              { id: 'custom', label: 'Custom Trip' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  activeTab === item.id 
                    ? 'text-orange-600 bg-orange-50 font-bold' 
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-semibold transition"
            >
              <IconPhone className="w-4 h-4 text-orange-600" />
              <span>{settings.phone}</span>
            </a>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition ${
                activeTab === 'admin' 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20'
              }`}
            >
              <IconShieldCheck className="w-4 h-4" />
              <span>Owner Portal</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('admin')}
              className="p-2 bg-slate-100 rounded-lg text-slate-700 text-xs font-semibold flex items-center gap-1"
            >
              <IconShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Owner</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'packages', label: 'Travel Packages' },
              { id: 'vehicles', label: 'Vehicles Fleet' },
              { id: 'destinations', label: 'Popular Destinations' },
              { id: 'mytrips', label: 'Track My Booking' },
              { id: 'custom', label: 'Custom Trip Plan' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'admin', label: 'Owner / Admin Dashboard' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold ${
                  activeTab === item.id ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {}
      <main>
        {activeTab === 'home' && (
          <div>
            {/* HERO BANNER SECTION */}
            <section className="relative bg-slate-900/20 text-white overflow-hidden min-h-[680px] md:min-h-[650px] py-8 md:py-10 flex items-start md:items-center">
              <div className="absolute inset-0 z-0 opacity-100">
                <img
                  src="/aswarooda-car-background.png"
                  alt="ASWAROODA scenic cinematic car journey"
                  className="aasw-hero-car w-full h-full object-cover object-[72%_center] md:object-[center_62%]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/20 to-slate-950/5" />
                <div className="aasw-light-sweep absolute inset-0 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Hero Title Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                    <IconStar className="w-3.5 h-3.5 text-orange-400" />
                    <span>Premier Travel & Cab Service</span>
                  </div>

                  <h1 className="aasw-home-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                    ASWAROODA <span className="text-orange-500">TREKS &amp; TRAVELS</span>
                  </h1>

                  <p className="text-xl sm:text-2xl font-medium text-orange-200">
                    "{settings.tagline}"
                  </p>

                  <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                    Enjoy seamless, safe, and air-conditioned spiritual, family, and tour rides across South India. Dedicated door-to-door cab booking with professional driver assistance.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-sm">
                      <IconShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>{settings.secondaryTagline}</span>
                    </div>
                  </div>
                </div>

                {/* TRIP PLANNER CARD */}
                <div className="aasw-trip-planner lg:col-span-5 bg-slate-950/90 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-300/30">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-extrabold text-white">Plan Your Trip</h2>
                      <p className="text-xs text-slate-300">Find matching vehicles & packages instantly</p>
                    </div>
                    <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                      <IconCompass className="w-5 h-5" />
                    </span>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setActiveTab('packages');
                    showToast(`Showing results for ${searchParams.pickup} to ${searchParams.destination}`);
                  }} className="space-y-4">
                    
                    {/* Pickup Location */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Pickup Location
                      </label>
                      <div className="relative">
                        <IconMapPin className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={searchParams.pickup}
                          onChange={(e) => setSearchParams({ ...searchParams, pickup: e.target.value })}
                          placeholder="Enter pickup location"
                          className="w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={handleGetCurrentLocation}
                          className="absolute right-2 top-1.5 px-2.5 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 text-[11px] font-bold rounded-lg transition"
                        >
                          GPS Location
                        </button>
                      </div>
                    </div>

                    {/* Destination Location */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Destination
                      </label>
                      <div className="relative">
                        <IconCompass className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={searchParams.destination}
                          onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                          placeholder="Where are you going?"
                          className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          required
                        />
                      </div>
                      
                      {/* Destination Suggestion Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {['Arunachalam', 'Kanipakam', 'Kanchipuram', 'Vellore', 'Chennai'].map(chip => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => setSearchParams({ ...searchParams, destination: chip })}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium rounded-md transition"
                          >
                            + {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Travellers Counter & Date Picker */}
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Travellers
                        </label>
                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5">
                          <button
                            type="button"
                            onClick={() => setSearchParams(prev => ({ ...prev, travellers: Math.max(1, prev.travellers - 1) }))}
                            className="w-7 h-7 bg-white rounded-lg border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100"
                          >
                            <IconMinus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-bold text-slate-900">{searchParams.travellers} Pax</span>
                          <button
                            type="button"
                            onClick={() => setSearchParams(prev => ({ ...prev, travellers: prev.travellers + 1 }))}
                            className="w-7 h-7 bg-white rounded-lg border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100"
                          >
                            <IconPlus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                          Travel Date
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={searchParams.date}
                          onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                          className="w-full py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold px-2 text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Find My Ride Main CTA */}
                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition"
                    >
                      <IconSearch className="w-5 h-5" />
                      <span>FIND MY RIDE</span>
                    </button>

                  </form>
                </div>

              </div>
            </section>

            {/* MOVING POPULAR DESTINATIONS CAROUSEL */}
            <section className="relative overflow-hidden py-14 sm:py-16 bg-slate-950/40 backdrop-blur-[2px] border-y border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="text-orange-300 text-xs font-extrabold uppercase tracking-[0.22em] block mb-2">Explore South India</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">Popular Destinations</h2>
                    <p className="text-sm text-slate-200 mt-2">Discover your next journey with ASWAROODA.</p>
                  </div>
                  <button onClick={() => setActiveTab('destinations')} className="self-start sm:self-auto text-orange-300 font-bold text-sm hover:text-white transition">View All 10 Destinations →</button>
                </div>
              </div>
              <div className="w-full overflow-hidden" aria-label="Moving popular destinations">
                <div className="aasw-destination-track gap-4 px-4 sm:px-6">
                  {[...DESTINATIONS, ...DESTINATIONS].map((dest, index) => (
                    <button
                      type="button"
                      key={`${dest.id}-moving-${index}`}
                      onClick={() => {
                        setSearchParams(prev => ({ ...prev, destination: dest.name }));
                        setActiveTab('packages');
                        showToast(`Selected destination: ${dest.name}`);
                      }}
                      className="aasw-destination-card group relative overflow-hidden rounded-2xl text-left shadow-xl border border-white/15 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      aria-label={`Explore ${dest.name}`}
                    >
                      <img src={dest.image} alt={dest.name} loading="lazy" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/aswarooda-car-background.png"; }} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <span className="text-[10px] font-extrabold text-orange-300 uppercase tracking-wider block mb-1">{dest.tag}</span>
                        <h3 className="text-xl font-black text-white drop-shadow-md">{dest.name}</h3>
                        <span className="inline-flex mt-2 text-xs font-bold text-white/90 group-hover:text-orange-200 transition">Explore trip ↗</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-center text-[11px] text-slate-300 mt-5">Tip: hover or tap a destination to explore packages.</p>
            </section>

            {/* FEATURED PACKAGES */}
            <section className="bg-slate-100/60 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-orange-600 text-xs font-extrabold uppercase tracking-widest block mb-1">
                    Handcrafted Pilgrimages & Tours
                  </span>
                  <h2 className="text-3xl font-black text-slate-900">Popular Travel Packages</h2>
                  <p className="text-slate-600 text-sm mt-2">
                    Complete itineraries with transparent pricing, dedicated vehicle, driver, tolls, and permits.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 flex flex-col justify-between hover:shadow-xl transition">
                      <div>
                        <div className="relative h-48">
                          <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                            {pkg.duration}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-extrabold text-slate-900 mb-2">{pkg.name}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-4">
                            <IconMapPin className="w-4 h-4 text-orange-600" />
                            <span>{pkg.route}</span>
                          </div>
                          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                            {pkg.description}
                          </p>

                          <div className="bg-orange-50/80 border border-orange-100 rounded-xl p-3 mb-4">
                            <span className="text-[10px] font-bold uppercase text-orange-700 block">Starting From</span>
                            <span className="text-2xl font-black text-orange-600">₹{pkg.startingPrice.toLocaleString()}</span>
                            <span className="text-xs text-slate-500 ml-1">/ trip</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 space-y-2">
                        <button
                          onClick={() => setPackageDetailModal(pkg)}
                          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition"
                        >
                          VIEW ITINERARY & DETAILS
                        </button>

                        <button
                          onClick={() => startPackageBooking(pkg)}
                          className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-orange-600/20"
                        >
                          SELECT PACKAGE & BOOK
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-orange-600 text-xs font-extrabold uppercase tracking-widest block mb-1">
                  Our Commitment
                </span>
                <h2 className="text-3xl font-black text-slate-900">Why Choose ASWAROODA TREKS & TRAVELS?</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Clean Vehicles', desc: 'Sanitized, fresh, and fully maintained AC cabs.', icon: IconCar },
                  { title: 'Safe & Reliable Service', desc: 'Verified professional drivers focused on family safety.', icon: IconShieldCheck },
                  { title: 'Punctual Service', desc: 'Guaranteed on-time pickup and smooth schedule execution.', icon: IconClock },
                  { title: 'Transparent Pricing', desc: 'All tolls, permits, and driver charges included. No hidden fees.', icon: IconCheck }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {}
        {activeTab === 'packages' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-black text-slate-900">Travel Packages</h1>
              <p className="text-slate-600 text-sm mt-1">Select from our popular curated tour packages or request a custom itinerary.</p>
            </div>

            <div className="space-y-8">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-5 relative h-64 lg:h-auto">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {pkg.duration}
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-black text-slate-900">{pkg.name}</h2>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">From</span>
                          <span className="text-2xl font-black text-orange-600">₹{pkg.startingPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <p className="text-sm font-bold text-orange-700 mb-4">{pkg.route}</p>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">{pkg.description}</p>

                      {/* Pricing Table Matrix */}
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
                        <span className="text-xs font-extrabold text-slate-700 block mb-2">Vehicle Option Pricing:</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                          {pkg.pricing && Object.entries(pkg.pricing).map(([veh, pr]) => (
                            <div key={veh} className="bg-white p-2 rounded-lg border border-slate-200 flex justify-between items-center">
                              <span className="font-semibold text-slate-700 truncate">{veh}</span>
                              <span className="font-bold text-orange-600">₹{pr.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setPackageDetailModal(pkg)}
                        className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition"
                      >
                        VIEW FULL ITINERARY
                      </button>
                      <button
                        onClick={() => startPackageBooking(pkg)}
                        className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-600/20 transition"
                      >
                        BOOK THIS PACKAGE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'vehicles' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="text-3xl font-black text-slate-900">Our Fleet of Vehicles</h1>
              <p className="text-slate-600 text-sm mt-1">Well-maintained, clean, air-conditioned cabs driven by verified courteous drivers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((v) => (
                <div key={v.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between">
                  <div>
                    <div className="relative h-48">
                      <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <IconStar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{v.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2">{v.name}</h3>
                      
                      <div className="space-y-2 text-xs font-semibold text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <IconUsers className="w-4 h-4 text-orange-600" />
                          <span>Seating Capacity: {v.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconCar className="w-4 h-4 text-orange-600" />
                          <span>Luggage Space: {v.luggage}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IconCheck className="w-4 h-4 text-emerald-600" />
                          <span>Air Conditioned & Clean Interiors</span>
                        </div>
                      </div>

                      <div className="bg-orange-50 p-3 rounded-xl border border-orange-100 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-orange-700 block">Outstation Rate</span>
                          <span className="text-lg font-black text-orange-600">{v.pricePerKm}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Starts From</span>
                          <span className="text-lg font-bold text-slate-900">₹{v.startPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, vehicleName: v.name, price: v.startPrice }));
                        setBookingModalOpen(true);
                      }}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
                    >
                      BOOK THIS VEHICLE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'destinations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="text-3xl font-black text-slate-900">Popular Destinations</h1>
              <p className="text-slate-600 text-sm mt-1">Explore top pilgrimage and holiday destinations connected by ASWAROODA TREKS & TRAVELS.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DESTINATIONS.map((dest) => (
                <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200">
                  <div className="h-48 relative">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-3 left-3 bg-slate-900/80 text-orange-300 text-xs font-bold px-3 py-1 rounded-md">
                      {dest.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{dest.name}</h3>
                    <p className="text-slate-600 text-xs mb-4">{dest.description}</p>
                    <button
                      onClick={() => {
                        setSearchParams(prev => ({ ...prev, destination: dest.name }));
                        setActiveTab('packages');
                      }}
                      className="w-full py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold rounded-xl transition"
                    >
                      EXPLORE PACKAGES FOR {dest.name.toUpperCase()}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {}
        {activeTab === 'mytrips' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 mb-8">
              <h1 className="text-2xl font-black text-slate-900 mb-2">Track Your Booking Status</h1>
              <p className="text-slate-600 text-xs mb-6">Enter your Booking ID (e.g. AST-2026-0001) or Mobile Number to view live trip status.</p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Booking ID or Mobile Number"
                  value={trackerSearch}
                  onChange={(e) => setTrackerSearch(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <button
                  onClick={async () => {
                    const rawValue = trackerSearch.trim();
                    const searchValue = rawValue.toLowerCase();
                    if (!rawValue) {
                      setSearchedBooking(null);
                      showToast('⚠️ Enter a Booking ID or Mobile Number.');
                      return;
                    }

                    // Production tracking must read from Supabase directly so it works
                    // across Render, VS Code, mobile and different browsers/devices.
                    if (supabaseConfigured && supabase) {
                      let data = null;
                      let error = null;

                      if (searchValue.startsWith('ast-')) {
                        const result = await supabase
                          .from('bookings')
                          .select('*')
                          .eq('id', rawValue)
                          .maybeSingle();
                        data = result.data;
                        error = result.error;
                      } else {
                        const mobileValue = rawValue.replace(/\D/g, '');
                        const result = await supabase
                          .from('bookings')
                          .select('*')
                          .eq('mobile', mobileValue)
                          .order('created_at', { ascending: false })
                          .limit(1)
                          .maybeSingle();
                        data = result.data;
                        error = result.error;
                      }

                      if (error) {
                        console.error('Supabase booking tracking failed:', error);
                        setSearchedBooking(null);
                        showToast(`⚠️ Booking search failed: ${error.message}`);
                        return;
                      }

                      if (data) {
                        const match = {
                          id: data.id,
                          customerName: data.customer_name || '',
                          mobile: data.mobile || '',
                          whatsapp: data.whatsapp || data.mobile || '',
                          pickup: data.pickup || '',
                          destination: data.destination || '',
                          travelDate: data.travel_date || '',
                          pickupTime: data.pickup_time || '',
                          travellers: Number(data.travellers || 1),
                          packageName: data.package_name || '',
                          vehicleName: data.vehicle_name || '',
                          totalPrice: data.total_price == null ? 0 : Number(data.total_price),
                          specialNotes: data.special_notes || '',
                          status: data.status || 'NEW',
                          createdAt: data.created_at || new Date().toISOString()
                        };
                        setSearchedBooking(match);
                        showToast(`✅ Booking ${match.id} found!`);
                        return;
                      }

                      setSearchedBooking(null);
                      showToast('❌ No matching booking request found in the database.');
                      return;
                    }

                    // Offline fallback for local development without Supabase.
                    const match = bookings.find(
                      (b) =>
                        String(b.id || '').toLowerCase() === searchValue ||
                        String(b.mobile || '').replace(/\D/g, '') === rawValue.replace(/\D/g, '')
                    );

                    if (match) {
                      setSearchedBooking(match);
                      showToast(`Booking ${match.id} found locally.`);
                    } else {
                      setSearchedBooking(null);
                      showToast('❌ No matching booking request found.');
                    }
                  }}
                  className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Display Search Result or Latest Bookings */}
            {searchedBooking ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-200">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block">Booking Details</span>
                    <h2 className="text-2xl font-black text-slate-900">{searchedBooking.id}</h2>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                    searchedBooking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                    searchedBooking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                    searchedBooking.status === 'CANCELLED' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    STATUS: {searchedBooking.status}
                  </span>
                </div>

                {/* Status Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-2">
                    <span className={searchedBooking.status !== 'CANCELLED' ? 'text-orange-600' : ''}>REQUEST SENT</span>
                    <span className={['CONTACTED', 'CONFIRMED', 'COMPLETED'].includes(searchedBooking.status) ? 'text-orange-600' : ''}>CONTACTED</span>
                    <span className={['CONFIRMED', 'COMPLETED'].includes(searchedBooking.status) ? 'text-orange-600' : ''}>CONFIRMED</span>
                    <span className={searchedBooking.status === 'COMPLETED' ? 'text-emerald-600' : ''}>COMPLETED</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${
                      searchedBooking.status === 'NEW' ? 'w-1/4 bg-amber-500' :
                      searchedBooking.status === 'CONTACTED' ? 'w-2/4 bg-orange-500' :
                      searchedBooking.status === 'CONFIRMED' ? 'w-3/4 bg-emerald-500' :
                      searchedBooking.status === 'COMPLETED' ? 'w-full bg-emerald-600' :
                      'w-full bg-rose-500'
                    }`} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700 bg-slate-50 p-4 rounded-2xl mb-6">
                  <div><strong>Customer:</strong> {searchedBooking.customerName}</div>
                  <div><strong>Mobile:</strong> {searchedBooking.mobile}</div>
                  <div><strong>Pickup:</strong> {searchedBooking.pickup}</div>
                  <div><strong>Destination:</strong> {searchedBooking.destination}</div>
                  <div><strong>Travel Date:</strong> {searchedBooking.travelDate} ({searchedBooking.pickupTime})</div>
                  <div><strong>Package:</strong> {searchedBooking.packageName}</div>
                  <div><strong>Vehicle:</strong> {searchedBooking.vehicleName}</div>
                  <div><strong>Estimated Price:</strong> ₹{searchedBooking.totalPrice?.toLocaleString() || 'Quotation Pending'}</div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <IconPhone className="w-4 h-4 text-orange-400" />
                    <span>Call Owner ({settings.phone})</span>
                  </a>
                  <a
                    href={generateWhatsAppUrl(searchedBooking)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <IconMessageSquare className="w-4 h-4" />
                    <span>WhatsApp Owner</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-800 text-sm uppercase">Recent Requests</h3>
                {bookings.map((b) => (
                  <div key={b.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-orange-600">{b.id}</span>
                      <h4 className="font-black text-slate-900 text-base">{b.packageName}</h4>
                      <p className="text-xs text-slate-500">{b.pickup} → {b.destination} | Date: {b.travelDate}</p>
                    </div>
                    <button
                      onClick={() => setSearchedBooking(b)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
                    >
                      Track
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {}
        {activeTab === 'custom' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
              <div className="text-center mb-8">
                <span className="text-orange-600 text-xs font-extrabold uppercase tracking-widest block mb-1">Tailor Made Itinerary</span>
                <h1 className="text-3xl font-black text-slate-900">Custom Trip Plan Builder</h1>
                <p className="text-slate-600 text-xs mt-1">Provide your custom requirements and our travel desk will get back with a customized quotation.</p>
              </div>

              <form onSubmit={handleCustomTripSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="Enter Full Name"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.pickup}
                      onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                      placeholder="Pickup address"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Destinations / Places *</label>
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Tirupati, Arunachalam, Ooty"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Travel Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Vehicle</label>
                    <select
                      value={formData.vehicleName}
                      onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {vehicles.map(v => (
                        <option key={v.id} value={v.name}>{v.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Travellers Count</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.travellers}
                      onChange={(e) => setFormData({ ...formData, travellers: parseInt(e.target.value) || 1 })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex gap-6 py-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.accommodation}
                      onChange={(e) => setFormData({ ...formData, accommodation: e.target.checked })}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span>Need Hotel Accommodation</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formData.darshanAssistance}
                      onChange={(e) => setFormData({ ...formData, darshanAssistance: e.target.checked })}
                      className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span>Need Temple Darshan Assistance</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Specific Requirements & Places List</label>
                  <textarea
                    rows={3}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="List out specific temples or places you want to visit, stay preferences, or senior citizen care..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-orange-600/30 transition"
                >
                  SUBMIT CUSTOM TRIP REQUEST
                </button>
              </form>
            </div>
          </div>
        )}

        {}
        {activeTab === 'contact' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-black text-slate-900">Contact ASWAROODA TREKS & TRAVELS</h1>
              <p className="text-slate-600 text-sm mt-1">We are available 24/7 to assist with your cab bookings and tour inquiries.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-4">Head Office Address</h3>
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <IconMapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <span>{settings.address}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-4">24/7 Helpline & Booking</h3>
                  <div className="space-y-3">
                    <a href={`tel:${settings.phone}`} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-slate-800 font-bold hover:bg-slate-100 transition">
                      <IconPhone className="w-5 h-5 text-orange-600" />
                      <span>{settings.phone}</span>
                    </a>
                    <a href="mailto:aswaroodatreksandtravels@gmail.com" className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-slate-800 font-bold hover:bg-slate-100 transition break-all">
                      <span className="text-orange-600" aria-hidden="true">✉</span>
                      <span>aswaroodatreksandtravels@gmail.com</span>
                    </a>
                    <a href={`https://wa.me/${normalizeWhatsAppNumber(settings.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-800 rounded-xl font-bold hover:bg-emerald-100 transition">
                      <IconMessageSquare className="w-5 h-5 text-emerald-600" />
                      <span>WhatsApp Direct Message</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black mb-3">Your Journey. Our Responsibility.</h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    ASWAROODA TREKS & TRAVELS specializes in safe outstation trips, divine pilgrimages, airport transfers, and customized tours with premium vehicle comfort.
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Response Time:</span>
                    <span className="font-bold text-orange-300">Under 5 Minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Operating Hours:</span>
                    <span className="font-bold text-emerald-300">24 Hours / 365 Days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Quick Admin Access Toggle / Security Screen */}
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-center">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Owner Admin Portal</h2>
                <p className="text-xs text-slate-500 mb-6">Enter PIN or click quick access to manage trip requests & pricing.</p>

                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Enter Admin PIN (Default: 1234)"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                  />

                  <button
                    onClick={() => {
                      setIsAdminLoggedIn(true);
                      showToast('Logged in as Owner/Admin');
                    }}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition"
                  >
                    ACCESS DASHBOARD
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* Admin Header Navigation */}
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">ASWAROODA TREKS & TRAVELS</span>
                    <h1 className="text-2xl font-black">Owner & Admin Dashboard</h1>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'requests', label: 'Trip Requests' },
                      { id: 'packages', label: 'Manage Packages' },
                      { id: 'vehicles', label: 'Manage Fleet' },
                      { id: 'settings', label: 'Business Settings' },
                      { id: 'sql', label: 'Database & Supabase' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setAdminTab(t.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                          adminTab === t.id ? 'bg-orange-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}

                    <button
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-900 text-white rounded-2xl p-4">
                  <div><div className="font-bold text-sm">Owner Notifications</div><div className="text-[11px] text-slate-300">{notifications.filter(n => n.unread).length} unread · Browser permission: {notificationPermission}</div></div>
                  <div className="flex gap-2"><button onClick={enableBrowserNotifications} className="px-3 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-extrabold">Enable Chrome Notifications</button><button onClick={() => setNotifications(prev => prev.map(n => ({...n,unread:false})))} className="px-3 py-2 bg-slate-800 rounded-lg text-xs font-bold">Mark Read</button></div>
                </div>

                {/* Dashboard Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase block">Total Requests</span>
                    <span className="text-3xl font-black text-slate-900">{bookings.length}</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs font-bold text-amber-600 uppercase block">New Requests</span>
                    <span className="text-3xl font-black text-amber-600">{bookings.filter(b => b.status === 'NEW').length}</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs font-bold text-emerald-600 uppercase block">Confirmed Trips</span>
                    <span className="text-3xl font-black text-emerald-600">{bookings.filter(b => b.status === 'CONFIRMED').length}</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span className="text-xs font-bold text-blue-600 uppercase block">Completed</span>
                    <span className="text-3xl font-black text-blue-600">{bookings.filter(b => b.status === 'COMPLETED').length}</span>
                  </div>
                </div>

                {/* TAB 1: TRIP REQUESTS MANAGEMENT */}
                {adminTab === 'requests' && (
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                      <h2 className="text-xl font-extrabold text-slate-900">Customer Booking Requests</h2>
                      <span className="text-xs font-semibold text-slate-500">{bookings.length} total entries</span>
                    </div>

                    <div className="w-full overflow-x-auto">
                      <table className="w-full min-w-[1050px] text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 uppercase text-[10px] font-black text-slate-500 tracking-wider">
                          <tr>
                            <th className="p-4">Booking ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Package & Vehicle</th>
                            <th className="p-4">Route & Date</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-center min-w-[280px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold">
                          {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-slate-50">
                              <td className="p-4 font-bold text-orange-600">{b.id}</td>
                              <td className="p-4">
                                <div className="font-bold text-slate-900">{b.customerName}</div>
                                <div className="text-[11px] text-slate-500">{b.mobile}</div>
                              </td>
                              <td className="p-4">
                                <div className="font-bold text-slate-900">{b.packageName}</div>
                                <div className="text-[11px] text-slate-500">{b.vehicleName} ({b.travellers} Pax)</div>
                              </td>
                              <td className="p-4">
                                <div>{b.pickup} → {b.destination}</div>
                                <div className="text-[11px] text-slate-500">{b.travelDate} @ {b.pickupTime}</div>
                              </td>
                              <td className="p-4 font-black text-slate-900">
                                ₹{b.totalPrice ? b.totalPrice.toLocaleString() : 'Pending'}
                              </td>
                              <td className="p-4 min-w-[280px]">
                                <div className="flex flex-nowrap items-center justify-center gap-2 whitespace-nowrap">
                                  <a
                                    href={`tel:${String(b.mobile || '').replace(/[^+0-9]/g, '')}`}
                                    className="inline-flex shrink-0 items-center justify-center min-w-[72px] px-3 py-2 rounded-lg text-xs font-bold transition-colors" style={{ backgroundColor: "#2563eb", color: "#ffffff", border: "1px solid #1d4ed8", opacity: 1 }}
                                    title={`Call ${b.customerName}`}
                                  >
                                    Call
                                  </a>
                                  <a
                                    href={generateWhatsAppUrl(b, true)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex shrink-0 items-center justify-center min-w-[96px] px-3 py-2 rounded-lg text-xs font-bold transition-colors" style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "1px solid #15803d", opacity: 1 }}
                                    title={`WhatsApp ${b.customerName}`}
                                  >
                                    WhatsApp
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteBooking(b)}
                                    className="inline-flex shrink-0 items-center justify-center min-w-[72px] px-3 py-2 rounded-lg text-xs font-bold transition-colors" style={{ backgroundColor: "#dc2626", color: "#ffffff", border: "1px solid #b91c1c", opacity: 1 }}
                                    title={`Delete booking ${b.id}`}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 2: MANAGE PACKAGES */}
                {adminTab === 'packages' && (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-900">Manage Travel Packages</h2>
                        <p className="text-xs text-slate-500 mt-1">Add complete package details. Customers will see saved changes immediately in this browser.</p>
                      </div>
                      <button onClick={() => openPackageEditor()} className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold rounded-xl">+ Add New Package</button>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {packages.map(p => (
                        <div key={p.id} className="overflow-hidden border border-slate-200 rounded-2xl bg-slate-50">
                          <div className="h-36 bg-slate-200"><img src={p.image} alt={p.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display='none'; }} /></div>
                          <div className="p-4">
                            <div className="flex justify-between gap-3">
                              <div><h3 className="font-extrabold text-slate-900">{p.name}</h3><p className="text-xs text-slate-500 mt-1">{p.route}</p></div>
                              <span className="shrink-0 text-sm font-black text-orange-600">₹{Number(p.startingPrice || 0).toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-3 line-clamp-2">{p.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                              <button onClick={() => setPackageDetailModal(p)} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold">View</button>
                              <button onClick={() => openPackageEditor(p)} className="px-3 py-2 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold">Edit Details</button>
                              <button onClick={() => { if (window.confirm(`Delete ${p.name}?`)) { setPackages(prev => prev.filter(x => x.id !== p.id)); showToast(`Deleted ${p.name}`); } }} className="px-3 py-2 bg-rose-50 text-rose-600 rounded-lg text-xs font-bold">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: MANAGE FLEET */}
                {adminTab === 'vehicles' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-extrabold text-slate-900">Manage Fleet</h2>
                          <p className="text-xs text-slate-500 mt-1">Add, edit, price and control the vehicles customers can book.</p>
                        </div>
                        <button onClick={() => openVehicleEditor()} className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold rounded-xl">+ Add Vehicle</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {vehicles.map(v => (
                        <div key={v.id} className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                          <div className="h-40 bg-slate-100 relative">
                            {v.image ? <img src={v.image} alt={v.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display='none'; }} /> : null}
                            <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black ${v.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' : v.status === 'BOOKED' ? 'bg-amber-100 text-amber-700' : v.status === 'MAINTENANCE' ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'}`}>
                              {v.status || 'AVAILABLE'}
                            </span>
                          </div>
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div><h3 className="font-black text-slate-900">{v.name}</h3><p className="text-xs text-slate-500 mt-1">{v.type || 'Vehicle'} · {v.capacity}</p></div>
                              <div className="text-right"><div className="text-lg font-black text-orange-600">₹{Number(v.startPrice || 0).toLocaleString()}</div><div className="text-[10px] text-slate-400">starting price</div></div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
                              <div className="bg-slate-50 rounded-xl p-3"><b>AC</b><br/>{v.ac ? 'Yes' : 'No'}</div>
                              <div className="bg-slate-50 rounded-xl p-3"><b>Rate</b><br/>{v.pricePerKm || 'Custom'}</div>
                              <div className="bg-slate-50 rounded-xl p-3"><b>Registration</b><br/>{v.registrationNumber || 'Not added'}</div>
                              <div className="bg-slate-50 rounded-xl p-3"><b>Driver</b><br/>{v.driverName || 'Not assigned'}</div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button onClick={() => openVehicleEditor(v)} className="flex-1 px-3 py-2 bg-amber-100 text-amber-800 rounded-xl text-xs font-bold">Edit</button>
                              <button onClick={() => deleteVehicle(v)} className="px-3 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {fleetEditorOpen && (
                      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                        <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl p-6 sm:p-8">
                          <div className="flex items-center justify-between mb-6"><div><h2 className="text-xl font-black text-slate-900">{editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h2><p className="text-xs text-slate-500 mt-1">Changes update the customer vehicle list.</p></div><button onClick={() => setFleetEditorOpen(false)} className="p-2 bg-slate-100 rounded-full"><IconX className="w-5 h-5" /></button></div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><label className="label">Vehicle Name *</label><input value={vehicleForm.name} onChange={e=>setVehicleForm({...vehicleForm,name:e.target.value})} className="input" placeholder="Innova Crysta" /></div>
                            <div><label className="label">Type</label><select value={vehicleForm.type} onChange={e=>setVehicleForm({...vehicleForm,type:e.target.value})} className="input"><option>Sedan</option><option>SUV</option><option>MPV</option><option>Tempo Traveller</option><option>Bus</option></select></div>
                            <div><label className="label">Capacity</label><input value={vehicleForm.capacity} onChange={e=>setVehicleForm({...vehicleForm,capacity:e.target.value})} className="input" placeholder="7+1 Passengers" /></div>
                            <div><label className="label">Starting Price ₹</label><input type="number" value={vehicleForm.startPrice} onChange={e=>setVehicleForm({...vehicleForm,startPrice:e.target.value})} className="input" /></div>
                            <div><label className="label">Rate / KM</label><input value={vehicleForm.pricePerKm} onChange={e=>setVehicleForm({...vehicleForm,pricePerKm:e.target.value})} className="input" placeholder="₹22/km" /></div>
                            <div><label className="label">Status</label><select value={vehicleForm.status} onChange={e=>setVehicleForm({...vehicleForm,status:e.target.value})} className="input"><option value="AVAILABLE">AVAILABLE</option><option value="BOOKED">BOOKED</option><option value="MAINTENANCE">MAINTENANCE</option><option value="INACTIVE">INACTIVE</option></select></div>
                            <div><label className="label">Registration Number</label><input value={vehicleForm.registrationNumber} onChange={e=>setVehicleForm({...vehicleForm,registrationNumber:e.target.value})} className="input" placeholder="AP00 XX 0000" /></div>
                            <div><label className="label">Driver Name</label><input value={vehicleForm.driverName} onChange={e=>setVehicleForm({...vehicleForm,driverName:e.target.value})} className="input" /></div>
                            <div className="sm:col-span-2"><label className="label">Image URL</label><input value={vehicleForm.image} onChange={e=>setVehicleForm({...vehicleForm,image:e.target.value})} className="input" placeholder="https://..." /></div>
                            <div className="sm:col-span-2"><label className="label">Luggage / Notes</label><textarea rows={3} value={vehicleForm.notes} onChange={e=>setVehicleForm({...vehicleForm,notes:e.target.value})} className="input" placeholder="4 large bags, clean AC, etc." /></div>
                            <label className="sm:col-span-2 flex items-center gap-2 text-xs font-bold text-slate-700"><input type="checkbox" checked={vehicleForm.ac} onChange={e=>setVehicleForm({...vehicleForm,ac:e.target.checked})} /> Air Conditioned</label>
                          </div>
                          <div className="flex gap-3 mt-6"><button onClick={() => setFleetEditorOpen(false)} className="flex-1 py-3 bg-slate-100 rounded-xl text-sm font-bold">Cancel</button><button onClick={saveVehicle} className="flex-1 py-3 bg-orange-600 text-white rounded-xl text-sm font-black">Save Vehicle</button></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: BUSINESS SETTINGS */}
                {adminTab === 'settings' && (
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-4">
                    <h2 className="text-xl font-black text-slate-900">Business Settings</h2>
                    <p className="text-xs text-slate-500">Updating these phone and WhatsApp numbers automatically updates all call buttons across the entire website.</p>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (Call)</label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number (Digits only)</label>
                        <input
                          type="text"
                          value={settings.whatsapp}
                          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Office Address</label>
                      <textarea
                        rows={2}
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>

                    <button
                      onClick={() => showToast('Saved Business Settings!')}
                      className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition"
                    >
                      SAVE BUSINESS SETTINGS
                    </button>
                  </div>
                )}

                {/* TAB 4: SUPABASE SQL EXPORTER */}
                {adminTab === 'sql' && (
                  <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
                    <div className="flex items-center gap-3">
                      <IconDatabase className="w-6 h-6 text-orange-400" />
                      <h2 className="text-xl font-extrabold">Supabase SQL Database Schema</h2>
                    </div>
                    <p className="text-xs text-slate-300">Database connection: <strong className={supabaseConfigured ? 'text-emerald-400' : 'text-amber-400'}>{supabaseConfigured ? 'CONNECTED' : 'NOT CONFIGURED'}</strong></p>
                    <p className="text-xs text-slate-300">The SQL below is the schema reference. For automatic WhatsApp, deploy the included Edge Function and Database Webhook.</p>

                    <pre className="bg-slate-950 p-4 rounded-2xl text-[11px] font-mono text-emerald-400 overflow-x-auto border border-slate-800">
{`-- ASWAROODA TREKS & TRAVELS SUPABASE SCHEMA EXPORT
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(50) PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  pickup VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  travel_date DATE NOT NULL,
  pickup_time VARCHAR(20),
  travellers INT DEFAULT 1,
  package_name VARCHAR(150),
  vehicle_name VARCHAR(100),
  total_price DECIMAL(10, 2),
  special_notes TEXT,
  status VARCHAR(20) DEFAULT 'NEW',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Insert" ON bookings;
CREATE POLICY "Public Insert" ON bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public Select Own" ON bookings;
CREATE POLICY "Public Select Own" ON bookings FOR SELECT USING (true);

-- REQUIRED: enable Supabase Realtime for live Owner Dashboard updates
ALTER TABLE bookings REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'bookings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
  END IF;
END $$;`}
                    </pre>
                  </div>
                )}

              </div>
            )}
          </div>
        )}
      </main>

      {}
      {packageDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            
            <button
              onClick={() => setPackageDetailModal(null)}
              className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700"
            >
              <IconX className="w-5 h-5" />
            </button>

            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-1">Package Itinerary</span>
            <h2 className="text-2xl font-black text-slate-900 mb-2">{packageDetailModal.name}</h2>
            <p className="text-xs text-slate-500 font-bold mb-6">{packageDetailModal.route} ({packageDetailModal.distance || 'Complete Tour'})</p>

            {/* Timeline */}
            <div className="space-y-4 border-l-2 border-orange-200 pl-4 mb-8">
              {packageDetailModal.itinerary?.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-orange-600 rounded-full ring-4 ring-orange-100" />
                  <span className="text-[10px] font-extrabold text-orange-600 uppercase">{item.time}</span>
                  <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  const pkg = packageDetailModal;
                  setPackageDetailModal(null);
                  startPackageBooking(pkg);
                }}
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm rounded-xl shadow-lg shadow-orange-600/30 transition"
              >
                PROCEED TO BOOK THIS PACKAGE
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700"
            >
              <IconX className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-black text-slate-900 mb-1">Complete Your Booking</h2>
            <p className="text-xs text-slate-500 mb-6">Enter details to send trip request to ASWAROODA TREKS & TRAVELS desk.</p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Enter Name"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="Mobile Number"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Time</label>
                  <input
                    type="text"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    placeholder="06:00 AM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Selected Vehicle Choice</label>
                <select
                  value={formData.vehicleName}
                  onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.name}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-semibold space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Package:</span>
                  <span className="font-bold text-slate-900">{formData.packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Fare:</span>
                  <span className="font-extrabold text-orange-600">₹{formData.price.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-orange-600/30 transition"
              >
                SUBMIT TRIP REQUEST NOW
              </button>
            </form>
          </div>
        </div>
      )}

      {packageEditorOpen && (
        <div className="fixed inset-0 z-[70] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={savePackageFromEditor} className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6"><div><h2 className="text-2xl font-black text-slate-900">{editingPackage ? 'Edit Package' : 'Add New Package'}</h2><p className="text-xs text-slate-500 mt-1">All fields below are saved with the package.</p></div><button type="button" onClick={() => setPackageEditorOpen(false)} className="p-2 bg-slate-100 rounded-xl"><IconX /></button></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[['name','Package Name *'],['duration','Duration'],['route','Route *'],['distance','Distance'],['startingPrice','Starting Price'],['image','Image URL']].map(([key,label]) => (
                <div key={key} className={key === 'route' || key === 'image' ? 'sm:col-span-2' : ''}><label className="block text-xs font-bold text-slate-700 mb-1">{label}</label><input type={key === 'startingPrice' ? 'number' : 'text'} value={packageForm[key]} onChange={e => setPackageForm({...packageForm,[key]:e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" /></div>
              ))}
              <div className="sm:col-span-2"><label className="block text-xs font-bold text-slate-700 mb-1">Description</label><textarea rows={3} value={packageForm.description} onChange={e => setPackageForm({...packageForm,description:e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Prices</label><textarea rows={7} value={packageForm.pricingText} onChange={e => setPackageForm({...packageForm,pricingText:e.target.value})} placeholder={'Sedan (4+1)=6500\nErtiga (6+1)=8500\nInnova (7+1)=9000'} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono" /><p className="text-[10px] text-slate-500 mt-1">One per line: Vehicle=Price</p></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Itinerary</label><textarea rows={7} value={packageForm.itineraryText} onChange={e => setPackageForm({...packageForm,itineraryText:e.target.value})} placeholder={'06:00 AM|Pickup|Tirupati hotel pickup\n08:00 AM|Temple|Darshan'} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono" /><p className="text-[10px] text-slate-500 mt-1">One per line: Time|Title|Details</p></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Inclusions</label><textarea rows={5} value={packageForm.inclusionsText} onChange={e => setPackageForm({...packageForm,inclusionsText:e.target.value})} placeholder={'Vehicle + Driver\nToll + Parking'} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" /></div>
              <div><label className="block text-xs font-bold text-slate-700 mb-1">Exclusions</label><textarea rows={5} value={packageForm.exclusionsText} onChange={e => setPackageForm({...packageForm,exclusionsText:e.target.value})} placeholder={'Accommodation\nDarshan tickets'} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs" /></div>
              <div className="sm:col-span-2"><label className="block text-xs font-bold text-slate-700 mb-1">Special Note</label><textarea rows={2} value={packageForm.note} onChange={e => setPackageForm({...packageForm,note:e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
            </div>
            <div className="flex gap-3 mt-6"><button type="button" onClick={() => setPackageEditorOpen(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-sm">Cancel</button><button type="submit" className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-extrabold text-sm">{editingPackage ? 'SAVE CHANGES' : 'ADD PACKAGE'}</button></div>
          </form>
        </div>
      )}

      {}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 sm:p-8 text-center relative">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconCheck className="w-8 h-8" />
            </div>

            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest block mb-1">Request Received</span>
            <h2 className="text-2xl font-black text-slate-900 mb-1">Booking #{confirmedBooking.id}</h2>
            <p className="text-xs text-slate-500 mb-6">Your trip request has been recorded. With Supabase + WhatsApp Cloud API + Database Webhook configured, the owner receives the booking directly on WhatsApp without opening this page.</p>

            <div className="space-y-3">
              <a
                href={generateWhatsAppUrl(confirmedBooking)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
              >
                <IconMessageSquare className="w-5 h-5" />
                <span>OPEN OWNER WHATSAPP</span>
              </a>

              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setActiveTab('mytrips');
                }}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition"
              >
                Go to My Trips Tracker
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 px-2 py-2 flex justify-around items-center text-[10px] font-bold text-slate-600 shadow-lg">
        {[
          { id: 'home', label: 'Home', icon: IconCompass },
          { id: 'packages', label: 'Packages', icon: IconCar },
          { id: 'mytrips', label: 'My Trips', icon: IconClock },
          { id: 'custom', label: 'Custom Plan', icon: IconPlus }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition ${
              activeTab === item.id ? 'text-orange-600 font-black' : 'hover:text-slate-900'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {}
      <style>{`
        /* Keep text readable in light booking fields, especially when the cursor enters. */
        input:not([type="checkbox"]):not([type="radio"]),
        textarea, select {
          caret-color: #111827;
        }
        input:not([type="checkbox"]):not([type="radio"]):focus,
        textarea:focus, select:focus {
          color: #111827 !important;
          caret-color: #111827 !important;
        }
        input::placeholder, textarea::placeholder {
          color: #64748b !important;
          opacity: 1;
        }
        input:focus::placeholder, textarea:focus::placeholder {
          color: #64748b !important;
        }
        input:-webkit-autofill, input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #111827 !important;
          caret-color: #111827 !important;
        }
        select option { color: #111827; background: #ffffff; }
        @media (max-width: 640px) {
          input, select, textarea { font-size: 16px; }
        }
      `}</style>

      <footer className="bg-slate-950 text-white border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-black text-white block mb-2">
              ASWAROODA <span className="text-orange-500">TREKS &amp; TRAVELS</span>
            </span>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              "{settings.tagline}"
            </p>
            <p className="text-[11px] text-slate-500">{settings.secondaryTagline}</p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase text-orange-400 tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li onClick={() => setActiveTab('packages')} className="cursor-pointer hover:text-white">1 Day Arunachalam Package</li>
              <li onClick={() => setActiveTab('packages')} className="cursor-pointer hover:text-white">2 Days Arunachalam & Kanchipuram</li>
              <li onClick={() => setActiveTab('packages')} className="cursor-pointer hover:text-white">Kanipakam Special Offer</li>
              <li onClick={() => setActiveTab('custom')} className="cursor-pointer hover:text-white">Custom Trip Builder</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase text-orange-400 tracking-wider mb-3">Contact Support</h4>
            <p className="text-xs text-slate-300 mb-2">{settings.address}</p>
            <p className="text-xs text-orange-300 font-bold">Call: {settings.phone}</p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase text-orange-400 tracking-wider mb-3">Owner Access</h4>
            <button
              onClick={() => setActiveTab('admin')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold rounded-xl text-slate-200"
            >
              Owner Portal Login
            </button>
          </div>
        </div>

        <div className="border-t border-slate-900 text-center text-[11px] text-slate-500 py-4">
          © 2026 ASWAROODA TREKS & TRAVELS. All Rights Reserved. General Travel & Cab Booking Services.
        </div>
      </footer>

    </div>
  );
}