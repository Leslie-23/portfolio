import React, { useState, useEffect } from "react";
import { Github, GitFork, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const GITHUB_USERNAME = "Leslie-23";
const CACHE_KEY = "github_activity_cache";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export default function GitHubActivity() {
	const [repos, setRepos] = useState([]);
	const [profile, setProfile] = useState(null);
	const [languages, setLanguages] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGitHubData = async () => {
			// Check cache
			const cached = localStorage.getItem(CACHE_KEY);
			if (cached) {
				const { data, timestamp } = JSON.parse(cached);
				if (Date.now() - timestamp < CACHE_DURATION) {
					setProfile(data.profile);
					setRepos(data.repos);
					setLanguages(data.languages);
					setLoading(false);
					return;
				}
			}

			try {
				const [profileRes, reposRes] = await Promise.all([
					fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
					fetch(
						`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
					),
				]);

				const profileData = await profileRes.json();
				const reposData = await reposRes.json();

				// Calculate language breakdown
				const langCount = {};
				reposData.forEach((repo) => {
					if (repo.language) {
						langCount[repo.language] =
							(langCount[repo.language] || 0) + 1;
					}
				});

				// Sort by count
				const sortedLangs = Object.entries(langCount)
					.sort((a, b) => b[1] - a[1])
					.slice(0, 6);
				const totalLangs = sortedLangs.reduce(
					(sum, [, count]) => sum + count,
					0
				);
				const langPercentages = {};
				sortedLangs.forEach(([lang, count]) => {
					langPercentages[lang] = Math.round(
						(count / totalLangs) * 100
					);
				});

				const topRepos = reposData
					.filter((r) => !r.fork)
					.sort(
						(a, b) =>
							b.stargazers_count - a.stargazers_count ||
							new Date(b.updated_at) - new Date(a.updated_at)
					)
					.slice(0, 4);

				// Cache results
				const cacheData = {
					profile: profileData,
					repos: topRepos,
					languages: langPercentages,
				};
				localStorage.setItem(
					CACHE_KEY,
					JSON.stringify({ data: cacheData, timestamp: Date.now() })
				);

				setProfile(profileData);
				setRepos(topRepos);
				setLanguages(langPercentages);
			} catch (error) {
				console.error("Failed to fetch GitHub data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchGitHubData();
	}, []);

	const langColors = {
		JavaScript: "#F7DF1E",
		TypeScript: "#3178C6",
		Python: "#3776AB",
		Java: "#ED8B00",
		HTML: "#E34F26",
		CSS: "#1572B6",
		C: "#A8B9CC",
		"C++": "#00599C",
		Shell: "#89e051",
		Vue: "#4FC08D",
	};

	if (loading) {
		return (
			<section className="py-20 bg-surface px-4 md:px-8 transition-colors duration-300">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-4 text-heading font-heading">
							GitHub Activity
						</h2>
						<p className="text-muted">Loading...</p>
					</div>
					<div className="grid md:grid-cols-4 gap-6">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="h-40 bg-card rounded-xl border border-border animate-pulse"
							/>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (!profile) return null;

	return (
		<section className="py-20 bg-surface px-4 md:px-8 transition-colors duration-300">
			<div className="max-w-6xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-heading font-heading">
						GitHub Activity
					</h2>
					<p className="text-lg text-muted max-w-2xl mx-auto">
						Real contributions, real code — not just a list of
						technologies.
					</p>
				</div>

				{/* Stats Row */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
					{[
						{
							label: "Public Repos",
							value: profile.public_repos,
						},
						{
							label: "Followers",
							value: profile.followers,
						},
						{
							label: "Following",
							value: profile.following,
						},
						{
							label: "Languages",
							value: Object.keys(languages).length + "+",
						},
					].map((stat, idx) => (
						<motion.div
							key={idx}
							className="bg-card rounded-xl p-6 border border-border text-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
						>
							<p className="text-3xl font-bold text-heading font-heading">
								{stat.value}
							</p>
							<p className="text-sm text-muted">{stat.label}</p>
						</motion.div>
					))}
				</div>

				{/* Languages Breakdown */}
				<div className="bg-card rounded-xl p-6 border border-border mb-12">
					<h3 className="text-lg font-bold text-heading mb-4 font-heading">
						Language Breakdown
					</h3>
					{/* Bar */}
					<div className="flex rounded-full overflow-hidden h-3 mb-4">
						{Object.entries(languages).map(([lang, pct]) => (
							<div
								key={lang}
								style={{
									width: `${pct}%`,
									backgroundColor:
										langColors[lang] || "#6b7280",
								}}
								className="transition-all duration-500"
								title={`${lang}: ${pct}%`}
							/>
						))}
					</div>
					{/* Legend */}
					<div className="flex flex-wrap gap-4">
						{Object.entries(languages).map(([lang, pct]) => (
							<div
								key={lang}
								className="flex items-center gap-2 text-sm"
							>
								<div
									className="w-3 h-3 rounded-full"
									style={{
										backgroundColor:
											langColors[lang] || "#6b7280",
									}}
								/>
								<span className="text-body">
									{lang}{" "}
									<span className="text-muted">{pct}%</span>
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Recent Repos */}
				<div className="grid md:grid-cols-2 gap-6 mb-8">
					{repos.map((repo, idx) => (
						<motion.a
							key={repo.id}
							href={repo.html_url}
							target="_blank"
							rel="noopener noreferrer"
							className="group bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: idx * 0.1 }}
						>
							<div className="flex items-start justify-between mb-3">
								<h4 className="font-bold text-heading group-hover:text-primary transition-colors font-heading">
									{repo.name}
								</h4>
								<ExternalLink
									size={16}
									className="text-muted group-hover:text-primary transition-colors flex-shrink-0"
								/>
							</div>
							<p className="text-sm text-muted mb-4 line-clamp-2">
								{repo.description || "No description"}
							</p>
							<div className="flex items-center gap-4 text-sm text-muted">
								{repo.language && (
									<span className="flex items-center gap-1">
										<span
											className="w-2.5 h-2.5 rounded-full"
											style={{
												backgroundColor:
													langColors[repo.language] ||
													"#6b7280",
											}}
										/>
										{repo.language}
									</span>
								)}
								<span className="flex items-center gap-1">
									<Star size={14} />
									{repo.stargazers_count}
								</span>
								<span className="flex items-center gap-1">
									<GitFork size={14} />
									{repo.forks_count}
								</span>
							</div>
						</motion.a>
					))}
				</div>

				{/* View Profile Link */}
				<div className="text-center">
					<a
						href={`https://github.com/${GITHUB_USERNAME}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl text-heading font-medium hover:border-primary hover:text-primary transition-all duration-200"
					>
						<Github size={20} />
						View Full GitHub Profile
					</a>
				</div>
			</div>
		</section>
	);
}
