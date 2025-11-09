import React, { useState, useEffect } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function TextShuffle({ text, trigger }) {
	const [display, setDisplay] = useState(text);

	useEffect(() => {
		if (!trigger) return;
		let iterations = 0;
		const interval = setInterval(() => {
			setDisplay((prev) =>
				prev
					.split("")
					.map((_, i) =>
						i < iterations
							? text[i]
							: letters[
									Math.floor(Math.random() * letters.length)
							  ]
					)
					.join("")
			);

			if (iterations >= text.length) clearInterval(interval);
			iterations += 0.2 / 0.2; // speed of revealing letters
		}, 30);

		return () => clearInterval(interval);
	}, [trigger, text]);

	return (
		<span className="inline-block tracking-wide transition-all duration-300">
			{display}
		</span>
	);
}
