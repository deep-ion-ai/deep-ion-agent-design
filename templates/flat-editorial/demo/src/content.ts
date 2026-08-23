import type { TagProps } from "./components/Tag";

// Sample content for the demo feed. Demo scaffolding only — see
// ../README.md and /AGENTS.md.
//
// The articles are about typography and reading because that is what
// this template is for: a blog demo filled with lorem ipsum shows the
// layout but none of the thing the identity is actually built around.
// Only the first entry has a body; the rest exist so the feed and the
// pagination have something real to lay out.

export interface FeedItem {
  slug: string;
  title: string;
  excerpt: string;
  dateTime: string;
  dateLabel: string;
  readingTime: string;
  cover?: { hue: number; label: string };
  tags: TagProps[];
}

const tag = (label: string): TagProps => ({
  label,
  href: `#/topics/${label.toLowerCase().replace(/\s+/g, "-")}`,
});

export const ARTICLES: FeedItem[] = [
  {
    slug: "the-return-sweep",
    title: "The return sweep: why line length decides whether people read you",
    excerpt:
      "A column of text wider than about 75 characters costs the reader something on every single line. Here is what it costs, and why the fix is two numbers rather than one.",
    dateTime: "2026-03-14",
    dateLabel: "14 March 2026",
    readingTime: "7 min read",
    cover: { hue: 264, label: "Typography" },
    tags: [tag("Typography"), tag("Reading")],
  },
  {
    slug: "flat-is-not-featureless",
    title: "Flat is not featureless",
    excerpt:
      "Removing shadows does not remove hierarchy — it moves the job to rules, surface steps and whitespace. Most flat designs fail because nobody reassigned the work.",
    dateTime: "2026-02-27",
    dateLabel: "27 February 2026",
    readingTime: "5 min read",
    cover: { hue: 190, label: "Design" },
    tags: [tag("Design")],
  },
  {
    slug: "dark-mode-is-not-inversion",
    title: "Dark mode is not an inversion",
    excerpt:
      "The accent that reads beautifully on white is frequently unreadable on near-black, and the token that means 'high contrast' changes which end of the scale it lives at.",
    dateTime: "2026-02-11",
    dateLabel: "11 February 2026",
    readingTime: "6 min read",
    tags: [tag("Design"), tag("Accessibility")],
  },
  {
    slug: "underline-your-links",
    title: "Underline your links",
    excerpt:
      "Inside a paragraph there is no shape, no position and no surrounding chrome to tell a link from the words around it. Colour alone is not enough, and never was.",
    dateTime: "2026-01-30",
    dateLabel: "30 January 2026",
    readingTime: "3 min read",
    cover: { hue: 24, label: "Accessibility" },
    tags: [tag("Accessibility")],
  },
  {
    slug: "the-serif-sans-split",
    title: "One serif, one sans, and a rule about which goes where",
    excerpt:
      "Two families is not decoration if each has a job. The split works when a reader can tell at a glance what is the article and what is the site around it.",
    dateTime: "2026-01-16",
    dateLabel: "16 January 2026",
    readingTime: "4 min read",
    tags: [tag("Typography")],
  },
  {
    slug: "space-above-the-heading",
    title: "Put the space above the heading",
    excerpt:
      "A heading belongs to the text that follows it. Symmetrical spacing leaves it floating between two sections, and readers feel the ambiguity without being able to name it.",
    dateTime: "2025-12-19",
    dateLabel: "19 December 2025",
    readingTime: "3 min read",
    cover: { hue: 140, label: "Typography" },
    tags: [tag("Typography"), tag("Design")],
  },
  {
    slug: "reading-time-is-a-guess",
    title: "Reading time is a guess, so word it like one",
    excerpt:
      "Word-count estimates are routinely wrong for anything with code in it. That is fine — as long as the label admits it.",
    dateTime: "2025-12-04",
    dateLabel: "4 December 2025",
    readingTime: "2 min read",
    tags: [tag("Writing")],
  },
  {
    slug: "the-quiet-header",
    title: "The quiet header",
    excerpt:
      "On an article page every pixel of chrome is taken from the reading surface. The best thing a site header can do is be forgettable.",
    dateTime: "2025-11-21",
    dateLabel: "21 November 2025",
    readingTime: "4 min read",
    cover: { hue: 300, label: "Design" },
    tags: [tag("Design")],
  },
  {
    slug: "against-the-scroll-fade",
    title: "Against the scroll-triggered fade-in",
    excerpt:
      "It delays reading, breaks find-in-page, and behaves unpredictably when someone scrolls back up. It is a flourish that costs the reader and pays the designer.",
    dateTime: "2025-11-07",
    dateLabel: "7 November 2025",
    readingTime: "3 min read",
    tags: [tag("Design"), tag("Accessibility")],
  },
];

export const AUTHOR = { name: "Jane Cooper", href: "#/authors/jane-cooper" };

export const PAGE_SIZE = 6;
