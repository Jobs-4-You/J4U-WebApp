import React from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";
import AppContainer from "js/containers/appContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';
import Loading from "js/components/Divers/Loading";

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 20px;
`;

const LinkEnquete = {textDecoration:'none',color:'#2196f3'}

function AuthLanding({ appContainer }) {
  return (
    <Subscribe to={[AppContainer, ErrorContainer]}>
      {(appContainer, errorContainer) => {
        const toVerify = (
          <div>
            <br />
            <Divider />
            <br />
            <Typography variant="subtitle1" paragraph={true}>
              Liste de choses à faire
            </Typography>
            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBoxOutlineBlank fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} /> Veuillez vérifier la boîte mail que vous avez indiquée et cliquez sur le lien de confirmation.
              <Button
              onClick={() => appContainer.sendVerification(errorContainer.displayError)}
              color="primary"
              size="small"
              variant="outlined"
              style={{marginLeft:'0.5rem'}}
            >
            Renvoyer
            </Button>
            </Typography>
            <br />
            <Divider />
            <br />
          </div>
        );
        const toComp = (
          <div>
            <br />
            <Divider />
            <br />
            <Typography variant="subtitle1" paragraph={true}>
              Liste de choses à faire
            </Typography>
            <Typography variant="subtitle1" color="inherit" grow={1}>
            <CheckBoxOutlineBlank fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} />  Veuillez remplir le questionnaire initial, qui prend généralement entre 45 minutes et une heure :
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{marginLeft:'0.5rem'}}>
                <a href={`https://fpse.qualtrics.com/jfe/form/SV_6tmPFThjXFpKg17?id=${appContainer.state.surveyId}`} style={LinkEnquete}>
                  Enquête
                </a>
              </Button>
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBoxOutlineBlank fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} />
              Une fois l'enquête complétée, cliquez sur le bouton suivant pour importer vos résultats personnels dans l'outil J4U :
              <Button
              onClick={() => appContainer.link(errorContainer.displayError)}
              color="primary"
              size="small"
              variant="outlined"
              style={{marginLeft:'0.5rem'}}
            >
              IMPORTATION DE MES DONNEES
            </Button>
            <Loading loading={appContainer.state.loading} />
            </Typography>
            <br />
            <br />
            <Divider />
            <br />
          </div>
        );
        const allRight = (
          <div>
             <Typography variant="subtitle1" paragraph={true}>
              Liste de choses à faire
            </Typography>
            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBox fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} /> Bienvenue, vous avez déjà rempli le questionnaire initial et votre compte a été vérifié. Vous pouvez accéder à vos recommandations professionnelles.
            </Typography>
            <Divider />
          </div>
        );

        const blockedText = (
          <div>
            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBox fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} /> Bienvenue. Votre compte est prêt pour la session initiale.
            </Typography>
          </div>
        );

        let text;
        if (appContainer.state.blocked && appContainer.state.verified) {
          text = blockedText;
        } else if (appContainer.state.verified && appContainer.state.formDone) {
          text = allRight;
        } else if (!appContainer.state.verified) {
          text = toVerify;
        } else {
          text = toComp;
        }

        return <Container>{text}</Container>;
      }}
    </Subscribe>
  );
}

export default AuthLanding;
