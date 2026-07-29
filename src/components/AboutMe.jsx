import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import SectionHeader from './SectionHeader';
import MiniTerminal from './Terminal';

function AboutMe() {
    const { theme } = useContext(ThemeContext);

    return (
        <section
            id="about"
            className={`py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-transparent`}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-start gap-10">
                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 50, delay: 0.2 }}
                        className="w-full lg:w-7/12"
                    >
                        <SectionHeader
                            theme={theme}
                            label="~/about"
                            title="whoami"
                            titlePrefix="$ "
                            subtitle="Kevin Ranpura"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className={`space-y-6 text-lg leading-relaxed ${theme === "dark" ? "text-[#ffffff]" : "text-[#000000]"
                                }`}
                        >
                            <p className="text-xl md:text-2xl font-light">
                                I enjoy building software that's practical, scalable, and built to last. Whether it's a modern web application or an Agentic AI workflow, I'm always exploring better ways to turn complex ideas into seamless user experiences.
                            </p>

                            {/* <p className="text-base md:text-lg opacity-90">
                                I enjoy building software that's practical, scalable, and built to last. Whether it's a modern web application or an Agentic AI workflow, I'm always exploring better ways to turn complex ideas into seamless user experiences.
                            </p> */}


                        </motion.div>
                    </motion.div>
                    {/* Interactive MiniTerminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12 flex justify-center"
                    >
                        <div className="relative w-[520px] h-[430px] rounded-3xl overflow-hidden border border-[#00e676]/20 bg-[#2f2f2f] ">
                            <MiniTerminal />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default AboutMe;