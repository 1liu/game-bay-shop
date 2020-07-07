import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      address2: '',
      country: '',
      state: '',
      zip: '',
      ccName: '',
      ccNumber: '',
      ccExp: '',
      ccCVV: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder({
      name: this.state.firstName + ' ' + this.state.lastName,
      creditCard: this.state.ccNumber,
      shippingAddress: this.state.address + ', ' + this.state.state + ', ' + this.state.zip
    });
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  }

  render() {
    return (
      <div className='container'>
        <div className="py-5 text-center">
          <h2>Checkout form</h2>
          <h1 className="text-danger">*Please do not enter real information.*</h1>
        </div>
        {/* Billing Address */}
        <div className="col-md-12 order-md-1">
          <h4 className="mb-3">Shipping address</h4>
          <form className="needs-validation" noValidate="" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder=""
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder=""
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
              <input type="email"
                className="form-control"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="you@example.com"
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="1234 Main St"
                value={this.state.address}
                onChange={this.handleChange}
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
              <input type="text"
                className="form-control"
                id="address2"
                name="address2"
                placeholder="Apartment or suite"
                value={this.state.address2}
                onChange={this.handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select className="custom-select d-block w-100"
                  id="country"
                  name="country"
                  value={this.state.country}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option>United States</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select className="custom-select d-block w-100"
                  id="state"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Choose...</option>
                  <option>California</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  placeholder=""
                  value={this.state.zip}
                  onChange={this.handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Zip code required.
                </div>
              </div>
            </div>

            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-name">Name on card</label>
                <input type="text"
                  className="form-control"
                  id="cc-name"
                  name="ccName"
                  placeholder=""
                  value={this.state.ccName}
                  onChange={this.handleChange}
                  required
                />
                <small className="text-muted">Full name as displayed on card</small>
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cc-number">Credit card number</label>
                <input type="text"
                  className="form-control"
                  id="cc-number"
                  name="ccNumber"
                  placeholder=""
                  value={this.state.ccNumber}
                  onChange={this.handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-expiration">Expiration</label>
                <input type="text"
                  className="form-control"
                  id="cc-expiration"
                  name="ccExp"
                  placeholder=""
                  value={this.state.ccExp}
                  onChange={this.handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Expiration date required
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="cc-cvv">CVV</label>
                <input type="text"
                  className="form-control"
                  id="cc-cvv"
                  name="ccCVV"
                  placeholder=""
                  value={this.state.ccCVV}
                  onChange={this.handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Security code required
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <img className="d-block mx-auto mb-4"
                  src="https://img.pngio.com/secure-checkout-png-1-png-image-secure-checkout-png-580_250.png"
                  alt="" width="300" height="" />
              </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">Place Order</button>
          </form>
        </div>
        {/* Payment */}
        {/* Footer */}
        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">&copy; 2020 Game Bay</p>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#">Privacy</a></li>
            <li className="list-inline-item"><a href="#">Terms</a></li>
            <li className="list-inline-item"><a href="#">Support</a></li>
          </ul>
        </footer>
      </div>

    );
  }
}
