// contexts/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		// Check for saved theme preference or use system preference
		const savedTheme = localStorage.getItem("theme");
		const systemPrefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		if (savedTheme) {
			setTheme(savedTheme);
		} else if (systemPrefersDark) {
			setTheme("dark");
		}
	}, []);

	useEffect(() => {
		// Update DOM and localStorage when theme changes
		localStorage.setItem("theme", theme);
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
