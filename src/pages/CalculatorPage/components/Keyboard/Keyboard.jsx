import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, clearExp } from "@redux/slices/expSlice";

import ButtonCalc from "../ButtonCalc/ButtonCalc.jsx";
import { keyboardList } from "./KeyboardConfig.js";
import styles from "./Keyboard.module.scss";

const Keyboard = () => {
  const exp = useSelector((state) => state.exp.value);
  const dispatch = useDispatch();

  const [allowOperator, setAllowOperator] = useState(false);

  const calcClickHandler = (obj) => {
    switch (obj.type) {
      case "number":
        dispatch(addItem(obj.value));
        setAllowOperator(true);
        break;
      case "operator":
        if (allowOperator) {
          dispatch(addItem(obj.value));
          setAllowOperator(false);
        }
        break;
      case "function":
        if (obj.value === "=" && allowOperator) {
          console.log("Выполнить вычисления");
          dispatch(clearExp());
        } else if (obj.value === "CE") dispatch(clearExp());

        break;
    }
  };

  useEffect(() => {
    console.log("exp: ", exp);
  }, [exp]);

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
