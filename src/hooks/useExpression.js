import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, assignExp, clearExp, addToHistory, editHistory } from "@redux/slices/expSlice";
import { executeExp } from "@utils/calculations.js";

export const useExpression = () => {
  const exp = useSelector((state) => state.exp.value);
  const history = useSelector((state) => state.exp.history);
  const dispatch = useDispatch();

  // Загружаем состояние из localStorage при инициализации
  const [allowOperator, setAllowOperator] = useState(() => {
    const saved = localStorage.getItem('allowOperator');
    return saved ? JSON.parse(saved) : false;
  });

  const [allowNumber, setAllowNumber] = useState(() => {
    const saved = localStorage.getItem('allowNumber');
    return saved ? JSON.parse(saved) : true;
  });

  // Сохраняем состояние в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('allowOperator', JSON.stringify(allowOperator));
  }, [allowOperator]);

  useEffect(() => {
    localStorage.setItem('allowNumber', JSON.stringify(allowNumber));
  }, [allowNumber]);

  // Сохраняем историю в localStorage при изменении
  useEffect(() => {
    if (history && history.length > 0) {
      localStorage.setItem('calcHistory', JSON.stringify(history));
    }
  }, [history]);

  // Загружаем историю и выражение при монтировании
  useEffect(() => {
    const savedHistory = localStorage.getItem('calcHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        dispatch(editHistory(parsedHistory));
      } catch (error) {
        console.error('Error parsing saved history:', error);
      }
    }
    const savedExp = localStorage.getItem('currentExpression');
    if (savedExp && savedExp !== "") {
      dispatch(assignExp(savedExp));
    }
  }, [dispatch]);

  // Сохраняем текущее выражение
  useEffect(() => {
    localStorage.setItem('currentExpression', exp);
  }, [exp]);

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
          dispatch(addToHistory({
            exp: exp,
            result: result,
          }));
        } else {
          dispatch(assignExp(""));
          setAllowOperator(false);
          dispatch(addToHistory({
            exp: exp,
            result: 0,
          }));
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