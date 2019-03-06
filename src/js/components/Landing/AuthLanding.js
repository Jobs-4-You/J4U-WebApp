import React from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";
import AppContainer from "js/containers/appContainer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 20px;
`;

function AuthLanding({ appContainer }) {
  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => {
        const toVerify = (
          <div>
            <br />
            <Divider />
            <br />
            <Typography variant="subtitle1" color="inherit" grow={1}>
              You need to verify your account.
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
            <Typography variant="subtitle1" color="inherit" grow={1}>
              You need to complete the Qualtrics form by visiting: <br />
              <a
                href={`https://fpse.qualtrics.com/jfe/form/SV_3VjBHgE8Lu9uICN?id=${
                  appContainer.state.surveyId
                }`}
              >
                Qualtrics Survey
              </a>
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="subtitle1" color="inherit" grow={1}>
              If it's already done click on the button below to link your
              account with the Qualtrics form data:
            </Typography>
            <Button
              onClick={appContainer.link}
              color="primary"
              size="medium"
              variant="outlined"
            >
              Link
            </Button>
            <br />
            <br />
            <br />
            <Divider />
            <br />
          </div>
        );
        const allRight = (
          <div>
            <Typography variant="subtitle1" color="inherit" grow={1}>
              Welcome, you already have completed the Qualtrics survey and you
              have verified your account. You can access the job recommendations
              pannel.
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
