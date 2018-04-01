import {
  CHANGE_DIFFICULTY,
  TURN_GAME_OFF,
  ADD_COLOR_TO_SEQUENCE,
  WRITE_INPUT_INDEX,
  FAIL_GAME,
  CHANGE_PLAYING_STATUS,
  SET_ACTIVE_COLOR
} from './constants';

const initialState = {
  difficulty: 'medium',
  colorsSequence: [],
  activeColor: '',
  isPlayingSequence: false,
  userInputIndex: null,
  isSequenceFailed: false
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        difficulty: payload
      };
    case TURN_GAME_OFF:
      return {
        ...state,
        colorsSequence: [],
        activeColor: '',
        isPlayingSequence: false,
        userInputIndex: null,
        isSequenceFailed: false
      };
    case ADD_COLOR_TO_SEQUENCE:
      return { ...state, colorsSequence: [...state.colorsSequence, payload] };
    case WRITE_INPUT_INDEX:
      return { ...state, userInputIndex: payload };
    case FAIL_GAME:
      return { ...state, isSequenceFailed: true };
    case CHANGE_PLAYING_STATUS:
      return {
        ...state,
        isPlayingSequence: !state.isPlayingSequence,
        activeColor: '',
        userInputIndex: 0
      };
    case SET_ACTIVE_COLOR:
      return { ...state, activeColor: payload };
    default:
      return state;
  }
}
