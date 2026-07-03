"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
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

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float d = length(p) * distortion;

    float rx = p.x * (1.0 + d);
    float gx = p.x;
    float bx = p.x * (1.0 - d);

    float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
    float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
    float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export function WebGLShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      renderFrame();
    } else {
      const animate = () => {
        uniforms.time.value += 0.01;
        renderFrame();
        animationId = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
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
