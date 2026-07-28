import { motion } from 'motion/react';

function SectionHeader({
  theme,
  label,
  title,
  description,
  titlePrefix,
  titleSuffix,
  subtitle,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${className}`}
    >
      <div className="flex items-center gap-2 mb-6">
        <span className={`text-sm font-mono ${theme === 'dark' ? 'text-[#00e676]' : 'text-green-600'}`}>
          ●
        </span>
        <span className={`text-xs font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
          {label}
        </span>
      </div>

      <h2 className={`text-4xl md:text-4xl font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {titlePrefix && (
          <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>{titlePrefix}</span>
        )}
        {title}
        {titleSuffix && <span>{titleSuffix}</span>}
      </h2>

      {subtitle && (
        <p className={`mt-3 text-sm md:text-base font-mono tracking-[0.22em] ${theme === 'dark' ? 'text-[#00e676]' : 'text-[#334155]'}`}>
          {subtitle}
        </p>
      )}

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className={`mt-6 h-px w-full ${theme === 'dark' ? 'bg-[#4a5565]/30' : 'bg-[#86efac]'}`}
      />

      {description && (
        <p className={`mt-6 max-w-2xl text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeader;