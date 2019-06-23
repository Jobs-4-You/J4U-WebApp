import React from "react";
import { Button, Typography } from "@material-ui/core";
import styled from 'styled-components';
import Loading from "js/components/Divers/Loading";
import SignatureLalive from 'img/signature-lalive.png'
import SignatureKliegel from 'img/signature-kliegel.png'
import SignaturePellizzari from 'img/signature-pellizzari.png'
import SignatureCherubini from 'img/signature-cherubini.png'
import LogoUnil from 'img/logo-unil.png'
import LogoUnige from 'img/logo-unige.png'
import { renderToStaticMarkup } from "react-dom/server";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


function Attestation({ appContainer, jobContent, recomContainer}) {
    const CertificatePreview = styled.div`
        display: ${recomContainer.state.certificatePreview ? "table" : "none"} ;
        backgroundColor: #f5f5f5;
        width: 210mm;
        min-height: 297mm;
        overflow-y: visible;
        margin: 0 auto;
    `;
    const Signature = styled.span`
        padding-top: 2rem;
        text-align: center;
        width: 25%;
        height: 4rem;
        float: left;
        font-family: Arial, Helvetica, sans-serif;
    `;

    const SignatureImg = styled.img`
        margin-top: 1rem;
    `;
    
    const Logos = styled.div`
        text-align: center;
        padding-bottom: 3rem;
    `;
    
    const LogoImg = styled.img`
        margin: 0 1rem;
    `;
    
    const InnerContainer = styled.div`
        width: 90%;
        margin 0 auto;
    `;


    return (
    <>
        
        <Typography align="center" gutterBottom={true}>
            
            <Button
                color="secondary"
                size="medium"
                variant="contained"
                disabled={
                    appContainer.state.loading
                }
                onClick={() => {
                    appContainer.setState({loading:true});
                    const input = document.getElementById('CertificatePreview');
                    html2canvas(input).then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        const pdf = new jsPDF();
                        pdf.addImage(imgData, 'JPEG', 0, 0);
                        pdf.save("Attestation", appContainer.setState({loading:false}));
                    });
                    recomContainer.handleJobApplication({
                        TYPE: "CERTIFICATE_DOWNLOAD",
                        JOBID: selectedJob.jobAdvertisement.id,
                        OCCUPATIONS: jobContent.occupations
                    });
                }}
                >
                Télécharger Attestation
            </Button>
            <Loading loading={appContainer.state.loading} />
        </Typography>

        <CertificatePreview id="CertificatePreview">
            <InnerContainer>
            <Logos>
                <LogoImg src={LogoUnil} />
                <LogoImg src={LogoUnige} />
            </Logos>
            <Typography variant="h3" align="center" gutterBottom={true}>
                Attestation
            </Typography>
            <Typography paragraph={true}>
                {appContainer.state.civilite} {appContainer.state.firstName} {appContainer.state.lastName.toUpperCase()},
                né{appContainer.state.civilite == "M" ? "" : "e"} {new Date(appContainer.state.birthDate).toLocaleDateString("fr-CH")}, 
                est candidate au poste intitulé « {jobContent.jobDescriptions[0].title} ». 
                Votre offre d’emploi pour ce poste a été sélectionnée par un nouvel algorithme, comme étant en adéquation avec les compétences de {appContainer.state.civilite} {appContainer.state.firstName} {appContainer.state.lastName.toUpperCase()}.
            </Typography>
            <Typography paragraph={true}>
                Dans le cadre d’une étude menée par les Universités de Genève et de Lausanne intitulée « Job For You » (J4U), nous avons mesuré le profil de compétences de {appContainer.state.civilite} {appContainer.state.lastName}.
                Ce profil a été comparé avec les compétences requises par plus de mille professions en Suisse.
                Votre poste « {jobContent.jobDescriptions[0].title} » a été sélectionné comme étant l’un des mieux adaptés au profil de {appContainer.state.civilite} {appContainer.state.lastName.toUpperCase()}.
            </Typography>
            <Typography paragraph={true}>
            Cette procédure est nouvelle en Suisse et est scientifiquement fondée, elle se base sur les compétences des candidats et non plus exclusivement sur leur passé professionnel. Les postulations menées suite aux recommandations de l’algorithme sont sérieuses.
                                Les Universités de Genève et de Lausanne vous encouragent donc à considérer la candidature de {appContainer.state.civilite} {appContainer.state.lastName.toUpperCase()}.
            </Typography>
            <Typography paragraph={true}>
                <br />
                Lausanne, {new Date().toLocaleDateString("fr-CH")}
            </Typography>
            <Typography paragraph={true}>
                <br />
                L’équipe « Job For You » (J4U)
                <br />
                J4U@unil.ch
            </Typography>
            <Signature>
                Pr. Mauro Cherubini
                <br />
                <SignatureImg src={SignatureCherubini} />
            </Signature>
            <Signature>
                Pr. Matthias Kliegel
                <br />
                <SignatureImg src={SignatureKliegel} />
            </Signature>
            <Signature>
                Pr. Rafael Lalive
                <br />
                <SignatureImg src={SignatureLalive} />
            </Signature>
            <Signature>
                Pr. Michele Pellizzari
                <br />
                <SignatureImg src={SignaturePellizzari} />
            </Signature>
            </InnerContainer>
        </CertificatePreview>

        
    </>
    );
}

export default Attestation;