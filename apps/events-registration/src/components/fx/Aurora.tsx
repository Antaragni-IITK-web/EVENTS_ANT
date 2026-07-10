"use client";

import { useEffect, useRef } from "react";

/* Full-screen WebGL aurora / gradient-mesh background.
   Domain-warped fbm noise blending three festival colors over near-black. */

const VERT = `
attribute vec2 aPos;
void main() {
	gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform float uIntensity;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(
		mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
		mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
		u.y
	);
}

float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	for (int i = 0; i < 5; i++) {
		v += a * noise(p);
		p = p * 2.03 + vec2(11.7, 5.3);
		a *= 0.5;
	}
	return v;
}

void main() {
	vec2 uv = gl_FragCoord.xy / uRes.xy;
	vec2 p = uv * vec2(uRes.x / uRes.y, 1.0) * 1.4;
	float t = uTime * 0.045;

	p += (uMouse - 0.5) * 0.25;

	vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t * 0.7));
	vec2 r = vec2(
		fbm(p + 3.5 * q + vec2(1.7, 9.2) + 0.18 * t),
		fbm(p + 3.5 * q + vec2(8.3, 2.8) - 0.13 * t)
	);
	float f = fbm(p + 3.2 * r);

	vec3 base = vec3(0.039, 0.024, 0.071); // #0a0612
	vec3 col = base;
	col = mix(col, uC1, clamp(f * f * 1.9, 0.0, 1.0) * 0.55 * uIntensity);
	col = mix(col, uC2, clamp(length(q) * 0.8, 0.0, 1.0) * 0.35 * uIntensity);
	col = mix(col, uC3, clamp(r.x * r.y * 2.0, 0.0, 1.0) * 0.30 * uIntensity);

	// vignette
	float d = distance(uv, vec2(0.5, 0.45));
	col = mix(col, base, smoothstep(0.35, 0.95, d));

	gl_FragColor = vec4(col, 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace("#", "");
	return [
		parseInt(h.slice(0, 2), 16) / 255,
		parseInt(h.slice(2, 4), 16) / 255,
		parseInt(h.slice(4, 6), 16) / 255,
	];
}

export function Aurora({
	colors = ["#4c1d95", "#be185d", "#365314"],
	intensity = 1,
	className = "",
}: {
	colors?: [string, string, string] | string[];
	intensity?: number;
	className?: string;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const gl = canvas.getContext("webgl", {
			antialias: false,
			depth: false,
			stencil: false,
			powerPreference: "low-power",
		});
		if (!gl) return;

		const compile = (type: number, src: string) => {
			const s = gl.createShader(type)!;
			gl.shaderSource(s, src);
			gl.compileShader(s);
			return s;
		};
		const prog = gl.createProgram()!;
		gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
		gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
		gl.linkProgram(prog);
		gl.useProgram(prog);

		const buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buf);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 3, -1, -1, 3]),
			gl.STATIC_DRAW
		);
		const loc = gl.getAttribLocation(prog, "aPos");
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

		const uRes = gl.getUniformLocation(prog, "uRes");
		const uTime = gl.getUniformLocation(prog, "uTime");
		const uMouse = gl.getUniformLocation(prog, "uMouse");
		const uIntensity = gl.getUniformLocation(prog, "uIntensity");
		gl.uniform3fv(gl.getUniformLocation(prog, "uC1"), hexToRgb(colors[0]!));
		gl.uniform3fv(gl.getUniformLocation(prog, "uC2"), hexToRgb(colors[1]!));
		gl.uniform3fv(gl.getUniformLocation(prog, "uC3"), hexToRgb(colors[2]!));
		gl.uniform1f(uIntensity, intensity);

		const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
		const resize = () => {
			canvas.width = canvas.clientWidth * dpr * 0.6;
			canvas.height = canvas.clientHeight * dpr * 0.6;
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.uniform2f(uRes, canvas.width, canvas.height);
		};
		resize();
		window.addEventListener("resize", resize);

		let mx = 0.5;
		let my = 0.5;
		let tmx = 0.5;
		let tmy = 0.5;
		const onMove = (e: MouseEvent) => {
			tmx = e.clientX / window.innerWidth;
			tmy = 1 - e.clientY / window.innerHeight;
		};
		window.addEventListener("mousemove", onMove);

		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		let raf = 0;
		let running = true;
		const start = performance.now();
		const frame = () => {
			if (!running) return;
			mx += (tmx - mx) * 0.03;
			my += (tmy - my) * 0.03;
			gl.uniform1f(uTime, (performance.now() - start) / 1000);
			gl.uniform2f(uMouse, mx, my);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
			if (!reduced) raf = requestAnimationFrame(frame);
		};
		frame();

		const onVis = () => {
			running = document.visibilityState === "visible";
			if (running && !reduced) frame();
		};
		document.addEventListener("visibilitychange", onVis);

		return () => {
			running = false;
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", onMove);
			document.removeEventListener("visibilitychange", onVis);
			gl.getExtension("WEBGL_lose_context")?.loseContext();
		};
	}, [colors, intensity]);

	return (
		<canvas
			ref={canvasRef}
			className={`h-full w-full ${className}`}
			aria-hidden
		/>
	);
}
