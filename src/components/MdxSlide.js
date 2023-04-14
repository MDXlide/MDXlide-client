import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from "@/styles/CodeSlide.module.css";

import { VFile } from "vfile";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

export default function MdxSlide() {
  const { chapters } = useSelector((state) => state.slide);
  const { mainPosition, subPosition } = useSelector((state) => state.position);
  const [mdx, setMdx] = useState(null);

  const targetChapter = chapters.filter(
    (chapter) =>
      chapter.position[0] === mainPosition &&
      chapter.position[1] === subPosition,
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

        setMdx(result.default());
      } catch (error) {
        /**
         * fix: error 발생시 아래 모달 구현 예정
         */
        console.error(error);
      }
    }

    useMdx();
  }, [chapters]);

  return <div className={Styles.slide}>{mdx && mdx}</div>;
}
