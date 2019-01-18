
export class WinResult {
  constructor(index, crosses = true) {
    this.index = index;
    this.crosses = crosses;
    this.zeros = !this.crosses;
  }
}


/**
 * Get current game fields situation
 * 
 * @param {Array<{ [index: number]: boolean | undefined }>} fieldState$ 
 * @return {Array<boolean>}
 */
export function getFields(fieldState$) {

  const fields = Array(9).fill(undefined);

  for (let index = 0; index < fieldState$.length; index++) {
    const winPositionsObj = fieldState$[index];

    for (const posIndex in winPositionsObj) {
      if (winPositionsObj.hasOwnProperty(posIndex) && typeof fields[posIndex] === 'undefined' && typeof winPositionsObj[posIndex] !== 'undefined') {
        fields[posIndex] = winPositionsObj[posIndex];
      }
    }
  }

  return fields;
}


/**
* get computer selected cell number, to commit a pace
* @param {Array<{ [index: number]: boolean | undefined }>} fieldState$ 
* @param {boolean} userType  
* @return {number}
*/
export function selectCell(fieldState$, userType) {

  const getCellIndexBaseOnCriticalPositionsFor = weaponType => {
    const criticalPositions = getCriticalPositionIndexes(fieldState$, weaponType);
    if (criticalPositions.length) {
      const selectedRandomIndex = getRandomValue(criticalPositions.length);
      const positionObject = fieldState$[criticalPositions[selectedRandomIndex]];
      for (const posIndex in positionObject) {
        if (positionObject.hasOwnProperty(posIndex) && typeof positionObject[posIndex] === 'undefined') {
          return +posIndex;
        }
      }
    }
  };
  const computerType = !userType;

  // find out whether computer may attack and win
  let posIndex = getCellIndexBaseOnCriticalPositionsFor(computerType);
  if (typeof posIndex === 'number') {
    return posIndex;
  }

  // computer protecting self
  posIndex = getCellIndexBaseOnCriticalPositionsFor(userType);
  if (typeof posIndex === 'number') {
    return posIndex;
  }

  // ok, we didn't find any critical situations so let's try to attack
  const positionsToAttack = getPositionsToAttack(fieldState$, computerType);

  if (positionsToAttack.length) {
    const selectedRandomIndex = getRandomValue(positionsToAttack.length);
    const { computerPossibleCellsToSelect } = positionsToAttack[selectedRandomIndex];
    posIndex = computerPossibleCellsToSelect[getRandomValue(computerPossibleCellsToSelect.length)];
    return +posIndex;
  }

  // just select any empty cell
  const emptyCellIndexes = getEmptyIndexes(fieldState$);
  if (userType && emptyCellIndexes.includes(4)) {
    return 4;
  }
  const selectedRandomIndex = getRandomValue(emptyCellIndexes.length);
  posIndex = emptyCellIndexes[selectedRandomIndex];

  return +posIndex;

}

/**
 * Base on redux store win fields return win position if any or undefined
 * 
 * @param {Array<{ [index: number]: boolean | undefined }>} fieldState$ 
 * @return {WinResult | undefined}
 */
export function calculateWinPosition(fieldState$) {
  for (let index = 0; index < fieldState$.length; index++) {
    const winPositionsObj = fieldState$[index];

    let crossHitsCount = 0, zeroHitsCount = 0;

    for (const posIndex in winPositionsObj) {
      if (winPositionsObj.hasOwnProperty(posIndex) && typeof winPositionsObj[posIndex] !== 'undefined') {
        winPositionsObj[posIndex] ? crossHitsCount++ : zeroHitsCount++;
        if (crossHitsCount === 3) {
          return new WinResult(index);
        }
        if (zeroHitsCount === 3) {
          return new WinResult(index, false);
        }
      }
    }


  }
}

/**
 * Check if game is over
 * 
 * @param {Array<{ [index: number]: boolean | undefined }>} fieldState$ 
 * @return {boolean}
 */
export function checkEndOfGame(fieldState$) {
  const winResult = calculateWinPosition(fieldState$);
  const fields = getFields(fieldState$);
  return winResult instanceof WinResult || fields.every(fieldValue => typeof fieldValue === 'boolean');
}

/**
 * Check if field already selected
 * 
 * @param {Array<{ [index: number]: boolean | undefined }>} fieldState$ 
 * @param {number} fieldNum
 * @return {boolean}
 */
export function fieldSelected(fieldState$, fieldNum) {
  return typeof getFields(fieldState$)[fieldNum] === 'boolean';
}

/**
 * get empty cells
 * @param {Array<{ [index: number]: boolean | undefined }>} fieldState$ 
 * @return {Array<number>}
 */
function getEmptyIndexes(fieldState$) {
  const emptyIndexes = [];

  getFields(fieldState$).forEach((field, index) => {
    if (typeof field === 'undefined') {
      emptyIndexes.push(index);
    }
  });

  return emptyIndexes;
}


/**
 * get attack position indexes base on redux store winPositions
 * @param {Array<{ [index: number]: boolean | undefined }>} fieldState$ 
 * indicates type of weapon selected by user
 * @param {boolean} computerType 
 * @return {Array<{ indexOfWinPosition: number, computerPossibleCellsToSelect: Array<number> }>}
 */
function getPositionsToAttack(fieldState$, computerType) {
  const attackPositions = [];

  for (let index = 0; index < fieldState$.length; index++) {
    const winPositionsObj = fieldState$[index];

    let computerPossibleCellsToSelect = [], computerHitsCount = 0, userHitsCount = 0;
    for (const posIndex in winPositionsObj) {
      if (winPositionsObj.hasOwnProperty(posIndex)) {
        if (typeof winPositionsObj[posIndex] === 'undefined') {
          computerPossibleCellsToSelect.push(posIndex);
        } else {
          winPositionsObj[posIndex] === computerType ? computerHitsCount++ : userHitsCount++;
        }
      }
    }
    if (computerHitsCount === 1 && userHitsCount === 0) {
      attackPositions.push({ indexOfWinPosition: index, computerPossibleCellsToSelect: [...computerPossibleCellsToSelect] });
    }
  }

  return attackPositions;

}

/**
 * get critical position indexes base on redux store winPositions
 * @param {Array<{ [index: number]: boolean | undefined }>} fieldState$ 
 * indicates type of weapon selected by user
 * @param {boolean} weaponType 
 * @return {Array<number>}
 */
function getCriticalPositionIndexes(fieldState$, weaponType) {
  const criticalPositions = [];
  for (let index = 0; index < fieldState$.length; index++) {
    const winPositionsObj = fieldState$[index];

    let hitsCount = 0;
    for (const posIndex in winPositionsObj) {
      if (winPositionsObj.hasOwnProperty(posIndex) && typeof winPositionsObj[posIndex] !== 'undefined') {
        winPositionsObj[posIndex] === weaponType ? hitsCount++ : hitsCount--;
      }
    }
    if (hitsCount === 2) {
      criticalPositions.push(index);
    }
  }
  return criticalPositions;
}

function getRandomValue(num) {
  return Math.floor((Math.random() * num));
}