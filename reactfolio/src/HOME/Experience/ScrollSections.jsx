import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
	Code2, Server, Database, Cloud, ExternalLink,
	Cpu, Globe, Layers, Zap, ArrowRight, Terminal,
	GitBranch, Box, Github
} from "lucide-react";
import { useGame } from "./GameUI";

// Reveal animation wrapper
function Reveal({ children, delay = 0, className = "" }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 40 }}
			animate={isInView ? { opacity: 1, y: 0 } : {}}
			transition={{ duration: 0.7, delay, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// Section header
function SectionHeader({ label, title, subtitle }) {
	return (
		<Reveal>
			<div className="mb-12 md:mb-16">
				<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-3">
					{label}
				</div>
				<h2
					className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
					style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
				>
					{title}
				</h2>
				{subtitle && (
					<p className="text-white/40 text-base md:text-lg max-w-2xl">
						{subtitle}
					</p>
				)}
			</div>
		</Reveal>
	);
}

// Engineering expertise section
function ExpertiseSection() {
	const domains = [
		{
			icon: Code2,
			title: "Frontend Engineering",
			description: "React ecosystems, animation systems, responsive interfaces that perform at scale.",
			tech: ["React", "TypeScript", "Tailwind", "Framer Motion", "Three.js"],
			accent: "from-green-400/20 to-emerald-400/5",
			borderAccent: "hover:border-green-400/30",
		},
		{
			icon: Server,
			title: "Backend & API Design",
			description: "RESTful services, real-time systems, authentication flows, and API architecture.",
			tech: ["Node.js", "Express", "GraphQL", "Socket.io", "JWT"],
			accent: "from-cyan-400/20 to-blue-400/5",
			borderAccent: "hover:border-cyan-400/30",
		},
		{
			icon: Database,
			title: "Data & Infrastructure",
			description: "Database design, caching strategies, containerization, and deployment pipelines.",
			tech: ["PostgreSQL", "MongoDB", "Redis", "Docker", "CI/CD"],
			accent: "from-purple-400/20 to-violet-400/5",
			borderAccent: "hover:border-purple-400/30",
		},
		{
			icon: Cloud,
			title: "Systems Architecture",
			description: "Microservices patterns, scalable designs, cloud infrastructure, and monitoring.",
			tech: ["AWS", "Linux", "Nginx", "Microservices", "Monitoring"],
			accent: "from-orange-400/20 to-amber-400/5",
			borderAccent: "hover:border-orange-400/30",
		},
	];

	return (
		<section className="py-24 px-6 md:px-12">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					label="// EXPERTISE"
					title="Engineering Domains"
					subtitle="Full-stack capability with depth, not just breadth."
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{domains.map((domain, i) => (
						<Reveal key={domain.title} delay={i * 0.1}>
							<div
								className={`group relative p-6 md:p-8 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 ${domain.borderAccent} hover:bg-white/[0.04]`}
							>
								<div
									className={`absolute inset-0 bg-gradient-to-br ${domain.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`}
								/>
								<div className="relative z-10">
									<domain.icon className="w-6 h-6 text-green-400 mb-4" />
									<h3 className="text-xl font-bold text-white mb-2 font-heading">
										{domain.title}
									</h3>
									<p className="text-white/40 text-sm mb-4 leading-relaxed">
										{domain.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{domain.tech.map((t) => (
											<span
												key={t}
												className="px-2 py-1 text-xs font-mono text-white/50 border border-white/10 rounded"
											>
												{t}
											</span>
										))}
									</div>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

// Featured projects section
function ProjectsSection() {
	const navigate = useNavigate();
	const { unlock } = useGame();
	const projects = [
		{
			title: "E-Commerce Platform",
			description: "Full-stack marketplace with payment integration, real-time inventory, and admin dashboard.",
			tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
			image: null,
			id: "ecommerce",
		},
		{
			title: "Restaurant Management",
			description: "Order management system with real-time updates, analytics dashboard, and POS integration.",
			tech: ["Next.js", "Express", "MongoDB", "Socket.io"],
			image: null,
			id: "restaurant",
		},
		{
			title: "Task Management API",
			description: "RESTful API with JWT auth, role-based access, and comprehensive documentation.",
			tech: ["Node.js", "Express", "MongoDB", "JWT"],
			image: null,
			id: "taskmanager",
		},
	];

	return (
		<section className="py-24 px-6 md:px-12">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					label="// SELECTED_WORK"
					title="Featured Projects"
					subtitle="Real systems, shipped and running."
				/>

				<div className="space-y-6">
					{projects.map((project, i) => (
						<Reveal key={project.title} delay={i * 0.1}>
							<div
								onClick={() => { unlock("curious"); navigate(`/projects/${project.id}`); }}
								className="group relative p-6 md:p-8 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-400/20 transition-all duration-500 cursor-pointer"
							>
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<span className="font-mono text-green-400/50 text-xs">
												{String(i + 1).padStart(2, "0")}
											</span>
											<h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors font-heading">
												{project.title}
											</h3>
										</div>
										<p className="text-white/40 text-sm mb-4 md:mb-0 md:max-w-lg">
											{project.description}
										</p>
									</div>

									<div className="flex items-center gap-4">
										<div className="flex flex-wrap gap-2">
											{project.tech.map((t) => (
												<span
													key={t}
													className="px-2 py-1 text-xs font-mono text-white/40 border border-white/10 rounded"
												>
													{t}
												</span>
											))}
										</div>
										<ArrowRight
											size={20}
											className="text-white/20 group-hover:text-green-400 group-hover:translate-x-1 transition-all"
										/>
									</div>
								</div>
							</div>
						</Reveal>
					))}
				</div>

				<Reveal delay={0.3}>
					<div className="mt-8 text-center">
						<button
							onClick={() => navigate("/projects")}
							className="font-mono text-sm text-white/40 hover:text-green-400 transition-colors tracking-wider inline-flex items-center gap-2"
						>
							VIEW_ALL_PROJECTS
							<ArrowRight size={14} />
						</button>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

// Skills grid
function SkillsSection() {
	const skills = [
		{ name: "React", level: 95 },
		{ name: "Node.js", level: 90 },
		{ name: "TypeScript", level: 85 },
		{ name: "PostgreSQL", level: 85 },
		{ name: "MongoDB", level: 80 },
		{ name: "Docker", level: 75 },
		{ name: "Python", level: 75 },
		{ name: "AWS", level: 70 },
		{ name: "GraphQL", level: 70 },
		{ name: "Redis", level: 65 },
		{ name: "Three.js", level: 60 },
		{ name: "Linux", level: 75 },
	];

	return (
		<section className="py-24 px-6 md:px-12">
			<div className="max-w-6xl mx-auto">
				<SectionHeader
					label="// TECH_STACK"
					title="Tools & Technologies"
					subtitle="Proficiency earned through production use, not tutorials."
				/>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{skills.map((skill, i) => (
						<Reveal key={skill.name} delay={i * 0.05}>
							<div className="group p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:border-green-400/20 transition-all duration-300">
								<div className="flex items-center justify-between mb-2">
									<span className="font-mono text-sm text-white/80">
										{skill.name}
									</span>
									<span className="font-mono text-xs text-white/30">
										{skill.level}%
									</span>
								</div>
								<div className="h-1 bg-white/5 rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
										initial={{ width: 0 }}
										whileInView={{ width: `${skill.level}%` }}
										viewport={{ once: true }}
										transition={{
											duration: 1,
											delay: i * 0.05,
											ease: "easeOut",
										}}
									/>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}

// CTA Section
function CTASection() {
	const navigate = useNavigate();
	const { unlock } = useGame();

	return (
		<section className="py-32 px-6 md:px-12">
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
					<div className="flex flex-wrap gap-4 justify-center pointer-events-auto">
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

// Footer
function FooterSection() {
	const navigate = useNavigate();
	const { unlock } = useGame();

	return (
		<footer className="border-t border-white/5 pt-12 pb-8 px-6 md:px-12">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
					{/* Brand */}
					<div>
						<button onClick={() => navigate("/")} className="flex items-center gap-2 mb-3">
							<Terminal size={16} className="text-green-400" />
							<span className="text-white font-mono text-sm tracking-wider">
								LESLIE<span className="text-green-400">.DEV</span>
							</span>
						</button>
						<p className="text-white/25 text-xs leading-relaxed max-w-xs">
							Software Engineer building production-grade applications from database to deployment.
						</p>
					</div>

					{/* Nav */}
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

					{/* Social */}
					<div>
						<div className="font-mono text-[10px] text-white/20 tracking-widest mb-3">CONNECT</div>
						<div className="flex gap-2 mb-4">
							{[
								{ icon: Github, href: "https://github.com/Leslie-23" },
								{ href: "https://linkedin.com/in/leslie-paul-ajayi" },
								{ href: "mailto:leslieajayi27@gmail.com" },
							].map((item, i) => (
								<a
									key={i}
									href={item.href}
									target={item.href.startsWith("mailto") ? undefined : "_blank"}
									rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
									onClick={() => unlock("connected")}
									className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-green-400 hover:border-green-400/40 transition-all duration-300"
								>
									{item.icon ? <item.icon size={14} /> : <Globe size={14} />}
								</a>
							))}
						</div>
						<a
							href="mailto:leslieajayi27@gmail.com"
							className="text-white/25 text-xs font-mono hover:text-green-400 transition-colors"
						>
							leslieajayi27@gmail.com
						</a>
					</div>
				</div>

				<div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />

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

export default function ScrollSections() {
	return (
		<div
			id="experience-section"
			className="relative z-10 bg-[#0a0a0a]"
		>
			{/* Gradient transition from 3D scene */}
			<div className="h-32 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

			<ExpertiseSection />

			{/* Divider */}
			<div className="max-w-6xl mx-auto px-6 md:px-12">
				<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			</div>

			<ProjectsSection />

			<div className="max-w-6xl mx-auto px-6 md:px-12">
				<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
			</div>

			<SkillsSection />

			<div className="max-w-6xl mx-auto px-6 md:px-12">
				<div className="h-px bg-gradient-to-r from-transparent via-green-400/10 to-transparent" />
			</div>

			<CTASection />
			<FooterSection />
		</div>
	);
}
