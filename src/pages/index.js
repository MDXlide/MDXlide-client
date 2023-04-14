import styles from "@/styles/Editor.module.css";
import Nav from "@/components/Nav.js";
import CodeEditor from "@/components/CodeEditor";
import CodeSlide from "@/components/CodeSlide";

export default function Editor() {
  return (
    <main>
      <Nav />
      <div className={styles.slideEditorWrapper}>
        <CodeEditor />
        <CodeSlide />
        <button className={styles.rightBtn}>+</button>
        <button className={styles.bottomBtn}>+</button>
      </div>
    </main>
  );
}
