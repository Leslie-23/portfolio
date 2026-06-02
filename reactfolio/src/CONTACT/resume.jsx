import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ExternalLink, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import CTASection from "../components/CTASection";

function Reveal({ children, delay = 0, className = "" }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 25 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, delay, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

const RESUME_PDF = "/resume_.pdf";

const Resume = () => {
	const navigate = useNavigate();

	return (
		<PageLayout>
			<section className="py-16 md:py-24 px-6 md:px-12">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<Reveal>
						<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-4">
							// RESUME
						</div>
						<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
							<div>
								<h1
									className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
									style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
								>
									Leslie Paul <span className="text-green-400">Ajayi</span>
								</h1>
								<p className="text-white/50 text-lg">Software Engineer</p>
							</div>
							<div className="flex gap-3 self-start">
								<a
									href={RESUME_PDF}
									download="Leslie_Paul_Ajayi_Resume.pdf"
									className="group px-6 py-2.5 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-xs tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm inline-flex items-center gap-2"
								>
									<Download size={14} />
									DOWNLOAD_PDF
								</a>
								<a
									href={RESUME_PDF}
									target="_blank"
									rel="noopener noreferrer"
									className="group px-4 py-2.5 border border-white/10 text-white/50 font-mono text-xs tracking-wider hover:border-white/30 hover:text-white/80 transition-all duration-300 rounded-sm inline-flex items-center gap-2"
								>
									<ExternalLink size={14} />
									OPEN
								</a>
							</div>
						</div>
					</Reveal>

					{/* PDF Preview */}
					<Reveal delay={0.1}>
						<div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden mb-8">
							<div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
								<span className="font-mono text-xs text-white/30">resume_.pdf</span>
								<span className="font-mono text-[10px] text-white/20">PREVIEW</span>
							</div>
							<div className="w-full bg-neutral-800/50">
								<object
									data={`${RESUME_PDF}#toolbar=0&navpanes=0&view=FitH`}
									type="application/pdf"
									className="w-full"
									style={{ height: "min(80vh, 1000px)" }}
								>
									<div className="flex flex-col items-center justify-center py-20 gap-4">
										<p className="text-white/40 text-sm font-mono">
											PDF preview not supported in this browser.
										</p>
										<a
											href={RESUME_PDF}
											target="_blank"
											rel="noopener noreferrer"
											className="text-green-400 text-sm font-mono hover:underline"
										>
											Open PDF in new tab
										</a>
									</div>
								</object>
							</div>
						</div>
					</Reveal>

					{/* CTA */}
					<Reveal delay={0.2}>
						<div className="pt-8 border-t border-white/5 text-center">
							<p className="text-white/30 text-sm mb-6">Interested in working together?</p>
							<div className="flex flex-wrap gap-4 justify-center">
								<button
									onClick={() => navigate("/contact")}
									className="group px-8 py-3 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-sm tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm inline-flex items-center gap-3"
								>
									GET_IN_TOUCH
									<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
								</button>
								<button
									onClick={() => navigate("/projects")}
									className="px-8 py-3 border border-white/10 text-white/50 font-mono text-sm tracking-wider hover:border-white/30 hover:text-white/80 transition-all duration-300 rounded-sm"
								>
									VIEW_WORK
								</button>
							</div>
						</div>
					</Reveal>
				</div>
			</section>
			<CTASection />
		</PageLayout>
	);
};

export default Resume;
