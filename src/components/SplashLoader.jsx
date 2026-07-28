import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import SignatureSVG from '../assets/AP.svg?react';

// Register GSAP plugin
gsap.registerPlugin(CSSPlugin);

// Prevent double animation in StrictMode / remounts
let _animationHasRun = false;

const SplashLoader = ({ onAnimationComplete }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // StrictMode remount guard
    if (_animationHasRun) {
      onAnimationComplete?.();
      return;
    }

    _animationHasRun = true;

    const svgElement = svgRef.current;
    const container = containerRef.current;

    if (!svgElement || !container) return;

    // Prevent scrolling while splash is active
    document.body.style.overflow = 'hidden';

    const paths = svgElement.querySelectorAll(
      'path, line, polyline, circle, ellipse'
    );

    if (paths.length === 0) return;

    // Initialize SVG paths
    paths.forEach((path) => {
      const length = path.getTotalLength?.();

      if (!length || isNaN(length)) return;

      path.removeAttribute('fill');
      path.removeAttribute('stroke');
      path.removeAttribute('stroke-width');
      path.removeAttribute('stroke-dasharray');
      path.removeAttribute('stroke-dashoffset');

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        stroke: '#00e676',
        strokeWidth: 1,
      });
    });

    // Remove fills from groups
    svgElement.querySelectorAll('g').forEach((g) => {
      g.removeAttribute('fill');
      g.style.fill = 'none';
    });

    // Main animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',

          onComplete: () => {
            document.body.style.overflow = '';

            onAnimationComplete?.();
          },
        });
      },
    });

    // Signature drawing animation
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.inOut',

      stagger: {
        each: 0.15,
        ease: 'power1.inOut',
      },
    })

      // Glow effect
      .to(
        paths,
        {
          filter:
            'drop-shadow(0 0 8px rgba(0, 230, 118, 0.6))',
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.5'
      )

      // Small hold before fade
      .to({}, { duration: 0.8 });

    return () => {
      document.body.style.overflow = '';

      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#050806',
        zIndex: 100000,
        opacity: 1,
      }}
    >
      {/* Signature SVG */}
      <SignatureSVG
        ref={svgRef}
        style={{
          width: '320px',
          height: 'auto',
          stroke: '#00e676',
          fill: 'none',
          strokeWidth: 1,
          position: 'relative',
          zIndex: 1,
        }}
      />

    </div>
  );
};

export default SplashLoader;