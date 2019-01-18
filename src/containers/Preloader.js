import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { CircularProgress, Grid } from '@material-ui/core';

class Preloader extends Component {

  static defaultProps = {
    timeout: 2500
  };

  _proceedToGame() {
    const { history, timeout } = this.props;

    setTimeout(() => {
      history.replace('/game', null);
    }, timeout);
  }

  componentDidMount() {
    this._proceedToGame();
  }

  render() {
    return (
      <Grid 
        container 
        justify="center"
        alignItems="center"
      >
        <CircularProgress size={100} color="secondary" />
      </Grid>
    );
  }

}

Preloader.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  timeout: PropTypes.number
};

export default withRouter(Preloader);