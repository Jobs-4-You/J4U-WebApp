import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingSeco(props) {
  const WrapLoading = {
    paddingLeft: '1rem',
    visibility: props.recomContainer.state.loadingSeco[props.jobIndex] ? 'visible' : 'hidden'
  };
    
  return (
      <span style={WrapLoading}><CircularProgress/></span>
  );
}

export default LoadingSeco;