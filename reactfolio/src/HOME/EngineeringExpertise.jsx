import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Monitor,
	Server,
	Database,
	Layers,
	ArrowRight,
} from "lucide-react";

const domains = [
	{
		title: "Frontend Engineering",
		icon: <Monitor size={28} />,
		description:
			"Building responsive, performant interfaces with modern frameworks. Pixel-perfect UI, smooth animations, and accessibility built in from the start.",
		technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
		gradient: "from-blue-500 to-cyan-500",
		darkGradient: "dark:from-blue-600 dark:to-cyan-600",
		bgLight: "bg-blue-50",
		bgDark: "dark:bg-blue-950/30",
		iconColor: "text-blue-600 dark:text-blue-400",
		proof: { label: "E-Commerce Platform", link: "/projects/e-commerce-platform" },
	},
	{
		title: "Backend & API Design",
		icon: <Server size={28} />,
		description:
			"Designing RESTful and GraphQL APIs with robust authentication, real-time capabilities, and clean architecture patterns that scale.",
		technologies: ["Node.js", "Express", "GraphQL", "JWT/OAuth2", "Socket.io"],
		gradient: "from-green-500 to-emerald-500",
		darkGradient: "dark:from-green-600 dark:to-emerald-600",
		bgLight: "bg-green-50",
		bgDark: "dark:bg-green-950/30",
		iconColor: "text-green-600 dark:text-green-400",
		proof: { label: "Restaurant Platform", link: "/projects/restaurant-website" },
	},
	{
		title: "Data & Infrastructure",
		icon: <Database size={28} />,
		description:
			"Working with relational and NoSQL databases, caching layers, containerized deployments, and CI/CD pipelines for reliable delivery.",
		technologies: ["PostgreSQL", "MongoDB", "Redis", "Docker", "GitHub Actions"],
		gradient: "from-purple-500 to-violet-500",
		darkGradient: "dark:from-purple-600 dark:to-violet-600",
		bgLight: "bg-purple-50",
		bgDark: "dark:bg-purple-950/30",
		iconColor: "text-purple-600 dark:text-purple-400",
		proof: { label: "Analytics Dashboard", link: "/projects/social-media-analytics" },
	},
	{
		title: "Systems Architecture",
		icon: <Layers size={28} />,
		description:
			"Designing microservices, API gateways, caching strategies, and scalable patterns. Thinking in systems, not just features.",
		technologies: ["Microservices", "MVC/MVVM", "Load Balancing", "AWS", "Nginx"],
		gradient: "from-orange-500 to-red-500",
		darkGradient: "dark:from-orange-600 dark:to-red-600",
		bgLight: "bg-orange-50",
		bgDark: "dark:bg-orange-950/30",
		iconColor: "text-orange-600 dark:text-orange-400",
		proof: { label: "Task Management App", link: "/projects/task-management-app" },
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export default function EngineeringExpertise() {
	const navigate = useNavigate();

	return (
		<section className="py-20 bg-surface-alt px-4 md:px-8 transition-colors duration-300">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-heading font-heading">
						Engineering Expertise
					</h2>
					<p className="text-lg text-muted max-w-2xl mx-auto">
						Full-stack capability with depth across the entire
						application lifecycle — from database design to
						deployment.
					</p>
				</div>

				{/* Domain Cards */}
				<motion.div
					className="grid md:grid-cols-2 gap-8"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
				>
					{domains.map((domain, idx) => (
						<motion.div
							key={idx}
							variants={cardVariants}
							className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
						>
							{/* Gradient accent top bar */}
							<div
								className={`h-1 bg-gradient-to-r ${domain.gradient} ${domain.darkGradient}`}
							/>

							<div className="p-8">
								{/* Icon + Title */}
								<div className="flex items-center gap-4 mb-4">
									<div
										className={`p-3 rounded-xl ${domain.bgLight} ${domain.bgDark} ${domain.iconColor} transition-colors`}
									>
										{domain.icon}
									</div>
									<h3 className="text-2xl font-bold text-heading font-heading">
										{domain.title}
									</h3>
								</div>

								{/* Description */}
								<p className="text-body leading-relaxed mb-6">
									{domain.description}
								</p>

								{/* Technologies */}
								<div className="flex flex-wrap gap-2 mb-6">
									{domain.technologies.map((tech, techIdx) => (
										<span
											key={techIdx}
											className="px-3 py-1 bg-surface-alt text-muted text-sm rounded-full border border-border font-medium"
										>
											{tech}
										</span>
									))}
								</div>

								{/* Proof link */}
								<button
									onClick={() => navigate(domain.proof.link)}
									className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors group/link"
								>
									See it in action: {domain.proof.label}
									<ArrowRight
										size={14}
										className="group-hover/link:translate-x-1 transition-transform"
									/>
								</button>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
