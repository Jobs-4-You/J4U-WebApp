import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { ResContainer, Loader, FullTypo } from "./StyledParts";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

function OpenPosition({ recomContainer, i }) {
  const openPos  = recomContainer.state.openPositions[i];
  if (openPos) {
    return openPos.data.map(
      (job, i) =>
      <ListItem button key={i}>
        <ListItemText inset primary={job.jobContent.jobDescriptions[0].title} 
        onClick={_ => recomContainer.setSelectedJob(recomContainer, {
          title: job.jobContent.jobDescriptions[0].title,
          externalUrl: job.jobContent.externalUrl,
          companyName: job.jobContent.company.name,
          description: job.jobContent.jobDescriptions[0].description,
          locationCity: job.jobContent.location.city,
        })}
        />
      </ListItem>
    );
  } else {
    return null;
  }
}

function JobResult({ recomContainer, job, rank, avam, classes }) {
  const { openPositions } = recomContainer.state;
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={_ => recomContainer.secoSearch(recomContainer, avam, rank - 1)}
      >
        <Chip label={`Rank: ${rank}`} variant="outlined" />
        <Chip label={job} variant="outlined" />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List component="nav" className={classes.root}>
          <OpenPosition recomContainer={recomContainer} i={rank - 1} />
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

function JobDetail({ recomContainer }) {
  const { selectedJob } = recomContainer.state;
  if (selectedJob != null) {
    return (
      <Typography>
        {selectedJob.description}
      </Typography>
    );
  } else {
    return null;
  }
}

function RecomRsults({ recomContainer }) {
  const { jobs, importance, vars, loading, avam, bfs } = recomContainer.state;
  if (loading) {
    return (
      <ResContainer>
        <FullTypo variant="title">Your recomendations</FullTypo>
        <Loader size={100} />
      </ResContainer>
    );
  }

  if (jobs) {
    return (
      <ResContainer>
        <FullTypo variant="title" align="center">Your recomendations</FullTypo>
        <br />
        <JobDetail recomContainer={recomContainer} />
        <br />
        {jobs.map((job, i) => (
          <JobResult
            job={job}
            rank={i + 1}
            key={i}
            avam={avam[i]}
            bfs={bfs[i]}
            recomContainer={recomContainer}
            classes={PropTypes.object.isRequired}
          />
        ))}
      </ResContainer>
    );
  } else {
    return null;
  }
}

export default RecomRsults;
