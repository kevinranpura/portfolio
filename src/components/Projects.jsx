import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import { projectsData } from '../data/projectsData';
import SectionHeader from './SectionHeader';

function Projects() {
    const { theme } = useContext(ThemeContext);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const featuredProjects = projectsData.filter(p => p.featured);
    const otherProjects = projectsData.filter(p => !p.featured);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Delay clearing selected project to allow exit animation
        setTimeout(() => setSelectedProject(null), 300);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    return (
        <section
            id="projects"
            className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-transparent"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeader
                    theme={theme}
                    label="~/projects"
                    title="Selected Projects"
                />

                {/* Featured Projects */}
                {featuredProjects.length > 0 && (
                    <div className="mb-16">
                        {/* <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`text-2xl md:text-3xl font-bold mb-8 ${
                                theme === "dark" ? "text-[#00e676]" : "text-[#334155]"
                            }`}
                        >
                            Featured Projects
                        </motion.h3> */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {featuredProjects.map((project, i) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project}
                                    onClick={() => handleProjectClick(project)}
                                />
                            ))}
                        </motion.div>
                    </div>
                )}

                {/* Other Projects */}
                {/* {otherProjects.length > 0 && (
                    <div className="mb-16">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`text-2xl md:text-3xl font-bold mb-8 ${
                                theme === "dark" ? "text-[#00e676]" : "text-[#334155]"
                            }`}
                        >
                            Other Projects
                        </motion.h3>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {otherProjects.map((project, i) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project}
                                    onClick={() => handleProjectClick(project)}
                                    isCompact={true}
                                />
                            ))}
                        </motion.div>
                    </div>
                )} */}

                {/* View More Section */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <motion.a
                        href="https://github.com/kevinranpura"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                            theme === "dark"
                                ? "bg-[#00e676]/10 text-[#00e676] border-2 border-[#00e676]/30 hover:bg-[#00e676]/20 hover:border-[#00e676]/50"
                                : "bg-[#86efac]/20 text-[#334155] border-2 border-[#86efac]/40 hover:bg-[#86efac]/30 hover:border-[#86efac]/60"
                        }`}
                    >
                        <span>View More Projects</span>
                        <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                    </motion.a>
                </motion.div> */}
            </div>

            {/* Project Modal */}
            <ProjectModal 
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </section>
    );
}

export default Projects;