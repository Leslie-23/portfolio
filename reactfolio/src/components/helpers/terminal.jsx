import React, { useState, useEffect, useRef } from "react";
import "../globals.css";

const TerminalModal = ({ isOpen, onClose, userOS }) => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState([]);
	const [currentDir, setCurrentDir] = useState("~");
	const inputRef = useRef(null);
	const terminalRef = useRef(null);

	// Website structure simulation
	const websiteStructure = {
		"~": ["about", "projects", "skills", "contact", "resume"],
		about: ["bio.txt", "experience.md"],
		projects: ["web-apps", "mobile-apps", "open-source"],
		skills: ["frontend.md", "backend.md", "devops.md"],
		contact: ["email.txt", "socials.md"],
		"web-apps": ["ecommerce", "dashboard", "portfolio"],
		"mobile-apps": ["react-native", "flutter"],
		"open-source": ["github-repos.md"],
	};

	// Command definitions
	const commands = {
		help: () => `Available commands:
- help: Show this help message
- ls, dir: List directory contents
- cd <directory>: Change directory
- pwd: Show current directory
- whoami: Show user info
- clear: Clear terminal
- cat <file>: Display file contents
- echo <text>: Print text
- date: Show current date
- exit, close: Close terminal`,

		ls: () => {
			const dir = currentDir === "~" ? "~" : currentDir.split("/").pop();
			const files = websiteStructure[dir] || [];
			return files.join("  ");
		},

		dir: () => commands.ls(),

		cd: (args) => {
			if (!args) return "cd: missing argument";

			const targetDir = args[0];

			if (targetDir === "..") {
				if (currentDir === "~") return "Already at root directory";
				const pathParts = currentDir.split("/");
				pathParts.pop();
				setCurrentDir(
					pathParts.length === 1 ? "~" : pathParts.join("/")
				);
				return "";
			}

			if (targetDir === "~") {
				setCurrentDir("~");
				return "";
			}

			const currentDirKey =
				currentDir === "~" ? "~" : currentDir.split("/").pop();
			const availableDirs = websiteStructure[currentDirKey] || [];

			if (availableDirs.includes(targetDir)) {
				setCurrentDir(
					currentDir === "~"
						? targetDir
						: `${currentDir}/${targetDir}`
				);
				return "";
			} else {
				return `cd: ${targetDir}: No such directory`;
			}
		},

		pwd: () => currentDir,

		whoami: () => `visitor@lesliepaul.me`,

		clear: () => {
			setOutput([]);
			return "";
		},

		cat: (args) => {
			if (!args) return "cat: missing file argument";

			const file = args[0];
			const fileContents = {
				"bio.txt": `Leslie Paul Ajayi
Senior Full-Stack Developer
Specializing in MERN stack, TypeScript, and cloud technologies.
Passionate about building scalable web applications.`,

				"experience.md": `## Professional Experience
- Senior Full-Stack Developer (Current)
- 5+ years in web development
- Expertise in React, Node.js, MongoDB
- Cloud deployment (AWS, Docker)`,

				"frontend.md": `## Frontend Skills
- React.js & Next.js
- TypeScript
- Tailwind CSS
- Redux & Context API
- Responsive Design`,

				"backend.md": `## Backend Skills
- Node.js & Express
- MongoDB & PostgreSQL
- RESTful APIs & GraphQL
- Authentication & Security
- Microservices Architecture`,

				"devops.md": `## DevOps Skills
- Docker & Containerization
- AWS & Cloud Services
- CI/CD Pipelines
- Nginx & Load Balancing
- Monitoring & Logging`,

				"email.txt": `lesliepaulajayi@gmail.com`,

				"socials.md": `## Connect with me
- GitHub: github.com/leslie-23
- LinkedIn: linkedin.com/in/lesliepaulajayi
- Twitter: @i_am.leslie`,

				"github-repos.md": `## Open Source Contributions
- Various React components
- Node.js utilities
- Developer tools
- Community projects`,
			};

			return fileContents[file] || `cat: ${file}: No such file`;
		},

		echo: (args) => (args ? args.join(" ") : ""),

		date: () => new Date().toLocaleString(),

		exit: () => {
			onClose();
			return "";
		},

		close: () => commands.exit(),
	};

	const executeCommand = (cmd) => {
		const [command, ...args] = cmd.trim().split(" ");
		const output = [];

		// Add command to output
		output.push({
			type: "command",
			text: `visitor@lesliepaul.me:~${
				currentDir === "~" ? "" : "/" + currentDir
			}$ ${cmd}`,
		});

		if (commands[command]) {
			const result = commands[command](args);
			if (result) {
				output.push({ type: "output", text: result });
			}
		} else if (command) {
			output.push({
				type: "error",
				text: `command not found: ${command}. Type 'help' for available commands.`,
			});
		}

		setOutput((prev) => [...prev, ...output]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.trim()) {
			executeCommand(input);
			setInput("");
		}
	};

	const handleKeyDown = (e) => {
		if (e.ctrlKey && e.key === "l") {
			e.preventDefault();
			commands.clear();
		}
	};

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
	}, [output]);

	// Initial welcome message
	useEffect(() => {
		if (isOpen && output.length === 0) {
			setOutput([
				{
					type: "output",
					text: "Welcome to Leslie Paul's Interactive Terminal!",
				},
				{
					type: "output",
					text: 'Type "help" to see available commands.',
				},
				{
					type: "output",
					text: "Explore the website structure using cd, ls, and cat commands.",
				},
			]);
		}
	}, [isOpen, output.length]);

	if (!isOpen) return null;

	return (
		<div className="terminal-modal-overlay" onClick={onClose}>
			<div
				className="terminal-modal"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="terminal-header">
					<div className="terminal-controls">
						<div className="control close"></div>
						<div className="control minimize"></div>
						<div className="control maximize"></div>
					</div>
					<div className="terminal-title">
						visitor@lesliepaul.me — Terminal
					</div>
					<button className="close-button" onClick={onClose}>
						×
					</button>
				</div>

				<div className="terminal-body" ref={terminalRef}>
					<div className="terminal-output">
						{output.map((line, index) => (
							<div
								key={index}
								className={`terminal-line ${line.type}`}
							>
								{line.text}
							</div>
						))}
					</div>

					<form
						onSubmit={handleSubmit}
						className="terminal-input-form"
					>
						<span className="prompt">
							visitor@lesliepaul.me:~
							{currentDir === "~" ? "" : "/" + currentDir}$
						</span>
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							className="terminal-input"
							autoFocus
							spellCheck="false"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

// Hook to use the terminal modal
export const useTerminal = () => {
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);

	const openTerminal = () => setIsTerminalOpen(true);
	const closeTerminal = () => setIsTerminalOpen(false);

	const Terminal = () => (
		<TerminalModal
			isOpen={isTerminalOpen}
			onClose={closeTerminal}
			userOS={
				typeof window !== "undefined"
					? window.navigator.platform
					: "unknown"
			}
		/>
	);

	return { openTerminal, closeTerminal, Terminal, isTerminalOpen };
};

export default TerminalModal;
