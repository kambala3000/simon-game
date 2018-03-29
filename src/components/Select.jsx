import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

class Select extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired
  };

  state = {
    showMenu: false
  };

  handleSelectClick = () => {
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));
  };

  render() {
    const { selected, options } = this.props;
    const valueLabel = options.find(item => item.value === selected).label;

    return <div>{valueLabel}</div>;
  }
}

export default Select;
