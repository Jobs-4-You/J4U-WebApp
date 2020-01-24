import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

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
        <strong>1. Objectifs de l’étude</strong>
        <br />
        Par la présente, nous vous proposons de participer à une étude qui vise
        à élaborer des outils pour vous soutenir dans votre recherche d’emploi.
        Ces outils mis à disposition ont trois objectifs. Ils visent à améliorer
        (i) l’information sur vos compétences, (ii) votre stratégie de recherche
        d’emploi, (iii) vos capacités cognitives, telles que votre capacité de
        raisonnement, votre mémoire, etc. Les outils sont attribués de façon
        aléatoire aux participants
      </Typography>
      <Typography paragraph={true}>
        L’étude a reçu l’accord du Service de l’emploi du canton de Neuchâtel,
        et va être conduite dans le respect de la réglementation en vigueur.
      </Typography>
      <Typography paragraph={true}>
        <strong>
          Glossaire de quelques termes utilisés dans ce document d’information
        </strong>
        <br />
        <strong>Cognition</strong> : ensemble des processus mentaux qui
        désignent le traitement de l’information tels que le raisonnement, la
        mémoire, la prise de décision et les fonctions exécutives. <br />
        <strong>Aléatoire</strong> : au hasard, c’est-à-dire par tirage au sort.
      </Typography>
      <Typography paragraph={true}>
        <strong>2. Informations générales sur le projet et les données</strong>
        <br />
        Cette étude propose d’explorer plusieurs outils pour la recherche
        d’emploi.
      </Typography>
      <Typography paragraph={true}>
        L’étude récoltera des données sur vos recherches d’emploi qui seront
        complémentées par des données administratives déjà disponibles (par ex.
        PLASTA, AVS). Les données seront utilisées conformément à la
        réglementation en vigueur en matière de protection de la vie privée et
        tout résultat sera publié sous forme de statistiques globales ne
        permettant pas d'identification personnelle.
      </Typography>
      <Typography paragraph={true}>
        Nous effectuons cette étude dans le respect des prescriptions de la
        législation suisse. Nous suivons en outre l’ensemble des directives
        reconnues au niveau international. La commission cantonale d’éthique
        compétente a contrôlé et autorisé l’étude.
      </Typography>
      <Typography paragraph={true}>
        <strong>3. Déroulement pour les participants</strong>
        <br />
        Les participants pourront s’inscrire en ligne et auront accès à un outil
        pour les accompagner dans leur recherche d’emploi. Par ailleurs, ils
        recevront des emails pour une période de 6 mois ou jusqu’à la reprise
        d’un emploi.
      </Typography>
      <Typography paragraph={true}>
        <strong>4. Conditions de participation</strong>
        <br />
        <ul>
          <li>
            L'étude se déroulera sur 6 mois, dès votre participation à la séance
            de démarrage.
          </li>
          <li>Vous fournissez des informations sur vos recherches d’emplois</li>
          <li>
            Vous souhaitez suivre les indications qui vous sont (et seront)
            fournies.
          </li>
          <li>
            Nous n’avons pas d’information sur votre état de santé. Vous
            participez à cette étude en toute connaissance de cause de votre
            état de santé.
          </li>
        </ul>
      </Typography>
      <Typography paragraph={true}>
        <strong>5. Bénéfices pour les participants</strong>
        <br />
        Votre participation à cette étude pourra vous aider à trouver un emploi
        qui correspond mieux à vos compétences et à votre personnalité ou à
        trouver un emploi plus rapidement.
      </Typography>
      <Typography paragraph={true}>
        <strong>6. Tirage au sort</strong>
        <br />
        Pour être éligible au tirage au sort, vous ne devez pas exercer une
        activité rémunérée à l’Université de Lausanne (contrat de travail) et ne
        pas recevoir sur l’année civile plus de CHF 2’300.- de dédommagement,
        toute expérience confondue, de la part de l’Université de Lausanne.
      </Typography>
      <Typography paragraph={true}>
        Chaque participant remplissant ce critère fera partie d'un tirage au
        sort dont le prix est de CHF 2000 en espèces.
      </Typography>
      <Typography paragraph={true}>
        Au cours de cette étude, vous serez sollicité pour utiliser l’outil mis
        à votre disposition et répondre à des questionnaires. Chaque utilisation
        de l’outil et chaque participation aux questionnaires rapportent des
        billets pour le tirage au sort final. Plus vous participerez, plus vous
        collecterez des billets, plus vos chances de gagner au tirage au sort
        seront grandes. Voici la répartition des billets :
        <ul>
          <li>
            Inscription au projet J4U sur le site j4u.unil.ch (avant la date
            butoir indiquée dans l’email) : 10 billets
          </li>
          <li>
            Participation à l’enquête sur le site j4u.unil.ch (avant la date
            butoir indiquée dans l’email) : 10 billets
          </li>
          <li>
            Participation aux questionnaires reçus par email (avant la date
            butoir indiquée dans l’email) : 5 billets
          </li>
          <li>
            Utilisation du site j4u.unil.ch (onglets « recommandations
            professionnelles » ou « recherche d’emploi ») : 3 billets/ jours
          </li>
        </ul>
      </Typography>
      <Typography paragraph={true}>
        Votre participation est complètement volontaire et vous êtes totalement
        libre d'arrêter votre participation à n'importe quel moment, sans
        préavis. En cas d’arrêt, seuls les billets déjà récoltés compteront pour
        le tirage au sort.
      </Typography>
      <Typography paragraph={true}>
        Le gagnant de la loterie sera notifié par email dans les quelques jours
        qui suivent la fin du projet.
      </Typography>

      <Typography paragraph={true}>
        <strong>7. Droits des participants</strong>
        <br />
        Vous prenez part à cette étude uniquement de façon volontaire. Si vous
        choisissez de ne pas participer ou si vous choisissez de participer et
        revenez sur votre décision pendant le déroulement de l’étude, vous
        n’aurez pas à justifier votre refus. Vous pouvez à tout moment poser
        toutes les questions nécessaires au sujet de l’étude. Pour ce faire,
        veuillez-vous adresser au contact indiqué à la fin de la présente
        feuille d’information.
      </Typography>

      <Typography paragraph={true}>
        <strong>8. Financement de l'étude</strong>
        <br />
        Ce projet est financé par les Fonds National Suisse de la recherche
        Scientifique.
      </Typography>

      <Typography paragraph={true}>
        <strong>9. Lien avec fiche de recherche d’emploi de l’ORP</strong>
        <br />
        Cette étude vous proposera de postuler à des offres d’emploi pouvant
        être plus éloignées de celles acceptées par l’ORP comme preuve de
        recherche. Nous vous encourageons néanmoins à tester ces propositions
        puisqu’elles peuvent être mieux adaptées à vos compétences et à votre
        personnalité.
      </Typography>

      <Typography paragraph={true}>
        <strong>10. Interlocuteur(s)</strong>
        <br />
        Vous pouvez à tout moment poser vos questions et demander des précisions
        complémentaires à l’adresse suivante :{" "}
        <a href="mailto:j4u@unil.ch">j4u@unil.ch</a>. Notre équipe se fera un
        plaisir de répondre.
      </Typography>
      <Typography paragraph={true}>
        <Button href="#/" color="primary" variant="contained">
          Page d'accueil
        </Button>
      </Typography>
    </Container>
  );
}

export default Legal;
