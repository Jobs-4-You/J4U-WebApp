import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Subscribe } from "unstated";
import AppContainer from "js/containers/appContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
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

function AuthLandingNew({ appContainer }) {
  useEffect(() => {
    appContainer.checkCompletion();
  }, []);

  return (
    <Subscribe to={[AppContainer, ErrorContainer]}>
      {(appContainer, errorContainer) => {
        return (
          <div>
            {appContainer.state.verifData.map((x, i) => (
              <Box
                key={i}
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <Typography variant="subtitle1" color="inherit">
                  {x.completed ? (
                    <CheckBox
                      fontSize="large"
                      style={{
                        float: "left",
                        clear: "none",
                        marginRight: "0.5rem"
                      }}
                    />
                  ) : (
                    <CheckBoxOutlineBlank
                      fontSize="large"
                      style={{
                        top: "100px"
                      }}
                    />
                  )}
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  Veuillez remplir
                </Typography>
                <Typography variant="subtitle1" color="inherit">
                  <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    style={{ marginLeft: "0.5rem" }}
                  >
                    <a
                      href={`https://fpse.qualtrics.com/jfe/form/${x.surveyId}?id=${appContainer.state.surveyId}`}
                      style={LinkEnquete}
                    >
                      {x.title}
                    </a>
                  </Button>
                </Typography>
              </Box>
            ))}
            {appContainer.state.loading ? (
              <Loading loading={true} />
            ) : (
              <Button
                onClick={() =>
                  appContainer.updateCompletion(errorContainer.displayError)
                }
                color="primary"
                size="small"
                variant="outlined"
                style={{ marginLeft: "0.5rem" }}
              >
                Verifier la completion
              </Button>
            )}
          </div>
        );
      }}
    </Subscribe>
  );
}

export default AuthLandingNew;
