import React from "react";
import { Typography } from "@material-ui/core";
import styled from 'styled-components';
import SignatureLalive from 'img/signature-lalive.png'
import SignatureKliegel from 'img/signature-kliegel.png'
import SignaturePellizzari from 'img/signature-pellizzari.png'
import SignatureCherubini from 'img/signature-cherubini.png'


function Attestation({ appContainer, jobContent, recomContainer}) {
    const CertificatePreview = styled.div`
        display: ${recomContainer.state.certificatePreview ? "block" : "none"} 
    `;
    return (
    <CertificatePreview>

        <Typography variant="h3" align="center">
            <strong>Attestation</strong>
        </Typography>
        <Typography paragraph={true}>
            {appContainer.state.civilite}. {appContainer.state.firstName} {appContainer.state.lastName},
            né{appContainer.state.civilite == "M" ? "" : "e"} {new Date(appContainer.state.birthDate).toLocaleDateString("fr-CH")}, 
            participe à une étude scientifique mené par les Universités de Genève et Lausanne et vise à améliorer l’adéquation entre les compétences des chercheurs d’emploi celles exigés pour les postes vacantes.        
        </Typography>
        <Typography paragraph={true}>
            Dans le cadre de cette étude, les compétences de {appContainer.state.civilite}. {appContainer.state.lastName} ont été mesurés à travers d'une méthodologie scientifiquement validée. Ensuite son profil de compétences a été comparé avec les compétences demandées par toutes les presque mille professions présentes dans le marché du travail suisse. Un nouvel algorithme a ensuite découvert les professions dont le profil de compétences est le plus proche de celui de {appContainer.state.civilite}. {appContainer.state.lastName}. Votre poste de {jobContent.jobDescriptions[0].title} se trouve parmi les postes les mieux adaptés au profil de {appContainer.state.civilite}. {appContainer.state.lastName}.
        </Typography>
        <Typography paragraph={true}>
            Cette procédure est nouvelle en Suisse et elle est scientifiquement fondée dans des recherches sur la recherche d’emploi. 
        </Typography>
        <Typography paragraph={true}>
            Lausanne, {new Date().toLocaleDateString("fr-CH")}
            <br />
            J4U@unil.ch
        </Typography>
        
    </CertificatePreview>
    );
}

export default Attestation;