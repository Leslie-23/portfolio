import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const navigate = useNavigate();

	return (
		<footer className="bg-surface border-t border-border transition-colors duration-300">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					{/* Brand Section */}
					<div className="md:col-span-2">
						<div className="flex items-center mb-4">
							<span className="text-2xl font-bold text-heading font-heading">
								LESLIE PAUL
							</span>
						</div>
						<p className="text-body max-w-md mb-4">
							Software Engineer passionate about building
							intelligent, data-driven products with real-world
							impact.
						</p>
						<div className="flex space-x-4">
							{[
								{
									name: "GitHub",
									icon: <Github size={20} />,
									href: "https://github.com/leslie-23",
								},
								{
									name: "LinkedIn",
									icon: <Linkedin size={20} />,
									href: "https://www.linkedin.com/in/leslie-paul-ajayi-409b16356",
								},
								{
									name: "Twitter",
									icon: <Twitter size={20} />,
									href: "https://x.com/_iam_leslie",
								},
								{
									name: "Email",
									icon: <Mail size={20} />,
									href: "mailto:leslieajayi27@gmail.com",
								},
							].map((social) => (
								<a
									key={social.name}
									href={social.href}
									className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-heading hover:bg-green-200 dark:hover:bg-green-900/50 hover:scale-110 transition-all duration-200"
									aria-label={social.name}
									target="_blank"
									rel="noopener noreferrer"
								>
									{social.icon}
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-2xl text-heading font-semibold mb-4 font-heading">
							Navigation
						</h3>
						<ul className="space-y-2">
							{["Home", "Projects", "About", "Contact"].map(
								(item) => (
									<li key={item}>
										<a
											href={`/${item.toLowerCase()}`}
											className="text-muted hover:text-primary transition-colors duration-200"
										>
											{item}
										</a>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-2xl text-heading font-semibold mb-4 font-heading">
							Get In Touch
						</h3>
						<ul className="space-y-2 text-muted">
							<li>
								<a
									href="mailto:leslieajayi27@gmail.com"
									className="hover:text-primary transition-colors duration-200"
								>
									leslieajayi27@gmail.com
								</a>
							</li>
							<li>
								<a
									href="tel:+233271237965"
									className="hover:text-primary transition-colors duration-200"
								>
									+233 (27) 123-7965
								</a>
							</li>
							<li className="text-sm">Based in Accra, Ghana</li>
						</ul>
					</div>
				</div>

				{/* Technologies */}
				<div className="border-t border-border pt-8 mb-8">
					<h3 className="text-heading font-semibold mb-4 text-center font-heading">
						Technologies & Skills
					</h3>
					<div className="flex flex-wrap justify-center gap-3 font-heading">
						{[
							"React",
							"Node.js",
							"Python",
							"TypeScript",
							"MongoDB",
							"PostgreSQL",
							"AWS",
							"Docker",
							"Git",
							"REST APIs",
						].map((tech) => (
							<span
								key={tech}
								className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
					<div className="text-muted text-sm mb-4 md:mb-0">
						&copy; {currentYear} Leslie Paul. All rights reserved.
					</div>

					<div className="flex space-x-6 text-sm">
						<button
							className="text-muted hover:text-primary transition-colors"
							onClick={() => navigate("/privacy-policy")}
						>
							Privacy Policy
						</button>
						<button
							className="text-muted hover:text-primary transition-colors"
							onClick={() => navigate("/terms-of-service")}
						>
							Terms of Service
						</button>
						<button
							className="text-muted hover:text-primary transition-colors"
							onClick={() => navigate("/cookies")}
						>
							Cookies
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
