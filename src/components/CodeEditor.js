import { useState, useEffect, Fragment, createElement } from "react";
import { MDXProvider } from "@mdx-js/react";
import codeStyles from "@/styles/CodeEditor.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setSlideText } from "../features/slideSlice";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeParse from "rehype-parse/lib";
import rehypeReact from "rehype-react/lib";

import CodeSlide from "./CodeSlide";

export default function CodeEditor() {
  const dispatch = useDispatch();

  return (
    <>
      <section className={codeStyles.section}>
        <div className="title">
          <h3>MDX CODE</h3>
          <span>what mdx?</span>
        </div>
        <textarea onChange={(e) => dispatch(setSlideText(e.target.value))} />
      </section>
      {/* <MDXProvider>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </MDXProvider> */}
      <CodeSlide />
    </>
  );
}
