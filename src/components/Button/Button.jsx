import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.button} ${
        props.type === "clear" ? styles.buttonClear : ""
      }`}
    >
      {props.children}
    </button>
  );
}
