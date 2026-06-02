import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Github } from "lucide-react";
import { useGame } from "../HOME/Experience/GameUI";

function Reveal({ children, delay = 0 }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, delay, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}

/**
 * Shared end-of-page CTA. Mounts on every route except /contact itself.
 * Pass `bordered` to add a top border so it visually separates from content above.
 */
export default function CTASection({ bordered = true }) {
	const navigate = useNavigate();
	const { unlock } = useGame();

	return (
		<section
			className={`py-24 md:py-32 px-6 md:px-12 ${bordered ? "border-t border-white/5" : ""}`}
		>
			<div className="max-w-4xl mx-auto text-center">
				<Reveal>
					<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-6">
						// CONNECT
					</div>
				</Reveal>
				<Reveal delay={0.1}>
					<h2
						className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
						style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
					>
						Need an engineer{" "}
						<span className="text-green-400">who ships?</span>
					</h2>
				</Reveal>
				<Reveal delay={0.2}>
					<p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
						I build from database to deployment. Let's talk about your next
						project.
					</p>
				</Reveal>
				<Reveal delay={0.3}>
					<div className="flex flex-wrap gap-4 justify-center">
						<button
							onClick={() => navigate("/contact")}
							className="group px-8 py-3 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-sm tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm inline-flex items-center gap-3"
						>
							START_CONVERSATION
							<ArrowRight
								size={16}
								className="group-hover:translate-x-1 transition-transform"
							/>
						</button>
						<a
							href="https://github.com/Leslie-23"
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => unlock("connected")}
							className="px-8 py-3 border border-white/10 text-white/50 font-mono text-sm tracking-wider hover:border-white/30 hover:text-white/80 transition-all duration-300 rounded-sm inline-flex items-center gap-3"
						>
							<Github size={16} />
							VIEW_GITHUB
						</a>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
