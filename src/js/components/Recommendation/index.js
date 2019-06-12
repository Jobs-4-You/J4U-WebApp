import React from "react";
import { Subscribe } from "unstated";
import AsyncSelect from "react-select/lib/Async";
import Select from "react-select/lib/Select";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import RecomContainer from "js/containers/RecomContainer";
import AppContainer from "js/containers/appContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import { FormContainer, StyledSlider, Submit } from "./StyledParts";
import RecomResults from "./RecomResults";

const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "white",
    zIndex: "999",
    fontFamily: "Roboto"
  })
};

const locationStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "white",
    zIndex: "998",
    fontFamily: "Roboto"
  })
};


const defaultLocation = [{ label: "Neuchâtel (NE)", value: "NE" }];

function Recommendation() {
  return (
    <Subscribe to={[AppContainer, RecomContainer, ErrorContainer]}>
      {(appContainer, recomContainer, errorContainer) => {
        return (
          <div>
            <FormContainer>
              <Typography variant="title">
                Taper votre profession antérieure
              </Typography>
              <br />
              <div style={{
                display: appContainer.state.fixedOldJobValue ? "block" : "none",
                margin: "1rem"
              }}>
                <Typography>Poste antérieur : {appContainer.state.oldJobLabel}</Typography>
              </div>
              <div style={{
                  display: !appContainer.state.fixedOldJobValue ? "block" : "none"
                }}>
                <AsyncSelect
                  cacheOptionscd
                  styles={selectStyles}
                  defaultInputValue={appContainer.state.oldJobLabel}
                  loadOptions={v =>
                    recomContainer.handleSearch(v, errorContainer.displayError)
                  }
                  defaultOptions
                  onChange={appContainer.setOldJobValue}
                  disabled={appContainer.state.fixedOldJobValue}
                />
                <br />
              </div>
              <div style={{
                  display: appContainer.state.fixedAlphaBeta ? "block" : "none",
                  margin: "1rem"
                }}>
                  <Typography>
                    Importance de mon profil personnel : {Math.round(appContainer.state.alpha)}
                  </Typography>
                  <Typography>
                    Importance de ma profession antérieure : {Math.round(appContainer.state.beta)}
                  </Typography>
              </div>

              <div style={{
                  display: !appContainer.state.fixedAlphaBeta ? "block" : "none"
                }}>

                <Typography id="label">
                  Importance de mon profil personnel :{" "}
                  {(appContainer.state.alpha / 100).toFixed(2)}{" "}
                </Typography>
                <StyledSlider
                  value={Math.round(appContainer.state.alpha)}
                  aria-labelledby="label"
                  onChange={appContainer.setAlpha}
                  disabled={appContainer.state.fixedAlphaBeta}
                />
                <Typography id="label">
                  Importance de mon poste antérieur :{" "}
                  {(appContainer.state.beta / 100).toFixed(2)}
                </Typography>
                <StyledSlider
                  value={Math.round(appContainer.state.beta)}
                  aria-labelledby="label"
                  onChange={appContainer.setBeta}
                  disabled={appContainer.state.fixedAlphaBeta}
                />

              </div>
              <AsyncSelect
                cacheOptions
                styles={locationStyles}
                isClearable={false}
                placeholder="Canton"
                loadOptions={v =>
                  recomContainer.handleLocations(v, errorContainer.displayError)
                }
                defaultOptions
                defaultValue={defaultLocation}
                onChange={recomContainer.setLocation}
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
                Recommander
              </Submit>
              <br />
              <br />
              <br />
              <Divider />
              <Divider />
              <br />
            </FormContainer>
            <RecomResults
              recomContainer={recomContainer}
              errorContainer={errorContainer}
              appContainer={appContainer}
            />
          </div>
        );
      }}
    </Subscribe>
  );
}

export default Recommendation;