import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
	ExternalLink, Github, ArrowRight, Filter,
	Cpu, Bus, BrainCircuit, GraduationCap, Sparkles, ShoppingBag,
	Package, BookOpen, Boxes, Coffee, QrCode, Trophy, Wallet, Cloud
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
		slug: "osafrica",
		title: "osAfrica",
		description: "AI-native operating system in active development. Treats AI as a first-class OS primitive, not a bolted-on assistant.",
		tech: ["Python", "Systems", "LLM Runtimes"],
		status: "In Dev",
		category: "Systems",
		icon: Cpu,
		liveLink: null,
		githubLink: "https://github.com/Leslie-23/osAfrica",
	},
	{
		slug: "trofficient",
		title: "Trofficient",
		description: "Transit intelligence for Ghana's trotro network — real-time tracking, dynamic pricing, and mobile-money payments.",
		tech: ["React Native", "Node.js", "Socket.io", "PostgreSQL"],
		status: "Live",
		category: "Full Stack",
		icon: Bus,
		liveLink: "https://trofficient-live.vercel.app",
		githubLink: null,
	},
	{
		slug: "ai-sme",
		title: "AI-SME",
		description: "AI-powered BI for small businesses. Natural-language assistant grounded in real sales, inventory, and expense data.",
		tech: ["React", "Node.js", "TypeScript", "MongoDB"],
		status: "Live",
		category: "Full Stack",
		icon: BrainCircuit,
		liveLink: "https://intellexa-sme.vercel.app",
		githubLink: "https://github.com/Leslie-23/ai-sme",
	},
	{
		slug: "campus-connect",
		title: "CampusConnect",
		description: "University social and collaboration platform — chats, events, academic updates, and community in one space.",
		tech: ["React", "Node.js", "MongoDB", "Socket.io"],
		status: "In Dev",
		category: "Full Stack",
		icon: GraduationCap,
		liveLink: null,
		githubLink: "https://github.com/Campus-Connect-v1/campus-connect",
	},
	{
		slug: "sellis",
		title: "Sellis",
		description: "Production spa booking and business platform — live, paid client work on a custom domain.",
		tech: ["React", "Node.js", "Express", "MongoDB"],
		status: "Live",
		category: "Full Stack",
		icon: Sparkles,
		liveLink: "https://www.sellisspa.com",
		githubLink: null,
	},
	{
		slug: "captivating-home-trade",
		title: "Captivating Home Trade",
		description: "E-commerce and operations platform for a live retail business — paid client work moving real inventory.",
		tech: ["React", "Node.js", "Express", "MongoDB"],
		status: "Live",
		category: "Full Stack",
		icon: ShoppingBag,
		liveLink: "https://captivatinghometrade.com",
		githubLink: null,
	},
	{
		slug: "npm-git-helper",
		title: "npm-git-helper",
		description: "Published npm package — Git workflow tooling that wraps the repetitive bits of day-to-day Git.",
		tech: ["Node.js", "JavaScript", "CLI"],
		status: "Live",
		category: "Tooling",
		icon: Package,
		liveLink: "https://www.npmjs.com/package/npm-git-helper",
		githubLink: "https://github.com/Leslie-23/git-helper",
	},
	{
		slug: "school-management-system",
		title: "PAL School Management",
		description: "MERN admin platform for schools — students, teachers, attendance, evaluations, and three-role UX.",
		tech: ["React", "Node.js", "MongoDB", "Redux"],
		status: "Live",
		category: "Full Stack",
		icon: BookOpen,
		liveLink: "https://school-management-one-dusky.vercel.app",
		githubLink: "https://github.com/Leslie-23/School-Management-System",
	},
	{
		slug: "openstock",
		title: "OpenStock",
		description: "Self-hosted inventory and stock management — products, variants, suppliers — built on Nuxt 4 + Cloudflare.",
		tech: ["Nuxt 4", "Vue", "Cloudflare", "TypeScript"],
		status: "Live",
		category: "Full Stack",
		icon: Boxes,
		liveLink: "https://openstock-sand.vercel.app",
		githubLink: "https://github.com/Leslie-23/openstock",
	},
	{
		slug: "grilli",
		title: "Grilli",
		description: "High-end restaurant platform — reservations, in-house ordering, and admin tooling on the MERN stack.",
		tech: ["React", "Node.js", "MongoDB", "Tailwind"],
		status: "Live",
		category: "Full Stack",
		icon: Coffee,
		liveLink: "https://web-plusplus.vercel.app",
		githubLink: "https://github.com/leslie-23/web-plusplus",
		image: "/images/webScreenshots/grilli-web.png",
	},
	{
		slug: "attendance-tracker",
		title: "Employee Attendance Tracker",
		description: "QR-based clock-in/out for small shops, geofenced server-side. Replaces paper sheets and biometric hardware.",
		tech: ["Node.js", "Express", "Geolocation"],
		status: "Live",
		category: "Full Stack",
		icon: QrCode,
		liveLink: "https://employee-attendance-tracker-nine.vercel.app",
		githubLink: "https://github.com/Leslie-23/employeeAttendanceTracker",
	},
	{
		slug: "dev-experience",
		title: "Developer Motivation App",
		description: "Coding challenges, gamification, and analytics — OAuth via GitHub/Google with daily challenge reminders.",
		tech: ["React", "Node.js", "MongoDB", "OAuth"],
		status: "Live",
		category: "Full Stack",
		icon: Trophy,
		liveLink: "https://leslie23-dev-experience2k25.netlify.app",
		githubLink: "https://github.com/Leslie-23/DEV-experience",
	},
	{
		slug: "expense-tracker",
		title: "Expense Tracker",
		description: "Lightweight income/expense React component with categories and running totals.",
		tech: ["React", "JavaScript"],
		status: "Live",
		category: "Frontend",
		icon: Wallet,
		liveLink: "https://income-expense-tracker123.netlify.app",
		githubLink: "https://github.com/Leslie-23/expense-tracker",
	},
	{
		slug: "weather-app",
		title: "Weather App",
		description: "Multi-country live weather built on WeatherAPI with auto-refresh and a responsive UI.",
		tech: ["React", "Axios", "WeatherAPI"],
		status: "Live",
		category: "Frontend",
		icon: Cloud,
		liveLink: "https://weather-app-vert-eta.vercel.app",
		githubLink: "https://github.com/Leslie-23/weatherApp",
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
