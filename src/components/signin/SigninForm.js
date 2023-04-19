import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "@/styles/components/SigninForm.module.css";
import { useRouter } from "next/router";

import {
  GOOGLE_SIGNIN_MESSAGE,
  GUEST_SIGNIN_MESSAGE,
} from "@/constants/message";
import { GOOGLE_LOGO_IMG_PATH, GOOGLE_LOGO_ALT } from "@/constants/img";
import { CALLBACK_URL } from "@/constants/url";

export default function SigninForm() {
  const [signinMessage, setSigninMessage] = useState("");
  const router = useRouter();

  async function handleGoogleSignin() {
    const result = signIn("google", { callbackUrl: CALLBACK_URL });
  }

  function handleGuestSignin() {
    router.push("/editor");
  }

  return (
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
        onClick={handleGuestSignin}
      >
        guest
      </button>
      <div className={styles.message}>{signinMessage}</div>
    </form>
  );
}
