import ButtonCalc from "../ButtonCalc/ButtonCalc.jsx";
import { keyboardList } from "./KeyboardConfig.js";
import styles from "./Keyboard.module.scss";
import { useExpression } from "@hooks/useExpression.js";

const Keyboard = () => {
  const { handleNumber, handleOperator, handleFunction } = useExpression();

  const calcClickHandler = (obj) => {
    switch (obj.type) {
      case "number":
        handleNumber(obj.value);
        break;
      case "operator":
        handleOperator(obj.value);
        break;
      case "function":
        handleFunction(obj.value);
        break;
    }
  };

  return (
    <div className={styles.keyboard}>
      {keyboardList.map((item, index) => (
        <ButtonCalc
          onClick={() => calcClickHandler(item)}
          value={item}
          key={index}
          isSpecial={item.type !== "number" ? true : false}
        />
      ))}
    </div>
  );
};

export default Keyboard;
