import React from "react";
import { Subscribe } from "unstated";
import AsyncSelect from "react-select/lib/Async";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import RecomContainer from "js/containers/RecomContainer";
import AppContainer from "js/containers/appContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import { Modal, FormContainer, StyledSlider, Submit } from "./StyledParts";
import RecomResults from "./RecomResults";

const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "white",
    zIndex: "999",
    fontFamily: 'Roboto'
  })
};

function Recommendation() {
  return (
    <Subscribe to={[AppContainer, RecomContainer, ErrorContainer]}>
      {(appContainer, recomContainer, errorContainer) => {
        return (
          <div>
            <FormContainer>
              <Typography variant="title">
                Job recommendation preferences
              </Typography>
              <br />
              <AsyncSelect
                cacheOptions
                styles={selectStyles}
                defaultInputValue={appContainer.state.oldJobLabel}
                loadOptions={v =>
                  recomContainer.handleSearch(v, errorContainer.displayError)
                }
                defaultOptions
                onChange={appContainer.setOldJobValue}
              />
              <br />
              <Typography id="label">
              Importance de mon profil personnel : {(appContainer.state.alpha / 100).toFixed(2)}{" "}
              </Typography>
              <StyledSlider
                value={Math.round(appContainer.state.alpha)}
                aria-labelledby="label"
                onChange={appContainer.setAlpha}
              />
              <Typography id="label">
              Importance de mon poste antérieur : {(appContainer.state.beta / 100).toFixed(2)}
              </Typography>
              <StyledSlider
                value={Math.round(appContainer.state.beta)}
                aria-labelledby="label"
                onChange={appContainer.setBeta}
              />
              <Submit
                onClick={_ =>
                  recomContainer.recommend(
                    appContainer,
                    errorContainer.displayError
                  )
                }
                fullWidth
                disabled={!appContainer.state.oldJobValue}
                variant="contained"
                color="secondary"
              >
                RECOMMEND
              </Submit>
              <br />
              <br />
              <br />
              <Divider />
              <Divider />
              <br />
            </FormContainer>
            <RecomResults recomContainer={recomContainer} />
          </div>
        );
      }}
    </Subscribe>
  );
}

export default Recommendation;
