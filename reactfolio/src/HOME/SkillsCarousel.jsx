import { useState, useEffect, useRef } from "react";
import {
	SiJavascript,
	SiReact,
	SiNodedotjs,
	SiMongodb,
	SiDocker,
	SiAmazon,
	SiFigma,
	SiGithub,
	SiTypescript,
	SiTailwindcss,
	SiPostgresql,
	SiNextdotjs,
	SiC,
	SiCplusplus,
	SiPython,
	SiExpress,
	SiRedis,
	SiFirebase,
	SiGooglecloud,
	SiKubernetes,
	SiNginx,
	SiGit,
	SiPostman,
	SiPrisma,
	SiAdobephotoshop,
	SiAdobeillustrator,
	SiCanva,
	SiVercel,
	SiBootstrap,
	SiMysql,
	SiGraphql,
	SiJest,
	SiWebpack,
	SiCoffeescript,
	SiCoder,
} from "react-icons/si";

const skills = [
	// Programming Languages
	{ name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
	{ name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
	{ name: "Python", Icon: SiPython, color: "#3776AB" },
	{ name: "Java", Icon: SiCoffeescript, color: "#ED8B00" },
	{ name: "C", Icon: SiC, color: "#A8B9CC" },
	{ name: "C++", Icon: SiCplusplus, color: "#00599C" },

	// Frontend Technologies
	{ name: "React", Icon: SiReact, color: "#61DAFB" },
	{ name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
	{ name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
	{ name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },

	// Backend Technologies
	{ name: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
	{ name: "Express.js", Icon: SiExpress, color: "#000000" },
	{ name: "GraphQL", Icon: SiGraphql, color: "#E10098" },

	// Databases
	{ name: "MongoDB", Icon: SiMongodb, color: "#00ED64" },
	{ name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
	{ name: "MySQL", Icon: SiMysql, color: "#4479A1" },
	{ name: "Redis", Icon: SiRedis, color: "#DC382D" },

	// Cloud & DevOps
	{ name: "AWS", Icon: SiAmazon, color: "#FF9900" },
	{ name: "Docker", Icon: SiDocker, color: "#2496ED" },
	{ name: "Kubernetes", Icon: SiKubernetes, color: "#326CE5" },
	{ name: "Google Cloud", Icon: SiGooglecloud, color: "#4285F4" },
	{ name: "Azure", Icon: SiGooglecloud, color: "#0078D4" },
	{ name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
	{ name: "Vercel", Icon: SiVercel, color: "#000000" },
	{ name: "Nginx", Icon: SiNginx, color: "#009639" },

	// Tools & IDEs
	{ name: "VS Code", Icon: SiCoder, color: "#007ACC" },
	{ name: "Git", Icon: SiGit, color: "#F05032" },
	{ name: "GitHub", Icon: SiGithub, color: "#181717" },
	{ name: "Postman", Icon: SiPostman, color: "#FF6C37" },
	{ name: "Prisma", Icon: SiPrisma, color: "#2D3748" },
	{ name: "Jest", Icon: SiJest, color: "#C21325" },
	{ name: "Webpack", Icon: SiWebpack, color: "#8DD6F9" },

	// Design Tools
	{ name: "Figma", Icon: SiFigma, color: "#F24E1E" },
	{ name: "Photoshop", Icon: SiAdobephotoshop, color: "#31A8FF" },
	{ name: "Illustrator", Icon: SiAdobeillustrator, color: "#FF9A00" },
	{ name: "Canva", Icon: SiCanva, color: "#00C4CC" },
];

export default function SkillsCarousel() {
	const [isHovered, setIsHovered] = useState(false);
	const topRowRef = useRef(null);
	const bottomRowRef = useRef(null);

	// Auto-scroll effect for both rows
	useEffect(() => {
		if (isHovered || !topRowRef.current || !bottomRowRef.current) return;

		const topRow = topRowRef.current;
		const bottomRow = bottomRowRef.current;

		let topScrollPosition = 0;
		let bottomScrollPosition = 0;
		const scrollSpeed = 1;

		const topMaxScroll = topRow.scrollWidth - topRow.clientWidth;
		const bottomMaxScroll = bottomRow.scrollWidth - bottomRow.clientWidth;

		const interval = setInterval(() => {
			// Top row scrolls left to right
			topScrollPosition += scrollSpeed;
			if (topScrollPosition > topMaxScroll) {
				topScrollPosition = 0;
			}
			topRow.scrollLeft = topScrollPosition;

			// Bottom row scrolls right to left (reverse)
			bottomScrollPosition -= scrollSpeed;
			if (bottomScrollPosition < 0) {
				bottomScrollPosition = bottomMaxScroll;
			}
			bottomRow.scrollLeft = bottomScrollPosition;
		}, 30);

		return () => clearInterval(interval);
	}, [isHovered]);

	// Split skills into two rows
	const topRowSkills = skills.slice(0, Math.ceil(skills.length / 2));
	const bottomRowSkills = skills.slice(Math.ceil(skills.length / 2));

	return (
		<section className="relative w-full py-20 px-4 md:px-8 lg:px-16">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800" />

			<div className="relative z-10 max-w-7xl mx-auto">
				{/* Heading */}
				<div className="mb-16 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
						Tools & Technologies I Use
					</h2>
					<p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">
						Comprehensive toolkit for full-stack development and
						beyond
					</p>
				</div>

				{/* Two Row Carousel Container */}
				<div
					className="relative space-y-8"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{/* Top Row - Scrolls Left to Right */}
					<div className="relative">
						{/* Left gradient fade */}
						<div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-neutral-50 via-neutral-50 to-transparent dark:from-neutral-950 dark:via-neutral-950 dark:to-transparent z-20 pointer-events-none" />

						{/* Right gradient fade */}
						<div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-50 via-neutral-50 to-transparent dark:from-neutral-950 dark:via-neutral-950 dark:to-transparent z-20 pointer-events-none" />

						{/* Top Row Skills */}
						<div
							ref={topRowRef}
							className="flex overflow-x-hidden scroll-smooth gap-8 px-4 py-6"
						>
							{/* Original skills */}
							{topRowSkills.map((skill, index) => (
								<SkillCard
									key={`top-original-${index}`}
									skill={skill}
								/>
							))}

							{/* Duplicated skills for infinite loop effect */}
							{topRowSkills.map((skill, index) => (
								<SkillCard
									key={`top-duplicate-${index}`}
									skill={skill}
								/>
							))}
						</div>
					</div>

					{/* Bottom Row - Scrolls Right to Left */}
					<div className="relative">
						{/* Left gradient fade */}
						<div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-neutral-50 via-neutral-50 to-transparent dark:from-neutral-950 dark:via-neutral-950 dark:to-transparent z-20 pointer-events-none" />

						{/* Right gradient fade */}
						<div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-50 via-neutral-50 to-transparent dark:from-neutral-950 dark:via-neutral-950 dark:to-transparent z-20 pointer-events-none" />

						{/* Bottom Row Skills */}
						<div
							ref={bottomRowRef}
							className="flex overflow-x-hidden scroll-smooth gap-8 px-4 py-6"
						>
							{/* Original skills */}
							{bottomRowSkills.map((skill, index) => (
								<SkillCard
									key={`bottom-original-${index}`}
									skill={skill}
								/>
							))}

							{/* Duplicated skills for infinite loop effect */}
							{bottomRowSkills.map((skill, index) => (
								<SkillCard
									key={`bottom-duplicate-${index}`}
									skill={skill}
								/>
							))}
						</div>
					</div>
				</div>

				{/* Info text */}
				<p className="text-xs text-neutral-400 dark:text-neutral-600 text-center mt-12">
					{/* Hover to pause • Top row scrolls right, bottom row scrolls
					left */}
				</p>
			</div>
		</section>
	);
}

function SkillCard({ skill }) {
	const { Icon, name, color } = skill;

	return (
		<div className="flex flex-col items-center justify-center gap-3 min-w-24 cursor-pointer group">
			{/* Icon container */}
			<div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 transition-all duration-500 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 group-hover:scale-110 group-hover:rotate-3 border border-neutral-200 dark:border-neutral-700">
				{/* Glow effect on hover */}
				<div
					className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 "
					style={{ backgroundColor: color }}
				/>

				{/* Icon - grayscale by default, full color on hover */}
				<Icon
					size={32}
					className="relative z-10 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
					style={{
						filter: "grayscale(1)",
						WebkitFilter: "grayscale(1)",
					}}
				/>
			</div>

			{/* Skill name */}
			<p className="text-xs font-medium text-neutral-600 dark:text-neutral-300 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap group-hover:translate-y-1">
				{name}
			</p>
		</div>
	);
}
