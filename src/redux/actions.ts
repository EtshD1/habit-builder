import { HabitActionType, habitDispatches, habit, UserActionType, userDispatches } from "./type";
import firebase from "firebase";

export const addHabit = (newHabit: habit): HabitActionType => ({
  type: habitDispatches.ADD,
  payload: newHabit
});

export const checkIn = (index: number): HabitActionType => ({
  type: habitDispatches.CHECKIN,
  payload: index
});

export const login = (user: firebase.User): UserActionType => ({
  type: userDispatches.LOGIN,
  payload: user
});

export const logout = ():UserActionType => ({
  type: userDispatches.LOGOUT
})