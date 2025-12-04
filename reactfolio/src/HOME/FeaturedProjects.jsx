import { useNavigate } from "react-router-dom";

export default function FeaturedProjects() {
	const navigate = useNavigate();
	const projects = [
		{
			title: "Restaurant Website",
			description:
				"A sleek and modern restaurant website with menu browsing, online reservations, and in-house ordering system.",
			link: "/projects/restaurant-website",
			tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
			image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
			details: {
				overview:
					"Developed a fully responsive restaurant platform that allows users to view the menu, make online reservations, and place in-house orders. The interface was inspired by luxury dining aesthetics, ensuring a balance of elegance and usability.",
				features: [
					"Interactive menu with dynamic categories",
					"Table reservation system with confirmation emails",
					"Admin dashboard for menu and order management",
					"Integration with payment gateways for in-house orders",
				],
				tech: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
				liveDemo: "https://yourrestaurantdemo.com",
				github: "https://github.com/yourusername/restaurant-website",
			},
		},
		{
			title: "E-Commerce Platform",
			description:
				"Full-stack e-commerce solution with payment integration and inventory management",
			link: "/projects/e-commerce-platform",
			tags: ["React", "Node.js", "MongoDB", "Stripe"],
			image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWNvbW1lcmNlJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
		},
		{
			title: "Analytics Dashboard",
			description:
				"Real-time analytics dashboard with advanced visualization and data processing",
			link: "/projects/social-media-analytics",
			tags: ["Next.js", "TypeScript", "Recharts", "Supabase"],
			image: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
		},
		{
			title: "Mobile App",
			description:
				"Cross-platform mobile application with offline capabilities and sync",
			link: "/projects/fitness-tracker",
			tags: ["React Native", "Firebase", "Redux"],
			image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
		},
	];

	return (
		<section className="py-20 bg-white px-4 md:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
						Featured Projects
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						A selection of recent projects showcasing my expertise
						in building modern digital solutions.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{projects.map((project, idx) => (
						<div
							key={idx}
							className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
							onClick={() => navigate(`${project.link}`)}
						>
							<div className="h-48 overflow-hidden bg-muted">
								<img
									src={project.image || "/placeholder.svg"}
									alt={project.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold mb-2 text-card-foreground">
									{project.title}
								</h3>
								<p className="text-muted-foreground mb-4 leading-relaxed">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag, tagIdx) => (
										<span
											key={tagIdx}
											className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
