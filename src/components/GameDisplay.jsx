import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// components
import ColoredButton from './ColoredButton';

// store
// import {} from '../store/actions';

class GameDisplay extends Component {
  render() {
    return (
      <SCAligner>
        <SCDisplayWrap>
          <SCButtonsRow>
            <ColoredButton bgColor="#4CAF50" />
            <ColoredButton bgColor="#F44336" />
          </SCButtonsRow>
          <SCButtonsRow>
            <ColoredButton bgColor="#FFEB3B" />
            <ColoredButton bgColor="#2196F3" />
          </SCButtonsRow>
        </SCDisplayWrap>
        <SCStartButton>Start game</SCStartButton>
      </SCAligner>
    );
  }
}

const SCAligner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SCDisplayWrap = styled.div`
  padding-bottom: 30px;
`;

const SCButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-right: 1px solid #212121;
  border-left: 1px solid #212121;
  :first-child {
    border-top: 1px solid #212121;
  }
  :last-child {
    border-bottom: 1px solid #212121;
  }
`;

const SCStartButton = styled.button`
  padding: 3px 8px;
  font: 18px 'Roboto', sans-serif;
  text-align: center;
  background-color: #eeeeee;
  border-radius: 2px;
  border: 1px solid #212121;
  outline: none;
  cursor: pointer;
`;

export default connect(null, null)(GameDisplay);
