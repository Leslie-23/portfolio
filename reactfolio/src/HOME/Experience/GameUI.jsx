import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Eye, MousePointer, Zap, Map, Terminal } from "lucide-react";

// ---- Game State Context ----
const GameContext = createContext(null);

const ACHIEVEMENTS = [
	{ id: "explorer", label: "Explorer", desc: "Scrolled through the entire page", icon: Map, xp: 50 },
	{ id: "curious", label: "Curious Mind", desc: "Viewed a project", icon: Eye, xp: 30 },
	{ id: "connected", label: "Connected", desc: "Clicked a social link", icon: Zap, xp: 20 },
	{ id: "greeted", label: "Hello!", desc: "Clicked the avatar", icon: Star, xp: 15 },
	{ id: "navigator", label: "Navigator", desc: "Visited 3 pages", icon: MousePointer, xp: 40 },
	{ id: "terminal", label: "Shell Access", desc: "Opened the interactive terminal", icon: Terminal, xp: 25 },
];

export function GameProvider({ children }) {
	const [xp, setXp] = useState(() => {
		const saved = localStorage.getItem("portfolio_xp");
		return saved ? parseInt(saved, 10) : 0;
	});
	const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
		const saved = localStorage.getItem("portfolio_achievements");
		return saved ? JSON.parse(saved) : [];
	});
	const [toasts, setToasts] = useState([]);
	const [pagesVisited, setPagesVisited] = useState(() => {
		const saved = localStorage.getItem("portfolio_pages");
		return saved ? JSON.parse(saved) : [];
	});

	// Persist
	useEffect(() => {
		localStorage.setItem("portfolio_xp", xp.toString());
	}, [xp]);

	useEffect(() => {
		localStorage.setItem("portfolio_achievements", JSON.stringify(unlockedAchievements));
	}, [unlockedAchievements]);

	useEffect(() => {
		localStorage.setItem("portfolio_pages", JSON.stringify(pagesVisited));
	}, [pagesVisited]);

	const addXp = useCallback((amount) => {
		setXp((prev) => prev + amount);
	}, []);

	const unlock = useCallback((achievementId) => {
		setUnlockedAchievements((prev) => {
			if (prev.includes(achievementId)) return prev;
			const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
			if (!achievement) return prev;

			// Show toast
			setToasts((t) => [...t, { id: Date.now(), achievement }]);

			// Add XP
			setXp((x) => x + achievement.xp);

			return [...prev, achievementId];
		});
	}, []);

	const trackPage = useCallback((path) => {
		setPagesVisited((prev) => {
			if (prev.includes(path)) return prev;
			const newPages = [...prev, path];
			// Check navigator achievement
			if (newPages.length >= 3) {
				setTimeout(() => unlock("navigator"), 500);
			}
			return newPages;
		});
	}, [unlock]);

	const dismissToast = useCallback((id) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	return (
		<GameContext.Provider
			value={{ xp, addXp, unlockedAchievements, unlock, toasts, dismissToast, trackPage, pagesVisited }}
		>
			{children}
		</GameContext.Provider>
	);
}

export function useGame() {
	const ctx = useContext(GameContext);
	if (!ctx) return { xp: 0, addXp: () => {}, unlock: () => {}, trackPage: () => {}, pagesVisited: [] };
	return ctx;
}

// ---- XP Bar ----
export function XPBar() {
	const { xp, unlockedAchievements } = useGame();
	const level = Math.floor(xp / 100) + 1;
	const progress = (xp % 100);

	return (
		<motion.div
			initial={{ x: 60, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ delay: 3, duration: 0.6 }}
			className="fixed top-20 right-4 z-50 flex flex-col items-end gap-2"
		>
			{/* XP display */}
			<div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
				<Star size={12} className="text-green-400" />
				<span className="font-mono text-[11px] text-white/70">
					LVL {level}
				</span>
				<div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
					<motion.div
						className="h-full bg-green-400 rounded-full"
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.5 }}
					/>
				</div>
				<span className="font-mono text-[10px] text-white/40">{xp}xp</span>
			</div>

			{/* Achievements count */}
			<div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-full">
				<Trophy size={10} className="text-yellow-400/70" />
				<span className="font-mono text-[10px] text-white/40">
					{unlockedAchievements.length}/{ACHIEVEMENTS.length}
				</span>
			</div>
		</motion.div>
	);
}

// ---- Achievement Toast ----
export function AchievementToasts() {
	const { toasts, dismissToast } = useGame();

	useEffect(() => {
		toasts.forEach((toast) => {
			const timer = setTimeout(() => dismissToast(toast.id), 4000);
			return () => clearTimeout(timer);
		});
	}, [toasts, dismissToast]);

	return (
		<div className="fixed bottom-6 right-4 z-50 flex flex-col gap-2">
			<AnimatePresence>
				{toasts.map((toast) => (
					<motion.div
						key={toast.id}
						initial={{ x: 100, opacity: 0, scale: 0.9 }}
						animate={{ x: 0, opacity: 1, scale: 1 }}
						exit={{ x: 100, opacity: 0, scale: 0.9 }}
						transition={{ type: "spring", stiffness: 200, damping: 20 }}
						className="flex items-center gap-3 px-4 py-3 bg-black/80 backdrop-blur-md border border-green-400/30 rounded-lg min-w-[240px]"
					>
						<div className="w-8 h-8 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
							<Trophy size={14} className="text-green-400" />
						</div>
						<div className="flex-1">
							<div className="font-mono text-xs text-green-400 font-semibold">
								{toast.achievement.label}
							</div>
							<div className="font-mono text-[10px] text-white/40">
								{toast.achievement.desc}
							</div>
						</div>
						<div className="font-mono text-[10px] text-green-400/70">
							+{toast.achievement.xp}xp
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
}

// ---- Scroll Progress Map ----
export function ScrollProgressMap({ progress = 0 }) {
	const zones = [
		{ label: "SPAWN", position: 0 },
		{ label: "SKILLS", position: 0.25 },
		{ label: "WORK", position: 0.5 },
		{ label: "TOOLS", position: 0.75 },
		{ label: "BEACON", position: 1 },
	];

	return (
		<motion.div
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ delay: 3.5, duration: 0.6 }}
			className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:block"
		>
			<div className="relative flex items-center gap-0 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5">
				{/* Horizontal track */}
				<div className="relative w-64 lg:w-80 h-[3px] bg-white/10 rounded-full">
					<motion.div
						className="absolute top-0 left-0 h-full bg-green-400/60 rounded-full"
						animate={{ width: `${progress * 100}%` }}
						transition={{ duration: 0.3 }}
					/>

					{/* Zone dots */}
					{zones.map((zone) => (
						<div
							key={zone.label}
							className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
							style={{ left: `${zone.position * 100}%` }}
						>
							<div
								className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
									progress >= zone.position
										? "bg-green-400 border-green-400 shadow-sm shadow-green-400/50"
										: "bg-black/80 border-white/20"
								}`}
							/>
							<span
								className={`absolute top-4 font-mono text-[9px] tracking-widest whitespace-nowrap transition-colors duration-300 ${
									progress >= zone.position ? "text-green-400/80" : "text-white/25"
								}`}
							>
								{zone.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
