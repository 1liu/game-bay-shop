import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'catalog',
      params: {},
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCard = this.addToCard.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      name: name,
      params: params
    });
  }

  getCartItems() {
    console.log('Featching Cart');
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(error => console.log('Fetch cart failed!', error));
  }

  addToCard(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        const newCart = this.state.cart.slice();
        newCart.push(data);
        this.setState({ cart: newCart });
      })
      .catch(error => console.log('Fetch cart failed!', error));
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ cart: [] });
        this.setView('catalog', {});
      })
      .catch(error => console.log('Fetch cart failed!', error));
  }

  calcTotal() {
    let total = 0;
    this.state.cart.forEach(item => { total += item.price; });
    return total;
  }

  render() {
    if (this.state.name === 'catalog') {
      return (
        <div className="container-fluid">
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          <ProductList setView={this.setView} />
        </div>
      );
    } else if (this.state.name === 'details') {
      return (
        <div className="container-fluid">
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          <ProductDetails setView={this.setView} params={this.state.params} addToCard={this.addToCard}/>
        </div>
      );
    } else if (this.state.name === 'cart') {
      return (
        <div className="container-fluid">
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          <CartSummary total={this.calcTotal()} cart={this.state.cart} setView={this.setView} placeOrder={this.placeOrder}/>
        </div>
      );
    } else if (this.state.name === 'checkout') {
      return (
        <div className="container-fluid">
          <CheckoutForm total={this.calcTotal()} placeOrder={this.placeOrder} setView={this.setView}/>
        </div>
      );
    }
  }
}
