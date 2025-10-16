import HistoryButtons from "@pages/HistoryPage/HistoryButtons/HistoryButtons";
import styles from "./HistoryList.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editHistory } from "@redux/slices/expSlice";

function HistoryList() {
  const history = useSelector((state) => state.exp.history);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedHistory = localStorage.getItem("calcHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        dispatch(editHistory(parsedHistory));
      } catch (error) {
        console.error("Error parsing saved history:", error);
      }
    }
  }, [dispatch]);

  return (
    <div className={styles.list}>
      <div className={styles.listItems}>
        {history.length > 0 ? (
          history.map((item, index) => {
            return (
              <div className={styles.listItem}>
                <p key={index}>
                  {item.exp} = <span>{item.result}</span>
                </p>
              </div>
            );
          })
        ) : (
          <h3 className={styles.caption}>History is empty</h3>
        )}
      </div>

      <HistoryButtons />
    </div>
  );
}

export default HistoryList;
