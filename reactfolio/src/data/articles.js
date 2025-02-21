import React from "react";

function article_1() {
	return {
		date: "21 Feb 2023",
		title: "The Journey into Software Engineering",
		description:
			"A deep dive into my passion for IT, software engineering, and technology. Discover how my curiosity led me to pursue a career in full-stack development.",
		keywords: [
			"Software Engineering",
			"Full-Stack Development",
			"Career in IT",
			"Technology Passion",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">Content of article 1</div>
					<img
						src="https://picsum.photos/200/300"
						alt="random"
						className="randImage"
					/>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "15 Feb 2025",
		title: "Open Source & Community Contributions",
		description:
			"Contributing to open-source projects, publishing npm packages, and engaging with the developer community have been a significant part of my journey. Learn why open source matters to me.",
		keywords: [
			"Open Source",
			"GitHub Contributions",
			"npm Packages",
			"Developer Community",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}`,
		body: (
			<React.Fragment>
				<h1>Content of article 2</h1>
			</React.Fragment>
		),
	};
}
function article_3() {
	return {
		date: "12 Jan 2025",
		title: " AI & Its Real-World Applications",
		description:
			"Artificial Intelligence is shaping the future. From automation to decision-making, I’ve integrated AI into several projects. Here’s how I explore AI-driven technologies.",
		style: `.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}`,
		keywords: [
			" AI Applications",
			"Machine Learning",
			"AI in Development",
			"Future Tech",
		],
		body: (
			<React.Fragment>
				<h1>Content of article 2</h1>
			</React.Fragment>
		),
	};
}
function article_4() {
	return {
		date: "22 Dec 2025",
		title: "Artificial Intelligence in Healthcare",
		description:
			"AI is transforming the healthcare industry, from improving patient outcomes to streamlining operations. Discover the latest applications of this game-changing technology.",
		style: `.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}`,
		keywords: [
			"Artificial Intelligence in Healthcare",
			"AI",
			"AI in healthcare",
		],
		body: (
			<React.Fragment>
				<h1>Content of article 2</h1>
			</React.Fragment>
		),
	};
}
function article_5() {
	return {
		date: "23 Nov 2025",
		title: "Problem-Solving with Code",
		description:
			"Problem-solving is at the core of my development journey. Through LeetCode challenges and algorithmic thinking, I continuously refine my skills and approach to writing efficient code.",
		style: `.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}`,
		keywords: [
			"LeetCode",
			"Algorithms",
			"Problem Solving",
			"Coding Challenges",
		],
		body: (
			<React.Fragment>
				<h1>Content of article 2</h1>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2, article_3, article_4, article_5];

export default myArticles;
