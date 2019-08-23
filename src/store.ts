import {createStore} from 'redux';

import { booksReducer, errorReducer, cartItemReducer } from './reducers';
import { BookType } from './types/book';
import { AppAction, BOOK_ADDED_CART } from './types/action';
import { CartItemReducerType } from './reducers/cart-items-reducer';

export type AppState = {
  books: BookType[];
  error: string;
  cart: CartItemReducerType;
};

const initialState: AppState = {
  books: [],
  error: '',
  cart: {cartItems: [], totalOrder: 0}
}

export const rootReducer = (state: AppState = initialState, action: AppAction) => {
  if (action.type === BOOK_ADDED_CART) {
    const book = state.books.find((book) => book.id === action.bookId);
    if (book) {
      return {
        ...state,
        cart: cartItemReducer(state.cart, {...action, book})
      }
    }
  }

  return {
    books: booksReducer(state.books, action),
    error: errorReducer(state.error, action),
    cart: cartItemReducer(state.cart, action)
  }
}

const store = createStore(rootReducer);

export default store;