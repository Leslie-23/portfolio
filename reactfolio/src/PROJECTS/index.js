import React, { useState } from "react";
import {
	ExternalLink,
	Github,
	Play,
	ChevronLeft,
	ChevronRight,
	Smartphone,
	Monitor,
	Zap,
	Code,
	Palette,
	Database,
	Cloud,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../components/globals.css";
const Projects = () => {
	const [activeProject, setActiveProject] = useState(0);

	const projects = [
		{
			id: 1,
			title: "E-Commerce Platform",
			description:
				"A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
			fullDescription:
				"Built with modern web technologies, this e-commerce platform features user authentication, product catalog, shopping cart, checkout process, and order management. Includes an admin panel for inventory control and analytics.",
			techStack: [
				"React",
				"Node.js",
				"MongoDB",
				"Stripe",
				"Tailwind CSS",
			],
			webScreenshot:
				"https://placehold.co/800x450/3B82F6/FFFFFF?text=E-Commerce+Web+App",
			mobileScreenshot:
				"https://placehold.co/300x600/3B82F6/FFFFFF?text=E-Commerce+Mobile",
			liveLink: "https://example.com",
			githubLink: "https://github.com",
			demoLink: "https://demo.com",
			features: [
				"User Authentication",
				"Payment Processing",
				"Admin Dashboard",
				"Real-time Updates",
				"Responsive Design",
			],
			status: "Live",
			category: "Full Stack",
			icon: <Database size={20} />,
			color: "blue",
		},
		{
			id: 2,
			title: "Task Management App",
			description:
				"Collaborative task management application with drag-and-drop functionality and team collaboration features.",
			fullDescription:
				"A productivity app that helps teams organize tasks, set deadlines, and track progress. Features include real-time collaboration, file attachments, comments, and progress tracking.",
			techStack: [
				"Next.js",
				"TypeScript",
				"PostgreSQL",
				"Socket.io",
				"Framer Motion",
			],
			webScreenshot:
				"https://placehold.co/800x450/10B981/FFFFFF?text=Task+Manager+Web",
			mobileScreenshot:
				"https://placehold.co/300x600/10B981/FFFFFF?text=Task+Manager+Mobile",
			liveLink: "https://taskapp.com",
			githubLink: "https://github.com",
			demoLink: "https://demo.com",
			features: [
				"Drag & Drop",
				"Real-time Chat",
				"File Sharing",
				"Progress Analytics",
				"Team Collaboration",
			],
			status: "In Development",
			category: "Web App",
			icon: <Code size={20} />,
			color: "green",
		},
		{
			id: 3,
			title: "Weather Dashboard",
			description:
				"Real-time weather application with interactive maps, forecasts, and location-based services.",
			fullDescription:
				"A comprehensive weather dashboard that provides current conditions, extended forecasts, and severe weather alerts. Features interactive maps and personalized location tracking.",
			techStack: ["Vue.js", "Express", "Redis", "Chart.js", "Mapbox"],
			webScreenshot:
				"https://placehold.co/800x450/8B5CF6/FFFFFF?text=Weather+Dashboard",
			mobileScreenshot:
				"https://placehold.co/300x600/8B5CF6/FFFFFF?text=Weather+Mobile",
			liveLink: "https://weatherapp.com",
			githubLink: "https://github.com",
			demoLink: "https://demo.com",
			features: [
				"Live Weather Maps",
				"Location Services",
				"Weather Alerts",
				"Historical Data",
				"Interactive Charts",
			],
			status: "Live",
			category: "Frontend",
			icon: <Cloud size={20} />,
			color: "purple",
		},
		{
			id: 4,
			title: "Fitness Tracker",
			description:
				"Mobile fitness application with workout plans, progress tracking, and social features.",
			fullDescription:
				"A comprehensive fitness app that helps users track workouts, set goals, and connect with friends. Includes exercise library, progress photos, and achievement system.",
			techStack: [
				"React Native",
				"Firebase",
				"Redux",
				"Chart.js",
				"Expo",
			],
			webScreenshot:
				"https://placehold.co/800x450/EF4444/FFFFFF?text=Fitness+Web+Portal",
			mobileScreenshot:
				"https://placehold.co/300x600/EF4444/FFFFFF?text=Fitness+Mobile+App",
			liveLink: "https://fitnessapp.com",
			githubLink: "https://github.com",
			demoLink: "https://demo.com",
			features: [
				"Workout Plans",
				"Progress Tracking",
				"Social Feed",
				"Achievement System",
				"Health Integration",
			],
			status: "Live",
			category: "Mobile",
			icon: <Zap size={20} />,
			color: "red",
		},
		{
			id: 5,
			title: "Portfolio Website",
			description:
				"Modern portfolio website with smooth animations, dark mode, and project showcase.",
			fullDescription:
				"A beautifully designed portfolio website featuring smooth scroll animations, interactive elements, and a comprehensive project gallery. Built with performance and accessibility in mind.",
			techStack: [
				"React",
				"GSAP",
				"Tailwind CSS",
				"Framer Motion",
				"Three.js",
			],
			webScreenshot:
				"https://placehold.co/800x450/F59E0B/FFFFFF?text=Portfolio+Website",
			mobileScreenshot:
				"https://placehold.co/300x600/F59E0B/FFFFFF?text=Portfolio+Mobile",
			liveLink: "https://portfolio.com",
			githubLink: "https://github.com",
			demoLink: "https://demo.com",
			features: [
				"Smooth Animations",
				"Dark Mode",
				"Responsive Design",
				"Performance Optimized",
				"Accessibility",
			],
			status: "Live",
			category: "Design",
			icon: <Palette size={20} />,
			color: "yellow",
		},
		{
			id: 6,
			title: "Social Media Analytics",
			description:
				"Analytics dashboard for social media performance tracking and insights.",
			fullDescription:
				"A powerful analytics platform that aggregates data from multiple social media platforms. Provides detailed insights, engagement metrics, and growth recommendations.",
			techStack: ["Angular", "Python", "MySQL", "D3.js", "FastAPI"],
			webScreenshot:
				"https://placehold.co/800x450/06B6D4/FFFFFF?text=Analytics+Dashboard",
			mobileScreenshot:
				"https://placehold.co/300x600/06B6D4/FFFFFF?text=Analytics+Mobile",
			liveLink: "https://analytics.com",
			githubLink: "https://github.com",
			demoLink: "https://demo.com",
			features: [
				"Multi-platform Analytics",
				"Real-time Data",
				"Custom Reports",
				"Team Collaboration",
				"Data Export",
			],
			status: "In Development",
			category: "Data Visualization",
			icon: <Monitor size={20} />,
			color: "cyan",
		},
	];

	const nextProject = () => {
		setActiveProject((prev) => (prev + 1) % projects.length);
	};

	const prevProject = () => {
		setActiveProject(
			(prev) => (prev - 1 + projects.length) % projects.length
		);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Live":
				return "bg-green-100 text-green-800";
			case "In Development":
				return "bg-blue-100 text-blue-800";
			case "Coming Soon":
				return "bg-purple-100 text-purple-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const getColorClasses = (color) => {
		const colorMap = {
			blue: "bg-blue-500 border-blue-200 text-blue-600",
			green: "bg-green-500 border-green-200 text-green-600",
			purple: "bg-purple-500 border-purple-200 text-purple-600",
			red: "bg-red-500 border-red-200 text-red-600",
			yellow: "bg-yellow-500 border-yellow-200 text-yellow-600",
			cyan: "bg-cyan-500 border-cyan-200 text-cyan-600",
		};
		return colorMap[color] || colorMap.blue;
	};

	const currentProject = projects[activeProject];

	return (
		<>
			<Navbar />
			<section
				id="projects"
				className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="text-center mb-16">
						<h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
							Featured Projects
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Showcasing my journey through innovative web and
							mobile applications
						</p>
					</div>

					{/* Main Project Showcase */}
					<div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
							{/* Project Images */}
							<div className="space-y-6">
								{/* Web Screenshot */}
								<div className="relative group">
									<div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
									<div className="relative bg-gray-900 rounded-2xl p-4">
										<div className="flex items-center gap-2 mb-3">
											<Monitor
												size={16}
												className="text-gray-400"
											/>
											<span className="text-sm text-gray-400">
												Web Version
											</span>
										</div>
										<img
											src={currentProject.webScreenshot}
											alt={`${currentProject.title} Web Screenshot`}
											className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
										/>
									</div>
								</div>

								{/* Mobile Screenshot */}
								<div className="relative group max-w-xs mx-auto">
									<div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
									<div className="relative bg-gray-900 rounded-3xl p-4">
										<div className="flex items-center gap-2 mb-3">
											<Smartphone
												size={16}
												className="text-gray-400"
											/>
											<span className="text-sm text-gray-400">
												Mobile Version
											</span>
										</div>
										<img
											src={
												currentProject.mobileScreenshot
											}
											alt={`${currentProject.title} Mobile Screenshot`}
											className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
										/>
									</div>
								</div>
							</div>

							{/* Project Details */}
							<div className="flex flex-col justify-between">
								<div>
									{/* Header */}
									<div className="flex flex-wrap items-center gap-3 mb-4">
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
												currentProject.status
											)}`}
										>
											{currentProject.status}
										</span>
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border ${
												getColorClasses(
													currentProject.color
												).split(" ")[2]
											}`}
										>
											{currentProject.category}
										</span>
									</div>

									<h3 className="text-3xl font-bold text-gray-900 mb-4">
										{currentProject.title}
									</h3>

									<p className="text-lg text-gray-600 mb-6 leading-relaxed">
										{currentProject.fullDescription}
									</p>

									{/* Features */}
									<div className="mb-6">
										<h4 className="text-lg font-semibold text-gray-900 mb-3">
											Key Features
										</h4>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
											{currentProject.features.map(
												(feature, index) => (
													<div
														key={index}
														className="flex items-center gap-2 text-gray-700"
													>
														<div
															className={`w-2 h-2 rounded-full ${
																getColorClasses(
																	currentProject.color
																).split(" ")[0]
															}`}
														></div>
														<span className="text-sm">
															{feature}
														</span>
													</div>
												)
											)}
										</div>
									</div>

									{/* Tech Stack */}
									<div className="mb-6">
										<h4 className="text-lg font-semibold text-gray-900 mb-3">
											Technologies Used
										</h4>
										<div className="flex flex-wrap gap-2">
											{currentProject.techStack.map(
												(tech, index) => (
													<span
														key={index}
														className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
													>
														{tech}
													</span>
												)
											)}
										</div>
									</div>
								</div>

								{/* Action Buttons */}
								<div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
									{currentProject.liveLink && (
										<a
											href={currentProject.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
										>
											<ExternalLink size={18} />
											Live Demo
										</a>
									)}
									{currentProject.githubLink && (
										<a
											href={currentProject.githubLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
										>
											<Github size={18} />
											View Code
										</a>
									)}
									{currentProject.demoLink && (
										<a
											href={currentProject.demoLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden groupVid"
										>
											<Play size={18} />
											Video Demo
										</a>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Project Navigation */}
					<div className="flex items-center justify-between mb-16">
						<button
							onClick={prevProject}
							className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200"
						>
							<ChevronLeft size={20} />
							Previous
						</button>

						{/* Project Dots */}
						<div className="flex gap-2">
							{projects.map((_, index) => (
								<button
									key={index}
									onClick={() => setActiveProject(index)}
									className={`w-3 h-1 rounded-full transition-all duration-300 ${
										activeProject === index
											? `${
													getColorClasses(
														currentProject.color
													).split(" ")[0]
											  } scale-125`
											: "bg-gray-300 hover:bg-gray-400"
									}`}
								/>
							))}
						</div>

						<button
							onClick={nextProject}
							className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200"
						>
							Next
							<ChevronRight size={20} />
						</button>
					</div>

					{/* All Projects Grid */}
					{/* <div
						id="projects-grid"
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
					>
						{projects.map((project, index) => (
							<div
								key={project.id}
								className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer border-2 ${
									activeProject === index
										? "border-blue-500"
										: "border-transparent"
								}`}
								onClick={() => setActiveProject(index)}
							>
								<img
									src={project.webScreenshot}
									alt={project.title}
									className="w-full h-48 object-cover"
								/>
								<div className="p-6">
									<div className="flex items-center justify-between mb-3">
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
												project.status
											)}`}
										>
											{project.status}
										</span>
										<span className="text-gray-500">
											{project.icon}
										</span>
									</div>
									<h4 className="text-lg font-bold text-gray-900 mb-2">
										{project.title}
									</h4>
									<p className="text-gray-600 text-sm mb-4 line-clamp-2">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-1">
										{project.techStack
											.slice(0, 3)
											.map((tech, techIndex) => (
												<span
													key={techIndex}
													className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
												>
													{tech}
												</span>
											))}
										{project.techStack.length > 3 && (
											<span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
												+{project.techStack.length - 3}
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div> */}
					{/* All Projects Grid */}
					<div
						id="projects-grid"
						className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
					>
						{projects.map((project, index) => (
							<div
								key={project.id}
								className={`group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer border-2 ${
									activeProject === index
										? "border-blue-500"
										: "border-transparent"
								}`}
								onClick={() => setActiveProject(index)}
							>
								{/* Image Section */}
								<div className="relative w-full aspect-square overflow-hidden">
									<img
										src={project.webScreenshot}
										alt={project.title}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
									/>
									{/* Overlay on hover (optional) */}
									<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-medium">
										View Details
									</div>
								</div>

								{/* Info Section (hidden on mobile for Instagram-like look) */}
								<div className="hidden sm:block p-3">
									<div className="flex items-center justify-between mb-2">
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
												project.status
											)}`}
										>
											{project.status}
										</span>
										<span className="text-gray-500">
											{project.icon}
										</span>
									</div>
									<h4 className="text-sm font-semibold text-gray-900 mb-1 truncate">
										{project.title}
									</h4>
									<p className="text-gray-600 text-xs line-clamp-2 mb-2">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-1">
										{project.techStack
											.slice(0, 3)
											.map((tech, i) => (
												<span
													key={i}
													className="px-2 py-[2px] bg-gray-100 text-gray-600 rounded text-[10px]"
												>
													{tech}
												</span>
											))}
										{project.techStack.length > 3 && (
											<span className="px-2 py-[2px] bg-gray-100 text-gray-600 rounded text-[10px]">
												+{project.techStack.length - 3}
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Projects;
