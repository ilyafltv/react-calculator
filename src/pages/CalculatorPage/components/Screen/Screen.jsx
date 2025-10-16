import styles from "./Screen.module.scss";
import { useSelector } from "react-redux";

const Screen = () => {
  const exp = useSelector((state) => state.exp.value);

  return <div className={styles.screen}>{exp === "" ? "0" : exp}</div>;
};

export default Screen;
