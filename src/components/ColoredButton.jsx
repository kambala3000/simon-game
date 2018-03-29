import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ColoredButton = ({ bgColor }) => {
  return <SCButton bgColor={bgColor} />;
};

ColoredButton.propTypes = {
  bgColor: PropTypes.string.isRequired
};

const SCButton = styled.button`
  width: 100px;
  height: 100px;
  border: none;
  outline: none;
  background-color: ${({ bgColor }) => bgColor};
`;

export default ColoredButton;
