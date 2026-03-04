import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { Search, ArrowRight, Activity, Shield, Zap, ChevronDown, Check, Star, ArrowUpRight, Pill, Menu, X, Info, AlertTriangle, RefreshCw, Sparkles, Database, Fingerprint, Layers } from 'lucide-react';
import { cn } from './utils';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import { Hero } from './components/ui/animated-hero';
import { AIDashboardImage } from './components/ui/ai-dashboard-image';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchPage from './pages/Search';

// --- Custom Cursor ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        className="absolute w-2 h-2 bg-cyan-500 rounded-full mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="absolute w-10 h-10 border border-cyan-500/50 rounded-full mix-blend-screen flex items-center justify-center"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      >
        {isHovering && <div className="w-1 h-1 bg-cyan-500 rounded-full" />}
      </motion.div>
    </div>
  );
};

// --- Loader ---
const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#050b14] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          className="absolute inset-0 border-t-2 border-cyan-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 border-r-2 border-green-400 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Activity className="w-8 h-8 text-white" />
        </div>
      </div>
      <motion.div
        className="overflow-hidden h-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1
          className="text-2xl font-bold tracking-widest uppercase text-gradient"
          initial={{ y: 32 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          MedIntel
        </motion.h1>
      </motion.div>
      <motion.div
        className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-green-400"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
};

// --- Navbar ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
        scrolled ? "bg-[#050b14]/80 backdrop-blur-xl border-white/5 py-4" : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 interactive cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-green-400 flex items-center justify-center">
            <Activity className="w-5 h-5 text-[#050b14]" />
          </div>
          <span className="text-xl font-bold tracking-tight">MedIntel</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {['Search', 'Compare', 'Insights', 'API'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors interactive">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-cyan-400 transition-colors interactive">
            Log in
          </Link>
          <Link to="/signup" className="bg-white text-[#050b14] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors interactive">
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

// --- Dashboard Preview ---
const DashboardPreview = () => {
  return (
    <div className="flex flex-col overflow-hidden -mt-20 md:-mt-32 relative z-20">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
              Experience the future of <br />
              <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none text-gradient-accent">
                Medical Intelligence
              </span>
            </h2>
          </>
        }
      >
        <AIDashboardImage />
      </ContainerScroll>
    </div>
  );
};

// --- Live Search Section ---
const SearchSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const allResults = [
    { name: "Amoxicillin 500mg", salt: "Amoxicillin", type: "Antibiotic", price: "$12.99", match: "98%" },
    { name: "Augmentin 625 Duo", salt: "Amoxicillin + Clavulanic Acid", type: "Antibiotic", price: "$18.50", match: "85%" },
    { name: "Moxikind-CV 625", salt: "Amoxicillin + Clavulanic Acid", type: "Antibiotic", price: "$15.00", match: "82%" },
    { name: "Ibuprofen 400mg", salt: "Ibuprofen", type: "Pain Reliever", price: "$8.99", match: "95%" },
    { name: "Paracetamol 500mg", salt: "Paracetamol", type: "Pain Reliever", price: "$5.50", match: "99%" },
    { name: "Cetirizine 10mg", salt: "Cetirizine", type: "Antihistamine", price: "$6.20", match: "92%" },
    { name: "Azithromycin 250mg", salt: "Azithromycin", type: "Antibiotic", price: "$14.00", match: "88%" },
  ];

  const results = query.trim() === '' 
    ? allResults.slice(0, 3) 
    : allResults.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.salt.toLowerCase().includes(query.toLowerCase())).slice(0, 4);

  return (
    <section id="search" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Real-time <span className="text-gradient">Intelligence.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our AI engine processes millions of medical data points instantly. Type a brand name or active ingredient to see comprehensive details, alternatives, and pricing across pharmacies.
            </p>
            <ul className="space-y-4">
              {[
                "Instant autocomplete suggestions",
                "Salt composition breakdown",
                "Real-time price tracking",
                "Availability status"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-panel rounded-3xl p-6 relative z-10">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a medicine name..."
                  className="bg-transparent border-none outline-none text-lg text-white w-full placeholder-gray-600"
                />
              </div>
              
              <div className="space-y-4">
                {results.length > 0 ? results.map((result, i) => (
                  <motion.div
                    key={i}
                    onClick={() => navigate(`/medicine/${result.name.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{result.name}</h4>
                        <p className="text-xs text-gray-400">{result.salt}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-white">{result.price}</span>
                        <div className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full mt-1">
                          {result.match} Match
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    No medicines found matching "{query}"
                  </div>
                )}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Comparison Section ---
const ComparisonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="compare" className="py-32 relative bg-[#0a1526]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Side-by-side <span className="text-gradient">Clarity.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Stop guessing. Compare medicines head-to-head based on active ingredients, side effects, and pricing to make informed decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* VS Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex w-16 h-16 rounded-full bg-[#050b14] border border-white/10 items-center justify-center font-bold text-xl text-cyan-400 shadow-2xl">
            VS
          </div>

          {/* Medicine A */}
          <motion.div
            className="glass-panel rounded-3xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">Brand Name</span>
                <h3 className="text-3xl font-bold text-white">Advil</h3>
                <p className="text-gray-400 mt-1">Ibuprofen 200mg</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">$8.99</span>
                <p className="text-xs text-gray-500">Per 50 tabs</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Efficacy Rating</span>
                  <span className="text-white font-medium">4.8/5</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 w-[96%]" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <h4 className="text-sm font-medium text-gray-300 mb-4">Common Side Effects</h4>
                <div className="flex flex-wrap gap-2">
                  {['Upset stomach', 'Mild heartburn', 'Dizziness'].map(effect => (
                    <span key={effect} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/5">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medicine B */}
          <motion.div
            className="glass-panel rounded-3xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 blur-3xl rounded-full" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <span className="text-xs font-medium text-green-400 uppercase tracking-wider mb-2 block">Generic Alternative</span>
                <h3 className="text-3xl font-bold text-white">Equate</h3>
                <p className="text-gray-400 mt-1">Ibuprofen 200mg</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-400">$4.50</span>
                <p className="text-xs text-gray-500">Per 50 tabs</p>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Efficacy Rating</span>
                  <span className="text-white font-medium">4.7/5</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 w-[94%]" />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <h4 className="text-sm font-medium text-gray-300 mb-4">Common Side Effects</h4>
                <div className="flex flex-wrap gap-2">
                  {['Upset stomach', 'Mild heartburn', 'Dizziness'].map(effect => (
                    <span key={effect} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 border border-white/5">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Detail Accordion ---
const DetailAccordion = ({ title, icon: Icon, children, defaultOpen = false }: any) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left interactive group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <Icon className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-lg font-medium text-white">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-14 text-gray-400 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Medicine Detail Section ---
const MedicineDetail = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-400 mb-6">
            <Database className="w-3 h-3" />
            <span>Comprehensive Data</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Deep dive into <span className="text-gradient">details.</span>
          </h2>
        </motion.div>

        <motion.div
          className="glass-panel rounded-3xl p-2 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <DetailAccordion title="Active Composition" icon={Fingerprint} defaultOpen={true}>
            <p className="mb-4">Contains <strong className="text-white">Paracetamol 500mg</strong> and <strong className="text-white">Caffeine 50mg</strong>.</p>
            <p>Paracetamol acts as an analgesic and antipyretic, while caffeine enhances its pain-relieving effects by increasing absorption and acting as a mild stimulant.</p>
          </DetailAccordion>
          
          <DetailAccordion title="Primary Uses" icon={Activity}>
            <ul className="list-disc pl-4 space-y-2">
              <li>Relief from mild to moderate pain (headaches, migraines, toothaches).</li>
              <li>Reduction of fever.</li>
              <li>Alleviation of symptoms associated with colds and flu.</li>
            </ul>
          </DetailAccordion>

          <DetailAccordion title="Side Effects & Warnings" icon={AlertTriangle}>
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
              <p className="text-red-400 text-sm font-medium">Do not exceed the recommended dose. High doses can cause severe liver damage.</p>
            </div>
            <p>Common side effects may include nausea, insomnia (due to caffeine), and allergic skin reactions. Consult a doctor if symptoms persist.</p>
          </DetailAccordion>

          <DetailAccordion title="AI Alternative Suggestions" icon={Sparkles}>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              {[
                { name: "Generic Paracetamol", price: "-40% cost", tag: "Most Economical" },
                { name: "Ibuprofen 400mg", price: "Similar efficacy", tag: "Anti-inflammatory" }
              ].map((alt, i) => (
                <div key={i} onClick={() => navigate(`/medicine/${alt.name.toLowerCase().replace(/\s+/g, '-')}`)} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-white font-medium">{alt.name}</h5>
                    <ArrowUpRight className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-400">{alt.price}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="text-gray-400">{alt.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </DetailAccordion>
        </motion.div>
      </div>
    </section>
  );
};

// --- Features ---
const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Layers,
      title: "Vast Database",
      desc: "Access information on over 100,000+ medicines, salts, and medical products globally."
    },
    {
      icon: Shield,
      title: "Verified Accuracy",
      desc: "Data sourced directly from pharmaceutical manufacturers and verified by medical professionals."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      desc: "Prices, availability, and new drug approvals are updated in real-time across our network."
    }
  ];

  return (
    <section className="py-32 relative bg-[#0a1526]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-3xl p-8 group hover:bg-white/5 transition-colors duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="pt-32 pb-12 relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6 interactive">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-green-400 flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#050b14]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">MedIntel</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-8">
              Empowering patients and professionals with AI-driven medical intelligence, transparent pricing, and clinical-grade comparisons.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/search" className="hover:text-cyan-400 transition-colors">Search Engine</Link></li>
              <li><Link to="/compare" className="hover:text-cyan-400 transition-colors">Compare Tool</Link></li>
              <li><Link to="/insights" className="hover:text-cyan-400 transition-colors">AI Insights</Link></li>
              <li><Link to="/api" className="hover:text-cyan-400 transition-colors">API Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-cyan-400 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-cyan-400 transition-colors">Medical Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-gray-500">
          <p>© 2026 MedIntel Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Home = () => (
  <main>
    <Hero />
    <DashboardPreview />
    <SearchSection />
    <ComparisonSection />
    <MedicineDetail />
    <Features />
  </main>
);

const PlaceholderPage = ({ title }: { title: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);
  
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="w-20 h-20 mx-auto bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
          <Activity className="w-10 h-10 text-cyan-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">
          This page is currently under construction. We're working hard to bring you the best medical intelligence experience.
        </p>
        <Link to="/" className="bg-white text-[#050b14] px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div 
          className="bg-[#050b14] min-h-screen text-white selection:bg-cyan-500/30 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/compare" element={<PlaceholderPage title="Compare Medicines" />} />
              <Route path="/insights" element={<PlaceholderPage title="AI Insights" />} />
              <Route path="/api" element={<PlaceholderPage title="API Documentation" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<PlaceholderPage title="About Us" />} />
              <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
              <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
              <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
              <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
              <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
              <Route path="/disclaimer" element={<PlaceholderPage title="Medical Disclaimer" />} />
              <Route path="/medicine/:id" element={<PlaceholderPage title="Medicine Details" />} />
              <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
            </Routes>
          </div>
          <Footer />
        </motion.div>
      )}
    </BrowserRouter>
  );
}
