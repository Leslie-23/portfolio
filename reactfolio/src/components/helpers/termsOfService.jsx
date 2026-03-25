import React from "react";
import { Scale } from "lucide-react";
import PageLayout from "../PageLayout";

export default function TermsOfService() {
	const sections = [
		{ title: "1. Acceptance of Terms", content: "By accessing and using this website (lesliepaul.me), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the website." },
		{ title: "2. Use of Website", content: "This portfolio website is provided for informational purposes to showcase the work and skills of Leslie Paul Ajayi. You agree to use the website only for lawful purposes and in a way that does not infringe upon the rights of others." },
		{ title: "3. Intellectual Property", content: "All content on this website — including but not limited to text, code, designs, images, and graphics — is the property of Leslie Paul Ajayi unless otherwise stated. You may not reproduce, distribute, or use any content without prior written permission." },
		{ title: "4. Contact Form", content: "When using the contact form, you agree to provide accurate and truthful information. We reserve the right to decline any inquiry. Messages sent through the form are subject to our Privacy Policy." },
		{ title: "5. Third-Party Links", content: "This website may contain links to external sites (GitHub, LinkedIn, live project demos). We are not responsible for the content or practices of these third-party sites." },
		{ title: "6. Disclaimers", content: "This website is provided 'as is' without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any content. Project demos linked from this site may be under active development." },
		{ title: "7. Limitation of Liability", content: "Leslie Paul Ajayi shall not be liable for any damages arising from your use of or inability to use this website or any linked resources." },
		{ title: "8. Changes to Terms", content: "We reserve the right to modify these terms at any time. Changes are effective immediately upon posting. Continued use of the site constitutes acceptance of modified terms." },
		{ title: "9. Contact", content: "For questions regarding these terms, contact leslieajayi27@gmail.com." },
	];

	return (
		<PageLayout>
			<section className="py-20 md:py-28 px-6 md:px-12">
				<div className="max-w-3xl mx-auto">
					<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-4">// LEGAL</div>
					<div className="flex items-center gap-3 mb-2">
						<Scale size={20} className="text-green-400" />
						<h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight" style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}>
							Terms of Service
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
