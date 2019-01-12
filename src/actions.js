
// action types
export const SELECT_TYPE = 'SELECT_TYPE';


// other constants


// action creators

export function selectType(crossOrZero) {
  return {
    type: SELECT_TYPE,
    selectionType: crossOrZero
  }
}