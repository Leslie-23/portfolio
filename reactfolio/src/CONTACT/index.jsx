import React, { useState, useRef } from "react";
import {
	Mail,
	Phone,
	MapPin,
	Send,
	Loader2,
	CheckCircle,
	AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Map from "../components/Map";

// Sanitize input to prevent XSS and email injection
const sanitizeInput = (str, maxLength = 1000) => {
	if (typeof str !== "string") return "";
	return str
		.replace(/<[^>]*>/g, "") // Strip HTML tags
		.replace(/[<>]/g, "") // Remove angle brackets
		.trim()
		.slice(0, maxLength);
};

// Validate email format
const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const Contact = () => {
	const form = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	// EmailJS Configuration - Updated with your credentials
	const EMAILJS_CONFIG = {
		serviceID: "service_h5sh46p",
		templateID: "template_3s06bzm",
		publicKey: "vVFDGGcpq9wK7RD83",
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setIsError(false);
		setIsSuccess(false);
		setErrorMessage("");

		try {
			// Sanitize all inputs before validation
			const sanitizedData = {
				name: sanitizeInput(formData.name, 100),
				email: sanitizeInput(formData.email, 254),
				subject: sanitizeInput(formData.subject, 200),
				message: sanitizeInput(formData.message, 5000),
			};

			// Validate required fields
			if (
				!sanitizedData.name ||
				!sanitizedData.email ||
				!sanitizedData.subject ||
				!sanitizedData.message
			) {
				throw new Error("Please fill in all required fields");
			}

			// Validate email format
			if (!isValidEmail(sanitizedData.email)) {
				throw new Error("Please enter a valid email address");
			}

			// Validate minimum message length
			if (sanitizedData.message.length < 10) {
				throw new Error("Message must be at least 10 characters");
			}

			// Add timestamp to form data
			const timestamp = new Date().toLocaleString();

			// Send using EmailJS
			const result = await emailjs.sendForm(
				EMAILJS_CONFIG.serviceID,
				EMAILJS_CONFIG.templateID,
				form.current,
				EMAILJS_CONFIG.publicKey,
				{
					timestamp: timestamp,
					to_email: "leslieajayi27@gmail.com",
				}
			);

			if (process.env.NODE_ENV === "development") {
				console.log("Email sent successfully:", result);
			}

			setIsLoading(false);
			setIsSuccess(true);

			// Reset form
			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});

			// Reset success message after 5 seconds
			setTimeout(() => setIsSuccess(false), 5000);
		} catch (error) {
			setIsLoading(false);
			setIsError(true);

			// Provide specific error messages
			if (error.text) {
				setErrorMessage(error.text);
			} else if (error.message) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(
					"Failed to send message. Please try again or contact me directly."
				);
			}

			// Reset error message after 5 seconds
			setTimeout(() => {
				setIsError(false);
				setErrorMessage("");
			}, 5000);
		}
	};

	return (
		<>
			<Navbar />
			<section
				id="contact"
				className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
			>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Header */}
					<div className="text-center mb-16">
						<h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
							Get In Touch
						</h2>
						<p className="text-xl text-gray-600 max-w-2xl mx-auto">
							Ready to bring your ideas to life? Let's discuss
							your project and create something amazing together.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Contact Information */}
						<div className="lg:col-span-1 space-y-8">
							<div>
								<h3 className="text-2xl font-bold text-gray-900 mb-6">
									Let's Connect
								</h3>
								<p className="text-gray-600 mb-8">
									I'm always interested in new opportunities,
									collaborative projects, and innovative
									ideas. Whether you have a specific project
									in mind or just want to chat about
									technology, feel free to reach out.
								</p>
							</div>

							{/* Contact Methods */}
							<div className="space-y-6">
								<div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
									<div className="p-3 bg-green-100 rounded-lg">
										<Mail
											className="text-green-600"
											size={24}
										/>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 mb-1">
											Email
										</h4>
										<p className="text-gray-600">
											<a
												href="mailto:leslieajayi27@gmail.com"
												className="hover:text-green-600 transition-colors"
											>
												leslieajayi27@gmail.com
											</a>
										</p>
										<p className="text-sm text-gray-500">
											I'll respond within 24 hours
										</p>
									</div>
								</div>

								<div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
									<div className="p-3 bg-green-100 rounded-lg">
										<Phone
											className="text-green-600"
											size={24}
										/>
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 mb-1">
											Phone
										</h4>
										<p className="text-gray-600">
											<a
												href="tel:+233271237965"
												className="hover:text-green-600 transition-colors"
											>
												+233 (27) 123-7965
											</a>
										</p>
										<p className="text-sm text-gray-500">
											Mon - Fri, 9am - 6pm
										</p>
									</div>
								</div>

								<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
									<div className="flex items-start gap-4 p-4">
										<div className="p-3 bg-green-100 rounded-lg">
											<MapPin
												className="text-green-600"
												size={24}
											/>
										</div>
										<div className="flex-1">
											<h4 className="font-semibold text-gray-900 mb-1">
												Location
											</h4>
											<p className="text-gray-600">
												Accra, Ghana
											</p>
											<p className="text-sm text-gray-500 mb-3">
												Remote & On-site Projects
											</p>

											{/* Map Container */}
											<div className="mt-2">
												<Map />
											</div>

											<div className="mt-3 text-xs text-gray-500">
												<p>
													📍 Based in Accra, serving
													clients worldwide
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Quick Stats */}
							<div className="bg-white rounded-xl p-6 border border-gray-200">
								<h4 className="font-semibold text-gray-900 mb-4">
									Why Work With Me?
								</h4>
								<div className="space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-gray-600">
											Response Time
										</span>
										<span className="font-semibold text-green-600">
											{"< 24 hours"}
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600">
											Project Completion
										</span>
										<span className="font-semibold text-green-600">
											On Time
										</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600">
											Communication
										</span>
										<span className="font-semibold text-green-600">
											Daily Updates
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Contact Form */}
						<div className="lg:col-span-2">
							<div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
								<h3 className="text-2xl font-bold text-gray-900 mb-2">
									Send a Message
								</h3>
								<p className="text-gray-600 mb-8">
									Fill out the form below and I'll get back to
									you as soon as possible.
								</p>

								{/* Status Messages */}
								{isSuccess && (
									<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
										<CheckCircle
											className="text-green-600"
											size={20}
										/>
										<div>
											<p className="font-medium text-green-800">
												Message sent successfully!
											</p>
											<p className="text-green-700 text-sm">
												I'll get back to you within 24
												hours.
											</p>
										</div>
									</div>
								)}

								{isError && (
									<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
										<AlertCircle
											className="text-red-600"
											size={20}
										/>
										<div>
											<p className="font-medium text-red-800">
												Failed to send message
											</p>
											<p className="text-red-700 text-sm">
												{errorMessage}
											</p>
										</div>
									</div>
								)}

								<form
									ref={form}
									onSubmit={handleSubmit}
									className="space-y-6"
									id="contact-form"
								>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="name"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Full Name *
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												required
												maxLength={100}
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
												placeholder="Your full name"
											/>
										</div>
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-700 mb-2"
											>
												Email Address *
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												required
												maxLength={254}
												className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
												placeholder="your.email@example.com"
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor="subject"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Subject *
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleChange}
											required
											maxLength={200}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
											placeholder="What's this about?"
										/>
									</div>

									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium text-gray-700 mb-2"
										>
											Message *
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											required
											rows={6}
											maxLength={5000}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-vertical"
											placeholder="Tell me about your project, timeline, and any specific requirements..."
										/>
									</div>

									<button
										type="submit"
										disabled={isLoading}
										className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
									>
										{isLoading ? (
											<>
												<Loader2
													className="animate-spin"
													size={20}
												/>
												Sending Message...
											</>
										) : (
											<>
												<Send size={20} />
												Send Message
											</>
										)}
									</button>

									<p className="text-center text-sm text-gray-500">
										* Required fields. Your information is
										secure and will only be used to respond
										to your inquiry.
									</p>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default Contact;
