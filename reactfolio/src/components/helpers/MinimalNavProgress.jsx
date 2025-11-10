// src/components/MinimalNavProgress.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, FolderGit2, ArrowUp, FileText, Phone } from "lucide-react";
const MinimalNavProgress = () => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [open, setOpen] = useState(false);
	// eslint-disable-next-line
	const [isVisible, setIsVisible] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	// Track scroll progress and visibility
	useEffect(() => {
		let scrollTimer;
		const updateScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = (scrollTop / docHeight) * 100;
			setScrollProgress(progress);

			setIsVisible(true);
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(() => setIsVisible(false), 2000);
		};
		window.addEventListener("scroll", updateScroll);
		return () => {
			window.removeEventListener("scroll", updateScroll);
			clearTimeout(scrollTimer);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setOpen(false);
	};

	const menuItems = [
		{
			label: "Back to Top",
			icon: <ArrowUp size={18} />,
			action: scrollToTop,
		},
		{
			label: "Home",
			icon: <Home size={18} />,
			action: () => navigate("/"),
		},
		{
			label: "Projects",
			icon: <FolderGit2 size={18} />,
			action: () => navigate("/projects"),
		},
		{
			label: "Resume",
			icon: <FileText size={18} />,
			action: () => window.open("/resume.pdf", "_blank"),
		},
		{
			label: "Contact",
			icon: <Phone size={18} />,
			action: () => navigate("/contact"),
		},
	];

	return (
		<div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
			{/* Floating menu items */}
			<AnimatePresence>
				{open &&
					menuItems.map((item, index) => (
						<motion.button
							key={item.label}
							onClick={item.action}
							initial={{ opacity: 0, y: 25, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 25, scale: 0.95 }}
							transition={{
								delay: index * 0.05,
								type: "spring",
								stiffness: 150,
							}}
							className="flex items-center gap-2 mb-3 bg-white text-gray-800 shadow-xl px-3 py-2 rounded-xl hover:bg-gray-100 border border-gray-100"
						>
							{item.icon}
							<span className="text-sm font-medium">
								{item.label}
							</span>
						</motion.button>
					))}
			</AnimatePresence>

			{/* Main Floating Button */}
			<motion.button
				onClick={() => setOpen(!open)}
				className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden focus:outline-none"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				style={{
					background: `conic-gradient(#34bb78 ${scrollProgress}%, #e5e7eb ${scrollProgress}%)`,
				}}
				aria-label="Toggle navigation"
			>
				<div className="absolute inset-[3px] bg-green-50 rounded-full flex items-center justify-center">
					{/* <MessageCircle size={24} className="text-white" /> */}
					{Math.round(scrollProgress)}%
				</div>

				{/* Pulse Indicator when closed */}
				{!open && (
					<span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
				)}
			</motion.button>

			{/* Optional: show current page indicator */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						className="mt-3 bg-green-600 text-white text-xs px-3 py-1 rounded-lg shadow-lg"
					>
						On:{" "}
						{location.pathname === "/"
							? "Home"
							: location.pathname.replace("/", "")}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MinimalNavProgress;
