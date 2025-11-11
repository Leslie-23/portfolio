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
			icon: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
			category: ["UI/UX"],
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
			icon: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2ViJTIwZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
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
			icon: "https://plus.unsplash.com/premium_photo-1733353204288-ba5c8ba3ad7d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c29mdHdhcmUlMjBjb25zdWx0YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
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
			icon: "https://plus.unsplash.com/premium_photo-1661270415926-37a9d24aff30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b3B0aW1pemF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
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
		{
			title: "AI & Machine Learning",
			description:
				"Developing intelligent systems that learn, adapt, and automate processes with precision.",
			icon: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
			category: ["Artificial Intelligence & Data Science"],
			details: {
				overview:
					"I build and integrate ML-driven solutions that power predictive analytics, recommendation systems, and intelligent automation. My approach combines clean data pipelines with robust model deployment strategies.",
				projects: [
					{
						name: "Smart Transit Predictor",
						tech: ["Python", "TensorFlow", "Flask", "MySQL"],
						link: "https://smarttransit.ai",
					},
					{
						name: "Campus Connect AI Matchmaker",
						tech: ["PyTorch", "FastAPI", "React"],
						link: "https://campusconnect.ai",
					},
				],
			},
		},
		{
			title: "Photo & Video Editing",
			description:
				"Transforming raw visuals into captivating, high-quality digital experiences.",
			icon: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=500",
			category: ["Media Production & Creative Editing"],
			details: {
				overview:
					"I offer professional-grade editing and compositing services that enhance visual storytelling. From retouching to cinematic video edits, every project aims to evoke emotion and engagement.",
				projects: [
					{
						name: "NeneCollectionz Product Reel",
						tech: [
							"Premiere Pro",
							"After Effects",
							"DaVinci Resolve",
						],
						link: "https://nenecreatives.com/reel",
					},
					{
						name: "Campus Connect Promo Edits",
						tech: ["Photoshop", "Lightroom", "CapCut Pro"],
						link: "https://campusconnect.app/media",
					},
				],
			},
		},
	];

	return (
		<section className="py-20 bg-white px-4 md:px-8">
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
				<div className="grid md:grid-cols-3  gap-8">
					{services.map((service, idx) => (
						<motion.div
							key={idx}
							whileHover={{ scale: 1.03 }}
							onClick={() => setSelectedService(service)}
							className="p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow cursor-pointer"
						>
							{/* Service Image */}
							<div className="mb-4 rounded-lg overflow-hidden h-48 bg-gray-200">
								<img
									src={service.icon}
									alt={service.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-2xl font-bold mb-2 text-foreground">
								{service.title}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{service.description}
							</p>
							<div className="mt-3 inline-block text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md roboto-condensed-regular">
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
							className="bg-white rounded-xl p-6 md:p-8 max-w-2xl w-full shadow-xl relative max-h-[90vh] overflow-y-auto"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							onClick={(e) => e.stopPropagation()}
						>
							<button
								className="absolute top-4 right-4 text-gray-600 hover:text-black z-10 bg-white rounded-full p-1"
								onClick={() => setSelectedService(null)}
							>
								<X size={22} />
							</button>

							{/* Modal Image */}
							<div className="mb-6 rounded-lg overflow-hidden h-64 bg-gray-200">
								<img
									src={selectedService.icon}
									alt={selectedService.title}
									className="w-full h-full object-cover"
								/>
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
												className="font-semibold text-green-700 hover:underline roboto-condensed-regular"
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
