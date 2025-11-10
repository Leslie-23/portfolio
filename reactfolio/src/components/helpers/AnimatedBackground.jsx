// src/components/AnimatedBackground.jsx
import React from "react";

const AnimatedBackground = () => {
	return (
		<>
			{/* Animated Gradient Orbs */}
			<div className="fixed inset-0 -z-10 overflow-hidden">
				<div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
				<div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-green-400/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />
			</div>

			{/* Grid Pattern Overlay */}
			<div className="fixed inset-0 -z-5">
				<div
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage: `linear-gradient(rgba(150, 54, 54, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
						backgroundSize: "50px 50px",
					}}
				/>
			</div>
		</>
	);
};

export default AnimatedBackground;
