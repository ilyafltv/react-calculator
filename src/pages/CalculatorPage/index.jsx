import Screen from "@pages/CalculatorPage/components/Screen";
import Keyboard from "@pages/CalculatorPage/components/Keyboard/Keyboard";
import Button from "@components/Button";

const CalculatorPage = () => {
  return (
    <>
      <div>
        <Screen />
        <Keyboard />
        {/* <Button>History</Button> */}
      </div>
    </>
  );
};

export default CalculatorPage;
