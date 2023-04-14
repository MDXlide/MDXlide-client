import { useSelector, useDispatch } from "react-redux";
import codeStyles from "@/styles/CodeEditor.module.css";

import { setChapterText } from "@/features/slideSlice";

export default function MdxEditor() {
  const dispatch = useDispatch();
  const { chapters } = useSelector((state) => state.slide);
  const { mainPosition, subPosition } = useSelector((state) => state.position);

  const targetChapter = chapters.filter(
    (chapter) =>
      chapter.position[0] === mainPosition &&
      chapter.position[1] === subPosition,
  );

  function handleChangeUserCode(e) {
    const code = e.target.value;

    dispatch(setChapterText({ code, mainPosition, subPosition }));
  }

  return (
    <>
      <section className={codeStyles.codeEditor}>
        <div className={codeStyles.title}>
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
