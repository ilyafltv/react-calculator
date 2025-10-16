import Screen from "@pages/CalculatorPage/components/Screen/Screen";
import Keyboard from "@pages/CalculatorPage/components/Keyboard/Keyboard";
import Button from "@components/Button/Button";
import styles from "./Calculator.module.scss";
import { useNavigate } from "react-router";

const Calculator = () => {
  const navigate = useNavigate();

  const handleClickHistory = () => {
    navigate("/history");
  };

  return (
    <div className={styles.calculator}>
      <Screen />
      <Keyboard />
      <Button onClick={handleClickHistory}>History</Button>
    </div>
  );
};

export default Calculator;
