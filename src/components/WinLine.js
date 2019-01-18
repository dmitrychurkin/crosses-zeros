import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WinResult } from '../helpers';

const ANIMATION = { animation: '2s ease-out 2s forwards draw' };

class WinLine extends Component {
  
  componentDidMount() {
    const { crosses } = this.props.winResult;
    if (typeof crosses === 'boolean') {
      const { counts: { cross, zero }, commitCounts } = this.props;
      const updatedCount = crosses ? { cross: cross + 1 } : { zero: zero + 1 };
      commitCounts(updatedCount);
    }
  }

  render() {
    const { index } = this.props.winResult;
    return (
      typeof index === 'number' ? 
        <svg className="line" style={{ position: 'absolute' }} xmlns="http://www.w3.org/2000/svg">
          {
            index === 1 ? <path style={ANIMATION} d="M20 450 450 20" />
            : index === 2 ? <path style={ANIMATION} d="M20 20 450 450" />
            : index === 3 ? <path style={ANIMATION} d="M20 80 450 80" />
            : index === 4 ? <path style={ANIMATION} d="M20 235 450 235" />
            : index === 5 ? <path style={ANIMATION} d="M20 390 450 390" />
            : index === 6 ? <path style={ANIMATION} d="M80 20 80 450" />
            : index === 7 ? <path style={ANIMATION} d="M235 20 235 450" />
            : <path style={ANIMATION} d="M390 20 390 450" />
          }
        </svg>
        : null
    ); 
  }
}

WinLine.propTypes = {
  winResult: PropTypes.instanceOf(WinResult),
  commitCounts: PropTypes.func.isRequired,
  counts: PropTypes.shape({
    cross: PropTypes.number.isRequired,
    zero: PropTypes.number.isRequired
  }).isRequired
};

export default WinLine;
