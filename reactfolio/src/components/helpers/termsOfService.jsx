import React from "react";
import {
	FileText,
	Scale,
	AlertTriangle,
	BookOpen,
	Users,
	Globe,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function TermsOfService() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12">
						<div className="flex justify-center mb-4">
							<div className="bg-blue-100 p-3 rounded-full">
								<Scale className="h-8 w-8 text-blue-600" />
							</div>
						</div>
						<h1 className="text-4xl font-bold text-gray-900 mb-4">
							Terms of Service
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
						{/* Important Notice */}
						<div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
							<div className="flex items-start gap-3">
								<AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
								<div>
									<h3 className="font-bold text-red-900 text-lg mb-2">
										Important Legal Notice
									</h3>
									<p className="text-red-800">
										Please read these Terms of Service
										carefully before using our website. By
										accessing or using our service, you
										agree to be bound by these terms. If you
										disagree with any part of the terms, you
										may not access our service.
									</p>
								</div>
							</div>
						</div>

						{/* Agreement */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								1. Agreement to Terms
							</h2>
							<p className="text-gray-700">
								By accessing and using Leslie Paul's Portfolio
								website (the "Service"), you accept and agree to
								be bound by the terms and provision of this
								agreement. In addition, when using this Service,
								you shall be subject to any posted guidelines or
								rules applicable to this Service.
							</p>
						</section>

						{/* Intellectual Property */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								2. Intellectual Property
							</h2>

							<div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4">
								<div className="flex items-start gap-3">
									<FileText className="h-5 w-5 text-purple-600 mt-0.5" />
									<div>
										<h3 className="font-semibold text-purple-900 mb-2">
											Ownership Rights
										</h3>
										<p className="text-purple-800">
											The Service and its original
											content, features, and functionality
											are and will remain the exclusive
											property of Leslie Paul and its
											licensors. The Service is protected
											by copyright, trademark, and other
											laws of both the Ghana and foreign
											countries.
										</p>
									</div>
								</div>
							</div>

							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								A. Permitted Use
							</h3>
							<ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
								<li>
									View and display the content on your
									personal devices
								</li>
								<li>
									Share links to our content via social media
								</li>
								<li>
									Use contact information for legitimate
									business inquiries
								</li>
							</ul>

							<h3 className="text-xl font-semibold text-gray-800 mb-3">
								B. Prohibited Use
							</h3>
							<ul className="list-disc list-inside text-gray-700 space-y-2">
								<li>
									Copy, modify, or create derivative works of
									the content
								</li>
								<li>
									Use the content for commercial purposes
									without permission
								</li>
								<li>
									Attempt to reverse engineer any software on
									the Service
								</li>
								<li>
									Use the Service in any way that could
									damage, disable, or impair the Service
								</li>
							</ul>
						</section>

						{/* User Accounts */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								3. User Accounts
							</h2>
							<p className="text-gray-700 mb-4">
								When you create an account with us, you must
								provide information that is accurate, complete,
								and current at all times. Failure to do so
								constitutes a breach of the Terms.
							</p>

							<div className="grid md:grid-cols-2 gap-6">
								<div className="bg-green-50 border border-green-200 rounded-lg p-4">
									<Users className="h-6 w-6 text-green-600 mb-2" />
									<h3 className="font-semibold text-green-900 mb-2">
										Your Responsibilities
									</h3>
									<ul className="text-green-800 text-sm space-y-1">
										<li>• Keep your password secure</li>
										<li>
											• Notify us of security breaches
										</li>
										<li>
											• Use account for intended purposes
										</li>
									</ul>
								</div>
								<div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
									<AlertTriangle className="h-6 w-6 text-orange-600 mb-2" />
									<h3 className="font-semibold text-orange-900 mb-2">
										Account Termination
									</h3>
									<ul className="text-orange-800 text-sm space-y-1">
										<li>• We may terminate accounts</li>
										<li>• For violation of terms</li>
										<li>• At our sole discretion</li>
									</ul>
								</div>
							</div>
						</section>

						{/* Links to Other Websites */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								4. Links to Other Websites
							</h2>
							<p className="text-gray-700">
								Our Service may contain links to third-party
								websites or services that are not owned or
								controlled by Leslie Paul. We have no control
								over, and assume no responsibility for, the
								content, privacy policies, or practices of any
								third-party websites or services.
							</p>
						</section>

						{/* Termination */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								5. Termination
							</h2>
							<p className="text-gray-700">
								We may terminate or suspend your account
								immediately, without prior notice or liability,
								for any reason whatsoever, including without
								limitation if you breach the Terms. Upon
								termination, your right to use the Service will
								immediately cease.
							</p>
						</section>

						{/* Limitation of Liability */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								6. Limitation of Liability
							</h2>

							<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
								<div className="flex items-start gap-3">
									<AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
									<div>
										<h3 className="font-semibold text-yellow-900 mb-2">
											Important Disclaimer
										</h3>
										<p className="text-yellow-800">
											In no event shall Leslie Paul, nor
											its directors, employees, partners,
											agents, suppliers, or affiliates, be
											liable for any indirect, incidental,
											special, consequential or punitive
											damages, including without
											limitation, loss of profits, data,
											use, goodwill, or other intangible
											losses.
										</p>
									</div>
								</div>
							</div>

							<p className="text-gray-700">
								Your use of the Service is at your sole risk.
								The Service is provided on an "AS IS" and "AS
								AVAILABLE" basis. The Service is provided
								without warranties of any kind, whether express
								or implied.
							</p>
						</section>

						{/* Governing Law */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								7. Governing Law
							</h2>
							<div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
								<Globe className="h-6 w-6 text-blue-600 mt-0.5" />
								<div>
									<p className="text-blue-800">
										These Terms shall be governed and
										construed in accordance with the laws of
										Ghana, without regard to its conflict of
										law provisions. Our failure to enforce
										any right or provision of these Terms
										will not be considered a waiver of those
										rights.
									</p>
								</div>
							</div>
						</section>

						{/* Changes to Terms */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								8. Changes to Terms
							</h2>
							<p className="text-gray-700 mb-4">
								We reserve the right, at our sole discretion, to
								modify or replace these Terms at any time. If a
								revision is material, we will provide at least
								30 days' notice prior to any new terms taking
								effect.
							</p>
							<p className="text-gray-700">
								By continuing to access or use our Service after
								those revisions become effective, you agree to
								be bound by the revised terms.
							</p>
						</section>

						{/* Contact Information */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								9. Contact Information
							</h2>
							<p className="text-gray-700 mb-4">
								If you have any questions about these Terms,
								please contact us:
							</p>
							<div className="bg-gray-50 rounded-lg p-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<h3 className="font-semibold text-gray-900 mb-2">
											Legal Contact
										</h3>
										<p className="text-gray-700">
											Email: legal@lesliepaul.dev
											<br />
											Response Time: 2-3 business days
										</p>
									</div>
									<div>
										<h3 className="font-semibold text-gray-900 mb-2">
											General Inquiries
										</h3>
										<p className="text-gray-700">
											Email: hello@lesliepaul.dev
											<br />
											Response Time: 24-48 hours
										</p>
									</div>
								</div>
							</div>
						</section>

						{/* Severability */}
						<section className="mb-8">
							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								10. Severability
							</h2>
							<p className="text-gray-700">
								If any provision of these Terms is held to be
								invalid or unenforceable by a court, the
								remaining provisions of these Terms will remain
								in effect. These Terms constitute the entire
								agreement between us regarding our Service.
							</p>
						</section>

						{/* Acknowledgment */}
						<section>
							<div className="bg-green-50 border border-green-200 rounded-lg p-6">
								<div className="flex items-start gap-3">
									<BookOpen className="h-6 w-6 text-green-600 mt-0.5" />
									<div>
										<h3 className="font-semibold text-green-900 mb-2">
											Your Acknowledgment
										</h3>
										<p className="text-green-800">
											By using our Service, you
											acknowledge that you have read these
											Terms of Service and agree to be
											bound by them. If you do not agree
											to these Terms, please do not use
											our Service.
										</p>
									</div>
								</div>
							</div>
						</section>
					</div>

					{/* Footer Note */}
					<div className="text-center mt-8">
						<p className="text-gray-500 text-sm">
							This document was last updated on{" "}
							{new Date().toLocaleDateString()}.<br />
							For previous versions, please contact us directly.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
