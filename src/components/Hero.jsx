import { motion as Motion } from 'motion/react';
import { ThemeContext } from '../App';
import { useContext } from 'react';
import { FileText, Mail, ArrowUpRight } from 'lucide-react';

function Hero() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

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
      block: 'start'
    });
  };

  return (
    <section
      id="home"
      className="min-h-[100dvh] flex items-center justify-center px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-transparent select-none"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center py-12">
        
        {/* Greeting: Refined, elegant tracking */}
        <Motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 sm:mb-6"
        >
          <span className={`font-mono text-sm sm:text-base tracking-[0.25em] uppercase font-medium ${
            isDark ? 'text-[#86efac]/80' : 'text-slate-500'
          }`}>
            Hello! I'm
          </span>
        </Motion.div>

        {/* Name: Elegant Didone Serif with hollow stroked outline from reference image */}
        <Motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-tight mb-6 sm:mb-8 leading-none cursor-default group"
          style={{ fontFamily: "'Bodoni Moda', 'Playfair Display', serif" }}
        >
          <span className={`inline-block transition-colors duration-300 ${
            isDark ? 'text-[#00e676]' : 'text-emerald-600'
          }`}>
            Kevin Ranpura
          </span>
          <Motion.span
            aria-hidden="true"
            className="inline-block ml-2 sm:ml-3 h-[0.75em] w-[4px] sm:w-[5px] bg-[#00e676] align-baseline rounded-none"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
          />
        </Motion.h1>

        {/* Role: Crisp, balanced subheadline */}
        <Motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={`font-mono text-lg sm:text-2xl md:text-3xl font-light tracking-wide mb-8 max-w-2xl ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Full-Stack Developer{' '}
          <span className={`font-normal ${
            isDark ? 'text-[#00e676]' : 'text-emerald-600'
          }`}>
            &amp;
          </span>{' '}
          AI Engineer
        </Motion.p>

        {/* Refined Minimalist Line with Traveling Light Pulse */}
        <Motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`relative h-[1.5px] w-40 sm:w-56 mb-10 overflow-hidden ${
            isDark ? 'bg-white/10' : 'bg-slate-300'
          }`}
        >
          <Motion.div
            className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-[#00e676] to-transparent"
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </Motion.div>

        {/* Action Buttons: Sleek, high-contrast, perfectly proportioned */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none"
        >
          {/* Primary CTA: Resume */}
          <Motion.button
            onClick={handleResume}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-mono font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 whitespace-nowrap overflow-hidden ${
              isDark
                ? 'bg-[#00e676] text-[#050806] hover:bg-[#15f786] shadow-md hover:shadow-lg'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
            }`}
            aria-label="View Resume"
          >
            {/* Subtle light sweep on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <FileText size={18} className="shrink-0" />
            <span>View Resume</span>
            <ArrowUpRight
              size={17}
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Motion.button>

          {/* Secondary CTA: Contact */}
          <Motion.a
            href="#contact"
            onClick={handleContactScroll}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-mono font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 whitespace-nowrap border ${
              isDark
                ? 'bg-[#050806]/60 border-white/20 text-white hover:border-[#00e676] hover:text-[#00e676] hover:bg-[#00e676]/5'
                : 'bg-white border-slate-300 text-slate-800 hover:border-slate-900 hover:text-slate-900'
            }`}
            aria-label="Get In Touch"
          >
            <Mail size={18} className="shrink-0" />
            <span>Get In Touch</span>
          </Motion.a>
        </Motion.div>

      </div>
    </section>
  );
}

export default Hero;