import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
	Code2, Server, Database, Cloud, Shield, Terminal,
	Globe, Cpu, Zap, Brain, MapPin, GraduationCap,
	ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";

function Reveal({ children, delay = 0, className = "" }) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });
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

const About = () => {
	const navigate = useNavigate();

	const expertise = [
		{
			icon: Code2,
			title: "Frontend Engineering",
			skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
			accent: "green",
		},
		{
			icon: Server,
			title: "Backend & APIs",
			skills: ["Node.js", "Express", "GraphQL", "Socket.io", "JWT/OAuth2", "REST"],
			accent: "cyan",
		},
		{
			icon: Database,
			title: "Data & Storage",
			skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Firebase", "MySQL"],
			accent: "purple",
		},
		{
			icon: Cloud,
			title: "Infrastructure",
			skills: ["Docker", "AWS", "Nginx", "GitHub Actions", "CI/CD", "Linux"],
			accent: "orange",
		},
		{
			icon: Cpu,
			title: "Languages",
			skills: ["JavaScript", "TypeScript", "Python", "C++", "C#", "Java", "SQL"],
			accent: "blue",
		},
		{
			icon: Shield,
			title: "Security & Quality",
			skills: ["HTTPS/SSL", "CORS", "Input Validation", "Auth Patterns", "Testing", "Profiling"],
			accent: "red",
		},
	];

	const accentColors = {
		green: "text-green-400 border-green-400/20",
		cyan: "text-cyan-400 border-cyan-400/20",
		purple: "text-purple-400 border-purple-400/20",
		orange: "text-orange-400 border-orange-400/20",
		blue: "text-blue-400 border-blue-400/20",
		red: "text-red-400 border-red-400/20",
	};

	return (
		<PageLayout>
			{/* Hero section */}
			<section className="py-20 md:py-28 px-6 md:px-12">
				<div className="max-w-5xl mx-auto">
					<Reveal>
						<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-4">
							// ABOUT
						</div>
					</Reveal>

					<Reveal delay={0.1}>
						<h1
							className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
							style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
						>
							The engineer behind{" "}
							<span className="text-green-400">the code</span>
						</h1>
					</Reveal>

					<div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
						{/* Bio */}
						<div className="lg:col-span-3 space-y-6">
							<Reveal delay={0.2}>
								<div className="p-6 rounded-lg border border-white/5 bg-white/[0.02]">
									<div className="flex items-center gap-3 mb-4">
										<Terminal className="w-5 h-5 text-green-400" />
										<span className="font-mono text-sm text-white/60">~/about/bio</span>
									</div>
									<p className="text-white/70 leading-relaxed mb-4">
										I'm <span className="text-green-400 font-semibold">Leslie Paul Ajayi</span>,
										a Software Engineer based in Accra, Ghana. I build production-grade
										applications that merge clean architecture with thoughtful interfaces.
									</p>
									<p className="text-white/50 leading-relaxed mb-4">
										My background spans multiple languages and paradigms — from C++ and Java
										to JavaScript and Python — giving me a deep understanding of software
										engineering principles. I move fluidly between backend logic, API design,
										and frontend development with a focus on architectural integrity.
									</p>
									<p className="text-white/50 leading-relaxed">
										Currently studying Information Technology at Regional Maritime University
										while actively building and shipping software.
									</p>
								</div>
							</Reveal>

							<Reveal delay={0.3}>
								<div className="p-6 rounded-lg border border-white/5 bg-white/[0.02]">
									<div className="flex items-center gap-3 mb-4">
										<Brain className="w-5 h-5 text-green-400" />
										<span className="font-mono text-sm text-white/60">~/about/approach</span>
									</div>
									<h3 className="text-lg font-bold text-white mb-3">Engineering Philosophy</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{[
											"Clean Architecture",
											"Performance First",
											"Scalable Patterns",
											"Continuous Learning",
										].map((value) => (
											<div key={value} className="flex items-center gap-3">
												<div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
												<span className="text-white/50 text-sm">{value}</span>
											</div>
										))}
									</div>
								</div>
							</Reveal>
						</div>

						{/* Sidebar info */}
						<div className="lg:col-span-2 space-y-6">
							<Reveal delay={0.3}>
								<div className="p-6 rounded-lg border border-white/5 bg-white/[0.02]">
									<h3 className="font-mono text-xs text-white/40 tracking-wider mb-4">DETAILS</h3>
									<div className="space-y-4">
										{[
											{ icon: MapPin, label: "Location", value: "Accra, Ghana" },
											{ icon: GraduationCap, label: "Education", value: "Regional Maritime University" },
											{ icon: Globe, label: "Work", value: "Remote & On-site" },
											{ icon: Zap, label: "Status", value: "Available", highlight: true },
										].map((item) => (
											<div key={item.label} className="flex items-start gap-3">
												<item.icon size={16} className="text-white/30 mt-0.5" />
												<div>
													<div className="text-white/30 text-xs font-mono">{item.label}</div>
													<div className={item.highlight ? "text-green-400 text-sm" : "text-white/70 text-sm"}>
														{item.value}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</Reveal>

							<Reveal delay={0.4}>
								<div className="p-6 rounded-lg border border-green-400/10 bg-green-400/[0.03]">
									<p className="text-white/40 text-sm italic leading-relaxed">
										"I don't just write code — I architect systems that tell a story.
										Each project carries a fingerprint: disciplined, analytical, and
										forever curious."
									</p>
									<span className="text-green-400/50 text-xs font-mono mt-3 block">
										— leslie.dev
									</span>
								</div>
							</Reveal>
						</div>
					</div>
				</div>
			</section>

			{/* Technical Toolkit */}
			<section className="py-20 px-6 md:px-12">
				<div className="max-w-5xl mx-auto">
					<div className="max-w-5xl mx-auto px-6 md:px-12 mb-12">
						<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
					</div>

					<Reveal>
						<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-3">
							// TOOLKIT
						</div>
						<h2
							className="text-3xl md:text-4xl font-bold text-white mb-12 tracking-tight"
							style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
						>
							Technical Stack
						</h2>
					</Reveal>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{expertise.map((domain, i) => (
							<Reveal key={domain.title} delay={i * 0.08}>
								<div className={`p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:${accentColors[domain.accent].split(" ")[1]}`}>
									<div className="flex items-center gap-3 mb-4">
										<domain.icon size={18} className={accentColors[domain.accent].split(" ")[0]} />
										<h3 className="text-white font-semibold text-sm">{domain.title}</h3>
									</div>
									<div className="flex flex-wrap gap-1.5">
										{domain.skills.map((skill) => (
											<span
												key={skill}
												className="px-2 py-1 text-xs font-mono text-white/40 border border-white/8 rounded bg-white/[0.02]"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 px-6 md:px-12">
				<div className="max-w-5xl mx-auto">
					<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

					<Reveal>
						<div className="text-center">
							<h2
								className="text-2xl md:text-4xl font-bold text-white mb-4"
								style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
							>
								Want to work together?
							</h2>
							<p className="text-white/40 mb-8">Let's build something meaningful.</p>
							<div className="flex flex-wrap gap-4 justify-center">
								<button
									onClick={() => navigate("/contact")}
									className="group px-8 py-3 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-sm tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm inline-flex items-center gap-3"
								>
									START_CONVERSATION
									<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
								</button>
								<button
									onClick={() => navigate("/projects")}
									className="px-8 py-3 border border-white/10 text-white/50 font-mono text-sm tracking-wider hover:border-white/30 hover:text-white/80 transition-all duration-300 rounded-sm"
								>
									VIEW_PROJECTS
								</button>
							</div>
						</div>
					</Reveal>
				</div>
			</section>
		</PageLayout>
	);
};

export default About;
