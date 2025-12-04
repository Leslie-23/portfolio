import React, { useState, useEffect, useRef, useCallback } from "react";
import "../globals.css";

const TerminalModal = ({ isOpen, onClose, userOS }) => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState([]);
	const [currentDir, setCurrentDir] = useState("~");
	const [history, setHistory] = useState([]);
	const [historyIndex, setHistoryIndex] = useState(0);
	const [isTypingCommand, setIsTypingCommand] = useState(false);
	const inputRef = useRef(null);
	const terminalRef = useRef(null);

	// Extended website structure
	const websiteStructure = {
		"~": ["about/", "projects/", "skills/", "contact/", "resume.pdf"],
		"about/": ["bio.txt", "experience.md", "education.txt"],
		"projects/": ["web-apps/", "mobile-apps/", "open-source/", "clients/"],
		"skills/": ["frontend.md", "backend.md", "devops.md", "tools.md"],
		"contact/": ["email.txt", "socials.md", "location.txt"],
		"web-apps/": ["ecommerce/", "dashboard/", "portfolio/", "saas/"],
		"mobile-apps/": ["react-native/", "flutter/", "pwa/"],
		"open-source/": ["github.md", "contributions.md", "packages.md"],
		"ecommerce/": ["tech-stack.txt", "features.md", "demo.txt"],
		"dashboard/": ["admin-panel.md", "analytics.md"],
		"saas/": ["architecture.txt", "scaling.md"],
	};

	// File contents with more detail
	const fileContents = {
		"bio.txt": `Leslie Paul Ajayi
Senior Full-Stack Developer
Location: Accra, Ghana

Specializing in:
• MERN Stack (MongoDB, Express, React, Node.js)
• TypeScript & Next.js
• Cloud Architecture (AWS, Docker, Kubernetes)
• Microservices & REST APIs

With over 5 years of experience building scalable web applications,
I focus on clean code, performance optimization, and user-centric design.
Currently leading development teams and architecting enterprise solutions.`,

		"experience.md": `## Professional Experience

### Senior Full-Stack Developer (2021-Present)
• Led development of multiple SaaS platforms serving 50k+ users
• Architected microservices using Node.js and Docker
• Implemented CI/CD pipelines reducing deployment time by 70%
• Mentored 3 junior developers in React best practices

### Full-Stack Developer (2019-2021)
• Built e-commerce platforms processing $2M+ monthly
• Developed real-time chat applications using WebSockets
• Optimized database queries improving performance by 40%

### Frontend Developer (2018-2019)
• Created responsive UIs for various web applications
• Implemented design systems with Storybook
• Collaborated with UX designers to improve user flows`,

		"education.txt": `## Education

### Bachelor of Computer Science
University of Ghana (2014-2018)
• Graduated with First Class Honors
• Specialized in Software Engineering
• President of Developers Club

### Certifications
• AWS Certified Solutions Architect
• MongoDB Certified Developer
• React Advanced Patterns
• Docker and Kubernetes`,

		"frontend.md": `## Frontend Expertise

### Core Technologies
• React.js & Next.js (4+ years)
• TypeScript (3+ years)
• Redux, Context API, Zustand
• Tailwind CSS, Styled Components
• Jest, React Testing Library

### Advanced Skills
• Server-Side Rendering (SSR)
• Static Site Generation (SSG)
• Progressive Web Apps (PWA)
• Web Performance Optimization
• Accessibility (WCAG 2.1)`,
	};

	// Command execution with proper output formatting
	const executeCommand = useCallback(
		(cmd) => {
			const trimmedCmd = cmd.trim();
			if (!trimmedCmd) return;

			// Add to history
			setHistory((prev) => {
				const newHistory = [...prev];
				if (newHistory[newHistory.length - 1] !== trimmedCmd) {
					newHistory.push(trimmedCmd);
					if (newHistory.length > 50) newHistory.shift();
				}
				return newHistory;
			});
			setHistoryIndex(history.length + 1);

			const [command, ...args] = trimmedCmd.split(/\s+/);
			const outputLines = [];

			// Add command to output with prompt
			outputLines.push({
				type: "prompt",
				text: `visitor@lesliepaul.me:~${
					currentDir === "~" ? "" : "/" + currentDir
				}$`,
			});
			outputLines.push({ type: "command", text: cmd });

			// Execute command
			let result = "";
			let shouldClear = false;

			switch (command) {
				case "help":
				case "--help":
				case "-h":
					result = `Available commands:
  ls, dir               List directory contents
  cd <dir>              Change directory
  pwd                   Print working directory
  whoami                Display current user
  clear, cls            Clear terminal screen
  cat <file>            Display file contents
  echo <text>           Print text
  date                  Show current date/time
  history               Show command history
  find <pattern>        Search for files
  tree                  Show directory tree
  mkdir <name>          Create directory
  touch <file>          Create file
  rm <name>             Remove file/directory
  mv <src> <dest>       Move/rename file
  cp <src> <dest>       Copy file
  grep <pattern> <file> Search in file
  head <file>           Show first 10 lines
  tail <file>           Show last 10 lines
  wc <file>             Word count
  exit, quit            Close terminal
  help                  Show this help`;
					break;

				case "ls":
				case "dir":
					const dirKey =
						currentDir === "~"
							? "~"
							: currentDir.split("/").pop() + "/";
					const items = websiteStructure[dirKey] || [];

					// Format with colors and icons
					const formattedItems = items.map((item) => {
						if (item.endsWith("/")) return `📁 ${item}`;
						if (item.endsWith(".txt")) return `📄 ${item}`;
						if (item.endsWith(".md")) return `📝 ${item}`;
						if (item.endsWith(".pdf")) return `📕 ${item}`;
						return `📄 ${item}`;
					});

					result = formattedItems.join("\n");
					break;

				case "cd":
					if (!args[0]) {
						result = "Usage: cd <directory>";
						break;
					}

					const target = args[0];

					if (target === "..") {
						if (currentDir === "~") {
							result = "Already at root directory";
						} else {
							const pathParts = currentDir.split("/");
							pathParts.pop();
							setCurrentDir(
								pathParts.length === 1
									? "~"
									: pathParts.join("/")
							);
						}
						break;
					}

					if (target === "~" || target === "/") {
						setCurrentDir("~");
						break;
					}

					const currentDirKey =
						currentDir === "~"
							? "~"
							: currentDir.split("/").pop() + "/";
					const availableDirs = websiteStructure[currentDirKey] || [];

					// Handle both with and without trailing slash
					const dirToCheck = target.endsWith("/")
						? target
						: target + "/";
					const exists =
						availableDirs.includes(target) ||
						availableDirs.includes(dirToCheck);

					if (exists) {
						setCurrentDir(
							currentDir === "~"
								? target
								: `${currentDir}/${target}`
						);
					} else {
						result = `cd: ${target}: No such directory`;
					}
					break;

				case "pwd":
					result = currentDir;
					break;

				case "whoami":
					result = `visitor
Login: visitor@lesliepaul.me
Role: Website Explorer
Session: Interactive Terminal`;
					break;

				case "clear":
				case "cls":
					shouldClear = true;
					break;

				case "cat":
					if (!args[0]) {
						result = "Usage: cat <filename>";
						break;
					}
					result =
						fileContents[args[0]] ||
						`cat: ${args[0]}: No such file or directory`;
					break;

				case "echo":
					result = args.join(" ");
					break;

				case "date":
					result = new Date().toLocaleString("en-US", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						timeZoneName: "short",
					});
					break;

				case "history":
					result = history
						.map((cmd, idx) => `${idx + 1}  ${cmd}`)
						.join("\n");
					break;

				case "find":
					if (!args[0]) {
						result = "Usage: find <pattern>";
						break;
					}
					const pattern = args[0];
					const found = [];
					Object.entries(websiteStructure).forEach(([dir, files]) => {
						files.forEach((file) => {
							if (file.includes(pattern)) {
								found.push(
									`./${dir === "~" ? "" : dir}${file}`
								);
							}
						});
					});
					result =
						found.length > 0
							? found.join("\n")
							: `No files matching "${pattern}"`;
					break;

				case "tree":
					const buildTree = (
						dir,
						prefix = "",
						depth = 0,
						maxDepth = 3
					) => {
						if (depth > maxDepth) return "";
						const items =
							websiteStructure[dir + "/"] ||
							websiteStructure[dir] ||
							[];
						let tree = "";

						items.forEach((item, index) => {
							const isLast = index === items.length - 1;
							const currentPrefix =
								prefix + (isLast ? "└── " : "├── ");
							tree += currentPrefix + item + "\n";

							if (item.endsWith("/")) {
								const childDir =
									dir +
									(dir === "~" ? "" : "/") +
									item.slice(0, -1);
								tree += buildTree(
									childDir,
									prefix + (isLast ? "    " : "│   "),
									depth + 1,
									maxDepth
								);
							}
						});

						return tree;
					};
					result =
						".\n" +
						buildTree(
							currentDir === "~"
								? "~"
								: currentDir.split("/").pop() + "/"
						);
					break;

				case "mkdir":
					if (!args[0]) {
						result = "mkdir: missing operand";
						break;
					}
					result = `mkdir: Permission denied: Cannot modify read-only filesystem`;
					break;

				case "touch":
					if (!args[0]) {
						result = "touch: missing file operand";
						break;
					}
					result = `touch: Permission denied: Cannot modify read-only filesystem`;
					break;

				case "rm":
					if (!args[0]) {
						result = "rm: missing operand";
						break;
					}
					result = `rm: remove ${args[0]}? (y/n) [Note: Read-only filesystem]`;
					break;

				case "grep":
					if (args.length < 2) {
						result = "Usage: grep <pattern> <file>";
						break;
					}
					const [patternGrep, file] = args;
					const content = fileContents[file];
					if (!content) {
						result = `grep: ${file}: No such file`;
						break;
					}
					const lines = content
						.split("\n")
						.filter((line) =>
							line
								.toLowerCase()
								.includes(patternGrep.toLowerCase())
						);
					result =
						lines.length > 0
							? lines.join("\n")
							: `No matches found for "${patternGrep}"`;
					break;

				case "head":
					if (!args[0]) {
						result = "Usage: head <file>";
						break;
					}
					const headContent = fileContents[args[0]];
					if (!headContent) {
						result = `head: ${args[0]}: No such file`;
						break;
					}
					result = headContent.split("\n").slice(0, 10).join("\n");
					break;

				case "tail":
					if (!args[0]) {
						result = "Usage: tail <file>";
						break;
					}
					const tailContent = fileContents[args[0]];
					if (!tailContent) {
						result = `tail: ${args[0]}: No such file`;
						break;
					}
					result = tailContent.split("\n").slice(-10).join("\n");
					break;

				case "wc":
					if (!args[0]) {
						result = "Usage: wc <file>";
						break;
					}
					const wcContent = fileContents[args[0]];
					if (!wcContent) {
						result = `wc: ${args[0]}: No such file`;
						break;
					}
					const linesCount = wcContent.split("\n").length;
					const wordsCount = wcContent.split(/\s+/).length;
					const charsCount = wcContent.length;
					result = `  ${linesCount}  ${wordsCount} ${charsCount} ${args[0]}`;
					break;

				case "exit":
				case "quit":
				case "close":
					onClose();
					return;

				default:
					result = `${command}: command not found. Type 'help' for available commands.`;
			}

			// Update output
			if (shouldClear) {
				setOutput([]);
			} else if (result) {
				outputLines.push({ type: "output", text: result });
				setOutput((prev) => [...prev, ...outputLines]);
			}
		},
		[currentDir, history, onClose]
	);

	// Handle command history navigation
	const handleKeyDown = useCallback(
		(e) => {
			// Ctrl + L to clear
			if (e.ctrlKey && e.key === "l") {
				e.preventDefault();
				setOutput([]);
				return;
			}

			// Tab completion
			if (e.key === "Tab") {
				e.preventDefault();
				const currentDirKey =
					currentDir === "~"
						? "~"
						: currentDir.split("/").pop() + "/";
				const items = websiteStructure[currentDirKey] || [];

				if (input) {
					const matches = items.filter((item) =>
						item.toLowerCase().startsWith(input.toLowerCase())
					);

					if (matches.length === 1) {
						setInput(
							matches[0].endsWith("/")
								? matches[0]
								: matches[0] + " "
						);
					} else if (matches.length > 1) {
						// Show possible completions
						const outputLines = [];
						outputLines.push({
							type: "output",
							text: matches.join("  "),
						});
						setOutput((prev) => [...prev, ...outputLines]);
					}
				}
				return;
			}

			// Arrow up/down for history
			if (e.key === "ArrowUp") {
				e.preventDefault();
				if (historyIndex > 0) {
					const newIndex = historyIndex - 1;
					setHistoryIndex(newIndex);
					setInput(history[newIndex] || "");
				}
				return;
			}

			if (e.key === "ArrowDown") {
				e.preventDefault();
				if (historyIndex < history.length) {
					const newIndex = historyIndex + 1;
					setHistoryIndex(newIndex);
					setInput(history[newIndex] || "");
				}
				return;
			}

			// Ctrl + C to interrupt
			if (e.ctrlKey && e.key === "c") {
				e.preventDefault();
				setInput("");
				setOutput((prev) => [...prev, { type: "output", text: "^C" }]);
				return;
			}
		},
		// eslint-disable-next-line
		[input, currentDir, history, historyIndex]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input.trim()) {
			executeCommand(input);
			setInput("");
			setHistoryIndex(history.length + 1);
		}
	};

	// Auto-focus and scroll management
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
			setTimeout(() => {
				setOutput([
					{
						type: "output",
						text: "Welcome to Leslie Paul's Interactive Terminal!",
					},
					{
						type: "output",
						text: "This terminal simulates a Linux environment to explore my portfolio.",
					},
					{
						type: "output",
						text: "Type 'help' to see available commands.",
					},
					{
						type: "output",
						text: "Use Tab for auto-completion, ↑/↓ for command history.",
					},
					{ type: "output", text: "" },
					{ type: "output", text: "System Info:" },
					{
						type: "output",
						text: `• OS: ${userOS || "Web Terminal"}`,
					},
					{ type: "output", text: `• User: visitor` },
					{
						type: "output",
						text: `• Shell: interactive-portfolio v1.0`,
					},
					{ type: "output", text: "" },
				]);
			}, 100);
		}
	}, [isOpen, output.length, userOS]);

	if (!isOpen) return null;

	return (
		<div className="terminal-modal-overlay" onClick={onClose}>
			<div
				className="terminal-modal"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="terminal-header">
					<div className="terminal-controls">
						<div className="control close" onClick={onClose}></div>
						<div className="control minimize"></div>
						<div className="control maximize"></div>
					</div>
					<div className="terminal-title">
						visitor@lesliepaul.me — Interactive Terminal
					</div>
				</div>

				<div className="terminal-body" ref={terminalRef}>
					{output.map((line, index) => (
						<div
							key={index}
							className={`terminal-line ${line.type}`}
						>
							{line.text}
						</div>
					))}

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
							aria-label="Terminal input"
						/>
						<span className="cursor">█</span>
					</form>
				</div>

				<div className="terminal-footer">
					<div className="terminal-hint">
						<span className="hint-item">Tab ↹</span>
						<span className="hint-separator">•</span>
						<span className="hint-item">↑/↓ History</span>
						<span className="hint-separator">•</span>
						<span className="hint-item">Ctrl+L Clear</span>
						<span className="hint-separator">•</span>
						<span className="hint-item">Ctrl+C Cancel</span>
					</div>
				</div>
			</div>
		</div>
	);
};

// Enhanced CSS for the terminal (add to globals.css)
const terminalStyles = `
.terminal-modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(4px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	animation: fadeIn 0.2s ease-out;
}

.terminal-modal {
	width: 90%;
	max-width: 900px;
	height: 80vh;
	background: #1e1e1e;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	border: 1px solid #333;
	display: flex;
	flex-direction: column;
	animation: slideUp 0.3s ease-out;
}

.terminal-header {
	background: #2d2d2d;
	padding: 0 16px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #333;
	user-select: none;
}

.terminal-controls {
	display: flex;
	gap: 8px;
}

.terminal-controls .control {
	width: 12px;
	height: 12px;
	border-radius: 50%;
	cursor: pointer;
	transition: all 0.2s;
}

.terminal-controls .control.close {
	background: #ff5f56;
}

.terminal-controls .control.minimize {
	background: #ffbd2e;
}

.terminal-controls .control.maximize {
	background: #27ca3f;
}

.terminal-controls .control:hover {
	transform: scale(1.1);
}

.terminal-title {
	color: #888;
	font-size: 13px;
	font-family: 'SF Mono', 'Menlo', monospace;
}

.terminal-body {
	flex: 1;
	padding: 20px;
	overflow-y: auto;
	font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
	font-size: 14px;
	line-height: 1.5;
	color: #f0f0f0;
	background: #1e1e1e;
}

.terminal-output {
	margin-bottom: 10px;
}

.terminal-line {
	margin-bottom: 2px;
	white-space: pre-wrap;
	word-break: break-word;
}

.terminal-line.prompt {
	color: #6a9955;
	font-weight: 500;
}

.terminal-line.command {
	color: #f0f0f0;
	opacity: 0.9;
}

.terminal-line.output {
	color: #cccccc;
}

.terminal-line.error {
	color: #f44747;
}

.terminal-input-form {
	display: flex;
	align-items: center;
	gap: 8px;
	position: relative;
}

.prompt {
	color: #6a9955;
	font-weight: 500;
	white-space: nowrap;
	flex-shrink: 0;
}

.terminal-input {
	flex: 1;
	background: transparent;
	border: none;
	color: #f0f0f0;
	font-family: inherit;
	font-size: inherit;
	outline: none;
	caret-color: #6a9955;
	min-width: 0;
}

.terminal-input:focus {
	outline: none;
}

.cursor {
	color: #6a9955;
	animation: blink 1s infinite;
	margin-left: 2px;
}

.terminal-footer {
	background: #2d2d2d;
	padding: 8px 16px;
	border-top: 1px solid #333;
}

.terminal-hint {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	color: #666;
	font-size: 12px;
	font-family: 'SF Mono', 'Menlo', monospace;
}

.hint-separator {
	opacity: 0.5;
}

.hint-item {
	opacity: 0.8;
}

/* Scrollbar styling */
.terminal-body::-webkit-scrollbar {
	width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
	background: #2d2d2d;
}

.terminal-body::-webkit-scrollbar-thumb {
	background: #555;
	border-radius: 4px;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
	background: #666;
}

/* Animations */
@keyframes fadeIn {
	from { opacity: 0; }
	to { opacity: 1; }
}

@keyframes slideUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes blink {
	0%, 50% { opacity: 1; }
	51%, 100% { opacity: 0; }
}

/* Typing effect for initial messages */
.terminal-line.typing {
	display: inline-block;
	overflow: hidden;
	border-right: 2px solid #6a9955;
	white-space: nowrap;
	animation: typing 3s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
	from { width: 0 }
	to { width: 100% }
}

@keyframes blink-caret {
	from, to { border-color: transparent }
	50% { border-color: #6a9955 }
}
`;

// Hook to use the terminal modal
export const useTerminal = () => {
	const [isTerminalOpen, setIsTerminalOpen] = useState(false);
	const [userOS, setUserOS] = useState("unknown");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const platform = window.navigator.platform;
			if (platform.includes("Win")) setUserOS("Windows");
			else if (platform.includes("Mac")) setUserOS("macOS");
			else if (platform.includes("Linux")) setUserOS("Linux");
			else setUserOS(platform);
		}
	}, []);

	const openTerminal = () => setIsTerminalOpen(true);
	const closeTerminal = () => setIsTerminalOpen(false);

	const Terminal = () => (
		<TerminalModal
			isOpen={isTerminalOpen}
			onClose={closeTerminal}
			userOS={userOS}
		/>
	);

	return { openTerminal, closeTerminal, Terminal, isTerminalOpen };
};

export default TerminalModal;
