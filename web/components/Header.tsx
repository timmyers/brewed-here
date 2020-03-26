import Link from 'next/link';
import { NextComponentType } from 'next';

const Header: NextComponentType = () => (
  <header>
    <nav>
      <a href="/"><img src="/logo.svg" /></a>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/privacy">
            <a>Privacy Policy</a>
          </Link>
        </li>
      </ul>
    </nav>
    <style jsx>{`
      img {
        width: 400px;
        max-width: 40vw;
      }
    `}</style>
  </header>
);

export default Header;
