import { BookType } from "./book";

export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const BOOK_ADDED_CART = 'BOOK_ADDED_CART';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const INCREASE_CART_ITEM = 'INCREASE_CART_ITEM';
export const DECREASE_CART_ITEM = 'DECREASE_CART_ITEM';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export type LoadedAction = {
  type: typeof FETCH_BOOKS_SUCCESS;
  books: BookType[];
}

export type ErrorAction = {
  type: typeof FETCH_BOOKS_FAILURE;
  errorMessage: string;
}

export type BookAdded = {
  type: typeof BOOK_ADDED_CART;
  bookId: number;
  book?: BookType;
}

export type BookActions = LoadedAction | ErrorAction | BookAdded;

export type IncreaseAction = {
  type: typeof INCREASE_CART_ITEM;
  itemId: number;
}

export type DecreaseAction = {
  type: typeof DECREASE_CART_ITEM;
  itemId: number;
}

export type DeleteAction = {
  type: typeof DELETE_CART_ITEM;
  itemId: number;
}

export type CartActions = IncreaseAction | DecreaseAction | DeleteAction;

export type AppAction = BookActions | CartActions;