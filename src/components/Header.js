import Link from "next/link";
import navStyles from "@/styles/Header.module.css";

export default function Header() {
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
      <div></div>
    </nav>
  );
}
