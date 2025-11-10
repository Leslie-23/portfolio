import React, { useState } from "react";
import "../components/globals.css";

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
		{ name: "Home", href: "/home" },
		{ name: "Projects", href: "/projects" },
		{ name: "About", href: "/about" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<>
			<nav className="bg-white shadow-sm fixed w-full top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<div className="flex-shrink-0">
							<span className="text-black text-xl font-bold roboto-condensed-black">
								LESLIE PAUL
							</span>
						</div>

						{/* Desktop Menu - FIXED */}
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-2">
								{navItems.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="relative group"
										onMouseEnter={() =>
											setActiveItem(item.name)
										}
										onMouseLeave={() => setActiveItem("")}
									>
										{/* Pill Background Animation - FIXED PADDING */}
										<div
											className={`
                        absolute inset-0 bg-green-100 rounded-full transition-all duration-300 ease-out
                        ${
							activeItem === item.name
								? "scale-105 opacity-100"
								: "scale-95 opacity-0"
						}
                      `}
										/>

										{/* Text with Better Vertical Alignment */}
										<span
											className={`
                        relative z-10 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 roboto-condensed-medium
                        ${
							activeItem === item.name
								? "text-green-700 transform translate-x-0.5"
								: "text-black hover:text-green-600"
						}
                        leading-tight
                      `}
										>
											{item.name}
										</span>

										{/* Underline Animation */}
										<div
											className={`
                        absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-500 transition-all duration-300
                        ${
							activeItem === item.name
								? "w-3/4 -translate-x-1/2"
								: "w-0 -translate-x-1/2"
						}
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

				{/* Mobile Menu Overlay - FIXED */}
				<div
					className={`fixed inset-0 bg-white z-40 md:hidden transition-all duration-300 ease-in-out ${
						isMenuOpen
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					}`}
				>
					<div className="flex flex-col items-center justify-center h-full space-y-6 bg-green-100">
						{/* Mobile Menu Items with Better Typography */}
						{navItems.map((item, index) => (
							<a
								key={item.name}
								href={item.href}
								onClick={closeMenu}
								className="relative group"
							>
								{/* Mobile Pill Background */}
								<div className="absolute inset-0 bg-green-200 rounded-full scale-0 group-hover:scale-105 transition-transform duration-300 ease-out" />

								{/* Mobile Text with Better Vertical Spacing */}
								<span
									className="relative z-10 px-8 py-3 text-xl font-medium text-black group-hover:text-green-700 transition-all duration-300 roboto-condensed-medium leading-relaxed"
									style={{
										transitionDelay: isMenuOpen
											? `${index * 100}ms`
											: "0ms",
									}}
								>
									{item.name}
								</span>
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
