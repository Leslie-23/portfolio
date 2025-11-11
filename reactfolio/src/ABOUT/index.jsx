import React from "react";
import {
	Code,
	Database,
	Cloud,
	Smartphone,
	Palette,
	Shield,
	Zap,
	Cpu,
	Globe,
	Workflow,
	Terminal,
	BarChart3,
	Server,
	Layout,
	Brain,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
	const skillCategories = [
		{
			name: "Core Languages",
			icon: <Cpu size={24} />,
			skills: [
				"C",
				"C++",
				"C#",
				"Java",
				"Python",
				"JavaScript",
				"TypeScript",
				"SQL",
			],
			color: "bg-blue-100 text-blue-700 border-blue-200",
		},
		{
			name: "Web Development",
			icon: <Globe size={24} />,
			skills: [
				"HTML5",
				"CSS3/SCSS",
				"Tailwind CSS",
				"React.js",
				"Next.js",
				"Node.js",
				"Express.js",
				"RESTful APIs",
				"GraphQL",
			],
			color: "bg-green-100 text-green-700 border-green-200",
		},
		{
			name: "Backend & Databases",
			icon: <Database size={24} />,
			skills: [
				"MySQL",
				"PostgreSQL",
				"MongoDB",
				"Redis",
				"Prisma ORM",
				"Sequelize ORM",
				"Firebase",
			],
			color: "bg-purple-100 text-purple-700 border-purple-200",
		},
		{
			name: "System Design",
			icon: <Workflow size={24} />,
			skills: [
				"Microservices Architecture",
				"MVC/MVVM Patterns",
				"API Gateway Design",
				"Load Balancing & Caching",
				"JWT/OAuth2",
				"Performance Optimization",
			],
			color: "bg-red-100 text-red-700 border-red-200",
		},
		{
			name: "Mobile Development",
			icon: <Smartphone size={24} />,
			skills: ["React Native", "Expo", "Flutter"],
			color: "bg-pink-100 text-pink-700 border-pink-200",
		},
		{
			name: "Cloud & DevOps",
			icon: <Cloud size={24} />,
			skills: [
				"Docker",
				"GitHub Actions",
				"Railway/Render",
				"Vercel/Netlify",
				"AWS",
				"DigitalOcean",
				"Nginx",
			],
			color: "bg-orange-100 text-orange-700 border-orange-200",
		},
		{
			name: "Developer Tools",
			icon: <Terminal size={24} />,
			skills: [
				"Git/GitHub",
				"VS Code",
				"JetBrains IDEs",
				"Postman",
				"Figma",
				"Notion/Trello",
			],
			color: "bg-gray-100 text-gray-700 border-gray-200",
		},
		{
			name: "Security & Optimization",
			icon: <Shield size={24} />,
			skills: [
				"HTTPS/SSL",
				"CORS/CSRF",
				"Input Validation",
				"Performance Profiling",
				"Secure Authentication",
			],
			color: "bg-yellow-100 text-yellow-700 border-yellow-200",
		},
		{
			name: "UI/UX & Styling",
			icon: <Palette size={24} />,
			skills: [
				"Tailwind CSS",
				"Framer Motion",
				"ShadCN/UI",
				"Material UI",
				"Responsive Design",
			],
			color: "bg-cyan-100 text-cyan-700 border-cyan-200",
		},
		{
			name: "Data & AI",
			icon: <BarChart3 size={24} />,
			skills: [
				"NumPy",
				"Pandas",
				"TensorFlow",
				"PyTorch",
				"Data Visualization",
			],
			color: "bg-indigo-100 text-indigo-700 border-indigo-200",
		},
		{
			name: "Integrations",
			icon: <Zap size={24} />,
			skills: [
				"Nodemailer/Resend",
				"Cloudinary/S3",
				"Stripe/Paystack",
				"WebSockets",
				"Analytics",
			],
			color: "bg-teal-100 text-teal-700 border-teal-200",
		},
	];

	return (
		<>
			<Navbar />
			<section id="about" className="py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="text-center mb-16">
						<h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
							About Me
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Building scalable, intelligent, and beautifully
							engineered systems that balance performance with
							purpose.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						{/* Left Column - Bio & Mission */}
						<div className="space-y-8">
							{/* Main Bio */}
							<div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
								<h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
									<Code className="text-blue-600" size={28} />
									My Journey
								</h3>
								<p className="text-lg text-gray-700 leading-relaxed">
									I'm{" "}
									<span className="font-semibold text-green-600">
										Leslie Paul
									</span>
									, a Software Engineer and Information
									Technology student with a strong foundation
									in both software design and systems
									development. I thrive on building
									intelligent, efficient, and scalable digital
									solutions that bridge performance with
									clean, modern design.
									<br />
									<a
										href="/socials"
										className="text-blue-500 underline"
									>
										My Socials
									</a>
								</p>
								<span className="font-light text-xs text-subs text-green-600">
									<sub>PS i love the color green.</sub>
								</span>
							</div>

							{/* Technical Background */}
							<div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
								<h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
									<Server
										className="text-green-600"
										size={24}
									/>
									Technical Versatility
								</h4>
								<p className="text-gray-700 leading-relaxed mb-4">
									My technical background spans a wide range
									of languages and frameworks — including C,
									C++, C#, Java, Python, and JavaScript —
									giving me a deep understanding of software
									engineering principles across multiple
									paradigms.
								</p>
								<p className="text-gray-700 leading-relaxed">
									This versatility allows me to move fluidly
									between backend logic, API design, and
									frontend interfaces while maintaining a
									strong focus on architectural integrity and
									code quality.
								</p>
							</div>

							{/* Mission Statement */}
							<div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
								<h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
									<Zap
										className="text-purple-600"
										size={24}
									/>
									Mission & Philosophy
								</h4>
								<p className="text-gray-700 leading-relaxed italic">
									"My mission is to build scalable,
									intelligent, and user-centered software
									systems that merge technical precision with
									impactful design. I aim to engineer clean,
									performant, and resilient applications that
									solve real-world problems while embodying
									simplicity, scalability, and sustainability
									in every line of code."
								</p>
							</div>

							<div className="bg-gradient-to-br from-green-50 to-green-50 rounded-2xl p-8 border border-green-100">
								<h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
									<Brain
										className="text-green-600"
										size={24}
									/>
									My Journey & Reflections on Technology
								</h4>
								<p className="text-gray-700 leading-relaxed italic">
									"I’ve always seen technology as more than
									just lines of code or stacks of
									frameworks—it’s a living language that
									connects creativity with logic, art with
									precision, and vision with reality. My
									relationship with tech has been one of
									curiosity and persistence—where every bug
									has taught me patience, every failure
									refined my focus, and every successful build
									reminded me why I love this field. <br />
									<br />
									To me, software isn’t just about creating
									apps; it’s about crafting experiences that
									simplify how people live, work, and connect.
									I believe great engineering is
									invisible—it’s the kind that makes systems
									feel effortless, interfaces feel intuitive,
									and solutions feel personal. I’m driven by
									the challenge of merging beauty with
									performance, making technology not only
									functional but deeply human. <br />
									<br />
									In this ever-evolving industry, I find
									excitement in how quickly things shift. One
									month a framework dominates, the next month
									it’s outdated. Yet, that constant motion is
									what keeps me grounded. It forces
									adaptability, humility, and continuous
									learning—the true currency of innovation.
									I’ve learned that staying relevant in tech
									isn’t just about mastering syntax; it’s
									about mastering thought. <br />
									<br />
									So when I build, I don’t just write code—I
									architect systems that tell a story. Each
									project carries a fingerprint of who I am:
									disciplined, analytical, and forever
									curious. My goal isn’t to just follow
									trends, but to build things that outlast
									them—to create software that speaks to both
									the mind and the emotion behind the screen."
								</p>
							</div>
						</div>

						{/* Right Column - Skills Overview */}
						<div className="space-y-8">
							{/* Skills Header */}
							<div className="text-center mb-8">
								<h3 className="text-3xl font-bold text-gray-900 mb-3">
									Technical Toolkit
								</h3>
								<p className="text-gray-600">
									Comprehensive skills across the full
									development stack
								</p>
							</div>

							{/* Skills Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{skillCategories.map((category, index) => (
									<div
										key={category.name}
										className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg group"
									>
										<div className="flex items-center gap-3 mb-4">
											<div
												className={`p-2 rounded-lg ${
													category.color.split(" ")[0]
												}`}
											>
												{category.icon}
											</div>
											<h4 className="font-bold text-gray-900 text-lg">
												{category.name}
											</h4>
										</div>
										<div className="flex flex-wrap gap-2">
											{category.skills.map(
												(skill, skillIndex) => (
													<span
														key={skillIndex}
														className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200 group-hover:border-blue-200 transition-colors duration-300"
													>
														{skill}
													</span>
												)
											)}
										</div>
									</div>
								))}
							</div>

							{/* Core Values */}
							<div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100 mt-8">
								<h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
									<Layout
										className="text-orange-600"
										size={24}
									/>
									Development Philosophy
								</h4>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
										<span className="text-gray-700 font-medium">
											Clean Architecture & Code Quality
										</span>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
										<span className="text-gray-700 font-medium">
											Performance & Scalability
										</span>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
										<span className="text-gray-700 font-medium">
											Design Thinking & User Experience
										</span>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
										<span className="text-gray-700 font-medium">
											Continuous Learning & Improvement
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Call to Action */}
				<div className="z-2 text-center w-full mt-16 bg-green-500  p-8 border border-gray-200 ">
					<h2 className="text-4xl font-bold text-white mb-4">
						Let's Build Something Amazing Together
					</h2>
					<p className="text-xl text-white max-w-2xl mx-auto mb-6">
						Whether you need a robust backend system, a modern web
						application, or a complete digital solution, I'm ready
						to bring your ideas to life with clean, efficient code
						and thoughtful architecture.
					</p>
					<div className="flex flex-wrap justify-center gap-4 roboto-condensed-regular">
						<a
							href="/contact"
							className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group"
						>
							<span className="relative z-10">
								Start a Project
							</span>
						</a>
						<a
							href="/projects"
							className="flex items-center gap-2 px-8 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-300"
						>
							View My Work
						</a>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default About;
