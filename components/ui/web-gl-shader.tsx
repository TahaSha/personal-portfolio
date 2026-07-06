"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Track } from "@/lib/data/resume";
import { cn } from "@/lib/utils";

const vertexShader = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform float xScale;
  uniform float yScale;
  uniform float distortion;
  uniform float uMode; // -1 engineering .. 0 neutral .. +1 teaching

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float d = length(p) * distortion;

    float rx = p.x * (1.0 + d);
    float gx = p.x;
    float bx = p.x * (1.0 - d);

    float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
    float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
    float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

    vec3 spectrum = vec3(r, g, b);
    // Keep in sync with --eng / --teach in app/globals.css (oklch -> sRGB approx).
    // RawShaderMaterial writes gl_FragColor raw, so these are sRGB values.
    const vec3 ENG = vec3(0.08, 0.31, 0.76);
    const vec3 TEACH = vec3(0.70, 0.29, 0.11);
    vec3 tint = uMode < 0.0 ? ENG : TEACH;
    // Reuse the three offset wave intensities as brightness fringes of one hue
    // so the chromatic-aberration structure survives the tint.
    vec3 tinted = tint * (r * 1.25 + g + b * 0.75);
    gl_FragColor = vec4(mix(spectrum, tinted, abs(uMode)), 1.0);
  }
`;

export function WebGLShader({
  className,
  mode = null,
}: {
  className?: string;
  mode?: Track | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetModeRef = useRef(0);
  const applyModeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    targetModeRef.current =
      mode === "engineering" ? -1 : mode === "teaching" ? 1 : 0;
    applyModeRef.current?.();
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({ canvas });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(new THREE.Color(0x000000));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

    const uniforms = {
      resolution: { value: [1, 1] },
      time: { value: 0.0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 },
      uMode: { value: targetModeRef.current },
    };

    const position = [
      -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0,
      1.0, 0.0, 1.0, 1.0, 0.0,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(position), 3)
    );

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderFrame = () => renderer.render(scene, camera);

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      uniforms.resolution.value = [width * pixelRatio, height * pixelRatio];
      if (reduceMotion) renderFrame();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let animationId: number | null = null;
    if (reduceMotion) {
      // Static frame: identity shifts apply as a discrete color change.
      applyModeRef.current = () => {
        uniforms.uMode.value = targetModeRef.current;
        renderFrame();
      };
      renderFrame();
    } else {
      const animate = () => {
        uniforms.uMode.value +=
          (targetModeRef.current - uniforms.uMode.value) * 0.05;
        uniforms.time.value += 0.01;
        renderFrame();
        animationId = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      applyModeRef.current = null;
      if (animationId) cancelAnimationFrame(animationId);
      observer.disconnect();
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 block h-full w-full", className)}
    />
  );
}
