import { Routes, Route } from "react-router-dom";
import Home from "./HOME";
import Projects from "./PROJECTS";
import About from "./ABOUT";
import Contact from "./CONTACT";

import "./app.css";
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</div>
	);
}

export default App;
