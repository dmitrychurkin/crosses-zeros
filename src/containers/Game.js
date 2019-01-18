import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GamingPane from '../components/GamingPane';
import { calculateWinPosition, getFields, checkEndOfGame, selectCell, fieldSelected } from '../helpers';
import { blockUser, unBlockUser, commitSelection, resetGame as resetGameActionCreator, hideResetBtn, showResetBtn as showResetBtnActionCreator, commitCounts } from '../actions';


const mapStateToProps = (state, { crossZeroApp: { winPositions } }) => {
  const winResult = calculateWinPosition(winPositions);
  
  return {
    winResult,
    fields: getFields(winPositions),
    fieldSelected
  };
};

const mapDispatchToProps = (dispatch, { crossZeroApp: { winPositions, userType, userBlocked } }) => {

  if (checkEndOfGame(winPositions)) {
    setTimeout(() => {
      dispatch((dispatch, getState) => {
        const { crossZeroApp: { winPositions } } = getState();
        if (checkEndOfGame(winPositions)) {
          dispatch(showResetBtnActionCreator());
        }
      });
    }, 3000);
  }

  // async computerShot action helper
  const computerShot = async (dispatch, getState) => {

    const { crossZeroApp: { winPositions } } = getState();

    dispatch(blockUser());

    if (checkEndOfGame(winPositions)) {
      dispatch(unBlockUser());
      return;
    }

    await new Promise(res => setTimeout(res, 2000));
    await dispatch((dispatch, getState) => {
      const { crossZeroApp: { winPositions, userType, computerType } } = getState();
      const fieldNumber = selectCell(winPositions, userType);
      dispatch(commitSelection(fieldNumber, computerType));
      return new Promise(res => setTimeout(res, 2000));
    })

    dispatch(unBlockUser());
    
  };

  // sync userShot action helper
  const userShot = fieldNumber => {
 
    if (userBlocked || fieldSelected(winPositions, fieldNumber) || checkEndOfGame(winPositions)) {
      return;
    }

    dispatch(commitSelection(fieldNumber, userType));
    dispatch(computerShot);
  };

  // async resetGame action helper
  const resetGame = (dispatch, getState) => {
    const { crossZeroApp: { computerType } } = getState();
    dispatch(resetGameActionCreator());
    dispatch(hideResetBtn());
    if (computerType) {
      return dispatch(computerShot);
    }
    return Promise.resolve();
  };

  return { 
    computerShot: () => dispatch(computerShot), 
    userShot, 
    resetGame: () => dispatch(resetGame),
    commitCounts: counts => dispatch(commitCounts(counts))
  }

};

const ConnectedGamePane = connect(
  mapStateToProps,
  mapDispatchToProps
)(GamingPane);

export default withRouter(ConnectedGamePane);