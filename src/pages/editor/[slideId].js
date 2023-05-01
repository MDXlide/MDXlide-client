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
import { isRowNext, isColumnNext } from "@/features/slideAnimationSlice";
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
    dispatch(setSlide(slide));
  }, [slide]);

  useEffect(() => {
    if (column > 0) setHiddenRowBtn(true);
  }, [version]);

  useEffect(() => {
    async function saveNewChapter() {
      const userId = data.id;
      const slideId = router.query.slideId;

      const response = await axios.post(
        `${DEFAULT_SERVER_URL}api/users/${userId}/slides/${slideId}/chapters`,
        { chapters },
      );
    }
    saveNewChapter();
  }, [version]);

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
          code: "row 삽입되었습니다",
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
          code: DEFAULT_CHAPTER_USER_CODE,
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
    const code = `newcolumn ${newColumn} 추가 구현`;

    if (isNewColumn) {
      dispatch(isColumnNext(true));
      dispatch(setColumn(newColumn));
      dispatch(
        insertColumnChapter({
          code: "column 중간 추가 구현 입니다",
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
  return (
    <>
      <Nav />
      <main>
        <div className={styles.slideEditorWrapper}>
          <MdxEditor />
          <MdxSlide />
          <button
            className={`${styles.rightBtn} ${hiddenRowBtn && styles.hidden}`}
            onClick={handleAddRowChapter}
          >
            +
          </button>
          <button className={styles.bottomBtn} onClick={handleAddColumnChapter}>
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
