import { useState, useEffect } from "react";

const AnimatedRoleCycler = () => {
	const roles = [
		{ text: "Full-Stack Engineer", color: "text-heading" },
		{ text: "Backend Developer", color: "text-heading" },
		{ text: "Systems Designer", color: "text-heading" },
		{ text: "Frontend Developer", color: "text-heading" },
		{ text: "Cloud & DevOps", color: "text-heading" },
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
				if (displayText.length < currentRole.text.length) {
					setDisplayText(
						currentRole.text.slice(0, displayText.length + 1)
					);
					setTypingSpeed(80);
				} else {
					setTimeout(() => setIsDeleting(true), 400);
					setTypingSpeed(400);
				}
			} else {
				if (displayText.length > 0) {
					setDisplayText(displayText.slice(0, -1));
					setTypingSpeed(50);
				} else {
					setIsDeleting(false);
					setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
				}
			}
		};

		const timer = setTimeout(handleTyping, typingSpeed);
		return () => clearTimeout(timer);
	}, [displayText, isDeleting, currentRoleIndex, roles, typingSpeed]);

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
			<span className="animate-pulse ml-1 text-primary">|</span>
		</span>
	);
};

export default AnimatedRoleCycler;
