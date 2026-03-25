/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", "system-ui", "sans-serif"],
				heading: ["Roboto Condensed", "system-ui", "sans-serif"],
			},
			colors: {
				surface: {
					DEFAULT: "var(--color-surface)",
					alt: "var(--color-surface-alt)",
				},
				card: {
					DEFAULT: "var(--color-card)",
				},
				heading: {
					DEFAULT: "var(--color-heading)",
				},
				body: {
					DEFAULT: "var(--color-body)",
				},
				muted: {
					DEFAULT: "var(--color-muted)",
				},
				primary: {
					DEFAULT: "#16a34a",
					light: "#22c55e",
					dark: "#15803d",
				},
			},
			borderColor: {
				DEFAULT: "var(--color-border)",
			},
		},
	},
	plugins: [],
};
