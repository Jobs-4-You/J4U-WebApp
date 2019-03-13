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
        <Typography variant="subtitle1" color="inherit" grow={1} paragraph={true}>
          Veuillez vous connecter ou créer un compte.
        </Typography>
        <Typography paragraph={true}>
          (Placeholder for Homepage copy)
        </Typography>
        <img src="https://applicationspub.unil.ch/interpub/noauth/php/Ec/css/images/logo_unil_hi.png" />
        &nbsp;&nbsp;&nbsp;
        <img src="https://www.unige.ch/communication/files/1614/8890/7268/logo.jpg" />
      </div>        
    </Container>
  )
}

export default AnonLanding;