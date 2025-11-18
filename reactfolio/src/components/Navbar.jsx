import React, { useState } from "react";
import {
	Home,
	FolderGit2,
	User,
	Mail,
	Menu,
	X,
	ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminal } from "./helpers/terminal";
const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeItem, setActiveItem] = useState("");
	const { openTerminal, Terminal } = useTerminal();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const navItems = [
		{ name: "Home", href: "/home", icon: Home },
		{ name: "Projects", href: "/projects", icon: FolderGit2 },
		{ name: "About", href: "/about", icon: User },
		{ name: "Contact", href: "/contact", icon: Mail },
	];

	// Animation variants
	const mobileMenuVariants = {
		closed: {
			opacity: 0,
			scale: 0.95,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},
		open: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.3,
				ease: "easeOut",
			},
		},
	};

	const mobileItemVariants = {
		closed: {
			opacity: 0,
			x: -20,
			scale: 0.9,
		},
		open: (index) => ({
			opacity: 1,
			x: 0,
			scale: 1,
			transition: {
				delay: index * 0.1,
				duration: 0.4,
				ease: "backOut",
			},
		}),
	};

	const iconVariants = {
		hover: {
			scale: 1.2,
			rotate: 5,
			transition: {
				duration: 0.2,
				ease: "easeOut",
			},
		},
		tap: {
			scale: 0.9,
			transition: {
				duration: 0.1,
			},
		},
	};

	return (
		<>
			<nav className="bg-white shadow-sm fixed w-full top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo */}
						<motion.div
							className="flex-shrink-0"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{/* <span
								className="text-black text-xl font-bold roboto-condensed-black cursor-pointer"
								onClick={openTerminal}
							>
								LESLIE PAUL
							</span> */}
							<div className="relative group">
								<img
									className="cursor-pointer"
									src="/ascii-art-text.png"
									alt="Leslie Paul"
									width={200}
									height={200}
									onClick={openTerminal}
								/>

								{/* Desktop-only hover button */}
								<div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
									<button
										onClick={openTerminal}
										className="terminal-launcher bg-gray-800 text-white px-4 hover:bg-gray-700 transition-colors whitespace-nowrap shadow-lg"
									>
										🖥️ Open Terminal
									</button>
								</div>
							</div>
						</motion.div>
						{/* Render the terminal at root level */}
						<Terminal />

						{/* Desktop Menu */}
						<div className="hidden md:block">
							<div className="ml-10 flex items-baseline space-x-2">
								{navItems.map((item) => {
									const Icon = item.icon;
									return (
										<motion.a
											key={item.name}
											href={item.href}
											className="relative group"
											onMouseEnter={() =>
												setActiveItem(item.name)
											}
											onMouseLeave={() =>
												setActiveItem("")
											}
											whileHover="hover"
											whileTap="tap"
										>
											{/* Animated Background Pill */}
											<motion.div
												className="absolute inset-0 bg-green-100 rounded-full"
												initial={{
													scale: 0.8,
													opacity: 0,
												}}
												animate={{
													scale:
														activeItem === item.name
															? 1
															: 0.8,
													opacity:
														activeItem === item.name
															? 1
															: 0,
												}}
												transition={{
													duration: 0.3,
													ease: "easeOut",
												}}
											/>

											{/* Content */}
											<div className="relative z-10 px-5 py-2.5 rounded-full flex items-center gap-2">
												{/* Icon */}
												<motion.div
													variants={iconVariants}
													className="flex-shrink-0"
												>
													<Icon
														size={16}
														className={
															activeItem ===
															item.name
																? "text-green-700"
																: "text-gray-600 group-hover:text-green-600"
														}
													/>
												</motion.div>

												{/* Text */}
												<span
													className={`
                            text-sm font-medium roboto-condensed-medium leading-tight
                            ${
								activeItem === item.name
									? "text-green-700"
									: "text-black group-hover:text-green-600"
							}
                          `}
												>
													{item.name}
												</span>
											</div>

											{/* Underline Animation */}
											<motion.div
												className="absolute bottom-0 left-1/2 h-0.5 bg-green-500"
												initial={{
													width: 0,
													x: "-50%",
												}}
												animate={{
													width:
														activeItem === item.name
															? "75%"
															: 0,
													x: "-50%",
												}}
												transition={{
													duration: 0.3,
													ease: "easeOut",
												}}
											/>
										</motion.a>
									);
								})}
							</div>
						</div>

						{/* Mobile menu button */}
						<div className="md:hidden">
							<motion.button
								onClick={toggleMenu}
								className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors duration-200"
								aria-expanded="false"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
							>
								<span className="sr-only">Open main menu</span>
								<AnimatePresence mode="wait">
									{isMenuOpen ? (
										<motion.div
											key="close"
											initial={{
												rotate: -90,
												opacity: 0,
											}}
											animate={{ rotate: 0, opacity: 1 }}
											exit={{ rotate: 90, opacity: 0 }}
											transition={{ duration: 0.2 }}
										>
											<X size={24} />
										</motion.div>
									) : (
										<motion.div
											key="menu"
											initial={{ rotate: 90, opacity: 0 }}
											animate={{ rotate: 0, opacity: 1 }}
											exit={{ rotate: -90, opacity: 0 }}
											transition={{ duration: 0.2 }}
										>
											<Menu size={24} />
										</motion.div>
									)}
								</AnimatePresence>
							</motion.button>
						</div>
					</div>
				</div>

				{/* Mobile Menu Overlay */}
				<AnimatePresence>
					{isMenuOpen && (
						<motion.div
							className="fixed inset-0 bg-white z-40 md:hidden"
							variants={mobileMenuVariants}
							initial="closed"
							animate="open"
							exit="closed"
						>
							{/* Background Pattern */}
							<div className="absolute inset-0 bg-gradient-to-br from-green-200/50 to-white/50" />

							{/* Content */}
							{/* Content */}
							<div className="relative flex flex-col items-center justify-center h-full space-y-6 p-8">
								{navItems.map((item, index) => {
									const Icon = item.icon;
									return (
										<motion.a
											key={item.name}
											href={item.href}
											onClick={closeMenu}
											className="relative group w-full max-w-xs"
											variants={mobileItemVariants}
											initial="closed"
											animate="open"
											exit="closed"
											custom={index}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											{/* Clean content without backgrounds */}
											<div className="flex items-center justify-between px-2 py-3">
												<div className="flex items-center gap-3">
													<motion.div
														whileHover={{
															scale: 1.1,
															rotate: 5,
														}}
													>
														<Icon
															size={20}
															className="text-green-600"
														/>
													</motion.div>
													<span className="text-lg font-medium text-gray-800 roboto-condensed-medium">
														{item.name}
													</span>
												</div>
												<ChevronRight
													size={20}
													className="text-green-400"
												/>
											</div>
										</motion.a>
									);
								})}
							</div>
							{/* Close button */}
							<motion.button
								onClick={closeMenu}
								className="absolute top-6 right-6 p-3 bg-transparent rounded-full shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300"
								whileHover={{ scale: 1.1, rotate: 90 }}
								whileTap={{ scale: 0.9 }}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.5 }}
							>
								<X size={20} className="text-gray-600" />
							</motion.button>

							{/* Footer Text */}
							<motion.div
								className="absolute bottom-8 left-0 right-0 text-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 }}
							>
								<p className="text-sm text-gray-500 roboto-condensed-light">
									Let's build something amazing
								</p>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</>
	);
};

export default Navbar;
