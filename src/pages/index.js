import { useSelector, useDispatch } from "react-redux";
import styles from "@/styles/Editor.module.css";
import Nav from "@/components/Nav.js";
import MdxEditor from "@/components/MdxEditor";
import MdxSlide from "@/components/MdxSlide";

import { addRowChapter, addcolumnChapter } from "../features/slideSlice";
import { setRow, setColumn } from "@/features/postionSlice";
import {
  isRowAnimation,
  isColumnAnimation,
} from "@/features/slideAnimationSlice";

export default function Editor() {
  const dispatch = useDispatch();
  const { row, column } = useSelector((state) => state.position);

  function handleAddRowChapter() {
    const newRow = row + 1;
    const code = "";

    dispatch(isRowAnimation(true));

    setTimeout(() => {
      dispatch(addRowChapter({ code, newRow, column }));
      dispatch(setRow(newRow));
    }, 500);
    setTimeout(() => dispatch(isRowAnimation(false)), 1000);
  }

  function handleAddColumnChapter() {
    const newColumn = column + 1;
    const code = "";

    dispatch(addcolumnChapter({ code, row, newColumn }));
    dispatch(setColumn(newColumn));
  }

  return (
    <main>
      <Nav />
      <div className={styles.slideEditorWrapper}>
        <MdxEditor />
        <MdxSlide />
        <button className={styles.rightBtn} onClick={handleAddRowChapter}>
          +
        </button>
        <button className={styles.bottomBtn} onClick={handleAddColumnChapter}>
          +
        </button>
      </div>
    </main>
  );
}
