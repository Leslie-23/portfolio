// src/data/projectsData.js
export const projectsData = {
	"e-commerce-platform": {
		id: 1,
		title: "E-Commerce Platform",
		description:
			"A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
		fullDescription:
			"MERN Ecommerce is a full-stack application built to transform the online shopping experience. Using the MERN stack (MongoDB, Express.js, React, Node.js), Redux Toolkit for state management, and Material UI for a sleek interface, it provides robust functionality for both users and admins. Features include secure authentication, product catalog, shopping cart, checkout, order management, wishlist, product reviews, and an admin panel for inventory and analytics.",
		techStack: [
			"React",
			"Node.js",
			"MongoDB",
			"Stripe",
			"Tailwind CSS",
			"Redux Toolkit",
			"Material UI",
		],
		webScreenshot: "/images/webScreenshots/e-commerce-web.png",
		mobileScreenshot: "/images/mobileScreenshots/e-commerce-mobile.png",
		liveLink: "https://e-comm-app-517g.vercel.app/",
		githubLink: "https://github.com/Leslie-23/eComm-app",
		demoLink: "https://e-comm-app-517g.vercel.app/",
		features: [
			"User Authentication with OTP and password reset",
			"Product Catalog with Reviews and Wishlist",
			"Shopping Cart with Quantity Adjustments",
			"Checkout with Stripe Payment Integration",
			"Order Management & History",
			"Admin Dashboard for Product & Order Control",
			"Responsive UI with Material UI",
			"Real-time Updates using Redux Toolkit",
		],
		status: "Live",
		category: "Full Stack",
		timeline: "3 months",
		teamSize: "4 developers",
		challenges: [
			"Implementing secure payment processing",
			"Real-time inventory synchronization",
			"Handling user authentication with OTP and session management",
			"Scalable architecture for growing user base",
		],
		solutions: [
			"Integrated Stripe for secure payments with webhooks",
			"Used Redis for real-time updates on cart and inventory",
			"Implemented JWT authentication with refresh tokens",
			"Organized scalable project structure for frontend and backend separation",
		],
		documentation:
			"Following best practices for a MERN full-stack app, the frontend was built with React, Redux Toolkit for state, and Material UI for design. The backend uses Node.js with Express, MongoDB for flexible data modeling, and Nodemailer for email functionalities. Features like seeding, demo login, and modular routes were included for easy testing and extensibility. Live on Vercel at https://e-comm-app-517g.vercel.app/.",
	},

	"task-management-app": {
		id: 2,
		title: "Task Management App",
		description:
			"Collaborative task management application with drag-and-drop functionality and team collaboration features.",
		fullDescription:
			"A productivity app that helps teams organize tasks, set deadlines, and track progress. Features include real-time collaboration, file attachments, comments, and progress tracking.",
		techStack: [
			"Next.js",
			"TypeScript",
			"PostgreSQL",
			"Socket.io",
			"Framer Motion",
		],
		webScreenshot:
			"https://placehold.co/800x450/10B981/FFFFFF?text=Task+Manager+Web",
		mobileScreenshot:
			"https://placehold.co/300x600/10B981/FFFFFF?text=Task+Manager+Mobile",
		liveLink: "https://taskapp.com",
		githubLink: "https://github.com",
		demoLink: "https://demo.com",
		features: [
			"Drag & Drop",
			"Real-time Chat",
			"File Sharing",
			"Progress Analytics",
			"Team Collaboration",
		],
		status: "In Development",
		category: "Web App",
		timeline: "4 months",
		teamSize: "3 developers",
		challenges: [
			"Real-time synchronization across multiple clients",
			"Drag and drop performance with large datasets",
			"File upload and storage optimization",
		],
		solutions: [
			"Implemented Socket.io for real-time updates",
			"Used React DnD with virtualization",
			"Integrated AWS S3 with CDN for files",
		],
		documentation:
			"The task management app was built with Next.js for SSR and better SEO. Real-time features were handled by Socket.io, and the database used PostgreSQL for relational data integrity.",
	},
	"weather-dashboard": {
		id: 3,
		title: "Weather Dashboard",
		description:
			"Real-time weather application with interactive maps, forecasts, and location-based services.",
		fullDescription:
			"A comprehensive weather dashboard that provides current conditions, extended forecasts, and severe weather alerts. Features interactive maps and personalized location tracking.",
		techStack: ["Vue.js", "Express", "Redis", "Chart.js", "Mapbox"],
		webScreenshot:
			"https://placehold.co/800x450/8B5CF6/FFFFFF?text=Weather+Dashboard",
		mobileScreenshot:
			"https://placehold.co/300x600/8B5CF6/FFFFFF?text=Weather+Mobile",
		liveLink: "https://weatherapp.com",
		githubLink: "https://github.com",
		demoLink: "https://demo.com",
		features: [
			"Live Weather Maps",
			"Location Services",
			"Weather Alerts",
			"Historical Data",
			"Interactive Charts",
		],
		status: "Live",
		category: "Frontend",
		timeline: "2 months",
		teamSize: "2 developers",
		challenges: [
			"Real-time data synchronization",
			"Map integration and performance",
			"Location accuracy optimization",
		],
		solutions: [
			"Implemented WebSocket connections for live updates",
			"Used Mapbox GL for efficient map rendering",
			"Integrated multiple geolocation APIs for accuracy",
		],
		documentation:
			"A comprehensive weather dashboard built with Vue.js that provides real-time weather data and interactive maps using Mapbox integration. Features include location-based forecasts and severe weather alerts.",
	},
	"fitness-tracker": {
		id: 4,
		title: "Fitness Tracker",
		description:
			"Mobile fitness application with workout plans, progress tracking, and social features.",
		fullDescription:
			"A comprehensive fitness app that helps users track workouts, set goals, and connect with friends. Includes exercise library, progress photos, and achievement system.",
		techStack: ["React Native", "Firebase", "Redux", "Chart.js", "Expo"],
		webScreenshot:
			"https://placehold.co/800x450/EF4444/FFFFFF?text=Fitness+Web+Portal",
		mobileScreenshot:
			"https://placehold.co/300x600/EF4444/FFFFFF?text=Fitness+Mobile+App",
		liveLink: "https://fitnessapp.com",
		githubLink: "https://github.com",
		demoLink: "https://demo.com",
		features: [
			"Workout Plans",
			"Progress Tracking",
			"Social Feed",
			"Achievement System",
			"Health Integration",
		],
		status: "Live",
		category: "Mobile",
		timeline: "5 months",
		teamSize: "3 developers",
		challenges: [
			"Cross-platform performance optimization",
			"Real-time social features implementation",
			"Health API integration complexity",
		],
		solutions: [
			"Used React Native with platform-specific optimizations",
			"Implemented Firebase for real-time social features",
			"Created custom bridge for health API integrations",
		],
		documentation:
			"A cross-platform fitness tracking application built with React Native that integrates with health APIs and provides social features for user engagement. The app includes workout planning, progress tracking, and community features.",
	},
	"portfolio-website": {
		id: 5,
		title: "Portfolio Website",
		description:
			"Modern portfolio website with smooth animations, dark mode, and project showcase.",
		fullDescription:
			"A beautifully designed portfolio website featuring smooth scroll animations, interactive elements, and a comprehensive project gallery. Built with performance and accessibility in mind.",
		techStack: [
			"React",
			"GSAP",
			"Tailwind CSS",
			"Framer Motion",
			"Three.js",
		],
		webScreenshot:
			"https://placehold.co/800x450/F59E0B/FFFFFF?text=Portfolio+Website",
		mobileScreenshot:
			"https://placehold.co/300x600/F59E0B/FFFFFF?text=Portfolio+Mobile",
		liveLink: "https://portfolio.com",
		githubLink: "https://github.com",
		demoLink: "https://demo.com",
		features: [
			"Smooth Animations",
			"Dark Mode",
			"Responsive Design",
			"Performance Optimized",
			"Accessibility",
		],
		status: "Live",
		category: "Design",
		timeline: "1 month",
		teamSize: "1 developer",
		challenges: [
			"Animation performance on low-end devices",
			"SEO optimization for SPAs",
			"Cross-browser compatibility",
		],
		solutions: [
			"Implemented lazy loading and code splitting",
			"Used Next.js for SSR and better SEO",
			"Extensive browser testing and fallbacks",
		],
		documentation:
			"A modern portfolio website showcasing creative animations and responsive design principles with a focus on user experience and performance optimization. Built with React and featuring advanced animations using GSAP and Framer Motion.",
	},
	"social-media-analytics": {
		id: 6,
		title: "Social Media Analytics",
		description:
			"Analytics dashboard for social media performance tracking and insights.",
		fullDescription:
			"A powerful analytics platform that aggregates data from multiple social media platforms. Provides detailed insights, engagement metrics, and growth recommendations.",
		techStack: ["Angular", "Python", "MySQL", "D3.js", "FastAPI"],
		webScreenshot:
			"https://placehold.co/800x450/06B6D4/FFFFFF?text=Analytics+Dashboard",
		mobileScreenshot:
			"https://placehold.co/300x600/06B6D4/FFFFFF?text=Analytics+Mobile",
		liveLink: "https://analytics.com",
		githubLink: "https://github.com",
		demoLink: "https://demo.com",
		features: [
			"Multi-platform Analytics",
			"Real-time Data",
			"Custom Reports",
			"Team Collaboration",
			"Data Export",
		],
		status: "In Development",
		category: "Data Visualization",
		timeline: "6 months",
		teamSize: "5 developers",
		challenges: [
			"Handling large datasets efficiently",
			"Real-time data processing",
			"Multiple API rate limiting",
		],
		solutions: [
			"Implemented data aggregation with Redis caching",
			"Used WebSocket for real-time dashboard updates",
			"Created intelligent API rate limit management",
		],
		documentation:
			"A comprehensive social media analytics platform that processes data from multiple APIs and provides actionable insights through interactive data visualizations. The platform supports real-time data processing and team collaboration features.",
	},
	"restaurant-website": {
		id: 7,
		title: "Restaurant Website",
		description:
			"A high-end restaurant web platform with an elegant UI, real-time reservations, and in-house ordering.",
		fullDescription:
			"A full-stack restaurant management platform designed for premium dining establishments. It features a responsive frontend for customers to explore the menu, book tables, and place orders, while the backend allows admins to manage reservations, menu items, and analytics. The system prioritizes performance, scalability, and seamless UX.",
		techStack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS"],
		webScreenshot: "/images/webScreenshots/grilli-web.png",
		mobileScreenshot: "/images/mobileScreenshots/grilli-mobile.png",
		liveLink: "ttps://web-plusplus.vercel.app",
		githubLink: "https://github.com/leslie-23/web-plusplus",
		demoLink: "/images/general/grilli-video.mp4",
		features: [
			"Online table reservation with email confirmations",
			"In-house order management system",
			"Admin dashboard for menu and analytics",
			"Dynamic menu updates with categories and pricing",
			"Integrated payment support for online orders",
		],
		status: "Completed",
		category: "Full-Stack Web Development",
		timeline: "2 months",
		teamSize: "1 developer",
		challenges: [
			"Maintaining fast load times with dynamic content",
			"Implementing real-time reservation updates",
			"Ensuring consistent design across devices",
		],
		solutions: [
			"Implemented server-side caching for menu data",
			"Used WebSocket for live updates on reservations",
			"Adopted a modular responsive design system with TailwindCSS",
		],
		documentation:
			"This project showcases a robust restaurant web solution built with the MERN stack. It includes real-time reservation handling, a beautiful menu interface, and an admin dashboard for operations. Focused on performance, usability, and elegant design, it reflects modern restaurant tech infrastructure.",
	},
};

export const projectsArray = Object.values(projectsData);
