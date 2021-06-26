import plusIcon from "./images/plusIcon.svg";

import firebase from "firebase";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeType } from "../redux/reducers";
import { addHabit } from "../redux/actions";

const Body = ({ add }: { add: Function }) => {
  const db = useMemo(() => firebase.firestore(), []);
  const dispatcher = useDispatch();
  const habits = useSelector((state: storeType) => state.habits);

  const habitsRef = useMemo(() => {
    return db
      .collection("habits")
      .orderBy("createdAt")
      .onSnapshot((query) => {
        query.docs.forEach((item) => {
          const data = item.data();
          dispatcher(
            addHabit({
              id: item.id,
              title: data.title,
              category: data.category,
              description: data.description,
              completed: [],
            })
          );
        });
      });
  }, [db, dispatcher]);

  useEffect(() => {
    return habitsRef;
  });

  return (
    <div className="body">
      <div className="addBtn">
        <div onClick={() => add()}>
          <img src={plusIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Body;
