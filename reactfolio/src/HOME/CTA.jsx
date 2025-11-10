export default function CTA() {
	return (
		<section className="py-20 bg-green-500 px-4 md:px-8">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
					Ready to Work Together?
				</h2>
				<p className="text-xl text-white  mb-8 leading-relaxed max-w-2xl mx-auto">
					I'm always excited to discuss new projects and
					opportunities. Let's create something amazing together!
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center roboto-condensed-regular">
					<button
						onClick={() => (window.location.href = "/contact")}
						className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg transition-shadow roboto-condensed-regular hover:shadow-black/10 hover:scale-105 hover:text-white"
					>
						Get In Touch
					</button>
					<button
						onClick={() => (window.location.href = "/projects")}
						className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground font-semibold rounded-lg bg-white hover:text-black hover:shadow-lg hover:shadow-black/10 transition-colors hover:scale-105 roboto-condensed-regular"
					>
						View My Work
					</button>
				</div>
			</div>
		</section>
	);
}
