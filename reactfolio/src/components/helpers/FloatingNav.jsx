// src/components/FloatingNavIndicator.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Home, FolderGit2, User, Mail, ChevronRight } from "lucide-react";
import "../globals.css";
const FloatingNavIndicator = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentSection, setCurrentSection] = useState("");
	const location = useLocation();

	const navigationItems = [
		{ path: "/", label: "Home", icon: Home },
		{ path: "/projects", label: "Projects", icon: FolderGit2 },
		{ path: "/about", label: "About", icon: User },
		{ path: "/contact", label: "Contact", icon: Mail },
	];

	useEffect(() => {
		const currentItem = navigationItems.find(
			(item) =>
				location.pathname === item.path ||
				location.pathname.startsWith(item.path + "/")
		);
		setCurrentSection(currentItem?.label || "");

		// Show indicator after page load
		const timer = setTimeout(() => setIsVisible(true), 1000);
		return () => clearTimeout(timer);
		// eslint-disable-next-line
	}, [location.pathname]);

	const getCurrentIcon = () => {
		const currentItem = navigationItems.find(
			(item) =>
				location.pathname === item.path ||
				location.pathname.startsWith(item.path + "/")
		);
		return currentItem
			? React.createElement(currentItem.icon, { size: 16 })
			: null;
	};

	if (!isVisible) return null;

	return (
		<div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 roboto-condensed-regular">
			<div className="flex flex-col items-center space-y-6">
				{/* Current Section Indicator */}
				<div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-4 min-w-[200px] transform hover:scale-105 transition-all duration-300">
					<div className="flex items-center gap-3">
						<div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
							{getCurrentIcon()}
						</div>
						<div className="flex-1">
							<p className="text-xs text-gray-500 font-medium">
								CURRENT SECTION
							</p>
							<p className="text-sm font-semibold text-gray-800">
								{currentSection}
							</p>
						</div>
						<ChevronRight size={16} className="text-gray-400" />
					</div>
				</div>

				{/* Navigation Dots */}
				<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-4">
					<div className="flex flex-col gap-4">
						{navigationItems.map((item, index) => {
							const Icon = item.icon;
							const isActive =
								location.pathname === item.path ||
								location.pathname.startsWith(item.path + "/");

							return (
								<a
									key={item.path}
									href={item.path}
									className={`relative group flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${
										isActive
											? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
											: "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
									}`}
								>
									{/* Connection Line */}
									{index < navigationItems.length - 1 && (
										<div
											className={`absolute top-full left-4 w-0.5 h-4 ${
												isActive
													? "bg-blue-400"
													: "bg-gray-300"
											}`}
										/>
									)}

									<div
										className={`p-1.5 rounded-lg ${
											isActive
												? "bg-white/20"
												: "bg-gray-200/50 group-hover:bg-gray-300/50"
										}`}
									>
										<Icon size={14} />
									</div>

									<span
										className={`text-xs font-medium transition-all duration-300 ${
											isActive
												? "opacity-100"
												: "opacity-0 group-hover:opacity-100"
										}`}
									>
										{item.label}
									</span>

									{/* Active Dot */}
									{isActive && (
										<div className="absolute -right-1 w-2 h-2 bg-white rounded-full border-2 border-blue-500" />
									)}
								</a>
							);
						})}
					</div>
				</div>

				{/* Scroll Progress */}
				<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-4">
					<ScrollProgress />
				</div>
			</div>
		</div>
	);
};

// Scroll Progress Component
const ScrollProgress = () => {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const updateScrollProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = (scrollTop / docHeight) * 100;
			setScrollProgress(progress);
		};

		window.addEventListener("scroll", updateScrollProgress);
		return () => window.removeEventListener("scroll", updateScrollProgress);
	}, []);

	return (
		<div className="flex items-center gap-3">
			<div className="w-12 h-12 relative">
				<svg
					className="w-12 h-12 transform -rotate-90"
					viewBox="0 0 100 100"
				>
					<circle
						cx="50"
						cy="50"
						r="40"
						stroke="#e5e7eb"
						strokeWidth="8"
						fill="none"
					/>
					<circle
						cx="50"
						cy="50"
						r="40"
						stroke="url(#gradient)"
						strokeWidth="8"
						fill="none"
						strokeDasharray={251.2}
						strokeDashoffset={
							251.2 - (scrollProgress * 251.2) / 100
						}
						strokeLinecap="round"
					/>
					<defs>
						<linearGradient
							id="gradient"
							x1="0%"
							y1="0%"
							x2="100%"
							y2="0%"
						>
							<stop offset="0%" stopColor="#3b82f6" />
							<stop offset="100%" stopColor="#8b5cf6" />
						</linearGradient>
					</defs>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-xs font-bold text-gray-700">
						{Math.round(scrollProgress)}%
					</span>
				</div>
			</div>
			<div className="flex-1">
				<p className="text-xs text-gray-500 font-medium">
					SCROLL PROGRESS
				</p>
				<div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
					<div
						className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
						style={{ width: `${scrollProgress}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default FloatingNavIndicator;
