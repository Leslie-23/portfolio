import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Layers } from "lucide-react";
import {
	TIER_ORDER,
	TIER_META,
	TECH_META,
	getTechMeta,
	iconUrl,
	buildTechToProjects,
} from "../PROJECTS/data/techMeta";
import { projectsData } from "../PROJECTS/data/projects";
import { useGithubStack } from "./useGithubStack";

function timeAgo(iso) {
	if (!iso) return "—";
	const then = new Date(iso).getTime();
	const diff = (Date.now() - then) / 1000;
	if (diff < 60) return "just now";
	if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
	if (diff < 86400 * 7) return `${Math.floor(diff / 86400)}d ago`;
	if (diff < 86400 * 30) return `${Math.floor(diff / 86400 / 7)}w ago`;
	if (diff < 86400 * 365) return `${Math.floor(diff / 86400 / 30)}mo ago`;
	return `${Math.floor(diff / 86400 / 365)}y ago`;
}

function StatCard({ label, value, sub }) {
	return (
		<div className="p-5 rounded-lg border border-white/5 bg-white/[0.02]">
			<div className="font-mono text-[10px] text-white/30 tracking-widest mb-2">
				{label}
			</div>
			<div className="font-mono text-2xl text-white/90 mb-1">{value}</div>
			{sub && (
				<div className="font-mono text-[11px] text-white/40">{sub}</div>
			)}
		</div>
	);
}

function TechDetailRow({ name, projects, ghRepoCount }) {
	const navigate = useNavigate();
	const meta = getTechMeta(name);
	const icon = iconUrl(meta.iconSlug);

	return (
		<div className="flex items-start gap-4 py-4 border-b border-white/5 last:border-b-0">
			<div className="w-10 h-10 flex items-center justify-center shrink-0 rounded-md bg-white/[0.02] border border-white/5">
				{icon ? (
					<img src={icon} alt="" className="w-6 h-6" loading="lazy" />
				) : (
					<Layers size={16} className="text-white/30" />
				)}
			</div>

			<div className="flex-1 min-w-0">
				<div className="flex items-baseline gap-3 mb-1.5 flex-wrap">
					<span className="font-mono text-sm text-white/90">{name}</span>
					<span className="font-mono text-[10px] tracking-widest text-green-400/60">
						// {TIER_META[meta.tier].label}
					</span>
					{ghRepoCount > 0 && (
						<span className="font-mono text-[11px] text-white/35">
							{ghRepoCount} {ghRepoCount === 1 ? "repo" : "repos"} on github
						</span>
					)}
				</div>

				{projects.length > 0 ? (
					<div className="flex flex-wrap gap-1.5">
						{projects.map((p) => (
							<button
								key={p.slug}
								onClick={() => navigate(`/projects/${p.slug}`)}
								className="px-2 py-0.5 text-[11px] font-mono text-white/50 border border-white/8 rounded hover:text-green-400 hover:border-green-400/30 transition-colors"
							>
								{p.title} →
							</button>
						))}
					</div>
				) : (
					<div className="font-mono text-[11px] text-white/25 italic">
						Not yet shipped in a public portfolio project.
					</div>
				)}
			</div>
		</div>
	);
}

export default function Stack() {
	const navigate = useNavigate();
	const { data: gh, loading, error } = useGithubStack();

	const techToProjects = useMemo(
		() => buildTechToProjects(projectsData),
		[]
	);

	// Group every TECH_META entry by tier
	const byTier = useMemo(() => {
		const groups = { daily: [], shipped: [], explored: [] };
		for (const name of Object.keys(TECH_META)) {
			const meta = TECH_META[name];
			(groups[meta.tier] || groups.explored).push(name);
		}
		return groups;
	}, []);

	// Map "primary language by github repos" onto tech names where possible
	const ghCountFor = useMemo(() => {
		if (!gh) return {};
		const map = {};
		for (const { name, count } of gh.topLanguages) {
			map[name] = count;
		}
		return map;
	}, [gh]);

	return (
		<div className="bg-[#0a0a0a] text-white min-h-screen">
			<section className="py-20 md:py-28 px-6 md:px-12">
				<div className="max-w-5xl mx-auto">
					{/* Back link */}
					<button
						onClick={() => navigate(-1)}
						className="inline-flex items-center gap-2 text-white/40 hover:text-green-400 font-mono text-xs tracking-wider mb-8 transition-colors"
					>
						<ArrowLeft size={14} />
						BACK
					</button>

					{/* Header */}
					<div className="font-mono text-green-400/60 text-xs tracking-[0.3em] mb-3">
						// STACK
					</div>
					<h1
						className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
						style={{ fontFamily: "'Roboto Condensed', system-ui, sans-serif" }}
					>
						Tech I <span className="text-green-400">actually use</span>
					</h1>
					<p className="text-white/40 text-lg max-w-2xl mb-12">
						Grouped by how often it lands in a commit. Each entry links to
						projects where it shipped. Live stats below come from the GitHub
						API, refreshed hourly.
					</p>

					{/* GitHub summary */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
						<StatCard
							label="PUBLIC_REPOS"
							value={loading ? "…" : gh?.totalRepos ?? "—"}
							sub="non-forks"
						/>
						<StatCard
							label="TOP_LANGUAGE"
							value={loading ? "…" : gh?.topLanguages?.[0]?.name ?? "—"}
							sub={
								gh?.topLanguages?.[0]
									? `${gh.topLanguages[0].count} repos`
									: undefined
							}
						/>
						<StatCard
							label="LAST_PUSH"
							value={loading ? "…" : timeAgo(gh?.lastPushIso)}
							sub="across all repos"
						/>
						<StatCard
							label="MOST_STARRED"
							value={
								loading
									? "…"
									: gh?.mostStarred
										? `★ ${gh.mostStarred.stars}`
										: "—"
							}
							sub={gh?.mostStarred?.name}
						/>
					</div>

					{error && (
						<div className="mb-8 p-3 rounded border border-yellow-400/20 bg-yellow-400/[0.04] font-mono text-xs text-yellow-200/70">
							Couldn't reach GitHub ({error}). Showing static data only.
						</div>
					)}

					{/* Tier sections */}
					{TIER_ORDER.map((tier) => (
						<div key={tier} className="mb-12">
							<div className="flex items-baseline gap-3 mb-1">
								<div className="font-mono text-green-400/70 text-xs tracking-[0.3em]">
									// {TIER_META[tier].label}
								</div>
								<div className="font-mono text-[11px] text-white/30">
									{TIER_META[tier].blurb}
								</div>
							</div>
							<div className="rounded-lg border border-white/5 bg-white/[0.01] px-5">
								{byTier[tier].map((name) => (
									<TechDetailRow
										key={name}
										name={name}
										projects={techToProjects[name] || []}
										ghRepoCount={ghCountFor[name] || 0}
									/>
								))}
							</div>
						</div>
					))}

					{/* Footer */}
					<div className="mt-16 flex flex-wrap items-center gap-4 text-xs font-mono text-white/30">
						<a
							href="https://github.com/Leslie-23"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 hover:text-green-400 transition-colors"
						>
							<Github size={12} />
							github.com/Leslie-23
							<ExternalLink size={10} />
						</a>
						<span className="text-white/15">|</span>
						<span>data refreshed hourly</span>
					</div>
				</div>
			</section>
		</div>
	);
}
