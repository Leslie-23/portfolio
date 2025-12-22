import { Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import Loader from "./components/Loader";
import "./app.css";
import "./components/globals.css";

// Critical components - keep static imports for immediate render
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingHelpButton from "./components/FloatingHelpButton";
import MinimalNavProgress from "./components/helpers/MinimalNavProgress";
import ScrollToTop from "./components/helpers/scrollToTop";

// Lazy load page components - creates separate chunks
const Home = lazy(() => import("./HOME"));
const Projects = lazy(() => import("./PROJECTS"));
const ProjectDetail = lazy(() => import("./PROJECTS/projectDetail"));
const About = lazy(() => import("./ABOUT"));
const Contact = lazy(() => import("./CONTACT"));
const Resume = lazy(() => import("./CONTACT/resume"));
const MovingLetters = lazy(() => import("./components/preview"));
const Testimonials = lazy(() => import("./components/helpers/testimonials"));
const ProjectsCompletion = lazy(() => import("./components/helpers/projectsCompletion"));
const PrivacyPolicy = lazy(() => import("./components/helpers/privacyPolicy"));
const TermsOfService = lazy(() => import("./components/helpers/termsOfService"));
const Socials = lazy(() => import("./components/helpers/socials"));
const CookieConsent = lazy(() => import("./components/helpers/cookies"));
const NotFound = lazy(() => import("./components/helpers/404"));

// Minimal loading fallback for route transitions
const RouteLoader = () => (
	<div className="min-h-screen flex items-center justify-center bg-white">
		<div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
	</div>
);

function App() {
	const [isLoading, setIsLoading] = useState(() => {
		// Skip loader for returning visitors in same session
		if (typeof window !== "undefined") {
			return !sessionStorage.getItem("portfolio_visited");
		}
		return true;
	});

	useEffect(() => {
		if (!isLoading) return;

		// Show loader max 1.5s for first-time visitors only
		const timer = setTimeout(() => {
			setIsLoading(false);
			sessionStorage.setItem("portfolio_visited", "true");
		}, 1500);

		return () => clearTimeout(timer);
	}, [isLoading]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<ErrorBoundary>
			<div className="App">
				<ScrollToTop />
				<FloatingHelpButton />
				<MinimalNavProgress />
				<Suspense fallback={<RouteLoader />}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/projects/:projectId" element={<ProjectDetail />} />
						<Route path="/projects" element={<Projects />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/moving-letters" element={<MovingLetters />} />
						<Route path="/testimonials" element={<Testimonials />} />
						<Route path="/projects-completed" element={<ProjectsCompletion />} />
						<Route path="/resume" element={<Resume />} />
						<Route path="/socials" element={<Socials />} />
						<Route path="/privacy-policy" element={<PrivacyPolicy />} />
						<Route path="/terms-of-service" element={<TermsOfService />} />
						<Route path="/cookies" element={<CookieConsent />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Suspense>
			</div>
		</ErrorBoundary>
	);
}

export default App;
