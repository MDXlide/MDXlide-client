import { useSelector } from "react-redux";
import styles from "@/styles/components/ModalLayout.module.css";

import ModalBox from "./ModalBox";

export default function ModalLayout({ title, description, type }) {
  const { show } = useSelector((state) => state.modal);

  const modalStyle = {
    display: `${show ? "flex" : "none"}`,
  };

  return (
    <div className={styles.layout} style={modalStyle}>
      <ModalBox title={title} description={description} type={type} />
    </div>
  );
}
