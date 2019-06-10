import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading(props) {
  const WrapLoading = {
    padding: '1rem',
    display: props.loading ? 'block' : 'none',
    textAlign: "center"
  };
    
  return (
      <span style={WrapLoading}><CircularProgress/></span>
  );
}

export default Loading;