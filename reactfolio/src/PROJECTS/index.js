import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
	ExternalLink, Github, ArrowRight, Code2, Database,
	Cloud, Coffee, Zap, Monitor, Palette, Filter
} from "lucide-react";
import PageLayout from "../components/PageLayout";

function Reveal({ children, delay = 0, className = "" }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });
	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.6, delay, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

const projects = [
	{
		slug: "e-commerce-platform",
		title: "E-Commerce Platform",
		description: "Full-stack MERN e-commerce with real-time inventory, Stripe payments, and admin dashboard.",
		tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
		status: "Live",
		category: "Full Stack",
		icon: Database,
		liveLink: "https://e-comm-app-517g.vercel.app/",
		githubLink: "https://github.com/Leslie-23/eComm-app",
		image: "/images/webScreenshots/e-commerce-web.png",
	},
	{
		slug: "restaurant-website",
		title: "Restaurant Website",
		description: "High-end restaurant platform with in-house ordering, reservations, and admin management.",
		tech: ["React", "Node.js", "MongoDB", "Tailwind"],
		status: "Live",
		category: "Full Stack",
		icon: Coffee,
		liveLink: "https://grilli-restaurant.vercel.app/",
		githubLink: "https://github.com/Leslie-23/grilli",
		image: "/images/webScreenshots/grilli-web.png",
	},
	{
		slug: "task-management-app",
		title: "Task Management App",
		description: "Collaborative task management with drag-and-drop, real-time updates, and team features.",
		tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
		status: "In Dev",
		category: "Web App",
		icon: Code2,
		liveLink: null,
		githubLink: "https://github.com",
	},
	{
		slug: "weather-dashboard",
		title: "Weather Dashboard",
		description: "Real-time weather app with interactive maps, forecasts, and location-based services.",
		tech: ["Vue.js", "Express", "Redis", "Mapbox"],
		status: "Live",
		category: "Frontend",
		icon: Cloud,
	},
	{
		slug: "fitness-tracker",
		title: "Fitness Tracker",
		description: "Cross-platform fitness app with workout plans, progress tracking, and social features.",
		tech: ["React Native", "Firebase", "Redux", "Expo"],
		status: "Live",
		category: "Mobile",
		icon: Zap,
	},
	{
		slug: "social-media-analytics",
		title: "Social Media Analytics",
		description: "Analytics dashboard aggregating multi-platform social data with real-time insights.",
		tech: ["Angular", "Python", "MySQL", "D3.js"],
		status: "In Dev",
		category: "Data",
		icon: Monitor,
	},
	{
		slug: "portfolio-website",
		title: "Portfolio Website",
		description: "Immersive 3D portfolio with Three.js, scroll-driven animations, and terminal aesthetic.",
		tech: ["React", "Three.js", "Tailwind", "Framer Motion"],
		status: "Live",
		category: "Design",
		icon: Palette,
	},
];

const categories = ["All", ...new Set(projects.map((p) => p.category))];

const Projects = () => {
	const navigate = useNavigate();
	const [activeCategory, setActiveCategory] = useState("All");

	const filtered = activeCategory === "All"
		? projects
		: projects.filter((p) => p.category === activeCategory);

	return (
		<PageLayout>
			<section className="py-20 md:py-28 px-6 md:px-12">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<Reveal>
						<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-4">
							// PROJECTS
						</div>
						<h1
							className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
							style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
						>
							Selected <span className="text-green-400">work</span>
						</h1>
						<p className="text-white/40 text-lg max-w-xl mb-12">
							Real systems, designed, built, and shipped.
						</p>
					</Reveal>

					{/* Category filter */}
					<Reveal delay={0.1}>
						<div className="flex flex-wrap gap-2 mb-12">
							<Filter size={14} className="text-white/20 mt-2 mr-1" />
							{categories.map((cat) => (
								<button
									key={cat}
									onClick={() => setActiveCategory(cat)}
									className={`px-4 py-1.5 font-mono text-xs tracking-wider rounded-sm border transition-all duration-300 ${
										activeCategory === cat
											? "border-green-400/50 text-green-400 bg-green-400/10"
											: "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
									}`}
								>
									{cat.toUpperCase()}
								</button>
							))}
						</div>
					</Reveal>

					{/* Projects grid */}
					<div className="space-y-4">
						<AnimatePresence mode="wait">
							{filtered.map((project, i) => (
								<Reveal key={project.slug} delay={i * 0.05}>
									<div
										onClick={() =>
											navigate(`/projects/${project.slug}`, {
												state: { project },
											})
										}
										className="group p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-400/20 transition-all duration-500 cursor-pointer"
									>
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-2">
													<span className="font-mono text-green-400/40 text-xs">
														{String(i + 1).padStart(2, "0")}
													</span>
													<project.icon size={16} className="text-white/30" />
													<h3 className="text-lg md:text-xl font-bold text-white group-hover:text-green-400 transition-colors">
														{project.title}
													</h3>
													<span className={`ml-2 px-2 py-0.5 font-mono text-[10px] tracking-wider rounded-sm ${
														project.status === "Live"
															? "text-green-400 border border-green-400/30"
															: "text-yellow-400 border border-yellow-400/30"
													}`}>
														{project.status.toUpperCase()}
													</span>
												</div>
												<p className="text-white/40 text-sm mb-3 md:mb-0 md:max-w-lg pl-14">
													{project.description}
												</p>
											</div>

											<div className="flex items-center gap-4 pl-14 md:pl-0">
												<div className="flex flex-wrap gap-1.5">
													{project.tech.slice(0, 4).map((t) => (
														<span
															key={t}
															className="px-2 py-0.5 text-[11px] font-mono text-white/30 border border-white/8 rounded"
														>
															{t}
														</span>
													))}
												</div>

												<div className="flex items-center gap-2">
													{project.githubLink && (
														<a
															href={project.githubLink}
															target="_blank"
															rel="noopener noreferrer"
															onClick={(e) => e.stopPropagation()}
															className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-green-400 hover:border-green-400/50 transition-all"
														>
															<Github size={14} />
														</a>
													)}
													{project.liveLink && (
														<a
															href={project.liveLink}
															target="_blank"
															rel="noopener noreferrer"
															onClick={(e) => e.stopPropagation()}
															className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-green-400 hover:border-green-400/50 transition-all"
														>
															<ExternalLink size={14} />
														</a>
													)}
													<ArrowRight
														size={18}
														className="text-white/10 group-hover:text-green-400 group-hover:translate-x-1 transition-all ml-2"
													/>
												</div>
											</div>
										</div>
									</div>
								</Reveal>
							))}
						</AnimatePresence>
					</div>
				</div>
			</section>
		</PageLayout>
	);
};

export default Projects;
