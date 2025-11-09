import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Github, Linkedin, Folder, Mail } from "lucide-react";

const FloatingHelpButton = () => {
	const [open, setOpen] = useState(false);

	const toggleMenu = () => setOpen(!open);

	const menuItems = [
		{
			label: "Contact Me",
			icon: <Mail size={20} />,
			link: "mailto:yourname@example.com",
		},
		{
			label: "Projects",
			icon: <Folder size={20} />,
			link: "/projects",
		},
		{
			label: "GitHub",
			icon: <Github size={20} />,
			link: "https://github.com/yourusername",
		},
		{
			label: "LinkedIn",
			icon: <Linkedin size={20} />,
			link: "https://linkedin.com/in/yourusername",
		},
	];

	return (
		<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
			{/* Floating menu items */}
			<AnimatePresence>
				{open &&
					menuItems.map((item, index) => (
						<motion.a
							key={item.label}
							href={item.link}
							target="_blank"
							rel="noopener noreferrer"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 20 }}
							transition={{ delay: index * 0.05 }}
							className="flex items-center gap-2 mb-3 bg-white text-gray-800 shadow-lg px-3 py-2 rounded-xl hover:bg-gray-100"
						>
							{item.icon}
							<span className="text-sm font-medium">
								{item.label}
							</span>
						</motion.a>
					))}
			</AnimatePresence>

			{/* Main button */}
			<motion.button
				onClick={toggleMenu}
				className="w-14 h-14 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-700"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
			>
				<MessageCircle size={24} />
			</motion.button>
		</div>
	);
};

export default FloatingHelpButton;
