import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		// Log error to console in development
		if (process.env.NODE_ENV === "development") {
			console.error("ErrorBoundary caught:", error, errorInfo);
		}
	}

	handleReload = () => {
		window.location.reload();
	};

	handleGoHome = () => {
		window.location.href = "/";
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
					<div className="max-w-md w-full text-center">
						<div className="mb-8">
							<div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
								<svg
									className="w-10 h-10 text-red-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<h1 className="text-2xl font-bold text-gray-900 mb-2">
								Something went wrong
							</h1>
							<p className="text-gray-600 mb-6">
								An unexpected error occurred. Please try refreshing
								the page or go back to the homepage.
							</p>
						</div>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<button
								onClick={this.handleReload}
								className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
							>
								Refresh Page
							</button>
							<button
								onClick={this.handleGoHome}
								className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
							>
								Go to Homepage
							</button>
						</div>
						{process.env.NODE_ENV === "development" && this.state.error && (
							<details className="mt-8 text-left bg-gray-100 rounded-lg p-4">
								<summary className="cursor-pointer text-sm font-medium text-gray-700">
									Error Details (Development Only)
								</summary>
								<pre className="mt-2 text-xs text-red-600 overflow-auto">
									{this.state.error.toString()}
								</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
