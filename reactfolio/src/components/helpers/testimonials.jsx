import React from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, Quote } from "lucide-react";
import PageLayout from "../PageLayout";

export default function Testimonials() {
	const testimonials = [
		{
			name: "Cece",
			role: "Business Owner",
			project: "neneCollectionz",
			projectType: "eCommerce Platform",
			testimonial: "The hair-selling platform transformed my business! Sales increased by 200% in the first month. The Instagram integration and seamless Stripe payments made everything so smooth.",
			rating: 5,
			projectUrl: "https://nene-collectionz.vercel.app",
			tech: ["React", "Node.js", "Stripe", "Instagram API"],
		},
	];

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
							// TESTIMONIALS
						</div>
						<h1
							className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
							style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
						>
							What clients <span className="text-green-400">say</span>
						</h1>
						<p className="text-white/40 text-lg max-w-xl mb-12">
							Real feedback from real projects.
						</p>
					</motion.div>

					<div className="space-y-6">
						{testimonials.map((t, i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
								className="p-6 md:p-8 rounded-lg border border-white/5 bg-white/[0.02]"
							>
								<Quote size={20} className="text-green-400/30 mb-4" />
								<p className="text-white/60 leading-relaxed mb-6 italic">
									"{t.testimonial}"
								</p>

								<div className="flex items-center justify-between">
									<div>
										<div className="text-white font-semibold text-sm">{t.name}</div>
										<div className="text-white/30 text-xs font-mono">
											{t.role} — {t.projectType}
										</div>
									</div>
									<div className="flex items-center gap-3">
										<div className="flex gap-0.5">
											{Array.from({ length: t.rating }).map((_, j) => (
												<Star key={j} size={12} className="text-green-400 fill-green-400" />
											))}
										</div>
										{t.projectUrl && (
											<a
												href={t.projectUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-green-400 hover:border-green-400/50 transition-all"
											>
												<ExternalLink size={12} />
											</a>
										)}
									</div>
								</div>

								<div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/5">
									{t.tech.map((tech) => (
										<span key={tech} className="px-2 py-0.5 text-[10px] font-mono text-white/30 border border-white/8 rounded">
											{tech}
										</span>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</PageLayout>
	);
}
