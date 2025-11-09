import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Services() {
	const [selectedService, setSelectedService] = useState(null);

	const services = [
		{
			title: "Web Design",
			description:
				"Creating stunning, user-centered designs that engage and convert.",
			icon: "🎨",
			category: "UI/UX",
			details: {
				overview:
					"I specialize in crafting visually compelling, responsive, and accessible web interfaces. Each design is backed by UX principles and a focus on conversion.",
				projects: [
					{
						name: "Creative Agency Website",
						tech: ["Figma", "React", "TailwindCSS"],
						link: "https://youragencyportfolio.com",
					},
					{
						name: "Campus Connect UI Overhaul",
						tech: ["Figma", "Framer", "React Native"],
						link: "https://campusconnect.app",
					},
				],
			},
		},
		{
			title: "Development",
			description:
				"Building fast, scalable, and maintainable web applications.",
			icon: "⚙️",
			category: "Full Stack",
			details: {
				overview:
					"I build production-grade web and mobile applications using the MERN stack, integrating APIs, authentication, and real-time systems.",
				projects: [
					{
						name: "TransportGo Platform",
						tech: ["React", "Node.js", "MySQL"],
						link: "https://transportgo.io",
					},
					{
						name: "E-Commerce Admin Dashboard",
						tech: ["Next.js", "Express", "MongoDB"],
						link: "https://ecomm-admin.com",
					},
				],
			},
		},
		{
			title: "Consulting",
			description:
				"Strategic guidance for digital transformation and product strategy.",
			icon: "💡",
			category: "Advisory",
			details: {
				overview:
					"I provide technical and strategic insight for scaling teams, optimizing workflows, and making sound architectural decisions.",
				projects: [
					{
						name: "Tech Revamp for NGO",
						tech: ["Google Cloud", "React", "CI/CD"],
						link: "#",
					},
				],
			},
		},
		{
			title: "Optimization",
			description:
				"Performance tuning and SEO to maximize your web presence.",
			icon: "⚡",
			category: "Performance",
			details: {
				overview:
					"Focused on improving Core Web Vitals, caching, code-splitting, and SEO best practices to make your product load blazingly fast.",
				projects: [
					{
						name: "SEO-Driven Portfolio Revamp",
						tech: ["Next.js", "Lighthouse", "Vercel Analytics"],
						link: "#",
					},
				],
			},
		},
	];

	return (
		<section className="py-20 bg-green-50 px-4 md:px-8">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-card-foreground">
						Services & Expertise
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						I offer comprehensive solutions tailored to bring your
						vision to life with precision and creativity.
					</p>
				</div>

				{/* Cards */}
				<div className="grid md:grid-cols-2 gap-8">
					{services.map((service, idx) => (
						<motion.div
							key={idx}
							whileHover={{ scale: 1.03 }}
							onClick={() => setSelectedService(service)}
							className="p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer"
						>
							<div className="text-5xl mb-4">{service.icon}</div>
							<h3 className="text-2xl font-bold mb-2 text-foreground">
								{service.title}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{service.description}
							</p>
							<div className="mt-3 inline-block text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">
								{service.category}
							</div>
						</motion.div>
					))}
				</div>
			</div>

			{/* Modal */}
			<AnimatePresence>
				{selectedService && (
					<motion.div
						className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedService(null)}
					>
						<motion.div
							className="bg-white rounded-xl p-6 md:p-8 max-w-lg w-full shadow-xl relative"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
						>
							<button
								className="absolute top-4 right-4 text-gray-600 hover:text-black"
								onClick={() => setSelectedService(null)}
							>
								<X size={22} />
							</button>
							<div className="text-4xl mb-4">
								{selectedService.icon}
							</div>
							<h3 className="text-2xl font-bold mb-2 text-foreground">
								{selectedService.title}
							</h3>
							<p className="text-muted-foreground mb-4 leading-relaxed">
								{selectedService.details.overview}
							</p>

							<h4 className="text-lg font-semibold mb-2">
								Related Projects:
							</h4>
							<ul className="space-y-2">
								{selectedService.details.projects.map(
									(proj, i) => (
										<li
											key={i}
											className="flex flex-col bg-green-50 border border-green-200 rounded-lg p-3 hover:bg-green-100 transition"
										>
											<a
												href={proj.link}
												target="_blank"
												rel="noopener noreferrer"
												className="font-semibold text-green-700 hover:underline"
											>
												{proj.name}
											</a>
											<p className="text-sm text-gray-600">
												{proj.tech.join(" • ")}
											</p>
										</li>
									)
								)}
							</ul>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}
