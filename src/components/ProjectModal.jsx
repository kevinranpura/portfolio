import { motion, AnimatePresence } from 'motion/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../App';
import { X, ExternalLink, Github, Check } from 'lucide-react';

function ProjectModal({ project, isOpen, onClose }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const accent = isDark ? '#00e676' : '#334155';

    const scrollRef = useRef(null);
    const sectionRefs = useRef([]);
    const [activeSection, setActiveSection] = useState(0);

    const sections = ['Overview', 'Key Features', 'Challenges & Solutions'];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;
        const offsets = sectionRefs.current.map((el) =>
            el ? Math.abs(el.getBoundingClientRect().top - container.getBoundingClientRect().top) : Infinity
        );
        const closest = offsets.indexOf(Math.min(...offsets));
        if (closest !== -1) setActiveSection(closest);
    };

    const scrollToSection = (i) => {
        sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                    />

                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-8 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => e.stopPropagation()}
                            className={`relative w-full h-full md:h-[86vh] md:max-w-4xl overflow-hidden md:rounded-xl border pointer-events-auto ${
                                isDark ? 'bg-[#070a08] border-white/10' : 'bg-white border-slate-900/10'
                            } shadow-2xl`}
                        >
                            {/* Top bar */}
                            <div
                                className={`flex items-center justify-between px-6 md:px-8 py-4 border-b ${
                                    isDark ? 'border-white/10' : 'border-slate-900/10'
                                }`}
                            >
                                <span className={`font-mono text-[11px] tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                    PROJECT
                                </span>
                                <button
                                    onClick={onClose}
                                    className={`p-1.5 rounded-md transition-colors duration-300 ${
                                        isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-900/5'
                                    }`}
                                    aria-label="Close modal"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex flex-col md:flex-row h-[calc(100%-53px)]">
                                {/* Section rail */}
                                <div
                                    className={`hidden md:flex flex-col justify-between w-52 flex-shrink-0 border-r px-6 py-8 ${
                                        isDark ? 'border-white/10' : 'border-slate-900/10'
                                    }`}
                                >
                                    <div className="space-y-1">
                                        {sections.map((s, i) => (
                                            <button
                                                key={s}
                                                onClick={() => scrollToSection(i)}
                                                className="relative block w-full text-left py-2.5 group"
                                            >
                                                <span
                                                    className={`text-sm transition-colors duration-300 ${
                                                        activeSection === i
                                                            ? isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'
                                                            : isDark ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-600'
                                                    }`}
                                                >
                                                    {s}
                                                </span>
                                                {activeSection === i && (
                                                    <motion.span
                                                        layoutId="modalSectionIndicator"
                                                        className="absolute left-[-25px] top-0 bottom-0 w-px"
                                                        style={{ backgroundColor: accent }}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`p-2 rounded-md transition-colors duration-300 ${
                                                    isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-900/5'
                                                }`}
                                                aria-label="View live"
                                            >
                                                <ExternalLink size={15} />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`p-2 rounded-md transition-colors duration-300 ${
                                                    isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-900/5'
                                                }`}
                                                aria-label="GitHub"
                                            >
                                                <Github size={15} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div
                                    ref={scrollRef}
                                    onScroll={handleScroll}
                                    className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 py-8 md:py-10"
                                >
                                    <div className="mb-10">
                                        <h2
                                            className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight ${
                                                isDark ? 'text-white' : 'text-slate-900'
                                            }`}
                                        >
                                            {project.title}
                                        </h2>

                                        <div className={`flex flex-wrap gap-x-4 gap-y-1.5 mb-6 font-mono text-xs ${
                                            isDark ? 'text-slate-500' : 'text-slate-500'
                                        }`}>
                                            {project.tags.map((tag, i) => (
                                                <span key={i}>{tag}</span>
                                            ))}
                                        </div>

                                        <div className="flex md:hidden gap-3">
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-md ${
                                                        isDark ? 'border-white/15 text-slate-200' : 'border-slate-900/15 text-slate-700'
                                                    }`}
                                                >
                                                    <ExternalLink size={14} /> Live
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-md ${
                                                        isDark ? 'border-white/15 text-slate-200' : 'border-slate-900/15 text-slate-700'
                                                    }`}
                                                >
                                                    <Github size={14} /> Code
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Overview */}
                                    <section ref={(el) => (sectionRefs.current[0] = el)} className="mb-14 scroll-mt-4">
                                        <SectionLabel title="Overview" isDark={isDark} />
                                        <p className={`leading-8 text-[15px] md:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                            {project.fullDescription}
                                        </p>
                                    </section>

                                    {/* Features */}
                                    <section ref={(el) => (sectionRefs.current[1] = el)} className="mb-14 scroll-mt-4">
                                        <SectionLabel title="Key Features" isDark={isDark} />
                                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                                            {project.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-2.5">
                                                    <Check size={15} className="flex-shrink-0 mt-0.5" style={{ color: accent }} />
                                                    <span className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Challenges & Solutions */}
                                    <section ref={(el) => (sectionRefs.current[2] = el)} className="mb-6 scroll-mt-4">
                                        <SectionLabel title="Challenges & Solutions" isDark={isDark} />
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                                                    CHALLENGES
                                                </span>
                                                <ul className="mt-3 space-y-7">
                                                    {project.challenges.map((c, i) => (
                                                        <li key={i} className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                                                            <span style={{ color: accent }}>~/ </span>
                                                            <span>{c}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <span className={`text-xs font-semibold tracking-wide ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                                                    SOLUTIONS
                                                </span>
                                                <ul className="mt-3 space-y-6">
                                                    {project.solutions.map((s, i) => (
                                                        <li key={i} className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                                                            <span style={{ color: accent }}>~/ </span>
                                                            <span>{s}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <style>{`
                        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.12)'};
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)'};
                        }
                    `}</style>
                </>
            )}
        </AnimatePresence>
    );
}

function SectionLabel({ title, isDark }) {
    return (
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {title}
        </h3>
    );
}

export default ProjectModal;