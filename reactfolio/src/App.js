import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./HOME";
import Projects from "./PROJECTS";
import About from "./ABOUT";
import Contact from "./CONTACT";
import "./app.css";
import ProjectDetail from "./PROJECTS/projectDetail";
import NotFound from "./components/helpers/404";
import "./components/globals.css";
import Testimonials from "./components/helpers/testimonials";
import ProjectsCompletion from "./components/helpers/projectsCompletion";
import PrivacyPolicy from "./components/helpers/privacyPolicy";
import TermsOfService from "./components/helpers/termsOfService";
import Socials from "./components/helpers/socials";
import ScrollToTop from "./components/helpers/scrollToTop";
import Resume from "./CONTACT/resume";
import CookieConsent from "./components/helpers/cookies";
import { useGame } from "./HOME/Experience/GameUI";

function usePageTracker() {
	const location = useLocation();
	const { trackPage } = useGame();
	useEffect(() => {
		trackPage(location.pathname);
	}, [location.pathname, trackPage]);
}

function App() {
	usePageTracker();

	return (
		<div className="App min-h-screen transition-colors duration-300">
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route
					path="/projects/:projectId"
					element={<ProjectDetail />}
				/>
				<Route path="/projects" element={<Projects />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="testimonials" element={<Testimonials />} />
				<Route
					path="projects-completed"
					element={<ProjectsCompletion />}
				/>
				<Route path="/resume" element={<Resume />} />
				<Route path="/socials" element={<Socials />} />
				<Route path="privacy-policy" element={<PrivacyPolicy />} />
				<Route path="terms-of-service" element={<TermsOfService />} />
				<Route path="cookies" element={<CookieConsent />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
