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

function InvalidBrowser() {
  return (
    <Container>
      <div>
        <Typography>
          Vous êtes bien sur la page officielle du projet « Job For You » (J4U)
          mené par les Universités de Lausanne et de Genève.
        </Typography>
        <br />
        <Typography>
          Malheureusement, le site J4U n’est pas compatible avec ce navigateur
          web. Nous vous recommandons d’installer Google Chrome afin de pouvoir
          participer au projet.
        </Typography>
        <br />
        <Typography>
          Voici les liens de téléchargement à partir de sites sécurisés :
          <br />
          Pour un ordinateur PC:
          <a href="https://www.google.com/chrome/"> Google Chrome</a>
          <br />
          Pour un ordinateur Apple:
          <a href="https://www.google.com/chrome/"> Google Chrome</a>
        </Typography>
        <br />
        <Typography>
          En cas de difficulté, n’hésitez pas à nous joindre à l’adresse
          suivante : <a href="mailto:j4u@unil.ch ">j4u@unil.ch</a>
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

export default InvalidBrowser;
