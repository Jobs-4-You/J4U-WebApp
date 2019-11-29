import React from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";
import AppContainer from "js/containers/appContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CheckBox from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlank from "@material-ui/icons/CheckBoxOutlineBlank";
import Loading from "js/components/Divers/Loading";

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 20px;
`;

const LinkEnquete = { textDecoration: "none", color: "#2196f3" };

const linkMap = {
  COG: "https://fpse.qualtrics.com/jfe/form/SV_emNJjF8ZCQPAyA5",
  CONT: "https://fpse.qualtrics.com/jfe/form/SV_9LWr3TrjbpNEdMh",
  J4U: "https://fpse.qualtrics.com/jfe/form/SV_eu2KVQoRYyVFsod",
  "J4U+COG": "https://fpse.qualtrics.com/jfe/form/SV_cVfzu7FqlpU53yl",
  NJS: "https://fpse.qualtrics.com/jfe/form/SV_cVfzu7FqlpU53yl",
  "J4U+NJS": "https://fpse.qualtrics.com/jfe/form/SV_cVfzu7FqlpU53yl"
};

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
              <CheckBoxOutlineBlank
                fontSize="large"
                style={{ float: "left", clear: "none", marginRight: "0.5rem" }}
              />
              Veuillez vérifier la boîte mail que vous avez indiquée et cliquez
              sur le lien de confirmation.
              <Button
                onClick={() =>
                  appContainer.sendVerification(errorContainer.displayError)
                }
                color="primary"
                size="small"
                variant="outlined"
                style={{ marginLeft: "0.5rem" }}
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

            <br />
            <Divider />
            <br />
            <Typography paragraph={true}>
              Commencez par regarder ces videos.
            </Typography>

            {/*             <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dc6FMrhfdFw"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe> */}
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/d1PfyStt7YE"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/4NS2Flf2IxY"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <br />
            <br />
            <Divider />
            <br />

            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBoxOutlineBlank
                fontSize="large"
                style={{ float: "left", clear: "none", marginRight: "0.5rem" }}
              />{" "}
              Veuillez remplir le questionnaire initial, qui prend généralement
              entre 45 minutes et une heure :
              <Button
                color="primary"
                size="small"
                variant="outlined"
                style={{ marginLeft: "0.5rem" }}
              >
                <a
                  /*                   href={`https://fpse.qualtrics.com/jfe/form/SV_6tmPFThjXFpKg17?id=${appContainer.state.surveyId}`} */
                  href={`${linkMap[appContainer.state.group]}?id=${
                    appContainer.state.surveyId
                  }`}
                  style={LinkEnquete}
                >
                  Enquête
                </a>
              </Button>
              Rappel des instructions données dans la vidéo précédente :
              <ul>
                <li>
                  Répondez honnêtement. Il n’y a pas de réponse juste ou de
                  réponse fausse, le but étant d’obtenir un outil personnalisé.
                </li>
                <li>
                  Faites l’enquête dans un endroit calme sans être interrompu.
                </li>
                <li>
                  Réalisez l’enquête depuis un ordinateur (enquête non
                  compatible avec une tablette ou un smartphone).
                </li>
                <li>Lisez bien les instructions avant chaque exercice.</li>
              </ul>
            </Typography>
            <br />
            <Divider />
            <br />

            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBoxOutlineBlank
                fontSize="large"
                style={{ float: "left", clear: "none", marginRight: "0.5rem" }}
              />
              Une fois l'enquête complétée, cliquez sur le bouton suivant pour
              importer vos résultats personnels dans l'outil J4U :
              <Button
                onClick={() => appContainer.link(errorContainer.displayError)}
                color="primary"
                size="small"
                variant="outlined"
                style={{ marginLeft: "0.5rem" }}
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
              <CheckBox
                fontSize="large"
                style={{ float: "left", clear: "none", marginRight: "0.5rem" }}
              />{" "}
              Bienvenue, vous avez déjà rempli le questionnaire initial et votre
              compte a été vérifié. Vous pouvez accéder à vos recommandations
              professionnelles.
            </Typography>
            <Divider />
          </div>
        );

        const blockedText = (
          <div>
            <Typography variant="subtitle1" color="inherit" grow={1}>
              <CheckBox
                fontSize="large"
                style={{ float: "left", clear: "none", marginRight: "0.5rem" }}
              />{" "}
              Bienvenue. Votre compte est prêt pour la session initiale.
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
