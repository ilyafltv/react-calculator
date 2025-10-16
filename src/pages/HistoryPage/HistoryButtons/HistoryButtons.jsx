import Button from "@components/Button/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { editHistory } from "@redux/slices/expSlice";
import styles from "./HistoryButtons.module.scss";

const HistoryButtons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backHandler = () => {
    navigate("/");
  };

  const clearHistory = () => {
    localStorage.removeItem("calcHistory");
    dispatch(editHistory([]));
  };
  return (
    <div className={styles.root}>
      <Button type="clear" onClick={clearHistory}>
        Clear History
      </Button>
      <Button onClick={backHandler}>Back</Button>
    </div>
  );
};

export default HistoryButtons;
