import React from "react";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function PrivacyPolicy() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<div className="flex justify-center mb-4">
							<div className="bg-green-100 p-3 rounded-full">
								<Shield className="h-8 w-8 text-green-600" />
							</div>
						</div>
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Privacy Policy
						</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Last updated:{" "}
							{new Date().toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</div>

					<div className="bg-white rounded-2xl shadow-lg p-8">
						{/* Introduction */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								1. Introduction
							</h2>
							<p className="text-gray-700 mb-4">
								Welcome to Leslie Paul's Portfolio ("we," "our,"
								or "us"). We are committed to protecting your
								personal information and your right to privacy.
								This Privacy Policy explains how we collect,
								use, disclose, and safeguard your information
								when you visit our portfolio website.
							</p>
							<p className="text-gray-700">
								By accessing or using our website, you signify
								that you have read, understood, and agree to our
								collection, storage, use, and disclosure of your
								personal information as described in this
								Privacy Policy.
							</p>
						</section>

						{/* Information We Collect */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								2. Information We Collect
							</h2>

							<div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
								<div className="flex items-start gap-3">
									<Eye className="h-5 w-5 text-blue-600 mt-0.5" />
									<div>
										<h3 className="font-semibold text-blue-900 mb-2">
											Personal Information
										</h3>
										<p className="text-blue-800">
											We collect personal information that
											you voluntarily provide to us when
											you express interest in obtaining
											information about us or our
											services, when you participate in
											activities on the website, or
											otherwise when you contact us.
										</p>
									</div>
								</div>
							</div>

							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								A. Personal Data
							</h3>
							<ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
								<li>
									Name and contact information (email address,
									phone number)
								</li>
								<li>
									Company name and job title (if provided)
								</li>
								<li>Communication preferences</li>
								<li>
									Any other information you choose to provide
								</li>
							</ul>

							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								B. Automatically Collected Information
							</h3>
							<ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
								<li>IP address and browser type</li>
								<li>Operating system and device information</li>
								<li>Pages visited and time spent on site</li>
								<li>Referring website and exit pages</li>
							</ul>
						</section>

						{/* How We Use Your Information */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								3. How We Use Your Information
							</h2>

							<div className="grid md:grid-cols-2 gap-6 mb-4">
								<div className="bg-green-50 border border-green-200 rounded-lg p-4">
									<UserCheck className="h-6 w-6 text-green-600 mb-2" />
									<h3 className="font-semibold text-green-900 mb-2">
										Communication
									</h3>
									<p className="text-green-800 text-sm">
										To respond to your inquiries and provide
										customer support
									</p>
								</div>
								<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
									<Lock className="h-6 w-6 text-purple-600 mb-2" />
									<h3 className="font-semibold text-purple-900 mb-2">
										Security
									</h3>
									<p className="text-purple-800 text-sm">
										To protect our services and prevent
										fraudulent activities
									</p>
								</div>
							</div>

							<ul className="list-disc list-inside text-gray-700 space-y-2">
								<li>
									Provide, operate, and maintain our website
								</li>
								<li>
									Improve, personalize, and expand our website
								</li>
								<li>
									Understand and analyze how you use our
									website
								</li>
								<li>
									Develop new products, services, features,
									and functionality
								</li>
								<li>
									Send you technical notices and support
									messages
								</li>
							</ul>
						</section>

						{/* Data Sharing */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								4. Data Sharing and Disclosure
							</h2>
							<p className="text-gray-700 mb-4">
								We do not sell, trade, or otherwise transfer
								your personal information to third parties
								except in the following circumstances:
							</p>
							<ul className="list-disc list-inside text-gray-700 space-y-2">
								<li>With your explicit consent</li>
								<li>To comply with legal obligations</li>
								<li>
									To protect and defend our rights and
									property
								</li>
								<li>
									With service providers who assist in our
									operations
								</li>
								<li>
									In connection with a business transfer or
									merger
								</li>
							</ul>
						</section>

						{/* Data Security */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								5. Data Security
							</h2>
							<p className="text-gray-700 mb-4">
								We implement appropriate technical and
								organizational security measures designed to
								protect the security of any personal information
								we process. However, please also remember that
								we cannot guarantee that the internet itself is
								100% secure.
							</p>
							<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
								<p className="text-yellow-800 text-sm">
									<strong>Note:</strong> While we strive to
									use commercially acceptable means to protect
									your personal information, no method of
									transmission over the Internet or method of
									electronic storage is 100% secure.
								</p>
							</div>
						</section>

						{/* Your Rights */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								6. Your Privacy Rights
							</h2>
							<p className="text-gray-700 mb-4">
								Depending on your location, you may have the
								following rights regarding your personal
								information:
							</p>
							<ul className="list-disc list-inside text-gray-700 space-y-2">
								<li>
									Access and receive a copy of your personal
									data
								</li>
								<li>Rectify or update your personal data</li>
								<li>Delete your personal data</li>
								<li>
									Restrict or object to our processing of your
									personal data
								</li>
								<li>Data portability</li>
								<li>Withdraw consent at any time</li>
							</ul>
						</section>

						{/* Cookies */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								7. Cookies and Tracking Technologies
							</h2>
							<p className="text-gray-700 mb-4">
								We may use cookies and similar tracking
								technologies to access or store information. You
								can instruct your browser to refuse all cookies
								or to indicate when a cookie is being sent.
							</p>
						</section>

						{/* Third-Party Links */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								8. Third-Party Websites
							</h2>
							<p className="text-gray-700">
								Our website may contain links to other websites
								that are not operated by us. We strongly advise
								you to review the Privacy Policy of every site
								you visit. We have no control over and assume no
								responsibility for the content, privacy
								policies, or practices of any third-party sites
								or services.
							</p>
						</section>

						{/* Policy Updates */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								9. Policy Updates
							</h2>
							<p className="text-gray-700 mb-4">
								We may update this Privacy Policy from time to
								time. We will notify you of any changes by
								posting the new Privacy Policy on this page and
								updating the "Last updated" date.
							</p>
							<p className="text-gray-700">
								You are advised to review this Privacy Policy
								periodically for any changes. Changes to this
								Privacy Policy are effective when they are
								posted on this page.
							</p>
						</section>

						{/* Contact */}
						<section>
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								10. Contact Us
							</h2>
							<p className="text-gray-700 mb-4">
								If you have any questions about this Privacy
								Policy, please contact us at:
							</p>
							<div className="bg-gray-50 rounded-lg p-4">
								<p className="text-gray-700">
									<strong>Email:</strong>{" "}
									privacy@lesliepaul.dev
									<br />
									<strong>Address:</strong> [Your Business
									Address]
									<br />
									<strong>Response Time:</strong> We aim to
									respond within 48 hours
								</p>
							</div>
						</section>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
