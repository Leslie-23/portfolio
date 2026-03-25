import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Terminal, Search, Mail, User, ArrowRight } from "lucide-react";

const NotFound = () => {
	const navigate = useNavigate();
	const [typedPath, setTypedPath] = useState("");
	const path = typeof window !== "undefined" ? window.location.pathname : "/unknown";

	useEffect(() => {
		let i = 0;
		const interval = setInterval(() => {
			setTypedPath(path.substring(0, i + 1));
			i++;
			if (i >= path.length) clearInterval(interval);
		}, 50);
		return () => clearInterval(interval);
	}, [path]);

	return (
		<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-lg w-full">
				{/* Terminal */}
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
					className="mb-10"
				>
					<div className="rounded-lg border border-white/10 bg-white/[0.02] overflow-hidden">
						{/* Terminal header */}
						<div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
							<div className="w-3 h-3 rounded-full bg-red-500/80" />
							<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
							<div className="w-3 h-3 rounded-full bg-green-500/80" />
							<span className="text-[10px] text-white/20 ml-2 font-mono">bash — 80x24</span>
						</div>

						{/* Terminal body */}
						<div className="p-5 font-mono text-sm space-y-2">
							<p>
								<span className="text-green-400">leslie@dev</span>
								<span className="text-white/30">:</span>
								<span className="text-blue-400">~</span>
								<span className="text-white/30">$ </span>
								<span className="text-white/70">cd {typedPath}</span>
								<span className="animate-pulse text-green-400">|</span>
							</p>
							<p className="text-red-400/80">
								bash: cd: {path}: No such file or directory
							</p>
							<p>
								<span className="text-green-400">leslie@dev</span>
								<span className="text-white/30">:</span>
								<span className="text-blue-400">~</span>
								<span className="text-white/30">$ </span>
								<span className="text-white/40">echo $?</span>
							</p>
							<p className="text-white/50">404</p>
							<p>
								<span className="text-green-400">leslie@dev</span>
								<span className="text-white/30">:</span>
								<span className="text-blue-400">~</span>
								<span className="text-white/30">$ </span>
								<span className="animate-pulse text-green-400">_</span>
							</p>
						</div>
					</div>
				</motion.div>

				{/* Message */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.5 }}
					className="text-center mb-10"
				>
					<h1
						className="text-6xl font-bold text-white mb-3"
						style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
					>
						<span className="text-green-400">4</span>0<span className="text-green-400">4</span>
					</h1>
					<p className="text-white/40 text-sm font-mono">
						The route you requested doesn't exist.
					</p>
				</motion.div>

				{/* Actions */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}
					className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
				>
					<button
						onClick={() => navigate(-1)}
						className="flex items-center justify-center gap-2 px-6 py-2.5 border border-white/10 text-white/50 font-mono text-xs tracking-wider hover:border-white/30 hover:text-white/80 transition-all duration-300 rounded-sm"
					>
						<ArrowLeft size={14} />
						GO_BACK
					</button>
					<button
						onClick={() => navigate("/")}
						className="group flex items-center justify-center gap-2 px-6 py-2.5 bg-green-500/10 border border-green-400/30 text-green-400 font-mono text-xs tracking-wider hover:bg-green-500/20 hover:border-green-400/60 transition-all duration-300 rounded-sm"
					>
						<Home size={14} />
						GO_HOME
						<ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
					</button>
				</motion.div>

				{/* Quick links */}
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.7, duration: 0.5 }}
					className="p-5 rounded-lg border border-white/5 bg-white/[0.02]"
				>
					<div className="font-mono text-xs text-white/30 tracking-wider mb-4">
						AVAILABLE_ROUTES
					</div>
					<div className="grid grid-cols-2 gap-2">
						{[
							{ label: "/projects", icon: Search, path: "/projects" },
							{ label: "/contact", icon: Mail, path: "/contact" },
							{ label: "/about", icon: User, path: "/about" },
							{ label: "/", icon: Home, path: "/" },
						].map((item) => (
							<button
								key={item.path}
								onClick={() => navigate(item.path)}
								className="flex items-center gap-2 p-3 text-white/30 hover:text-green-400 hover:bg-white/[0.03] rounded transition-all font-mono text-xs"
							>
								<item.icon size={13} />
								{item.label}
							</button>
						))}
					</div>
				</motion.div>

				{/* Help */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9, duration: 0.5 }}
					className="mt-6 text-center"
				>
					<p className="text-white/20 text-xs font-mono">
						Lost?{" "}
						<button
							onClick={() => navigate("/contact")}
							className="text-green-400/60 hover:text-green-400 transition-colors"
						>
							contact@leslie.dev
						</button>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default NotFound;
