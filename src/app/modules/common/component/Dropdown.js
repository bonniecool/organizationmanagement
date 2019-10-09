import React, { Component } from "react";

class Dropdown extends Component {
  static defaultProps = {
    name: "Dropdown Here",
    menus: []
  };

  state = {
    isOpen: false
  };

  toggleOpen = () => {
    this.setState({
      isOpen: this.state.isOpen ? false : true
    });
  };

  componentDidMount() {
    document.body.addEventListener("click", this.dropdownHandler);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.dropdownHandler);
  }

  dropdownHandler = ({ target }) => {
    try {
      if (target.className.indexOf(this.props.keyName) < 0) {
        this.setState({
          isOpen: false
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { isOpen } = this.state;
    const { name, menus } = this.props;
    return (
      <div className={`dropdown mr-1 ${isOpen ? "show" : ""}`}>
        <button
          onClick={this.toggleOpen}
          type="button"
          className={`btn btn-sm dropdown-toggle ${this.props.keyName}`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {name}
        </button>

        <div className="dropdown-menu dropdown-menu-right">{menus}</div>
      </div>
    );
  }
}

export default Dropdown;
