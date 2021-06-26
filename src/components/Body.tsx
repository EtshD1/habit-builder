import plusIcon from "./images/plusIcon.svg";

import firebase from "firebase";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeType } from "../redux/reducers";
import { addHabit } from "../redux/actions";
import categories from "../categories";
import { dateOfCompletion } from "../redux/type";

type dayInfo = {
  dayOfWeek: string,
  day: number,
  month: number,
  year: number
}

const getWeekDates = () => {
  const weeklyDaysNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const today = new Date();
  const startOfWeek = new Date(today.getTime() - (today.getDay() * 86400000));

  const weekDates: Array<dayInfo> = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek.getTime() + (i * 86400000));
    weekDates.push({
      dayOfWeek: weeklyDaysNames[day.getDay()],
      day: day.getDate(),
      month: day.getMonth(),
      year: day.getFullYear()
    });
  }
  return weekDates;
}

const Habit = (props: { title: string, description: string, category: string, completed: Array<dateOfCompletion> }) => {
  const { title, description, category, completed } = props;

  const weekDates = getWeekDates();

  const color = categories.find(i => i.name === category)?.color;

  const isCompleted = () => {
    const today = new Date();
    const weekToday = weekDates[today.getDay()];
    const foundDay = completed.find(d => (d.day === weekToday.day && d.month === weekToday.month && d.year === weekToday.year))
    if (foundDay) {
      return true;
    }
    return false;
  }

  return (<div className="habit">
    <div className="title" style={{ color }}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
    <div className="track">
      <div className="summary">
        <h3>Weekly Track</h3>
        <div className="weeklyDays">
          {weekDates.map((day, index) => {
            return (
              <span key={`${day.dayOfWeek}:${index}`}>{day.dayOfWeek}</span>
            );
          })}
        </div>
        <div>
          {weekDates.map((day, index) => {
            const condition = (completed.find(i => (i.day === day.day && i.month === day.month && i.year === day.year)));
            return (
              <span key={`${day.dayOfWeek}:${index}`}>{condition ? <svg width="16" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8L6 12L14 1" strokeWidth="2" stroke={color} />
              </svg>
                : <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="cross" d="M1 1L10 10M1 10L10 1" strokeWidth="2" stroke="black" />
                </svg>
              }</span>
            );
          })}
        </div>
      </div>
      {isCompleted() ? <div className="taskDone" style={{ color }}><div>Great</div><div>Job!</div></div> : <><div className="checkIn" style={{ backgroundColor: color }}>
        <svg className="desktopCheck" width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 24.2L17.6667 39L47 2" stroke="#F4F4F4" strokeWidth="6" />
        </svg>
      </div>
        <div className="mobileCheck">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill={color} stroke="black" />
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60">
              <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" fill={color} stroke="black" />
            </mask>
            <g mask="url(#mask0)">
              <path d="M8 31.2L25.3333 46L60 9" stroke="#F4F4F4" strokeWidth="6" />
            </g>
          </svg>
        </div>
      </>}
    </div>
  </div>);
}

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
              completed: data.completed
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
      {habits.map((h => {
        return <Habit title={h.title} description={h.description} category={h.category} completed={h.completed} key={h.id} />
      }))}
      <div className="addBtn">
        <div onClick={() => add()}>
          <img src={plusIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Body;
