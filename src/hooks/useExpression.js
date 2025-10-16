import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, assignExp, clearExp } from "@redux/slices/expSlice";
import { executeExp } from "@utils/calculations.js";

export const useExpression = () => {
  const exp = useSelector((state) => state.exp.value);
  const dispatch = useDispatch();

  const [allowOperator, setAllowOperator] = useState(false);
  const [allowNumber, setAllowNumber] = useState(true);

  const handleNumber = (value) => {
    if (!allowNumber) return;
    if (value === "0" && (exp === "" || /[+\-×÷]$/.test(exp))) return;
    dispatch(addItem(value));
    if (!allowOperator) setAllowOperator(true);
  };

  const handleOperator = (value) => {
    if (!allowOperator) return;
    dispatch(addItem(value));
    setAllowOperator(false);
    if (!allowNumber) setAllowNumber(true);
  };

  const handleFunction = (value) => {
    if (value === "=" && allowOperator && exp !== "") {
      const onlyNumbers = /^\d*\.?\d+$/.test(exp);
      if (!onlyNumbers) {
        const result = executeExp(exp);
        if (result !== 0) {
          dispatch(assignExp(result));
          setAllowNumber(false);
        } else {
          dispatch(assignExp(""));
        }
      }
    } else if (value === "CE") {
      dispatch(clearExp());
      if (!allowNumber) setAllowNumber(true);
    }
  };

  return {
    exp,
    handleNumber,
    handleOperator,
    handleFunction
  };
};