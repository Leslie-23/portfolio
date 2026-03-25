import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Github, Linkedin, Mail, Terminal, ArrowRight } from "lucide-react";
import { useGame } from "./GameUI";

const roles = [
	"Full-Stack Engineer",
	"Backend Developer",
	"Systems Architect",
	"Frontend Developer",
	"Cloud & DevOps",
];

function TypewriterRole() {
	const [roleIndex, setRoleIndex] = useState(0);
	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const currentRole = roles[roleIndex];
		const speed = isDeleting ? 40 : 80;

		if (!isDeleting && text === currentRole) {
			setTimeout(() => setIsDeleting(true), 2000);
			return;
		}

		if (isDeleting && text === "") {
			setIsDeleting(false);
			setRoleIndex((prev) => (prev + 1) % roles.length);
			return;
		}

		const timeout = setTimeout(() => {
			setText(
				isDeleting
					? currentRole.substring(0, text.length - 1)
					: currentRole.substring(0, text.length + 1)
			);
		}, speed);

		return () => clearTimeout(timeout);
	}, [text, isDeleting, roleIndex]);

	return (
		<span className="text-green-400">
			{text}
			<span className="animate-pulse">|</span>
		</span>
	);
}

// Glitch text effect
function GlitchText({ children, className = "" }) {
	return (
		<span className={`relative inline-block ${className}`}>
			<span className="relative z-10">{children}</span>
		</span>
	);
}

export default function HeroOverlay() {
	const navigate = useNavigate();
	const { unlock } = useGame();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
			{/* Top nav bar */}
			<motion.nav
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
				className="pointer-events-auto flex items-center justify-between px-6 md:px-12 py-6"
			>
				<div className="flex items-center gap-2">
					<Terminal className="w-5 h-5 text-green-400" />
					<span className="text-white font-mono text-sm tracking-wider">
						LESLIE<span className="text-green-400">.DEV</span>
					</span>
				</div>

				<div className="hidden md:flex items-center gap-8">
					{[
						{ label: "PROJECTS", path: "/projects" },
						{ label: "ABOUT", path: "/about" },
						{ label: "CONTACT", path: "/contact" },
						{ label: "RESUME", path: "/resume" },
					].map((item, i) => (
						<motion.button
							key={item.label}
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.7 + i * 0.1 }}
							onClick={() => navigate(item.path)}
							className="text-white/60 hover:text-green-400 font-mono text-xs tracking-[0.2em] transition-colors duration-300 relative group"
						>
							{item.label}
							<span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300" />
						</motion.button>
					))}
				</div>

				<div className="flex items-center gap-4">
					{[
						{ icon: Github, href: "https://github.com/Leslie-23" },
						{ icon: Linkedin, href: "https://linkedin.com/in/leslie-paul-ajayi" },
						{ icon: Mail, action: () => navigate("/contact") },
					].map((item, i) => (
						<motion.a
							key={i}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 1 + i * 0.1, type: "spring" }}
							href={item.href}
							onClick={(e) => {
								unlock("connected");
								if (item.action) {
									e.preventDefault();
									item.action();
								}
							}}
							target={item.href ? "_blank" : undefined}
							rel={item.href ? "noopener noreferrer" : undefined}
							className="pointer-events-auto w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-green-400 hover:border-green-400/50 transition-all duration-300"
						>
							<item.icon size={14} />
						</motion.a>
					))}
				</div>
			</motion.nav>

			{/* Center content */}
			<div className="flex-1 flex items-center justify-center px-6 md:px-12">
				<div className="max-w-4xl w-full">
					{/* Terminal-style greeting */}
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 1.2, duration: 0.6 }}
						className="font-mono text-green-400/70 text-sm mb-4 flex items-center gap-2"
					>
						<span className="text-green-400">$</span>
						<span>whoami</span>
					</motion.div>

					{/* Name */}
					<motion.h1
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
						className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight"
						style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
					>
						<GlitchText>LESLIE</GlitchText>{" "}
						<span className="text-green-400">
							<GlitchText>PAUL</GlitchText>
						</span>
					</motion.h1>

					{/* Role cycler */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.8, duration: 0.6 }}
						className="font-mono text-lg md:text-xl text-white/80 mb-8"
					>
						<span className="text-green-400/50">{">"}</span>{" "}
						<TypewriterRole />
					</motion.div>

					{/* Description */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.0, duration: 0.6 }}
						className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed mb-10"
						style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
					>
						I engineer systems from database to deployment. Building
						production-grade applications with clean architecture,
						performant backends, and interfaces that feel alive.
					</motion.p>

					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.2, duration: 0.6 }}
						className="pointer-events-auto flex flex-wrap gap-4"
					>
						<button
							onClick={() => navigate("/projects")}
							className="group relative px-8 py-3 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-sm tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm flex items-center gap-3"
						>
							<span>EXPLORE_WORK</span>
							<ArrowRight
								size={16}
								className="group-hover:translate-x-1 transition-transform"
							/>
							<div className="absolute inset-0 bg-green-400/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-sm" />
						</button>

						<button
							onClick={() => navigate("/contact")}
							className="group px-8 py-3 border border-white/10 text-white/60 font-mono text-sm tracking-wider hover:border-white/30 hover:text-white/90 transition-all duration-300 rounded-sm"
						>
							<span>INIT_CONTACT</span>
						</button>
					</motion.div>

					{/* Stats bar */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 2.6, duration: 0.8 }}
						className="mt-16 flex flex-wrap gap-8 md:gap-12 font-mono text-xs"
					>
						{[
							{ label: "PUBLIC_REPOS", value: "30+" },
							{ label: "TECH_STACK", value: "20+" },
							{ label: "EXPERIENCE", value: "3+ YRS" },
							{ label: "STATUS", value: "AVAILABLE", highlight: true },
						].map((stat) => (
							<div key={stat.label} className="flex flex-col gap-1">
								<span className="text-white/30">{stat.label}</span>
								<span
									className={
										stat.highlight
											? "text-green-400"
											: "text-white/80"
									}
								>
									{stat.value}
								</span>
							</div>
						))}
					</motion.div>
				</div>
			</div>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 3, duration: 0.8 }}
				className="pointer-events-auto flex flex-col items-center pb-8 cursor-pointer"
				onClick={() => {
					document.getElementById("experience-section")?.scrollIntoView({
						behavior: "smooth",
					});
				}}
			>
				<span className="font-mono text-xs text-white/30 tracking-widest mb-2">
					SCROLL
				</span>
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{ repeat: Infinity, duration: 1.5 }}
				>
					<ChevronDown className="w-5 h-5 text-green-400/50" />
				</motion.div>
			</motion.div>
		</div>
	);
}
