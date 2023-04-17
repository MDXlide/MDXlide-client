import styles from "@/styles/ProgressBar.module.css";

export default function ProgressBar({ progress }) {
  const progressStyle = {
    width: `${progress}%`,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.bar} style={progressStyle}></div>
    </div>
  );
}
