import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Slide from "@/components/Slide";
import Ask from "@/components/Ask";
import JsonLd from "@/components/JsonLd";
import { NOTES, getNote } from "@/lib/data";
import { SITE_URL, abs, isoDate, breadcrumbLd } from "@/lib/seo";

export function generateStaticParams() { return NOTES.map((n) => ({ slug: n.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = getNote((await params).slug);
  if (!n) return {};
  const url = `/notes/${n.slug}`;
  return {
    title: n.title,
    description: n.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: n.title, description: n.summary, publishedTime: isoDate(n.date), authors: ["Leslie Paul Ajayi"], siteName: "Leslie Paul Ajayi", locale: "en_GH", images: ["/opengraph-image.png"] },
    twitter: { card: "summary_large_image", title: n.title, description: n.summary, images: ["/twitter-image.png"] },
  };
}

export default async function Note({ params }: { params: Promise<{ slug: string }> }) {
  const n = getNote((await params).slug);
  if (!n) notFound();
  return (
    <>
      <JsonLd data={[
        {
          "@type": "BlogPosting",
          headline: n.title,
          description: n.summary,
          datePublished: isoDate(n.date),
          dateModified: isoDate(n.date),
          mainEntityOfPage: abs(`/notes/${n.slug}`),
          image: abs("/opengraph-image.png"),
          author: { "@id": `${SITE_URL}/#person` },
          publisher: { "@id": `${SITE_URL}/#person` },
          inLanguage: "en",
        },
        breadcrumbLd([{ name: "Home", path: "/" }, { name: "Writing", path: "/notes" }, { name: n.title, path: `/notes/${n.slug}` }]),
      ]} />
      <Slide label={`Note ${n.n}`}>
        <article className="mx-auto max-w-[1080px]">
          <Link href="/notes" className="u mt-8 inline-block text-[15px]">All writing</Link>
          <p className="label mt-10 text-mute">{n.date} · {n.minutes} min read</p>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(40px,5.4vw,80px)] font-medium leading-[1.02] tracking-[-0.045em]">{n.title}<span className="dot">.</span></h1>
          <p className="t-lead mt-6 max-w-[56ch]">{n.summary}</p>
          <div className="mt-12 grid gap-12 border-t border-line pt-10 lg:grid-cols-[1fr_260px]">
            <div className="max-w-[66ch] space-y-6 text-[18px] leading-[1.75] text-body">{n.body.map((p, i) => <p key={i}>{p}</p>)}</div>
            <aside aria-label="Margin notes" className="space-y-5 lg:sticky lg:top-6 lg:self-start">
              {n.margin.map((m) => (
                <div key={m.fig} className="border-l-2 border-accent pl-4">
                  <p className="label text-accent-ink">{m.fig}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-mute">{m.text}</p>
                </div>
              ))}
            </aside>
          </div>
        </article>
      </Slide>
      <Ask />
    </>
  );
}
