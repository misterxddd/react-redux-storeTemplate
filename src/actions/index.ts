import { BookActions, AppAction, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_FAILURE, BOOK_ADDED_CART, ADD_CART_ITEM, CartActions, INCREASE_CART_ITEM, DECREASE_CART_ITEM, DELETE_CART_ITEM } from "../types/action";
import { BookType } from "../types/book";
import BookstoreService from "../services/bookstore-service";
import { Dispatch } from "react";
import { CartItemType } from "../types/cart";

const booksLoaded = (books: BookType[]): BookActions => ({
  type: FETCH_BOOKS_SUCCESS,
  books
});

const booksError = (errorMessage: string): BookActions => ({
  type: FETCH_BOOKS_FAILURE,
  errorMessage
});

const bookAddedCart = (bookId: number): BookActions => ({
  type: BOOK_ADDED_CART,
  bookId
});

const fetchBooks = (bookstoreService: BookstoreService, dispatch: Dispatch<AppAction>) => () => {
  bookstoreService.getBooks()
  .then((newBooks: BookType[]) => dispatch(booksLoaded(newBooks)))
  .catch((err: string) => dispatch(booksError(err)));
}

const cartItemAdd = (cartItem: CartItemType) => ({
  type: ADD_CART_ITEM,
  cartItem
});

const cartItemIncrease = (itemId: number): CartActions => ({
  type: INCREASE_CART_ITEM,
  itemId
});

const cartItemDecrease = (itemId: number): CartActions => ({
  type: DECREASE_CART_ITEM,
  itemId
});

const cartItemDelete = (itemId: number): CartActions => ({
  type: DELETE_CART_ITEM,
  itemId
});

export {
  fetchBooks,
  bookAddedCart,
  cartItemAdd,
  cartItemIncrease,
  cartItemDecrease,
  cartItemDelete
};