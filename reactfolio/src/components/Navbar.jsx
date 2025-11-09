import React, { useState } from "react";
import "../components/globals.css";
// import TextShuffle from "./textShuffle";
const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeItem, setActiveItem] = useState("");

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const navItems = [
		{ name: "Home", href: "home" },
		{ name: "Projects", href: "projects" },
		{ name: "About", href: "about" },
		{ name: "Contact", href: "contact" },
	];

	return (
		<>
			<nav className="bg-white shadow-sm fixed w-full top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<div className="flex-shrink-0">
							<span className="text-black text-xl font-bold poppins-black ">
								LESLIE PAUL
							</span>
						</div>

						{/* Desktop Menu */}
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-2 poppins-bold">
								{navItems.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="relative group poppins-bold"
										onMouseEnter={() =>
											setActiveItem(item.name)
										}
										onMouseLeave={() => setActiveItem("")}
									>
										{/* Pill Background Animation */}
										<div
											className={`
										absolute inset-0 bg-green-100 p-2 rounded-full transition-all duration-300 ease-out  poppins-bold
										${
											activeItem === item.name
												? "scale-105 opacity-100 poppins-bold"
												: "scale-95 opacity-0"
										}
									`}
										/>

										{/* Text with Slide Animation */}
										<span
											className={`
										relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 poppins-bold
										${
											activeItem === item.name
												? "text-green-700 transform translate-x-1"
												: "text-black transform hover:translate-x-0.5"
										}
									`}
										>
											{/* <TextShuffle
												text={item.name}
												trigger={
													activeItem === item.name
												}
												/> */}
											{/* next push */}
											{item.name}
										</span>

										{/* Underline Animation */}
										<div
											className={`
										absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300
										${activeItem === item.name ? "w-3/4 -translate-x-1/2" : "w-0 -translate-x-1/2"}
									`}
										/>
									</a>
								))}
							</div>
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<button
								onClick={toggleMenu}
								className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors duration-200"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{/* Hamburger icon */}
								<div className="w-6 h-6 flex flex-col justify-center items-center">
									<span
										className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
											isMenuOpen
												? "rotate-45 translate-y-0.5"
												: "-translate-y-1"
										}`}
									/>
									<span
										className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
											isMenuOpen
												? "opacity-0"
												: "opacity-100"
										}`}
									/>
									<span
										className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
											isMenuOpen
												? "-rotate-45 -translate-y-0.5"
												: "translate-y-1"
										}`}
									/>
								</div>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile Menu Overlay */}
				<div
					className={`fixed inset-0 bg-white z-40 md:hidden transition-all duration-300 ease-in-out ${
						isMenuOpen
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					}`}
				>
					<div className="flex flex-col items-center justify-center h-full space-y-8 bg-green-100">
						{/* Mobile Menu Items with Enhanced Animations */}
						{navItems.map((item, index) => (
							<a
								key={item.name}
								href={item.href}
								onClick={closeMenu}
								className="relative group"
							>
								{/* Mobile Pill Background */}
								<div className="absolute inset-0 bg-green-100 rounded-full scale-0 group-hover:scale-105 transition-transform duration-300 ease-out" />

								{/* Mobile Text with Staggered Animation */}
								<span
									className="relative z-10 px-8 py-4 text-2xl font-medium text-black group-hover:text-green-700 transition-all duration-300 transform group-hover:scale-105"
									style={{
										transitionDelay: isMenuOpen
											? `${index * 100}ms`
											: "0ms",
									}}
								>
									{item.name}
								</span>

								{/* Mobile Bounce Animation */}
								<div className="absolute inset-0 border-2 border-green-300 rounded-full scale-0 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500" />
							</a>
						))}
					</div>
					{/* Close button for mobile */}
					<button
						onClick={closeMenu}
						className="absolute top-4 right-4 p-2 text-black hover:text-green-500 transition-colors duration-200"
					>
						<svg
							className="w-8 h-8"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
