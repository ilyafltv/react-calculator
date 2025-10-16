import styles from "./ButtonCalc.module.scss";

const ButtonCalc = ({ value, isSpecial, onClick }) => {
  const buttonClass = isSpecial
    ? `${styles.buttonCalc} ${styles.buttonSpecial}`
    : styles.buttonCalc;

  return (
    <button onClick={onClick} className={buttonClass}>
      {value.value}
    </button>
  );
};

export default ButtonCalc;
