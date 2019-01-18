
import {
  SELECT_TYPE, BLOCK_USER, UNBLOCK_USER, COMMIT_SELECTION, RESET_GAME, SHOW_RESET_BTN, HIDE_RESET_BTN, COMMIT_COUNTS
} from './actions';


const initialState = {
  showResetBtn: false,
  counts: {
    cross: 0,
    zero: 0
  },
  userBlocked: false,
  userType: undefined,
  computerType: undefined,
  winPositions: [
    { 2: undefined, 5: undefined, 8: undefined },
    { 2: undefined, 4: undefined, 6: undefined },
    { 0: undefined, 4: undefined, 8: undefined },
    { 0: undefined, 1: undefined, 2: undefined },
    { 3: undefined, 4: undefined, 5: undefined },
    { 6: undefined, 7: undefined, 8: undefined },
    { 0: undefined, 3: undefined, 6: undefined },
    { 1: undefined, 4: undefined, 7: undefined }
  ]
};


export const crossZeroApp = createReducer(initialState, {
  [SELECT_TYPE]: (state, { selectionType, weaponType }) => 
    ({ ...state, userType: selectionType, computerType: !selectionType }),
  [BLOCK_USER]: toggleBlockUser,
  [UNBLOCK_USER]: toggleBlockUser,
  [COMMIT_SELECTION]: (state, { selectedNumber, weaponType }) => 
    ({ ...state, winPositions: state.winPositions.map(positionObject => positionObject.hasOwnProperty(selectedNumber) ? { ...positionObject, [selectedNumber]: weaponType } : positionObject)}),
  [RESET_GAME]: state => 
    ({ ...state, winPositions: state.winPositions.map(positionObject => {
      const justEmptyObject = {};
      for (const prop in positionObject) {
        if (positionObject.hasOwnProperty(prop)) {
          justEmptyObject[prop] = undefined;
        }
      }
      return justEmptyObject;
    }) }),
  [SHOW_RESET_BTN]: toggleResetBtn,
  [HIDE_RESET_BTN]: toggleResetBtn,
  [COMMIT_COUNTS]: (state, { counts }) => ({ ...state, counts: { ...state.counts, ...counts } })
});

function toggleBlockUser(state, { userBlocked }) {
  return {
    ...state,
    userBlocked
  };
}

function toggleResetBtn(state, { showResetBtn }) {
  return {
    ...state,
    showResetBtn
  };
}

function createReducer(initialState, handlers) {
  return function reducer(state= initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }else {
      return state;
    }
  }
}