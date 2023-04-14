import { useSelector, useDispatch } from "react-redux";
import codeStyles from "@/styles/CodeEditor.module.css";
import { setSlideText } from "../features/slideSlice";

export default function CodeEditor() {
  const { text } = useSelector((state) => state.slide);
  const dispatch = useDispatch();

  return (
    <>
      <section className={codeStyles.codeEditor}>
        <div className={codeStyles.title}>
          <h3>MDX CODE</h3>
          <span>what mdx?</span>
        </div>
        <textarea
          onChange={(e) => dispatch(setSlideText(e.target.value))}
          value={text}
        />
      </section>
    </>
  );
}
