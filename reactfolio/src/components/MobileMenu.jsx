import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Menu, X, Terminal, Github, Linkedin, Mail, ArrowRight,
} from "lucide-react";
import { useGame } from "../HOME/Experience/GameUI";

const NAV_LINKS = [
	{ label: "HOME",     path: "/" },
	{ label: "PROJECTS", path: "/projects" },
	{ label: "ABOUT",    path: "/about" },
	{ label: "STACK",    path: "/stack" },
	{ label: "RESUME",   path: "/resume" },
	{ label: "SOCIALS",  path: "/socials" },
	{ label: "CONTACT",  path: "/contact" },
];

/**
 * Mobile-only navbar. Renders a brand+menu pill top-left.
 * On tap, opens a full-screen overlay with nav, CTA, and direct contact links.
 * Mounted globally in App.js so it appears on every route.
 */
export default function MobileMenu() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const { unlock } = useGame();

	// Close on route change
	useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	// Lock body scroll while overlay is open
	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);

	// Esc to close
	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	const go = (path) => () => {
		navigate(path);
		setOpen(false);
	};

	return (
		<>
			{/* Mobile-only trigger — brand + menu icon */}
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label="Open menu"
				className="md:hidden fixed top-4 left-4 z-40 flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-black/70 backdrop-blur-md text-white/80 hover:text-green-400 hover:border-green-400/40 transition-all"
			>
				<Menu size={16} className="text-green-400" />
				<span className="font-mono text-xs tracking-wider">
					LESLIE<span className="text-green-400">.DEV</span>
				</span>
			</button>

			{/* Full-screen overlay */}
			<AnimatePresence>
				{open && (
					<motion.div
						key="mobile-menu-overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="md:hidden fixed inset-0 z-[60] bg-[#0a0a0a]/95 backdrop-blur-md overflow-y-auto"
					>
						{/* Top bar */}
						<div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
							<button
								onClick={go("/")}
								className="flex items-center gap-2 group"
							>
								<Terminal className="w-5 h-5 text-green-400" />
								<span className="text-white font-mono text-sm tracking-wider">
									LESLIE<span className="text-green-400">.DEV</span>
								</span>
							</button>
							<button
								type="button"
								onClick={() => setOpen(false)}
								aria-label="Close menu"
								className="w-10 h-10 flex items-center justify-center rounded-md border border-white/10 text-white/70 hover:text-green-400 hover:border-green-400/40 transition-all"
							>
								<X size={18} />
							</button>
						</div>

						{/* Nav links */}
						<nav className="px-6 pt-10 pb-8">
							<div className="font-mono text-green-400/60 text-[10px] tracking-[0.3em] mb-5">
								// NAVIGATE
							</div>
							<ul>
								{NAV_LINKS.map((link, i) => {
									const active = location.pathname === link.path;
									return (
										<motion.li
											key={link.path}
											initial={{ opacity: 0, x: -16 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
										>
											<button
												onClick={go(link.path)}
												className={`group w-full text-left flex items-center justify-between py-3 border-b border-white/5 ${
													active ? "text-green-400" : "text-white/80 hover:text-green-400"
												} transition-colors`}
											>
												<span
													className="font-bold text-2xl tracking-tight"
													style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
												>
													{link.label}
												</span>
												<ArrowRight
													size={18}
													className="text-white/20 group-hover:text-green-400 group-hover:translate-x-1 transition-all"
												/>
											</button>
										</motion.li>
									);
								})}
							</ul>
						</nav>

						{/* CTA */}
						<div className="px-6 pb-10">
							<div className="p-6 rounded-lg border border-green-400/20 bg-green-400/[0.03]">
								<div className="font-mono text-green-400/60 text-[10px] tracking-[0.3em] mb-3">
									// CONNECT
								</div>
								<h2
									className="text-2xl font-bold text-white mb-3 tracking-tight"
									style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
								>
									Need an engineer{" "}
									<span className="text-green-400">who ships?</span>
								</h2>
								<p className="text-white/40 text-sm mb-5">
									I build from database to deployment. Let's talk about your
									next project.
								</p>
								<div className="flex flex-col gap-3">
									<button
										onClick={go("/contact")}
										className="group px-5 py-2.5 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-xs tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all rounded-sm inline-flex items-center justify-center gap-3"
									>
										START_CONVERSATION
										<ArrowRight size={14} />
									</button>
									<a
										href="https://github.com/Leslie-23"
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => unlock("connected")}
										className="px-5 py-2.5 border border-white/10 text-white/60 font-mono text-xs tracking-wider hover:border-white/30 hover:text-white/80 transition-all rounded-sm inline-flex items-center justify-center gap-3"
									>
										<Github size={14} />
										VIEW_GITHUB
									</a>
								</div>
							</div>
						</div>

						{/* Direct contact strip */}
						<div className="px-6 pb-10 pt-8 border-t border-white/5">
							<div className="font-mono text-white/30 text-[10px] tracking-[0.3em] mb-4">
								// DIRECT
							</div>
							<div className="flex flex-col gap-3 font-mono text-xs">
								<a
									href="https://github.com/Leslie-23"
									target="_blank"
									rel="noopener noreferrer"
									onClick={() => unlock("connected")}
									className="flex items-center gap-3 text-white/50 hover:text-green-400 transition-colors"
								>
									<Github size={14} /> github.com/Leslie-23
								</a>
								<a
									href="https://www.linkedin.com/in/leslie-paul-ajayi-409b16356/"
									target="_blank"
									rel="noopener noreferrer"
									onClick={() => unlock("connected")}
									className="flex items-center gap-3 text-white/50 hover:text-green-400 transition-colors"
								>
									<Linkedin size={14} /> linkedin.com/in/leslie-paul-ajayi
								</a>
								<a
									href="mailto:lesliepaulajayi@gmail.com"
									className="flex items-center gap-3 text-white/50 hover:text-green-400 transition-colors"
								>
									<Mail size={14} /> lesliepaulajayi@gmail.com
								</a>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
