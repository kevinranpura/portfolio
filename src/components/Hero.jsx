import { motion as Motion } from 'motion/react';
import { ThemeContext } from '../App';
import { useContext, useRef, useEffect, useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import TextPressure from './TextPressure';
import GhostCursor from './GhostCursor';

function Hero({ loaderExiting }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const heroRef = useRef(null);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const showGhost = !prefersReduced && !isTouch && (loaderExiting ?? true);

  const [heroVisible, setHeroVisible] = useState(true);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleResume = () => {
    window.open(
      'https://drive.google.com/file/d/1OKJT7MsdHgzgIIBpUNqA2bdAQA_VQcBd/view?usp=sharing',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleContactScroll = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const ACCENT_GREEN = '#00e676';

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-[100dvh] flex items-center justify-center px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-transparent select-none"
    >
      {/* Ghost cursor trail / glow effect behind text */}
      {showGhost && heroVisible && (
        <GhostCursor
          // Visuals
          color={isDark ? ACCENT_GREEN : '#16a34a'}
          brightness={0.3}
          edgeIntensity={0}

          // Trail and motion
          trailLength={50}
          inertia={0.5}

          // Post-processing
          grainIntensity={0.03}
          bloomStrength={0.12}
          bloomRadius={0.6}
          bloomThreshold={0.05}

          // Fade-out behavior
          fadeDelayMs={800}
          fadeDurationMs={1200}
        />
      )}

      {/* Main Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center py-12 w-full">
        {/* Greeting */}
        <Motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6"
        >
          <span
            className={`font-mono text-sm sm:text-base tracking-[0.25em] uppercase font-medium ${isDark ? 'text-[#86efac]/80' : 'text-slate-500'
              }`}
          >
            Hello! I'm
          </span>
        </Motion.div>

        {/* Name: TextPressure */}
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-6 sm:mb-8"
        >
          <div
            className="w-full max-w-2xl sm:max-w-3xl mx-auto h-32 sm:h-46 md:h-56 relative flex items-center justify-center"
            style={{
              transform: 'scaleY(1.25)',
              transformOrigin: 'center center',
            }}
          >
            <TextPressure
              text="Kevin"
              flex={true}
              scale={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={false}
              textColor={isDark ? "#ffffff" : '#16a34a'}
              minFontSize={64}
              minWght={150}
              maxWght={1000}
              minWdth={50}
              maxWdth={151}
            />
          </div>
        </Motion.div>

        {/* Role: Glassmorphism Capsule Subheadline */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center"
        >
          <div
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full backdrop-blur-md border font-mono text-xs sm:text-sm md:text-base tracking-[0.18em] sm:tracking-[0.25em] uppercase font-medium transition-colors ${
              isDark
                ? 'bg-black/40 border-white/10 text-[#00e676] shadow-[0_0_25px_rgba(0,0,0,0.5)]'
                : 'bg-white/70 border-black/10 text-emerald-700 shadow-sm'
            }`}
          >
            <span>
              Full-Stack Developer{' '}
              <span className={isDark ? 'text-white' : 'text-slate-900'}>&amp;</span>{' '}
              AI Engineer
            </span>
          </div>
        </Motion.div>
      </div>

      {/* ── Bottom-Right Stacked Pill Buttons ── */}
      <Motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 sm:bottom-12 right-6 sm:right-12 lg:right-16 z-20 flex flex-col items-end gap-2.5"
      >
        {/* Filled Accent Pill */}
        <Motion.button
          onClick={handleResume}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,230,118,0.3)] hover:shadow-[0_0_35px_rgba(0,230,118,0.5)] cursor-pointer overflow-hidden"
          style={{
            backgroundColor: ACCENT_GREEN,
            color: '#050806',
          }}
          aria-label="View Resume"
        >
          <span className="w-5 h-5 rounded-full border border-[#050806]/60 flex items-center justify-center transition-transform duration-200 group-hover:rotate-45">
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
          <span>View Resume</span>
        </Motion.button>

        {/* Outlined Pill */}
        <Motion.a
          href="#contact"
          onClick={handleContactScroll}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`group inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-300 border backdrop-blur-sm cursor-pointer ${isDark
              ? 'bg-black/30 border-white/20 text-zinc-200 hover:border-[#00e676] hover:text-[#00e676] hover:bg-[#00e676]/10'
              : 'bg-white/70 border-zinc-300 text-zinc-800 hover:border-[#16a34a] hover:text-[#16a34a]'
            }`}
          aria-label="Get In Touch"
        >
          <span>Get In Touch</span>
          <ArrowRight
            size={12}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Motion.a>
      </Motion.div>
    </section>
  );
}

export default Hero;