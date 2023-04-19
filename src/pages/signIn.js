import { useEffect, useState } from "react";
import styles from "@/styles/pages/signin.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

import {
  GOOGLE_SIGNIN_MESSAGE,
  GUEST_SIGNIN_MESSAGE,
} from "../constants/message";
import {
  LOGO_IMG_PATH,
  LOGO_ALT,
  GOOGLE_LOGO_IMG_PATH,
  GOOGLE_LOGO_ALT,
} from "../constants/img";

export default function signin() {
  const [signinMessage, setSigninMessage] = useState("");
  const { session } = useSession();

  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

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
            onClick={handleGoogleSignin}
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
