import React from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Meshwary home">
        <img
          className="brand-logo"
          src="/assets/meshwary-logo.png"
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

function App() {
  return (
    <>
      <Header />
      <main className="page-shell" />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
