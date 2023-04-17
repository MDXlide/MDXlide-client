import styles from "@/styles/pages/signin.module.css";

const LOGO_IMG_PATH = "/logo.png";
const LOGO_ALT = "logo";
const GOOGLE_LOGO_IMG_PATH = "/google.png";
const GOOGLE_LOGO_ALT = "google logo";

export default function signin() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.leftBox}>
        <img className={styles.logo} src={LOGO_IMG_PATH} alt={LOGO_ALT}></img>
      </section>
      <section className={styles.rightBox}>
        <form className={styles.signin}>
          <h1>SIGN IN</h1>
          <button type="button">
            <img
              className={styles.googleLogo}
              src={GOOGLE_LOGO_IMG_PATH}
              alt={GOOGLE_LOGO_ALT}
            />
            sign in google
          </button>
          <button>without sign in</button>
        </form>
      </section>
    </div>
  );
}
