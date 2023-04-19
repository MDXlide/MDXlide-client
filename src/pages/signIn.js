import styles from "@/styles/pages/signin.module.css";
import SigninForm from "@/components/signin/SigninForm";
import { getSession } from "next-auth/react";

import { LOGO_IMG_PATH, LOGO_ALT } from "../constants/img";

export default function signin({ session }) {
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

export async function getSeverSideProps({ req }) {
  const session = await getSession({ req });

  if (session) return { redirect: { destination: "/", permanent: false } };

  return { props: { session } };
}
