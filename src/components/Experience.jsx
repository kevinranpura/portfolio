import { motion } from 'motion/react';
import { useContext } from 'react';
import { ThemeContext } from '../App';
import { MapPin, Briefcase, Calendar } from 'lucide-react';
import SectionHeader from './SectionHeader';

function Experience() {
  const { theme } = useContext(ThemeContext);

  const experience = {
    title: 'Software Engineer Intern',
    company: 'Petpooja',
    period: 'Jan 2026 – July 2026',
    location: 'Ahmedabad, India',
    type: 'On Site',
    description: [
      'Engineered cross-platform POS features using Next.js, Tauri and Dexie.js for Android-based billing systems.',
      'Migrated core invoice management workflows into a mobile-first POS application while maintaining feature parity.',
      'Debugged production issues, optimized application performance by 40% improving user experience.',
      'Integrated REST APIs and streamlined local/offline data handling workflows for smoother POS operations.',
    ],
  };

  return (
    <section
      id="experience"
      className={`py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-transparent`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader theme={theme} label="~/experience" title="Experience" />

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`absolute left-0 md:left-12 top-0 w-0.5 ${
              theme === 'dark' ? 'bg-[#00e676]/30' : 'bg-[#86efac]/40'
            }`}
          />

          {/* Experience Item */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative pl-12 md:pl-32 pb-12"
          >
            {/* Timeline Dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
              className={`absolute left-0 md:left-12 top-2 -translate-x-1/2 w-5 h-5 rounded-full border-4 ${
                theme === 'dark'
                  ? 'bg-[#00e676] border-[#050806]'
                  : 'bg-[#86efac] border-[#f8faf8]'
              }`}
            >
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-full ${
                  theme === 'dark' ? 'bg-[#00e676]' : 'bg-[#86efac]'
                }`}
              />
            </motion.div>

            {/* Content */}
            <div>
              {/* Header */}
              <div className="mb-6">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className={`text-3xl md:text-4xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-[#00e676]' : 'text-[#334155]'
                  }`}
                >
                  {experience.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className={`text-xl md:text-2xl font-semibold mb-4 ${
                    theme === 'dark' ? 'text-[#6a7282]' : 'text-[#334155]'
                  }`}
                >
                  {experience.company}
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-wrap gap-4"
                >
                  <div className={`flex items-center gap-2 text-sm md:text-base ${
                    theme === 'dark' ? 'text-[#6a7282]' : 'text-[#334155]'
                  }`}>
                    <Calendar size={16} className={theme === 'dark' ? 'text-[#6a7282]' : 'text-[#86efac]'} />
                    <span>{experience.period}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm md:text-base ${
                    theme === 'dark' ? 'text-[#6a7282]' : 'text-[#334155]'
                  }`}>
                    <MapPin size={16} className={theme === 'dark' ? 'text-[#6a7282]' : 'text-[#86efac]'} />
                    <span>{experience.location}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm md:text-base ${
                    theme === 'dark' ? 'text-[#6a7282]' : 'text-[#334155]'
                  }`}>
                    <Briefcase size={16} className={theme === 'dark' ? 'text-[#6a7282]' : 'text-[#86efac]'} />
                    <span>{experience.type}</span>
                  </div>
                </motion.div>
              </div>

              {/* Description */}
              <ul className="space-y-3">
                {experience.description.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                    className="group/item"
                  >
                    <motion.div
                      whileHover={{ x: 8 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.3, rotate: 90 }}
                        className={`mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                          theme === 'dark' ? 'bg-[#00e676]' : 'bg-[#86efac]'
                        }`}
                      />
                      <span
                        className={`text-base md:text-lg leading-relaxed ${
                          theme === 'dark' ? 'text-[#ffffff]' : 'text-[#334155]'
                        } opacity-85 group-hover/item:opacity-100 transition-opacity`}
                      >
                        {point}
                      </span>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default Experience;