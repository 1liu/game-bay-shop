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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
  }

  render() {
    return (
      <div className="container checkout-container col-md-8 m-auto">
        <h2>My Cart</h2>
        <p>Order Total: ${(this.props.total / 100).toFixed(2)}</p>
        <form className=" mb-4 shadow-sm" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              value={this.state.name}
              aria-describedby="basic-addon3"
              onChange={this.handleNameChange}
              required />
          </div>
          <label htmlFor="creditCard">Credit Card</label>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              id="creditCard"
              value={this.state.creditCard}
              aria-describedby="basic-addon3"
              onChange={this.handleCreditCardChange}
              required />
          </div>
          <label htmlFor="shippingAddress">Shipping Address</label>
          <div className="input-group mb-3">
            <textarea
              type="text"
              className="form-control"
              id="shippingAddress"
              value={this.state.shippingAddress}
              aria-describedby="basic-addon3"
              onChange={this.handleAddressChange}
              required />
          </div>
          <div className="pointer text-muted" >
            <div className="ml-auto">
              <button
                id="placeOrder"
                type="submit"
                className="btn btn-success"
              >
                Place Order
              </button>
            </div>
            <div className="mt-2" onClick={() => this.props.setView('catalog', {})}>
              <i className="fas fa-arrow-circle-left mr-2 "></i>
                Continue Shopping
            </div>
          </div>
        </form>
        <h1 className="text-danger">*Please do not enter real information.*</h1>
      </div>
    );
  }
}
