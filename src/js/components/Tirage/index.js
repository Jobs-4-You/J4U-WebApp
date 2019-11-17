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

function Legal() {
    return <Container>
                <Typography paragraph={true}>
                    <strong>Informations générales sur le projet et les données</strong>
                    <br />
                    Cette étude propose d’explorer plusieurs outils pour la recherche d’emploi.
                </Typography>
                <Typography paragraph={true}>
                    L’étude récoltera des données sur vos recherches d’emploi qui seront complémentées par des données administratives déjà disponibles (par ex. PLASTA, AVS). Les données seront utilisées conformément à la réglementation en vigueur en matière de protection de la vie privée et tout résultat sera publié sous forme de statistiques globales ne permettant pas d'identification personnelle.
                </Typography>
                <Typography paragraph={true}>
                    Nous effectuons cette étude dans le respect des prescriptions de la législation suisse. Nous suivons en outre l’ensemble des directives reconnues au niveau international. La commission cantonale d’éthique compétente a contrôlé et autorisé l’étude.
                </Typography>
                <Typography paragraph={true}>
                    <strong>
                    Déroulement pour les participants
                    </strong>
                    <br />
                    Les participants assistent à une séance de démarrage à Neuchâtel littoral ou à la Chaux-de-fonds. Par ailleurs, ils recevront des emails et seront suivis via l’application « J4U » (Job for you) pour une période de 6 mois ou jusqu’à la reprise d’un emploi. 
                </Typography>
                <Typography paragraph={true}>
                    <strong>
                    Conditions de participation 
                    </strong>
                    <br />
                    <ul>
                        <li>L'étude se déroulera sur 6 mois, dès votre participation à la séance de démarrage.</li>
                        <li>Vous fournissez des informations sur vos recherches d’emplois</li>
                        <li>Vous souhaitez suivre les indications qui vous sont (et seront) fournies.</li>
                    </ul>
                    Nous n’avons pas d’information sur votre état de santé. Vous participez à cette étude en toute connaissance de cause de votre état de santé.    
                </Typography>
                <Typography paragraph={true}>
                    <strong>
                    Bénéfices pour les participants
                    </strong>
                    <br />
                    Votre participation à cette étude pourra vous aider à trouver un emploi qui correspond mieux à vos compétences et à votre personnalité ou à trouver un emploi plus rapidement.
                </Typography>
                <Typography paragraph={true}>
                    <strong>
                    Droits des participants
                    </strong>
                    <br />
                    Vous prenez part à cette étude uniquement de façon volontaire. Si vous choisissez de ne pas participer ou si vous choisissez de participer et revenez sur votre décision pendant le déroulement de l’étude, vous n’aurez pas à justifier votre refus. Vous pouvez à tout moment poser toutes les questions nécessaires au sujet de l’étude. Pour ce faire, veuillez-vous adresser au contact indiqué à la fin de la présente feuille d’information.
                </Typography>
                <Typography paragraph={true}>
                    <strong>
                    Financement de l'étude
                    </strong>
                    <br />
                    Ce projet est financé par les Fonds National Suisse de la recherche Scientifique.    
                </Typography>
                <Typography paragraph={true}>
                    <strong>
                    Lien avec fiche de recherche d’emploi de l’ORP
                    </strong>
                    <br />
                    Cette étude vous proposera de postuler à des offres d’emploi pouvant être plus éloignées de celles acceptées par l’ORP comme preuve de recherche. Nous vous encourageons néanmoins à tester ces propositions puisqu’elles peuvent être mieux adaptées à vos compétences et à votre personnalité.
                </Typography>
                <Typography paragraph={true}>
                    <strong>
                    Interlocuteur(s)
                    </strong>
                    <br />
                    Vous pouvez à tout moment poser vos questions et demander des précisions complémentaires à l’adresse suivante : <a href="mailto:j4u@unil.ch">j4u@unil.ch</a>. Notre équipe se fera un plaisir de répondre.    
                </Typography>
                <Typography paragraph={true}>
                    <Button href="#/" color="primary" variant="contained">
                    Page d'accueil
                    </Button>
                </Typography>
                
            </Container>;
}

export default Legal;