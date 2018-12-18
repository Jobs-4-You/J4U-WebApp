import React from 'react';
import { Subscribe } from 'unstated';
import styled from 'styled-components';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import jobs from './jobs.json';
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

  const options = jobs.jobs.map(job => ({
    label: job,
    value: job
  }));

  return (
    <Subscribe to={[AppContainer, RecomContainer]}>
      {(appContainer, recomContainer) => {
        console.log(recomContainer.state)
        return (
          <div>
            <FormContainer>
              <Typography variant='title'>Job recommendation preferences</Typography>
              <br />
              <Select
                inputValue={recomContainer.state.oldJobInput}
                value={recomContainer.state.oldJobValue}
                onInputChange={recomContainer.setOldJobInput}
                onChange={recomContainer.setOldJobValue}
                options={options}
                isSearchable={true}
                closeMenuOnSelect={false}
                components={{ DropdownIndicator }}
                placeholder="Select your previous job ..."
                styles={selectStyles}
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