import styles from "@/styles/pages/signin.module.css";
import SigninForm from "@/components/signin/SigninForm";

import { LOGO_IMG_PATH, LOGO_ALT } from "../constants/img";

export default function signin() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.leftBox}>
        <img className={styles.logo} src={LOGO_IMG_PATH} alt={LOGO_ALT}></img>
      </section>
      <section className={styles.rightBox}>
        <SigninForm />
      </section>
    </div>
  );
}
