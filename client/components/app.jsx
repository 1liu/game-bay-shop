import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
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

  render() {
    if (this.state.name === 'catalog') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length}/>
          <ProductList setView={this.setView} />
        </div>
      );
    } else if (this.state.name === 'details') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length}/>
          <ProductDetails setView={this.setView} params={this.state.params} addToCard={this.addToCard}/>
        </div>
      );
    }

  }
}
