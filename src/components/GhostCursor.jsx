import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import './GhostCursor.css';

/**
 * GhostCursor (ReactBits)
 * Organic glowing smoke trail following mouse cursor with FBM turbulence.
 */
const GhostCursor = ({
  className,
  style,
  trailLength = 40,
  inertia = 0.55,
  brightness = 0.85,
  color = '#00e676',
  mixBlendMode = 'screen',
  fadeDelayMs = 400,
  fadeDurationMs = 1200,
  zIndex = 1,
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);

  const trailBufRef = useRef([]);
  const headRef = useRef(0);

  const rafRef = useRef(null);
  const currentMouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const velocityRef = useRef(new THREE.Vector2(0, 0));
  const fadeOpacityRef = useRef(0.0);
  const lastMoveTimeRef = useRef(
    typeof performance !== 'undefined' ? performance.now() : Date.now()
  );
  const pointerActiveRef = useRef(false);
  const runningRef = useRef(false);
  const hasValidSizeRef = useRef(false);

  const isTouch = useMemo(
    () =>
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0),
    []
  );

  const baseVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float iTime;
    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform vec2  iPrevMouse[MAX_TRAIL_LENGTH];
    uniform float iOpacity;
    uniform float iScale;
    uniform vec3  iBaseColor;
    uniform float iBrightness;
    varying vec2  vUv;

    float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f *= f * (3. - 2. * f);
      return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),
                 mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
    }
    float fbm(vec2 p){
      float v = 0.0;
      float a = 0.5;
      mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for(int i=0;i<5;i++){
        v += a * noise(p);
        p = m * p * 2.0;
        a *= 0.5;
      }
      return v;
    }

    vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {
      if (activity <= 0.001) return vec4(0.0);

      vec2 q = vec2(fbm(p * iScale + iTime * 0.12), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.12));
      vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.16), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.16));

      float smoke = fbm(p * iScale + r * 0.85);
      
      // Soft organic radius falloff matching reference smoke - slightly larger
      float radius = 0.54 * (1.0 / max(0.5, iScale));
      float dist = length(p - mousePos);
      float distFactor = smoothstep(radius * activity, 0.0, dist);
      
      // Soft cloudy exponential alpha
      float alpha = pow(smoke, 2.2) * distFactor;

      vec3 c1 = mix(iBaseColor, vec3(0.95), 0.20);
      vec3 c2 = mix(iBaseColor, vec3(0.35, 1.0, 0.65), 0.30);
      vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);

      return vec4(color * alpha * intensity, alpha * intensity);
    }

    void main() {
      if (iOpacity <= 0.001) {
        gl_FragColor = vec4(0.0);
        return;
      }

      vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
      vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

      vec3 colorAcc = vec3(0.0);
      float alphaAcc = 0.0;

      vec4 b = blob(uv, mouse, 1.0, iOpacity);
      colorAcc += b.rgb;
      alphaAcc += b.a;

      for (int i = 0; i < MAX_TRAIL_LENGTH; i++) {
        vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
        float t = 1.0 - float(i) / float(MAX_TRAIL_LENGTH);
        t = pow(t, 2.0);
        if (t > 0.01) {
          vec4 bt = blob(uv, pm, t * 0.85, iOpacity);
          colorAcc += bt.rgb;
          alphaAcc += bt.a;
        }
      }

      // Edge falloff near screen borders
      vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
      float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
      float edgeMask = smoothstep(0.0, 0.08, edgeDist);

      // Subtle dynamic film grain applied directly to smoke body
      float grain = hash(gl_FragCoord.xy + fract(iTime * 23.456));
      float grainColor = 1.0 + (grain - 0.5) * 0.15;
      float grainAlpha = 1.0 + (grain - 0.5) * 0.08;

      float outAlpha = clamp(alphaAcc * iOpacity * edgeMask * 0.60 * grainAlpha, 0.0, 0.80);
      vec3 outColor = colorAcc * iBrightness * grainColor;

      gl_FragColor = vec4(outColor, outAlpha);
    }
  `;

  function calculateScale(el) {
    const r = el.getBoundingClientRect();
    const base = 650;
    const current = Math.min(Math.max(1, r.width), Math.max(1, r.height));
    return Math.max(0.6, Math.min(1.8, current / base));
  }

  useEffect(() => {
    const host = containerRef.current;
    const parent = host?.parentElement;
    if (!host || !parent) return;

    let active = true;

    const prevParentPos = parent.style.position;
    if (!prevParentPos || prevParentPos === 'static') {
      parent.style.position = 'relative';
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    renderer.domElement.style.pointerEvents = 'none';
    if (mixBlendMode) {
      renderer.domElement.style.mixBlendMode = String(mixBlendMode);
    }

    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geom = new THREE.PlaneGeometry(2, 2);

    const maxTrail = Math.max(1, Math.floor(trailLength));
    trailBufRef.current = Array.from(
      { length: maxTrail },
      () => new THREE.Vector2(0.5, 0.5)
    );
    headRef.current = 0;

    const baseColor = new THREE.Color(color);

    const material = new THREE.ShaderMaterial({
      defines: { MAX_TRAIL_LENGTH: maxTrail },
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: trailBufRef.current.map((v) => v.clone()) },
        iOpacity: { value: 0.0 },
        iScale: { value: 1.0 },
        iBaseColor: {
          value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b),
        },
        iBrightness: { value: brightness },
      },
      vertexShader: baseVertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);

    const resize = () => {
      if (!active) return;

      const rect = host.getBoundingClientRect();
      const cssW = Math.floor(rect.width);
      const cssH = Math.floor(rect.height);

      if (cssW <= 0 || cssH <= 0) {
        hasValidSizeRef.current = false;
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(cssW, cssH, false);

      const wpx = Math.max(1, Math.floor(cssW * dpr));
      const hpx = Math.max(1, Math.floor(cssH * dpr));
      material.uniforms.iResolution.value.set(wpx, hpx, 1);
      material.uniforms.iScale.value = calculateScale(host);

      hasValidSizeRef.current = true;
    };

    resize();
    const ro = new ResizeObserver(() => {
      if (!active) return;
      resize();
    });
    ro.observe(parent);
    ro.observe(host);

    const start =
      typeof performance !== 'undefined' ? performance.now() : Date.now();

    const animate = () => {
      if (!active) return;

      if (!hasValidSizeRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = performance.now();
      const t = (now - start) / 1000;
      const mat = materialRef.current;

      if (pointerActiveRef.current) {
        velocityRef.current.set(
          currentMouseRef.current.x - mat.uniforms.iMouse.value.x,
          currentMouseRef.current.y - mat.uniforms.iMouse.value.y
        );
        mat.uniforms.iMouse.value.copy(currentMouseRef.current);
        fadeOpacityRef.current = 1.0;
      } else {
        velocityRef.current.multiplyScalar(inertia);
        if (velocityRef.current.lengthSq() > 1e-6) {
          mat.uniforms.iMouse.value.add(velocityRef.current);
        }
        const dt = now - lastMoveTimeRef.current;
        if (dt > fadeDelayMs) {
          const k = Math.min(1, (dt - fadeDelayMs) / fadeDurationMs);
          fadeOpacityRef.current = Math.max(0, 1 - k);
        }
      }

      const N = trailBufRef.current.length;
      headRef.current = (headRef.current + 1) % N;
      trailBufRef.current[headRef.current].copy(mat.uniforms.iMouse.value);
      const arr = mat.uniforms.iPrevMouse.value;
      for (let i = 0; i < N; i++) {
        const srcIdx = (headRef.current - i + N) % N;
        arr[i].copy(trailBufRef.current[srcIdx]);
      }

      mat.uniforms.iOpacity.value = fadeOpacityRef.current;
      mat.uniforms.iTime.value = t;

      renderer.render(scene, camera);

      if (!pointerActiveRef.current && fadeOpacityRef.current <= 0.001) {
        runningRef.current = false;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const ensureLoop = () => {
      if (!runningRef.current) {
        runningRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = THREE.MathUtils.clamp(
        (e.clientX - rect.left) / Math.max(1, rect.width),
        0,
        1
      );
      const y = THREE.MathUtils.clamp(
        1 - (e.clientY - rect.top) / Math.max(1, rect.height),
        0,
        1
      );
      currentMouseRef.current.set(x, y);
      pointerActiveRef.current = true;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };

    const onPointerEnter = () => {
      pointerActiveRef.current = true;
      ensureLoop();
    };

    const onPointerLeave = () => {
      pointerActiveRef.current = false;
      lastMoveTimeRef.current = performance.now();
      ensureLoop();
    };

    parent.addEventListener('pointermove', onPointerMove, { passive: true });
    parent.addEventListener('pointerenter', onPointerEnter, { passive: true });
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      active = false;
      hasValidSizeRef.current = false;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      rafRef.current = null;

      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerenter', onPointerEnter);
      parent.removeEventListener('pointerleave', onPointerLeave);
      ro.disconnect();

      scene.clear();
      geom.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();

      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      if (!prevParentPos || prevParentPos === 'static') {
        parent.style.position = prevParentPos;
      }
    };
  }, [
    trailLength,
    inertia,
    brightness,
    fadeDelayMs,
    fadeDurationMs,
    color,
    mixBlendMode,
  ]);

  useEffect(() => {
    if (materialRef.current) {
      const c = new THREE.Color(color);
      materialRef.current.uniforms.iBaseColor.value.set(c.r, c.g, c.b);
    }
  }, [color]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iBrightness.value = brightness;
    }
  }, [brightness]);

  const mergedStyle = useMemo(() => ({ zIndex, ...style }), [zIndex, style]);

  return (
    <div
      ref={containerRef}
      className={`ghost-cursor ${className ?? ''}`}
      style={mergedStyle}
    />
  );
};

export default GhostCursor;
