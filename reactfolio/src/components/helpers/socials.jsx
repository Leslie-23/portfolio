import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import PageLayout from "../PageLayout";

const Socials = () => {
	const socialLinks = [
		{ name: "GitHub", handle: "@leslie-23", url: "https://github.com/leslie-23", description: "Open source & projects", accent: "white" },
		{ name: "LinkedIn", handle: "@leslie-paul-ajayi", url: "https://www.linkedin.com/in/leslie-paul-ajayi-409b16356", description: "Professional network", accent: "blue" },
		{ name: "Twitter/X", handle: "@_iam_leslie", url: "https://x.com/_iam_leslie", description: "Thoughts & insights", accent: "cyan" },
		{ name: "Instagram", handle: "@i_am.leslie", url: "https://instagram.com/i_am.leslie", description: "Behind the scenes", accent: "pink" },
		{ name: "WhatsApp", handle: "+233-27-123-7965", url: "https://wa.me/+233271237965", description: "Quick collaboration", accent: "green" },
		{ name: "Slack", handle: "@leslieajayi27", url: "https://leslieajayi27.slack.com", description: "Workspace chats", accent: "purple" },
		{ name: "Snapchat", handle: "@paulseun003", url: "https://snapchat.com/add/paulseun003", description: "Stories & moments", accent: "yellow" },
	];

	const accentMap = {
		white: "hover:border-white/30 text-white/60",
		blue: "hover:border-blue-400/30 text-blue-400/60",
		cyan: "hover:border-cyan-400/30 text-cyan-400/60",
		pink: "hover:border-pink-400/30 text-pink-400/60",
		green: "hover:border-green-400/30 text-green-400/60",
		purple: "hover:border-purple-400/30 text-purple-400/60",
		yellow: "hover:border-yellow-400/30 text-yellow-400/60",
	};

	return (
		<PageLayout>
			<section className="py-20 md:py-28 px-6 md:px-12">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-4">
							// SOCIALS
						</div>
						<h1
							className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
							style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
						>
							Find me <span className="text-green-400">everywhere</span>
						</h1>
						<p className="text-white/40 text-lg max-w-xl mb-12">
							Different platforms, same engineer. Connect wherever works best for you.
						</p>
					</motion.div>

					<div className="space-y-3">
						{socialLinks.map((social, i) => (
							<motion.a
								key={social.name}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								initial={{ opacity: 0, y: 15 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
								className={`group flex items-center justify-between p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 ${accentMap[social.accent]}`}
							>
								<div className="flex items-center gap-4">
									<span className="font-mono text-xs text-white/20 w-6">
										{String(i + 1).padStart(2, "0")}
									</span>
									<div>
										<div className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors">
											{social.name}
										</div>
										<div className="text-white/30 text-xs font-mono">{social.handle}</div>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<span className="text-white/20 text-xs hidden sm:block">{social.description}</span>
									<ExternalLink size={14} className="text-white/20 group-hover:text-green-400 transition-colors" />
								</div>
							</motion.a>
						))}
					</div>

					{/* CTA */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.6 }}
						className="mt-12 p-6 rounded-lg border border-green-400/10 bg-green-400/[0.03] text-center"
					>
						<p className="text-white/40 text-sm mb-4">Prefer email?</p>
						<a
							href="mailto:leslieajayi27@gmail.com"
							className="group inline-flex items-center gap-2 px-6 py-2.5 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-xs tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm"
						>
							SEND_EMAIL
							<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
						</a>
					</motion.div>
				</div>
			</section>
		</PageLayout>
	);
};

export default Socials;
