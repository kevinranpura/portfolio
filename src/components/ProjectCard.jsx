import { motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa';
import { useContext } from 'react';
import { ThemeContext } from '../App';

/**
 * ProjectCard — minimal / futuristic / premium redesign.
 *
 * - No colored pill badges: tags render as a thin, dot-separated
 *   monospace line instead.
 * - Hairline border that only brightens on hover, with faint corner
 *   brackets fading in (HUD motif) instead of the old blurred blob.
 * - Small muted index-style eyebrow instead of a heavy title treatment.
 * - Works in both dark and light theme.
 */
function ProjectCard({ project, onClick, isCompact = false }) {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    const {
        title,
        shortDescription,
        tags,
        live,
        github,
        featured
    } = project;

    const displayDescription = isCompact && shortDescription.length > 120
        ? shortDescription.substring(0, 120) + '...'
        : shortDescription;

    const accent = isDark ? "#00e676" : "#16a34a";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: isCompact ? -3 : -6 }}
            className="group relative h-full cursor-pointer"
            onClick={onClick}
        >
            <div
                className={`relative h-full overflow-hidden rounded-2xl border transition-colors duration-500 ${isCompact ? 'p-5' : 'p-7 md:p-8'
                    } ${isDark
                        ? 'bg-[#111312] border-white/10 hover:border-[#00e676]/40'
                        : 'bg-white border-slate-200 hover:border-[#16a34a]/40'
                    }`}
            >
                {/* corner brackets — fade in on hover */}
                {['top-4 left-4 border-t border-l', 'bottom-4 right-4 border-b border-r'].map((pos) => (
                    <span
                        key={pos}
                        style={{ borderColor: `${accent}99` }}
                        className={`pointer-events-none absolute h-3 w-3 ${pos} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                ))}

                {/* ambient glow, top-right, only on hover */}
                <div
                    className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle, ${accent}1a, transparent 70%)`,
                    }}
                />

                <div className="relative z-10 flex h-full flex-col">
                    {/* eyebrow row */}
                    <div className="mb-4 flex items-center justify-between">
                        <span
                            className={`font-mono text-[10px] uppercase tracking-widest ${isDark ? 'text-white/25' : 'text-slate-400'
                                }`}
                        >
                            Project
                        </span>
                        {featured && (
                            <span
                                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
                                style={{ color: `${accent}b3` }}
                            >
                                <span
                                    className="h-1 w-1 rounded-full"
                                    style={{ backgroundColor: accent }}
                                />
                                Featured
                            </span>
                        )}
                    </div>

                    {/* title */}
                    <h3
                        className={`font-semibold transition-colors duration-300 ${isCompact ? 'text-lg mb-2' : 'text-2xl md:text-[1.6rem] mb-3'
                            } ${isDark ? 'text-white group-hover:text-[#00e676]' : 'text-slate-800 group-hover:text-[#16a34a]'
                            }`}
                    >
                        {title}
                    </h3>

                    {/* description */}
                    <p
                        className={`flex-grow leading-relaxed ${isCompact ? 'mb-4 text-sm line-clamp-2' : 'mb-7 text-[15px]'
                            } ${isDark ? 'text-white/45' : 'text-slate-500'}`}
                    >
                        {displayDescription}
                    </p>

                    {/* tags — thin dot-separated line, no pills */}
                    {tags?.length > 0 && (
                        <div
                            className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wide ${isCompact ? 'mb-4' : 'mb-5'
                                } ${isDark ? 'text-white/35' : 'text-slate-400'}`}
                        >
                            {tags.map((tag, i) => (
                                <span key={tag} className="flex items-center gap-x-2">
                                    {i > 0 && (
                                        <span style={{ color: `${accent}66` }}>&middot;</span>
                                    )}
                                    <span>{tag}</span>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* divider */}
                    <div
                        className={`mb-5 h-px w-full ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}
                    />

                    {/* links */}
                    <div className="flex items-center justify-between">
                        {live ? (
                            <motion.a
                                href={live}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ x: 3 }}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-white/80 hover:text-[#00e676]' : 'text-slate-700 hover:text-[#16a34a]'
                                    }`}
                            >
                                <span>View Live</span>
                                <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.a>
                        ) : (
                            <span />
                        )}

                        {github && (
                            <motion.a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="View GitHub repository"
                                className={`transition-colors ${isDark ? 'text-white/40 hover:text-[#00e676]' : 'text-slate-400 hover:text-[#16a34a]'
                                    }`}
                            >
                                <FaGithub size={isCompact ? 18 : 20} />
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProjectCard;