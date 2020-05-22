import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDesktop: window.innerHeight > 1000
    };
  }

  render() {
    const isDesktop = this.state.isDesktop;
    return (
      <div className="card category-card">
        <img src={this.props.image} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          {isDesktop ? (
            <p className="card-text">{this.props.shortDescription}</p>
          ) : null
          }
        </div>
      </div>
    );
  }
}
