import { useState } from "react";
import styles from "@/styles/pages/signin.module.css";

const LOGO_IMG_PATH = "/logo.png";
const LOGO_ALT = "MDXSlide logo";
const GOOGLE_LOGO_IMG_PATH = "/google.png";
const GOOGLE_LOGO_ALT = "google logo";

const GOOGLE_SIGNIN_MESSAGE = "📌 구글 이메일로 로그인하려고 해요.";
const GUEST_SIGNIN_MESSAGE =
  "📌 로그인하지 않아도 이용이 가능해요!\n대신 슬라이드를 저장하기 위해선\n구글 로그인이 필요해요.";

export default function signin() {
  const [signinMessage, setSigninMessage] = useState("");

  return (
    <div className={styles.wrapper}>
      <section className={styles.leftBox}>
        <img className={styles.logo} src={LOGO_IMG_PATH} alt={LOGO_ALT}></img>
      </section>
      <section className={styles.rightBox}>
        <form className={styles.signin}>
          <h1>SIGN IN</h1>
          <button
            className={styles.googleBtn}
            type="button"
            onMouseOver={() => setSigninMessage(GOOGLE_SIGNIN_MESSAGE)}
          >
            <img
              className={styles.googleLogo}
              src={GOOGLE_LOGO_IMG_PATH}
              alt={GOOGLE_LOGO_ALT}
            />
            sign in google
          </button>
          <button
            className={styles.guestBtn}
            type="button"
            onMouseOver={() => setSigninMessage(GUEST_SIGNIN_MESSAGE)}
          >
            guest
          </button>
          <div className={styles.message}>{signinMessage}</div>
        </form>
      </section>
    </div>
  );
}
