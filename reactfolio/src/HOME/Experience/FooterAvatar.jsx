import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Avatar from "./Avatar";

// Small canvas in the footer — a sitting-and-clapping figure on loop.
// Self-contained: its own canvas + lighting, transparent background.
export default function FooterAvatar() {
	return (
		<div className="w-28 h-32 md:w-36 md:h-40">
			<Canvas
				camera={{ position: [0, 0.9, 3], fov: 35 }}
				dpr={[1, 2]}
				gl={{ antialias: true, alpha: true }}
				style={{ background: "transparent" }}
			>
				<ambientLight intensity={0.5} />
				<directionalLight position={[2, 4, 3]} intensity={1.0} color="#ffffff" />
				<directionalLight position={[-2, 2, 2]} intensity={0.4} color="#e5f3ff" />
				<Suspense fallback={null}>
					<Avatar
						position={[0, -0.6, 0]}
						action="clap"
						scale={0.012}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
