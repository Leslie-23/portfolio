import Footer from "../Footer";
import Navbar from "../Navbar";

const Socials = () => {
	const socialLinks = [
		{
			name: "Twitter",
			handle: "@_iam_leslie",
			url: "https://x.com/_iam_leslie",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
				</svg>
			),
			bgColor: "bg-blue-500",
			hoverColor: "hover:bg-blue-600",
			description: "Daily thoughts & industry insights",
			image: "https://images.unsplash.com/photo-1525770041010-2a1233dd8152?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHdpdHRlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
		},
		{
			name: "GitHub",
			handle: "@leslie-23",
			url: "https://github.com/leslie-23",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
				</svg>
			),
			bgColor: "bg-gray-900",
			hoverColor: "hover:bg-gray-800",
			description: "Open source contributions & projects",
			image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2l0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
		},
		{
			name: "LinkedIn",
			handle: "@in/leslie-paul-ajayi-409b16356",
			url: "https://www.linkedin.com/in/leslie-paul-ajayi-409b16356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
				</svg>
			),
			bgColor: "bg-blue-700",
			hoverColor: "hover:bg-blue-800",
			description: "Professional journey & connections",
			image: "https://media.licdn.com/dms/image/v2/D5616AQH-QLuqk_-9Yg/profile-displaybackgroundimage-shrink_350_1400/B56ZW6iB.7GoAY-/0/1742591272796?e=1764201600&v=beta&t=4uQACOrdQYOHQOBdL6L5JPFjyKK7ELPs5xKcqItDLfY",
		},
		{
			name: "Instagram",
			handle: "@i_am.leslie",
			url: "https://instagram.com/i_am.leslie",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
				</svg>
			),
			bgColor: "bg-pink-600",
			hoverColor: "hover:bg-pink-700",
			description: "Creative moments & behind the scenes",
			image: "https://images.unsplash.com/photo-1596526131090-bcbe09e432d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5zdGFncmFtfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
		},
		// {
		// 	name: "Dribbble",
		// 	handle: "lesliepaul",
		// 	url: "https://dribbble.com/lesliepaul",
		// 	icon: (
		// 		<svg
		// 			className="w-6 h-6"
		// 			fill="currentColor"
		// 			viewBox="0 0 24 24"
		// 		>
		// 			<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.747 10.657c-.364-.134-2.247-.827-4.5-.827-1.352 0-2.458.21-2.654.448-.144.17-.046.656.046.955.115.336.477.83 1.171.83.827 0 1.667-.433 2.654-.974.134-.078.302-.056.404.067.403.49.74 1.095.962 1.786-1.351.672-3.08 1.078-4.99 1.078-1.935 0-3.682-.406-5.038-1.078.222-.69.56-1.295.963-1.786.102-.123.27-.145.404-.067.987.54 1.827.974 2.654.974.694 0 1.056-.494 1.17-.83.093-.3.19-.785.047-.955-.196-.238-1.302-.448-2.654-.448-2.253 0-4.136.693-4.5.827-.538-1.383-.538-2.79 0-4.173.364-.134 2.247-.827 4.5-.827 1.352 0 2.458.21 2.654.448.144.17.046.656-.046.955-.115.336-.477.83-1.171.83-.827 0-1.667-.433-2.654-.974-.134-.078-.302-.056-.404.067-.403.49-.74 1.095-.962 1.786 1.351.672 3.08 1.078 4.99 1.078 1.935 0 3.682-.406 5.038-1.078-.222-.69-.56-1.295-.963-1.786-.102-.123-.27-.145-.404-.067-.987.54-1.827.974-2.654.974-.694 0-1.056-.494-1.17-.83-.093-.3-.19-.785-.047-.955.196-.238 1.302-.448 2.654-.448 2.253 0 4.136.693 4.5.827.538 1.383.538 2.79 0 4.173z" />
		// 		</svg>
		// 	),
		// 	bgColor: "bg-pink-500",
		// 	hoverColor: "hover:bg-pink-600",
		// 	description: "Design work & creative process",
		// 	image: "/socials/dribbble-placeholder.jpg",
		// },
		{
			name: "WhatsApp",
			handle: "+233-27-123-7965",
			url: "https://wa.me/+233271237965",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.187-3.55-8.439" />
				</svg>
			),
			bgColor: "bg-green-500",
			hoverColor: "hover:bg-green-600",
			description: "Quick chats & instant collaboration",
			image: "/profile-image-2.jpg",
		},
		{
			name: "Slack",
			handle: "@leslieajayi27",
			url: "https://leslieajayi27.slack.com",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M6.194 14.644c0 1.16-.945 2.107-2.106 2.107a2.11 2.11 0 01-2.106-2.107 2.11 2.11 0 012.106-2.106h2.106v2.106zm1.06 0c0-1.16.944-2.106 2.106-2.106a2.108 2.108 0 012.106 2.106v5.274a2.108 2.108 0 01-2.106 2.106 2.108 2.108 0 01-2.106-2.106v-5.274zm2.106-8.44a2.108 2.108 0 01-2.106-2.106 2.108 2.108 0 012.106-2.106 2.108 2.108 0 012.106 2.106v2.106h-2.106zm0 1.06c1.16 0 2.106.945 2.106 2.106a2.108 2.108 0 01-2.106 2.106H2.106A2.108 2.108 0 010 9.37a2.108 2.108 0 012.106-2.106h7.254zm8.44 2.106c0-1.16.945-2.106 2.106-2.106a2.108 2.108 0 012.106 2.106 2.108 2.108 0 01-2.106 2.106h-2.106V9.37zm-1.06 0c0 1.16-.945 2.106-2.106 2.106a2.108 2.108 0 01-2.106-2.106V2.106A2.108 2.108 0 0113.47 0a2.108 2.108 0 012.106 2.106v7.264zm-2.106 8.44a2.108 2.108 0 012.106 2.106 2.108 2.108 0 01-2.106 2.106 2.108 2.108 0 01-2.106-2.106v-2.106h2.106zm0-1.06c-1.16 0-2.106-.945-2.106-2.106a2.108 2.108 0 012.106-2.106h7.264A2.108 2.108 0 0124 14.644a2.108 2.108 0 01-2.106 2.106h-7.264z" />
				</svg>
			),
			bgColor: "bg-purple-500",
			hoverColor: "hover:bg-purple-600",
			description: "Team collaboration & workspace chats",
			image: "https://images.unsplash.com/photo-1632488507942-b638eecc151a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNsYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
		},
		{
			name: "Snapchat",
			handle: "leslie.paul",
			url: "https://snapchat.com/add/paulseun003",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M5.829 3.56c-.61 1.12-.858 2.631-.858 4.171 0 1.54.248 3.051.858 4.171.61 1.12 1.542 1.89 2.658 2.163-.035.84-.21 1.646-.508 2.377-.21.504-.525.966-.934 1.354-.42.4-.918.708-1.467.903a4.59 4.59 0 01-1.754.315c-.248 0-.504-.014-.756-.043.035.21.07.42.119.63.14.609.42 1.165.822 1.627.42.483.945.857 1.54 1.095.595.238 1.246.336 1.897.336 1.246 0 2.427-.448 3.346-1.26.91-.803 1.54-1.89 1.797-3.129.07-.336.105-.672.105-1.008 0-.238-.014-.476-.035-.714.945.21 1.925.315 2.912.315.987 0 1.967-.105 2.912-.315-.021.238-.035.476-.035.714 0 .336.035.672.105 1.008.257 1.239.887 2.326 1.797 3.129.92.812 2.1 1.26 3.346 1.26.651 0 1.302-.098 1.897-.336.595-.238 1.12-.612 1.54-1.095.403-.462.682-1.018.822-1.627.05-.21.084-.42.119-.63-.252.029-.508.043-.756.043-.609 0-1.219-.105-1.754-.315a4.217 4.217 0 01-1.467-.903 4.025 4.025 0 01-.934-1.354c-.298-.731-.473-1.537-.508-2.377 1.116-.273 2.048-1.043 2.658-2.163.61-1.12.858-2.631.858-4.171 0-1.54-.248-3.051-.858-4.171-.61-1.12-1.542-1.89-2.658-2.163C18.534 5.014 17.304 5 16 5c-1.304 0-2.534.014-3.513.397-1.116.273-2.048 1.043-2.658 2.163z" />
				</svg>
			),
			bgColor: "bg-yellow-400",
			hoverColor: "hover:bg-yellow-500",
			description: "Moments & behind-the-scenes stories",
			image: "https://images.unsplash.com/photo-1627512322769-85cb8e944bef?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNuYXBjaGF0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
		},
	];

	return (
		<>
			<Navbar />
			<div className="max-w-6xl mt-6 mx-auto px-4 py-12">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-800 mb-4">
						Let's Connect & Create
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Join me across different platforms where I share my
						journey, projects, and creative process. Each space has
						its own vibe and purpose.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{socialLinks.map((social, index) => (
						<div
							key={social.name}
							className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
						>
							{/* Background Image with Overlay */}
							<div className="relative h-48 overflow-hidden">
								<img
									src={social.image}
									alt={social.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									onError={(e) => {
										e.target.style.display = "none";
										e.target.nextSibling.style.display =
											"flex";
									}}
								/>
								{/* Fallback Gradient */}
								<div
									className={`absolute inset-0 ${social.bgColor} flex items-center justify-center hidden`}
								>
									<div className="text-white text-6xl font-bold opacity-20">
										{social.name.charAt(0)}
									</div>
								</div>

								{/* Social Icon Overlay */}
								<div
									className={`absolute top-4 right-4 ${social.bgColor} text-white p-3 rounded-full shadow-lg`}
								>
									{social.icon}
								</div>
							</div>

							{/* Content */}
							<div className="p-6">
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-2xl font-bold text-gray-800">
										{social.name}
									</h3>
									<span className="text-sm text-gray-500 font-medium">
										{social.handle}
									</span>
								</div>

								<p className="text-gray-600 mb-4 leading-relaxed">
									{social.description}
								</p>

								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className={`inline-flex items-center justify-center w-full ${social.bgColor} ${social.hoverColor} text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 group/link`}
								>
									<span>Explore on {social.name}</span>
									<svg
										className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							</div>

							{/* Decorative Element */}
							<div
								className={`absolute bottom-0 left-0 w-full h-1 ${social.bgColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
							></div>
						</div>
					))}
				</div>

				{/* Call to Action */}
				<div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
					<h3 className="text-2xl font-bold text-gray-800 mb-4">
						Ready to Collaborate?
					</h3>
					<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
						Whether it's a new project, creative idea, or just to
						say hello, I'd love to hear from you. Let's build
						something amazing together!
					</p>
					<a
						href="mailto:leslieajayi27@gmail.com"
						className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200"
					>
						<svg
							className="w-5 h-5 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						Start a Conversation
					</a>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Socials;
