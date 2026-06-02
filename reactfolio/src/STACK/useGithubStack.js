import { useEffect, useState } from "react";

const CACHE_KEY = "gh_stack_v1";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function readCache() {
	try {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const { ts, payload } = JSON.parse(raw);
		if (Date.now() - ts > CACHE_TTL_MS) return null;
		return payload;
	} catch {
		return null;
	}
}

function writeCache(payload) {
	try {
		localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), payload }));
	} catch {}
}

/**
 * Aggregates GitHub repo data for a user into a stack-summary shape.
 * Cached in localStorage for 1 hour to stay under the 60 req/hr unauth limit.
 */
export function useGithubStack(username = "Leslie-23") {
	const [data, setData] = useState(() => readCache());
	const [loading, setLoading] = useState(!data);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (data) return; // hit cache
		setLoading(true);

		// Pull two pages so we get up to 200 repos
		const urls = [1, 2].map(
			(p) =>
				`https://api.github.com/users/${username}/repos?per_page=100&page=${p}&sort=updated`
		);

		Promise.all(urls.map((u) => fetch(u).then((r) => r.ok ? r.json() : [])))
			.then((pages) => {
				const repos = pages.flat().filter((r) => r && !r.fork);
				const byLang = {};
				let lastPush = null;
				let mostStarred = null;

				for (const r of repos) {
					if (r.language) {
						byLang[r.language] = (byLang[r.language] || 0) + 1;
					}
					const pushed = r.pushed_at ? new Date(r.pushed_at) : null;
					if (pushed && (!lastPush || pushed > lastPush)) lastPush = pushed;
					if (!mostStarred || r.stargazers_count > mostStarred.stars) {
						mostStarred = {
							name: r.name,
							stars: r.stargazers_count,
							url: r.html_url,
						};
					}
				}

				const topLanguages = Object.entries(byLang)
					.sort((a, b) => b[1] - a[1])
					.map(([name, count]) => ({ name, count }));

				const payload = {
					username,
					totalRepos: repos.length,
					topLanguages,
					lastPushIso: lastPush ? lastPush.toISOString() : null,
					mostStarred,
				};
				writeCache(payload);
				setData(payload);
			})
			.catch((e) => setError(e.message || "GitHub fetch failed"))
			.finally(() => setLoading(false));
	}, [username, data]);

	return { data, loading, error };
}
