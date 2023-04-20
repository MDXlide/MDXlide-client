import { useSession } from "next-auth/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/components/ModalSlideTitle.module.css";
import axios from "axios";

export default function ModalSlideTitle({ button }) {
  const [title, setTitle] = useState("");
  const { data } = useSession();

  function createNewSlide() {
    const owner = data.id;
    const slideId = uuidv4();
    const chapters = { position: [0, 0], userCode: "# title" };
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button className={styles.button} onClick={createNewSlide}>
        {button}
      </button>
    </div>
  );
}
