import styles from "@/styles/pages/index.module.css";
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import SlideItem from "@/components/SlideItem";
import ModalLayout from "@/components/modal/ModalLayout";
import { openModal } from "@/features/modalSlice";
import { LOGO_IMG_PATH, LOGO_ALT, PROFILE_IMG_ALT } from "../constants/img";

const SLIDE_NAME_MODAL_MESSAGE = "새로 만들 슬라이드의 이름을 정해주세요.";

export default function index({ posts, session }) {
  const dispatch = useDispatch();
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
          {posts.map((slide) => (
            <SlideItem slide={slide} key={uuidv4()} />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session)
    return { redirect: { destination: "/signin", permanent: false } };

  const user = {
    userId: 1234,
    name: "choi yealin",
    email: "lin01.dev@gmail.com",
    profileImg: "/profile.png",
  };

  const posts = [
    {
      userId: 1234,
      slideId: 1234,
      title: "p1",
      chapters: [
        {
          position: [0, 0],
          userCode:
            "<div style={{padding: '1rem', backgroundColor: 'violet'}}>박스 예시입니다.</div>",
        },
        {
          position: [1, 0],
          userCode: "# 두번째 슬라이드입니다",
        },
        {
          position: [0, 1],
          userCode: "# column 두 번째",
        },
        {
          position: [2, 0],
          userCode: "# 세번째 슬라이드입니다",
        },
        {
          position: [2, 1],
          userCode: "# 세번째의 하위 1번 입니다",
        },
        {
          position: [2, 2],
          userCode: "# 세번째의 하위 2번 입니다",
        },
      ],
      lastSaveTime: "2023-04-12",
    },
    {
      userId: 1234,
      slideId: 1234,
      title: "p2",
      chapters: [
        {
          position: [0, 0],
          userCode: "### 두 번째 박스입니다.",
        },
      ],
      lastSaveTime: "2023-04-14",
    },
  ];

  return {
    props: {
      user,
      posts,
      session,
    },
  };
}
