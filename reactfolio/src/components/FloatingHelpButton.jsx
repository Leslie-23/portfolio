import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	MessageCircle,
	Github,
	Linkedin,
	Mail,
	FolderGit2,
} from "lucide-react";
import "../components/globals.css";
// small "ping" sound encoded as base64 so no external file needed
const PING_SOUND =
	"data:audio/mp3;base64,//uQxAAAD8AAAAnEAAAN0AAABEQAAAZQAAAGaAAACVgAAAZ4AAA..."; // (short ping; replace with your own if needed)

const FloatingHelpButton = () => {
	const [open, setOpen] = useState(false);
	const [popup, setPopup] = useState(null); // "initial" | "reminder" | null
	const [cta, setCta] = useState("");

	const toggleMenu = () => setOpen(!open);

	const menuItems = [
		{
			label: "Contact Me",
			icon: <Mail size={20} />,
			link: "mailto:leslieajayi27@gmail.com",
		},
		{
			label: "Projects",
			icon: <FolderGit2 size={20} />,
			link: "/projects",
		},
		{
			label: "GitHub",
			icon: <Github size={20} />,
			link: "https://github.com/leslie-23",
		},
		{
			label: "LinkedIn",
			icon: <Linkedin size={20} />,
			link: "https://www.linkedin.com/in/leslie-paul-ajayi-409b16356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
		},
	];

	// 🎯 Rotating CTA messages
	const ctaMessages = {
		initial: [
			"👋 Need help with your next project?",
			"💡 Let’s bring your ideas to life!",
			"🚀 Ready to elevate your digital presence?",
		],
		reminder: [
			"⏱ You’ve been exploring for a while… maybe it’s time to hire the dev 😉",
			"🔥 Still here? Let’s make something great together.",
			"🧠 You clearly have taste — imagine what we could build!",
		],
		welcomeReminder: [
			"👋 Back again? Love the dedication — let’s finally build that project.",
			"🚀 Welcome back! Clearly, something here inspired you last time.",
			"💼 Ready to turn those ideas into code this time?",
			"🔥 You keep coming back — maybe it’s time we make something real.",
			"🧠 Still thinking about that project? Let’s make it happen together.",
		],
	};

	// Utility: play ping sound + optional vibration
	const playFeedback = () => {
		try {
			const audio = new Audio(PING_SOUND);
			audio.volume = 0.2;
			audio.play();
			if (navigator.vibrate) navigator.vibrate(80);
		} catch (e) {
			console.warn("Feedback sound suppressed:", e);
		}
	};

	// 🧠 Timed Popups with Session Memory
	useEffect(() => {
		const hasSeen = localStorage.getItem("popupShown");

		// if (hasSeen) {
		// 	const welcomeReminder = setTimeout(() => {
		// 		const message =
		// 			ctaMessages.welcomeReminder[
		// 				Math.floor(
		// 					Math.random() * ctaMessages.welcomeReminder.length
		// 				)
		// 			];
		// 		setCta(message);
		// 		setPopup("initial");
		// 		playFeedback();
		// 	}, 10000);

		// 	return () => {
		// 		clearTimeout(welcomeReminder);
		// 	};
		// }

		if (!hasSeen) {
			const firstTimer = setTimeout(() => {
				const message =
					ctaMessages.initial[
						Math.floor(Math.random() * ctaMessages.initial.length)
					];
				setCta(message);
				setPopup("initial");
				playFeedback();
			}, 10000);

			const secondTimer = setTimeout(() => {
				const message =
					ctaMessages.reminder[
						Math.floor(Math.random() * ctaMessages.reminder.length)
					];
				setCta(message);
				setPopup("reminder");
				playFeedback();
				localStorage.setItem("popupShown", "true");
			}, 20000);

			const thirdTimer = setTimeout(() => {
				const message =
					ctaMessages.reminder[
						Math.floor(Math.random() * ctaMessages.reminder.length)
					];
				setCta(message);
				setPopup("reminder");
				playFeedback();
				localStorage.setItem("popupShown", "true");
			}, 30000);

			return () => {
				clearTimeout(firstTimer);
				clearTimeout(secondTimer);
				clearTimeout(thirdTimer);
			};
		}
		// eslint-disable-next-line
	}, [popup]);

	// Auto-hide popup after 7 seconds
	useEffect(() => {
		if (popup) {
			const timer = setTimeout(() => setPopup(null), 7000);
			return () => clearTimeout(timer);
		}
	}, [popup]);

	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end roboto-condensed-regular">
			{/* Timed Popups */}
			<AnimatePresence>
				{popup && (
					<motion.div
						key={popup}
						initial={{ opacity: 0, y: 30, scale: 0.9 }}
						animate={{
							opacity: 1,
							y: 0,
							scale: 1,
							transition: { type: "spring", stiffness: 120 },
						}}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						className={`mb-3 px-4 py-3 rounded-xl shadow-2xl text-sm max-w-[240px] ${
							popup === "initial"
								? "bg-green-600 text-white"
								: "bg-blue-600 text-white"
						}`}
					>
						{cta}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Floating menu items */}
			<AnimatePresence>
				{open &&
					menuItems.map((item, index) => (
						<motion.a
							key={item.label}
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							initial={{ opacity: 0, y: 25 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 25 }}
							transition={{ delay: index * 0.05 }}
							className="flex items-center gap-2 mb-3 bg-white text-gray-800 shadow-lg px-3 py-2 rounded-xl hover:bg-gray-100"
						>
							{item.icon}
							<span className="text-sm font-medium">
								{item.label}
							</span>
						</motion.a>
					))}
			</AnimatePresence>

			{/* Main Floating Button */}
			<motion.button
				onClick={toggleMenu}
				className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700 relative"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				aria-label="Open contact options"
			>
				<MessageCircle size={24} />
				{!open && (
					<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
				)}
			</motion.button>
		</div>
	);
};

export default FloatingHelpButton;
