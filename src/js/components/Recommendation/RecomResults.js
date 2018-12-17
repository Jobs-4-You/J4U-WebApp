import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ResContainer, JobCard } from './StyledParts'


function JobResult({ job }) {
  return (
    <JobCard>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {job}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </JobCard>
  )
}


function RecomRsults({ recomContainer }) {
  const { jobs, importance, vars } = recomContainer.state;
  console.log(jobs, 'abcdegh')
  if (jobs) {
    return (
      <ResContainer>
        {jobs.map((job, i) => (
          <JobResult job={job} key={i}/>
        ))}
      </ResContainer>
    )
  }

  else {
    return null;
  }

}

export default RecomRsults;