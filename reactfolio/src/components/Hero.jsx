import React from "react";
import "./globals.css";
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
				<div className="relative mb-8">
					<div className="w-32 h-32 mx-auto mb-6 relative">
						{/* Actual profile image with fallback */}
						<img
							src="/profile-image.png"
							alt="Leslie Paul"
							className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
							onError={(e) => {
								e.target.style.display = "none";
								e.target.nextSibling.style.display = "flex";
							}}
						/>
						{/* Fallback in case image fails to load */}
						<div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg hidden">
							<span className="text-4xl font-bold text-green-600">
								LP
							</span>
						</div>
						{/* Animated ring */}
						<div className="absolute inset-0 border-4 border-green-600 rounded-full animate-ping-fast opacity-20"></div>
					</div>
				</div>

				{/* Introduction Text */}
				<div className="relative space-y-6">
					{/* Greeting */}
					<div className="overflow-hidden">
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
							Software Engineer & IT Student
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
							<span className="relative z-10">View My Work</span>
							<div className="absolute inset-0 bg-green-700 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
						</button>

						<button className="group relative border-2 border-green-600 text-green-600 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg hover:scale-105">
							<span className="relative z-10">Get In Touch</span>
							<div className="absolute inset-0 bg-green-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
						</button>
					</div>

					{/* Scroll Indicator: still to come */}
				</div>

				{/* Tech Stack Indicators */}
				<div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
					<div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-green-100 hover:scale-105">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Full-Stack Development
					</div>
					<div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-green-100 hover:scale-105">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Data-Driven Solutions
					</div>
					<div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-green-100 hover:scale-105">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Modern Architecture
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
