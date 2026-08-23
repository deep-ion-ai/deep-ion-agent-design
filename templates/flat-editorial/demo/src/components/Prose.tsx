import type { ReactNode } from "react";
import { Link2, ICON_STROKE, iconSize } from "./icons";
import { focusRing } from "./focus";

// Visual reference implementation of specs/prose.md — the component this
// whole template exists for. Demo scaffolding only — see ../../README.md
// and /AGENTS.md.
//
// Prose is a STYLING CONTRACT over content the component does not
// control. In a real project the elements below arrive from a Markdown
// or MDX renderer; here they are composed by hand so every one of them
// is visible in the demo. What matters is that each is styled, because
// an author will eventually use it.

/** The reading column. Everything is capped here except the elements
 *  that may break out — see Wide. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="font-body text-prose leading-prose text-text-primary">
      {children}
    </div>
  );
}

/** The measure binds TEXT. Figures, code, tables and pull quotes are
 *  scanned rather than read line by line, so they widen to
 *  font.measure.wide — and that alternation is one of the few
 *  structural rhythms a flat page has (foundations/typography.md). */
export function Measure({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-prose px-4">{children}</div>;
}

export function Wide({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-wide px-4">{children}</div>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mb-prose-block">{children}</p>;
}

/** The article's opening paragraph, opt-in per article — applying it
 *  automatically produces a lede on articles whose first sentence was
 *  not written as one. */
export function Lede({ children }: { children: ReactNode }) {
  // font-body explicitly: the standfirst sits in the article HEADER,
  // outside the <Prose> wrapper that otherwise supplies the serif. It is
  // reading matter, so foundations/typography.md's split gives it the
  // serif by that test rather than by where it sits on the page —
  // patterns/article.md says so.
  return (
    <p className="mb-prose-block font-body text-lg leading-prose text-text-secondary">
      {children}
    </p>
  );
}

/** Links in body copy are ALWAYS underlined, not on hover. Colour alone
 *  does not distinguish a link for a reader who cannot perceive the hue,
 *  and inside a paragraph there is no other cue. specs/prose.md does not
 *  permit removing it. */
export function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={`text-accent-base underline decoration-from-font underline-offset-2 transition-colors duration-state ease-standard hover:text-accent-strong ${focusRing}`}
    >
      {children}
    </a>
  );
}

/** Level comes from position in the document, size from the scale — the
 *  two are separate decisions (foundations/typography.md). This renders
 *  h2/h3/h4; an h1 never appears inside prose. */
export function H({
  level,
  id,
  children,
}: {
  level: 2 | 3 | 4;
  id: string;
  children: string;
}) {
  const Tag = `h${level}` as "h2";
  const size = { 2: "text-h2", 3: "text-h3", 4: "text-h4" }[level];
  return (
    <Tag
      id={id}
      // Asymmetric by design: the space above is several times the space
      // below, so the heading belongs to the text that FOLLOWS it. On a
      // flat page that grouping has to be made by space.
      className={`group mt-prose-heading-top mb-prose-heading-bottom scroll-mt-8 font-ui font-semibold leading-tight tracking-tight ${size}`}
      tabIndex={-1}
    >
      {children}
      <a
        href={`#${id}`}
        // Names its section: a page of identical "Link" controls is
        // useless in a screen reader's list.
        aria-label={`Link to section: ${children}`}
        className={`ml-2 inline-block align-middle text-text-secondary opacity-0 transition-opacity duration-state ease-standard focus-visible:opacity-100 group-hover:opacity-100 ${focusRing}`}
      >
        <Link2 aria-hidden strokeWidth={ICON_STROKE} className={iconSize.sm} />
      </a>
    </Tag>
  );
}

/** Markers are typographic, never icons from foundations/iconography.md,
 *  and sit outside the text block so the text edge stays flush with the
 *  paragraphs above and below. */
export function UL({ children }: { children: ReactNode }) {
  return <ul className="mb-prose-block list-outside list-disc space-y-2 pl-6">{children}</ul>;
}

export function OL({ children }: { children: ReactNode }) {
  return <ol className="mb-prose-block list-outside list-decimal space-y-2 pl-6">{children}</ol>;
}

export function LI({ children }: { children: ReactNode }) {
  return <li className="pl-1">{children}</li>;
}

/** Someone else's words. Not centred, not enlarged: a quotation is still
 *  reading matter. */
export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <blockquote className="mb-prose-block border-l-2 border-accent-base pl-6 italic">
      {children}
      {cite && <footer className="mt-2 font-ui text-sm not-italic text-text-secondary">— {cite}</footer>}
    </blockquote>
  );
}

/** THIS article's own words, repeated for emphasis — a different element
 *  from Quote, and aria-hidden because it duplicates text that already
 *  exists in the article. */
export function PullQuote({ children }: { children: string }) {
  return (
    <Wide>
      <p
        aria-hidden
        className="my-12 bg-accent-wash p-8 font-ui text-lg font-medium leading-tight text-text-primary"
      >
        {children}
      </p>
    </Wide>
  );
}

/** A figure may break out; its caption stays at the text column's width,
 *  which keeps it readable and visibly subordinate. The alt text and the
 *  caption are different things (foundations/imagery.md). */
export function Figure({
  children,
  caption,
}: {
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-12">
      <Wide>{children}</Wide>
      {caption && (
        <figcaption className="mx-auto mt-3 max-w-prose px-4 font-ui text-sm text-text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-sm bg-chrome-code-bg px-1 py-0.5 font-mono text-[0.9em]">
      {children}
    </code>
  );
}

/** Severity is carried by the LABEL text, not by the edge colour: a
 *  coloured rule is not read. Static content, so no live-region role. */
export function Callout({
  severity = "info",
  label,
  children,
}: {
  severity?: "info" | "warning" | "success" | "danger";
  label: string;
  children: ReactNode;
}) {
  const edge = {
    info: "border-status-info",
    warning: "border-status-warning",
    success: "border-status-success",
    danger: "border-status-danger",
  }[severity];
  return (
    <aside className={`mb-prose-block border-l-2 bg-surface-muted p-6 ${edge}`}>
      <p>
        <strong className="font-ui font-semibold">{label}:</strong> {children}
      </p>
    </aside>
  );
}

/** Breaks out to font.measure.wide and scrolls inside its own container
 *  rather than forcing the page to. Numerals are tabular. */
export function Table({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <Wide>
      <div className="my-12 overflow-x-auto">
        <table className="tabular w-full border-collapse font-ui text-sm">
          <caption className="mb-3 text-left text-sm text-text-secondary">{caption}</caption>
          <thead>
            <tr className="bg-surface-sunken">
              {head.map((h) => (
                <th key={h} scope="col" className="px-3 py-3 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-surface-rule">
                {r.map((c, j) => (
                  <td key={j} className="px-3 py-3">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wide>
  );
}

/** A section break, used sparingly. */
export function Rule() {
  return <hr className="mx-auto my-12 max-w-prose border-0 border-t border-surface-rule" />;
}
