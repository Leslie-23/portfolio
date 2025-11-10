import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import SkillsCarousel from "./SkillsCarousel";
import FeaturedProjects from "./FeaturedProjects";
import CTA from "./CTA";
import Services from "./Services";
import { PersonalStats } from "../components/helpers/PersonalStats";

const Home = () => {
	return (
		<>
			<Navbar />;
			<Hero />
			<PersonalStats />
			<SkillsCarousel />
			<Services />
			<FeaturedProjects />
			<CTA />
			<Footer />
		</>
	);
};

export default Home;
