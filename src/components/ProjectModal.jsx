import { motion, AnimatePresence } from 'motion/react';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import { X, ExternalLink, Github, Check } from 'lucide-react';

function ProjectModal({ project, isOpen, onClose }) {
    const { theme } = useContext(ThemeContext);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                    />

                    {/* Modal Container - Full screen on mobile, centered card on desktop */}
                    <div className="fixed inset-0 z-[60] overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative w-screen h-screen rounded-none md:rounded-none backdrop-blur-sm border-0 md:border-2 overflow-y-auto ${
                                // theme === 'dark'
                                //     ? 'bg-[#1c1c1c] md:bg-[#5e6472]/95 md:border-[#b8f2e6]/30'
                                //     : 'bg-[#fafafa] md:bg-white/95 md:border-[#aed9e0]/40'
                                theme === 'dark'
    ? 'bg-[#050806]/95 border-[#00e676]/30'  : 'bg-[#f8faf8] md:bg-white/95 md:border-[#86efac]/40'
                            } shadow-2xl`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 pointer-events-none ${
                                theme === 'dark'
                                    ? 'bg-gradient-to-br from-[#00e676]/5 via-transparent to-transparent'
                                    : 'bg-gradient-to-br from-[#86efac]/10 via-transparent to-transparent'
                            }`} />

                            {/* Close Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className={`fixed top-4 right-4 md:top-6 md:right-6 z-[100] p-3 rounded-xl transition-all duration-300 ${
                                    theme === 'dark'
                                        ? 'bg-[#00e676]/10 hover:bg-[#00e676]/20 text-[#00e676] border border-[#00e676]/30'
                                        : 'bg-[#86efac]/20 hover:bg-[#86efac]/30 text-[#334155] border border-[#86efac]/40'
                                }`}
                                aria-label="Close modal"
                            >
                                <X size={24} />
                            </button>

                            {/* Content */}
                            <div className="relative z-10 h-full overflow-y-auto overscroll-contain custom-scrollbar px-6 py-20 md:px-12 md:py-24">
                                {/* Header */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-12"
                                >
                                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
                                        theme === 'dark' ? 'text-[#00e676]' : 'text-[#334155]'
                                    }`}>
                                        {project.title}
                                    </h2>
                                    
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.15 + i * 0.05 }}
                                                className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                                                    theme === 'dark'
                                                        ? 'bg-[#00e676]/20 text-[#00e676]'
                                                        : 'bg-[#86efac]/40 text-[#334155]'
                                                }`}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4">
                                        {project.live && (
                                            <motion.a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                    theme === 'dark'
                                                        ? 'bg-[#00e676]/10 text-[#00e676] border-2 border-[#00e676]/30 hover:bg-[#00e676]/20'
                                                        : 'bg-[#86efac]/20 text-[#334155] border-2 border-[#86efac]/40 hover:bg-[#86efac]/30'
                                                }`}
                                            >
                                                <ExternalLink size={18} />
                                                View Live
                                            </motion.a>
                                        )}
                                        {project.github && (
                                            <motion.a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                                    theme === 'dark'
                                                        ? 'bg-[#00e676]/10 text-[#00e676] border-2 border-[#00e676]/30 hover:bg-[#00e676]/20'
                                                        : 'bg-[#86efac]/20 text-[#334155] border-2 border-[#86efac]/40 hover:bg-[#86efac]/30'
                                                }`}
                                            >
                                                <Github size={18} />
                                                GitHub
                                            </motion.a>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Divider */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className={`h-px mb-8 ${
                                        theme === 'dark'
                                            ? 'bg-gradient-to-r from-[#00e676]/30 via-[#00e676]/10 to-transparent'
                                            : 'bg-gradient-to-r from-[#86efac]/40 via-[#86efac]/10 to-transparent'
                                    }`}
                                />

                                {/* Overview */}
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                    className="mb-12"
                                >
                                    <h3 className={`text-2xl font-bold mb-4 ${
                                        theme === 'dark' ? 'text-[#00e676]' : 'text-[#334155]'
                                    }`}>
                                        Overview
                                    </h3>
                                    <p className={`leading-8 text-base md:text-lg ${
                                        theme === 'dark' ? 'text-[#86efac]' : 'text-[#334155]'
                                    } opacity-90`}>
                                        {project.fullDescription}
                                    </p>
                                </motion.section>

                                {/* Key Features */}
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mb-12"
                                >
                                    <h3 className={`text-2xl font-bold mb-4 ${
                                        theme === 'dark' ? 'text-[#00e676]' : 'text-[#334155]'
                                    }`}>
                                        Key Features
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.features.map((feature, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.45 + i * 0.05 }}
                                                className="flex items-start gap-3"
                                            >
                                                <Check
                                                    size={20}
                                                    className={`flex-shrink-0 mt-1 ${
                                                        theme === 'dark' ? 'text-[#00e676]' : 'text-[#86efac]'
                                                    }`}
                                                />
                                                <span className={`leading-relaxed ${
                                                    theme === 'dark' ? 'text-[#86efac]' : 'text-[#334155]'
                                                } opacity-90`}>
                                                    {feature}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.section>

                                {/* Challenges & Solutions */}
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mb-12"
                                >
                                    <h3 className={`text-2xl font-bold mb-4 ${
                                        theme === 'dark' ? 'text-[#00e676]' : 'text-[#334155]'
                                    }`}>
                                        Challenges & Solutions
                                    </h3>
                                    
                                    {/* Challenges */}
                                    <h4 className={`text-lg font-semibold mb-3 ${
                                        theme === 'dark' ? 'text-[#86efac]' : 'text-[#334155]'
                                    }`}>
                                        Challenges
                                    </h4>
                                    <ul className="space-y-2 mb-6">
                                        {project.challenges.map((challenge, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.55 + i * 0.05 }}
                                                className={`flex items-start gap-3 pl-4 ${
                                                    theme === 'dark' ? 'text-[#86efac]' : 'text-[#334155]'
                                                } opacity-80`}
                                            >
                                                <span>•</span>
                                                <span>{challenge}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Solutions */}
                                    <h4 className={`text-lg font-semibold mb-3 ${
                                        theme === 'dark' ? 'text-[#86efac]' : 'text-[#334155]'
                                    }`}>
                                        Solutions
                                    </h4>
                                    <ul className="space-y-2">
                                        {project.solutions.map((solution, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + i * 0.05 }}
                                                className={`flex items-start gap-3 pl-4 ${
                                                    theme === 'dark' ? 'text-[#86efac]' : 'text-[#334155]'
                                                } opacity-80`}
                                            >
                                                <span>•</span>
                                                <span>{solution}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.section>
                            </div>
                        </motion.div>
                    </div>

                    {/* Custom Scrollbar Styles */}
                    <style jsx>{`
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 8px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: ${theme === 'dark' ? 'rgba(94, 100, 114, 0.2)' : 'rgba(174, 217, 224, 0.2)'};
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: ${theme === 'dark' ? 'rgba(184, 242, 230, 0.3)' : 'rgba(94, 100, 114, 0.3)'};
                            border-radius: 10px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: ${theme === 'dark' ? 'rgba(184, 242, 230, 0.5)' : 'rgba(94, 100, 114, 0.5)'};
                        }
                    `}</style>
                </>
            )}
        </AnimatePresence>
    );
}

export default ProjectModal;