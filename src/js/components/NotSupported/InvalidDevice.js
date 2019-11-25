import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import LogoUnil from "img/logo-unil.png";
import LogoUnige from "img/logo-unige.png";

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 40px 20px;
  text-align: left;
`;

const Center = styled("p")`
  text-align: center;
`;

function InvalidDevice() {
  return (
    <Container>
      <div>
        <Typography>
          Vous êtes bien sur la page officielle du projet « Job For You » (J4U)
          mené par les Universités de Lausanne et de Genève.
        </Typography>
        <br />
        <Typography>
          Malheureusement, le site J4U n’est pas compatible avec les appareils
          moblies.
        </Typography>
        <br />
        <Typography>
          Veuillez utiliser un ordinateur portable ou fixe pour afin de
          consulter le site dans les meilleures conditions.
        </Typography>
        <br />
        <Typography>L’équipe J4U vous remercie.</Typography>
        <Center>
          <img src={LogoUnil} />
          &nbsp;&nbsp;&nbsp;
          <img src={LogoUnige} />
        </Center>
      </div>
    </Container>
  );
}

export default InvalidDevice;
