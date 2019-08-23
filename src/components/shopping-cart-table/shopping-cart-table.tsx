import React, { Dispatch } from 'react';

import './shopping-cart-table.css';
import { AppState } from '../../store';
import { CartItemType } from '../../types/cart';
import { connect } from 'react-redux';
import { AppAction } from '../../types/action';
import { cartItemIncrease, cartItemDecrease, cartItemDelete } from '../../actions';

type ShoppingCartProps = {}

type Props = ShoppingCartProps & LinkStateProps & LinkDispatchProps;

const ShoppingCartTable: React.SFC<Props> = (props) => {
  const {items, totalOrder, onIncrease, onDecrease, onDelete} = props;

  const renderRow = (item: CartItemType, idx: number) => {
    const { id, title, count, total } = item;
    return (
      <tr key={id}>
        <td>{idx+1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>${total}</td>
        <td>
        <button 
          onClick={() => onDelete(id)}
          className="btn btn-outline-danger btn-sm float-right">
            <span className="fa fa-trash-o" />
          </button>
          <button 
            onClick={() => onIncrease(id)}
            className="btn btn-outline-success btn-sm float-right">
            <span className="fa fa-plus-circle" />
          </button>
          <button 
            onClick={() => onDecrease(id)}
            className="btn btn-outline-warning btn-sm float-right">
            <span className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">

        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            items.map(renderRow)
          }
        </tbody>

      </table>

      <div className="total">
        Total: ${totalOrder}
      </div>
    </div>
  );
};

interface LinkStateProps {
  items: CartItemType[];
  totalOrder: number;
}

interface LinkDispatchProps {
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
}

const mapStateToProps = (state: AppState): LinkStateProps => {
  return {
    items: state.cart.cartItems,
    totalOrder: state.cart.totalOrder
  };
} 

const mapDispatchToProps = (dispatch: Dispatch<AppAction>,): LinkDispatchProps => {
  return {
    onIncrease: (id: number) => dispatch(cartItemIncrease(id)),
    onDecrease: (id: number) => dispatch(cartItemDecrease(id)),
    onDelete: (id: number) => dispatch(cartItemDelete(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);