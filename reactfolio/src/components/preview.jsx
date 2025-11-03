import { useEffect, useRef } from "react";

export const MovingLetters = ({
	text = "Hello World",
	effect = "ml1",
	loop = true,
	className = "",
	onComplete = null,
}) => {
	const containerRef = useRef(null);
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
			if (!window.anime || !containerRef.current) return;

			const textWrapper = containerRef.current.querySelector(".letters");
			if (textWrapper) {
				textWrapper.innerHTML = textWrapper.textContent.replace(
					/\S/g,
					"<span class='letter'>$&</span>"
				);
			}

			// Clear previous animation
			if (animationRef.current) {
				animationRef.current.pause();
			}

			// Initialize based on effect type
			switch (effect) {
				case "ml1":
					animationRef.current = initializeML1();
					break;
				case "ml2":
					animationRef.current = initializeML2();
					break;
				case "ml3":
					animationRef.current = initializeML3();
					break;
				case "ml4":
					animationRef.current = initializeML4();
					break;
				case "ml5":
					animationRef.current = initializeML5();
					break;
				case "ml6":
					animationRef.current = initializeML6();
					break;
				case "ml7":
					animationRef.current = initializeML7();
					break;
				case "ml8":
					animationRef.current = initializeML8();
					break;
				case "ml9":
					animationRef.current = initializeML9();
					break;
				case "ml10":
					animationRef.current = initializeML10();
					break;
				case "ml11":
					animationRef.current = initializeML11();
					break;
				case "ml12":
					animationRef.current = initializeML12();
					break;
				case "ml13":
					animationRef.current = initializeML13();
					break;
				case "ml14":
					animationRef.current = initializeML14();
					break;
				case "ml15":
					animationRef.current = initializeML15();
					break;
				case "ml16":
					animationRef.current = initializeML16();
					break;
				default:
					animationRef.current = initializeML1();
			}

			if (onComplete && animationRef.current) {
				animationRef.current.complete = onComplete;
			}
		};

		// Individual effect initializers
		const initializeML1 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					scale: [0.3, 1],
					opacity: [0, 1],
					translateZ: 0,
					easing: "easeOutExpo",
					duration: 600,
					delay: (el, i) => 70 * (i + 1),
				})
				.add({
					targets: containerRef.current.querySelectorAll(".line"),
					scaleX: [0, 1],
					opacity: [0.5, 1],
					easing: "easeOutExpo",
					duration: 700,
					offset: "-=875",
					delay: (el, i, l) => 80 * (l - i),
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML2 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					scale: [4, 1],
					opacity: [0, 1],
					translateZ: 0,
					easing: "easeOutExpo",
					duration: 950,
					delay: (el, i) => 70 * i,
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML3 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					opacity: [0, 1],
					easing: "easeInOutQuad",
					duration: 2250,
					delay: (el, i) => 150 * (i + 1),
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML4 = () => {
			const ml4 = {
				opacityIn: [0, 1],
				scaleIn: [0.2, 1],
				scaleOut: 3,
				durationIn: 800,
				durationOut: 600,
				delay: 500,
			};

			const timeline = window.anime.timeline({ loop });
			const letters = containerRef.current.querySelectorAll(".letters");

			letters.forEach((letter, index) => {
				timeline
					.add({
						targets: letter,
						opacity: ml4.opacityIn,
						scale: ml4.scaleIn,
						duration: ml4.durationIn,
					})
					.add({
						targets: letter,
						opacity: 0,
						scale: ml4.scaleOut,
						duration: ml4.durationOut,
						easing: "easeInExpo",
						delay: ml4.delay,
					});
			});

			return timeline.add({
				targets: containerRef.current,
				opacity: 0,
				duration: 500,
				delay: 500,
			});
		};

		const initializeML5 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".line"),
					opacity: [0.5, 1],
					scaleX: [0, 1],
					easing: "easeInOutExpo",
					duration: 700,
				})
				.add({
					targets: containerRef.current.querySelectorAll(".line"),
					duration: 600,
					easing: "easeOutExpo",
					translateY: (el, i) => -0.625 + 0.625 * 2 * i + "em",
				})
				.add({
					targets: containerRef.current.querySelector(".ampersand"),
					opacity: [0, 1],
					scaleY: [0.5, 1],
					easing: "easeOutExpo",
					duration: 600,
					offset: "-=600",
				})
				.add({
					targets:
						containerRef.current.querySelector(".letters-left"),
					opacity: [0, 1],
					translateX: ["0.5em", 0],
					easing: "easeOutExpo",
					duration: 600,
					offset: "-=300",
				})
				.add({
					targets:
						containerRef.current.querySelector(".letters-right"),
					opacity: [0, 1],
					translateX: ["-0.5em", 0],
					easing: "easeOutExpo",
					duration: 600,
					offset: "-=600",
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML6 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					translateY: ["1.1em", 0],
					translateZ: 0,
					duration: 750,
					delay: (el, i) => 50 * i,
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML7 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					translateY: ["1.1em", 0],
					translateX: ["0.55em", 0],
					translateZ: 0,
					rotateZ: [180, 0],
					duration: 750,
					easing: "easeOutExpo",
					delay: (el, i) => 50 * i,
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML8 = () => {
			const timeline = window.anime
				.timeline({ loop })
				.add({
					targets:
						containerRef.current.querySelector(".circle-white"),
					scale: [0, 3],
					opacity: [1, 0],
					easing: "easeInOutExpo",
					rotateZ: 360,
					duration: 1100,
				})
				.add({
					targets:
						containerRef.current.querySelector(".circle-container"),
					scale: [0, 1],
					duration: 1100,
					easing: "easeInOutExpo",
					offset: "-=1000",
				})
				.add({
					targets: containerRef.current.querySelector(".circle-dark"),
					scale: [0, 1],
					duration: 1100,
					easing: "easeOutExpo",
					offset: "-=600",
				})
				.add({
					targets:
						containerRef.current.querySelector(".letters-left"),
					scale: [0, 1],
					duration: 1200,
					offset: "-=550",
				})
				.add({
					targets: containerRef.current.querySelector(".bang"),
					scale: [0, 1],
					rotateZ: [45, 15],
					duration: 1200,
					offset: "-=1000",
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1400,
				});

			// Continuous rotation for dashed circle
			window.anime({
				targets: containerRef.current.querySelector(
					".circle-dark-dashed"
				),
				rotateZ: 360,
				duration: 8000,
				easing: "linear",
				loop: true,
			});

			return timeline;
		};

		const initializeML9 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					scale: [0, 1],
					duration: 1500,
					elasticity: 600,
					delay: (el, i) => 45 * (i + 1),
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML10 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					rotateY: [-90, 0],
					duration: 1300,
					delay: (el, i) => 45 * i,
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML11 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelector(".line"),
					scaleY: [0, 1],
					opacity: [0.5, 1],
					easing: "easeOutExpo",
					duration: 700,
				})
				.add({
					targets: containerRef.current.querySelector(".line"),
					translateX: [
						0,
						containerRef.current
							.querySelector(".letters")
							.getBoundingClientRect().width + 10,
					],
					easing: "easeOutExpo",
					duration: 700,
					delay: 100,
				})
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 600,
					offset: "-=775",
					delay: (el, i) => 34 * (i + 1),
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML12 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					translateX: [40, 0],
					translateZ: 0,
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 1200,
					delay: (el, i) => 500 + 30 * i,
				})
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					translateX: [0, -30],
					opacity: [1, 0],
					easing: "easeInExpo",
					duration: 1100,
					delay: (el, i) => 100 + 30 * i,
				});
		};

		const initializeML13 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					translateY: [100, 0],
					translateZ: 0,
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 1400,
					delay: (el, i) => 300 + 30 * i,
				})
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					translateY: [0, -100],
					opacity: [1, 0],
					easing: "easeInExpo",
					duration: 1200,
					delay: (el, i) => 100 + 30 * i,
				});
		};

		const initializeML14 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelector(".line"),
					scaleX: [0, 1],
					opacity: [0.5, 1],
					easing: "easeInOutExpo",
					duration: 900,
				})
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					opacity: [0, 1],
					translateX: [40, 0],
					translateZ: 0,
					scaleX: [0.3, 1],
					easing: "easeOutExpo",
					duration: 800,
					offset: "-=600",
					delay: (el, i) => 150 + 25 * i,
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML15 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".word"),
					scale: [14, 1],
					opacity: [0, 1],
					easing: "easeOutCirc",
					duration: 800,
					delay: (el, i) => 800 * i,
				})
				.add({
					targets: containerRef.current,
					opacity: 0,
					duration: 1000,
					easing: "easeOutExpo",
					delay: 1000,
				});
		};

		const initializeML16 = () => {
			return window.anime
				.timeline({ loop })
				.add({
					targets: containerRef.current.querySelectorAll(".letter"),
					translateY: [-100, 0],
					easing: "easeOutExpo",
					duration: 1400,
					delay: (el, i) => 30 * i,
				})
				.add({
					targets: containerRef.current,
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
	}, [text, effect, loop, onComplete]);

	// Render different structures based on effect
	const renderContent = () => {
		switch (effect) {
			case "ml1":
				return (
					<div className="text-wrapper">
						<span className="line line1"></span>
						<span className="letters">{text}</span>
						<span className="line line2"></span>
					</div>
				);
			case "ml2":
			case "ml3":
			case "ml6":
			case "ml7":
			case "ml9":
			case "ml10":
			case "ml12":
			case "ml13":
			case "ml16":
				return (
					<div className="text-wrapper">
						<span className="letters">{text}</span>
					</div>
				);
			case "ml4":
				const words = text.split(" ");
				return (
					<>
						{words.map((word, index) => (
							<span
								key={index}
								className={`letters letters-${index + 1}`}
							>
								{word}
							</span>
						))}
					</>
				);
			case "ml5":
				const parts = text.split("&");
				return (
					<div className="text-wrapper">
						<span className="line line1"></span>
						<span className="letters letters-left">{parts[0]}</span>
						<span className="letters ampersand">&</span>
						<span className="letters letters-right">
							{parts[1] || ""}
						</span>
						<span className="line line2"></span>
					</div>
				);
			case "ml8":
				return (
					<>
						<span className="letters-container">
							<span className="letters letters-left">Hi</span>
							<span className="letters bang">!</span>
						</span>
						<span className="circle circle-white"></span>
						<span className="circle circle-dark"></span>
						<span className="circle circle-container">
							<span className="circle circle-dark-dashed"></span>
						</span>
					</>
				);
			case "ml11":
				return (
					<div className="text-wrapper">
						<span className="line line1"></span>
						<span className="letters">{text}</span>
					</div>
				);
			case "ml14":
				return (
					<div className="text-wrapper">
						<span className="letters">{text}</span>
						<span className="line"></span>
					</div>
				);
			case "ml15":
				const ml15Words = text.split(" ");
				return (
					<>
						{ml15Words.map((word, index) => (
							<span key={index} className="word">
								{word}
							</span>
						))}
					</>
				);
			default:
				return <span className="letters">{text}</span>;
		}
	};

	return (
		<div
			ref={containerRef}
			className={`${effect} ${className}`}
			style={{ display: "inline-block" }}
		>
			{renderContent()}

			<style jsx>{`
				/* Base styles for all effects */
				.ml1,
				.ml2,
				.ml3,
				.ml4,
				.ml5,
				.ml6,
				.ml7,
				.ml8,
				.ml9,
				.ml10,
				.ml11,
				.ml12,
				.ml13,
				.ml14,
				.ml15,
				.ml16 {
					position: relative;
					font-weight: 900;
					font-size: 3.5em;
				}

				.text-wrapper {
					position: relative;
					display: inline-block;
					padding-top: 0.1em;
					padding-right: 0.05em;
					padding-bottom: 0.15em;
				}

				.letter {
					display: inline-block;
					line-height: 1em;
				}

				.line {
					opacity: 0;
					position: absolute;
					left: 0;
					height: 3px;
					width: 100%;
					background-color: currentColor;
					transform-origin: 0 0;
				}

				.line1 {
					top: 0;
				}
				.line2 {
					bottom: 0;
				}

				/* ML5 specific styles */
				.ml5 {
					font-weight: 300;
					color: #402d2d;
				}

				.ml5 .ampersand {
					font-family: Baskerville, serif;
					font-style: italic;
					font-weight: 400;
					width: 1em;
					margin-right: -0.1em;
					margin-left: -0.1em;
				}

				.ml5 .letters {
					display: inline-block;
					opacity: 0;
				}

				/* ML8 specific styles */
				.ml8 .letters-container {
					position: absolute;
					left: 0;
					right: 0;
					margin: auto;
					top: 0;
					bottom: 0;
					height: 1em;
				}

				.ml8 .letters {
					position: relative;
					z-index: 2;
					display: inline-block;
					line-height: 0.7em;
				}

				.ml8 .circle {
					position: absolute;
					left: 0;
					right: 0;
					margin: auto;
					top: 0;
					bottom: 0;
				}

				/* Add more effect-specific styles as needed */

				@media (max-width: 768px) {
					.ml1,
					.ml2,
					.ml3,
					.ml4,
					.ml5,
					.ml6,
					.ml7,
					.ml8,
					.ml9,
					.ml10,
					.ml11,
					.ml12,
					.ml13,
					.ml14,
					.ml15,
					.ml16 {
						font-size: 2.5em;
					}
				}

				@media (max-width: 480px) {
					.ml1,
					.ml2,
					.ml3,
					.ml4,
					.ml5,
					.ml6,
					.ml7,
					.ml8,
					.ml9,
					.ml10,
					.ml11,
					.ml12,
					.ml13,
					.ml14,
					.ml15,
					.ml16 {
						font-size: 2em;
					}
				}
			`}</style>
		</div>
	);
};

const MovingLettersGrid = () => {
	const effects = [
		"ml1",
		"ml2",
		"ml3",
		"ml4",
		"ml5",
		"ml6",
		"ml7",
		"ml8",
		"ml9",
		"ml10",
		"ml11",
		"ml12",
		"ml13",
		"ml14",
		"ml15",
		"ml16",
	];

	const sampleTexts = {
		ml1: "Hello World",
		ml2: "Amazing Text",
		ml3: "Smooth Effect",
		ml4: "Multiple Words",
		ml5: "Left&Right",
		ml6: "Bounce Up",
		ml7: "Spin Around",
		ml8: "Hi!",
		ml9: "Elastic Text",
		ml10: "3D Rotate",
		ml11: "Line Reveal",
		ml12: "Slide In Out",
		ml13: "Fly In Out",
		ml14: "Scale Reveal",
		ml15: "Word Scale",
		ml16: "Drop Down",
	};

	return (
		<div className="moving-letters-grid">
			<h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
				Moving Letters Effects
			</h1>

			<div className="two-column-grid">
				{effects.map((effect) => (
					<div key={effect} className="grid-cell ">
						<div className="effect-header">
							{/* <span className="effect-name">
								{effect.toUpperCase()}
							</span> */}
						</div>
						<div className="">
							<MovingLetters
								text={sampleTexts[effect]}
								effect={effect}
								loop={true}
								className="demo-animation"
							/>
						</div>
					</div>
				))}
			</div>

			<style jsx>{`
				.moving-letters-grid {
					padding: 2rem;
					max-width: 100%;
					height: 100vh;
					margin: 0 auto;
				}

				.two-column-grid {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					// gap: 1.5rem;
				}

				.grid-cell {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 1.5rem;
					border: 1px solid #ddd;
					border-radius: 0px;
					background: white;
					min-height: 45%;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}

				.effect-header {
					margin-bottom: 1rem;
				}

				.effect-name {
					font-size: 0.85rem;
					font-weight: 600;
					color: #555;
					background: #f5f5f5;
					padding: 0.25rem 0.75rem;
					border-radius: 20px;
					text-transform: uppercase;
					letter-spacing: 0.5px;
				}

				.animation-container {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-grow: 1;
					width: 100%;
				}

				.demo-animation {
					text-align: center;
				}

				/* Responsive design */
				@media (max-width: 1024px) {
					.two-column-grid {
						gap: 1rem;
					}

					.grid-cell {
						padding: 1rem;
						min-height: 160px;
					}
				}

				@media (max-width: 768px) {
					.two-column-grid {
						grid-template-columns: 1fr;
					}

					.moving-letters-grid {
						padding: 1rem;
					}

					.grid-cell {
						min-height: 100%;
					}
				}
			`}</style>
		</div>
	);
};

export default MovingLettersGrid;
