import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="headerRow bg-dark">
        <div className="container">
          <nav className="navbar navbar-dark justify-content-between">
            <a className="navbar-brand" href="#"><i className="fas fa-dollar-sign"></i> Wicked Sales</a>
            <div className="shoppingCartBtn pointer" onClick={() => this.props.setView('cart', {})}>
              <p className='d-inline-block'>{this.props.cartItemCount} items</p>
              <i className="fas fa-shopping-cart"></i>
            </div>
          </nav>
        </div>
      </div>
    );

  }
}
