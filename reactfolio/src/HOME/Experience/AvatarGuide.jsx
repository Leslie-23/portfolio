import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "./GameUI";
import SpeechBubble from "./SpeechBubble";

const GUIDE_MESSAGES = [
	{ zone: 0, message: "Hey! I'm Leslie. Welcome to my world. Scroll down — I'll show you around.", action: "wave" },
	{ zone: 0.15, message: "This is where I work. Four domains, one mission: ship great software.", action: "point" },
	{ zone: 0.35, message: "Check out some things I've built. Click any project for the deep dive.", action: "point" },
	{ zone: 0.6, message: "My toolkit — earned through production, not tutorials.", action: "idle" },
	{ zone: 0.85, message: "That's the tour! Let's build something together.", action: "wave" },
];

const TOTAL_ZONES = GUIDE_MESSAGES.length;

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
		// If tour is already complete, don't show zone messages
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

			// Mark zone as seen
			setSeenZones((prev) => {
				if (prev.includes(closest.zone)) return prev;
				return [...prev, closest.zone];
			});

			// Auto-hide after 6 seconds
			if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
			hideTimerRef.current = setTimeout(() => setShowBubble(false), 6000);
		}

		// Explorer achievement at bottom
		if (scrollProgress > 0.9) {
			unlock("explorer");
		}
	}, [scrollProgress, unlock, tourComplete]);

	const handleAvatarClick = useCallback(() => {
		unlock("greeted");

		// Always show a fun response on click, even after tour is done
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

	// Dormant state: smaller, subtle, no ping — just the avatar chilling
	const isDormant = tourComplete && !showBubble;

	return (
		<motion.div
			initial={{ x: -80, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
			className="fixed left-6 lg:left-14 z-40"
			style={{ top: avatarY }}
		>
			<div className="relative flex items-center">
				{/* Avatar container */}
				<motion.div
					className="relative cursor-pointer"
					onClick={handleAvatarClick}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					animate={{
						y: isDormant ? [0, -2, 0] : [0, -4, 0],
						opacity: isDormant ? 0.6 : 1,
					}}
					transition={{
						y: { repeat: Infinity, duration: isDormant ? 3 : 2, ease: "easeInOut" },
						opacity: { duration: 0.5 },
					}}
				>
					{/* Avatar visual */}
					<div className="w-12 h-12 relative">
						{/* Head */}
						<div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#8B6914] border-2 border-[#7A5C12] overflow-hidden">
							{/* Hair */}
							<div className="absolute top-0 left-0 right-0 h-4 bg-[#1a1a1a] rounded-t-full" />
							{/* Eyes */}
							<div className="absolute top-[14px] left-[10px] w-2 h-2 bg-white rounded-full">
								<div className="absolute top-0.5 left-0.5 w-1 h-1 bg-black rounded-full" />
							</div>
							<div className="absolute top-[14px] right-[10px] w-2 h-2 bg-white rounded-full">
								<div className="absolute top-0.5 left-0.5 w-1 h-1 bg-black rounded-full" />
							</div>
							{/* Smile */}
							<div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-3 h-1.5 border-b-2 border-[#7A5C12] rounded-b-full" />
						</div>
					</div>

					{/* Green glow ring — only when active */}
					{!isDormant && (
						<div className="absolute inset-0 rounded-full border border-green-400/20 animate-ping opacity-30" />
					)}

					{/* Action indicator — only when active */}
					{!isDormant && (
						<AnimatePresence>
							{currentMessage.action === "wave" && (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1, rotate: [0, 20, -20, 0] }}
									exit={{ scale: 0 }}
									transition={{ rotate: { repeat: 2, duration: 0.4 } }}
									className="absolute -top-1 -right-1 text-sm"
								>
									👋
								</motion.div>
							)}
							{currentMessage.action === "point" && (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									exit={{ scale: 0 }}
									className="absolute -top-1 -right-1 text-sm"
								>
									👉
								</motion.div>
							)}
						</AnimatePresence>
					)}

					{/* Dormant indicator — small "zzz" or subtle glow */}
					{isDormant && (
						<motion.div
							animate={{ opacity: [0.3, 0.6, 0.3] }}
							transition={{ repeat: Infinity, duration: 2 }}
							className="absolute -top-1 -right-1 font-mono text-[8px] text-green-400/50"
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

// Random responses when clicking the avatar
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
