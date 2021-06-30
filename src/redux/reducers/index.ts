import { habit, HabitActionType, habitDispatches, userDispatches, UserActionType } from "../type";
import firebase from "firebase";
import { combineReducers } from 'redux';

const habitsReducer = (state: Array<habit> = [], action: HabitActionType) => {
  switch (action.type) {
    case habitDispatches.ADD:
      if (typeof action.payload === "object") {
        const id = action.payload.id;
        const found = state.findIndex(i => i.id === id);
        if (found !== -1) {
          return [...state.slice(0, found), action.payload, ...state.slice(found + 1)];
        } else {
          return [...state, action.payload];
        }
      } else console.warn("Payload supplied incorrectly\n");
      return [...state];
    case habitDispatches.DELETE:
      const foundHabit = state.findIndex(i => i.id === action.payload);
      return [...state.slice(0, foundHabit), ...state.slice(foundHabit + 1)];
    case habitDispatches.CLEAR:
      return [];
  }
  return state;
}

const userReducer = (state: firebase.User | null = null, action: UserActionType) => {
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
  user: firebase.User | null | undefined,
  habits: Array<habit>
}