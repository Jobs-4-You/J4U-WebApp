import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { formURL } from "../../data";

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 40px 20px;
  text-align: left;
`;

function Legal() {
  return (
    <Container>
      <Typography paragraph={true}>
        Vous êtes invité à participer à une étude pilote qui vise à vous aider
        dans votre recherche d’emploi. Nous vous remercions de votre
        participation. Cette étude est réalisée et financée par les universités
        de Genève et de Lausanne MENTIONNER FNS ? LIVES ?.
      </Typography>
      <Typography paragraph={true}>
        Si vous acceptez de participer, nous vous demanderons d’utiliser l’outil
        mis à votre disposition et de répondre à des questionnaires. Il y aura
        entre un et deux questionnaires envoyés chaque semaine. Chaque
        participation aux questionnaires rapporte des tickets de participation
        au tirage au sort final. Plus vous participez, plus vous collecterez des
        tickets, plus vos chances de gagner au tirage au sort seront grandes.
        Voici la répartition des points :
        <ul>
          <li>
            Inscription au projet J4U sur le site j4u.unil.ch (avant la date
            butoir indiquée dans l’email) : 10 points
          </li>
          <li>
            Participation à l’enquête sur le site j4u.unil.ch (avant la date
            butoir indiquée dans l’email) : 10 points
          </li>
          <li>
            Participation aux questionnaires reçus par email (avant la date
            butoir indiquée dans l’email) : 5 points
          </li>
          <li>
            Utilisation du site j4u.unil.ch (onglets « recommandations
            professionnelles » ou « recherche d’emploi ») : 3 points/ jours
          </li>
        </ul>
      </Typography>
      <Typography paragraph={true}>
        Chaque participant fera partie d'un tirage au sort dont le prix est de
        CHF 2000 en espèces.
      </Typography>
      <Typography paragraph={true}>
        Les gagnants de la loterie seront notifiés par email dans les quelques
        jours qui suivent la fin du projet (DATE).
      </Typography>
      <Typography paragraph={true}>
        Votre participation est complètement volontaire et vous êtes totalement
        libre d'arrêter votre participation à n'importe quel moment, sans
        préavis. En cas d’arrêt, seuls les tickets déjà récoltés compteront pour
        le tirage au sort.
      </Typography>
      <Typography paragraph={true}>
        Pour rappel, vos réponses seront collectées de façon confidentielle et
        anonymisée. Dans le cas où les résultats de l’étude seraient publiés,
        votre identité ne sera pas utilisée. La confidentialité des données est
        entièrement garantie.
      </Typography>
      <Typography paragraph={true}>
        Afin de confirmer votre participation au tirage au sort, nous vous
        demandons de compléter ce questionnaire et de nous le renvoyer à
        l’adresse indiquée au-dessus jusqu’au XXX.
      </Typography>
      <Typography paragraph={true}>
        Afin de confirmer votre participation au tirage au sort, nous vous
        demandons de <a href={formURL}>télécharger </a>et de compléter ce
        formulaire et de nous le renvoyer à l’adresse indiquée au-dessus
        jusqu’au XXX.
      </Typography>
    </Container>
  );
}

export default Legal;
