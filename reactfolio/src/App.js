import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./HOME";
import Projects from "./PROJECTS";
import About from "./ABOUT";
import Contact from "./CONTACT";
import Loader from "./components/Loader";
import "./app.css";
import MovingLetters from "./components/preview";
import FloatingHelpButton from "./components/FloatingHelpButton";
import ProjectDetail from "./PROJECTS/projectDetail";
import MinimalNavProgress from "./components/helpers/MinimalNavProgress";
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
function App() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// Simulate loading
		setTimeout(() => setIsLoading(false), 3000);
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="App">
			<ScrollToTop />
			<FloatingHelpButton />
			<MinimalNavProgress />
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
				<Route path="/moving-letters" element={<MovingLetters />} />
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
