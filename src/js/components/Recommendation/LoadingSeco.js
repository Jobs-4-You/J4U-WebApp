import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingSeco(recomContainer) {

  const WrapLoading = {
    paddingLeft: '1rem',
    visibility: recomContainer.recomContainer.state.loadingSeco ? 'visible' : 'hidden'
  };
    
  //if (recomContainer.recomContainer.state.loadingSeco) {
    return (
        <span style={WrapLoading}><CircularProgress/></span>
    );
  //} else {
  //    return null;
  //}
}


export default LoadingSeco;