import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
	ExternalLink,
	Github,
	Play,
	ArrowLeft,
	Calendar,
	Users,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { projectsData } from "./data/projects";
const ProjectDetail = () => {
	const navigate = useNavigate();
	const { projectId } = useParams();
	const location = useLocation();

	// Get project data from navigation state
	const project = location.state?.project || projectsData[projectId];

	if (!project) {
		return (
			<>
				<Navbar />
				<div className="min-h-screen bg-gray-50 flex items-center justify-center">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Project Not Found
						</h1>
						<p className="text-gray-600 mb-4">
							Project ID: {projectId}
						</p>
						<button
							onClick={() => navigate("/projects")}
							className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Back to Projects
						</button>
					</div>
				</div>
				<Footer />
			</>
		);
	}

	return (
		<>
			<Navbar />
			<section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Back Button */}
					<button
						onClick={() => navigate("/projects")}
						className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
					>
						<ArrowLeft size={20} />
						Back to Projects
					</button>

					{/* Project Header */}
					<div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
						<div className="flex flex-wrap items-center gap-3 mb-4">
							<span
								className={`px-3 py-1 rounded-full text-sm font-medium ${
									project.status === "Live"
										? "bg-green-100 text-green-800"
										: project.status === "In Development"
										? "bg-blue-100 text-blue-800"
										: "bg-gray-100 text-gray-800"
								}`}
							>
								{project.status}
							</span>
							<span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
								{project.category}
							</span>
						</div>

						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							{project.title}
						</h1>
						<p className="text-xl text-gray-600 mb-6">
							{project.fullDescription}
						</p>

						{/* Project Meta */}
						<div className="flex flex-wrap gap-6 text-sm text-gray-600">
							<div className="flex items-center gap-2">
								<Calendar size={16} />
								<span>
									Timeline: {project.timeline || "2-3 months"}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Users size={16} />
								<span>
									Team: {project.teamSize || "Solo project"}
								</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Screenshots */}
							<div className="bg-white rounded-2xl shadow-xl p-6">
								<h2 className="text-2xl font-bold text-gray-900 mb-6">
									Screenshots
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<h3 className="text-lg font-semibold text-gray-700 mb-3">
											Web Version
										</h3>
										<img
											src={project.webScreenshot}
											alt={`${project.title} Web`}
											className="w-full rounded-lg shadow-lg"
										/>
									</div>
									<div>
										<h3 className="text-lg font-semibold text-gray-700 mb-3">
											Mobile Version
										</h3>
										<img
											src={project.mobileScreenshot}
											alt={`${project.title} Mobile`}
											className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
										/>
									</div>
								</div>
							</div>

							{/* Documentation */}
							<div className="bg-white rounded-2xl shadow-xl p-6">
								<h2 className="text-2xl font-bold text-gray-900 mb-6">
									Project Details
								</h2>
								<div className="prose max-w-none">
									<p className="text-gray-700 leading-relaxed mb-6">
										{project.documentation ||
											project.fullDescription}
									</p>

									{/* Features Section */}
									<h3 className="text-xl font-semibold text-gray-900 mb-4">
										Key Features
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{project.features.map(
											(feature, index) => (
												<div
													key={index}
													className="flex items-center gap-3"
												>
													<div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
													<span className="text-gray-700">
														{feature}
													</span>
												</div>
											)
										)}
									</div>
								</div>
							</div>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Action Buttons */}
							<div className="bg-white rounded-2xl shadow-xl p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Project Links
								</h3>
								<div className="space-y-3">
									{project.liveLink && (
										<a
											href={project.liveLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
										>
											<ExternalLink size={18} />
											Live Demo
										</a>
									)}
									{project.githubLink && (
										<a
											href={project.githubLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-3 w-full px-4 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
										>
											<Github size={18} />
											View Code
										</a>
									)}
									{project.demoLink && (
										<a
											href={project.demoLink}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-3 w-full px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
										>
											<Play size={18} />
											Video Demo
										</a>
									)}
								</div>
							</div>

							{/* Tech Stack */}
							<div className="bg-white rounded-2xl shadow-xl p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Technologies
								</h3>
								<div className="flex flex-wrap gap-2">
									{project.techStack.map((tech, index) => (
										<span
											key={index}
											className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200"
										>
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Features */}
							<div className="bg-white rounded-2xl shadow-xl p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Key Features
								</h3>
								<div className="space-y-2">
									{project.features.map((feature, index) => (
										<div
											key={index}
											className="flex items-center gap-3 text-gray-700"
										>
											<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
											<span className="text-sm">
												{feature}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default ProjectDetail;
