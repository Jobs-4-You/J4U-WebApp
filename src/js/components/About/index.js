import React from 'react';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 40px 20px;
  text-align: left;
`;  

function About() {
    return  <Container>
                <Typography paragraph={true}>
                    Bienvenue sur notre page web. Les universités de Lausanne et de Genève mènent actuellement une étude sur l'amélioration de la recherche d'emploi, financée par le Fonds national suisse de la recherche scientifique. Dans le cadre de cette étude, j4U est un outil conçu et construit pour accélérer la sortie des demandeurs d'emploi de leur épisode de chômage. J4U vise à élargir le champ de recherche d’emploi des demandeurs d’emploi tout en se basant sur leurs compétences: ce que leurs compétences leur permettent vraiment à faire (et pas juste ce qu’ils ontdéjà fait!) .
                </Typography>
            </Container>
}  

export default About;