import styles from "@/styles/Editor.module.css";
import Nav from "@/components/Nav.js";
import MdxEditor from "@/components/MdxEditor";
import MdxSlide from "@/components/MdxSlide";

export default function Editor() {
  return (
    <main>
      <Nav />
      <div className={styles.slideEditorWrapper}>
        <MdxEditor />
        <MdxSlide />
        <button className={styles.rightBtn}>+</button>
        <button className={styles.bottomBtn}>+</button>
      </div>
    </main>
  );
}
