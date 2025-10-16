import Calculator from "@pages/CalculatorPage/components/Calculator/Calculator";
import styles from "./index.module.scss";

const CalculatorPage = () => {
  return (
    <div className={styles.root}>
      <Calculator />
    </div>
  );
};

export default CalculatorPage;
