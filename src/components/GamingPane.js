import React, { Component } from 'react';
import { Grid, Paper, Fab, withStyles, Fade, Typography } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Cross from './Cross';
import Zero from './Zero';
import WinLine from './WinLine';

const CELL_DIMENSIONS = 150;
const GUTTERS = 3;
const PALITRA = 'solid grey';
const sizer = () => (CELL_DIMENSIONS * 3) + (GUTTERS * 6);

const styles = theme => {

  return {
    margin: {
      margin: theme.spacing.unit,
      marginTop: '30px'
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    mainLayout: { 
      display: 'flex', 
      flexFlow: 'row wrap', 
      width: `${sizer()}px`,
      height: `${sizer()}px`,
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      border: `${GUTTERS}px ${PALITRA}`,
      position: 'relative'
    },
    cellLayout: {
      width: `${CELL_DIMENSIONS}px`, 
      height: `${CELL_DIMENSIONS}px`
    },
    innerGrid: {
      width: '100%', 
      height: '100%'
    },
    countTitle: {
      fontFamily: `'Coiny', cursive`,
      color: '#03A9F4'
    }
  };
};

class GamingPane extends Component {


  componentDidMount() {
    
    const { crossZeroApp: { computerType, userType }, computerShot, history } = this.props;
    if (typeof userType === 'undefined' || typeof computerType === 'undefined') {
      history.replace('/');
      return;
    }
    if (computerType) {
      computerShot();
    }
  }

  render() {

    const { classes, winResult, fields, userShot, resetGame, commitCounts, fieldSelected, crossZeroApp: { showResetBtn, winPositions, counts } } = this.props;
    
    return (
      <Grid container justify='center' alignItems='center'>
        <Grid item>
          <Typography className={classes.countTitle} variant="h4" component="h2">
            Текущий счёт:
          </Typography>
          <Grid style={{ paddingBottom: '10px' }} container justify='center' alignItems='center'>
            <Typography style={{ color: 'red' }} variant="h1" component="h2">{ counts.cross }</Typography><Typography variant="h1" component="h2">:</Typography><Typography style={{ color: 'blue' }} variant="h1" component="h2">{ counts.zero }</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Paper className={classes.mainLayout}>
            { winResult ? <WinLine commitCounts={commitCounts} winResult={winResult} counts={counts}/> : null }
            {
              fields.map((value, index) => (
                <div className={classes.cellLayout} style={{ border: `${ GUTTERS}px ${PALITRA}` }} key={index}>
                  <Grid 
                    container 
                    justify="center" 
                    alignItems="center"
                    onClick={() => userShot(index)} 
                    className={classes.innerGrid}
                    style={{ cursor: fieldSelected(winPositions, index) ? 'not-allowed' : 'pointer' }}>
                    {
                      typeof value === 'undefined' ? null : (value ? <Cross /> : <Zero />) 
                    }
                  </Grid>
                </div>
                )
              )
            }
          </Paper>
        </Grid>
        {
          showResetBtn ? 
            <Grid item>
              <Fade in={showResetBtn}>
                <Fab onClick={resetGame} variant="extended" color="primary" aria-label="Add" className={classes.margin}>
                  <AutorenewIcon className={classes.extendedIcon} />
                  начать заново
                </Fab>
              </Fade>
            </Grid>
            : null
        }
      </Grid>
    ); 
  }
}


export default withStyles(styles)(GamingPane);