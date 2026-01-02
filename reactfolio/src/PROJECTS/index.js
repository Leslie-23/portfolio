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
	Coffee,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../components/globals.css";
import { useNavigate } from "react-router-dom";

const Projects = () => {
	const [activeProject, setActiveProject] = useState(0);
	const navigate = useNavigate();

	const projects = [
		{
			id: 1,
			title: "E-Commerce Platform",
			description:
				"A full-stack MERN e-commerce solution with real-time inventory, secure payments, and admin dashboard.",
			fullDescription:
				"MERN Ecommerce is a complete shopping platform built with MongoDB, Express, React, Node.js, Redux Toolkit, and Material UI. Features include user authentication with OTP, product catalog, shopping cart, wishlist, checkout with Stripe, order management, and an admin panel for inventory and analytics.",
			techStack: [
				"React",
				"Node.js",
				"MongoDB",
				"Stripe",
				"Tailwind CSS",
				"Redux Toolkit",
				"Material UI",
			],
			webScreenshot: "/images/webScreenshots/e-commerce-web.png",
			mobileScreenshot: "/images/mobileScreenshots/e-commerce-mobile.png",
			liveLink: "https://e-comm-app-517g.vercel.app/",
			githubLink: "https://github.com/Leslie-23/eComm-app",
			demoLink: "https://e-comm-app-517g.vercel.app/",
			features: [
				"User Authentication with OTP and password reset",
				"Product Catalog with Reviews and Wishlist",
				"Shopping Cart with Quantity Adjustments",
				"Checkout with Stripe Payment Integration",
				"Order Management & History",
				"Admin Dashboard for Product & Order Control",
				"Responsive UI with Material UI",
				"Real-time Updates using Redux Toolkit",
			],
			status: "Live",
			category: "Full Stack",
			icon: <Database size={20} />,
			color: "blue",
			timeline: "3 months",
			teamSize: "4 developers",
			documentation:
				"Frontend built with React, Redux Toolkit, and Material UI; backend with Node.js, Express, and MongoDB. Includes seeding, demo account, and modular routes. Live on Vercel at https://e-comm-app-517g.vercel.app/",
		},
		{
			id: 7,
			title: "Restaurant Website",
			description:
				"A high-end restaurant website with in-house ordering and elegant UI.",
			fullDescription:
				"Grilli is a responsive, visually stunning restaurant website built with React and Node.js. Features include menu browsing, online ordering, reservation system, and admin management of dishes and orders. Tailored for a high-end restaurant experience.",
			techStack: [
				"React",
				"Node.js",
				"MongoDB",
				"Tailwind CSS",
				"Stripe",
			],
			webScreenshot: "/images/webScreenshots/grilli-web.png",
			mobileScreenshot: "/images/mobileScreenshots/grilli-mobile.png",
			liveLink: "https://grilli-restaurant.vercel.app/",
			githubLink: "https://github.com/Leslie-23/grilli",
			demoLink: "https://grilli-restaurant.vercel.app/",
			features: [
				"Responsive UI with Tailwind CSS",
				"In-house ordering system",
				"Reservation management",
				"Menu browsing with categories",
				"Admin panel for dish and order management",
				"Payment integration with Stripe",
			],
			status: "Live",
			category: "Frontend & Backend",
			icon: <Coffee size={20} />,
			color: "green",
			timeline: "2 months",
			teamSize: "3 developers",
			documentation:
				"Frontend built with React and Tailwind CSS for responsiveness. Backend handled with Node.js and MongoDB. Includes in-house ordering, menu management, and Stripe integration for payments. Live on Vercel at https://grilli-restaurant.vercel.app/",
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
			timeline: "2 months",
			teamSize: "2 developers",
			documentation:
				"A comprehensive weather dashboard built with Vue.js that provides real-time weather data and interactive maps using Mapbox integration.",
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
			timeline: "5 months",
			teamSize: "3 developers",
			documentation:
				"A cross-platform fitness tracking application built with React Native that integrates with health APIs and provides social features for user engagement.",
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
			timeline: "1 month",
			teamSize: "1 developer",
			documentation:
				"A modern portfolio website showcasing creative animations and responsive design principles with a focus on user experience and performance optimization.",
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
			timeline: "6 months",
			teamSize: "5 developers",
			documentation:
				"A comprehensive social media analytics platform that processes data from multiple APIs and provides actionable insights through interactive data visualizations.",
		},

		{
			id: 7,
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
			timeline: "4 months",
			teamSize: "3 developers",
			documentation:
				"The task management app was built with Next.js for SSR and better SEO. Real-time features were handled by Socket.io, and the database used PostgreSQL for relational data integrity.",
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
									<div className="relative bg-gray-900 rounded-2xl p-3">
										<div className="flex items-center gap-2 mb-2">
											<Monitor
												size={14}
												className="text-gray-400"
											/>
											<span className="text-xs text-gray-400">
												Web Version
											</span>
										</div>
										<img
											src={currentProject.webScreenshot}
											alt={`${currentProject.title} Web Screenshot`}
											className="w-full max-h-48 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
										/>
									</div>
								</div>

								{/* Mobile Screenshot */}
								<div className="relative group max-w-[150px] mx-auto">
									<div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
									<div className="relative bg-gray-900 rounded-3xl p-2">
										<div className="flex items-center gap-2 mb-2">
											<Smartphone
												size={12}
												className="text-gray-400"
											/>
											<span className="text-xs text-gray-400">
												Mobile
											</span>
										</div>
										<img
											src={
												currentProject.mobileScreenshot
											}
											alt={`${currentProject.title} Mobile Screenshot`}
											className="w-full max-h-48 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
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
							className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-green-500"
						>
							<ChevronLeft size={24} />
							Previous
						</button>

						{/* Project Dots */}
						<div className="flex gap-2">
							{projects.map((_, index) => (
								<button
									key={index}
									onClick={() => setActiveProject(index)}
									className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
							className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-green-600"
						>
							Next
							<ChevronRight size={24} />
						</button>
					</div>

					{/* All Projects Grid */}
					<div
						id="projects-grid"
						className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
					>
						{projects.map((project, index) => {
							const projectSlug = project.title
								.toLowerCase()
								.replace(/[^a-z0-9]+/g, "-")
								.replace(/(^-|-$)+/g, "");

							return (
								<div
									key={project.id}
									className={`group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer border-2 ${
										activeProject === index
											? "border-blue-500"
											: "border-transparent"
									}`}
									onClick={() =>
										navigate(`/projects/${projectSlug}`, {
											state: { project },
										})
									}
								>
									{/* Image Section */}
									<div className="relative w-full aspect-square overflow-hidden">
										<img
											src={project.webScreenshot}
											alt={project.title}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
										{/* Overlay on hover */}
										<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm font-medium">
											View Details
										</div>
									</div>

									{/* Info Section */}
									<div className="hidden sm:block p-3 ">
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
													+
													{project.techStack.length -
														3}
												</span>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Projects;
