import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { ResContainer, JobCard, Loader, FullTypo } from './StyledParts'



function JobResult({ job, rank }) {
  return (
    <JobCard>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {job}
        </Typography>
        <br />
        <Chip label={`Rank: ${rank}`} variant="outlined" />
      </CardContent>
      <CardActions>
        <Button size="small">Seek job offers</Button>
      </CardActions>
    </JobCard>
  )
}


function RecomRsults({ recomContainer }) {
  const { jobs, importance, vars, loading } = recomContainer.state;

  if (loading) {
    return (
      <ResContainer>
        <FullTypo variant='title'>Your recomendations</FullTypo>
        <Loader size={100} />
      </ResContainer>
    )
  }

  if (jobs) {
    return (
      <ResContainer>
        <FullTypo variant='title'>Your recomendations</FullTypo>
        {jobs.map((job, i) => (
          <JobResult job={job} rank={i + 1} key={i} />
        ))}
      </ResContainer>
    )
  }

  else {
    return null;
  }

}

export default RecomRsults;