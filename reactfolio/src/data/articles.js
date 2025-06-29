import React from "react";

const articleStyle = `
  .article-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }
  
  .article-image {
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    margin: 20px 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .article-content h1 {
    color: #2c3e50;
    margin-bottom: 20px;
  }
  
  .article-content p {
    margin-bottom: 15px;
    text-align: justify;
  }
`;

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
		style: articleStyle,
		body: (
			<div className="article-content">
				<h1>
					From Curiosity to Career: My Software Engineering Journey
				</h1>
				<p>
					My fascination with technology began at age 12 when I built
					my first website using HTML and CSS. What started as a hobby
					quickly evolved into a passion as I discovered the power of
					programming to solve real-world problems.
				</p>
				<img
					src="/images/coding-journey.jpg"
					alt="Timeline of my coding journey"
					className="article-image"
				/>
				<p>
					During my computer science studies, I specialized in
					full-stack development, mastering both frontend technologies
					like React and backend systems using Node.js and Python. My
					internship at TechSolutions Inc. gave me hands-on experience
					with cloud platforms and CI/CD pipelines.
				</p>
				<p>
					What excites me most about software engineering is the
					constant evolution. Every project presents new challenges
					that push me to learn and grow. Whether it's implementing a
					new framework or optimizing database queries, I thrive on
					the problem-solving aspects of development.
				</p>
			</div>
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
		style: articleStyle,
		body: (
			<div className="article-content">
				<h1>Why I Believe in Open Source</h1>
				<p>
					My open source journey began with small documentation fixes
					to popular libraries. These initial contributions taught me
					the collaborative nature of software development and the
					importance of clear communication in technical projects.
				</p>
				<img
					src="/images/open-source.jpg"
					alt="GitHub contribution graph"
					className="article-image"
				/>
				<p>I've since published several npm packages including:</p>
				<ul>
					<li>
						<strong>react-form-validator</strong>: A lightweight
						form validation library
					</li>
					<li>
						<strong>async-task-manager</strong>: For managing
						concurrent asynchronous operations
					</li>
					<li>
						<strong>ui-animation-hooks</strong>: Custom React hooks
						for common animations
					</li>
				</ul>
				<p>
					Beyond code, I actively participate in local developer
					meetups and mentor newcomers to open source. The community
					aspect of software development is what makes this field
					truly special.
				</p>
			</div>
		),
	};
}

function article_3() {
	return {
		date: "12 Jan 2025",
		title: "AI & Its Real-World Applications",
		description:
			"Artificial Intelligence is shaping the future. From automation to decision-making, I've integrated AI into several projects. Here's how I explore AI-driven technologies.",
		style: articleStyle,
		keywords: [
			"AI Applications",
			"Machine Learning",
			"AI in Development",
			"Future Tech",
		],
		body: (
			<div className="article-content">
				<h1>Bridging AI Theory and Practice</h1>
				<p>
					My work with AI began during my machine learning
					specialization at university. Since then, I've implemented
					AI solutions across various domains, from natural language
					processing to computer vision systems.
				</p>
				<img
					src="/images/ai-applications.jpg"
					alt="AI model visualization"
					className="article-image"
				/>
				<p>
					One notable project involved developing a content
					recommendation engine that increased user engagement by 42%
					compared to traditional methods. The system uses
					collaborative filtering combined with deep learning to
					understand user preferences.
				</p>
				<p>
					I'm particularly excited about AI's potential to enhance
					developer productivity. Tools like GitHub Copilot
					demonstrate how AI can handle boilerplate code, allowing
					developers to focus on architectural decisions and creative
					problem-solving.
				</p>
			</div>
		),
	};
}

function article_4() {
	return {
		date: "22 Dec 2025",
		title: "Artificial Intelligence in Healthcare",
		description:
			"AI is transforming the healthcare industry, from improving patient outcomes to streamlining operations. Discover the latest applications of this game-changing technology.",
		style: articleStyle,
		keywords: [
			"Artificial Intelligence in Healthcare",
			"AI",
			"AI in healthcare",
		],
		body: (
			<div className="article-content">
				<h1>AI's Transformative Impact on Healthcare</h1>
				<p>
					During my work with HealthTech Innovations, I contributed to
					developing an AI system that analyzes medical images with
					94% accuracy in detecting early-stage abnormalities. This
					experience showed me firsthand how technology can save
					lives.
				</p>
				<img
					src="/images/ai-healthcare.jpg"
					alt="AI analyzing medical scans"
					className="article-image"
				/>
				<p>
					Beyond diagnostics, we implemented predictive models that
					help hospitals anticipate patient admission rates, allowing
					for better staff allocation and resource management. Our
					system reduced emergency room wait times by an average of
					28%.
				</p>
				<p>
					The ethical considerations in healthcare AI are paramount.
					We implemented rigorous testing protocols to ensure our
					models were free from bias and provided transparent
					explanations for all diagnostic recommendations.
				</p>
			</div>
		),
	};
}

function article_5() {
	return {
		date: "23 Nov 2025",
		title: "Problem-Solving with Code",
		description:
			"Problem-solving is at the core of my development journey. Through LeetCode challenges and algorithmic thinking, I continuously refine my skills and approach to writing efficient code.",
		style: articleStyle,
		keywords: [
			"LeetCode",
			"Algorithms",
			"Problem Solving",
			"Coding Challenges",
		],
		body: (
			<div className="article-content">
				<h1>The Art of Computational Problem Solving</h1>
				<p>
					I dedicate at least 5 hours weekly to algorithmic problem
					solving on platforms like LeetCode and Codeforces. This
					practice has sharpened my ability to break down complex
					problems and identify optimal solutions.
				</p>
				<img
					src="/images/problem-solving.jpg"
					alt="Code editor with algorithm solution"
					className="article-image"
				/>
				<p>My approach involves:</p>
				<ul>
					<li>Thoroughly understanding the problem before coding</li>
					<li>Considering multiple solution approaches</li>
					<li>Analyzing time and space complexity trade-offs</li>
					<li>Refactoring for readability and performance</li>
				</ul>
				<p>
					These skills directly translate to my professional work.
					Recently, I optimized an API endpoint by recognizing it
					could be modeled as a graph traversal problem, reducing
					response times from 1200ms to under 200ms.
				</p>
			</div>
		),
	};
}

const myArticles = [article_1, article_2, article_3, article_4, article_5];

export default myArticles;
