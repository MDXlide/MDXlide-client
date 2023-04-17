import styles from "@/styles/pages/main.module.css";
import SlideItem from "@/components/SlideItem";

const LOGO_IMG_PATH = "/logo.png";
const LOGO_ALT = "MDXSlide logo";
const PROFILE_IMG_ALT = "user profile";

export default function main({ user, posts }) {
  const { name, profileImg } = user;

  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src={LOGO_IMG_PATH} alt={LOGO_ALT} />
        <button className={styles.logout}>LOGUOT</button>
      </header>
      <main className={styles.main}>
        <section className={styles.leftBox}>
          <div className={styles.profile}>
            <span className={styles.name}>{name}</span>
            <img
              className={styles.profileImg}
              src={profileImg}
              alt={PROFILE_IMG_ALT}
            />
          </div>
          <nav className={styles.nav}>
            <button className={styles.newSlideBtn}>new slide</button>
          </nav>
        </section>
        <section className={styles.rightBox}>
          {posts.map((slide) => (
            <SlideItem slide={slide} />
          ))}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
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
    },
  };
}
