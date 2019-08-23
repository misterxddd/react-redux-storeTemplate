import React from 'react';
import { Link } from 'react-router-dom';

import './shop-header.css';
import { AppState } from '../../store';
import { connect } from 'react-redux';

type Props = LinkStateProps;

const ShopHeader: React.SFC<Props> = (props) => {
  const { numItems, total } = props;
  return (
    <header className="shop-header">
      <Link to="/" className="logo text-dark">ReStore</Link>
      <Link to="/cart" className="shopping-cart">
        <span className="cart-icon fa fa-shopping-cart" />
        {numItems} items ($ {total})
      </Link>
    </header>
  );
};

interface LinkStateProps {
  numItems: number;
  total: number;
}

const mapStateToProps = (state: AppState): LinkStateProps  => {
  return {
    numItems: state.cart.cartItems.length,
    total: state.cart.totalOrder
  }
}

export default connect(mapStateToProps)(ShopHeader);