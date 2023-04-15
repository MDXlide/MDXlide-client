import { useState } from "react";
import MdxSlide from "@/components/MdxSlide";
import PlaySlide from "@/components/PlaySlide";
import PositionNavBtn from "@/components/PositionNavBtn";
import styles from "@/styles/Play.module.css";

export default function play() {
  const [playRow, setPlayRow] = useState(0);
  const [playColumn, setPlayColumn] = useState(0);

  return (
    <main className={styles.Wrapper}>
      <MdxSlide layout="play" playPosition={{ playRow, playColumn }} />
      <PositionNavBtn
        setPlayPosition={{ setPlayRow, setPlayColumn }}
        playPosition={{ playRow, playColumn }}
      />
    </main>
  );
}
