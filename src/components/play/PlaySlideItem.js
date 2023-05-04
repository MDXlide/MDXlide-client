import styles from "@/styles/components/PlaySlideItem.module.css";

export default function PlaySlideItem({ chapter }) {
  const { mdxResult, position } = chapter;
  const initialPosition = {
    width: `%{}`,
  };

  return <div className={styles.item}>{mdxResult}</div>;
}
