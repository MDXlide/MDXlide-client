import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/MdxSlide.module.css";

import { VFile } from "vfile";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

const defaultPlayPosition = { playRow: 0, playColumn: 0 };

export default function MdxSlide({ layout, playPosition }) {
  const { chapters } = useSelector((state) => state.slide);
  const { row, column } = useSelector((state) => state.position);
  const { rowNext, rowPrev, columnNext, columnPrev } = useSelector(
    (state) => state.slideAnimation,
  );
  const { playRow, playColumn } = playPosition
    ? playPosition
    : defaultPlayPosition;
  const [mdxResult, setMdxResult] = useState(null);

  function checkTargetChapter(chapterRow, chapterColoumn) {
    if (layout === "play") {
      if (chapterRow === playRow && chapterColoumn === playColumn) {
        return true;
      } else {
        return false;
      }
    } else {
      if (chapterRow === row && chapterColoumn === column) {
        return true;
      } else {
        return false;
      }
    }
  }

  const targetChapter = chapters.filter((chapter) =>
    checkTargetChapter(chapter.position[0], chapter.position[1]),
  );

  useEffect(() => {
    async function useMdx() {
      const file = new VFile({
        basename: "example.mdx",
        value: targetChapter[0].userCode,
      });

      let result;

      try {
        result = await evaluate(file, {
          ...runtime,
          useDynamicImport: true,
        });

        setMdxResult(result.default());
      } catch (error) {
        /**
         * fix: error 발생시 아래 모달 구현 예정
         */
        console.error(error);
      }
    }

    useMdx();
  }, [chapters, playPosition]);

  return (
    <div
      className={`${layout === "play" ? styles.playSlide : styles.slide} ${
        rowNext && styles.rowNext
      } ${columnNext && styles.columnNext} ${rowPrev && styles.rowPrev} ${
        columnPrev && styles.columnPrev
      }
      `}
    >
      {mdxResult && mdxResult}
    </div>
  );
}
