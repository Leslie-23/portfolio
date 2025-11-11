import React, { useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const PersonalStats = () => {
	const navigate = useNavigate();
	const [showPopup, setShowPopup] = useState(false);

	return (
		<div className="flex align-center justify-center gap-8 pt-4 pb-4 z-1">
			<div>
				<p className="text-3xl font-bold text-foreground">50+</p>
				<p className="text-sm text-muted-foreground">
					Projects Completed{" "}
					<ExternalLink
						className="inline"
						size={16}
						color="green"
						onClick={() => navigate("/projects-completed")}
					/>
				</p>
			</div>
			<div>
				<p className="text-3xl font-bold text-foreground">30+</p>
				<p className="text-sm text-muted-foreground">
					Happy Clients{" "}
					<ExternalLink
						className="inline"
						size={16}
						color="green"
						onClick={() => navigate("/testimonials")}
					/>
				</p>
			</div>
			<div>
				<p className="text-3xl font-bold text-foreground">5+</p>
				<p className="text-sm text-muted-foreground">
					Years Experience{" "}
					<Info
						className="inline"
						color="green"
						size={16}
						onClick={() => setShowPopup(true)}
					/>
				</p>{" "}
				{/* Popup Component */}
				{showPopup && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 shadow-xl">
							<h3 className="font-semibold text-lg mb-2">
								Experience Level
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-300">
								This represents the number of years I've been
								professionally working with these technologies.
								Some skills have been used for the full
								duration, while others were adopted more
								recently.
							</p>
							<button
								onClick={() => setShowPopup(false)}
								className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700 transition-colors"
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
