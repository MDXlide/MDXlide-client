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
          <Link href="/main">HOME</Link>
        </li>
        <li>
          <Link href="/play" onClick={handleFullScreen}>
            PLAY
          </Link>
        </li>
        <li>
          <Link href="/full">FULL</Link>
        </li>
      </ul>
      <div className="logo"></div>
    </nav>
  );
}
