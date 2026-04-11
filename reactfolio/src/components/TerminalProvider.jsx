import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";
import TerminalModal from "./helpers/terminal";

const TerminalContext = createContext(null);

export function TerminalProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const [userOS, setUserOS] = useState("Web");
	const navigate = useNavigate();

	useEffect(() => {
		if (typeof window === "undefined") return;
		const platform = window.navigator.platform || "";
		if (platform.includes("Win")) setUserOS("Windows");
		else if (platform.includes("Mac")) setUserOS("macOS");
		else if (platform.includes("Linux")) setUserOS("Linux");
		else setUserOS(platform || "Web");
	}, []);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((v) => !v), []);

	useEffect(() => {
		const handler = (e) => {
			const target = e.target;
			const isTyping =
				target &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.isContentEditable);

			if (e.key === "Escape" && isOpen) {
				e.preventDefault();
				close();
				return;
			}

			if (isTyping) return;

			if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
				e.preventDefault();
				toggle();
			}
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [isOpen, close, toggle]);

	const value = useMemo(
		() => ({ isOpen, openTerminal: open, closeTerminal: close, toggleTerminal: toggle }),
		[isOpen, open, close, toggle]
	);

	return (
		<TerminalContext.Provider value={value}>
			{children}
			<TerminalModal
				isOpen={isOpen}
				onClose={close}
				userOS={userOS}
				navigate={navigate}
			/>
		</TerminalContext.Provider>
	);
}

export function useTerminal() {
	const ctx = useContext(TerminalContext);
	if (!ctx) {
		return {
			isOpen: false,
			openTerminal: () => {},
			closeTerminal: () => {},
			toggleTerminal: () => {},
		};
	}
	return ctx;
}
