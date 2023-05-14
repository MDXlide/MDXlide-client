import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "@/styles/pages/editor.module.css";
import axios from "axios";
import Nav from "@/components/Nav.js";
import MdxEditor from "@/components/editor/MdxEditor";
import MdxSlide from "@/components/editor/MdxSlide";
import {
  setSlide,
  addRowChapter,
  addColumnChapter,
  insertRowChapter,
  insertColumnChapter,
  deleteRowChapter,
  deleteColumnChapter,
} from "../../features/slideSlice";
import { setRow, setColumn, setVersion } from "@/features/postionSlice";
import {
  isRowNext,
  isColumnNext,
  isColumnPrev,
  isRowPrev,
} from "@/features/slideAnimationSlice";
import { DEFAULT_SERVER_URL } from "@/constants/url";

const DEFAULT_CHAPTER_USER_CODE = "## 새로운 챕터입니다.";

export default function editor({ slide }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const data = useSession();
  const { row, column, version } = useSelector((state) => state.position);
  const { chapters } = useSelector((state) => state.slide);
  const [hiddenRowBtn, setHiddenRowBtn] = useState(false);

  useEffect(() => {
    return () => autoSave();
  }, []);

  useEffect(() => {
    if (column > 0) setHiddenRowBtn(true);
  }, [version]);

  useEffect(() => {
    saveNewChapter();
  }, [version]);

  async function saveNewChapter() {
    const userId = data.id;
    const slideId = router.query.slideId;

    const response = await axios.post(
      `${DEFAULT_SERVER_URL}api/users/${userId}/slides/${slideId}/chapters`,
      { chapters },
    );
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

  function handleAddRowChapter() {
    const newRow = row + 1;
    const isNewRow = chapters.find((chapter) => chapter.position[0] === newRow);
    const resetColumn = 0;

    if (isNewRow) {
      dispatch(isRowNext(true));
      dispatch(setRow(newRow));
      dispatch(setColumn(resetColumn));
      dispatch(
        insertRowChapter({
          code: "#row 중간 추가",
          newRow,
          column: resetColumn,
        }),
      );
      setTimeout(() => dispatch(isRowNext(false)), 1000);
    } else {
      dispatch(isRowNext(true));
      dispatch(setRow(newRow));
      dispatch(setColumn(resetColumn));
      dispatch(
        addRowChapter({
          code: `# ${newRow}Row`,
          newRow,
          column: resetColumn,
        }),
      );
      setTimeout(() => dispatch(isRowNext(false)), 1000);
    }
  }

  function handleAddColumnChapter() {
    const newColumn = column + 1;
    const isNewColumn = chapters.find(
      (chapter) =>
        chapter.position[1] === newColumn && chapter.position[0] === row,
    );
    const code = `# ${newColumn} column`;

    if (isNewColumn) {
      dispatch(isColumnNext(true));
      dispatch(setColumn(newColumn));
      dispatch(
        insertColumnChapter({
          code: "column 중간 추가",
          row,
          newColumn,
        }),
      );
      setTimeout(() => dispatch(isColumnNext(false)), 1000);
    } else {
      dispatch(isColumnNext(true));
      dispatch(setColumn(newColumn));
      dispatch(addColumnChapter({ code, row, newColumn }));
      setTimeout(() => dispatch(isColumnNext(false)), 1000);
    }
  }

  function handleDeleteChapter() {
    if (column > 0) {
      dispatch(isColumnNext(true));
      dispatch(setVersion());
      dispatch(deleteColumnChapter({ row, column }));
      setTimeout(() => dispatch(isColumnNext(false)), 1000);
    } else {
      dispatch(isRowNext(true));
      dispatch(setVersion());
      dispatch(deleteRowChapter({ row, column }));
      setTimeout(() => dispatch(isRowNext(false)), 1000);
    }
  }

  const prevRow = chapters.find((chapter) => chapter.position[0] === row - 1);
  const nextRow = chapters.find((chapter) => chapter.position[0] === row + 1);
  const nextColumn = chapters.find(
    (chapter) =>
      chapter.position[1] === column + 1 && chapter.position[0] === row,
  );

  function handlePrevColumn() {
    const prevColumn = column - 1;

    dispatch(isColumnPrev(true));
    dispatch(setColumn(prevColumn));
    setTimeout(() => dispatch(isColumnPrev(false)), 1000);
  }

  function handleNextRow() {
    const nextRow = row + 1;

    dispatch(isRowNext(true));
    dispatch(setRow(nextRow));
    setTimeout(() => dispatch(isRowNext(false)), 1000);
  }

  function handleNextColumn() {
    const nextColumn = column + 1;

    dispatch(isColumnNext(true));
    dispatch(setColumn(nextColumn));
    setTimeout(() => dispatch(isColumnNext(false)), 1000);
  }

  function handlePrevRow() {
    const prevRow = row - 1;

    dispatch(isRowPrev(true));
    dispatch(setRow(prevRow));
    setTimeout(() => dispatch(isRowPrev(false)), 1000);
  }

  return (
    <>
      <Nav />
      <main>
        <div className={styles.slideEditorWrapper}>
          <MdxEditor />
          <MdxSlide />
          <button
            className={`${styles.addRow} ${hiddenRowBtn && styles.hidden}`}
            onClick={handleAddRowChapter}
          >
            +
          </button>
          <button className={styles.addColumn} onClick={handleAddColumnChapter}>
            +
          </button>
          <button
            className={styles.deleteChapterBtn}
            onClick={handleDeleteChapter}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M220 236v186-186 680-11.5V916 236Zm0 740q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v227q-14-6-29-9.5t-31-5.5V422H551V236H220v680h316q10 17 22 32t27 28H220Zm416-34-42-42 84-84-84-84 42-42 84 84 84-84 42 42-83 84 83 84-42 42-84-83-84 83Z" />
            </svg>
          </button>
          <button
            className={column < 1 ? styles.hidden : styles.topBtn}
            onClick={handlePrevColumn}
          >
            ▲
          </button>
          <button
            className={column > 0 || !nextRow ? styles.hidden : styles.rightBtn}
            onClick={handleNextRow}
          >
            ▶
          </button>
          <button
            className={!nextColumn ? styles.hidden : styles.bottomBtn}
            onClick={handleNextColumn}
          >
            ▼
          </button>
          <button
            className={column > 0 || !prevRow ? styles.hidden : styles.leftBtn}
            onClick={handlePrevRow}
          >
            ◀
          </button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const slideId = context.params.slideId;
  let userName;

  try {
    const session = await getSession(context);
    if (!session)
      return { redirect: { destination: "/signin", permanent: false } };
    userName = session.user.name;
  } catch (err) {
    return {
      notFound: true,
    };
  }

  try {
    const targetSlide = await axios.get(
      `${DEFAULT_SERVER_URL}api/users/${userName}/slides/${slideId}`,
    );
    const slide = targetSlide.data;

    return {
      props: {
        slide,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
