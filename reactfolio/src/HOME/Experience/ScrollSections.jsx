import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
	Code2, Server, Database, Cloud, ExternalLink,
	Cpu, Globe, Layers, Zap, ArrowRight, Terminal,
	GitBranch, Box, Github
} from "lucide-react";
import { useGame } from "./GameUI";
import FooterAvatar from "./FooterAvatar";
import {
	HOME_FEATURED,
	TIER_META,
	getTechMeta,
	iconUrl,
	buildTechToProjects,
	groupByTier,
} from "../../PROJECTS/data/techMeta";
import { projectsData } from "../../PROJECTS/data/projects";
import CTASection from "../../components/CTASection";

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
		},
		{
			icon: Server,
			title: "Backend & API Design",
			description: "RESTful services, real-time systems, authentication flows, and API architecture.",
			tech: ["Node.js", "Express", "GraphQL", "Socket.io", "JWT"],
		},
		{
			icon: Database,
			title: "Data & Infrastructure",
			description: "Database design, caching strategies, containerization, and deployment pipelines.",
			tech: ["PostgreSQL", "MongoDB", "Redis", "Docker", "CI/CD"],
		},
		{
			icon: Cloud,
			title: "Systems Architecture",
			description: "Microservices patterns, scalable designs, cloud infrastructure, and monitoring.",
			tech: ["AWS", "Linux", "Nginx", "Microservices", "Monitoring"],
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
							<div className="group relative p-6 md:p-8 rounded-lg border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-green-400/30 hover:bg-white/[0.04]">
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
			title: "Trofficient",
			description: "Transit intelligence for Ghana's trotro network — real-time tracking, dynamic pricing, and mobile-money payments.",
			tech: ["React Native", "Node.js", "Socket.io", "PostgreSQL"],
			image: null,
			id: "trofficient",
		},
		{
			title: "AI-SME",
			description: "AI-powered BI for small businesses. Natural-language assistant grounded in real sales, inventory, and expense data.",
			tech: ["React", "TypeScript", "Node.js", "MongoDB"],
			image: null,
			id: "ai-sme",
		},
		{
			title: "Captivating Home Trade",
			description: "Production e-commerce platform for a live retail business — paid client work moving real inventory.",
			tech: ["React", "Node.js", "Express", "MongoDB"],
			image: null,
			id: "captivating-home-trade",
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

// One tech chip — logo + name, sized by tier prominence. Click navigates
// to the first project that used it (if any).
function TechChip({ name, projects, prominence }) {
	const navigate = useNavigate();
	const meta = getTechMeta(name);
	const icon = iconUrl(meta.iconSlug);
	const target = projects[0];

	// Visual treatment scaled by tier prominence (1.0 = daily, 0.4 = explored)
	const isLarge = prominence >= 0.9;
	const isMed = prominence >= 0.6 && prominence < 0.9;

	const sizeClass = isLarge
		? "px-3.5 py-2 text-sm gap-2.5"
		: isMed
			? "px-3 py-1.5 text-xs gap-2"
			: "px-2.5 py-1 text-[11px] gap-1.5";

	const textClass = isLarge
		? "text-white/90"
		: isMed
			? "text-white/70"
			: "text-white/40";

	const borderClass = isLarge
		? "border-white/15 hover:border-green-400/40"
		: isMed
			? "border-white/10 hover:border-green-400/30"
			: "border-white/5 hover:border-green-400/20";

	const iconSize = isLarge ? 20 : isMed ? 16 : 14;

	const title = target
		? `${name} — used in ${target.title}${projects.length > 1 ? ` (+${projects.length - 1} more)` : ""}`
		: name;

	return (
		<button
			type="button"
			onClick={() => target && navigate(`/projects/${target.slug}`)}
			disabled={!target}
			title={title}
			className={`group inline-flex items-center font-mono rounded-md border bg-white/[0.02] transition-all duration-300 ${sizeClass} ${textClass} ${borderClass} ${target ? "cursor-pointer hover:bg-white/[0.04]" : "cursor-default opacity-90"}`}
		>
			{icon ? (
				<img
					src={icon}
					alt=""
					width={iconSize}
					height={iconSize}
					loading="lazy"
					className="shrink-0"
				/>
			) : (
				<span
					className="shrink-0 rounded-full bg-white/10"
					style={{ width: iconSize - 4, height: iconSize - 4 }}
				/>
			)}
			<span className="whitespace-nowrap">{name}</span>
		</button>
	);
}

function TierRow({ tier, techs, techToProjects, prominence, delay }) {
	if (!techs.length) return null;
	return (
		<Reveal delay={delay}>
			<div className="mb-8">
				<div className="flex items-baseline gap-3 mb-3 flex-wrap">
					<div className="font-mono text-green-400/70 text-xs tracking-[0.3em]">
						// {TIER_META[tier].label}
					</div>
					<div className="font-mono text-[11px] text-white/30">
						{TIER_META[tier].blurb}
					</div>
				</div>
				<div className="flex flex-wrap gap-2">
					{techs.map((name) => (
						<TechChip
							key={name}
							name={name}
							projects={techToProjects[name] || []}
							prominence={prominence}
						/>
					))}
				</div>
			</div>
		</Reveal>
	);
}

function SkillsSection() {
	const navigate = useNavigate();
	const techToProjects = useMemo(
		() => buildTechToProjects(projectsData),
		[]
	);
	const tiers = useMemo(() => groupByTier(HOME_FEATURED), []);

	return (
		<section className="py-24 px-6 md:px-12">
			<div className="max-w-5xl mx-auto">
				<SectionHeader
					label="// TECH_STACK"
					title="Tools & Technologies"
					subtitle="Grouped by how often it lands in a commit. Click any to jump to a project where it shipped."
				/>

				<TierRow
					tier="daily"
					techs={tiers.daily}
					techToProjects={techToProjects}
					prominence={1.0}
					delay={0}
				/>
				<TierRow
					tier="shipped"
					techs={tiers.shipped}
					techToProjects={techToProjects}
					prominence={0.7}
					delay={0.1}
				/>
				<TierRow
					tier="explored"
					techs={tiers.explored}
					techToProjects={techToProjects}
					prominence={0.4}
					delay={0.2}
				/>

				<Reveal delay={0.3}>
					<div className="mt-10">
						<button
							onClick={() => navigate("/stack")}
							className="font-mono text-sm text-white/40 hover:text-green-400 transition-colors tracking-wider inline-flex items-center gap-2"
						>
							SEE_LIVE_GITHUB_BREAKDOWN
							<ArrowRight size={14} />
						</button>
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
						<div className="mt-4">
							<FooterAvatar />
						</div>
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
								{ href: "mailto:lesliepaulajayi@gmail.com" },
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
							href="mailto:lesliepaulajayi@gmail.com"
							className="text-white/25 text-xs font-mono hover:text-green-400 transition-colors"
						>
							lesliepaulajayi@gmail.com
						</a>
					</div>
				</div>

				<div className="h-px bg-white/5 mb-6" />

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
			<ExpertiseSection />

			<div className="max-w-6xl mx-auto px-6 md:px-12">
				<div className="h-px bg-white/10" />
			</div>

			<ProjectsSection />

			<div className="max-w-6xl mx-auto px-6 md:px-12">
				<div className="h-px bg-white/10" />
			</div>

			<SkillsSection />

			<div className="max-w-6xl mx-auto px-6 md:px-12">
				<div className="h-px bg-green-400/20" />
			</div>

			<CTASection bordered={false} />
			<FooterSection />
		</div>
	);
}
