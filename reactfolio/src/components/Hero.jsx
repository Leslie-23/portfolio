import React from "react";
import "./globals.css";
import TechStackScroller from "./helpers/techStackIndicators";
import AnimatedRoleCycler from "./helpers/AnimatedRoleCycler";
const Hero = () => {
	return (
		<section
			id="home"
			className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
		>
			<div className="max-w-4xl mx-auto text-center">
				{/* Animated Background Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
					<div
						className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"
						style={{ animationDelay: "2s" }}
					></div>
				</div>

				{/* Profile Image */}
				<div className="relative mb-8" id="profileContainer">
					<div
						className="w-32 h-32 mx-auto mb-6 relative cursor-pointer group"
						onClick={(e) =>
							e.currentTarget.parentElement.classList.toggle(
								"active"
							)
						}
					>
						{/* Profile Image */}
						<img
							src="/profile-image.webp"
							alt="Leslie Paul"
							className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
							onError={(e) => {
								e.target.style.display = "none";
								e.target.nextSibling.style.display = "flex";
							}}
						/>
						{/* Fallback */}
						<div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg hidden">
							<span className="text-4xl font-bold text-green-600">
								LP
							</span>
						</div>

						{/* Animated Ring */}
						<div className="absolute inset-0 border-4 border-green-600 rounded-full animate-ping opacity-20"></div>

						{/* Interactive Options */}
						<div className="option-wrapper">
							{/* Portfolio */}
							<div className="option-item opt-portfolio">
								<a
									href="/projects"
									className="bg-indigo-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-600 transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<div className="tooltip">View Projects</div>
							</div>

							{/* Projects */}
							<div className="option-item opt-projects">
								<a
									href="/projects"
									className="bg-purple-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-purple-600 transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<div className="tooltip">Latest Projects</div>
							</div>

							{/* Contact */}
							<div className="option-item opt-contact">
								<a
									href="/contact"
									className="bg-pink-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
								</a>
								<div className="tooltip">Get In Touch</div>
							</div>

							{/* Blog */}
							<div className="option-item opt-blog">
								<a
									href="/socials"
									className="bg-yellow-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-600 transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<div className="tooltip">Read My Blog</div>
							</div>

							{/* Resume */}
							{/* <div className="option-item opt-resume">
								<a
									href="#resume"
									className="bg-green-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<div className="tooltip">Download Resume</div>
							</div> */}
						</div>
					</div>
				</div>

				{/* Introduction Text */}
				<div className="relative space-y-6">
					{/* Greeting */}
					<div className="overflow-hidden roboto-condensed-bold">
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-4 transform transition-all duration-500 hover:scale-105">
							Hi, I'm{" "}
							<span className="text-green-600 relative inline-block">
								Leslie Paul
								<span className="absolute -bottom-1 left-0 w-0 h-1 bg-green-600 group-hover:w-full transition-all duration-300"></span>
							</span>
						</h1>
					</div>

					{/* Title */}
					<div className="overflow-hidden">
						<h2 className="text-xl sm:text-2xl text-gray-600 font-medium mb-8 transform transition-all duration-500 delay-100">
							Software Engineer —{" "}
							<span className="inline-block min-w-[150px]">
								<AnimatedRoleCycler />
							</span>
						</h2>
					</div>

					{/* Main Description */}
					<div className="overflow-hidden">
						<p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto transform transition-all duration-500 delay-200">
							I'm passionate about transforming complex ideas into
							intelligent, data-driven products. I build modern
							web and mobile applications that blend clean
							architecture, strong backend logic, and elegant
							design — all with a focus on{" "}
							<span className="text-green-600 font-semibold">
								performance
							</span>
							,{" "}
							<span className="text-green-600 font-semibold">
								usability
							</span>
							, and{" "}
							<span className="text-green-600 font-semibold">
								real-world impact
							</span>
							.
						</p>
					</div>

					{/* Call to Action Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 transform transition-all duration-500 delay-300">
						<button
							type="button"
							onClick={() => (window.location.href = "/projects")}
							className="group relative bg-green-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:scale-105"
						>
							<span className="relative z-10 roboto-condensed-bold">
								View My Work
							</span>
							<div className="absolute inset-0 bg-green-700 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
						</button>

						<button className="group relative border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105 roboto-condensed-bold">
							<span className="relative z-10">Get In Touch</span>
							<div className="absolute inset-0 bg-green-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
						</button>
					</div>

					{/* Scroll Indicator: still to come */}
					<TechStackScroller />
				</div>
			</div>
		</section>
	);
};

export default Hero;
