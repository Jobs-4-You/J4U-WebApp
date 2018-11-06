import React from 'react';
import { observer, inject } from 'mobx-react';
import { withState, compose } from 'recompose';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import jobs from './jobs.json';
import { recomQuery } from 'js/data';

const Wrapper = styled(Paper)`
  margin: auto;
  margin-top: 40px;
  padding: 15px;
  width: 800px;
`
const ItemWrapper = styled.div`
  width: 50%;
`
const SliderWrapper = styled.div`
  width: 150px;
  display: inline-block;
  padding-right: 15px;
`
const LabelWrapper = styled.div`
  width: 200px;
  display: inline-block;
`
const StyledSlider = styled(Slider)`
  margin-top: -5px;
`

function VarSlider({ handleChange, value, label }) {
  return (
    <ItemWrapper>
      <LabelWrapper> {label}:  </LabelWrapper>
      <SliderWrapper>
        <StyledSlider
          value={value}
          onChange={(x, value) => handleChange(value)}
          min={1}
          max={5}
          step={1}
        />
      </SliderWrapper>
      {`${value}/5`}
    </ItemWrapper>
  )
}

function JobInput({ handleChange, value }) {
  return (
    <ItemWrapper>
      <LabelWrapper> Old Job:  </LabelWrapper>
      <SliderWrapper>
        <Select
          value={value}
          onChange={handleChange}
          inputProps={{
            name: 'oldJob',
            id: 'old-job',
          }}
        >
          {jobs.jobs.slice(0, 10).map((job, i) => {
            return (
              <MenuItem key={i} value={i}>{job}</MenuItem>
            )
          })}
        </Select>
      </SliderWrapper>
    </ItemWrapper>
  )
}

function ShowRes({ j }) {
  console.log(j, 'xxxxxx')
  if (jobs === null) {
    return null
  } else {
    const elems = [];
    for (var key in j) {
      elems.push(
        <div key={key}>
          <span> {Number(key) + 1} : </span>
          <span> {j[key]} </span>
        </div>
      )
    }
    return (
      <div>
        {elems}
      </div>
    )
  }
}

const enhancedRecom = compose(
  withState('var1', 'setVar1', 1),
  withState('var2', 'setVar2', 1),
  withState('var3', 'setVar3', 1),
  withState('var4', 'setVar4', 1),
  withState('var5', 'setVar5', 1),
  withState('var6', 'setVar6', 1),
  withState('var7', 'setVar7', 1),
  withState('var8', 'setVar8', 1),
  withState('var9', 'setVar9', 1),
  withState('var10', 'setVar10', 1),
  withState('var11', 'setVar11', 1),
  withState('var12', 'setVar12', 1),
  withState('var13', 'setVar13', 1),
  withState('var14', 'setVar14', 1),
  withState('var15', 'setVar15', 1),
  withState('recoms', 'setRecoms', null),
  withRouter,
);
const LoggedRecom = enhancedRecom((props) => {
  const labels = ['Fluency of Ideas', 'Inductive Reasoning', 'Memorization',
    'Perceptual Speed', 'Reading Speed', 'Reading Comprehension', 'Monitoring',
    'Time Management', 'Leadership', 'Self Control', 'Stress Tolerance',
    'Adaptability/Flexibility', 'Mon profil personnel', 'Mon poste antérieur'];
  const sliders = labels.map((label, i) => {
    let idx;
    if (i + 1 === 14)
      idx = 15;
    else
      idx = i + 1

    return <VarSlider
      key={i}
      handleChange={props[`setVar${idx}`]}
      value={props[`var${idx}`]}
      label={label}
      id={`var${idx}`}
    />
  })
  const recommend = () => {
    const urlParams = {}
    for (let i = 1; i <= 15; i++) {
      urlParams[`var${i}`] = props[`var${i}`]
    }
    urlParams.var14 = jobs.jobs[props.var14];

    console.log(recomQuery)
    recomQuery(urlParams).then(x => {
      props.setRecoms(x.data.jobs)
      console.log(x)
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div>
      <Wrapper>
        {sliders}
        <JobInput
          handleChange={e => props.setVar14(e.target.value)}
          value={props.var14}
        />
        <Button
          color="primary"
          onClick={recommend}
        >
          RECOMMEND
      </Button>
      </Wrapper>
      <Wrapper>
        <ShowRes j={props.recoms} />
      </Wrapper>
    </div>
  );
})

const Recom = (props) => {
  if (props.appStore.loggedIn) {
    return <LoggedRecom {...props} />
  } else {
    return null;
  }
}

export default withRouter(inject('appStore')(observer(Recom)));
