import { useState } from "react";
import { ArticleCard } from "../components/ArticleCard";
import { Pagination } from "../components/Pagination";
import { SubscribeForm } from "../components/SubscribeForm";
import { ARTICLES, PAGE_SIZE } from "../content";

// Visual reference implementation of patterns/home-feed.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// This page's job is TRIAGE, not reading — which is why
// font.measure.prose does not apply here and the layout is a grid.

export function HomeFeed({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil((ARTICLES.length - 1) / PAGE_SIZE);

  // The lead article sits OUTSIDE the grid, which is what makes it read
  // as deliberate rather than as an inconsistent card.
  const [lead, ...rest] = ARTICLES;
  const start = (page - 1) * PAGE_SIZE;
  const shown = rest.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-page px-4 py-16">
      <h1 className="sr-only">The Measure — latest articles</h1>

      {page === 1 && (
        <div className="mb-12">
          <ArticleCard
            layout="horizontal"
            priority
            title={lead.title}
            href={`#/articles/${lead.slug}`}
            excerpt={lead.excerpt}
            dateTime={lead.dateTime}
            dateLabel={lead.dateLabel}
            readingTime={lead.readingTime}
            cover={lead.cover}
            tags={lead.tags}
            onNavigate={onNavigate}
          />
        </div>
      )}

      {/* A list, so assistive tech announces how many articles are here. */}
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <li key={a.slug}>
            <ArticleCard
              title={a.title}
              href={`#/articles/${a.slug}`}
              excerpt={a.excerpt}
              dateTime={a.dateTime}
              dateLabel={a.dateLabel}
              readingTime={a.readingTime}
              // Articles with no cover sit in the SAME grid, in the
              // Text-only variant — no placeholder rectangles.
              cover={a.cover}
              tags={a.tags}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>

      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />

      <div className="mx-auto mt-24 max-w-wide">
        <SubscribeForm inline />
      </div>
    </div>
  );
}
