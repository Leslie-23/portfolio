import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Scene from "./Scene";

function Loader() {
	return (
		<div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<div className="w-12 h-12 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
				<p className="font-mono text-green-400/70 text-sm tracking-wider animate-pulse">
					INITIALIZING...
				</p>
			</div>
		</div>
	);
}

export default function ExperienceCanvas() {
	return (
		<div className="absolute inset-0 z-0">
			<Canvas
				camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
				dpr={[1, 1.5]}
				gl={{
					antialias: true,
					alpha: false,
					powerPreference: "high-performance",
				}}
				style={{ background: "#0a0a0a" }}
			>
				<Suspense fallback={null}>
					<Scene />
					<Preload all />
				</Suspense>
			</Canvas>
		</div>
	);
}
