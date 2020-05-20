import React from 'react';

export default function Header(props) {
  return (
    <div className="navbar navbar-dark bg-dark justify-content-between m-auto sticky-top">
      <div className="container">
        <h5 className="click header-text my-auto text-white" onClick={() => props.setView('catalog', {})}>
          <i className="fas fa-gamepad"></i> Game Bay Shop
        </h5>
        <h6 className="click my-auto mr-3 text-white" onClick={() => props.setView('cart', {})}>
          {props.cartItemCount} items
          <i className="fas fa-shopping-cart m-2"></i>
        </h6>
      </div>
    </div>
  );
}
