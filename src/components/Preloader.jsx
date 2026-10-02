import { useEffect, useRef, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'motion/react';

/**
 * Preloader
 *
 * Full-screen overlay with:
 *   – animated counter 0 → 100
 *   – name subtitle
 *   – thin progress bar in the portfolio's accent green
 *
 * Props:
 *   onExitStart  – called when the exit animation BEGINS (hero mounts at this point)
 *   onExitDone   – called when the overlay has fully disappeared (optional)
 *
 * Respects prefers-reduced-motion: immediately calls onExitStart + onExitDone.
 */

// Eased counter progression: fast start, slow near 100
function buildTimeline(totalMs) {
  // Returns an array of {time, value} breakpoints
  return [
    { t: 0,           v: 0   },
    { t: 0.10,        v: 22  },
    { t: 0.25,        v: 44  },
    { t: 0.45,        v: 61  },
    { t: 0.62,        v: 74  },
    { t: 0.78,        v: 85  },
    { t: 0.90,        v: 93  },
    { t: 0.97,        v: 98  },
    { t: 1.00,        v: 100 },
  ];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getValueAtTime(tNorm, timeline) {
  for (let i = 0; i < timeline.length - 1; i++) {
    const seg = timeline[i];
    const next = timeline[i + 1];
    if (tNorm >= seg.t && tNorm <= next.t) {
      const segT = (tNorm - seg.t) / (next.t - seg.t);
      return Math.round(lerp(seg.v, next.v, segT));
    }
  }
  return 100;
}

const TOTAL_DURATION_MS = 1950; // counter animation duration (slightly faster)
const HOLD_MS = 250;            // hold at 100 before exit

const Preloader = ({ onExitStart, onExitDone }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('counting'); // 'counting' | 'exiting' | 'done'
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  // Respect prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    if (prefersReduced) {
      document.body.style.overflow = '';
      onExitStart?.();
      onExitDone?.();
      return;
    }

    const timeline = buildTimeline(TOTAL_DURATION_MS);

    const tick = (now) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const tNorm = Math.min(elapsed / TOTAL_DURATION_MS, 1);
      const value = getValueAtTime(tNorm, timeline);
      setCount(value);

      if (tNorm < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Hold at 100, then trigger exit
        setTimeout(() => {
          setPhase('exiting');
          onExitStart?.();
          // Remove from DOM after exit animation completes
          setTimeout(() => {
            document.body.style.overflow = '';
            setPhase('done');
            onExitDone?.();
          }, 850); // matches exit animation duration
        }, HOLD_MS);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If prefers-reduced-motion, render nothing
  if (prefersReduced || phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <Motion.div
          key="preloader"
          initial={{ opacity: 1, y: 0 }}
          animate={
            phase === 'exiting'
              ? { opacity: 0, y: '-100%' }
              : { opacity: 1, y: 0 }
          }
          transition={
            phase === 'exiting'
              ? {
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }
              : { duration: 0 }
          }
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          {/* Counter */}
          <div
            style={{
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(96px, 14vw, 160px)',
              color: '#f5f5f5',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {count}
          </div>

          {/* Name label */}
          <div
            style={{
              marginTop: '48px',
              fontFamily: "'JetBrains Mono', 'Space Grotesk', monospace",
              fontWeight: 500,
              fontSize: '18px',
              color: '#8a8a8a',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              userSelect: 'none',
            }}
          >
            KEVIN RANPURA
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: '32px',
              width: 'min(375px, 70vw)',
              height: '2px',
              backgroundColor: '#222',
              borderRadius: '1px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${count}%`,
                backgroundColor: '#00e676',
                borderRadius: '1px',
                transition: 'width 0.05s linear',
              }}
            />
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
