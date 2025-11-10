import React from "react";
import { motion } from "framer-motion";

const techItems = [
	"Full-Stack Development",
	"Data-Driven Solutions",
	"Modern Architecture",
	"Cloud Deployments",
	"Secure APIs",
	"Scalable Systems",
];

const TechStackScroller = () => {
	return (
		<div className="overflow-hidden max-w-xs mt-5  mx-auto px-4 z-3">
			<motion.div
				className="flex gap-4 whitespace-nowrap"
				animate={{ x: ["0%", "-50%"] }}
				transition={{
					repeat: Infinity,
					ease: "linear",
					duration: 15, // speed of scroll
				}}
				style={{ width: "max-content" }} // Add this line
			>
				{/* duplicate list for seamless looping */}
				{[...techItems, ...techItems].map((item, index) => (
					<div
						key={index}
						className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-sm text-gray-600 roboto-condensed-black transition-all duration-300 hover:bg-green-100 hover:scale-105"
					>
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						{item}
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default TechStackScroller;
