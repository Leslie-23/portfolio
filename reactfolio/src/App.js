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
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
