import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class ColoredButton extends Component {
  static propTypes = {
    bgColor: PropTypes.string.isRequired
  };

  render() {
    const { bgColor } = this.props;

    return <SCButton bgColor={bgColor} />;
  }
}

const SCButton = styled.button`
  width: 300px;
  height: 300px;
  border: none;
  outline: none;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  border: 1px solid #212121;
`;

export default ColoredButton;
