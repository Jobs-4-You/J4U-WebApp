import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

function LoadingSeco(recomContainer) {

  const WrapLoading = styled.span`
    paddingLeft: '3rem'
  `;
    
  if (recomContainer.recomContainer.state.loadingSeco) {
    return (
        <WrapLoading><CircularProgress/></WrapLoading>
    );
  } else {
      return null;
  }
}


export default LoadingSeco;