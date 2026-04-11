import React, { useState, useEffect, useRef, useCallback } from "react";
import "../globals.css";

const ROUTE_MAP = {
	home: "/",
	"~": "/",
	projects: "/projects",
	about: "/about",
	contact: "/contact",
	resume: "/resume",
	socials: "/socials",
};

const TerminalModal = ({ isOpen, onClose, userOS, navigate }) => {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState([]);
	const [currentDir, setCurrentDir] = useState("~");
	const [history, setHistory] = useState([]);
	const [historyIndex, setHistoryIndex] = useState(0);
	const inputRef = useRef(null);
	const terminalRef = useRef(null);

	// Virtual filesystem — maps to real routes where applicable
	const websiteStructure = {
		"~": ["about/", "projects/", "contact/", "resume/", "skills/", "bio.txt"],
		"about/": ["bio.txt", "experience.md", "stack.md"],
		"projects/": ["featured.md", "github.md"],
		"skills/": ["frontend.md", "backend.md", "infra.md"],
		"contact/": ["email.txt", "socials.md"],
		"resume/": ["resume.md"],
	};

	const fileContents = {
		"bio.txt": `Leslie Paul Ajayi
Software Engineer — Accra, Ghana

I build production-grade systems from database to deployment:
clean architecture, performant backends, and interfaces that feel alive.

Currently focused on full-stack web platforms, API design,
and the boring-but-important parts: caching, observability, CI/CD.`,

		"experience.md": `## Engineering Focus

### Full-stack Web Platforms
• React / TypeScript frontends with strict type safety
• Node.js + Express / Fastify REST services
• PostgreSQL and MongoDB, schema design and query tuning

### Systems & Infrastructure
• Docker-based dev + deploy workflows
• CI/CD via GitHub Actions, Netlify, Vercel
• Caching (Redis), background jobs, rate limiting

### What I care about
• Correctness before cleverness
• Measured performance, not vibes
• Readable code and small blast radius on changes`,

		"stack.md": `## Current stack

frontend:  React 18, TypeScript, Tailwind, Framer Motion, Three.js
backend:   Node.js, Express, GraphQL, Socket.io, JWT
data:      PostgreSQL, MongoDB, Redis
infra:     Docker, GitHub Actions, Netlify, Vercel
tools:     Git, pnpm, Vite, Jest, Playwright`,

		"frontend.md": `## Frontend

React 18, TypeScript, Tailwind CSS, Framer Motion, Three.js / R3F,
React Router, Zustand, React Query, Jest + Testing Library.

Comfortable with SSR / SSG (Next.js), accessibility (WCAG 2.1),
Core Web Vitals work, and animation systems that don't tank perf.`,

		"backend.md": `## Backend

Node.js (Express, Fastify), REST + GraphQL APIs, WebSockets,
auth flows (JWT, OAuth, session), rate limiting, job queues.

Experience designing service boundaries and writing HTTP contracts
that survive contact with real clients.`,

		"infra.md": `## Infrastructure

Docker, docker-compose, CI/CD pipelines (GitHub Actions),
PostgreSQL schema design, query plans, indexing,
Redis for caching and queues, log aggregation + metrics.`,

		"featured.md": `## Featured work

Run \`cd projects\` then \`open projects\` to jump to the full list.
Or just type \`goto projects\`.`,

		"github.md": `## GitHub

https://github.com/Leslie-23

Type \`open github\` to open in a new tab.`,

		"email.txt": `hello@lesliepaul.me

Type \`open contact\` to jump to the contact form.`,

		"socials.md": `GitHub:    https://github.com/Leslie-23
LinkedIn:  https://linkedin.com/in/leslie-paul-ajayi
Email:     hello@lesliepaul.me`,

		"resume.md": `Type \`open resume\` to view the full resume page.`,
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
  cd <dir>              Change directory (try: cd projects)
  goto <page>           Navigate to a page (home|projects|about|contact|resume)
  open <target>         Open a page or external link (github|linkedin|email)
  pwd                   Print working directory
  whoami                Display current user
  clear, cls            Clear terminal screen
  cat <file>            Display file contents
  echo <text>           Print text
  date                  Show current date/time
  history               Show command history
  find <pattern>        Search for files
  tree                  Show directory tree
  grep <pattern> <file> Search in file
  head <file>           Show first 10 lines
  tail <file>           Show last 10 lines
  wc <file>             Word count
  exit, quit            Close terminal
  help                  Show this help

Tip: press \` anywhere on the site to toggle this terminal.`;
					break;

				case "goto":
				case "nav":
					if (!args[0]) {
						result = "Usage: goto <home|projects|about|contact|resume|socials>";
						break;
					}
					{
						const key = args[0].replace(/^\/+|\/+$/g, "").toLowerCase();
						const route = ROUTE_MAP[key];
						if (route && navigate) {
							outputLines.push({
								type: "output",
								text: `→ navigating to ${route}`,
							});
							setOutput((prev) => [...prev, ...outputLines]);
							setTimeout(() => {
								navigate(route);
								onClose();
							}, 250);
							return;
						}
						result = `goto: unknown page "${args[0]}". Try: home, projects, about, contact, resume`;
					}
					break;

				case "open":
					if (!args[0]) {
						result = "Usage: open <page|github|linkedin|email>";
						break;
					}
					{
						const key = args[0].toLowerCase();
						const external = {
							github: "https://github.com/Leslie-23",
							linkedin: "https://linkedin.com/in/leslie-paul-ajayi",
							email: "mailto:hello@lesliepaul.me",
							mail: "mailto:hello@lesliepaul.me",
						};
						if (external[key]) {
							window.open(external[key], "_blank", "noopener,noreferrer");
							result = `→ opened ${key}`;
							break;
						}
						const route = ROUTE_MAP[key.replace(/^\/+|\/+$/g, "")];
						if (route && navigate) {
							outputLines.push({
								type: "output",
								text: `→ opening ${route}`,
							});
							setOutput((prev) => [...prev, ...outputLines]);
							setTimeout(() => {
								navigate(route);
								onClose();
							}, 250);
							return;
						}
						result = `open: unknown target "${args[0]}"`;
					}
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

					// If target maps to a real route, navigate there
					{
						const routeKey = target
							.replace(/^\/+|\/+$/g, "")
							.toLowerCase();
						if (ROUTE_MAP[routeKey] && navigate) {
							outputLines.push({
								type: "output",
								text: `→ ${ROUTE_MAP[routeKey]}`,
							});
							setOutput((prev) => [...prev, ...outputLines]);
							setTimeout(() => {
								navigate(ROUTE_MAP[routeKey]);
								onClose();
							}, 250);
							return;
						}
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
		[currentDir, history, onClose, navigate]
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
						text: "leslie.dev interactive terminal — v2.0",
					},
					{
						type: "output",
						text: `session: visitor@lesliepaul.me  •  host: ${userOS || "web"}`,
					},
					{ type: "output", text: "" },
					{
						type: "output",
						text: "Try:  help  •  ls  •  cat bio.txt  •  goto projects  •  open github",
					},
					{
						type: "output",
						text: "Tab completes, ↑/↓ walks history, ` toggles this window, Esc closes.",
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
						<span className="hint-item">` Toggle</span>
						<span className="hint-separator">•</span>
						<span className="hint-item">Esc Close</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TerminalModal;
