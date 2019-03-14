import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingSeco(recomContainer) {
    
  if (recomContainer.recomContainer.state.loadingSeco) {
    return (
        <div><CircularProgress/></div>
    );
  } else {
      return null;
  }
}


export default LoadingSeco;