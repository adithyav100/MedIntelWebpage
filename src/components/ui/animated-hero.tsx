"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const titles = useMemo(
    () => ["Decisions.", "Comparisons.", "Alternatives.", "Insights."],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full" />
      </div>

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ y: y1, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-medium text-cyan-400 mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Medical Intelligence</span>
        </motion.div>

        <div className="flex gap-4 flex-col mb-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] text-center">
            <span className="text-white">Smarter Medicine</span>
            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-gradient-accent h-[1.2em]">
              &nbsp;
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-semibold"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? {
                          y: 0,
                          opacity: 1,
                        }
                      : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Compare compositions, analyze side effects, and find cost-effective alternatives with our clinical-grade AI engine. Instantly.
          </p>
        </div>

        <motion.div 
          className="max-w-2xl mx-auto relative group interactive"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-green-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
            className="relative glass-panel rounded-2xl p-2 flex items-center"
          >
            <div className="pl-4 pr-2 text-gray-400">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a medicine, salt, or symptom..." 
              className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 py-4 text-lg"
              required
            />
            <Button type="submit" className="px-6 py-6 rounded-xl font-semibold flex items-center gap-2">
              Search <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div 
          className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </section>
  );
}

export { Hero };
