import { Avatar } from "./Avatar";
import { TagRow, type TagProps } from "./Tag";

// Visual reference implementation of specs/post-meta.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.

export interface PostMetaProps {
  author?: { name: string; href?: string; src?: string };
  /** Machine-readable, e.g. "2026-03-14". */
  dateTime: string;
  /** Written out, never numeric-only: 03/04/2026 is two different days. */
  dateLabel: string;
  readingTime?: string;
  updatedLabel?: string;
  tags?: TagProps[];
  variant?: "article" | "card";
}

/** aria-hidden: announced, the separators produce
 *  "Jane Cooper middot 14 March 2026 middot 6 min read". */
function Dot() {
  return (
    <span aria-hidden className="px-2 text-text-secondary">
      ·
    </span>
  );
}

export function PostMeta({
  author,
  dateTime,
  dateLabel,
  readingTime,
  updatedLabel,
  tags,
  variant = "article",
}: PostMetaProps) {
  // The Card variant drops the avatar and tags: the author is usually the
  // same for every card in a feed, and tags would triple the card's height.
  const card = variant === "card";

  return (
    <div className="font-ui text-sm">
      <div className="flex flex-wrap items-center text-text-secondary">
        {!card && author && (
          <span className="mr-3 flex items-center gap-3">
            <Avatar name={author.name} src={author.src} size="sm" />
            {author.href ? (
              <a
                href={author.href}
                className="font-medium text-text-primary underline decoration-surface-rule underline-offset-2 hover:decoration-accent-base"
              >
                {author.name}
              </a>
            ) : (
              <span className="font-medium text-text-primary">{author.name}</span>
            )}
          </span>
        )}
        {!card && author && <Dot />}
        <time dateTime={dateTime}>{dateLabel}</time>
        {readingTime && (
          <>
            <Dot />
            {/* Worded as the estimate it is — specs/post-meta.md. */}
            <span>{readingTime}</span>
          </>
        )}
        {updatedLabel && !card && (
          <>
            <Dot />
            {/* Carries its own label rather than relying on position. */}
            <span>Updated {updatedLabel}</span>
          </>
        )}
      </div>

      {/* Tags sit on their own line: a row of pills inline with the
          separators reads as a broken sentence. */}
      {!card && tags && tags.length > 0 && (
        <div className="mt-2">
          <TagRow tags={tags} />
        </div>
      )}
    </div>
  );
}
