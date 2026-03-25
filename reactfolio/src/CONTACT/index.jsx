import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
	Mail, Phone, MapPin, Send, Loader2, CheckCircle,
	AlertCircle, Terminal, ArrowRight
} from "lucide-react";
import emailjs from "@emailjs/browser";
import PageLayout from "../components/PageLayout";

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
		date: new Date().toISOString(),
		time: Date.now(),
		useragent: navigator.userAgent,
	});

	const EMAILJS_CONFIG = {
		serviceID: "service_h5sh46p",
		templateID: "template_3s06bzm",
		publicKey: "vVFDGGcpq9wK7RD83",
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setIsError(false);
		setIsSuccess(false);
		setErrorMessage("");

		try {
			if (!formData.name || !formData.email || !formData.subject || !formData.message) {
				throw new Error("Please fill in all required fields");
			}

			const timestamp = new Date().toLocaleString();
			await emailjs.sendForm(
				EMAILJS_CONFIG.serviceID,
				EMAILJS_CONFIG.templateID,
				form.current,
				EMAILJS_CONFIG.publicKey,
				{ timestamp, to_email: "leslieajayi27@gmail.com" }
			);

			setIsLoading(false);
			setIsSuccess(true);
			setFormData({
				name: "", email: "", subject: "", message: "",
				date: new Date().toISOString(), time: Date.now(), useragent: navigator.userAgent,
			});
			setTimeout(() => setIsSuccess(false), 5000);
		} catch (error) {
			setIsLoading(false);
			setIsError(true);
			setErrorMessage(error.text || error.message || "Failed to send. Try again or contact me directly.");
			setTimeout(() => { setIsError(false); setErrorMessage(""); }, 5000);
		}
	};

	const inputClasses = "w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-sm text-white placeholder:text-white/20 focus:outline-none focus:border-green-400/50 focus:bg-white/[0.05] transition-all duration-300 font-mono text-sm";

	return (
		<PageLayout>
			<section className="py-20 md:py-28 px-6 md:px-12">
				<div className="max-w-5xl mx-auto">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-4">
							// CONTACT
						</div>
						<h1
							className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
							style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
						>
							Let's <span className="text-green-400">connect</span>
						</h1>
						<p className="text-white/40 text-lg max-w-xl mb-16">
							Have a project in mind? Need an engineer? Or just want to talk tech.
							I'm always open to new opportunities.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Contact info sidebar */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="space-y-6"
						>
							{/* Contact methods */}
							{[
								{
									icon: Mail,
									label: "EMAIL",
									value: "leslieajayi27@gmail.com",
									href: "mailto:leslieajayi27@gmail.com",
									sub: "Response within 24 hours",
								},
								{
									icon: Phone,
									label: "PHONE",
									value: "+233 (27) 123-7965",
									href: "tel:+233271237965",
									sub: "Mon - Fri, 9am - 6pm",
								},
								{
									icon: MapPin,
									label: "LOCATION",
									value: "Accra, Ghana",
									sub: "Remote & on-site available",
								},
							].map((item) => (
								<div
									key={item.label}
									className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-green-400/20 transition-all duration-300"
								>
									<div className="flex items-start gap-4">
										<item.icon size={18} className="text-green-400 mt-0.5" />
										<div>
											<div className="font-mono text-xs text-white/30 tracking-wider mb-1">
												{item.label}
											</div>
											{item.href ? (
												<a
													href={item.href}
													className="text-white/80 text-sm hover:text-green-400 transition-colors"
												>
													{item.value}
												</a>
											) : (
												<div className="text-white/80 text-sm">{item.value}</div>
											)}
											<div className="text-white/30 text-xs mt-1">{item.sub}</div>
										</div>
									</div>
								</div>
							))}

							{/* Quick stats */}
							<div className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
								<div className="font-mono text-xs text-white/30 tracking-wider mb-4">
									WHY_WORK_WITH_ME
								</div>
								<div className="space-y-3 font-mono text-xs">
									{[
										{ label: "response_time", value: "< 24h" },
										{ label: "delivery", value: "on_time" },
										{ label: "communication", value: "daily_updates" },
										{ label: "status", value: "available", highlight: true },
									].map((stat) => (
										<div key={stat.label} className="flex justify-between">
											<span className="text-white/30">{stat.label}:</span>
											<span className={stat.highlight ? "text-green-400" : "text-white/60"}>
												{stat.value}
											</span>
										</div>
									))}
								</div>
							</div>
						</motion.div>

						{/* Contact form */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.6 }}
							className="lg:col-span-2"
						>
							<div className="p-6 md:p-8 rounded-lg border border-white/5 bg-white/[0.02]">
								<div className="flex items-center gap-3 mb-6">
									<Terminal className="w-5 h-5 text-green-400" />
									<span className="font-mono text-sm text-white/60">~/contact/send-message</span>
								</div>

								{/* Status messages */}
								{isSuccess && (
									<div className="mb-6 p-4 border border-green-400/20 bg-green-400/[0.05] rounded-sm flex items-center gap-3">
										<CheckCircle className="text-green-400" size={18} />
										<div>
											<p className="text-green-400 text-sm font-mono">Message sent successfully.</p>
											<p className="text-green-400/60 text-xs font-mono">I'll respond within 24 hours.</p>
										</div>
									</div>
								)}

								{isError && (
									<div className="mb-6 p-4 border border-red-400/20 bg-red-400/[0.05] rounded-sm flex items-center gap-3">
										<AlertCircle className="text-red-400" size={18} />
										<div>
											<p className="text-red-400 text-sm font-mono">Error: failed to send</p>
											<p className="text-red-400/60 text-xs font-mono">{errorMessage}</p>
										</div>
									</div>
								)}

								<form ref={form} onSubmit={handleSubmit} className="space-y-5" id="contact-form">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
										<div>
											<label className="block font-mono text-xs text-white/30 mb-2 tracking-wider">
												NAME *
											</label>
											<input
												type="text" name="name" value={formData.name}
												onChange={handleChange} required
												className={inputClasses} placeholder="your_name"
											/>
										</div>
										<div>
											<label className="block font-mono text-xs text-white/30 mb-2 tracking-wider">
												EMAIL *
											</label>
											<input
												type="email" name="email" value={formData.email}
												onChange={handleChange} required
												className={inputClasses} placeholder="you@domain.com"
											/>
										</div>
									</div>

									<div>
										<label className="block font-mono text-xs text-white/30 mb-2 tracking-wider">
											SUBJECT *
										</label>
										<input
											type="text" name="subject" value={formData.subject}
											onChange={handleChange} required
											className={inputClasses} placeholder="project_inquiry"
										/>
									</div>

									<div>
										<label className="block font-mono text-xs text-white/30 mb-2 tracking-wider">
											MESSAGE *
										</label>
										<textarea
											name="message" value={formData.message}
											onChange={handleChange} required rows={6}
											className={`${inputClasses} resize-vertical`}
											placeholder="Tell me about your project, timeline, and requirements..."
										/>
									</div>

									<input type="hidden" name="date" value={formData.date} />
									<input type="hidden" name="time" value={formData.time} />
									<input type="hidden" name="useragent" value={formData.useragent} />

									<button
										type="submit" disabled={isLoading}
										className="group w-full flex items-center justify-center gap-3 px-8 py-3 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-sm tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
									>
										{isLoading ? (
											<>
												<Loader2 className="animate-spin" size={16} />
												SENDING...
											</>
										) : (
											<>
												<Send size={16} />
												SEND_MESSAGE
												<ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
											</>
										)}
									</button>

									<p className="text-center font-mono text-xs text-white/20">
										* required fields — your data is only used to respond to this message
									</p>
								</form>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</PageLayout>
	);
};

export default Contact;
