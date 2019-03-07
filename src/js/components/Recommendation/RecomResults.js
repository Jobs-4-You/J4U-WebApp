import React from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ResContainer, Loader, FullTypo } from './StyledParts'

//function JobResult({ job, rank }) {
//  return (
//    <JobCard>
//      <CardContent>
//        <Typography color="textSecondary" gutterBottom>
//          {job}
//        </Typography>
//        <br />
//        <Chip label={`Rank: ${rank}`} variant="outlined" />
//      </CardContent>
//      <CardActions>
//        <Button size="small">Seek job offers</Button>
//      </CardActions>
//    </JobCard>
//  )
//}

function JobResult({ recomContainer, job, rank, avam }) {
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary 
        expandIcon={<ExpandMoreIcon />}
        onClick={_ =>
          recomContainer.secoSearch(
            avam
          )
        }>
        <Chip label={`Rank: ${rank}`} variant="outlined" />
        <Chip label={job} variant="outlined" />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.  
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}


function RecomRsults({ recomContainer }) {
  const { jobs, importance, vars, loading, avam, bfs } = recomContainer.state;
  console.log(jobs, 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
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
        <br/>
        {jobs.map((job, i) => (
          <JobResult job={job} rank={i + 1} key={i} avam={avam[i]} bfs={bfs[i]} recomContainer={recomContainer} />
        ))}
      </ResContainer>
    )
  }

  else {
    return null;
  }

}

export default RecomRsults;