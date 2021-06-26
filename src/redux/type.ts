import firebase from "firebase"

export type habit = {
  id: string,
  title: string,
  description: string,
  completed: Array<dateOfCompletion>,
  category: string
}

export type dateOfCompletion = {
  day: number,
  month: number,
  year: number
}

export type HabitActionType = {
  type: string,
  payload: habit | string,
}

export type UserActionType = {
  type: string,
  payload?: firebase.User,
}

export const habitDispatches = {
  ADD: "ADD",
  DELETE: "DELETE"
}

export const userDispatches = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
}