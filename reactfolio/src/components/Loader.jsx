import { useEffect, useRef } from "react";

const Loader = () => {
	const animationRef = useRef(null);

	useEffect(() => {
		const loadAnime = async () => {
			if (typeof window !== "undefined" && !window.anime) {
				const script = document.createElement("script");
				script.src =
					"https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js";
				script.async = true;
				document.head.appendChild(script);
				script.onload = initializeAnimation;
			} else {
				initializeAnimation();
			}
		};

		const initializeAnimation = () => {
			if (!window.anime) return;

			const anime = window.anime;

			animationRef.current = anime
				.timeline({ loop: true })
				.add({
					targets: ".ml5 .line",
					opacity: [0.5, 1],
					scaleX: [0, 1],
					easing: "easeInOutExpo",
					duration: 700,
				})
				.add({
					targets: ".ml5 .line",
					duration: 600,
					easing: "easeOutExpo",
					translateY: (el, i) => -0.625 + 0.625 * 2 * i + "em",
				})
				.add({
					targets: ".ml5 .letters-left",
					opacity: [0, 1],
					translateX: ["0.5em", 0],
					easing: "easeOutExpo",
					duration: 600,
					offset: "-=300",
				})
				.add({
					targets: ".ml5 .letters-right",
					opacity: [0, 1],
					translateX: ["-0.5em", 0],
					easing: "easeOutExpo",
					duration: 600,
					offset: "-=600",
				})
				.add({
					targets: ".subtitle",
					opacity: [0, 1],
					translateY: ["1em", 0],
					easing: "easeOutExpo",
					duration: 800,
					offset: "-=200",
				})
				.add({
					targets: ".ml5",
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		loadAnime();

		return () => {
			if (animationRef.current) {
				animationRef.current.pause();
			}
		};
	}, []);

	return (
		<>
			<div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50 roboto-condensed-black">
				<div className="ml5 text-center">
					<div className="text-wrapper relative inline-block">
						<div className="line line1"></div>
						<span className="letters letters-left text-black dark:text-white roboto-condensed-bold">
							Leslie
						</span>
						<span className="letters letters-right text-black dark:text-white roboto-condensed-bold">
							Paul
						</span>
						<div className="line line2"></div>
					</div>

					{/* Subtitle animated as part of sequence */}
					<div className="subtitle-wrapper mt-3">
						<span className="subtitle text-gray-600 dark:text-gray-400 roboto-condensed-light text-lg tracking-wide opacity-0 block">
							SOFTWARE ENGINEER,DEVELOPER & DESIGNER
						</span>
					</div>
				</div>
			</div>

			{/* Removed "jsx" attribute to prevent invalid DOM warning */}
			<style>{`
				.ml5 {
					position: relative;
					font-weight: 300;
					font-size: 4.5em;
					color: #402d2d;
				}
				.ml5 .text-wrapper {
					position: relative;
					display: inline-block;
					padding: 0.1em 0.05em 0.15em;
					line-height: 1em;
				}
				.ml5 .line {
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					height: 3px;
					width: 100%;
					background-color: #402d2d;
					transform-origin: 0.5 0;
					opacity: 0;
				}
				.ml5 .letters {
					display: inline-block;
					opacity: 0;
				}
				.subtitle {
					opacity: 0;
					transform: translateY(1em);
				}
				@media (max-width: 768px) {
					.ml5 { font-size: 2.5em; }
					.subtitle { font-size: 1rem; }
				}
				@media (max-width: 480px) {
					.ml5 { font-size: 2em; }
					.subtitle { font-size: 0.9rem; }
				}
			`}</style>
		</>
	);
};

export default Loader;
