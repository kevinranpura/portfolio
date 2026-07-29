import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { Monitor, Server, Cpu, Database, Wrench, BarChart3 } from 'lucide-react';
import SectionHeader from './SectionHeader';

function Skills() {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    const skillCategories = [
        { title: 'Frontend', icon: Monitor, skills: ['React', 'Next.js', 'HTML5', 'Tailwind CSS', 'MaterialUI', 'Framer Motion', 'shadcn/ui'] },
        { title: 'Backend', icon: Server, skills: ['Node.js', 'Express.js', 'REST APIs', 'FastAPI', 'Firebase', 'JWT'] },
        { title: 'Languages', icon: Cpu, skills: ['Python', 'Java', 'JavaScript', 'SQL', 'C', 'TypeScript'] },
        { title: 'Databases', icon: Database, skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'ChromaDB'] },
        { title: 'Tools', icon: Wrench, skills: ['Git', 'GitHub', 'Postman', 'Vercel', 'Supabase'] },
        { title: 'Libraries', icon: BarChart3, skills: ['Chart.js', 'D3.js', 'Matplotlib', 'LangChain', 'LangGraph'] },
    ];

    const cellVariants = {
        hidden: { opacity: 0 },
        visible: (i) => ({
            opacity: 1,
            transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
        }),
    };

    const accent = isDark ? '#00e676' : '#334155';
    const lineColor = isDark ? 'border-white/10' : 'border-slate-900/10';

    return (
        <section
            id="skills"
            className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-transparent"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeader theme={theme} label="~/skills" title="Skills" />

                <div
                    className={`bg-[#111312] mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y ${lineColor} sm:divide-x sm:divide-y-0 lg:divide-x border ${lineColor}`}
                    style={{
                        gridAutoRows: '1fr',
                    }}
                >
                    {skillCategories.map((category, i) => (
                        <motion.div
                            key={category.title}
                            custom={i}
                            variants={cellVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            className={`relative p-8 border-b lg:border-b sm:[&:nth-child(2)]:border-t-0 ${lineColor}`}
                        >
                            {/* Corner bracket */}
                            <span
                                className="absolute top-0 left-0 w-3 h-3 pointer-events-none"
                                style={{
                                    borderTop: `1.5px solid ${accent}`,
                                    borderLeft: `1.5px solid ${accent}`,
                                    opacity: 0.6,
                                }}
                            />
                            {/* <span
                                className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none"
                                style={{
                                    borderBottom: `1.5px solid ${accent}`,
                                    borderRight: `1.5px solid ${accent}`,
                                    opacity: 0.6,
                                }}
                            /> */}

                            <div className="flex items-center justify-between mb-5">
                                <h3
                                    className={`text-[20px] font-bold tracking-tight ${
                                        isDark ? 'text-white' : 'text-slate-800'
                                    }`}
                                >
                                    {category.title}
                                </h3>
                                <span
                                    className={`font-mono text-[15px] ${
                                        isDark ? 'text-[#00e676]/40' : 'text-[#334155]/40'
                                    }`}
                                >
                                    {String(category.skills.length).padStart(2, '0')}
                                </span>
                            </div>

                            <p
                                className={`font-mono text-[15px] leading-[1.9] ${
                                    isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}
                            >
                                {category.skills.join('  ·  ')}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;