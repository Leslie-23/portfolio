import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Terminal, ArrowLeft, Github, Linkedin, Mail, TerminalSquare } from "lucide-react";
import { useTerminal } from "./TerminalProvider";

function PageNav({ backTo, backLabel }) {
	const navigate = useNavigate();
	const { openTerminal } = useTerminal();

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: "easeOut" }}
			className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5"
		>
			<div className="flex items-center gap-6">
				<button
					onClick={() => navigate("/")}
					className="flex items-center gap-2 group"
				>
					<Terminal className="w-5 h-5 text-green-400" />
					<span className="text-white font-mono text-sm tracking-wider">
						LESLIE<span className="text-green-400">.DEV</span>
					</span>
				</button>

				<button
					onClick={openTerminal}
					title="Open interactive terminal (press `)"
					className="hidden sm:flex items-center gap-2 text-white/30 hover:text-green-400 font-mono text-xs tracking-wider transition-colors"
				>
					<TerminalSquare size={14} />
					<span className="hidden md:inline">~$</span>
				</button>

				{backTo && (
					<button
						onClick={() => navigate(backTo)}
						className="flex items-center gap-2 text-white/40 hover:text-green-400 font-mono text-xs tracking-wider transition-colors"
					>
						<ArrowLeft size={14} />
						{backLabel || "BACK"}
					</button>
				)}
			</div>

			<div className="hidden md:flex items-center gap-8">
				{[
					{ label: "PROJECTS", path: "/projects" },
					{ label: "ABOUT", path: "/about" },
					{ label: "CONTACT", path: "/contact" },
					{ label: "RESUME", path: "/resume" },
				].map((item) => (
					<button
						key={item.label}
						onClick={() => navigate(item.path)}
						className="text-white/50 hover:text-green-400 font-mono text-xs tracking-[0.2em] transition-colors duration-300 relative group"
					>
						{item.label}
						<span className="absolute -bottom-1 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300" />
					</button>
				))}
			</div>

			<div className="flex items-center gap-4">
				{[
					{ icon: Github, href: "https://github.com/Leslie-23" },
					{ icon: Linkedin, href: "https://linkedin.com/in/leslie-paul-ajayi" },
				].map((item, i) => (
					<a
						key={i}
						href={item.href}
						target="_blank"
						rel="noopener noreferrer"
						className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-green-400 hover:border-green-400/50 transition-all duration-300"
					>
						<item.icon size={14} />
					</a>
				))}
			</div>
		</motion.nav>
	);
}

function PageFooter() {
	const navigate = useNavigate();
	const { openTerminal } = useTerminal();

	return (
		<footer className="border-t border-white/5 pt-12 pb-8 px-6 md:px-12">
			<div className="max-w-6xl mx-auto">
				{/* Top row — logo + nav + socials */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
					{/* Brand */}
					<div>
						<button onClick={() => navigate("/")} className="flex items-center gap-2 mb-3 group">
							<Terminal className="w-4 h-4 text-green-400" />
							<span className="text-white font-mono text-sm tracking-wider">
								LESLIE<span className="text-green-400">.DEV</span>
							</span>
						</button>
						<p className="text-white/25 text-xs leading-relaxed max-w-xs mb-3">
							Software Engineer building production-grade applications from database to deployment.
						</p>
						<button
							onClick={openTerminal}
							className="font-mono text-[11px] text-green-400/50 hover:text-green-400 tracking-wider transition-colors"
						>
							$ press ` for terminal
						</button>
					</div>

					{/* Nav links */}
					<div className="flex gap-12">
						<div>
							<div className="font-mono text-[10px] text-white/20 tracking-widest mb-3">PAGES</div>
							<div className="flex flex-col gap-2">
								{[
									{ label: "Home", path: "/" },
									{ label: "Projects", path: "/projects" },
									{ label: "About", path: "/about" },
									{ label: "Contact", path: "/contact" },
								].map((link) => (
									<button
										key={link.path}
										onClick={() => navigate(link.path)}
										className="text-white/30 hover:text-green-400 text-xs font-mono text-left transition-colors"
									>
										{link.label}
									</button>
								))}
							</div>
						</div>
						<div>
							<div className="font-mono text-[10px] text-white/20 tracking-widest mb-3">MORE</div>
							<div className="flex flex-col gap-2">
								{[
									{ label: "Resume", path: "/resume" },
									{ label: "Socials", path: "/socials" },
									{ label: "Privacy", path: "/privacy-policy" },
									{ label: "Terms", path: "/terms-of-service" },
								].map((link) => (
									<button
										key={link.path}
										onClick={() => navigate(link.path)}
										className="text-white/30 hover:text-green-400 text-xs font-mono text-left transition-colors"
									>
										{link.label}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Social links */}
					<div>
						<div className="font-mono text-[10px] text-white/20 tracking-widest mb-3">CONNECT</div>
						<div className="flex gap-2 mb-4">
							{[
								{ icon: Github, href: "https://github.com/Leslie-23" },
								{ icon: Linkedin, href: "https://linkedin.com/in/leslie-paul-ajayi" },
								{ icon: Mail, href: "mailto:hello@lesliepaul.me" },
							].map((item, i) => (
								<a
									key={i}
									href={item.href}
									target={item.href.startsWith("mailto") ? undefined : "_blank"}
									rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
									className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-green-400 hover:border-green-400/40 transition-all duration-300"
								>
									<item.icon size={14} />
								</a>
							))}
						</div>
						<a
							href="mailto:hello@lesliepaul.me"
							className="text-white/25 text-xs font-mono hover:text-green-400 transition-colors"
						>
							hello@lesliepaul.me
						</a>
					</div>
				</div>

				{/* Divider */}
				<div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />

				{/* Bottom row */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-3">
					<div className="font-mono text-[11px] text-white/20">
						<span className="text-green-400/40">$</span> echo "&copy; {new Date().getFullYear()} Leslie Paul Ajayi — All rights reserved"
					</div>
					<div className="flex items-center gap-4 font-mono text-[11px] text-white/20">
						<span>React + Three.js + Tailwind</span>
						<span className="text-green-400/20">|</span>
						<span>Accra, Ghana</span>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default function PageLayout({ children, backTo, backLabel }) {
	return (
		<div className="bg-[#0a0a0a] text-white min-h-screen">
			<PageNav backTo={backTo} backLabel={backLabel} />
			<main>{children}</main>
			<PageFooter />
		</div>
	);
}
