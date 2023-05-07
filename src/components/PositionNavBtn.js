import { useEffect } from "react";
import styles from "@/styles/PositionNavBtn.module.css";

export default function PositionNavBtn({
  setPlayPosition,
  playPosition,
  allChapter,
}) {
  const { playRow, playColumn } = playPosition;
  const { setPlayRow, setPlayColumn } = setPlayPosition;
  const isPrevRow = allChapter.find(
    (chapter) => chapter.position[0] === playRow - 1,
  );
  const isNextRow = allChapter.find(
    (chapter) => chapter.position[0] === playRow + 1,
  );
  const isNextColunmn = allChapter.find(
    (chapter) =>
      chapter.position[1] === playColumn + 1 && chapter.position[0] === playRow,
  );

  function handleTopBtn(e) {
    const newColumn = playColumn - 1;
    setPlayColumn(newColumn);
  }

  function handleRightBtn(e) {
    const newRow = playRow + 1;
    setPlayRow(newRow);
  }

  function handleButtomBtn(e) {
    const newColumn = playColumn + 1;
    setPlayColumn(newColumn);
  }

  function handleLeftBtn(e) {
    const newRow = playRow - 1;
    setPlayRow(newRow);
  }

  return (
    <nav className={styles.positionNav}>
      <button
        className={playColumn < 1 ? `${styles.hidden}` : `${styles.topBtn}`}
        onClick={handleTopBtn}
      >
        ▲
      </button>
      <button
        className={
          playColumn > 0 || !isNextRow
            ? `${styles.hidden}`
            : `${styles.rightBtn}`
        }
        onClick={handleRightBtn}
      >
        ▶
      </button>
      <button
        className={!isNextColunmn ? `${styles.hidden}` : `${styles.buttomBtn}`}
        onClick={handleButtomBtn}
      >
        ▼
      </button>
      <button
        className={
          playColumn > 0 || !isPrevRow
            ? `${styles.hidden}`
            : `${styles.leftBtn}`
        }
        onClick={handleLeftBtn}
      >
        ◀
      </button>
    </nav>
  );
}
