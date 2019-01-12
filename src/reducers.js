
import {
  SELECT_TYPE
} from './actions';


const initialState = {
  userType: null,
  computerType: null,
  fieldsPosition: Array(9).fill(null)
};


export const crossZeroApp = createReducer(initialState, {
  [SELECT_TYPE]: (state, { selectionType }) => 
    ({ ...state, ...{ userType: selectionType, computerType: !selectionType } })
});


function createReducer(initialState, handlers) {
  return function reducer(state= initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }else {
      return state;
    }
  }
}