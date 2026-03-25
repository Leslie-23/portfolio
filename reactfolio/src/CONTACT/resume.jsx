import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
	Download, Mail, Phone, MapPin, ExternalLink, Calendar,
	Award, Code2, Database, Smartphone, Terminal, Github,
	ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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

const Resume = () => {
	const navigate = useNavigate();

	const skills = {
		frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion"],
		backend: ["Node.js", "Express", "GraphQL", "Socket.io", "REST APIs", "JWT/OAuth"],
		data: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase", "Prisma"],
		infra: ["Docker", "AWS", "GitHub Actions", "Nginx", "Linux", "CI/CD"],
		languages: ["JavaScript", "TypeScript", "Python", "C++", "C#", "Java", "SQL"],
	};

	const projects = [
		{
			title: "Transportation App (Spintex Area)",
			description: "React Native frontend with Node.js backend and MySQL database. Real-time bus tracking with MTN Mobile Money integration.",
			tech: ["React Native", "Node.js", "MySQL", "Mobile Money API"],
		},
		{
			title: "E-Commerce Platform",
			description: "Full-stack marketplace with Stripe payments, real-time inventory, admin dashboard, and OTP authentication.",
			tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
		},
		{
			title: "Campus Connect",
			description: "University social network with real-time location sharing, activity feeds, and WebSocket communication.",
			tech: ["React", "Node.js", "MongoDB", "WebSockets"],
		},
		{
			title: "Restaurant Management Platform",
			description: "Full-stack ordering system with reservations, menu management, and payment integration.",
			tech: ["React", "Node.js", "MongoDB", "Tailwind"],
		},
	];

	const education = [
		{
			institution: "Regional Maritime University",
			period: "2022 – 2026",
			highlights: [
				"Best in IT Project Management (Prof. Emmanuel Arhin)",
				"Best in Data Structures (Prof. Eric Johnson)",
			],
		},
		{
			institution: "Udemy — Professional Development",
			period: "2023",
			highlights: [
				"Web Development Bootcamp — Colt Steele",
				"Mobile App Development with React Native — Maximilian Schwarzmüller",
			],
		},
	];

	return (
		<PageLayout>
			<section className="py-16 md:py-24 px-6 md:px-12">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<Reveal>
						<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-4">
							// RESUME
						</div>
						<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
							<div>
								<h1
									className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight"
									style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
								>
									Leslie Paul <span className="text-green-400">Ajayi</span>
								</h1>
								<p className="text-white/50 text-lg">Software Engineer</p>
							</div>
							<button
								onClick={() => alert("PDF download coming soon — resume content is displayed below.")}
								className="group px-6 py-2.5 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-xs tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm inline-flex items-center gap-2 self-start"
							>
								<Download size={14} />
								DOWNLOAD_PDF
							</button>
						</div>
					</Reveal>

					{/* Contact bar */}
					<Reveal delay={0.1}>
						<div className="flex flex-wrap gap-6 p-5 rounded-lg border border-white/5 bg-white/[0.02] mb-12 font-mono text-xs">
							{[
								{ icon: MapPin, value: "Accra, Ghana" },
								{ icon: Mail, value: "leslieajayi27@gmail.com", href: "mailto:leslieajayi27@gmail.com" },
								{ icon: Phone, value: "+233 27 123 7965", href: "tel:+233271237965" },
								{ icon: Github, value: "github.com/Leslie-23", href: "https://github.com/Leslie-23" },
							].map((item) => (
								<div key={item.value} className="flex items-center gap-2 text-white/40">
									<item.icon size={13} className="text-green-400/60" />
									{item.href ? (
										<a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
											{item.value}
										</a>
									) : (
										<span>{item.value}</span>
									)}
								</div>
							))}
						</div>
					</Reveal>

					{/* Summary */}
					<Reveal delay={0.15}>
						<div className="mb-12">
							<div className="font-mono text-xs text-green-400/40 tracking-wider mb-3">SUMMARY</div>
							<p className="text-white/50 leading-relaxed">
								Software Engineer with expertise in full-stack development, system architecture,
								and production-grade applications. Strong foundation across multiple languages and
								paradigms with hands-on experience building scalable web and mobile solutions.
								Focused on clean architecture, performance, and real-world impact.
							</p>
						</div>
					</Reveal>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main column */}
						<div className="lg:col-span-2 space-y-10">
							{/* Projects / Experience */}
							<Reveal delay={0.2}>
								<div>
									<div className="font-mono text-xs text-green-400/40 tracking-wider mb-6">
										PROJECTS & EXPERIENCE
									</div>
									<div className="space-y-4">
										{projects.map((project, i) => (
											<div
												key={i}
												className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-green-400/10 transition-all duration-300"
											>
												<h3 className="text-white font-semibold text-sm mb-2">{project.title}</h3>
												<p className="text-white/40 text-xs leading-relaxed mb-3">
													{project.description}
												</p>
												<div className="flex flex-wrap gap-1.5">
													{project.tech.map((t) => (
														<span
															key={t}
															className="px-2 py-0.5 text-[10px] font-mono text-white/30 border border-white/8 rounded"
														>
															{t}
														</span>
													))}
												</div>
											</div>
										))}
									</div>
								</div>
							</Reveal>

							{/* Education */}
							<Reveal delay={0.25}>
								<div>
									<div className="font-mono text-xs text-green-400/40 tracking-wider mb-6">
										EDUCATION
									</div>
									<div className="space-y-4">
										{education.map((edu, i) => (
											<div
												key={i}
												className="p-5 rounded-lg border border-white/5 bg-white/[0.02]"
											>
												<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
													<h3 className="text-white font-semibold text-sm">{edu.institution}</h3>
													<div className="flex items-center gap-1 text-green-400/60 font-mono text-xs mt-1 sm:mt-0">
														<Calendar size={12} />
														<span>{edu.period}</span>
													</div>
												</div>
												<div className="space-y-1.5">
													{edu.highlights.map((h, j) => (
														<div key={j} className="flex items-start gap-2">
															<Award size={12} className="text-green-400/40 mt-0.5" />
															<span className="text-white/40 text-xs">{h}</span>
														</div>
													))}
												</div>
											</div>
										))}
									</div>
								</div>
							</Reveal>
						</div>

						{/* Skills sidebar */}
						<div className="space-y-6">
							{Object.entries(skills).map(([category, items], i) => (
								<Reveal key={category} delay={0.2 + i * 0.05}>
									<div className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
										<div className="font-mono text-[10px] text-white/30 tracking-wider mb-3">
											{category.toUpperCase()}
										</div>
										<div className="flex flex-wrap gap-1.5">
											{items.map((skill) => (
												<span
													key={skill}
													className="px-2 py-1 text-xs font-mono text-white/50 border border-white/10 rounded bg-white/[0.02]"
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

					{/* CTA */}
					<Reveal delay={0.3}>
						<div className="mt-16 pt-12 border-t border-white/5 text-center">
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
		</PageLayout>
	);
};

export default Resume;
