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
        </div>
      </div>
    );

  }
}
