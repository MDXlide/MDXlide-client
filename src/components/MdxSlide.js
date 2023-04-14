import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/MdxSlide.module.css";

import { VFile } from "vfile";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

export default function MdxSlide() {
  const { chapters } = useSelector((state) => state.slide);
  const { row, column } = useSelector((state) => state.position);
  const { rowAnimation, columnAnimation } = useSelector(
    (state) => state.slideAnimation,
  );
  const [mdxResult, setMdxResult] = useState(null);
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

  return (
    <div className={`${styles.slide} ${rowAnimation && styles.slideLeft}`}>
      {mdxResult && mdxResult}
    </div>
  );
}
