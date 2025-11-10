// src/components/404.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, Mail, User } from "lucide-react";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full text-center">
				{/* Animated 404 Number */}
				<motion.div
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{
						duration: 0.5,
						type: "spring",
						stiffness: 100,
					}}
					className="mb-8"
				>
					<h1 className="text-9xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
						404
					</h1>
				</motion.div>

				{/* Message */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="mb-8"
				>
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Page Not Found
					</h2>
					<p className="text-gray-600 text-lg mb-2">
						Oops! The page you're looking for seems to have wandered
						off.
					</p>
					<p className="text-gray-500">
						Don't worry, even the best explorers get lost sometimes.
					</p>
				</motion.div>

				{/* Animated Illustration */}
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
					className="mb-8"
				>
					<div className="w-32 h-32 mx-auto relative">
						{/* Magnifying Glass */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-20 h-20 border-4 border-gray-300 rounded-full" />
							<div className="w-8 h-2 bg-gray-300 transform rotate-45 absolute top-12 right-8 rounded-full" />
						</div>
						{/* Question Mark */}
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-4xl font-bold text-gray-400">
								?
							</div>
						</div>
					</div>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.5 }}
					className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
				>
					<button
						onClick={() => navigate(-1)}
						className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200"
					>
						<ArrowLeft size={20} />
						Go Back
					</button>

					<button
						onClick={() => navigate("/")}
						className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
					>
						<Home size={20} />
						Go Home
					</button>
				</motion.div>

				{/* Quick Links */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.5 }}
					className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50"
				>
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Popular Pages
					</h3>
					<div className="grid grid-cols-2 gap-3">
						<button
							onClick={() => navigate("/projects")}
							className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 text-sm font-medium"
						>
							<Search size={16} />
							Projects
						</button>
						<button
							onClick={() => navigate("/contact")}
							className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 text-sm font-medium"
						>
							<Mail size={16} />
							Contact
						</button>
						<button
							onClick={() => navigate("/about")}
							className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 text-sm font-medium"
						>
							<User size={16} />
							About
						</button>
						<button
							onClick={() => navigate("/")}
							className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 text-sm font-medium"
						>
							<Home size={16} />
							Home
						</button>
					</div>
				</motion.div>

				{/* Help Text */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1, duration: 0.5 }}
					className="mt-6"
				>
					<p className="text-gray-500 text-sm">
						Still lost?{" "}
						<button
							onClick={() => navigate("/contact")}
							className="text-green-600 hover:text-green-700 font-medium underline"
						>
							Contact me
						</button>{" "}
						for help.
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default NotFound;
