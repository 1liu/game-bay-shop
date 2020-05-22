import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {
    return (
      <div className="container cart-content col-md-8 m-auto">
        <div className="control">
          <a href="#" className="btn my-3" onClick={() => this.props.setView('catalog', {})}>
            <i className="fas fa-chevron-circle-left mr-1"></i>
            Back to catalog
          </a>
        </div>
        <h2>My Cart</h2>
        {this.props.cart.map((p, key) => {
          return (
            <CartSummaryItem key={key} product={p} />
          );
        })}
        <div className='checkout-row d-flex justify-content-between mb-2'>
          <p className='d-inline-block'>Item Total ${(this.props.total / 100).toFixed(2)}</p>
          {this.props.cart.length === 0 ? null : <a href="#" className="btn btn-primary checkout-button" onClick={() => this.props.setView('checkout', {})}>Checkout</a>}
        </div>
      </div>
    );
  }
}
