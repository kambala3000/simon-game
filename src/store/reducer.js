import { CHANGE_DIFFICULTY } from './constants';

const initialState = {
  difficulty: 'medium',
  colorsSequence: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload
      };
    default:
      return state;
  }
}
