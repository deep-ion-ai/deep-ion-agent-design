import { Rss, ICON_STROKE, iconSize } from "./icons";
import { SubscribeForm } from "./SubscribeForm";
import { focusRing } from "./focus";

// Visual reference implementation of specs/site-footer.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The footer is where this template puts what the header deliberately
// refuses: a reader who has scrolled to the bottom of an article is
// finished with it and is available for something else.

const COLUMNS = [
  { title: "Writing", links: ["Archive", "Topics", "Newsletter"] },
  { title: "Elsewhere", links: ["Mastodon", "GitHub"] },
];

export function SiteFooter({ withSubscribe = false }: { withSubscribe?: boolean }) {
  return (
    <footer className="mt-24 border-t border-surface-rule bg-surface-sunken">
      <div className="mx-auto max-w-page px-4 py-16">
        {withSubscribe && (
          <div className="mb-16 max-w-wide">
            <SubscribeForm inline />
          </div>
        )}

        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <p className="max-w-prose font-ui text-sm text-text-secondary">
            The Measure is a demo publication, rendered from the Flat Editorial
            template's specs so a human can see the identity before choosing it.
            Nothing here is a real article.
          </p>

          {/* Its own accessible name, distinct from the header's "Main":
              two identically-named landmarks are worse than one. */}
          <nav aria-label="Footer" className="flex gap-12">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                {/* A real heading — what makes the columns navigable
                    rather than one long list of links. */}
                <h2 className="mb-3 font-ui text-xs uppercase tracking-wide text-text-secondary">
                  {col.title}
                </h2>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className={`font-ui text-sm text-text-primary transition-colors duration-state ease-standard hover:text-accent-base ${focusRing}`}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-6 border-t border-surface-rule pt-6">
          {/* Names the format: "Feed" alone is ambiguous. */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className={`inline-flex items-center gap-2 font-ui text-xs text-text-secondary transition-colors duration-state ease-standard hover:text-accent-base ${focusRing}`}
          >
            <Rss aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
            RSS feed
          </a>
          <p className="font-ui text-xs text-text-secondary">
            © 2026 The Measure — a demo, not a real publication.
          </p>
        </div>
      </div>
    </footer>
  );
}
