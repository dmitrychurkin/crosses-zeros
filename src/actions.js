
// action types
export const SELECT_TYPE = 'SELECT_TYPE';
export const BLOCK_USER = 'BLOCK_USER';
export const UNBLOCK_USER = 'UNBLOCK_USER';
export const COMMIT_SELECTION = 'COMMIT_SELECTION';
export const RESET_GAME = 'RESET_GAME';
export const SHOW_RESET_BTN = 'SHOW_RESET_BTN';
export const HIDE_RESET_BTN = 'HIDE_RESET_BTN';
export const COMMIT_COUNTS = 'COMMIT_COUNTS';


// other constants


// action creators

export function selectType(crossOrZero) {
  return {
    type: SELECT_TYPE,
    selectionType: crossOrZero
  }
}

export function blockUser() {
  return {
    type: BLOCK_USER,
    userBlocked: true
  }
}

export function unBlockUser() {
  return {
    type: UNBLOCK_USER,
    userBlocked: false
  }
}

export function commitSelection(selectedNumber, weaponType) {
  return {
    type: COMMIT_SELECTION,
    selectedNumber,
    weaponType
  };
}

export function resetGame() {
  return {
    type: RESET_GAME
  };
}

export function showResetBtn() {
  return {
    type: SHOW_RESET_BTN,
    showResetBtn: true
  }
}

export function hideResetBtn() {
  return {
    type: SHOW_RESET_BTN,
    showResetBtn: false
  }
}

export function commitCounts(counts) {
  return {
    type: COMMIT_COUNTS,
    counts
  };
}