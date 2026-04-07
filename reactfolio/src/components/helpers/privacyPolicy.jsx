import React from "react";
import { Shield } from "lucide-react";
import PageLayout from "../PageLayout";

export default function PrivacyPolicy() {
	const sections = [
		{ title: "1. Introduction", content: "Welcome to Leslie Paul's Portfolio. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our portfolio website. By accessing or using our website, you agree to our collection and use of your personal information as described here." },
		{ title: "2. Information We Collect", content: "We collect personal information that you voluntarily provide (name, email, phone via the contact form) and automatically collected data (IP address, browser type, pages visited, device information, referring sites)." },
		{ title: "3. How We Use Your Information", content: "We use collected information to: respond to your inquiries, provide customer support, improve and personalize the website, analyze usage patterns, develop new features, and send technical notices." },
		{ title: "4. Data Sharing", content: "We do not sell or trade your personal information. We may share data only with your explicit consent, to comply with legal obligations, to protect our rights, with service providers who assist our operations, or in connection with a business transfer." },
		{ title: "5. Data Security", content: "We implement appropriate technical and organizational security measures. However, no method of internet transmission or electronic storage is 100% secure." },
		{ title: "6. Your Privacy Rights", content: "Depending on your location, you may: access and receive a copy of your data, rectify or update your data, request deletion, restrict or object to processing, request data portability, and withdraw consent at any time." },
		{ title: "7. Cookies", content: "We may use cookies and similar tracking technologies. You can instruct your browser to refuse cookies or indicate when one is being sent." },
		{ title: "8. Third-Party Links", content: "Our website may contain links to external sites. We have no control over and assume no responsibility for their content or privacy practices." },
		{ title: "9. Updates", content: "We may update this policy periodically. Changes are effective when posted on this page. Review regularly for any updates." },
		{ title: "10. Contact", content: "Questions about this policy? Email hello@lesliepaul.me. We aim to respond within 48 hours." },
	];

	return (
		<PageLayout>
			<section className="py-20 md:py-28 px-6 md:px-12">
				<div className="max-w-3xl mx-auto">
					<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-4">// LEGAL</div>
					<div className="flex items-center gap-3 mb-2">
						<Shield size={20} className="text-green-400" />
						<h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}>
							Privacy Policy
						</h1>
					</div>
					<p className="text-white/30 text-sm font-mono mb-12">
						last_updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
					</p>

					<div className="space-y-8">
						{sections.map((section) => (
							<div key={section.title} className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
								<h2 className="text-white font-semibold text-sm mb-3">{section.title}</h2>
								<p className="text-white/40 text-sm leading-relaxed">{section.content}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</PageLayout>
	);
}
