import { BOOK_ADDED_CART, AppAction, INCREASE_CART_ITEM, DECREASE_CART_ITEM, DELETE_CART_ITEM } from "../types/action";
import { CartItemType } from "../types/cart";
import { BookType } from "../types/book";

export interface CartItemReducerType {
  cartItems: CartItemType[];
  totalOrder: number;
}

const initialState: CartItemReducerType = {
  cartItems: [],
  totalOrder: 0
};

const cartItemReducer = (state = initialState, action: AppAction): CartItemReducerType => {
  switch(action.type) {
    case BOOK_ADDED_CART:
      const {book} = action;
      if (book) {
        const newItemId = book.id;
        const itemIdx = state.cartItems.findIndex(({id}) => id === newItemId);
        const item = state.cartItems[itemIdx];

        const cartItems = updateCartItems(state.cartItems, createCartItem(book, item), itemIdx);
        const totalOrder = updateTotalOrder(cartItems);

        return {
          totalOrder,
          cartItems
        }
      }
      return state;

    case INCREASE_CART_ITEM:
      return updateOrder(state, action.itemId, 'INC');

    case DECREASE_CART_ITEM:
      return updateOrder(state, action.itemId, 'DEC');

    case DELETE_CART_ITEM:
      const itemIdx = state.cartItems.findIndex(({id}) => id === action.itemId);
      const cartItems = [...state.cartItems.slice(0, itemIdx), ...state.cartItems.slice(itemIdx + 1)];
      const totalOrder = updateTotalOrder(cartItems);

      return {
        totalOrder,
        cartItems 
      }
    default:
      return state;
  }
};

const updateOrder = (state: CartItemReducerType, itemId: number, actionType: string): CartItemReducerType => {
  const itemIdx = state.cartItems.findIndex(({id}) => id === itemId);
      
  const cartItems = updateCartItems(state.cartItems, updateCartItem(state.cartItems[itemIdx], actionType), itemIdx);
  const totalOrder = updateTotalOrder(cartItems);

  return {
    totalOrder,
    cartItems
  }
}

const updateCartItems = (cartItems: CartItemType[], item: CartItemType, idx: number) => {

  if (idx === -1) {
    return [...cartItems, item]
  } else {
    return [
      ...cartItems.slice(0, idx), 
      item, 
      ...cartItems.slice(idx + 1)
    ]
  }
} 

const updateCartItem  = (item: CartItemType, actionType: string): CartItemType => {
  switch(actionType) {
    case 'INC': 
      return {
        ...item,
        count: item.count + 1,
        total: item.total + (item.total / item.count)
      }
    case 'DEC':
      if (item.count === 1) {
        return item;
      }
      return {
        ...item,
        count: item.count - 1,
        total: item.total - (item.total / item.count)
      }
    default: 
      return item;
  }
}

const createCartItem = (book: BookType, item: CartItemType): CartItemType => {
  if (item) {
    return {
      ...item,
      count: item.count + 1,
      total: item.total + book.price
    }
  } else {
    return {
      id: book.id,
      title: book.title,
      count: 1,
      total: book.price
    }
  }

}

const updateTotalOrder = (cartItems: CartItemType[]): number => {
  let sum: number = 0;
  cartItems.forEach((item) => {
    sum += item.total; 
  })

  return sum;
}

export default cartItemReducer;