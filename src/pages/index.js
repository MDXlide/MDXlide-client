import { useSelector, useDispatch } from "react-redux";
import styles from "@/styles/Editor.module.css";
import Nav from "@/components/Nav.js";
import MdxEditor from "@/components/MdxEditor";
import MdxSlide from "@/components/MdxSlide";

import { addMainChapter, addSubChapter } from "../features/slideSlice";
import { setMainPosition, setSubPosition } from "@/features/postionSlice";

export default function Editor() {
  const dispatch = useDispatch();
  const { mainPosition, subPosition } = useSelector((state) => state.position);

  function handleAddMainChapter() {
    const newMainPosition = mainPosition + 1;
    const code = "";

    dispatch(addMainChapter({ code, newMainPosition, subPosition }));
    dispatch(setMainPosition(newMainPosition));
  }

  function handleAddSubChapter() {
    const newSubPosition = subPosition + 1;
    const code = "";

    dispatch(addSubChapter({ code, mainPosition, newSubPosition }));
    dispatch(setSubPosition(newSubPosition));
  }

  return (
    <main>
      <Nav />
      <div className={styles.slideEditorWrapper}>
        <MdxEditor />
        <MdxSlide />
        <button className={styles.rightBtn} onClick={handleAddMainChapter}>
          +
        </button>
        <button className={styles.bottomBtn} onClick={handleAddSubChapter}>
          +
        </button>
      </div>
    </main>
  );
}
