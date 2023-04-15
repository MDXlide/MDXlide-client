import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/PlaySlide.module.css";

import { VFile } from "vfile";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

export default function PlaySlide() {
  const { chapters } = useSelector((state) => state.slide);
  const [mdxResult, setMdxResult] = useState(null);
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);

  const targetChapter = chapters.filter(
    (chapter) => chapter.position[0] === row && chapter.position[1] === column,
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
  }, [chapters]);

  return <div className={`${styles.fullSlide}`}>{mdxResult && mdxResult}</div>;
}
