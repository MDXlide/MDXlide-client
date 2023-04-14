import { useSelector, useDispatch } from "react-redux";
import codeStyles from "@/styles/CodeEditor.module.css";

export default function MdxEditor() {
  const dispatch = useDispatch();

  return (
    <>
      {/* <section className={codeStyles.codeEditor}>
        <div className={codeStyles.title}>
          <h3>MDX CODE</h3>
          <span>what mdx?</span>
        </div>
        <textarea
          onChange={(e) => dispatch(setTargetChapterText(e.target.value))}
          value={text}
        />
      </section> */}
    </>
  );
}
