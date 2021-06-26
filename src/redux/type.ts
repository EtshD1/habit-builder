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
  payload?: habit | number,
}

export type UserActionType = {
  type: string,
  payload?: firebase.User,
}

export const habitDispatches = {
  ADD: "ADD",
  CHECKIN: "CHECKIN"
}

export const userDispatches = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
}