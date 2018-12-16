import React from 'react';
import { Subscribe } from 'unstated';
import styled from 'styled-components';
import Select from 'react-select';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import jobs from './jobs.json';
import RecomContainer from 'js/containers/RecomContainer';
import AppContainer from 'js/containers/appContainer';

const selectStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1",
    backgroundColor: "transparent",
    zIndex: "999"
  })
};

const FormContainer = styled(Paper)`
  padding: 30px;
  width: 500px;
  margin: auto;
  margin-top: 30px;
`;

const StyledSlider = styled(Slider)`
  padding-top: 10px;
  padding-bottom: 10px;
`

const Submit = styled(Button)`
  width: 150px !important;
  margin: auto !important;
  margin-top: 30px !important;
`
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
            <Typography id="label">Alpha: {recomContainer.state.alpha} </Typography>
            <StyledSlider
              value={Math.round(recomContainer.state.alpha * 100)}
              aria-labelledby="label"
              onChange={recomContainer.setAlpha}
            />
            <Typography id="label">Beta: {recomContainer.state.beta}</Typography>
            <StyledSlider
              value={Math.round(recomContainer.state.beta * 100)}
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
        )
      }
      }
    </Subscribe>)
}

export default Recommendation;