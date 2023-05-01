import styles from "@/styles/pages/index.module.css";
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import axios from "axios";
import SlideItem from "@/components/index/SlideItem";
import ModalLayout from "@/components/modal/ModalLayout";
import { openModal } from "@/features/modalSlice";
import { LOGO_IMG_PATH, LOGO_ALT, PROFILE_IMG_ALT } from "../constants/img";
import { DEFAULT_SERVER_URL } from "@/constants/url";
import { useState } from "react";

const SLIDE_NAME_MODAL_MESSAGE = "새로 만들 슬라이드의 이름을 정해주세요.";

export default function index({ slides, session }) {
  const dispatch = useDispatch();
  const [allSlides, setAllSlides] = useState(slides);
  const { name, image } = session.user;
  const router = useRouter();

  function handleSignout() {
    signOut();
    router.push("/signin");
  }

  function handleNewSlide() {
    dispatch(openModal(true));
  }

  return (
    <>
      <ModalLayout title={SLIDE_NAME_MODAL_MESSAGE} type="input" />
      <header className={styles.header}>
        <img className={styles.logo} src={LOGO_IMG_PATH} alt={LOGO_ALT} />
        <button className={styles.logout} onClick={handleSignout}>
          SIGNOUT
        </button>
      </header>
      <main className={styles.main}>
        <section className={styles.leftBox}>
          <div className={styles.profile}>
            <span className={styles.name}>{name}</span>
            <img
              className={styles.profileImg}
              src={image}
              alt={PROFILE_IMG_ALT}
            />
          </div>
          <nav className={styles.nav}>
            <button className={styles.newSlideBtn} onClick={handleNewSlide}>
              new slide
            </button>
          </nav>
        </section>
        <section className={styles.rightBox}>
          {allSlides.map((slide) => (
            <SlideItem
              slide={slide}
              allSlides={allSlides}
              setAllSlides={setAllSlides}
              key={uuidv4()}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  let userId;
  let session;
  let slides;

  try {
    session = await getSession(context);
    if (!session)
      return { redirect: { destination: "/signin", permanent: false } };

    userId = session.id;
  } catch (err) {
    return {
      notFound: true,
    };
  }

  try {
    const result = await axios.get(
      `${DEFAULT_SERVER_URL}api/users/${userId}/slides`,
    );
    slides = result.data;

    return {
      props: {
        slides,
        session,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
}
