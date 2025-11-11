import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Star } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function Testimonials() {
	const [selectedProject, setSelectedProject] = useState(null);

	const testimonials = [
		{
			id: 1,
			name: "Cece",
			role: "Business Owner",
			avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "neneCollectionz",
			projectType: "eCommerce Platform",
			testimonial:
				"The hair-selling platform transformed my business! Sales increased by 200% in the first month. The Instagram integration and seamless Stripe payments made everything so smooth.",
			rating: 5,
			projectPreview: "https://nene-collectionz.vercel.app",
			technologies: ["React", "Node.js", "Stripe", "Instagram API"],
			features: [
				"SEO Optimized",
				"Auto Instagram Sync",
				"Inventory Management",
			],
		},
		{
			id: 2,
			name: "David Mensah",
			role: "University Colleague",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "githelper",
			projectType: "CLI Tool",
			testimonial:
				"This npm package saved our team hours each week! The automation of Git tasks improved our workflow efficiency by 45%. Highly recommended for any development team.",
			rating: 5,
			projectPreview: "https://www.npmjs.com/package/githelper",
			technologies: ["Node.js", "CLI", "Git API"],
			features: [
				"Auto Committing",
				"Branch Management",
				"Push Automation",
			],
		},
		{
			id: 3,
			name: "Chef Kwame",
			role: "Restaurant Owner",
			avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "grilli",
			projectType: "Restaurant Management",
			testimonial:
				"Our high-end restaurant now operates like a well-oiled machine! The menu management and analytics dashboard helped us reduce food waste by 30%.",
			rating: 5,
			projectPreview: "https://grilli-restaurant.vercel.app",
			technologies: ["MERN Stack", "Real-time Updates", "Analytics"],
			features: ["Menu Management", "Order Tracking", "Admin Dashboard"],
		},
		{
			id: 4,
			name: "University of Ghana",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "uniCliq",
			projectType: "Social Platform",
			testimonial:
				"Revolutionized how our students connect and navigate campus! The real-time routing and study groups feature increased student engagement significantly.",
			rating: 5,
			projectPreview: "https://unicliq.vercel.app",
			technologies: ["React Native", "Real-time", "Maps Integration"],
			features: ["Campus Navigation", "Study Groups", "Event Listings"],
		},
		{
			id: 5,
			name: "Transport Association",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "Trofficient",
			projectType: "Mobility Platform",
			testimonial:
				"The bus network platform transformed transportation in Spintex Road! Live GPS tracking and MoMo payments made commuting reliable and convenient.",
			rating: 5,
			projectPreview: "https://trofficient.vercel.app",
			technologies: ["React", "GPS Tracking", "MoMo API"],
			features: [
				"Live Tracking",
				"Route Optimization",
				"Mobile Payments",
			],
		},
		{
			id: 6,
			name: "Multi-Campus University",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "Campus Connect",
			projectType: "Social & Navigation App",
			testimonial:
				"The backend architecture is rock solid! Handles thousands of concurrent users during peak campus events without any issues.",
			rating: 5,
			projectPreview: "https://campus-connect-demo.vercel.app",
			technologies: ["Node.js", "MongoDB", "Real-time", "Firebase"],
			features: [
				"Activity Sharing",
				"Email Verification",
				"Scalable Backend",
			],
		},
		{
			id: 7,
			name: "Retail Store Owner",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1556157382-97eda3ac1f58?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "QuickBill",
			projectType: "POS System",
			testimonial:
				"Our inventory management became so efficient! The barcode scanner integration and daily analytics helped us optimize stock levels perfectly.",
			rating: 5,
			projectPreview: "https://quickbill-pos.vercel.app",
			technologies: ["React", "Electron", "MySQL", "Barcode API"],
			features: ["POS System", "Inventory Management", "Sales Analytics"],
		},
		{
			id: 8,
			name: "University SRC",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "Eventra",
			projectType: "Event Management",
			testimonial:
				"Ticket sales tripled with the QR verification system! The real-time features made event management so much easier for our team.",
			rating: 5,
			projectPreview: "https://eventra-ticketing.vercel.app",
			technologies: ["React", "Firebase", "QR Generation"],
			features: [
				"Ticket Management",
				"QR Verification",
				"Real-time Updates",
			],
		},
		{
			id: 9,
			name: "Book Club Community",
			role: "Users",
			avatar: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "BookTrackr",
			projectType: "Reading Tracker",
			testimonial:
				"Finally, a reading app that actually helps track progress! The OpenLibrary integration and offline caching are game-changers for book lovers.",
			rating: 4,
			projectPreview: "https://booktrackr-app.vercel.app",
			technologies: ["React", "OpenLibrary API", "IndexedDB"],
			features: [
				"Progress Tracking",
				"Book Summaries",
				"Offline Support",
			],
		},
		{
			id: 10,
			name: "Weather Startup",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1551836026-d5c0889dd6d6?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "MyWeatherly",
			projectType: "Weather App",
			testimonial:
				"The dark mode and PWA features made our weather app stand out! Users love the offline functionality and clean interface.",
			rating: 5,
			projectPreview: "https://myweatherly.vercel.app",
			technologies: ["PWA", "WeatherAPI", "Netlify Functions"],
			features: ["Dark Mode", "Offline Caching", "Real-time Updates"],
		},
		{
			id: 11,
			name: "Campus Developers Group",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "VibeRoom",
			projectType: "Voice Chat Tool",
			testimonial:
				"WebRTC implementation is flawless! Our student groups can now collaborate with crystal-clear voice quality and minimal latency.",
			rating: 4,
			projectPreview: "https://viberoom.vercel.app",
			technologies: ["WebRTC", "React", "Socket.io"],
			features: ["Voice Chat", "Low Latency", "Group Collaboration"],
		},
		{
			id: 12,
			name: "Boutique Owner",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "ShopBase",
			projectType: "eCommerce Platform",
			testimonial:
				"Sales increased by 150% after launching! The MoMo and Paystack integration made checkout so smooth for our customers.",
			rating: 5,
			projectPreview: "https://shopbase-store.vercel.app",
			technologies: ["Next.js", "Node.js", "Paystack", "MoMo"],
			features: ["Product Catalog", "Cart System", "Payment Gateway"],
		},
		// Placeholders for remaining projects - you can fill these in later
		{
			id: 13,
			name: "Logistics Company",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "MapRoute360",
			projectType: "Route Visualization",
			testimonial:
				"The custom clustering algorithm optimized our delivery routes by 35%! Game-changing for our logistics operations.",
			rating: 5,
			projectPreview: "#",
			technologies: ["Google Maps API", "React", "Custom Algorithms"],
			features: ["Route Optimization", "Geolocation", "Live Tracking"],
		},
		{
			id: 14,
			name: "Developer Community",
			role: "Users",
			avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "PortfolioX",
			projectType: "Portfolio Generator",
			testimonial:
				"Created my professional portfolio in minutes! The live preview feature and CMS integration made customization incredibly easy.",
			rating: 5,
			projectPreview: "#",
			technologies: ["React", "CMS", "Live Preview"],
			features: [
				"Portfolio Generation",
				"Live Preview",
				"Multiple Templates",
			],
		},
		{
			id: 15,
			name: "Tutoring Company",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "ExamPrepPro",
			projectType: "Education Platform",
			testimonial:
				"Student performance improved dramatically with AI-based recommendations! The mock test scheduling is incredibly efficient.",
			rating: 5,
			projectPreview: "#",
			technologies: ["React", "AI Integration", "Analytics"],
			features: [
				"Mock Tests",
				"Performance Tracking",
				"AI Recommendations",
			],
		},
		// Add more placeholders here for remaining projects...
		{
			id: 16,
			name: "Content Creator",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "SnapEdit",
			projectType: "Photo Editing Tool",
			testimonial:
				"The Canvas API implementation is brilliant! Saves me hours on photo editing and caption generation every week.",
			rating: 4,
			projectPreview: "#",
			technologies: ["React", "Canvas API", "Image Processing"],
			features: ["Photo Editing", "Caption Generation", "Text Overlay"],
		},
		{
			id: 17,
			name: "NGO Analytics Team",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1551836026-d5c0889dd6d6?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "DataVis360",
			projectType: "Data Visualization",
			testimonial:
				"Our reports now tell compelling stories! The interactive graphs and maps made complex data accessible to everyone.",
			rating: 5,
			projectPreview: "#",
			technologies: ["D3.js", "React", "Map Integration"],
			features: ["Interactive Graphs", "Dynamic Reports", "Data Mapping"],
		},
		{
			id: 18,
			name: "Startup Marketing Team",
			role: "Client",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.1.0&auto=format&fit=crop&w=200&q=80",
			project: "MailEdge",
			projectType: "Email Automation",
			testimonial:
				"Email campaign performance improved by 300%! The analytics dashboard provides incredible insights into engagement metrics.",
			rating: 5,
			projectPreview: "#",
			technologies: ["Node.js", "SendGrid API", "Analytics"],
			features: ["Bulk Email", "Campaign Analytics", "Automation"],
		},
		// Continue adding more placeholders as needed...
	];

	const renderStars = (rating) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				size={16}
				className={
					i < rating
						? "text-yellow-400 fill-current"
						: "text-gray-300"
				}
			/>
		));
	};

	return (
		<>
			<Navbar />
			<section className="py-20 bg-gray-50 px-4 md:px-8">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
							Client Testimonials
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Here's what clients and collaborators have to say
							about the projects we've built together.
						</p>
					</div>

					{/* Testimonials Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{testimonials.map((testimonial) => (
							<motion.div
								key={testimonial.id}
								whileHover={{ y: -5 }}
								className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
								onClick={() => setSelectedProject(testimonial)}
							>
								{/* Rating */}
								<div className="flex mb-4">
									{renderStars(testimonial.rating)}
								</div>

								{/* Testimonial Text */}
								<p className="text-gray-700 mb-6 line-clamp-4">
									"{testimonial.testimonial}"
								</p>

								{/* Client Info */}
								<div className="flex items-center gap-4">
									<img
										src={testimonial.avatar}
										alt={testimonial.name}
										className="w-12 h-12 rounded-full object-cover"
									/>
									<div className="flex-1">
										<h4 className="font-semibold text-gray-900">
											{testimonial.name}
										</h4>
										<p className="text-sm text-gray-600">
											{testimonial.role}
										</p>
									</div>
								</div>

								{/* Project Badge */}
								<div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
									<ExternalLink size={14} />
									{testimonial.project}
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Project Detail Modal */}
				<AnimatePresence>
					{selectedProject && (
						<motion.div
							className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-8"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setSelectedProject(null)}
						>
							<motion.div
								className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								onClick={(e) => e.stopPropagation()}
							>
								<button
									className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-2 shadow-lg"
									onClick={() => setSelectedProject(null)}
								>
									<X size={20} />
								</button>

								<div className="space-y-6">
									{/* Header */}
									<div className="flex items-start justify-between">
										<div>
											<h3 className="text-2xl font-bold text-gray-900 mb-2">
												{selectedProject.project}
											</h3>
											<p className="text-gray-600">
												{selectedProject.projectType}
											</p>
										</div>
										<div className="flex">
											{renderStars(
												selectedProject.rating
											)}
										</div>
									</div>

									{/* Client Info */}
									<div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
										<img
											src={selectedProject.avatar}
											alt={selectedProject.name}
											className="w-16 h-16 rounded-full object-cover"
										/>
										<div>
											<h4 className="font-semibold text-gray-900 text-lg">
												{selectedProject.name}
											</h4>
											<p className="text-gray-600">
												{selectedProject.role}
											</p>
										</div>
									</div>

									{/* Testimonial */}
									<div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
										<blockquote className="text-gray-700 text-lg leading-relaxed italic">
											"{selectedProject.testimonial}"
										</blockquote>
									</div>

									{/* Technologies */}
									<div>
										<h4 className="font-semibold text-gray-900 mb-3">
											Technologies Used
										</h4>
										<div className="flex flex-wrap gap-2">
											{selectedProject.technologies.map(
												(tech, index) => (
													<span
														key={index}
														className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
													>
														{tech}
													</span>
												)
											)}
										</div>
									</div>

									{/* Features */}
									<div>
										<h4 className="font-semibold text-gray-900 mb-3">
											Key Features
										</h4>
										<ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
											{selectedProject.features.map(
												(feature, index) => (
													<li
														key={index}
														className="flex items-center gap-2 text-gray-700"
													>
														<div className="w-2 h-2 bg-green-500 rounded-full" />
														{feature}
													</li>
												)
											)}
										</ul>
									</div>

									{/* Project Link */}
									{selectedProject.projectPreview !== "#" && (
										<div className="pt-4 border-t border-gray-200">
											<a
												href={
													selectedProject.projectPreview
												}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
											>
												<ExternalLink size={18} />
												View Live Project
											</a>
										</div>
									)}
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</section>
			<Footer />
		</>
	);
}
