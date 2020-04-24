import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="headerRow">
        <div className="container">
          <h1 className="header"><span>$</span>Wicked Sales</h1>
          <div className="shoppingCartBtn">
            <p>{this.props.cartItemCount} items</p>
            <i className="fas fa-shopping-cart"></i>
          </div>

        </div>
      </div>
    );

  }
}
