import React from 'react';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from '@material-ui/core/Button';

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 40px 20px;
  text-align: left;
`;  

function About() {
    return  <Container>
                <Typography paragraph={true}>
                  Les universités de Lausanne et de Genève mènent actuellement une étude sur l'amélioration de la recherche d'emploi. 
                </Typography>
                <Typography paragraph={true}>
                  Dans le cadre de cette étude, des scientifiques ont développé un outil de recherche d’emploi innovant qui est mis à disposition des participants à l'étude. L'objectif de cet outil est d'aider les participants à retrouver un emploi rapidement ou à un retrouver un emploi qui correspondrait mieux à leurs compétences.
                </Typography>
                
                <Typography paragraph={true}>
                  <Button href="#/" color="primary" variant="contained">
                    Page d'accueil
                  </Button>
                </Typography>

            </Container>
}  

export default About;