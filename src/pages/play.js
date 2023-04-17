import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "@/styles/Play.module.css";

import MdxSlide from "@/components/MdxSlide";
import PositionNavBtn from "@/components/PositionNavBtn";
import ProgressBar from "@/components/ProgressBar";

export default function play() {
  const { chapters } = useSelector((state) => state.slide);
  const [playRow, setPlayRow] = useState(0);
  const [playColumn, setPlayColumn] = useState(0);
  const [progress, setProgress] = useState(0);

  const maxRow = chapters.reduce((prev, chapters) => {
    const nowRow = chapters.position[0];

    return prev > nowRow ? prev : nowRow;
  });
  const maxColumn = chapters
    .filter((chapters) => chapters.position[0] === maxRow)
    .reduce((prev, chapters) => {
      const nowColumn = chapters.position[1];

      return prev > nowColumn ? prev : nowColumn;
    });

  useEffect(() => {
    if (!playRow) {
      setProgress(0);
      return;
    }

    const nowProgress = (100 / (maxRow + maxColumn)) * playRow;

    setProgress(nowProgress);
  }, [playRow]);

  useEffect(() => {
    if (!playColumn) {
      setProgress(0);
      return;
    }

    const offset = 2;
    let nowProgress;

    if (playRow === maxRow) {
      nowProgress = (100 / chapters.length) * (playRow + playColumn + offset);
    } else {
      nowProgress = (100 / chapters.length) * (playRow + playColumn);
    }

    setProgress(nowProgress);
  }, [playColumn]);

  return (
    <main className={styles.Wrapper}>
      <MdxSlide layout="play" playPosition={{ playRow, playColumn }} />
      <PositionNavBtn
        setPlayPosition={{ setPlayRow, setPlayColumn }}
        playPosition={{ playRow, playColumn }}
      />
      <ProgressBar progress={progress} />
    </main>
  );
}
