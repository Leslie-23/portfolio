import React, { useState, useEffect } from "react";
import { Cookie, Settings, Shield, X } from "lucide-react";

export default function CookieConsent() {
	const [showBanner, setShowBanner] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [preferences, setPreferences] = useState({
		necessary: true, // Always enabled, cannot be disabled
		analytics: false,
		performance: false,
		marketing: false,
	});

	// Check if user has already made a choice
	useEffect(() => {
		const hasConsent = localStorage.getItem("cookieConsent");
		if (!hasConsent) {
			// Show banner after a short delay
			const timer = setTimeout(() => {
				setShowBanner(true);
			}, 1000);
			return () => clearTimeout(timer);
		} else {
			// Apply saved preferences
			const savedPrefs = JSON.parse(hasConsent);
			setPreferences(savedPrefs);
			applyCookiePreferences(savedPrefs);
		}
	}, []);

	const applyCookiePreferences = (prefs) => {
		// This is where you'd initialize/disable third-party services
		// based on user preferences

		// Example: Initialize analytics only if analytics is true
		if (prefs.analytics) {
			// Initialize Google Analytics
			console.log("Analytics cookies enabled");
		}

		if (prefs.performance) {
			console.log("Performance cookies enabled");
		}

		if (prefs.marketing) {
			console.log("Marketing cookies enabled");
		}
	};

	const handleAcceptAll = () => {
		const allAccepted = {
			necessary: true,
			analytics: true,
			performance: true,
			marketing: true,
		};

		setPreferences(allAccepted);
		localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
		applyCookiePreferences(allAccepted);
		setShowBanner(false);
	};

	const handleAcceptSelected = () => {
		localStorage.setItem("cookieConsent", JSON.stringify(preferences));
		applyCookiePreferences(preferences);
		setShowBanner(false);
		setShowSettings(false);
	};

	const handleRejectAll = () => {
		const onlyNecessary = {
			necessary: true, // These cannot be rejected
			analytics: false,
			performance: false,
			marketing: false,
		};

		setPreferences(onlyNecessary);
		localStorage.setItem("cookieConsent", JSON.stringify(onlyNecessary));
		applyCookiePreferences(onlyNecessary);
		setShowBanner(false);
	};

	const togglePreference = (type) => {
		if (type === "necessary") return; // Cannot disable necessary cookies

		setPreferences((prev) => ({
			...prev,
			[type]: !prev[type],
		}));
	};

	// Banner Component
	if (showBanner && !showSettings) {
		return (
			<div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in-up">
				<div className="max-w-7xl mx-auto px-4 pb-4">
					<div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6">
						<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
							<div className="flex-1">
								<div className="flex items-center gap-3 mb-3">
									<div className="bg-blue-100 p-2 rounded-lg">
										<Cookie className="h-5 w-5 text-blue-600" />
									</div>
									<h3 className="text-lg font-semibold text-gray-900">
										We Value Your Privacy
									</h3>
								</div>
								<p className="text-gray-600 text-sm">
									We use cookies to enhance your browsing
									experience, analyze site traffic, and
									personalize content. By clicking "Accept
									All", you consent to our use of cookies. You
									can manage your preferences in Cookie
									Settings.
								</p>
								<a
									href="/privacy-policy"
									className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-block mt-2"
								>
									Read our Privacy Policy
								</a>
							</div>

							<div className="flex flex-wrap gap-3">
								<button
									onClick={() => setShowSettings(true)}
									className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
								>
									<Settings className="h-4 w-4 inline-block mr-2" />
									Settings
								</button>
								<button
									onClick={handleRejectAll}
									className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
								>
									Reject All
								</button>
								<button
									onClick={handleAcceptAll}
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
								>
									Accept All
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	// Settings Modal
	if (showSettings) {
		return (
			<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black bg-opacity-50">
				<div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
					{/* Header */}
					<div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="bg-blue-100 p-2 rounded-lg">
									<Settings className="h-6 w-6 text-blue-600" />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-gray-900">
										Cookie Settings
									</h2>
									<p className="text-gray-600 text-sm">
										Manage your cookie preferences
									</p>
								</div>
							</div>
							<button
								onClick={() => setShowSettings(false)}
								className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
							>
								<X className="h-5 w-5 text-gray-500" />
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="p-6">
						<div className="mb-6">
							<div className="flex items-center gap-2 mb-4">
								<Shield className="h-5 w-5 text-green-600" />
								<h3 className="text-lg font-semibold text-gray-900">
									Your Privacy Choices
								</h3>
							</div>
							<p className="text-gray-600 mb-6">
								You can set your preferences for how this
								website uses cookies. Some cookies are necessary
								for the website to function and cannot be
								disabled.
							</p>

							{/* Necessary Cookies */}
							<div className="mb-4 p-4 border border-gray-200 rounded-lg">
								<div className="flex items-center justify-between mb-2">
									<div>
										<h4 className="font-semibold text-gray-900">
											Strictly Necessary Cookies
										</h4>
										<p className="text-sm text-gray-600">
											Required for basic site
											functionality
										</p>
									</div>
									<div className="relative">
										<input
											type="checkbox"
											checked={preferences.necessary}
											disabled
											className="sr-only"
										/>
										<div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
											<div className="w-4 h-4 bg-white rounded-full"></div>
										</div>
									</div>
								</div>
								<p className="text-xs text-gray-500">
									These cookies are essential for the website
									to function properly. They enable basic
									features like page navigation and access to
									secure areas.
								</p>
							</div>

							{/* Analytics Cookies */}
							<div className="mb-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
								<div className="flex items-center justify-between mb-2">
									<div>
										<h4 className="font-semibold text-gray-900">
											Analytics Cookies
										</h4>
										<p className="text-sm text-gray-600">
											Help us understand how visitors use
											our site
										</p>
									</div>
									<button
										onClick={() =>
											togglePreference("analytics")
										}
										className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
											preferences.analytics
												? "bg-blue-600"
												: "bg-gray-300"
										}`}
									>
										<span
											className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
												preferences.analytics
													? "translate-x-7"
													: "translate-x-1"
											}`}
										/>
									</button>
								</div>
								<p className="text-xs text-gray-500">
									These cookies allow us to count visits and
									traffic sources so we can measure and
									improve the performance of our site.
								</p>
							</div>

							{/* Performance Cookies */}
							<div className="mb-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
								<div className="flex items-center justify-between mb-2">
									<div>
										<h4 className="font-semibold text-gray-900">
											Performance Cookies
										</h4>
										<p className="text-sm text-gray-600">
											Enhance site performance and speed
										</p>
									</div>
									<button
										onClick={() =>
											togglePreference("performance")
										}
										className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
											preferences.performance
												? "bg-blue-600"
												: "bg-gray-300"
										}`}
									>
										<span
											className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
												preferences.performance
													? "translate-x-7"
													: "translate-x-1"
											}`}
										/>
									</button>
								</div>
								<p className="text-xs text-gray-500">
									These cookies help us deliver better user
									experiences by remembering your preferences.
								</p>
							</div>

							{/* Marketing Cookies */}
							<div className="mb-6 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
								<div className="flex items-center justify-between mb-2">
									<div>
										<h4 className="font-semibold text-gray-900">
											Marketing Cookies
										</h4>
										<p className="text-sm text-gray-600">
											Used to deliver relevant ads
										</p>
									</div>
									<button
										onClick={() =>
											togglePreference("marketing")
										}
										className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
											preferences.marketing
												? "bg-blue-600"
												: "bg-gray-300"
										}`}
									>
										<span
											className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
												preferences.marketing
													? "translate-x-7"
													: "translate-x-1"
											}`}
										/>
									</button>
								</div>
								<p className="text-xs text-gray-500">
									These cookies may be set through our site by
									our advertising partners to build a profile
									of your interests.
								</p>
							</div>
						</div>

						{/* Footer */}
						<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-6 -mb-6 rounded-b-2xl">
							<div className="flex flex-col sm:flex-row gap-3">
								<button
									onClick={handleRejectAll}
									className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex-1"
								>
									Reject All
								</button>
								<button
									onClick={handleAcceptSelected}
									className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex-1"
								>
									Save Preferences
								</button>
							</div>
							<p className="text-xs text-gray-500 text-center mt-4">
								You can change these settings at any time by
								clicking the "Cookie Settings" link in the
								footer.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
}
