import { useNavigate } from "react-router-dom";

export default function FeaturedProjects() {
	const navigate = useNavigate();
	const projects = [
		{
			title: "Trofficient",
			description:
				"Transit intelligence for Ghana's trotro network — real-time tracking, dynamic pricing, and mobile-money payments.",
			link: "/projects/trofficient",
			tags: ["React Native", "Node.js", "Socket.io", "PostgreSQL"],
			image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "AI-SME",
			description:
				"AI-powered BI for small businesses. Natural-language assistant grounded in real sales, inventory, and expense data.",
			link: "/projects/ai-sme",
			tags: ["React", "TypeScript", "Node.js", "MongoDB"],
			image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Captivating Home Trade",
			description:
				"Production e-commerce and operations platform for a live retail business — paid client work on a custom domain.",
			link: "/projects/captivating-home-trade",
			tags: ["React", "Node.js", "Express", "MongoDB"],
			image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
		},
		{
			title: "Grilli",
			description:
				"High-end restaurant platform — reservations, in-house ordering, and admin tooling on the MERN stack.",
			link: "/projects/grilli",
			tags: ["React", "TailwindCSS", "Node.js", "MongoDB"],
			image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
		},
	];

	return (
		<section className="py-20 bg-surface px-4 md:px-8 transition-colors duration-300">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-heading font-heading">
						Featured Projects
					</h2>
					<p className="text-lg text-muted max-w-2xl mx-auto">
						A selection of recent projects showcasing my expertise in
						building modern digital solutions.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{projects.map((project, idx) => (
						<div
							key={idx}
							className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer"
							onClick={() => navigate(`${project.link}`)}
						>
							<div className="h-48 overflow-hidden bg-surface-alt">
								<img
									src={project.image || "/placeholder.svg"}
									alt={project.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-bold mb-2 text-heading">
									{project.title}
								</h3>
								<p className="text-muted mb-4 leading-relaxed">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.tags.map((tag, tagIdx) => (
										<span
											key={tagIdx}
											className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-primary text-sm rounded-full"
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
