import ButtonCalc from "../ButtonCalc.jsx";
import { keyboardList } from "./KeyboardConfig.js";
import "./Keyboard.scss";

const Keyboard = () => {
  return (
    <div className="keyboard">
      {keyboardList.map((item, index) => (
        <ButtonCalc value={item} key={index} />
      ))}
    </div>
  );
};

export default Keyboard;
