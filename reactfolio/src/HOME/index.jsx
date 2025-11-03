import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SkillsCarousel from "./SkillsCarousel";

const Home = () => {
	return (
		<>
			<Navbar />;
			<Hero />
			<SkillsCarousel />
			<Footer />
		</>
	);
};

export default Home;
