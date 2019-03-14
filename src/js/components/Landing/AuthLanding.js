import React from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";
import AppContainer from "js/containers/appContainer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 20px;
`;

const LinkEnquete = {textDecoration:'none',color:'#2196f3'}

function AuthLanding({ appContainer }) {
  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => {
        const toVerify = (
          <div>
            <br />
            <Divider />
            <br />
            <Typography variant="title" paragraph={true}>
              Liste de choses à faire
            </Typography>
            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBoxOutlineBlank fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} /> Veuillez vérifier votre compte.
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
            <Typography variant="title" paragraph={true}>
              Liste de choses à faire
            </Typography>
            <Typography variant="subtitle1" color="inherit" grow={1}>
            <CheckBoxOutlineBlank fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} />  Veuillez remplir le formulaire Qualtrics en visitant :
              <Button 
                color="primary"
                size="small"
                variant="outlined"
                style={{marginLeft:'0.5rem'}}>
                <a href={`https://fpse.qualtrics.com/jfe/form/SV_3VjBHgE8Lu9uICN?id=${appContainer.state.surveyId}`} style={LinkEnquete}>
                  Enquête
                </a>
              </Button>
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBoxOutlineBlank fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} />Si c’est déjà fait, cliquez sur le bouton pour associer votre compte aux données du formulaire Qualtrics :
              <Button
              onClick={appContainer.link}
              color="primary"
              size="small"
              variant="outlined"
              style={{marginLeft:'0.5rem'}}
            >
              Lien
            </Button>
            </Typography>
            <br />
            <br />
            <br />
            <Divider />
            <br />
          </div>
        );
        const allRight = (
          <div>
             <Typography variant="title" paragraph={true}>
              Liste de choses à faire
            </Typography>
            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBox fontSize="large" style={{float:'left', clear:'none', marginRight:'0.5rem'}} /> Bienvenue, vous avez déjà rempli le formulaire Qualtrics et votre compte a été vérifié. Vous pouvez accéder à vos recommandations professionnelles.
            </Typography>
            <Divider />
          </div>
        );

        let text;
        if (appContainer.state.verified && appContainer.state.formDone) {
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
