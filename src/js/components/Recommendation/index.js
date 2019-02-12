import React from 'react';
import { Subscribe } from 'unstated';
import AsyncSelect from 'react-select/lib/Async';
import Typography from '@material-ui/core/Typography';
import RecomContainer from 'js/containers/RecomContainer';
import AppContainer from 'js/containers/appContainer';
import { FormContainer, StyledSlider, Submit } from './StyledParts';
import RecomResults from './RecomResults';

const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999"
  })
};

const DropdownIndicator = (props) => {
  return null;
};

function Recommendation() {

  return (
    <Subscribe to={[AppContainer, RecomContainer]}>
      {(appContainer, recomContainer) => {
        console.log(recomContainer.state)
        return (
          <div>
            <FormContainer>
              <Typography variant='title'>Job recommendation preferences</Typography>
              <br />
              <AsyncSelect
                cacheOptions
                loadOptions={v => recomContainer.handleSearch(v, appContainer.state.accessToken)}
                defaultOptions
                onChange={recomContainer.setOldJobValue}
              />
              <br />
              <Typography id="label">Alpha: {(recomContainer.state.alpha / 100).toFixed(2)} </Typography>
              <StyledSlider
                value={Math.round(recomContainer.state.alpha)}
                aria-labelledby="label"
                onChange={recomContainer.setAlpha}
              />
              <Typography id="label">Beta: {(recomContainer.state.beta / 100).toFixed(2)}</Typography>
              <StyledSlider
                value={Math.round(recomContainer.state.beta)}
                aria-labelledby="label"
                onChange={recomContainer.setBeta}
              />
              <Submit
                onClick={_ => recomContainer.recommend(appContainer.state.accessToken)}
                fullWidth
                variant="contained"
                color="secondary"
              >
                RECOMMEND
            </Submit>
            </FormContainer>
            <RecomResults recomContainer={recomContainer} />
          </div>
        )
      }
      }
    </Subscribe>)
}

export default Recommendation;