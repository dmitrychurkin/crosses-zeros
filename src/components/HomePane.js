import React from 'react';
import PropTypes from 'prop-types';
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
  Typography
} from '@material-ui/core';
import WrappedLink from './WrappedLink';
import backGroundImg from '../mainImg.png';


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

const RouterLink = WrappedLink({ navigateTo: '/loading' });

const HomePane = ({ classes, onSelectWeapon }) => {
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
          Выбери своё оружие!
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Fab onClick={() => onSelectWeapon(false)} component={RouterLink} color="primary" aria-label="Zero">
          <PanoramaFishEyeIcon />
        </Fab>
        <Fab onClick={() => onSelectWeapon(true)} component={RouterLink} color="secondary" aria-label="Cross">
          <ClearIcon />
        </Fab>
      </CardActions>
    </Card>
  );
};

HomePane.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelectWeapon: PropTypes.func.isRequired
};

export default withStyles(styles)(HomePane);