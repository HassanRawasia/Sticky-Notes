import React from 'react';
import './header.css';
import Plus from '../add.png';
import Logo from '../logo.png';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Header">
        <img className="logo" src={Logo} />
        <div class="vl"></div>
        <figure className="text">
          <input className="add" type="image" title="Create note" src={Plus} onClick={this.props.onCreate} />
          <figcaption className="caption">&ensp;&nbsp;Add note</figcaption>
        </figure>
      </div>
    );
  }
}

export default Header;