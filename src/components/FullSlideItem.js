import styles from "@/styles/components/FullSlideItem.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setRow, setColumn } from "@/features/postionSlice";

export default function FullSlideItem({ chapter }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mdxResult, position } = chapter;
  const slideStyle = {
    gridColumn: position[0] + 1,
    gridRow: position[1] + 1,
  };

  function handleRouter() {
    dispatch(setRow(position[0]));
    dispatch(setColumn(position[1]));
    router.push(`/editor/${router.asPath.slice(6)}`);
  }

  return (
    <div className={styles.wrapper} style={slideStyle} onClick={handleRouter}>
      <div className={styles.slide}>{mdxResult}</div>
    </div>
  );
}
