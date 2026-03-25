import React, { useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PersonalStats = () => {
	const navigate = useNavigate();
	const [showPopup, setShowPopup] = useState(false);

	return (
		<div className="flex flex-wrap items-center bg-surface justify-center gap-8 pt-4 pb-4 transition-colors duration-300">
			<div className="text-center">
				<p className="text-5xl font-bold text-heading font-heading">
					50+
				</p>
				<p className="text-sm text-muted">
					Projects Completed{" "}
					<ExternalLink
						className="inline cursor-pointer"
						size={16}
						color="currentColor"
						onClick={() => navigate("/projects-completed")}
						aria-label="View completed projects"
					/>
				</p>
			</div>
			<div className="text-center">
				<p className="text-5xl font-bold text-heading font-heading">
					30+
				</p>
				<p className="text-sm text-muted">
					Happy Clients{" "}
					<ExternalLink
						className="inline cursor-pointer"
						size={16}
						color="currentColor"
						onClick={() => navigate("/testimonials")}
						aria-label="View testimonials"
					/>
				</p>
			</div>
			<div className="text-center">
				<p className="text-5xl font-bold text-heading font-heading">
					2+
				</p>
				<p className="text-sm text-muted">Countries served</p>
			</div>
			<div className="text-center">
				<p className="text-5xl font-bold text-heading font-heading">
					5+
				</p>
				<p className="text-sm text-muted">
					Years Experience{" "}
					<Info
						className="inline cursor-pointer"
						size={16}
						color="currentColor"
						onClick={() => setShowPopup(true)}
						aria-label="More info about experience"
					/>
				</p>
				{showPopup && (
					<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
						<div className="bg-card rounded-lg p-6 max-w-sm mx-4 shadow-xl border border-border">
							<h3 className="font-semibold text-lg mb-2 text-heading">
								Experience Level
							</h3>
							<p className="text-sm text-body">
								This represents the number of years I've been
								professionally working with these technologies.
								Some skills have been used for the full
								duration, while others were adopted more
								recently.
							</p>
							<button
								onClick={() => setShowPopup(false)}
								className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
							>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
