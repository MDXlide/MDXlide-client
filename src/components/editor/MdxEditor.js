import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/MdxEditor.module.css";
import { setChapterText } from "@/features/slideSlice";
import useInterval from "@/hooks/useInterval";
import { DEFAULT_SERVER_URL } from "@/constants/url";

export default function MdxEditor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { chapters } = useSelector((state) => state.slide);
  const { row, column } = useSelector((state) => state.position);
  const targetChapter = chapters.filter(
    (chapter) => chapter.position[0] === row && chapter.position[1] === column,
  )[0];
  const { data } = useSession();

  function handleChangeUserCode(e) {
    const code = e.target.value;

    dispatch(setChapterText({ code, row, column }));
  }

  async function autoSave() {
    const userId = data.id;
    const slideId = router.query.slideId;
    const lastSaveTime = new Date().toISOString().slice(0, 10);

    try {
      await axios.patch(
        `${DEFAULT_SERVER_URL}api/users/${userId}/slides/${slideId}`,
        { targetChapter, lastSaveTime },
      );
    } catch (err) {
      console.log(err);
    }
  }

  useInterval(autoSave, 10000);

  return (
    <>
      <section className={styles.codeEditor}>
        <div className={styles.title}>
          <h3>MDX CODE</h3>
          <span>what mdx?</span>
        </div>
        <textarea
          onChange={handleChangeUserCode}
          value={targetChapter.userCode}
        />
      </section>
    </>
  );
}
