import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="control">
          <a href="#" className="btn" onClick={() => this.props.setView('catalog', {})}>Back to catalog</a>
        </div>
        <h2>My Cart</h2>

        {this.props.cart.map(p => {
          return (
            <CartSummaryItem key={p.id} product={p} />
          );
        })}
        <div className='checkout-row'>
          <p>Item Total ${(this.props.total / 100).toFixed(2)}</p>
          {this.props.cart.length === 0 ? null : <a href="#" className="btn btn-primary checkout-button" onClick={() => this.props.setView('checkout', {})}>Checkout</a>}
        </div>
      </div>
    );

  }
}
