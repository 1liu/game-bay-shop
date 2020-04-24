import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };

  }

  componentDidMount() {
    fetch('/api/products/' + this.props.params.productId)
      .then(response => response.json())
      .then(data => {
        this.setState({ product: data });
      })
      .catch(error => console.log('Fetch failed!', error));
  }

  render() {
    if (this.state.product !== null) {
      return (
        <div className="container">
          <div className="detail-container">
            <div className="control">
              <a href="#" className="btn" onClick={() => this.props.setView('catalog', {})}>&#60;Back to catalog</a>
            </div>
            <div className="row deltai-up no-gutters">
              <div className="col-md-4">
                <img src={this.state.product.image} className="card-img" alt="..."></img>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="detail-title">{this.state.product.name}</h5>
                  <p className="detail-title price">${(this.state.product.price / 100).toFixed(2)}</p>
                  <p className="detail-text">{this.state.product.shortDescription}</p>
                  <a href="#" className="btn btn-primary" onClick={() => this.props.addToCard(this.state.product)}>Add to Cart</a>
                </div>
              </div>
            </div>
            <div className="row card-body detail-botton">
              <p className="card-text">{this.state.product.longDescription}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }

  }
}
