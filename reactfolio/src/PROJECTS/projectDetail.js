import React, { useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
	ExternalLink, Github, ArrowLeft, Calendar, Users,
	Terminal, ChevronRight, Lightbulb, Wrench
} from "lucide-react";
import { projectsData } from "./data/projects";
import PageLayout from "../components/PageLayout";

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

const ProjectDetail = () => {
	const navigate = useNavigate();
	const { projectId } = useParams();
	const location = useLocation();

	const project = location.state?.project || projectsData[projectId];

	if (!project) {
		return (
			<PageLayout backTo="/projects" backLabel="PROJECTS">
				<div className="min-h-[60vh] flex items-center justify-center">
					<div className="text-center">
						<div className="font-mono text-green-400/40 text-xs mb-4">
							$ find /projects/{projectId}
						</div>
						<h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}>
							404
						</h1>
						<p className="text-white/40 mb-6 font-mono text-sm">
							Error: project "{projectId}" not found
						</p>
						<button
							onClick={() => navigate("/projects")}
							className="px-6 py-3 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-sm tracking-wider hover:bg-green-500/20 transition-all rounded-sm"
						>
							BROWSE_PROJECTS
						</button>
					</div>
				</div>
			</PageLayout>
		);
	}

	return (
		<PageLayout backTo="/projects" backLabel="PROJECTS">
			<section className="py-16 md:py-24 px-6 md:px-12">
				<div className="max-w-5xl mx-auto">
					{/* Breadcrumb */}
					<Reveal>
						<div className="flex items-center gap-2 font-mono text-xs text-white/30 mb-8">
							<button onClick={() => navigate("/projects")} className="hover:text-green-400 transition-colors">
								projects
							</button>
							<ChevronRight size={12} />
							<span className="text-white/50">{projectId}</span>
						</div>
					</Reveal>

					{/* Header */}
					<Reveal delay={0.1}>
						<div className="mb-12">
							<div className="flex flex-wrap items-center gap-3 mb-4">
								<span className={`px-2 py-0.5 font-mono text-[10px] tracking-wider rounded-sm ${
									project.status === "Live" || project.status === "Completed"
										? "text-green-400 border border-green-400/30"
										: "text-yellow-400 border border-yellow-400/30"
								}`}>
									{project.status?.toUpperCase()}
								</span>
								<span className="px-2 py-0.5 font-mono text-[10px] tracking-wider text-white/40 border border-white/10 rounded-sm">
									{project.category?.toUpperCase()}
								</span>
							</div>

							<h1
								className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
								style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
							>
								{project.title}
							</h1>

							<p className="text-white/50 text-lg leading-relaxed max-w-3xl mb-6">
								{project.fullDescription || project.description}
							</p>

							{/* Meta */}
							<div className="flex flex-wrap gap-6 font-mono text-xs text-white/30">
								{project.timeline && (
									<div className="flex items-center gap-2">
										<Calendar size={14} />
										<span>{project.timeline}</span>
									</div>
								)}
								{project.teamSize && (
									<div className="flex items-center gap-2">
										<Users size={14} />
										<span>{project.teamSize}</span>
									</div>
								)}
							</div>
						</div>
					</Reveal>

					{/* Action buttons */}
					<Reveal delay={0.15}>
						<div className="flex flex-wrap gap-3 mb-12">
							{project.liveLink && (
								<a
									href={project.liveLink}
									target="_blank"
									rel="noopener noreferrer"
									className="group px-6 py-2.5 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-xs tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm inline-flex items-center gap-2"
								>
									<ExternalLink size={14} />
									LIVE_DEMO
								</a>
							)}
							{project.githubLink && (
								<a
									href={project.githubLink}
									target="_blank"
									rel="noopener noreferrer"
									className="group px-6 py-2.5 border border-white/10 text-white/50 font-mono text-xs tracking-wider hover:border-white/30 hover:text-white/80 transition-all duration-300 rounded-sm inline-flex items-center gap-2"
								>
									<Github size={14} />
									VIEW_CODE
								</a>
							)}
						</div>
					</Reveal>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main content */}
						<div className="lg:col-span-2 space-y-6">
							{/* Screenshots */}
							{(project.webScreenshot || project.mobileScreenshot) && (
								<Reveal delay={0.2}>
									<div className="p-6 rounded-lg border border-white/5 bg-white/[0.02]">
										<div className="flex items-center gap-3 mb-4">
											<Terminal className="w-4 h-4 text-green-400" />
											<span className="font-mono text-xs text-white/40">SCREENSHOTS</span>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{project.webScreenshot && (
												<div>
													<div className="font-mono text-[10px] text-white/30 mb-2">WEB</div>
													<div className="rounded border border-white/10 overflow-hidden bg-white/[0.02]">
														<img
															src={project.webScreenshot}
															alt={`${project.title} Web`}
															className="w-full object-cover"
														/>
													</div>
												</div>
											)}
											{project.mobileScreenshot && (
												<div>
													<div className="font-mono text-[10px] text-white/30 mb-2">MOBILE</div>
													<div className="rounded border border-white/10 overflow-hidden bg-white/[0.02] max-w-[200px]">
														<img
															src={project.mobileScreenshot}
															alt={`${project.title} Mobile`}
															className="w-full object-cover"
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								</Reveal>
							)}

							{/* Documentation */}
							{project.documentation && (
								<Reveal delay={0.25}>
									<div className="p-6 rounded-lg border border-white/5 bg-white/[0.02]">
										<div className="flex items-center gap-3 mb-4">
											<Terminal className="w-4 h-4 text-green-400" />
											<span className="font-mono text-xs text-white/40">DOCUMENTATION</span>
										</div>
										<p className="text-white/50 text-sm leading-relaxed">
											{project.documentation}
										</p>
									</div>
								</Reveal>
							)}

							{/* Challenges & Solutions */}
							{project.challenges && (
								<Reveal delay={0.3}>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
											<div className="flex items-center gap-2 mb-3">
												<Lightbulb size={14} className="text-yellow-400" />
												<span className="font-mono text-xs text-white/40">CHALLENGES</span>
											</div>
											<div className="space-y-2">
												{project.challenges.map((c, i) => (
													<div key={i} className="flex items-start gap-2">
														<div className="w-1 h-1 bg-yellow-400/50 rounded-full mt-2" />
														<span className="text-white/40 text-xs">{c}</span>
													</div>
												))}
											</div>
										</div>
										{project.solutions && (
											<div className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
												<div className="flex items-center gap-2 mb-3">
													<Wrench size={14} className="text-green-400" />
													<span className="font-mono text-xs text-white/40">SOLUTIONS</span>
												</div>
												<div className="space-y-2">
													{project.solutions.map((s, i) => (
														<div key={i} className="flex items-start gap-2">
															<div className="w-1 h-1 bg-green-400/50 rounded-full mt-2" />
															<span className="text-white/40 text-xs">{s}</span>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								</Reveal>
							)}
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Tech stack */}
							<Reveal delay={0.2}>
								<div className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
									<div className="font-mono text-xs text-white/30 tracking-wider mb-4">
										TECH_STACK
									</div>
									<div className="flex flex-wrap gap-1.5">
										{project.techStack?.map((tech, i) => (
											<span
												key={i}
												className="px-2 py-1 text-xs font-mono text-white/50 border border-white/10 rounded bg-white/[0.02]"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</Reveal>

							{/* Features */}
							{project.features && (
								<Reveal delay={0.25}>
									<div className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
										<div className="font-mono text-xs text-white/30 tracking-wider mb-4">
											FEATURES
										</div>
										<div className="space-y-2">
											{project.features.map((feature, i) => (
												<div key={i} className="flex items-start gap-2">
													<div className="w-1.5 h-1.5 bg-green-400/50 rounded-full mt-1.5" />
													<span className="text-white/50 text-xs">{feature}</span>
												</div>
											))}
										</div>
									</div>
								</Reveal>
							)}
						</div>
					</div>
				</div>
			</section>
		</PageLayout>
	);
};

export default ProjectDetail;
