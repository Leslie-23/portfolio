import React from "react";

// List of websites to preview
const websites = [
	{
		title: "E-commerce App & Management System",
		url: "https://paltech-e-commerce.netlify.app",
	},
	{
		title: "School Management System",
		url: "https://paltech-school-management-system.netlify.app",
	},
	{ title: "Restaurant Website", url: "https://grilli-web001.netlify.app" },
	{
		title: "Code Quiz & Game Trivia",
		url: "https://github.com/Leslie-23/code-quiz-trivia",
	},
	{ title: "Dev EX", url: "https://leslie23-dev-experience2k25.netlify.app" },
	{
		title: "Chrome Dino (Cheat Code)",
		url: "https://github.com/Leslie-23/ChromeDino-cheatCode",
	},
	{
		title: "Git Helper (npm Package)",
		url: "https://github.com/Leslie-23/git-helper",
	},
	{
		title: "Expense Tracker",
		url: "https://github.com/Leslie-23/fullstackExpenseTracker",
	},
	{ title: "Chess Game", url: "https://github.com/Leslie-23/chessGame" },
	{ title: "Weather App", url: "https://weather-app-vert-eta.vercel.app/" },
];

// Function to generate screenshot API URL
const getScreenshot = (url) => {
	// If GitHub repo, use a placeholder image
	if (url.includes("github.com")) {
		// return "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg";
		return "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
	}

	return `https://shot.screenshotapi.net/v3/screenshot?token=1Q9D6B2-SF5MXKF-PX3BPSX-9D8NZ7P&url=${encodeURIComponent(
		url
	)}&width=1920&height=1080&full_page=true&fresh=true&extract_text=true&extract_html=true&output=image&file_type=png&lazy_load=true&wait_for_event=load&delay=10`;
};
const ProjectPreviews = () => {
	return (
		<section className="container mx-auto text-center py-10 px-4">
			<h2 className="text-3xl font-bold mb-8 text-green-500">
				Live Site Previews
			</h2>

			{/* Responsive Grid Layout */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{websites.map((site, index) => (
					<div
						key={index}
						className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-100"
					>
						<a
							href={site.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="preview-image-container">
								<img
									src={getScreenshot(site.url)}
									alt={site.title}
									className="w-full h-48 object-cover object-top "
									loading="lazy"
								/>
							</div>
							<div className="p-4">
								<h3 className="text-xl font-semibold text-gray-900">
									{site.title}
								</h3>
								<p className="text-gray-500 text-sm">
									{site.url}
								</p>
							</div>
						</a>
					</div>
				))}
			</div>
		</section>
	);
};

export default ProjectPreviews;
