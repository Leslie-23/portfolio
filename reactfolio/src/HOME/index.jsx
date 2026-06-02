import React, { Suspense, lazy } from "react";
import HeroOverlay from "./Experience/HeroOverlay";
import ScrollSections from "./Experience/ScrollSections";
import { XPBar, AchievementToasts } from "./Experience/GameUI";

const ExperienceCanvas = lazy(() => import("./Experience/ExperienceCanvas"));

function CanvasLoader() {
	return (
		<div className="absolute inset-0 z-0 bg-[#0a0a0a] flex items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<div className="w-12 h-12 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
				<p className="font-mono text-green-400/70 text-sm tracking-wider animate-pulse">
					LOADING_EXPERIENCE...
				</p>
			</div>
		</div>
	);
}

const Home = () => {
	return (
		<div className="bg-[#0a0a0a] text-white min-h-screen">
			{/* Hero: 3D Canvas + Overlay */}
			<section className="relative h-screen overflow-hidden">
				<Suspense fallback={<CanvasLoader />}>
					<ExperienceCanvas />
				</Suspense>
				<HeroOverlay />
			</section>

			{/* Scrollable content sections */}
			<ScrollSections />

			{/* Gamification UI */}
			<XPBar />
			<AchievementToasts />
		</div>
	);
};

export default Home;
