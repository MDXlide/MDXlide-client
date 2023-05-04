import styles from "@/styles/components/PlaySlideItem.module.css";
import { useEffect, useRef } from "react";

export default function PlaySlideItem({ chapter, playPosition }) {
  const { mdxResult, position } = chapter;
  const { playRow, playColumn } = playPosition;
  const itemStyle = {
    top: `${100 * (position[1] - playColumn)}%`,
    left: `${100 * (position[0] - playRow)}%`,
  };

  return (
    <div className={styles.item} style={itemStyle}>
      {mdxResult}
    </div>
  );
}
