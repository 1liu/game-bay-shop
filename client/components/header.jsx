import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1 className="header"><span>$</span>Wicked Sales</h1>
          <div className="shoppingCartBtn">
            <p className='d-inline-block'>{this.props.cartItemCount} items</p>
            <i className="fas fa-shopping-cart" onClick={() => this.props.setView('cart', {})}></i>
          </div>
        </div>
      </div>
    );

  }
}
