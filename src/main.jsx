import React from "react";
import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <header className="site-header">
      <a className="brand" href={baseUrl} aria-label="Meshwary home">
        <img
          className="brand-logo"
          src={`${baseUrl}assets/meshwary-logo.png`}
          alt="Meshwary"
        />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`header-nav${isMenuOpen ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label="Primary navigation"
      >
        <a className="nav-link" href="#about">
          About Meshwary
        </a>
        <a className="get-link button button-primary" href="#get-meshwary">
          Get Meshwary
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const words = useMemo(() => ["Cost", "Way", "Route", "Fuel"], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(words[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  useEffect(() => {
    const activeWord = words[wordIndex];
    const isComplete = !isDeleting && letterCount === activeWord.length;
    const isEmpty = isDeleting && letterCount === 0;
    const delay = isComplete ? 1200 : isEmpty ? 260 : isDeleting ? 70 : 110;

    const timeoutId = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty) {
        setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
        setIsDeleting(false);
        return;
      }

      setLetterCount((currentCount) =>
        currentCount + (isDeleting ? -1 : 1),
      );
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [isDeleting, letterCount, wordIndex, words]);

  const typedWord = words[wordIndex].slice(0, letterCount);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url("${baseUrl}assets/hero-road.png")` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">
          Your Trip, Your{" "}
          <span className="hero-title-accent">
            {typedWord}
            <span className="hero-cursor" aria-hidden="true" />
          </span>
        </h1>
        <p className="hero-copy">
          No more worries about fuel costs, just open the app, find the
          shortest route, and save more on every trip.
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <Hero />
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
