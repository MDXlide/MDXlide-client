import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from "@/styles/CodeSlide.module.css";

import { VFile } from "vfile";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

export default function CodeSlide() {
  const { text } = useSelector((state) => state.slide);
  const [mdx, setMdx] = useState(null);

  useEffect(() => {
    async function useMdx() {
      const file = new VFile({ basename: "example.mdx", value: text });

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
  }, [text]);

  return <div className={Styles.slide}>{mdx && mdx}</div>;
}
