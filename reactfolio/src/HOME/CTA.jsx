import { useNavigate } from "react-router-dom";

export default function CTA() {
	const navigate = useNavigate();

	return (
		<section className="py-20 bg-primary px-4 md:px-8">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-heading">
					Need an Engineer Who Ships?
				</h2>
				<p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
					I build production-grade applications from database to
					deployment. Let's talk about your next project.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center font-heading">
					<button
						onClick={() => navigate("/contact")}
						className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:shadow-black/10 hover:scale-105"
					>
						Start a Conversation
					</button>
					<button
						onClick={() => navigate("/projects")}
						className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-all hover:scale-105"
					>
						View My Work
					</button>
				</div>
			</div>
		</section>
	);
}
