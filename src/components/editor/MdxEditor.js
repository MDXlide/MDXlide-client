import { useSelector, useDispatch } from "react-redux";
import styles from "@/styles/MdxEditor.module.css";

import { setChapterText } from "@/features/slideSlice";

export default function MdxEditor() {
  const dispatch = useDispatch();
  const { chapters } = useSelector((state) => state.slide);
  const { row, column } = useSelector((state) => state.position);

  const targetChapter = chapters.filter(
    (chapter) => chapter.position[0] === row && chapter.position[1] === column,
  );

  function handleChangeUserCode(e) {
    const code = e.target.value;

    dispatch(setChapterText({ code, row, column }));
  }

  return (
    <>
      <section className={styles.codeEditor}>
        <div className={styles.title}>
          <h3>MDX CODE</h3>
          <span>what mdx?</span>
        </div>
        <textarea
          onChange={handleChangeUserCode}
          value={targetChapter[0].userCode}
        />
      </section>
    </>
  );
}
