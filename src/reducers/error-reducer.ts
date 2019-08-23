import { AppAction, FETCH_BOOKS_FAILURE } from "../types/action";


const initialState: string = '';

const errorReducer = (state = initialState, action: AppAction): string => {
  switch(action.type) {
    case FETCH_BOOKS_FAILURE:
      return action.errorMessage;
    default:
      return state;
  }
}

export default errorReducer;