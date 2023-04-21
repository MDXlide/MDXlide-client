import styles from "@/styles/Editor.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSession } from "next-auth/react";

import Nav from "@/components/Nav.js";
import MdxEditor from "@/components/editor/MdxEditor";
import MdxSlide from "@/components/editor/MdxSlide";

import {
  setSlide,
  addRowChapter,
  addcolumnChapter,
} from "../../features/slideSlice";
import { setRow, setColumn } from "@/features/postionSlice";
import {
  isRowAnimation,
  isColumnAnimation,
} from "@/features/slideAnimationSlice";

import { DEFAULT_SERVER_URL } from "@/constants/url";

export default function editor({ slide }) {
  const dispatch = useDispatch();
  const { row, column } = useSelector((state) => state.position);

  useEffect(() => {
    dispatch(setSlide(slide));
  }, [slide]);

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
    <>
      <Nav />
      <main>
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
