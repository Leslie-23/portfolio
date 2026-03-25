import { useState } from "react";
import {
	SiJavascript,
	SiReact,
	SiNodedotjs,
	SiMongodb,
	SiDocker,
	SiAmazonwebservices,
	SiGithub,
	SiTypescript,
	SiTailwindcss,
	SiPostgresql,
	SiNextdotjs,
	SiPython,
	SiExpress,
	SiRedis,
	SiFirebase,
	SiGit,
	SiGraphql,
	SiPrisma,
	SiMysql,
	SiNginx,
} from "react-icons/si";

const skills = [
	// Primary Stack — daily drivers
	{ name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
	{ name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
	{ name: "React", Icon: SiReact, color: "#61DAFB" },
	{ name: "Next.js", Icon: SiNextdotjs, color: "#808080" },
	{ name: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
	{ name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
	{ name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
	{ name: "MongoDB", Icon: SiMongodb, color: "#00ED64" },

	// Experienced — production use
	{ name: "Python", Icon: SiPython, color: "#3776AB" },
	{ name: "Express.js", Icon: SiExpress, color: "#808080" },
	{ name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
	{ name: "Redis", Icon: SiRedis, color: "#DC382D" },
	{ name: "MySQL", Icon: SiMysql, color: "#4479A1" },
	{ name: "Docker", Icon: SiDocker, color: "#2496ED" },
	{ name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
	{ name: "Git", Icon: SiGit, color: "#F05032" },
	{ name: "GitHub", Icon: SiGithub, color: "#808080" },
	{ name: "Prisma", Icon: SiPrisma, color: "#5A67D8" },
	{ name: "AWS", Icon: SiAmazonwebservices, color: "#FF9900" },
	{ name: "Nginx", Icon: SiNginx, color: "#009639" },
];

export default function SkillsCarousel() {
	const [isHovered, setIsHovered] = useState(false);

	const topRowSkills = skills.slice(0, Math.ceil(skills.length / 2));
	const bottomRowSkills = skills.slice(Math.ceil(skills.length / 2));

	return (
		<section className="relative w-full py-20 px-4 md:px-8 lg:px-16">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300" />

			<div className="relative z-10 max-w-7xl mx-auto">
				{/* Heading */}
				<div className="mb-16 text-center">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-heading font-heading">
						Tools & Technologies
					</h2>
					<p className="text-sm text-muted font-light">
						My core engineering toolkit — curated for depth, not
						breadth
					</p>
				</div>

				{/* Two Row Carousel Container */}
				<div
					className="relative space-y-8"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{/* Top Row */}
					<div className="relative overflow-hidden">
						<div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
						<div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />

						<div
							className="flex gap-8 px-4 py-6"
							style={{
								animation: isHovered
									? "none"
									: "scrollLeft 30s linear infinite",
								width: "max-content",
							}}
						>
							{[
								...topRowSkills,
								...topRowSkills,
								...topRowSkills,
							].map((skill, index) => (
								<SkillCard
									key={`top-${index}`}
									skill={skill}
								/>
							))}
						</div>
					</div>

					{/* Bottom Row */}
					<div className="relative overflow-hidden">
						<div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
						<div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />

						<div
							className="flex gap-8 px-4 py-6"
							style={{
								animation: isHovered
									? "none"
									: "scrollRight 30s linear infinite",
								width: "max-content",
							}}
						>
							{[
								...bottomRowSkills,
								...bottomRowSkills,
								...bottomRowSkills,
							].map((skill, index) => (
								<SkillCard
									key={`bottom-${index}`}
									skill={skill}
								/>
							))}
						</div>
					</div>

					<style>{`
						@keyframes scrollLeft {
							0% { transform: translateX(0); }
							100% { transform: translateX(-33.33%); }
						}
						@keyframes scrollRight {
							0% { transform: translateX(-33.33%); }
							100% { transform: translateX(0); }
						}
					`}</style>
				</div>
			</div>
		</section>
	);
}

function SkillCard({ skill }) {
	const { Icon, name, color } = skill;

	return (
		<div className="flex flex-col items-center justify-center gap-3 min-w-24 cursor-pointer group">
			<div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 transition-all duration-500 group-hover:bg-gray-200 dark:group-hover:bg-slate-700 group-hover:scale-110 group-hover:rotate-3 border border-gray-200 dark:border-slate-700">
				<div
					className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
					style={{ backgroundColor: color }}
				/>
				<Icon
					size={32}
					className="relative z-10 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
					style={{
						filter: "grayscale(1)",
						WebkitFilter: "grayscale(1)",
					}}
				/>
			</div>
			<p className="text-xs font-medium text-muted text-center opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap group-hover:translate-y-1">
				{name}
			</p>
		</div>
	);
}
