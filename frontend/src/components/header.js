import React from 'react';
import './header.css';
import Plus from '../add.png';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return (
      <div className="Header">
        Notes App
        <div class="vl"></div>
        {/* <div > */}
          <input className="add" type="image" title="Create note" src={Plus} onClick={this.props.onCreate} />
        {/* </div> */}
      </div>
    );
  }
}

export default Header;