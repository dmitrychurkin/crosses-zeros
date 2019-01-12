import React from 'react';
import GamingFrame from '../containers/GamingFrame';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Grid from '@material-ui/core/Grid';
// import logo from './logo.svg';
import './App.css';

const styles = {
  fullHeight: {
    minHeight: '100%',
    backgroundColor: 'rgb(250, 235, 215)'
  },
  center: {
    textAlign: 'center',
    minHeight: '600px',
    padding: '10px'
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
        <Grid container className={classes.center} item xs={5}>
          <GamingFrame url={url} />
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(App);