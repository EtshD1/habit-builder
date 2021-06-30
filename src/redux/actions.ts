import { HabitActionType, habitDispatches, habit, UserActionType, userDispatches } from "./type";
import firebase from "firebase/app";

export const addHabit = (newHabit: habit): HabitActionType => ({
  type: habitDispatches.ADD,
  payload: newHabit
});

export const removeHabit = (id: string): HabitActionType => ({
  type: habitDispatches.DELETE,
  payload: id
});

export const login = (user: firebase.User): UserActionType => ({
  type: userDispatches.LOGIN,
  payload: user
});

export const logout = (): UserActionType => ({
  type: userDispatches.LOGOUT
});

export const clearHabits = (): HabitActionType =>({
  type: habitDispatches.CLEAR,
  payload: ""
});