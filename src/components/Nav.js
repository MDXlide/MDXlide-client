import Link from "next/link";
import navStyles from "@/styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">HOME</Link>
        </li>
        <li>
          <Link href="/play">Play</Link>
        </li>
        <li>
          <Link href="/full">Full</Link>
        </li>
        <li>
          <Link href="/share">Share</Link>
        </li>
      </ul>
      <div className="logo"></div>
    </nav>
  );
}
