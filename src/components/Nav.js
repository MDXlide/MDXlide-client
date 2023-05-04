import Link from "next/link";
import navStyles from "@/styles/Nav.module.css";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const { slideId } = router.query;

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
          <Link href="/">MYPAGE</Link>
        </li>
        <li>
          <Link href={`/play/${slideId}`} onClick={handleFullScreen}>
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
