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
// import SplashLoader from './components/SplashLoader';

// import { Analytics } from '@vercel/analytics/react';
// import AnalyticsTracker from './components/AnalyticsTracker.jsx';

export const ThemeContext = createContext();

function App() {
  // const [splashDone, setSplashDone] = useState(false);

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

  // Stable callback reference
  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  const particlesOptions = useMemo(() => {
    return {
      background: {
        color: theme === 'dark' ? '#050806' : '#f8faf8',
      },

      fpsLimit: 60,

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
          type: 'square',
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
          distance: 180,
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
        // detectsOn: 'window',
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
    // Gate particles until splash completes
    // if (!splashDone) return;

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

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      {/* Splash mounts FIRST and gates everything */}
      {/* {!splashDone && (
        <SplashLoader
          onAnimationComplete={handleSplashComplete}
        />
      )} */}

      {/* Heavy subtree mounts ONLY after splash */}
      {(
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
            <Hero />
            <Experience />
            <Projects />
            <AboutMe />
            <Skills />
            <Contact />
          </ThemeContext.Provider>
        </>
      )}
    </div>
  );
}

export default App;