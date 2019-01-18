import React from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
import GamingFrame from '../containers/GamingFrame';
import './App.css';

const MIN_HEIGHT = `${600}px`;

const styles = {
  fullHeight: {
    minHeight: '100%',
    minWidth: '533px',
    backgroundColor: 'rgb(250, 235, 215)'
  },
  center: {
    textAlign: 'center',
    minHeight: MIN_HEIGHT,
    padding: '10px',
    minWidth: '533px'
  }
};

const customTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
  },
  typography: { useNextVariants: true }
});


const App = props => {

  const { classes, match: { params: { url } } } = props;

  return (
    <MuiThemeProvider theme={customTheme}>
      <Grid className={classes.fullHeight} justify="center" container>
        <Grid container style={{ minHeight: !url ? MIN_HEIGHT : 'unset' }} className={classes.center} item justify="center" xs={5}>
          <GamingFrame url={url} />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};



export default withStyles(styles)(App);