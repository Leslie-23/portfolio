export default function Services() {
	const services = [
		{
			title: "Web Design",
			description:
				"Creating stunning, user-centered designs that engage and convert",
			icon: "🎨",
		},
		{
			title: "Development",
			description:
				"Building fast, scalable, and maintainable web applications",
			icon: "⚙️",
		},
		{
			title: "Consulting",
			description:
				"Strategic guidance for digital transformation and product strategy",
			icon: "💡",
		},
		{
			title: "Optimization",
			description:
				"Performance tuning and SEO to maximize your web presence",
			icon: "⚡",
		},
	];

	return (
		<section className="py-20 bg-card px-4 md:px-8 bg-green-50">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-card-foreground">
						Services & Expertise
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						I offer comprehensive solutions tailored to bring your
						vision to life with precision and creativity.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{services.map((service, idx) => (
						<div
							key={idx}
							className="p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow"
						>
							<div className="text-5xl mb-4">{service.icon}</div>
							<h3 className="text-2xl font-bold mb-3 text-foreground">
								{service.title}
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								{service.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
