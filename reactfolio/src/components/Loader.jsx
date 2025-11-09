// import { Code } from "lucide-react";
import { useEffect, useRef } from "react";

const Loader = () => {
	const animationRef = useRef(null);

	useEffect(() => {
		// Load anime.js dynamically
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
			if (window.anime) {
				animationRef.current = window.anime
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
						targets: ".ml5 .ampersand",
						opacity: [0, 1],
						scaleY: [0.5, 1],
						easing: "easeOutExpo",
						duration: 600,
						offset: "-=600",
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
						targets: ".ml5",
						opacity: 0,
						duration: 1000,
						easing: "easeOutExpo",
						delay: 1000,
					});
			}
		};

		loadAnime();

		return () => {
			if (animationRef.current) {
				animationRef.current.pause();
			}
		};
	}, []);

	return (
		<div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
			<div className="ml5">
				<div className="text-wrapper">
					<div className="line line1"></div>
					<span className="letters letters-left text-black">
						Leslie
					</span>
					{/* <span className="letters ampersand">
						{" "}
						<Code />{" "}
					</span> */}
					<span className="letters letters-right text-black">
						Paul
					</span>
					<div className="line line2"></div>
				</div>
			</div>

			<style jsx>{`
				.ml5 {
					position: relative;
					font-weight: 300;
					font-size: 4.5em;
					color: #402d2d;
				}

				.ml5 .text-wrapper {
					position: relative;
					display: inline-block;
					padding-top: 0.1em;
					padding-right: 0.05em;
					padding-bottom: 0.15em;
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
				}

				.ml5 .ampersand {
					font-family: Baskerville, serif;
					font-style: italic;
					font-weight: 200;
					width: 1em;
					margin-right: -0.1em;
					margin-left: -0.1em;
				}

				.ml5 .letters {
					display: inline-block;
					opacity: 0;
				}

				@media (max-width: 768px) {
					.ml5 {
						font-size: 2.5em;
					}
				}

				@media (max-width: 480px) {
					.ml5 {
						font-size: 2em;
					}
				}
			`}</style>
		</div>
	);
};

export default Loader;
