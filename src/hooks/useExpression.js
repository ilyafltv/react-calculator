import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, assignExp, clearExp, addToHistory, editHistory } from "@redux/slices/expSlice";
import { executeExp } from "@utils/calculations.js";
import { useLocalStorage } from "./useLocalStorage";

export const useExpression = () => {
  const exp = useSelector((state) => state.exp.value);
  const history = useSelector((state) => state.exp.history);
  const dispatch = useDispatch();

  const {
    getAllowOperator,
    setAllowOperator,
    getAllowNumber,
    setAllowNumber,
    getHistory,
    setHistory,
    getCurrentExpression,
    setCurrentExpression
  } = useLocalStorage();

  // Загружаем состояние из localStorage при инициализации
  const [allowOperator, setAllowOperatorState] = useState(getAllowOperator());
  const [allowNumber, setAllowNumberState] = useState(getAllowNumber());

  // Сохраняем состояние в localStorage при изменении
  useEffect(() => {
    setAllowOperator(allowOperator);
  }, [allowOperator, setAllowOperator]);

  useEffect(() => {
    setAllowNumber(allowNumber);
  }, [allowNumber, setAllowNumber]);

  // Сохраняем историю в localStorage при изменении
  useEffect(() => {
    if (history && history.length > 0) {
      setHistory(history);
    }
  }, [history, setHistory]);

  // Загружаем историю и выражение при монтировании
  useEffect(() => {
    const savedHistory = getHistory();
    if (savedHistory.length > 0) dispatch(editHistory(savedHistory));

    const savedExp = getCurrentExpression();
    if (savedExp) dispatch(assignExp(savedExp));

  }, [dispatch, getHistory, getCurrentExpression]);

  // Сохраняем текущее выражение
  useEffect(() => {
    setCurrentExpression(exp);
  }, [exp, setCurrentExpression]);

  const handleNumber = (value) => {
    if (!allowNumber) return;
    if (value === "0" && (exp === "" || /[+\-×÷]$/.test(exp))) return;
    dispatch(addItem(value));
    if (!allowOperator) setAllowOperatorState(true);
  };

  const handleOperator = (value) => {
    if (!allowOperator) return;
    dispatch(addItem(value));
    setAllowOperatorState(false);
    if (!allowNumber) setAllowNumberState(true);
  };

  const handleFunction = (value) => {
    if (value === "=" && allowOperator && exp !== "") {
      const onlyNumbers = /^\d*\.?\d+$/.test(exp);
      if (!onlyNumbers) {
        const result = executeExp(exp);
        if (result !== 0) {
          dispatch(assignExp(result));
          setAllowNumberState(false);
          dispatch(addToHistory({
            exp: exp,
            result: result,
          }));
        } else {
          dispatch(assignExp(""));
          setAllowOperatorState(false);
          dispatch(addToHistory({
            exp: exp,
            result: 0,
          }));
        }
      }
    } else if (value === "CE") {
      dispatch(clearExp());
      if (!allowNumber) setAllowNumberState(true);
    }
  };

  return {
    exp,
    handleNumber,
    handleOperator,
    handleFunction
  };
};