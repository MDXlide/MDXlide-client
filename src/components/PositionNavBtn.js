import styles from "@/styles/PositionNavBtn.module.css";
import { useDispatch } from "react-redux";

import {
  isRowNext,
  isRowPrev,
  isColumnNext,
  isColumnPrev,
} from "@/features/slideAnimationSlice";

export default function PositionNavBtn({ setPlayPosition, playPosition }) {
  const dispatch = useDispatch();
  const { playRow, playColumn } = playPosition;
  const { setPlayRow, setPlayColumn } = setPlayPosition;

  function handleTopBtn() {
    const newColumn = playColumn - 1;

    dispatch(isColumnPrev(true));

    setTimeout(() => setPlayColumn(newColumn), 500);
    setTimeout(() => dispatch(isColumnPrev(false)), 1000);
  }

  function handleRightBtn() {
    const newRow = playRow + 1;

    dispatch(isRowNext(true));

    setTimeout(() => setPlayRow(newRow), 500);
    setTimeout(() => dispatch(isRowNext(false)), 1000);
  }

  function handleButtomBtn() {
    const newColumn = playColumn + 1;

    dispatch(isColumnNext(true));

    setTimeout(() => setPlayColumn(newColumn), 500);
    setTimeout(() => dispatch(isColumnNext(false)), 1000);
  }

  function handleLeftBtn() {
    const newRow = playRow - 1;

    dispatch(isRowPrev(true));

    setTimeout(() => setPlayRow(newRow), 500);
    setTimeout(() => dispatch(isRowPrev(false)), 1000);
  }

  return (
    <nav className={styles.positionNav}>
      <button className={styles.topBtn} onClick={handleTopBtn}>
        ▲
      </button>
      <button className={styles.rightBtn} onClick={handleRightBtn}>
        ▶
      </button>
      <button className={styles.buttomBtn} onClick={handleButtomBtn}>
        ▼
      </button>
      <button className={styles.leftBtn} onClick={handleLeftBtn}>
        ◀
      </button>
    </nav>
  );
}
