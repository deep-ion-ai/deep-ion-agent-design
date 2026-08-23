import { Photo, type PhotoName } from "./Photo";
import { PostMeta } from "./PostMeta";
import { TagRow, type TagProps } from "./Tag";
import { focusRing } from "./focus";

// Visual reference implementation of specs/article-card.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// A card is NOT a small article: its excerpt is UI text in the sans
// family, not prose, and its title is not the page's heading level.

export interface ArticleCardProps {
  title: string;
  href: string;
  excerpt?: string;
  dateTime: string;
  dateLabel: string;
  readingTime?: string;
  /** Optional and must be: many good articles have no cover, and a feed
   *  that renders a placeholder rectangle for them looks broken. */
  cover?: PhotoName;
  tags?: TagProps[];
  layout?: "stacked" | "horizontal";
  /** The feed's lead card is above the fold, so its photograph is the
   *  one in the grid that must not be lazy-loaded. */
  priority?: boolean;
  /** h2 under a page h1; h3 if the grid sits under a section heading. */
  headingLevel?: 2 | 3;
  onNavigate: (href: string) => void;
}

export function ArticleCard({
  title,
  href,
  excerpt,
  dateTime,
  dateLabel,
  readingTime,
  cover,
  tags,
  layout = "stacked",
  priority = false,
  headingLevel = 2,
  onNavigate,
}: ArticleCardProps) {
  const Heading = `h${headingLevel}` as "h2";
  const horizontal = layout === "horizontal";

  return (
    // Equal height with the meta pinned to the bottom, so a row of cards
    // with different excerpt lengths does not leave the dates ragged.
    <article
      className={`group relative flex h-full flex-col rounded border border-surface-rule bg-surface-canvas p-card-padding ${
        horizontal ? "md:flex-row md:items-start md:gap-6" : ""
      }`}
    >
      {cover && (
        <div className={horizontal ? "mb-4 md:mb-0 md:w-2/5 md:shrink-0" : "mb-4"}>
          {/* Decorative here: the headline beside it already names the
              article, so announcing the photograph too would read the
              reader the same thing twice (foundations/imagery.md).
              radius.lg per the card's Anatomy. */}
          <Photo
            name={cover}
            alt=""
            priority={priority}
            // The box this renders into, at each breakpoint, so the
            // browser fetches the right file rather than the largest.
            sizes={
              horizontal
                ? "(min-width: 768px) 26rem, 92vw"
                : "(min-width: 1024px) 21rem, (min-width: 640px) 45vw, 92vw"
            }
            className="rounded-lg"
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Heading className="font-ui text-h3 font-semibold leading-tight text-text-primary">
          {/* ONE link, ONE tab stop. The overlay below extends the
              clickable area to the whole card without adding a second
              link — specs/article-card.md. */}
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(href);
            }}
            className={`transition-colors duration-state ease-standard group-hover:text-accent-base ${focusRing} after:absolute after:inset-0 after:content-['']`}
          >
            {title}
          </a>
        </Heading>

        {excerpt && (
          <p className="mt-3 line-clamp-3 font-ui text-base text-text-secondary">{excerpt}</p>
        )}

        <div className="mt-auto pt-4">
          <PostMeta variant="card" dateTime={dateTime} dateLabel={dateLabel} readingTime={readingTime} />
        </div>

        {/* Tags lead somewhere else, so they sit ABOVE the overlay in
            stacking order rather than being swallowed by the card link. */}
        {tags && tags.length > 0 && (
          <div className="relative z-10 mt-4">
            <TagRow tags={tags} />
          </div>
        )}
      </div>
    </article>
  );
}
