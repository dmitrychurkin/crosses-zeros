import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Game from './Game';
import Preloader from './Preloader';
import HomePane from '../components/HomePane';
import { selectType } from '../actions';

const mapStateToProps = ({ crossZeroApp }) => ({ crossZeroApp });

const mapDispatchToProps = dispatch => ({
  selectWeapon: weapon => dispatch(selectType(weapon))
})

class GamingFrame extends Component {

  static defaultProps = {
    url: ''
  }

  render() {

    const { url, selectWeapon, crossZeroApp } = this.props;

    switch(url) {
      case 'game': {
      // game page
        return <Game crossZeroApp={crossZeroApp} />;
      }
      case 'loading': {
      // loading page
        return <Preloader/>;
      }
      default: 
      // home page
        return <HomePane onSelectWeapon={selectWeapon} />;
    }
  }

}

GamingFrame.propTypes = {
  url: PropTypes.string,
  selectWeapon: PropTypes.func.isRequired,
  crossZeroApp: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(GamingFrame);

