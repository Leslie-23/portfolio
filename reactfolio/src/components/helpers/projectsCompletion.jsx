import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	ExternalLink,
	Github,
	Calendar,
	CheckCircle2,
	ArrowRight,
} from "lucide-react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function ProjectsCompletion() {
	const [selectedProject, setSelectedProject] = useState(null);
	const [filter, setFilter] = useState("all");

	const projects = [
		{
			id: 1,
			title: "neneCollectionz",
			client: "Cece",
			category: "E-Commerce",
			description:
				"Developed a responsive hair-selling website with online catalog and integrated MoMo payments. Improved client's digital reach and monthly sales.",
			tech_stack: ["React", "Node.js", "MongoDB", "Stripe"],
			status: "Completed",
			completion_date: "2024-03-10",
			impact: "Boosted online visibility and increased sales by 40%",
			repo_url: "https://github.com/lesliepaul/neneCollectionz",
			live_url: "https://nenecollectionz.netlify.app",
			image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 2,
			title: "githelper",
			client: "University colleague",
			category: "Developer Tool (CLI)",
			description:
				"Built a lightweight npm CLI tool to automate Git actions like committing and pushing. Increased productivity by 45%.",
			tech_stack: ["Node.js", "Commander.js", "ShellJS"],
			status: "Completed",
			completion_date: "2023-11-28",
			impact: "Simplified version control workflow for dev teams",
			repo_url: "https://github.com/lesliepaul/githelper",
			live_url: "https://www.npmjs.com/package/githelper",
			image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 3,
			title: "grilli",
			client: "Private restaurant",
			category: "Restaurant Management",
			description:
				"Created a website and internal ordering system for a luxury restaurant, enabling real-time kitchen updates and analytics.",
			tech_stack: ["React", "Node.js", "MySQL"],
			status: "Completed",
			completion_date: "2024-06-15",
			impact: "Streamlined in-house ordering, reducing delays by 30%",
			repo_url: "https://github.com/lesliepaul/grilli",
			live_url: "https://grilli.netlify.app",
			image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 4,
			title: "uniCliq",
			client: "University of Ghana",
			category: "Social Networking / Campus Platform",
			description:
				"A campus-exclusive network allowing students to connect, share, and navigate campus activities with location services.",
			tech_stack: ["React Native", "Node.js", "MySQL", "Socket.io"],
			status: "Completed",
			completion_date: "2024-08-02",
			impact: "Enhanced campus connectivity and student engagement",
			repo_url: "https://github.com/lesliepaul/uniCliq",
			live_url: "https://unicliq.netlify.app",
			image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 5,
			title: "Campus Connect",
			client: "Multi-campus project",
			category: "Navigation & Social Platform",
			description:
				"Built the backend and database system for a social app connecting university students. Implemented normalized schema and secure user sessions.",
			tech_stack: ["Node.js", "Express", "MySQL", "JWT"],
			status: "Completed",
			completion_date: "2025-04-25",
			impact: "Reduced data redundancy and increased query efficiency by 60%",
			repo_url: "https://github.com/lesliepaul/campus-connect",
			live_url: "https://campusconnect.netlify.app",
			image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 6,
			title: "Trofficient",
			client: "Personal Project",
			category: "Transportation & Mobility",
			description:
				"A Ghana-based bus mobility system built for Spintex Road. Includes live tracking, payment integration, and optimized routing.",
			tech_stack: ["React Native", "Node.js", "MySQL", "Google Maps API"],
			status: "Completed",
			completion_date: "2025-01-15",
			impact: "Improved commuter coordination and route efficiency",
			repo_url: "https://github.com/lesliepaul/trofficient",
			live_url: "https://trofficient.netlify.app",
			image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 7,
			title: "QuickBill",
			client: "Local retail store",
			category: "POS / Business Automation",
			description:
				"Point of Sale system integrating stock management, barcode scanning, and daily sales reporting.",
			tech_stack: ["React", "Electron", "MySQL"],
			status: "Completed",
			completion_date: "2024-02-05",
			impact: "Reduced manual bookkeeping by 90%",
			repo_url: "https://github.com/lesliepaul/quickbill",
			live_url: "",
			image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 8,
			title: "Eventra",
			client: "University SRC",
			category: "Event Management",
			description:
				"Developed a ticketing and event management system with real-time ticket verification via Firebase.",
			tech_stack: ["React", "Firebase", "TailwindCSS"],
			status: "Completed",
			completion_date: "2023-09-20",
			impact: "Streamlined event organization and attendance tracking",
			repo_url: "https://github.com/lesliepaul/eventra",
			live_url: "https://eventra.netlify.app",
			image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 9,
			title: "BookTrackr",
			client: "Personal Project",
			category: "Productivity",
			description:
				"Web app to track personal reading goals, summaries, and notes with OpenLibrary API integration.",
			tech_stack: ["React", "Node.js", "IndexedDB"],
			status: "Completed",
			completion_date: "2024-09-11",
			impact: "Improved reading discipline and user progress tracking",
			repo_url: "https://github.com/lesliepaul/booktrackr",
			live_url: "https://booktrackr.netlify.app",
			image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
		{
			id: 10,
			title: "ShopBase",
			client: "Boutique Owner",
			category: "E-Commerce",
			description:
				"Full shopping platform with product catalog, cart, and Paystack integration.",
			tech_stack: ["Next.js", "Node.js", "MongoDB", "Paystack API"],
			status: "Completed",
			completion_date: "2024-12-01",
			impact: "Enabled full online retail operations for local seller",
			repo_url: "https://github.com/lesliepaul/shopbase",
			live_url: "https://shopbase.netlify.app",
			image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=80",
		},
	];

	const categories = [
		"all",
		...new Set(projects.map((project) => project.category)),
	];

	const filteredProjects =
		filter === "all"
			? projects
			: projects.filter((project) => project.category === filter);

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<>
			<Navbar />
			<section className="py-20 bg-white px-4 md:px-8 roboto-condensed-regualar">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
							Completed Projects
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							A showcase of successfully delivered projects that
							demonstrate my technical expertise and
							problem-solving capabilities.
						</p>
					</div>

					{/* Filter Buttons */}
					<div className="flex flex-wrap justify-center gap-3 mb-12 roboto-condensed-regular">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setFilter(category)}
								className={`px-6 py-3 rounded-full font-medium transition-all roboto-condensed-regular ${
									filter === category
										? "bg-green-600 text-white shadow-lg"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}
							>
								{category.charAt(0).toUpperCase() +
									category.slice(1)}
							</button>
						))}
					</div>

					{/* Projects Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredProjects.map((project) => (
							<motion.div
								key={project.id}
								layout
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
								onClick={() => setSelectedProject(project)}
							>
								{/* Project Image */}
								<div className="h-48 bg-gray-200 overflow-hidden">
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>

								{/* Project Content */}
								<div className="p-6">
									{/* Status Badge */}
									<div className="flex items-center gap-2 mb-3">
										<CheckCircle2
											size={16}
											className="text-green-600"
										/>
										<span className="text-sm font-medium text-green-600">
											{project.status}
										</span>
									</div>

									{/* Title & Client */}
									<h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
										{project.title}
									</h3>
									<p className="text-gray-600 mb-3">
										For {project.client}
									</p>

									{/* Description */}
									<p className="text-gray-700 mb-4 line-clamp-2">
										{project.description}
									</p>

									{/* Tech Stack */}
									<div className="flex flex-wrap gap-2 mb-4">
										{project.tech_stack
											.slice(0, 3)
											.map((tech, index) => (
												<span
													key={index}
													className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
												>
													{tech}
												</span>
											))}
										{project.tech_stack.length > 3 && (
											<span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
												+{project.tech_stack.length - 3}{" "}
												more
											</span>
										)}
									</div>

									{/* Impact & Date */}
									<div className="flex items-center justify-between text-sm text-gray-500">
										<div className="flex items-center gap-1">
											<Calendar size={14} />
											{formatDate(
												project.completion_date
											)}
										</div>
										<span className="flex items-center gap-1 font-medium text-green-600">
											View Details{" "}
											<ArrowRight size={14} />
										</span>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Empty State */}
					{filteredProjects.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">
								No projects found in this category.
							</p>
						</div>
					)}
				</div>

				{/* Project Detail Modal */}
				<AnimatePresence>
					{selectedProject && (
						<motion.div
							className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-8"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setSelectedProject(null)}
						>
							<motion.div
								className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								onClick={(e) => e.stopPropagation()}
							>
								{/* Project Image */}
								<div className="h-64 bg-gray-200">
									<img
										src={selectedProject.image}
										alt={selectedProject.title}
										className="w-full h-full object-cover"
									/>
								</div>

								<div className="p-8">
									{/* Header */}
									<div className="flex items-start justify-between mb-6">
										<div>
											<div className="flex items-center gap-3 mb-2">
												<CheckCircle2
													size={20}
													className="text-green-600"
												/>
												<span className="text-green-600 font-medium">
													{selectedProject.status}
												</span>
											</div>
											<h3 className="text-3xl font-bold text-gray-900 mb-2">
												{selectedProject.title}
											</h3>
											<p className="text-gray-600 text-lg">
												Client: {selectedProject.client}
											</p>
										</div>
									</div>

									{/* Category & Date */}
									<div className="flex flex-wrap gap-4 mb-6">
										<div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
											{selectedProject.category}
										</div>
										<div className="flex items-center gap-2 text-gray-600">
											<Calendar size={16} />
											Completed on{" "}
											{formatDate(
												selectedProject.completion_date
											)}
										</div>
									</div>

									{/* Description */}
									<div className="mb-8">
										<h4 className="text-xl font-semibold text-gray-900 mb-3">
											Project Overview
										</h4>
										<p className="text-gray-700 leading-relaxed">
											{selectedProject.description}
										</p>
									</div>

									{/* Impact */}
									<div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
										<h4 className="text-lg font-semibold text-green-900 mb-2">
											Key Impact
										</h4>
										<p className="text-green-800">
											{selectedProject.impact}
										</p>
									</div>

									{/* Tech Stack */}
									<div className="mb-8">
										<h4 className="text-xl font-semibold text-gray-900 mb-4">
											Technology Stack
										</h4>
										<div className="flex flex-wrap gap-3">
											{selectedProject.tech_stack.map(
												(tech, index) => (
													<span
														key={index}
														className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium"
													>
														{tech}
													</span>
												)
											)}
										</div>
									</div>

									{/* Action Buttons */}
									<div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
										{selectedProject.repo_url && (
											<a
												href={selectedProject.repo_url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
											>
												<Github size={18} />
												View Code
											</a>
										)}
										{selectedProject.live_url && (
											<a
												href={selectedProject.live_url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
											>
												<ExternalLink size={18} />
												Live Demo
											</a>
										)}
									</div>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
			<Footer />
		</>
	);
}
