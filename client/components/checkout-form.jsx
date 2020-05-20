import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleCreditCardChange(event) {
    this.setState({
      creditCard: event.target.value
    });
  }

  handleAddressChange(event) {
    this.setState({
      shippingAddress: event.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <h2>My Cart</h2>
        <p>Order Total: ${(this.props.total / 100).toFixed(2)}</p>
        <form className=" mb-4 shadow-sm" onSubmit={() => this.props.placeOrder(this.state)}>
          <label htmlFor="name">Name</label>
          <div className="input-group mb-3">
            <input required type="text" className="form-control" id="name" value={this.state.name} aria-describedby="basic-addon3" onChange={this.handleNameChange} />
          </div>
          <label htmlFor="creditCard">Credit Card</label>
          <div className="input-group mb-3">
            <input required type="text" className="form-control" id="creditCard" value={this.state.creditCard} aria-describedby="basic-addon3" onChange={this.handleCreditCardChange} />
          </div>
          <label htmlFor="shippingAddress">Shipping Address</label>
          <div className="input-group mb-3">
            <textarea required type="text" className="form-control" id="shippingAddress" value={this.state.shippingAddress} aria-describedby="basic-addon3" onChange={this.handleAddressChange} />
          </div>
          <div className="button row d-flex">
            <a href="#" className="btn" onClick={() => this.props.setView('catalog', {})}>Continue Shopping</a>
            <div className="ml-auto">
              <button id="placeOrder" type="submit" className="btn btn-success">Place Order</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
