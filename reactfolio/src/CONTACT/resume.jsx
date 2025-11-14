import React, { useState, useRef } from "react";
import {
	Download,
	Mail,
	Phone,
	MapPin,
	ExternalLink,
	Calendar,
	Award,
	Code,
	Database,
	Smartphone,
} from "lucide-react";

const Resume = () => {
	const resumeRef = useRef();
	const [isDownloading, setIsDownloading] = useState(false);

	// Resume data - easily customizable
	const resumeData = {
		personalInfo: {
			name: "Leslie Paul Ajayi",
			title: "Software Engineer & IT Student",
			location: "Accra, Ghana",
			portfolio: "https://lesliepaul.me",
			github: "https://github.com/leslie-23",
			email: "leslieajayi27@gmail.com",
			phone: "+233 (27) 123-7965",
		},
		summary:
			"Passionate Software Engineer and IT student with expertise in full-stack development, mobile applications, and system architecture. Strong background in creating innovative solutions for real-world problems, with proven academic excellence and hands-on project experience in transportation systems, social networks, and developer tools.",
		education: [
			{
				institution: "Regional Maritime University",
				period: "2022 – 2026",
				achievements: [
					"Best in IT Project Management class (Lecturer: Prof Emmanuel Arhin)",
					"Best in Data Structures class (Lecturer: Prof Eric Johnson)",
				],
			},
			{
				institution: "Udemy",
				period: "2023",
				achievements: [
					"Web Development Bootcamp by Colt Steele",
					"Mobile App Development with React Native by Maximilian Schwarzmüller",
				],
			},
		],
		skills: {
			languages: ["JavaScript", "C++", "Java", "C#", "PHP", "SQL"],
			frameworks: [
				"React",
				"Node.js",
				"React Native",
				"Express",
				"Tailwind CSS",
				"Styled Components",
			],
			tools: ["Git", "GitHub", "MongoDB", "MySQL"],
			other: [
				"Database Design",
				"System Architecture",
				"App Development",
				"UI/UX Design",
			],
		},
		projects: [
			{
				title: "Transportation App (Spintex Area)",
				description:
					"React Native frontend with Node.js backend and MySQL database. Features real-time bus tracking, route planning, and MTN Mobile Money integration.",
				technologies: [
					"React Native",
					"Node.js",
					"MySQL",
					"Mobile Money API",
				],
				icon: <Smartphone className="w-5 h-5" />,
			},
			{
				title: "Campus Connect",
				description:
					"University social network platform with backend & database design, routing, and real-time location/activity sharing.",
				technologies: ["React", "Node.js", "MongoDB", "WebSockets"],
				icon: <Database className="w-5 h-5" />,
			},
			{
				title: "MERN Text Formatting Tool",
				description:
					"Styled social media posts creation tool with MongoDB storage for formatted content.",
				technologies: [
					"MERN Stack",
					"MongoDB",
					"Express",
					"React",
					"Node.js",
				],
				icon: <Code className="w-5 h-5" />,
			},
			{
				title: "Web Tool for Custom Text Images",
				description:
					"Customizable text, fonts, colors, and backgrounds generator using JavaScript.",
				technologies: ["JavaScript", "HTML5 Canvas", "CSS3"],
				icon: <Code className="w-5 h-5" />,
			},
			{
				title: "Portfolio Website",
				description:
					"Professional portfolio showcasing projects and skills at lesliepaul.me",
				technologies: ["React", "Tailwind CSS", "Responsive Design"],
				icon: <ExternalLink className="w-5 h-5" />,
			},
		],
	};

	const handleDownload = async () => {
		setIsDownloading(true);
		// Simulate PDF generation process
		setTimeout(() => {
			setIsDownloading(false);
			// In a real implementation, you would use html2pdf or similar library here
			alert("PDF download functionality would be implemented here");
		}, 2000);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-12 px-2 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				{/* Resume Container */}
				<div
					ref={resumeRef}
					className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-100"
				>
					{/* Header */}
					<div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8">
						<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
							<div className="flex-1">
								<h1 className="text-4xl font-bold mb-2">
									{resumeData.personalInfo.name}
								</h1>
								<p className="text-xl text-green-100 mb-4">
									{resumeData.personalInfo.title}
								</p>

								<div className="flex flex-wrap gap-4 text-green-100">
									<div className="flex items-center gap-2">
										<MapPin className="w-4 h-4" />
										<span>
											{resumeData.personalInfo.location}
										</span>
									</div>
									<div className="flex items-center gap-2">
										<Mail className="w-4 h-4" />
										<a href="mailto:leslieajayi27@gmail.com">
											{resumeData.personalInfo.email}
										</a>
									</div>
									<div className="flex items-center gap-2">
										<Phone className="w-4 h-4" />
										<a href="tel:+233271237965">
											{resumeData.personalInfo.phone}
										</a>
									</div>
								</div>
							</div>

							<div className="mt-4 lg:mt-0">
								<a
									href={resumeData.personalInfo.github}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 hover:scale-105"
								>
									<ExternalLink className="w-4 h-4" />
									Visit Github
								</a>
							</div>
						</div>
					</div>

					{/* Download Button */}
					<div className="bg-green-50 px-8 py-4 border-b border-green-100">
						<button
							onClick={handleDownload}
							disabled={isDownloading}
							className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isDownloading ? (
								<>
									<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
									Generating PDF...
								</>
							) : (
								<>
									<Download className="w-4 h-4" />
									Download Resume
								</>
							)}
						</button>
					</div>

					{/* Content */}
					<div className="p-8 space-y-8">
						{/* Summary Section */}
						<section className="space-y-4">
							<h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-200 pb-2">
								Professional Summary
							</h2>
							<p className="text-gray-700 leading-relaxed">
								{resumeData.summary}
							</p>
						</section>

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							{/* Left Column */}
							<div className="lg:col-span-2 space-y-8">
								{/* Projects Section */}
								<section className="space-y-4">
									<h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-200 pb-2">
										Projects & Experience
									</h2>
									<div className="space-y-6">
										{resumeData.projects.map(
											(project, index) => (
												<div
													key={index}
													className="bg-green-50 rounded-xl p-6 border border-green-200 hover:shadow-md transition-all duration-300"
												>
													<div className="flex items-start gap-4">
														<div className="p-2 bg-green-100 rounded-lg text-green-600">
															{project.icon}
														</div>
														<div className="flex-1">
															<h3 className="text-xl font-semibold text-gray-900 mb-2">
																{project.title}
															</h3>
															<p className="text-gray-700 mb-3 leading-relaxed">
																{
																	project.description
																}
															</p>
															<div className="flex flex-wrap gap-2">
																{project.technologies.map(
																	(
																		tech,
																		techIndex
																	) => (
																		<span
																			key={
																				techIndex
																			}
																			className="px-3 py-1 bg-white text-green-700 rounded-full text-sm font-medium border border-green-200"
																		>
																			{
																				tech
																			}
																		</span>
																	)
																)}
															</div>
														</div>
													</div>
												</div>
											)
										)}
									</div>
								</section>

								{/* Education Section */}
								<section className="space-y-4">
									<h2 className="text-2xl font-bold text-gray-900 border-b-2 border-green-200 pb-2">
										Education
									</h2>
									{resumeData.education.map((edu, index) => (
										<div
											key={index}
											className="bg-green-50 rounded-xl p-6 border border-green-200"
										>
											<div className="flex items-start gap-4">
												<div className="p-2 bg-green-100 rounded-lg text-green-600">
													<Award className="w-5 h-5" />
												</div>
												<div className="flex-1">
													<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
														<h3 className="text-xl font-semibold text-gray-900">
															{edu.institution}
														</h3>
														<div className="flex items-center gap-1 text-green-700 font-medium mt-1 sm:mt-0">
															<Calendar className="w-4 h-4" />
															<span>
																{edu.period}
															</span>
														</div>
													</div>
													<ul className="space-y-2">
														{edu.achievements.map(
															(
																achievement,
																achievementIndex
															) => (
																<li
																	key={
																		achievementIndex
																	}
																	className="flex items-start gap-2 text-gray-700"
																>
																	<div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
																	<span>
																		{
																			achievement
																		}
																	</span>
																</li>
															)
														)}
													</ul>
												</div>
											</div>
										</div>
									))}
								</section>
							</div>

							{/* Right Column - Skills */}
							<div className="space-y-8">
								{/* Languages */}
								<section className="space-y-4">
									<h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-200 pb-2">
										Languages
									</h3>
									<div className="flex flex-wrap gap-2">
										{resumeData.skills.languages.map(
											(skill, index) => (
												<span
													key={index}
													className="px-3 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200"
												>
													{skill}
												</span>
											)
										)}
									</div>
								</section>

								{/* Frameworks */}
								<section className="space-y-4">
									<h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-200 pb-2">
										Frameworks & Libraries
									</h3>
									<div className="flex flex-wrap gap-2">
										{resumeData.skills.frameworks.map(
											(skill, index) => (
												<span
													key={index}
													className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200"
												>
													{skill}
												</span>
											)
										)}
									</div>
								</section>

								{/* Tools */}
								<section className="space-y-4">
									<h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-200 pb-2">
										Tools & Technologies
									</h3>
									<div className="flex flex-wrap gap-2">
										{resumeData.skills.tools.map(
											(skill, index) => (
												<span
													key={index}
													className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors duration-200"
												>
													{skill}
												</span>
											)
										)}
									</div>
								</section>

								{/* Other Skills */}
								<section className="space-y-4">
									<h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-200 pb-2">
										Other Skills
									</h3>
									<div className="flex flex-wrap gap-2">
										{resumeData.skills.other.map(
											(skill, index) => (
												<span
													key={index}
													className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-200"
												>
													{skill}
												</span>
											)
										)}
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Resume;
