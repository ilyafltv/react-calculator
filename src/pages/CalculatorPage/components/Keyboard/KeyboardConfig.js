export const keyboardList = [
  {
    type: "number",
    sign: "7",
    value: 7,
  },
  {
    type: "number",
    sign: "8",
    value: 8,
  },
  {
    type: "number",
    sign: "9",
    value: 9,
  },
  {
    type: "function",
    sign: "CE",
    action: () => {
      console.log("clear");
    },
  },
  {
    type: "number",
    sign: "4",
    value: 4,
  },
  {
    type: "number",
    sign: "5",
    value: 5,
  },
  {
    type: "number",
    sign: "6",
    value: 6,
  },
  {
    type: "operator",
    sign: "+",
    operator: "+",
  },
  {
    type: "number",
    sign: "1",
    value: 1,
  },
  {
    type: "number",
    sign: "2",
    value: 2,
  },
  {
    type: "number",
    sign: "3",
    value: 3,
  },
  {
    type: "operator",
    sign: "-",
    operator: "-",
  },
  {
    type: "number",
    sign: "0",
    value: 0,
  },
  {
    type: "function",
    sign: "=",
    action: () => {
      console.log("Вычисляем ответ");
    },
  },
  {
    type: "operator",
    sign: "×",
    operator: "*",
  },
  {
    type: "operator",
    sign: "÷",
    operator: "/",
  },
];