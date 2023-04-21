import { useSession } from "next-auth/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import styles from "@/styles/components/ModalSlideTitle.module.css";
import axios from "axios";

import { DEFAULT_SERVER_URL } from "@/constants/url";

export default function ModalSlideTitle({ button }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { data } = useSession();

  async function createSlide() {
    const userName = data.user.name;
    const slideId = uuidv4();
    const userId = data.id;
    const chapters = { position: [0, 0], userCode: "# title" };
    const lastSaveTime = new Date().toISOString().slice(0, 10);
    const axiosOption = {
      method: "post",
      url: DEFAULT_SERVER_URL + `api/users/${userName}/slides/${slideId}`,
      data: {
        userId,
        slideId,
        title,
        chapters,
        lastSaveTime,
      },
    };

    let result;
    try {
      result = await axios(axiosOption);
    } catch (err) {
      /**
       * fix: errormodle 제작 예정
       */
      console.log(err);
    }

    router.push(`editor/${slideId}`);
  }

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button className={styles.button} onClick={createSlide}>
        {button}
      </button>
    </div>
  );
}
