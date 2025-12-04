import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./globals.css";
const Footer = () => {
	const currentYear = new Date().getFullYear();
	const navigate = useNavigate();

	return (
		<footer className="bg-white border-t border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					{/* Brand Section */}
					<div className="md:col-span-2">
						<div className="flex items-center mb-4">
							<span className="text-2xl font-bold text-black roboto-condensed-black">
								LESLIE PAUL
							</span>
							{/* <img
								className="cursor-pointer"
								src="/ascii-art-text.png"
								alt="Leslie Paul"
								width={200}
								height={200}
							/> */}
						</div>
						<p className="text-gray-600 max-w-md mb-4">
							Software Engineer & IT Student passionate about
							building intelligent, data-driven products with
							real-world impact.
						</p>
						<div className="flex space-x-4">
							{/* Social Links */}
							{[
								{
									name: "GitHub",
									icon: <Github size={20} />,
									href: "https://github.com/leslie-23",
								},
								{
									name: "LinkedIn",
									icon: <Linkedin size={20} />,
									href: "https://www.linkedin.com/in/leslie-paul-ajayi-409b16356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
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
									className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-black hover:bg-green-200 hover:scale-110 transition-all duration-200"
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
					<div className="roboto-condensed-regular">
						<h3 className="text-2xl text-black font-semibold mb-4 roboto-condensed-bold">
							Navigation
						</h3>
						<ul className="space-y-2">
							{["Home", "Projects", "About", "Contact"].map(
								(item) => (
									<li
										key={item}
										className="hover:text-green-600"
									>
										<a
											href={`/${item.toLowerCase()}`}
											className="text-gray-600 hover:text-green-600 transition-colors duration-200"
										>
											{item}
										</a>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="roboto-condensed-regular">
						<h3 className="text-2xl text-black font-semibold mb-4">
							Get In Touch
						</h3>
						<ul className="space-y-2 text-gray-600">
							<li>
								<a
									href="mailto:leslieajayi27@gmail.com"
									className="hover:text-green-600 transition-colors duration-200"
								>
									hello@lesliepaul.com
								</a>
							</li>
							<li>
								<a
									href="tel:+233271237965"
									className="hover:text-green-600 transition-colors duration-200"
								>
									+233 (27) 123-7965
								</a>
							</li>
							<li className="text-sm">Based in Accra, Ghana</li>
						</ul>
					</div>
				</div>

				{/* Skills/Technologies */}
				<div className="border-t border-gray-200 pt-8 mb-8">
					<h3 className="text-black font-semibold mb-4 text-center">
						Technologies & Skills
					</h3>
					<div className="flex flex-wrap justify-center gap-3 roboto-condensed-regular">
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
							"among others...",
						].map((tech) => (
							<span
								key={tech}
								className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors duration-200"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
					<div className="text-gray-500 text-sm mb-4 md:mb-0 roboto-condensed-regular">
						© {currentYear} Leslie Paul. All rights reserved.
					</div>

					{/* Legal Links */}
					<div className="flex space-x-6 text-sm roboto-condensed-regular">
						<span
							className="text-gray-500 hover:cursor-pointer
"
							onClick={() => navigate("/privacy-policy")}
						>
							Privacy Policy
						</span>
						<span
							className="text-gray-500 hover:cursor-pointer
"
							onClick={() => navigate("/terms-of-service")}
						>
							Terms of Service
						</span>
						<span
							className="text-gray-500 hover:cursor-pointer
"
							onClick={() => navigate("/cookies")}
						>
							Cookies
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
