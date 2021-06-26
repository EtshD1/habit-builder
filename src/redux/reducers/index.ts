import { habit, HabitActionType, habitDispatches, userDispatches, UserActionType } from "../type";
import firebase from "firebase";
import { combineReducers} from 'redux';

const habitsReducer = (state: Array<habit> = [], action: HabitActionType) => {
  switch (action.type) {
    case habitDispatches.ADD:
      if (typeof action.payload === "object") {
        const id = action.payload.id;
        const found = state.find(i=>  i.id === id);
        if (!found) {
          return [...state, action.payload];
        }
      } else console.warn("Payload supplied incorrectly\n")
      return [...state];
    case habitDispatches.CHECKIN:
      const newState = [...state];
      if (typeof action.payload == "number") {
        const today = new Date();
        newState[action.payload].completed.push({
          day: today.getDate(),
          month: today.getMonth(),
          year: today.getFullYear()
        });
      } else {
        console.warn("Payload supplied incorrectly\n");
      }
      return newState;
  }
  return state;
}

const userReducer = (state:firebase.User| null = null, action: UserActionType) => {
  switch (action.type) {
    case userDispatches.LOGIN:
      return action.payload;
    case userDispatches.LOGOUT:
      return null;
  }
  return state;
}

const allReducers = combineReducers({
  user: userReducer,
  habits: habitsReducer
});

export default allReducers;

export type storeType = {
  user:firebase.User| null| undefined,
  habits: Array<habit> 
}