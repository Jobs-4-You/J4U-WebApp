import React from 'react';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Link } from "js/components/Divers/Link";
import Warning from '@material-ui/icons/Warning';
import LogoUnil from 'img/logo-unil.png'
import LogoUnige from 'img/logo-unige.png'

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
          Les universités de Lausanne et de Genève mènent actuellement une étude sur l'amélioration de la recherche d'emploi.
        </Typography>
        <Typography paragraph={true}>
          Dans le cadre de cette étude, des scientifiques ont développé un outil de recherche d’emploi innovant qui est mis à disposition des participants à l'étude. L'objectif de cet outil est d'aider les participants à retrouver un emploi rapidement ou à un retrouver un emploi qui correspondrait mieux à leurs compétences
        </Typography>
        <Typography paragraph={false}>
          Veuillez cliquer <Link to="/about" style={aboutLink}>ici</Link> pour en savoir plus sur nous.
        </Typography>
        <Center>
          <img src={LogoUnil}/>
          &nbsp;&nbsp;&nbsp;
          <img src={LogoUnige}/>
        </Center>
      </div>
    </Container>
  )
}

export default AnonLanding;