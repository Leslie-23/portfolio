import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "./GameUI";
import SpeechBubble from "./SpeechBubble";
import Avatar from "./Avatar";

const GUIDE_MESSAGES = [
	{ zone: 0, message: "Hey! I'm Leslie. Welcome to my world. Scroll down — I'll show you around.", action: "wave" },
	{ zone: 0.15, message: "This is where I work. Four domains, one mission: ship great software.", action: "point" },
	{ zone: 0.35, message: "Check out some things I've built. Click any project for the deep dive.", action: "point" },
	{ zone: 0.6, message: "My toolkit — earned through production, not tutorials.", action: "idle" },
	{ zone: 0.85, message: "That's the tour! Let's build something together.", action: "wave" },
];

const TOTAL_ZONES = GUIDE_MESSAGES.length;

// Mini 3D avatar canvas for the guide
function MiniAvatarCanvas({ action = "idle" }) {
	return (
		<Canvas
			camera={{ position: [0, 1.2, 3.2], fov: 35 }}
			dpr={[1, 2]}
			gl={{ antialias: true, alpha: true }}
			style={{ background: "transparent" }}
		>
			<ambientLight intensity={0.5} />
			<directionalLight position={[2, 3, 3]} intensity={0.8} color="#ffffff" />
			<pointLight position={[-1, 2, 2]} intensity={0.4} color="#22c55e" />
			<Suspense fallback={null}>
				<Avatar position={[0, 0, 0]} action={action} scale={0.5} />
			</Suspense>
		</Canvas>
	);
}

export default function AvatarGuide({ scrollProgress = 0 }) {
	// Persist tour completion + seen zones in localStorage
	const [tourComplete, setTourComplete] = useState(() => {
		return localStorage.getItem("portfolio_tour_complete") === "true";
	});
	const [seenZones, setSeenZones] = useState(() => {
		const saved = localStorage.getItem("portfolio_seen_zones");
		return saved ? JSON.parse(saved) : [];
	});

	const [currentMessage, setCurrentMessage] = useState(GUIDE_MESSAGES[0]);
	const [showBubble, setShowBubble] = useState(!tourComplete);
	const { unlock } = useGame();
	const lastZoneRef = useRef(0);
	const hideTimerRef = useRef(null);

	// Persist seen zones
	useEffect(() => {
		localStorage.setItem("portfolio_seen_zones", JSON.stringify(seenZones));
	}, [seenZones]);

	// Check if tour just completed
	useEffect(() => {
		if (!tourComplete && seenZones.length >= TOTAL_ZONES) {
			setTourComplete(true);
			localStorage.setItem("portfolio_tour_complete", "true");
		}
	}, [seenZones, tourComplete]);

	// Track which zone we're in based on scroll
	useEffect(() => {
		if (tourComplete) return;

		let closest = GUIDE_MESSAGES[0];
		for (const msg of GUIDE_MESSAGES) {
			if (scrollProgress >= msg.zone - 0.05) {
				closest = msg;
			}
		}

		if (closest.zone !== lastZoneRef.current) {
			lastZoneRef.current = closest.zone;
			setCurrentMessage(closest);
			setShowBubble(true);

			setSeenZones((prev) => {
				if (prev.includes(closest.zone)) return prev;
				return [...prev, closest.zone];
			});

			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
			hideTimerRef.current = setTimeout(() => setShowBubble(false), 6000);
		}

		if (scrollProgress > 0.9) {
			unlock("explorer");
		}
	}, [scrollProgress, unlock, tourComplete]);

	const handleAvatarClick = useCallback(() => {
		unlock("greeted");

		setCurrentMessage({
			zone: -1,
			message: getRandomResponse(),
			action: "wave",
		});
		setShowBubble(true);

		if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
		hideTimerRef.current = setTimeout(() => setShowBubble(false), 4000);
	}, [unlock]);

	// Compute avatar vertical position based on scroll
	const avatarY = Math.max(120, Math.min(window.innerHeight - 200, 120 + scrollProgress * (window.innerHeight - 320)));

	const isDormant = tourComplete && !showBubble;

	return (
		<motion.div
			initial={{ x: -80, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
			className="fixed left-2 lg:left-6 z-40"
			style={{ top: avatarY }}
		>
			<div className="relative flex items-center">
				{/* 3D Avatar container */}
				<motion.div
					className="relative cursor-pointer"
					onClick={handleAvatarClick}
					whileHover={{ scale: 1.08 }}
					whileTap={{ scale: 0.95 }}
					animate={{
						y: isDormant ? [0, -2, 0] : [0, -5, 0],
						opacity: isDormant ? 0.5 : 1,
					}}
					transition={{
						y: { repeat: Infinity, duration: isDormant ? 3 : 2, ease: "easeInOut" },
						opacity: { duration: 0.5 },
					}}
				>
					{/* Mini 3D Canvas — renders the actual avatar */}
					<div className="w-16 h-20 lg:w-20 lg:h-24 rounded-2xl overflow-hidden"
						style={{ background: "radial-gradient(ellipse at center, rgba(22,163,74,0.12) 0%, transparent 70%)" }}
					>
						<MiniAvatarCanvas action={currentMessage.action} />
					</div>

					{/* Green glow ring — only when active */}
					{!isDormant && (
						<div className="absolute -inset-1 rounded-2xl border border-green-400/20 animate-ping opacity-20" />
					)}

					{/* Dormant indicator */}
					{isDormant && (
						<motion.div
							animate={{ opacity: [0.3, 0.6, 0.3] }}
							transition={{ repeat: Infinity, duration: 2 }}
							className="absolute -top-1 -right-1 font-mono text-[9px] text-green-400/50"
						>
							z
						</motion.div>
					)}
				</motion.div>

				{/* Speech bubble */}
				<SpeechBubble message={currentMessage.message} visible={showBubble} position="right" />
			</div>
		</motion.div>
	);
}

function getRandomResponse() {
	const responses = [
		"Fun fact: I love the color green. You can probably tell.",
		"Psst... there are achievements hidden around the site!",
		"I build from database to deployment. Yes, the whole stack.",
		"Based in Accra, shipping worldwide. 🌍",
		"This avatar? Built with Three.js primitives. No imports!",
		"Coffee count today: undefined. Still incrementing.",
		"git commit -m 'talked to a visitor' 🎉",
		"Pro tip: check out the projects page for the deep dives.",
	];
	return responses[Math.floor(Math.random() * responses.length)];
}
