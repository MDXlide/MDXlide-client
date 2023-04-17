import Link from "next/link";
import navStyles from "@/styles/Nav.module.css";

export default function Nav() {
  function handleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      return;
    }

    document.exitFullscreen();
  }

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">HOME</Link>
        </li>
        <li>
          <Link href="/play" onClick={handleFullScreen}>
            Play
          </Link>
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
