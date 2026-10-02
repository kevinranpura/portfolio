import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import AboutMe from './components/AboutMe.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Preloader from './components/Preloader.jsx';
import { SmoothCursor } from 'smooth-cursor';

const CustomCursorSVG = () => (
  <svg
    width="26"
    height="28"
    viewBox="0 0 26 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // style={{
    //   filter:
    //     'drop-shadow(0 0 6px rgba(255, 255, 255, 1)) drop-shadow(0 0 14px rgba(0, 230, 118, 0.35))',
    // }}
  >
    <path
      d="M13 2L23 23L13 18L3 23L13 2Z"
      fill="#ffffff"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

// import { Analytics } from '@vercel/analytics/react';
// import AnalyticsTracker from './components/AnalyticsTracker.jsx';

export const ThemeContext = createContext();

function App() {
  // loaderExiting: true once the preloader begins its exit animation.
  // Hero content (TextPressure, GhostCursor) starts only at this point.
  const [loaderExiting, setLoaderExiting] = useState(false);

  const particlesContainerRef = useRef(null);

  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      'dark',
      theme === 'dark'
    );

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLoaderExitStart = useCallback(() => {
    setLoaderExiting(true);
  }, []);

  const particlesOptions = useMemo(() => {
    return {
      background: {
        color: theme === 'dark' ? '#050806' : '#f8faf8',
      },

      fpsLimit: 100,

      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },

        color: {
          value: theme === 'dark' ? '#e2fbe8' : '#0f172a',
        },

        shape: {
          type: 'circle',
        },

        opacity: {
          value: {
            min: 0.3,
            max: 0.6,
          },

          random: true,

          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false,
          },
        },

        size: {
          value: {
            min: 2.5,
            max: 3,
          },

          random: true,

          anim: {
            enable: true,
            speed: 2,
            size_min: 1,
            sync: false,
          },
        },

        links: {
          enable: true,
          distance: 200,
          color: theme === 'dark' ? '#00e676' : '#16a34a',
          opacity: 0.2,
          width: 1,
        },

        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
        },
      },

      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'grab'
          },

          onClick: {
            enable: false,
          },

          resize: {
            enable: true,
          },
        },

        modes: {
          grab: {
            distance: 150,

            line_linked: {
              opacity: 0.2,
              color: '#00e676',
            },
          },
        },
      },

      detectRetina: true,
    };
  }, [theme]);

  useEffect(() => {
    const initParticles = async () => {
      if (!particlesContainerRef.current) return;

      try {
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: 'tsparticles',
          element: particlesContainerRef.current,
          options: particlesOptions,
        });
      } catch (error) {
        console.error('tsParticles failed:', error);
      }
    };

    initParticles();

    return () => {
      const container = tsParticles
        .dom()
        .find((c) => c.id === 'tsparticles');

      container?.destroy();
    };
  }, [particlesOptions]);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const showSmoothCursor = !prefersReduced && !isTouch;

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      {/* ── Smooth Animated Cursor (SmoothCursor) ── */}
      {showSmoothCursor && (
        <SmoothCursor
          cursor={<CustomCursorSVG />}
          springConfig={{
            damping: 38,
            stiffness: 450,
            mass: 0.9,
            restDelta: 0.001,
          }}
        />
      )}

      {/* ── Preloader: renders on top of everything, unmounts itself ── */}
      <Preloader
        onExitStart={handleLoaderExitStart}
      />

      {/* ── Main content ── */}
      <>
        <div
          id="tsparticles"
          ref={particlesContainerRef}
          className="absolute inset-0 w-full h-full particles-canvas"
          style={{
            minHeight: '100vh',
            zIndex: -10,
          }}
        />

        {/* Analytics will be enabled later. */}
        {/* <Analytics /> */}
        {/* <AnalyticsTracker /> */}

        <ThemeContext.Provider
          value={{ theme, toggleTheme }}
        >
          <Navbar />
          {/* Hero receives loaderExiting so GhostCursor & TextPressure
              only mount once the preloader begins its exit               */}
          <Hero loaderExiting={loaderExiting} />
          <Experience />
          <Projects />
          <AboutMe />
          <Skills />
          <Contact />
        </ThemeContext.Provider>
      </>
    </div>
  );
}

export default App;