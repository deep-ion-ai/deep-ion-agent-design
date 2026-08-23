import { useEffect, useState } from "react";
import { SiteHeader, type NavItem } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { useTheme } from "./components/ThemeToggle";
import { HomeFeed } from "./pages/HomeFeed";
import { Article } from "./pages/Article";

// Demo scaffolding only — see ../README.md and /AGENTS.md.
//
// Two routes, matching the template's two patterns: the home feed and
// the article page. Hash routing, so the demo works from a static build
// with no server rewrites.

const NAV: NavItem[] = [
  { id: "home", label: "Latest", href: "#/" },
  { id: "article", label: "Article", href: `#/articles/the-return-sweep` },
  { id: "topics", label: "Topics", href: "#/topics" },
  { id: "about", label: "About", href: "#/about" },
];

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const { theme, setTheme } = useTheme();

  const navigate = (href: string) => {
    window.location.hash = href.startsWith("#") ? href.slice(1) : href;
    // A reader following a link expects the top of the new page, not the
    // scroll position of the old one.
    window.scrollTo({ top: 0 });
  };

  const onArticle = hash.startsWith("#/articles/");
  const currentId = onArticle ? "article" : hash === "#/" ? "home" : undefined;

  return (
    <div className="min-h-screen bg-surface-muted">
      <SiteHeader
        nav={NAV}
        currentId={currentId}
        onNavigate={navigate}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* The skip link in the header targets this. */}
      <main id="main" className={onArticle ? "bg-surface-canvas" : ""}>
        {onArticle ? <Article onNavigate={navigate} /> : <HomeFeed onNavigate={navigate} />}
      </main>

      <SiteFooter withSubscribe={false} />
    </div>
  );
}
