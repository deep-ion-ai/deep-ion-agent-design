import { PostMeta } from "../components/PostMeta";
import { SubscribeForm } from "../components/SubscribeForm";
import { ArticleCard } from "../components/ArticleCard";
import { TagRow } from "../components/Tag";
import { Avatar } from "../components/Avatar";
import { CodeBlock } from "../components/CodeBlock";
import { Photo } from "../components/Photo";
import { Diagram } from "../components/Diagram";
import {
  TableOfContentsInline,
  TableOfContentsSidebar,
  type TocEntry,
} from "../components/TableOfContents";
import {
  Prose,
  Measure,
  Wide,
  P,
  Lede,
  A,
  H,
  UL,
  LI,
  Quote,
  PullQuote,
  Figure,
  Code,
  Callout,
  Table,
} from "../components/Prose";
import { ARTICLES, AUTHOR } from "../content";

// Visual reference implementation of patterns/article.md.
// Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The rule this page exists to demonstrate: NOTHING is inserted into the
// reading column. No subscribe form between paragraphs, no related block
// "after the third paragraph", no overlay. Everything the site wants from
// the reader waits until the article has ended.

const TOC: TocEntry[] = [
  { id: "what-the-sweep-costs", label: "What the sweep costs", level: 2 },
  { id: "two-numbers-not-one", label: "Two numbers, not one", level: 2 },
  { id: "measuring-in-characters", label: "Measuring in characters", level: 3 },
  { id: "what-may-break-out", label: "What may break out", level: 2 },
  { id: "setting-it-in-code", label: "Setting it in code", level: 2 },
  { id: "where-this-goes-wrong", label: "Where this goes wrong", level: 2 },
];

export function Article({ onNavigate }: { onNavigate: (href: string) => void }) {
  const meta = ARTICLES[0];
  const related = ARTICLES.slice(1, 4);

  return (
    <>
      <article>
        {/* Article header — at the reading measure, opened by spacing.24 */}
        <header className="pt-24">
          <Measure>
            <h1 className="font-ui text-h1 font-bold leading-display tracking-tight text-text-primary sm:text-display">
              {meta.title}
            </h1>
            <div className="mt-6">
              <Lede>
                Every line of text you set asks the reader to find the start of
                the next one. Make the line long enough and they start missing.
              </Lede>
            </div>
            <PostMeta
              author={AUTHOR}
              dateTime={meta.dateTime}
              dateLabel={meta.dateLabel}
              readingTime={meta.readingTime}
              tags={meta.tags}
            />
          </Measure>
        </header>

        {/* The cover. Square corners and no frame, per
            foundations/imagery.md, and eagerly loaded because it is
            this page's largest contentful paint. */}
        {meta.cover && (
          <div className="mt-12">
            <Wide>
              <Photo
                name={meta.cover}
                aspect="21x9"
                alt=""
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
              />
            </Wide>
          </div>
        )}

        {/* The sidebar sits in the margin at lg and above WITHOUT
            narrowing the measure — the grid's centre column is the
            measure, and the rail is outside it. */}
        <div className="mx-auto mt-12 max-w-page px-4 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)_14rem] lg:gap-8">
          <aside className="hidden lg:block">
            <TableOfContentsSidebar entries={TOC} />
          </aside>

          <div className="min-w-0">
            <div className="mx-auto max-w-prose lg:px-0">
              <TableOfContentsInline entries={TOC} />
            </div>

            <Prose>
              <Measure>
                <P>
                  A reader's eye does not glide along a line of text. It moves in
                  short jumps, and at the end of each line it makes one long jump
                  back to the beginning of the next — the return sweep. That jump
                  is the only one in reading that is not guided by the words
                  themselves, and it is the one that goes wrong.
                </P>
                <P>
                  The longer the line, the further the sweep, and the more often
                  it lands on the line just read or the one after the target.
                  Readers rarely notice this happening. They notice only that the
                  page is tiring.
                </P>
              </Measure>

              <Measure>
                <H level={2} id="what-the-sweep-costs">
                  What the sweep costs
                </H>
                <P>
                  A re-read costs a fraction of a second and a small amount of
                  attention. On one line that is nothing. Over a two-thousand-word
                  article it is the difference between finishing and leaving, and
                  it is spent before the reader has formed any opinion about what
                  you wrote.
                </P>
                <Callout severity="info" label="Note">
                  This is not a stylistic preference. WCAG's{" "}
                  <A href="#">Visual Presentation</A> criterion asks for a line
                  length limit for exactly this reason, and it matters most to
                  readers with dyslexia or low vision.
                </Callout>
              </Measure>

              <PullQuote>
                The measure is not a design flourish. It is the width at which
                the reader stops paying a tax on every line.
              </PullQuote>

              <Measure>
                <H level={2} id="two-numbers-not-one">
                  Two numbers, not one
                </H>
                <P>
                  Line length is usually discussed alone, which is why the advice
                  so often fails. Measure and leading are{" "}
                  <strong>one decision</strong>: a narrower column can take
                  tighter leading, and a wider one needs more, because leading is
                  what helps the eye find the right line to land on.
                </P>
                <UL>
                  <LI>Set the measure first, from the size of the body text.</LI>
                  <LI>Then set the leading to suit that measure.</LI>
                  <LI>Changing either one later means revisiting the other.</LI>
                </UL>

                <H level={3} id="measuring-in-characters">
                  Measuring in characters
                </H>
                <P>
                  Measure is counted in characters, not pixels, because it is a
                  property of the text rather than of the screen. The same{" "}
                  <Code>34rem</Code> column holds a different number of characters
                  at a different type size — which is why the constraint has to be
                  expressed relative to the font, and why setting it in{" "}
                  <Code>px</Code> quietly breaks for any reader who has changed
                  their default size.
                </P>
              </Measure>

              <Table
                caption="Comfortable leading by measure, at a 19px serif."
                head={["Measure", "Characters", "Leading"]}
                rows={[
                  ["28rem", "≈ 55", "1.55"],
                  ["34rem", "≈ 68", "1.70"],
                  ["42rem", "≈ 84", "1.85 — and already too wide"],
                ]}
              />

              <Measure>
                <H level={2} id="what-may-break-out">
                  What may break out
                </H>
                <P>
                  The measure binds <em>text</em>. Things that are looked at
                  rather than read line by line — figures, code samples, tables,
                  pull quotes — may widen past it, and letting them do so is what
                  gives an article page its rhythm.
                </P>
              </Measure>

              <Figure caption="The text column stays put; the figure widens around it. That alternation is one of the few structural rhythms a page with no shadows has.">
                <Diagram
                  aspect="aspect-[16/7]"
                  // Informative, not decorative, so it states what it
                  // SHOWS. Note that the alt and the caption say
                  // different things — the caption is about how the
                  // figure behaves on the page, the alt about what is
                  // drawn. foundations/imagery.md keeps the two apart.
                  alt="A narrow column of text interrupted by a block running wider than the column on both sides."
                />
              </Figure>

              <Measure>
                <H level={2} id="setting-it-in-code">
                  Setting it in code
                </H>
                <P>
                  Expressed as a token, the measure stops being a number somebody
                  remembers and becomes a value every component reads:
                </P>
              </Measure>

              <CodeBlock
                language="css"
                highlightLines={[3]}
                code={`.prose {
  font-size: var(--font-size-prose);
  max-width: var(--font-measure-prose);
  line-height: var(--font-line-height-prose);
}`}
              />

              <Measure>
                <H level={2} id="where-this-goes-wrong">
                  Where this goes wrong
                </H>
                <P>
                  Almost always in the same way: a sidebar arrives, the column is
                  narrowed to make room for it, and the measure quietly becomes
                  whatever is left over. The rule worth holding is that the
                  reading column is fixed and everything else negotiates around
                  it.
                </P>
                <Quote cite="Robert Bringhurst, The Elements of Typographic Style">
                  Anything from 45 to 75 characters is widely regarded as a
                  satisfactory length of line for a single-column page.
                </Quote>
                <P>
                  That range has survived the move from paper to screen largely
                  intact, which is unusual for typographic advice, and is a good
                  reason to take it seriously. See also{" "}
                  <A href="#/">the rest of this demo publication</A>.
                </P>
              </Measure>
            </Prose>
          </div>

          <div className="hidden lg:block" />
        </div>
      </article>

      {/* Article footer — everything the site wants, AFTER the prose has
          closed, in the order patterns/article.md sets: most about this
          article first, most about the site last. */}
      <div className="mx-auto max-w-page px-4">
        <div className="mx-auto max-w-prose">
          <div className="mt-24 border-t border-surface-rule pt-8">
            <TagRow tags={meta.tags} />
          </div>

          <div className="mt-16 flex items-start gap-6">
            <Avatar name={AUTHOR.name} size="lg" />
            <div>
              <p className="font-ui text-base font-semibold text-text-primary">{AUTHOR.name}</p>
              <p className="mt-1 font-ui text-sm text-text-secondary">
                Writes about typography, reading and the parts of interface design
                that only show up over a thousand words.
              </p>
            </div>
          </div>

          <nav aria-label="Adjacent articles" className="mt-16 border-t border-surface-rule pt-8">
            <a
              href={`#/articles/${ARTICLES[1].slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`#/articles/${ARTICLES[1].slug}`);
              }}
              className="group block"
            >
              <span className="font-ui text-xs uppercase tracking-wide text-text-secondary">
                Next article
              </span>
              <span className="mt-1 block font-ui text-h3 font-semibold text-text-primary transition-colors duration-state ease-standard group-hover:text-accent-base">
                {ARTICLES[1].title}
              </span>
            </a>
          </nav>

          <div className="mt-16">
            <SubscribeForm />
          </div>
        </div>

        <section aria-labelledby="related" className="mt-24">
          <h2 id="related" className="font-ui text-h3 font-semibold text-text-primary">
            Related articles
          </h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard
                  headingLevel={3}
                  title={a.title}
                  href={`#/articles/${a.slug}`}
                  excerpt={a.excerpt}
                  dateTime={a.dateTime}
                  dateLabel={a.dateLabel}
                  readingTime={a.readingTime}
                  cover={a.cover}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
