import styles from "@/styles/Editor.module.css";

// import Image from "next/image";
import { Inter } from "next/font/google";

import Nav from "@/components/Nav.js";
import CodeEditor from "@/components/CodeEditor";

const inter = Inter({ subsets: ["latin"] });

export default function Editor() {
  return (
    <>
      <Nav />
      <CodeEditor />
    </>
  );
}
