import React from 'react';

function AddModal(props) {
  return (
    <div className="backdrop position-fixed d-flex h-100 w-100">
      <div className="modal-contents m-auto bg-white border rounded p-3">
        <h2 className="m-2">Item added to cart</h2>
        <p className="m-2">{props.product.name} has been added to your cart.</p>
        <div className="btn-group w-100 p-1">
          <button className="btn btn-secondary w-50 mr-1" onClick={() => props.setView('catalog', {})}>Continue Shopping</button>
          <button className="btn btn-success w-50 ml-1" onClick={() => props.setView('cart', {})}>Go to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
