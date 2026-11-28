/* The 400 crew. Everything here comes from the crew's own site (https://400-omega.vercel.app/: Crew, Story and Track record
   pages), read on 27 Nov 2026. Nothing is added. Roles, ownership lists and dates are as that site states them, except Leslie's role, which Leslie corrected on 27 Nov 2026: Leslie is the backend person on most projects.
   The busts are faceted portraits made from photos Leslie supplied on 28 Nov 2026 (public/team, built with scripts/build-crew-bust.mjs). */

export const CREW_SITE = "https://400-omega.vercel.app";

export type Member = {
  id: "joyce" | "leslie" | "elton" | "efo";
  name: string;
  also?: string;               // the name the chat uses
  usually: string;             // one line, as the crew's site says it
  owns: string[];
  stack: string[];
  bio: string;
  motto: string;
  href?: string;               // a link the crew's own site gives for them
  me?: true;
  bust: { src: string; w: number; h: number };   // the faceted portrait
};

export const CREW: Member[] = [
  {
    id: "joyce", name: "Joyce", also: "Mama J", bust: { src: "/team/joyce.png", w: 828, h: 842 },
    usually: "Partnerships, clients, pitches and frontend",
    owns: ["Partnerships", "Landing clients", "Pitches", "The group fund"],
    stack: ["UI", "Frontend", "Backend when it's needed"],
    bio: "Joyce works the outside of the product: partnerships, clients and pitches. She landed the crew's first paid client, wrote the game plan for the Ministry of Transport visit and always opens the presentation. On the inside she does UI and frontend, and backend when a sprint needs it.",
    motto: "Project success. Close project.",
    href: "https://www.joyceelli.com",
  },
  {
    id: "leslie", name: "Leslie", me: true, bust: { src: "/portrait/leslie.png", w: 687, h: 1083 },
    usually: "Backend, full-stack, DevOps and releases",
    owns: ["The backend, on most projects", "Deploys", "Play Store and TestFlight releases", "Trofficient (founder)"],
    stack: ["Backend", "Full-stack", "DevOps", "CI and releases"],
    bio: "I'm the backend person on most of our projects: the APIs, the data and the servers behind the screens. I also deploy everything, and I get the builds through the Play Store and TestFlight. Founder of Trofficient. Two mottos: forgiveness over permission, and tiny commits.",
    motto: "I smell a rebase.",
  },
  {
    id: "elton", name: "Elton", also: "Nii Marmah", bust: { src: "/team/elton.png", w: 820, h: 917 },
    usually: "Frontend, product and system design",
    owns: ["Interfaces", "Mobile apps", "Design reviews", "Beagine (co-founder)"],
    stack: ["Expo", "React Native", "Frontend", "Product design"],
    bio: "Elton designs and builds the parts people touch: frontend, product and system design, mostly in Expo and React Native. Co-founder of Beagine, designer of the UniCliq and 400 logos, and a mentor at the DesignPxd vibe-coding hackathon.",
    motto: "Sleep was just a rumor to us.",
    href: "https://bio-ten-nu.vercel.app",
  },
  {
    id: "efo", name: "Selorm", also: "Efo", bust: { src: "/team/efo.png", w: 853, h: 885 },
    usually: "Database, QA and client delivery",
    owns: ["Data models", "QA and bug-finding", "Keeping client work on track", "Hardware fixes"],
    stack: ["Databases", "Backend", "QA", "Hardware"],
    bio: "Selorm runs the database side, QA and bug-finding, and keeps client work on track. He also coined the house motto: ELK. Execute, Learn and Keep growing.",
    motto: "More are still being cooked.",
  },
];

/** How it came together, in the crew's own dates. */
export const TEAM_STORY: { date: string; t: string; b: string; quote?: string; key?: true }[] = [
  { date: "23 Apr 2025", t: "A group chat for a semester project", b: "Joyce starts it for a database project at Regional Maritime University. Four people, one brief." },
  { date: "12 Jun 2025", t: "Hirely, the first build", b: "A talent-hiring platform with a résumé parser and applicant tracking, in PHP and MySQL. Presented. Waakye followed." },
  { date: "5 Sep 2025", t: "Renamed 400", b: "Elton renames the chat in the first week of final year. Four of us, 100 each." },
  { date: "14 Oct 2025", t: "The turning point", b: "Talking about projects was not enough any more.", quote: "I say we run these projects as a company.", key: true },
  { date: "15 to 22 Oct 2025", t: "UniCliq, built in a week", b: "A campus social app, from a naming session to a working build in about seven days." },
  { date: "9 to 11 Mar 2026", t: "Trofficient, for real", b: "I demo it to the group. Two days later Joyce books a real ride, Circle to Ashaiman, GH₵15." },
  { date: "30 Mar 2026", t: "The first paid client", b: "Joyce lands Sellis Beauty Spa. The site goes live on 7 May." },
  { date: "6 Jul 2026", t: "Trofficient on the App Store", b: "The commuter and driver apps. Google Play closed testing follows." },
  { date: "7 Oct 2026", t: "The Ministry of Transport", b: "Joyce and I present Trofficient and Beagine. A presentation, not a partnership; we are waiting to hear back." },
  { date: "23 Oct 2026", t: "Skill Academy's first workshop", b: "De-Masters Academy, JHS 1 to 3: the internet, AI, websites and robots, on two Arduino kits." },
];

/** The big ones, and who did what on each. Only what the crew's site attributes. */
export type Big = { name: string; slug?: string; what: string; parts: { who: Member["id"][] | "crew"; did: string }[] };
export const BIG: Big[] = [
  {
    name: "Trofficient", slug: "trofficient", what: "Transit technology for Ghana's tro-tro routes. Commuter and driver apps on the App Store; Android in closed testing.",
    parts: [
      { who: ["leslie"], did: "Founded it, dropped the first working demo into the chat, and runs the backend and the store releases." },
      { who: ["joyce"], did: "Booked the first real ride, and wrote the game plan for the Ministry of Transport visit." },
      { who: ["joyce", "leslie"], did: "Presented it at the Ministry of Transport on 7 October 2026." },
      { who: ["leslie", "elton"], did: "Met the Metro Mass directors on 1 June 2026." },
      { who: "crew", did: "Load-tested it together on 27 March, all four of us at once." },
    ],
  },
  {
    name: "Beagine", slug: "beagine", what: "Find, book and track verified engineering professionals. Beagine for customers and Beagine Pro for specialists, both on the App Store.",
    parts: [
      { who: ["elton"], did: "Co-founder. Interfaces and mobile, mostly in Expo and React Native." },
      { who: ["leslie"], did: "CTO. The technical direction, the architecture and the shared backend, plus deploys and releases." },
      { who: ["joyce", "leslie"], did: "Presented it with Trofficient at the Ministry of Transport." },
      { who: "crew", did: "Beagine and Beagine Pro went live on the App Store on 7 July 2026." },
    ],
  },
  {
    name: "UniCliq and Campus Connect", slug: "campus-connect", what: "The social hub for university students: from a naming session to a working build in about a week, then web, then TestFlight.",
    parts: [
      { who: ["elton"], did: "Designed the UniCliq logo." },
      { who: "crew", did: "Built in about a week, live on the web on 5 November 2025, then into TestFlight as Campus Connect." },
    ],
  },
  {
    name: "Sellis Beauty Spa", what: "The crew's first paid client: a live website, in use by the client.",
    parts: [
      { who: ["joyce"], did: "Landed the client on 30 March 2026." },
      { who: "crew", did: "Live since 7 May 2026, and in use by the client." },
    ],
  },
  {
    name: "Skill Academy", what: "Coding, robotics and AI for schools in Accra. The site is live, and the first workshop ran at De-Masters Academy on 23 October 2026.",
    parts: [
      { who: "crew", did: "The site went up on 30 September 2026. The first workshop followed on two Arduino kits, for JHS 1 to 3." },
    ],
  },
];

/** Dated receipts, straight from the crew's Track record page. */
export const RECEIPTS = [
  { n: "21", l: "projects on the crew's board, 12 of them live" },
  { n: "4", l: "apps on the App Store" },
  { n: "1", l: "school workshop, and counting" },
  { n: "4", l: "people, no boss" },
];

export const HOUSE_RULES = [
  { t: "No boss. Whoever is closest takes the lead.", b: "There are no fixed titles. Whoever is closest to the problem leads it, and on the next project it is someone else." },
  { t: "100 each.", b: "That is the whole story behind the name, and it is still the deal." },
  { t: "ELK.", b: "Execute, Learn and Keep growing. Selorm coined it, and it stuck." },
  { t: "Show a working product.", b: "We are not pitching random app ideas. We are presenting working products." },
];
