import React, { useState, useEffect } from "react";
import {
	// Core Languages
	FileCode,
	Cpu,
	Hash,
	Coffee,
	FileJson,
	Type,
	Database as DbIcon,
	// Web Development
	Code,
	Palette,
	Wind,
	Link,
	Globe,
	Server,
	GitBranch,
	// Backend & Databases
	Database,
	DatabaseBackup,
	Box,
	Brain,
	KeyRound,
	FolderSearch,
	Flame,
	// Mobile
	Smartphone,
	Monitor,
	Tablet,
	// Cloud & DevOps
	Container,
	GitCommit,
	Train,
	Rocket,
	Cloud,
	Cloudy,
	Network,
	// System Design
	Workflow,
	LayoutGrid,
	GitMerge,
	Scale,
	Key,
	Zap,
	// Data & AI
	BarChart3,
	Table,
	BrainCircuit,
	Atom,
	BarChart,
	// Developer Tools
	GitCommit as GitIcon,
	Terminal,
	Hammer,
	TestTube,
	Palette as FigmaIcon,
	Calendar,
	// Security
	Shield,
	Lock,
	Filter,
	Gauge,
	UserCheck,
	// UI/UX
	Brush,
	Move,
	Component,
	Layers,
	Monitor as ResponsiveIcon,
	// Integrations
	Mail,
	Image,
	CreditCard,
	MessageSquare,
	BarChart as AnalyticsIcon,
} from "lucide-react";

const SkillsCarousel = () => {
	const [activeCategory, setActiveCategory] = useState(0);

	const skillCategories = [
		{
			name: "Core Languages",
			icon: <FileCode size={24} />,
			skills: [
				{ name: "C", icon: <Cpu size={20} /> },
				{ name: "C++", icon: <Hash size={20} /> },
				{ name: "C#", icon: <FileCode size={20} /> },
				{ name: "Java", icon: <Coffee size={20} /> },
				{ name: "Python", icon: <FileCode size={20} /> }, // Using FileCode as fallback
				{ name: "JavaScript", icon: <FileJson size={20} /> },
				{ name: "TypeScript", icon: <Type size={20} /> },
				{ name: "SQL", icon: <DbIcon size={20} /> },
			],
			color: "bg-blue-100 text-blue-700",
		},
		{
			name: "Web Development",
			icon: <Globe size={24} />,
			skills: [
				{ name: "HTML5", icon: <Code size={20} /> },
				{ name: "CSS3/SCSS", icon: <Palette size={20} /> },
				{ name: "Tailwind CSS", icon: <Wind size={20} /> },
				{ name: "React.js", icon: <Link size={20} /> },
				{ name: "Next.js", icon: <Link size={20} /> },
				{ name: "Node.js", icon: <Server size={20} /> },
				{ name: "Express.js", icon: <Server size={20} /> },
				{ name: "RESTful APIs", icon: <Link size={20} /> },
				{ name: "GraphQL", icon: <GitBranch size={20} /> },
			],
			color: "bg-green-100 text-green-700",
		},
		{
			name: "Backend & Databases",
			icon: <Database size={24} />,
			skills: [
				{ name: "MySQL", icon: <Database size={20} /> },
				{ name: "PostgreSQL", icon: <DatabaseBackup size={20} /> },
				{ name: "MongoDB", icon: <Box size={20} /> },
				{ name: "Redis", icon: <Brain size={20} /> },
				{ name: "Prisma ORM", icon: <KeyRound size={20} /> },
				{ name: "Sequelize ORM", icon: <FolderSearch size={20} /> },
				{ name: "Firebase", icon: <Flame size={20} /> },
			],
			color: "bg-purple-100 text-purple-700",
		},
		{
			name: "Mobile Development",
			icon: <Smartphone size={24} />,
			skills: [
				{ name: "React Native", icon: <Monitor size={20} /> },
				{ name: "Expo", icon: <Smartphone size={20} /> },
				{ name: "Flutter", icon: <Tablet size={20} /> },
			],
			color: "bg-pink-100 text-pink-700",
		},
		{
			name: "Cloud & DevOps",
			icon: <Cloud size={24} />,
			skills: [
				{ name: "Docker", icon: <Container size={20} /> },
				{ name: "GitHub Actions", icon: <GitCommit size={20} /> },
				{ name: "Railway/Render", icon: <Train size={20} /> },
				{ name: "Vercel/Netlify", icon: <Rocket size={20} /> },
				{ name: "AWS", icon: <Cloud size={20} /> },
				{ name: "DigitalOcean", icon: <Cloudy size={20} /> },
				{ name: "Nginx", icon: <Network size={20} /> },
			],
			color: "bg-orange-100 text-orange-700",
		},
		{
			name: "System Design",
			icon: <Workflow size={24} />,
			skills: [
				{ name: "Microservices", icon: <Workflow size={20} /> },
				{ name: "MVC/MVVM", icon: <LayoutGrid size={20} /> },
				{ name: "API Gateway", icon: <GitMerge size={20} /> },
				{ name: "Load Balancing", icon: <Scale size={20} /> },
				{ name: "JWT/OAuth2", icon: <Key size={20} /> },
				{ name: "Performance Optimization", icon: <Zap size={20} /> },
			],
			color: "bg-red-100 text-red-700",
		},
		{
			name: "Data & AI",
			icon: <BarChart3 size={24} />,
			skills: [
				{ name: "NumPy", icon: <Table size={20} /> },
				{ name: "Pandas", icon: <BarChart3 size={20} /> },
				{ name: "TensorFlow", icon: <BrainCircuit size={20} /> },
				{ name: "PyTorch", icon: <Atom size={20} /> },
				{ name: "Data Visualization", icon: <BarChart size={20} /> },
			],
			color: "bg-indigo-100 text-indigo-700",
		},
		{
			name: "Developer Tools",
			icon: <Terminal size={24} />,
			skills: [
				{ name: "Git/GitHub", icon: <GitIcon size={20} /> },
				{ name: "VS Code", icon: <Code size={20} /> },
				{ name: "JetBrains IDEs", icon: <Hammer size={20} /> },
				{ name: "Postman", icon: <TestTube size={20} /> },
				{ name: "Figma", icon: <FigmaIcon size={20} /> },
				{ name: "Notion/Trello", icon: <Calendar size={20} /> },
			],
			color: "bg-gray-100 text-gray-700",
		},
		{
			name: "Security & Optimization",
			icon: <Shield size={24} />,
			skills: [
				{ name: "HTTPS/SSL", icon: <Shield size={20} /> },
				{ name: "CORS/CSRF", icon: <Filter size={20} /> },
				{ name: "Input Validation", icon: <Lock size={20} /> },
				{ name: "Performance Profiling", icon: <Gauge size={20} /> },
				{
					name: "Secure Authentication",
					icon: <UserCheck size={20} />,
				},
			],
			color: "bg-yellow-100 text-yellow-700",
		},
		{
			name: "UI/UX & Styling",
			icon: <Brush size={24} />,
			skills: [
				{ name: "Tailwind CSS", icon: <Wind size={20} /> },
				{ name: "Framer Motion", icon: <Move size={20} /> },
				{ name: "ShadCN/UI", icon: <Component size={20} /> },
				{ name: "Material UI", icon: <Layers size={20} /> },
				{
					name: "Responsive Design",
					icon: <ResponsiveIcon size={20} />,
				},
			],
			color: "bg-cyan-100 text-cyan-700",
		},
		{
			name: "Integrations",
			icon: <Zap size={24} />,
			skills: [
				{ name: "Nodemailer/Resend", icon: <Mail size={20} /> },
				{ name: "Cloudinary/S3", icon: <Image size={20} /> },
				{ name: "Stripe/Paystack", icon: <CreditCard size={20} /> },
				{ name: "WebSockets", icon: <MessageSquare size={20} /> },
				{ name: "Analytics", icon: <AnalyticsIcon size={20} /> },
			],
			color: "bg-teal-100 text-teal-700",
		},
	];

	// Auto-rotate categories
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveCategory((prev) => (prev + 1) % skillCategories.length);
		}, 4000);
		return () => clearInterval(interval);
	}, [skillCategories.length]);

	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
						Tech Stack & Skills
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Comprehensive toolkit for building modern, scalable
						applications
					</p>
				</div>

				{/* Category Navigation */}
				<div className="flex flex-wrap justify-center gap-2 mb-8">
					{skillCategories.map((category, index) => (
						<button
							key={category.name}
							onClick={() => setActiveCategory(index)}
							className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
								activeCategory === index
									? "bg-green-600 text-white shadow-lg transform scale-105"
									: "bg-white text-gray-700 hover:bg-green-100 hover:text-green-700"
							}`}
						>
							{category.icon}
							<span className="text-sm font-medium">
								{category.name}
							</span>
						</button>
					))}
				</div>

				{/* Skills Carousel */}
				<div className="relative bg-white rounded-2xl shadow-lg p-4 w-full">
					{/* Active Category Display */}
					<div className="text-center mb-8">
						<div className="flex items-center justify-center gap-3 mb-4">
							<div
								className={`p-3 rounded-full ${
									skillCategories[activeCategory].color.split(
										" "
									)[0]
								}`}
							>
								{skillCategories[activeCategory].icon}
							</div>
							<h3 className="text-2xl font-bold text-black">
								{skillCategories[activeCategory].name}
							</h3>
						</div>
					</div>

					{/* Skills Grid */}
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{skillCategories[activeCategory].skills.map(
							(skill, index) => (
								<div
									key={skill.name}
									className="group relative bg-gray-50 rounded-xl p-4 text-center transition-all duration-300 hover:shadow-md hover:scale-105"
								>
									<div
										className={`w-12 h-12 mx-auto mb-3 rounded-lg ${
											skillCategories[
												activeCategory
											].color.split(" ")[0]
										} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
									>
										{skill.icon}
									</div>
									<span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
										{skill.name}
									</span>
								</div>
							)
						)}
					</div>

					{/* Navigation Dots */}
					<div className="flex justify-center mt-8 space-x-2">
						{skillCategories.map((_, index) => (
							<button
								key={index}
								onClick={() => setActiveCategory(index)}
								className={`w-2 h-1 rounded-full transition-all duration-100 ${
									activeCategory === index
										? "bg-green-600 scale-125"
										: "bg-gray-300 hover:bg-gray-400"
								}`}
							/>
						))}
					</div>
				</div>

				{/* Progress Bar */}
				<div className="mt-6 bg-gray-200 rounded-full h-0.5">
					<div
						className="bg-green-600 h-1 rounded-full transition-all duration-1000 ease-out"
						style={{
							width: `${
								((activeCategory + 1) /
									skillCategories.length) *
								100
							}%`,
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default SkillsCarousel;
