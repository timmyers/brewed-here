import { NextComponentType } from 'next';
import Header from './Header';

const Layout: NextComponentType = props => (
  <>
    <Header />
    <main>
        { props.children }
    </main>
    <footer>
        <hr />
        <p>
          Made by <a href="https://twitter.com/timmmmyers" target="_blank">Tim Myers ↗</a>
        </p>
        <p>
          <span className="github"><img src="/github.svg" height="20"/></span>Open source on <a href="https://github.com/timmyers/brewed-here" target="_blank">GitHub ↗</a>
        </p>
    </footer>

    <style jsx>{`
      .github {
        top: 3px;
        position: relative;
        margin-right: 10px;
      }
    `}</style>
    <style jsx global>{`
      :root {
          --border-radius: 5px;
          --box-shadow: 2px 2px 10px;
          --color: #118bee;
          --color-accent: #118bee0b;
          --color-bg: #F7F0DE;
          --color-bg-secondary: #AF9594;
          --color-secondary: #7D6463;
          --color-secondary-accent: #920de90b;
          --color-shadow: #f4f4f4;
          --color-text: #000;
          --color-text-secondary: #999;
          --hover-brightness: 1.2;
          --justify-important: center;
          --justify-normal: left;
          --line-height: 150%;
          --width-card: 285px;
          --width-card-medium: 460px;
          --width-card-wide: 800px;
          --width-content: 1080px;
      }

      /* MVP.css v1.0 - by Andy Brewer */

      /* Layout */
      article aside {
          background: var(--color-secondary-accent);
          border-left: 4px solid var(--color-secondary);
          padding: 0.01rem 0.8rem;
      }

      body {
          background: var(--color-bg);
          color: var(--color-text);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
          line-height: var(--line-height);
          margin: 0;
          overflow-x: hidden;
          padding: 1rem 0;
      }

      footer,
      header,
      main {
          margin: 0 auto;
          max-width: var(--width-content);
          padding: 2rem 1rem;
      }

      hr {
          background-color: var(--color-bg-secondary);
          border: none;
          height: 1px;
          margin: 4rem 0;
      }

      section {
          display: flex;
          flex-wrap: wrap;
          justify-content: var(--justify-important);
      }

      section aside {
          border: 1px solid var(--color-bg-secondary);
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow) var(--color-shadow);
          margin: 1rem;
          padding: 1.25rem;
          width: var(--width-card);
      }

      section aside:hover {
          box-shadow: var(--box-shadow) var(--color-bg-secondary);
      }

      section aside img {
          max-width: 100%;
      }

      /* Headers */
      article header,
      div header,
      main header {
          padding-top: 0;
      }

      header {
          text-align: var(--justify-important);
      }

      header a b,
      header a em,
      header a i,
      header a strong {
          margin-left: 1rem;
          margin-right: 1rem;
      }

      header nav img {
          margin: 1rem 0;
      }

      section header {
          padding-top: 0;
          width: 100%;
      }

      /* Nav */
      nav {
          align-items: center;
          display: flex;
          font-weight: bold;
          justify-content: space-between;
          margin-bottom: 2rem;
      }

      nav ul {
          list-style: none;
          padding: 0;
      }

      nav ul li {
          display: inline-block;
          margin: 0 0.5rem;
      }

      /* Typography */
      code {
          display: inline-block;
          margin: 0 0.1rem;
          padding: 0rem 0.5rem;
      }

      code,
      samp {
          background-color: var(--color-accent);
          color: var(--color-text);
          border-radius: var(--border-radius);
          text-align: var(--justify-normal);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
          line-height: var(--line-height);
      }

      mark {
          padding: 0.1rem;
      }

      ol li,
      ul li {
          padding: 0.2rem 0;
      }

      p {
          margin: 0.75rem 0;
          padding: 0;
      }

      samp {
          display: block;
          margin: 1rem 0;
          max-width: var(--width-card-wide);
          padding: 1rem;
      }

      small {
          color: var(--color-text-secondary);
      }

      sup {
          background-color: var(--color-secondary);
          border-radius: var(--border-radius);
          color: var(--color-bg);
          font-size: xx-small;
          font-weight: bold;
          margin: 0.2rem;
          padding: 0.2rem 0.3rem;
          position: relative;
          top: -2px;
      }

      /* Links */
      a {
          color: var(--color-secondary);
          font-weight: bold;
          text-decoration: none;
      }

      a:hover {
          filter: brightness(var(--hover-brightness));
          text-decoration: underline;
      }

      a b,
      a em,
      a i,
      a strong,
      button {
          border-radius: var(--border-radius);
          display: inline-block;
          font-size: medium;
          font-weight: bold;
          margin: 1.5rem 0 0.5rem 0;
          padding: 1rem 2rem;
      }

      button:hover {
          cursor: pointer;
          filter: brightness(var(--hover-brightness));
      }

      a b,
      a strong,
      button {
          background-color: var(--color);
          border: 2px solid var(--color);
          color: var(--color-bg);
      }

      a em,
      a i {
          border: 2px solid var(--color);
          border-radius: var(--border-radius);
          color: var(--color);
          display: inline-block;
          padding: 1rem 2rem;
      }

      /* Images */
      figure {
          margin: 0;
          padding: 0;
      }

      figure figcaption {
          color: var(--color-text-secondary);
      }

      /* Forms */
      form {
          border: 1px solid var(--color-bg-secondary);
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow) var(--color-shadow);
          display: block;
          max-width: var(--width-card-wide);
          min-width: var(--width-card);
          padding: 1.5rem;
          text-align: var(--justify-normal);
      }

      form header {
          margin: 1.5rem 0;
          padding: 1.5rem 0;
      }

      input,
      label,
      select,
      textarea {
          display: block;
          font-size: inherit;
          max-width: var(--width-card-wide);
      }

      input,
      select,
      textarea {
          margin-bottom: 1rem;
      }

      input,
      textarea {
          border: 1px solid var(--color-bg-secondary);
          border-radius: var(--border-radius);
          padding: 0.4rem 0.8rem;
      }

      label {
          font-weight: bold;
          margin-bottom: 0.2rem;
      }

      /* Tables */
      table {
          border: 1px solid var(--color-bg-secondary);
          border-radius: var(--border-radius);
          border-spacing: 0;
          max-width: 100%;
          overflow: hidden;
          padding: 0;
      }

      table td,
      table th,
      table tr {
          padding: 0.4rem 0.8rem;
          text-align: var(--justify-important);
      }

      table thead {
          background-color: var(--color);
          border-collapse: collapse;
          border-radius: var(--border-radius);
          color: var(--color-bg);
          margin: 0;
          padding: 0;
      }

      table thead th:first-child {
          border-top-left-radius: var(--border-radius);
      }

      table thead th:last-child {
          border-top-right-radius: var(--border-radius);
      }

      table thead th:first-child,
      table tr td:first-child {
          text-align: var(--justify-normal);
      }

      /* Quotes */
      blockquote {
          display: block;
          font-size: x-large;
          line-height: var(--line-height);
          margin: 1rem auto;
          max-width: var(--width-card-medium);
          padding: 1.5rem 1rem;
          text-align: var(--justify-important);
      }

      blockquote footer {
          color: var(--color-text-secondary);
          display: block;
          font-size: small;
          line-height: var(--line-height);
          padding: 1.5rem 0;
      }

      /* Custom styles */
    `}</style>
  </>
);

export default Layout;
