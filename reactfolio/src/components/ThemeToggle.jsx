import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/themeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<motion.button
			onClick={toggleTheme}
			className="relative p-2 rounded-full bg-surface-alt border border-border hover:border-primary transition-colors duration-200"
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			<motion.div
				initial={false}
				animate={{ rotate: theme === "dark" ? 180 : 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				{theme === "light" ? (
					<Moon size={18} className="text-muted" />
				) : (
					<Sun size={18} className="text-yellow-400" />
				)}
			</motion.div>
		</motion.button>
	);
};

export default ThemeToggle;
