import React from 'react';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Link } from "js/components/Divers/Link";
import Warning from '@material-ui/icons/Warning';

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 40px 20px;
  text-align: left;
`;

const Center = styled("p")`
  text-align: center;
`;
const aboutLink = {
  color: "black"
}

function AnonLanding() {
  let message;
  return (
    <Container>
      <div>
        <Typography variant="subtitle1" color="inherit" grow={1} paragraph={true}>
            <Warning style={{verticalAlign: "middle"}} /> Veuillez vous connecter ou créer un compte.
        </Typography>
        <Typography paragraph={true}>
          Bienvenue sur notre page web !
        </Typography>
        <Typography paragraph={true}>
          Les universités de Lausanne et de Genève mènent actuellement une étude sur l'amélioration de la recherche d'emploi, financée par le Fonds National Suisse de la recherche scientifique.
        </Typography>
        <Typography paragraph={true}>
          Dans le cadre de cette étude, des scientifiques ont développé un outil de recherche d’emploi personnalisé « Job For You » (J4U). Cet outil novateur vise à élargir le champ de votre recherche d’emploi en cohérence avec <strong><i>vos compétences</i></strong> : qu’est-ce que <strong><i>vos compétences</i></strong> vous permet réellement de faire ?
        </Typography>
        <Typography paragraph={false}>
          Veuillez cliquer <Link to="/about" style={aboutLink}>ici</Link> pour en savoir plus sur nous.
        </Typography>
        <Center>
          <img src="https://applicationspub.unil.ch/interpub/noauth/php/Ec/css/images/logo_unil_hi.png" />
          &nbsp;&nbsp;&nbsp;
          <img src="https://www.unige.ch/communication/files/1614/8890/7268/logo.jpg" />
        </Center>
      </div>
    </Container>
  )
}

export default AnonLanding;