import { motion, AnimatePresence } from 'motion/react';
import { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import SectionHeader from './SectionHeader';

function Contact() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailContent, setEmailContent] = useState({
    to: 'kevinranpura27@gmail.com',
    subject: 'Opportunity for Collaboration',
    body: `Hi Kevin,

I came across your portfolio and wanted to reach out about a potential opportunity.

We're looking for someone with your background in Full Stack Development and AI, and I think you'd be a strong fit.

Would you be open to a quick 20-minute call this week?

Best regards,
[Your Name]`
  });
  const [copied, setCopied] = useState(false);
  const { theme = 'light' } = useContext(ThemeContext);

  const contactInfo = {
    location: 'Ahmedabad, India',
    timezone: 'IST (GMT+5:30)',
    stack: 'Next.js / Node.js / Agentic AI / LLMs',
    status: 'Available for work',
    linkedin: 'linkedin.com/in/kevinranpura27'
  };

  const contactActions = [
    {
      title: 'View Work',
      description: 'Browse selected projects',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      title: 'Cold Email Me',
      description: 'Open a polished template',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      onClick: () => setShowEmailModal(true)
    },
    {
      title: 'GitHub',
      description: 'Code, experiments, shipping notes',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      onClick: () => window.open('https://github.com/kevinranpura', '_blank')
    },
    {
      title: 'LinkedIn',
      description: 'Professional network and updates',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      onClick: () => window.open('https://linkedin.com/in/kevinranpura27', '_blank')
    },
  ];

  const handleCopy = () => {
    const fullEmail = `To: ${emailContent.to}\nSubject: ${emailContent.subject}\n\n${emailContent.body}`;
    navigator.clipboard.writeText(fullEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section
        id="contact"
        className={`min-h-screen py-10 px-6 sm:px-8 lg:px-12 ${
          theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full">
          <SectionHeader theme={theme} label="~/contact" title="Let's build something." />

          <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_1.14fr] lg:items-start gap-10 xl:gap-14">
            {/* Left Side - Contact Info & Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 lg:pt-2"
            >
              {/* Email CTA */}
              <div>
                <motion.a
                  href="mailto:kevinranpura27@gmail.com"
                  className={`group inline-flex items-center gap-3 text-2xl md:text-3xl font-mono  ${
                    theme === 'dark' ? 'text-white hover:text-[#00e676]' : 'text-gray-900 hover:text-green-600'
                  } transition-colors`}
                  whileHover={{ x: 5 }}
                >
                  kevinranpura27@gmail.com
                  <motion.span
                    initial={{ x: 0 }}
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
                <div
                  className={`mt-6 w-full border-b-[2px] border-dashed  ${
                    theme === 'dark' ? 'border-[#4a5565]/30' : 'border-[#86efac]'
                  }`}
                />
              </div>

              {/* Info List */}
              <div className="space-y-2 font-mono text-sm">
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>location:</span>{' '}
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{contactInfo.location}</span>
                </div>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>timezone:</span>{' '}
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{contactInfo.timezone}</span>
                </div>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>stack:</span>{' '}
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{contactInfo.stack}</span>
                </div>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>status:</span>{' '}
                  <span className={theme === 'dark' ? 'text-[#00e676]' : 'text-green-600'}>{contactInfo.status}</span>
                </div>
                <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>linkedin:</span>{' '}
                  <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{contactInfo.linkedin}</span>
                </div>
              </div>

            </motion.div>

            {/* Right Side - Contact Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`self-start w-full lg:w-[104%] lg:justify-self-end rounded-[1.75rem] border p-3.5 md:p-4 shadow-2xl shadow-black/10 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/[0.03] backdrop-blur-xl'
                  : 'border-gray-200 bg-white/80 backdrop-blur-xl'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-white/10">
                <div>
                  <p className={`text-xs font-mono uppercase tracking-[0.25em] ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    direct lines
                  </p>
                  <h3 className={`mt-2 text-lg font-light ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Minimal touchpoints, quick response.
                  </h3>
                </div>
                <div className={`hidden sm:flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] font-mono border ${
                  theme === 'dark'
                    ? 'border-[#00e676]/20 bg-[#00e676]/10 text-[#00e676]'
                    : 'border-emerald-500/20 bg-emerald-50 text-emerald-700'
                }`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  available now
                </div>
              </div>

              <div className="space-y-2.5">
                {contactActions.map((action) => (
                  <motion.button
                    key={action.title}
                    type="button"
                    whileHover={{ x: 4 }}
                    onClick={action.onClick}
                    className={`group w-full flex items-center justify-between gap-4 rounded-2xl border px-3.5 py-3 text-left transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105 ${
                        theme === 'dark'
                          ? 'border-[#00e676]/20 bg-[#00e676]/10 text-[#00e676]'
                          : 'border-[#86efac]/30 bg-[#86efac]/15 text-[#334155]'
                      }`}>
                        {action.icon}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-mono text-sm uppercase tracking-[0.22em] ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {action.title}
                        </p>
                        <p className={`mt-0.5 text-xs ${
                          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                        }`}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <svg className={`w-5 h-5 flex-none transition-transform duration-300 group-hover:translate-x-1 ${
                      theme === 'dark' ? 'text-[#00e676]/70' : 'text-[#334155]/60'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className={`mt-20 border-t pt-8 ${
            theme === 'dark' ? 'border-[#4a5565]/30' : 'border-[#86efac]'
          }`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className={`font-mono text-xs uppercase tracking-[0.28em] ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
              }`}>
                © 2026 Kevin Ranpura · Built with React, Motion, and Tailwind
              </p>

              <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-[0.22em]">
                <a
                  href="https://github.com/kevinranpura"
                  target="_blank"
                  rel="noreferrer"
                  className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  github
                </a>
                <a
                  href="https://linkedin.com/in/kevinranpura27"
                  target="_blank"
                  rel="noreferrer"
                  className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  linkedin
                </a>
                <a
                  href="mailto:kevinranpura27@gmail.com"
                  className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Modal - Editable */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEmailModal(false)}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className={`rounded-xl overflow-hidden border ${
                theme === 'dark'
                  ? 'bg-[#0a0a0a] border-gray-800'
                  : 'bg-white border-gray-200'
              }`}>
                {/* Header */}
                <div className={`flex items-center justify-between px-6 py-4 border-b ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowEmailModal(false)}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
                      />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className={`text-sm font-mono ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      recruiter_message.txt
                    </span>
                  </div>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className={`text-xs font-mono px-3 py-1 rounded ${
                      theme === 'dark'
                        ? 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    ESC
                  </button>
                </div>

                {/* Content - Editable */}
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div>
                    <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      To:
                    </label>
                    <input
                      type="email"
                      value={emailContent.to}
                      onChange={(e) => setEmailContent({ ...emailContent, to: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border font-mono text-sm ${
                        theme === 'dark'
                          ? 'bg-[#111111] border-gray-800 text-white focus:border-gray-700'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-gray-300'
                      } focus:outline-none transition-colors`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      Subject:
                    </label>
                    <input
                      type="text"
                      value={emailContent.subject}
                      onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border font-mono text-sm ${
                        theme === 'dark'
                          ? 'bg-[#111111] border-gray-800 text-white focus:border-gray-700'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-gray-300'
                      } focus:outline-none transition-colors`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      Message:
                    </label>
                    <textarea
                      value={emailContent.body}
                      onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })}
                      rows={12}
                      className={`w-full px-4 py-3 rounded-lg border font-mono text-sm leading-relaxed resize-none ${
                        theme === 'dark'
                          ? 'bg-[#111111] border-gray-800 text-white focus:border-gray-700'
                          : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-gray-300'
                      } focus:outline-none transition-colors`}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className={`px-6 py-4 border-t flex items-center justify-between ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <p className={`text-xs font-mono ${
                    theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                  }`}>
                    Edit as needed
                  </p>
                  <button
                    onClick={handleCopy}
                    className={`px-6 py-2 rounded-lg font-mono text-sm transition-all ${
                      copied
                        ? 'bg-green-500 text-white'
                        : theme === 'dark'
                        ? 'bg-white text-black hover:bg-gray-100'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {copied ? '✓ Copied!' : 'Copy Template'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Contact;
