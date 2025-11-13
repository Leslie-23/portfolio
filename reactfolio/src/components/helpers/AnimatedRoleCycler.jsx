import { useState, useEffect } from "react";

const AnimatedRoleCycler = () => {
	const roles = [
		"Systems Designer",
		"Backend Developer",
		"Frontend Developer",
		"UI/UX Designer",
		"Full Stack Engineer",
		"Mobile Developer",
		"DevOps Engineer",
		"Cloud Architect",
	];

	const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
	const [displayText, setDisplayText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [typingSpeed, setTypingSpeed] = useState(80); // Faster initial typing

	useEffect(() => {
		const currentRole = roles[currentRoleIndex];

		const handleTyping = () => {
			if (!isDeleting) {
				// Typing mode
				if (displayText.length < currentRole.length) {
					setDisplayText(
						currentRole.slice(0, displayText.length + 1)
					);
					setTypingSpeed(80); // Consistent typing speed
				} else {
					// Finished typing, wait then start deleting
					setTimeout(() => setIsDeleting(true), 400); // Shorter pause
					setTypingSpeed(400);
				}
			} else {
				// Deleting mode
				if (displayText.length > 0) {
					setDisplayText(displayText.slice(0, -1));
					setTypingSpeed(50); // Faster deleting
				} else {
					// Finished deleting, move to next role
					setIsDeleting(false);
					setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
					// setTypingSpeed(100); // Pause before next role
				}
			}
		};

		const timer = setTimeout(handleTyping, typingSpeed);
		return () => clearTimeout(timer);
	}, [displayText, isDeleting, currentRoleIndex, roles, typingSpeed]);

	return (
		<span className="text-gray-600 font-semibold relative inline-flex items-center">
			{displayText}
			<span className="animate-pulse mr-1">|</span>
		</span>
	);
};

export default AnimatedRoleCycler;
