import { BookType } from "../types/book";
import { FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE, AppAction } from "../types/action";

const initialState: BookType[] = [];

const booksReducer = (state = initialState, action: AppAction): BookType[] => {
  switch(action.type) {
    case FETCH_BOOKS_SUCCESS:
      return action.books;
    case FETCH_BOOKS_FAILURE:
      return [];
    default:
      return state;
  }
};

export default booksReducer;