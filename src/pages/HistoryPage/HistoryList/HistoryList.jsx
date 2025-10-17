import HistoryButtons from "@pages/HistoryPage/HistoryButtons/HistoryButtons";
import styles from "./HistoryList.module.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editHistory } from "@redux/slices/expSlice";
import { useLocalStorage } from "@hooks/useLocalStorage";

function HistoryList() {
  const history = useSelector((state) => state.exp.history);
  const dispatch = useDispatch();
  const { getHistory } = useLocalStorage();

  useEffect(() => {
    const savedHistory = getHistory();
    if (savedHistory.length > 0) dispatch(editHistory(savedHistory));
  }, [dispatch, getHistory]);

  return (
    <div className={styles.list}>
      <div className={styles.listItems}>
        {history.length > 0 ? (
          history.map((item, index) => {
            return (
              <div className={styles.listItem} key={index}>
                <p>
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
