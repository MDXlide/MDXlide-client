import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/full.module.css";
import Nav from "@/components/Nav.js";
import FullSlideItem from "@/components/FullSlideItem";
import getMdxParse from "@/utils/getMdxParse";

export default function full() {
  const { chapters } = useSelector((state) => state.slide);
  const [allMdx, setAllMdx] = useState(null);

  async function fetchMdxResult() {
    const result = await Promise.all(
      chapters.map(async (chapter) => {
        return await getMdxParse(chapter.userCode, {
          position: chapter.position,
        });
      }),
    );
    setAllMdx(result);
  }

  useEffect(() => {
    fetchMdxResult();
  }, []);

  return (
    <>
      <Nav />
      <div className={styles.wrapper}>
        <main className={styles.slideItemWrapper}>
          {allMdx?.map((mdx, index) => (
            <FullSlideItem chapter={mdx} key={index} />
          ))}
        </main>
      </div>
    </>
  );
}
