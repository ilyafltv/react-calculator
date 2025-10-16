import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, assignExp, clearExp } from "@redux/slices/expSlice";

import ButtonCalc from "../ButtonCalc/ButtonCalc.jsx";
import { keyboardList } from "./KeyboardConfig.js";
import styles from "./Keyboard.module.scss";

const Keyboard = () => {
  const exp = useSelector((state) => state.exp.value);
  const dispatch = useDispatch();

  const [allowOperator, setAllowOperator] = useState(false);
  const [allowNumber, setAllowNumber] = useState(true);

  const executeExp = (exp) => {
    let normalizedExpression = exp.replace(/×/g, "*").replace(/÷/g, "/");

    try {
      const result = new Function(`return ${normalizedExpression}`)();
      return Math.round(result * 100) / 100;
    } catch (error) {
      console.error("Calculation error:", error);
      return null;
    }
  };

  const calcClickHandler = (obj) => {
    switch (obj.type) {
      case "number":
        if (allowNumber) {
          dispatch(addItem(obj.value));
          if (!allowOperator) setAllowOperator(true);
        }
        break;

      case "operator":
        if (allowOperator) {
          dispatch(addItem(obj.value));
          setAllowOperator(false);
          if (!allowNumber) setAllowNumber(true);
        }
        break;

      case "function":
        if (obj.value === "=" && allowOperator && exp !== "") {
          const onlyNumbers = /^\d*\.?\d+$/.test(exp);

          if (!onlyNumbers) {
            dispatch(assignExp(executeExp(exp)));
            setAllowNumber(false);
          }
        } else if (obj.value === "CE") {
          dispatch(clearExp());
          if (!allowNumber) setAllowNumber(true);
        }

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
