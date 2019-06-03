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
                  Par la présente, nous vous proposons de participer à une étude qui vise à élaborer des outils pour vous soutenir dans votre recherche d’emploi. Ces outils mis à disposition ont trois objectifs. Ils visent à améliorer (i) l’information sur vos compétences, (ii) votre stratégie de recherche d’emploi, (iii) vos capacités cognitives, telles que votre capacité de raisonnement, votre mémoire, etc. Les outils sont attribués de façon aléatoire aux participants.
                </Typography>
                <Typography paragraph={true}>
                  <i>L’étude a reçu l’accord du Service de l’emploi du canton de Neuchâtel, et va être conduite dans le respect de la réglementation en vigueur.</i>
                </Typography>
                <Typography paragraph={true}>
                  <strong>Glossaire de quelques termes utilisés dans ce document d’information</strong>
                </Typography>
                <Typography paragraph={true}>
                  <strong>Cognition</strong> : ensemble des processus mentaux qui désignent le traitement de l’information tels que le raisonnement, la mémoire, la prise de décision et les fonctions exécutives.
                </Typography>
                <Typography paragraph={true}>
                  <strong>Aléatoire</strong> : au hasard, c’est-à-dire par tirage au sort.
                </Typography>
            </Container>
}  

export default About;