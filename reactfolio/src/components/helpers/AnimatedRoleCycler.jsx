import { useState, useEffect } from "react";

const AnimatedRoleCycler = () => {
	const roles = [
		{ text: "Systems Designer", color: "text-gray-900" },
		{ text: "Backend Developer", color: "text-gray-900" },
		{ text: "Frontend Developer", color: "text-gray-900" },
		{ text: "UI/UX Designer", color: "text-gray-900" },
		{ text: "Full Stack Engineer", color: "text-gray-900" },
		{ text: "Mobile Developer", color: "text-gray-900" },
		{ text: "DevOps Engineer", color: "text-gray-900" },
		{ text: "Cloud Architect", color: "text-gray-900" },
		{ text: "CEO@PALtech", color: "text-yellow-500" }, // Bright gold
		{ text: "CEO@TROFFICIENT", color: "text-yellow-500" }, // Bright gold
		{ text: "Co-founder@UNIcliq", color: "text-yellow-500" }, // Bright gold
		{ text: "...", color: "text-gray-500" },
	];

	const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
	const [displayText, setDisplayText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [typingSpeed, setTypingSpeed] = useState(80);
	const [currentColor, setCurrentColor] = useState(roles[0].color);

	useEffect(() => {
		const currentRole = roles[currentRoleIndex];

		const handleTyping = () => {
			if (!isDeleting) {
				// Typing mode
				if (displayText.length < currentRole.text.length) {
					setDisplayText(
						currentRole.text.slice(0, displayText.length + 1)
					);
					setTypingSpeed(80);
				} else {
					// Finished typing, wait then start deleting
					setTimeout(() => setIsDeleting(true), 400);
					setTypingSpeed(400);
				}
			} else {
				// Deleting mode
				if (displayText.length > 0) {
					setDisplayText(displayText.slice(0, -1));
					setTypingSpeed(50);
				} else {
					// Finished deleting, move to next role
					setIsDeleting(false);
					setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
				}
			}
		};

		const timer = setTimeout(handleTyping, typingSpeed);
		return () => clearTimeout(timer);
	}, [displayText, isDeleting, currentRoleIndex, roles, typingSpeed]);

	// Update color when role changes (at the beginning of typing)
	useEffect(() => {
		if (!isDeleting && displayText.length === 0) {
			setCurrentColor(roles[currentRoleIndex].color);
		}
	}, [currentRoleIndex, isDeleting, displayText.length, roles]);

	return (
		<span
			className={`font-semibold relative inline-flex items-center ${currentColor}`}
		>
			{displayText}
			<span className="animate-pulse ml-1">|</span>
		</span>
	);
};

export default AnimatedRoleCycler;
