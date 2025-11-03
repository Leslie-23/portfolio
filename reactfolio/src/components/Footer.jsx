import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-white border-t border-gray-200">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					{/* Brand Section */}
					<div className="md:col-span-2">
						<div className="flex items-center mb-4">
							<span className="text-2xl font-bold text-black">
								LESLIE PAUL
							</span>
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
									href: "https://github.com/yourusername",
								},
								{
									name: "LinkedIn",
									icon: <Linkedin size={20} />,
									href: "https://linkedin.com/in/yourusername",
								},
								{
									name: "Twitter",
									icon: <Twitter size={20} />,
									href: "https://twitter.com/yourusername",
								},
								{
									name: "Email",
									icon: <Mail size={20} />,
									href: "mailto:hello@lesliepaul.com",
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
					<div>
						<h3 className="text-black font-semibold mb-4">
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
					<div>
						<h3 className="text-black font-semibold mb-4">
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
					<div className="flex flex-wrap justify-center gap-3">
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
								className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors duration-200"
							>
								{tech}
							</span>
						))}
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
					<div className="text-gray-500 text-sm mb-4 md:mb-0">
						© {currentYear} Leslie Paul. All rights reserved.
					</div>

					{/* Legal Links */}
					<div className="flex space-x-6 text-sm">
						<span className="text-gray-500">Privacy Policy</span>
						<span className="text-gray-500">Terms of Service</span>
						<span className="text-gray-500">Cookies</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
