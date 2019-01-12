import React, { Component } from 'react';
import { connect } from 'react-redux';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import ClearIcon from '@material-ui/icons/Clear';
import { 
  withStyles, 
  Fab, 
  Card, 
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography} from '@material-ui/core';
import WrappedLink from '../components/WrappedLink';
import backGroundImg from '../mainImg.png';
import { selectType } from '../actions';

const styles = theme => {

  return {
    header: {
      marginBottom: 0,
      paddingBottom: 0
    },
    fullWidth: {
      width: '100%',
      ...theme.mixins.gutters(),
      paddingBottom: theme.spacing.unit * 2
    },
    media: {
      height: '60%',
      backgroundSize: 'contain'
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-around'
    }
  };
};

class GamingFrame extends Component {

  render() {

    const { classes, url, dispatch } = this.props;
    const RouterLink = WrappedLink({ navigateTo: '/loading' });
    const selectWeapon = weapon => () => dispatch(selectType(weapon));

    switch(url) {
      case 'loading': {
      //TODO: work in progress
        return <div>Loading...</div>;
      }
      default: 
      // home page
        return (
          <Card className={classes.fullWidth}>
            <CardHeader
              className={classes.header}
              titleTypographyProps={{
                style: {
                  fontFamily: `'Coiny', cursive`,
                  animation: 'wow 3s linear infinite alternate',
                  fontSize: '2rem'
                }
              }}
              component="h1"
              title="Crosses & Zeroes"
            />
            <CardMedia
              className={classes.media}
              image={backGroundImg}
              title="Crosses & Zeroes"
            />
            <CardContent>
              <Typography variant="h4" component="h2">
                Select your Weapon!
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Fab onClick={selectWeapon(false)} component={RouterLink} color="primary" aria-label="Zero">
                <PanoramaFishEyeIcon />
              </Fab>
              <Fab onClick={selectWeapon(true)} component={RouterLink} color="secondary" aria-label="Cross">
                <ClearIcon />
              </Fab>
            </CardActions>
          </Card>
        );
    }
  }

}

const WrappedMatUIGamingFrame = withStyles(styles)(GamingFrame);
export default connect()(WrappedMatUIGamingFrame);

