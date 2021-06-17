import { habit, ActionType, dispatchTypes } from "../type";

const habitReducer = (state: Array<habit> = [], action: ActionType) => {
  switch (action.type) {
    case dispatchTypes.ADD:
      return [...state, action.payload];
    case dispatchTypes.CHECKIN:
      const newState = [...state];
      if (typeof action.payload == "number") {
        const today = new Date();
        newState[action.payload].completed.push({
          day: today.getDate(),
          month: today.getMonth(),
          year: today.getFullYear()
        });
      } else {
        throw new Error("Payload supplied incorrectly\n");
      }
      return newState;
  }

}

export default habitReducer;