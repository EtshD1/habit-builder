import { ActionType, dispatchTypes, habit } from "./type";

export const addHabit = (newHabit: habit): ActionType => ({
  type: dispatchTypes.ADD,
  payload: newHabit
});

export const checkIn = (index: number): ActionType => ({
  type: dispatchTypes.CHECKIN,
  payload: index
});