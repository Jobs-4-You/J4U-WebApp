import React, { useState } from "react";
import { Subscribe } from "unstated";
import AsyncSelect from "react-select/lib/Async";
import Info from "@material-ui/icons/Info";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import RecomContainer from "js/containers/RecomContainer";
import AppContainer from "js/containers/appContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import {
  FormContainer,
  StyledSlider,
  Submit,
  VidContainer,
  SlidersContainer
} from "./StyledParts";
import RecomResults from "./RecomResults";
import JobResultList from "./JobResultList";
import JobDetail from "./JobDetail";
import PropTypes from "prop-types";

const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "white",
    zIndex: "999",
    fontFamily: "Roboto",
    width: "90%"
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

function TutoVid({ tutoVid, setTutoVid }) {
  const youtubeMap = {
    job: "https://www.youtube.com/embed/XLzTdyMw91w",
    imp: "https://www.youtube.com/embed/vn9n2eMfS74",
    recom: "https://www.youtube.com/embed/SdWVQTnaFq8"
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={tutoVid}
      onClose={_ => setTutoVid(null)}
    >
      <VidContainer>
        <Typography variant="h3">{tutoVid}</Typography>
        <div>
          <iframe
            width="560"
            height="315"
            src={youtubeMap[tutoVid]}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </VidContainer>
    </Modal>
  );
}

function Recommendation() {
  const [tutoVid, setTutoVid] = useState(null);
  return (
    <Subscribe to={[AppContainer, RecomContainer, ErrorContainer]}>
      {(appContainer, recomContainer, errorContainer) => {
        let controlGroup =
          appContainer.state.group.indexOf("J4U") === -1 ? true : false;
        return (
          <div>
            <TutoVid tutoVid={tutoVid} setTutoVid={setTutoVid} />
            <FormContainer>
              <Typography variant="subtitle1">
                {controlGroup
                  ? "Recherche d'emploi"
                  : "Taper votre profession antérieure"}
              </Typography>
              <br />
              <div
                style={{
                  display: appContainer.state.fixedOldJobValue
                    ? "block"
                    : "none",
                  margin: "1rem"
                }}
              >
                <Typography>
                  Poste antérieur : {appContainer.state.oldJobLabel}
                </Typography>
              </div>
              <div
                style={{
                  display: !appContainer.state.fixedOldJobValue
                    ? "block"
                    : "none"
                }}
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <AsyncSelect
                    cache={false}
                    isClearable={true}
                    styles={selectStyles}
                    inputValue={recomContainer.state.search}
                    blurInputOnSelect={true}
                    loadOptions={v =>
                      recomContainer.handleSearch(
                        v,
                        errorContainer.displayError,
                        controlGroup
                      )
                    }
                    value={recomContainer.state.value}
                    onChange={value => {
                      recomContainer.setValue(value);
                      appContainer.setOldJobValue(value);
                    }}
                    onInputChange={recomContainer.setSearch}
                    onFocus={() => {
                      recomContainer.setValue(null);
                      recomContainer.setSearch("");
                    }}
                    disabled={appContainer.state.fixedOldJobValue}
                    placeholder="Saisissez votre poste précédent"
                  />
                  <Info onClick={_ => setTutoVid("job")} />
                </Box>
                <br />
              </div>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <SlidersContainer>
                  <div
                    style={{
                      display:
                        appContainer.state.fixedAlphaBeta && !controlGroup
                          ? "block"
                          : "none",
                      margin: "1rem"
                    }}
                  >
                    <Typography>
                      Importance de mon profil personnel :{" "}
                      {Math.round(appContainer.state.alpha)}
                    </Typography>
                    <Typography>
                      Importance de ma profession antérieure :{" "}
                      {Math.round(appContainer.state.beta)}
                    </Typography>
                  </div>

                  <div
                    style={{
                      display:
                        !appContainer.state.fixedAlphaBeta && !controlGroup
                          ? "block"
                          : "none"
                    }}
                  >
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
                </SlidersContainer>
                <Info onClick={_ => setTutoVid("imp")} />
              </Box>
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
              <br />
              <br />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Submit
                  onClick={_ =>
                    !controlGroup
                      ? recomContainer.recommend(
                          appContainer,
                          errorContainer.displayError
                        )
                      : recomContainer.secoSearch(
                          recomContainer,
                          [appContainer.state.oldJobValue],
                          0,
                          errorContainer.displayError,
                          appContainer.state.oldJobLabel
                        )
                  }
                  fullWidth
                  disabled={!appContainer.state.oldJobValue}
                  variant="contained"
                  color="secondary"
                >
                  {controlGroup ? "Chercher" : "Recommander"}
                </Submit>
                <Info onClick={_ => setTutoVid("recom")} />
              </Box>
              <br />
              <br />
              <br />
              <Divider />
              <Divider />
              <br />
            </FormContainer>

            {controlGroup ? (
              <JobResultList
                recomContainer={recomContainer}
                rank={0}
                avam={[appContainer.state.oldJobValue]}
                classes={PropTypes.object.isRequired}
              />
            ) : (
              <RecomResults
                recomContainer={recomContainer}
                errorContainer={errorContainer}
                appContainer={appContainer}
              />
            )}

            <JobDetail
              recomContainer={recomContainer}
              appContainer={appContainer}
              setTutoVid={setTutoVid}
              tutoVid={tutoVid}
            />
          </div>
        );
      }}
    </Subscribe>
  );
}

export default Recommendation;
