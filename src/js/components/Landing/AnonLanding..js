import React from 'react';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 40px 20px;
  text-align: center;
`;

function AnonLanding() {
  let message;
  return (
    <Container>
      <div>
        <Typography variant="subtitle1" color="inherit" grow={1}>
          You need to sign in or create an account.
        </Typography>
      </div>        
    </Container>
  )
}

export default AnonLanding;