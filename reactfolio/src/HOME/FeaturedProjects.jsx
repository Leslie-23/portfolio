export default function FeaturedProjects() {
	const projects = [
		{
			title: "E-Commerce Platform",
			description:
				"Full-stack e-commerce solution with payment integration and inventory management",
			tags: ["React", "Node.js", "MongoDB", "Stripe"],
			image: "/ecommerce-dashboard.png",
		},
		{
			title: "Analytics Dashboard",
			description:
				"Real-time analytics dashboard with advanced visualization and data processing",
			tags: ["Next.js", "TypeScript", "Recharts", "Supabase"],
			image: "/analytics-dashboard.png",
		},
		{
			title: "Mobile App",
			description:
				"Cross-platform mobile application with offline capabilities and sync",
			tags: ["React Native", "Firebase", "Redux"],
			image: "/mobile-app-interface.png",
		},
	];

	return (
		<section className="py-20 bg-background px-4 md:px-8">
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
