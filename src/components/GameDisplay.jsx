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
      <div>
        <div>
          <SCButtonsRow>
            <ColoredButton bgColor="red" />
            <ColoredButton bgColor="green" />
          </SCButtonsRow>
          <SCButtonsRow>
            <ColoredButton bgColor="blue" />
            <ColoredButton bgColor="yellow" />
          </SCButtonsRow>
        </div>
        <button>Start game</button>
      </div>
    );
  }
}

const SCButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export default connect(null, null)(GameDisplay);
