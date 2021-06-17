export type habit = {
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

export type ActionType = {
  type: string,
  payload?: habit | number,
}

export const dispatchTypes = {
  ADD: "ADD",
  CHECKIN: "CHECKIN"
}