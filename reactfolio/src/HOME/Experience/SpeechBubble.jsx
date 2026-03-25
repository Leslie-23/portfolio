import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpeechBubble({ message, visible, position = "right" }) {
	return (
		<AnimatePresence>
			{visible && message && (
				<motion.div
					initial={{ opacity: 0, scale: 0.8, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8, y: -10 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className={`absolute z-30 pointer-events-none ${
						position === "right" ? "left-full ml-5" : "right-full mr-5"
					} top-1/2 -translate-y-1/2`}
				>
					<div className="relative bg-black/70 backdrop-blur-lg border border-green-400/20 rounded-xl px-5 py-3.5 min-w-[260px] max-w-[320px] shadow-lg shadow-green-400/5">
						{/* Arrow */}
						<div
							className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-black/70 border-green-400/20 rotate-45 ${
								position === "right"
									? "-left-[6px] border-l border-b"
									: "-right-[6px] border-r border-t"
							}`}
						/>
						<p className="text-white/90 text-sm leading-relaxed font-mono">
							{message}
						</p>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
