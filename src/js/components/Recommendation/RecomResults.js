import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import { ResContainer, Loader, FullTypo } from "./StyledParts";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    float: 'inline',
    marginRight: "1rem",
  }
});

function OpenPosition({ recomContainer, i }) {
  const openPos  = recomContainer.state.openPositions[i];
  if (openPos) {
    return openPos.data.map(
      (job, i) =>
      <ListItem button key={i}>
        <ListItemText inset onClick={_ => recomContainer.setSelectedJob(recomContainer, job)}>
            <Typography>
              {job.jobContent.jobDescriptions[0].title} 
            </Typography>
            <Typography>
              {job.createdTime ? new Date(job.createdTime).toLocaleDateString("fr-CH") : ""} 
            </Typography>
            <span className="inline">
              <strong>{job.jobContent.company.name}</strong>
            </span>
            <span className="inline">
              {job.jobContent.location.postalCode} {job.jobContent.location.city} ({job.jobContent.location.cantonCode})
            </span>
            <span className="inline">
              {(job.jobContent.employment.workloadPercentageMin && job.jobContent.employment.workloadPercentageMin !== "100")  ? job.jobContent.employment.workloadPercentageMin + "% - " : ""}
              {job.jobContent.employment.workloadPercentageMax + "%"}
            </span>
            <span className="inline">
              {job.jobContent.employment.immediately == true ? "Tout de suite" : (job.jobContent.employment.startDate ? job.jobContent.employment.startDate : "À convenir") }
            </span>
            <span className="inline">
              {job.jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
            </span>
            <Typography>
              {job.jobContent.jobDescriptions[0].description.length >= 280 ? job.jobContent.jobDescriptions[0].description.substring(0, 279) + "..." : job.jobContent.jobDescriptions[0].description}
            </Typography>
          </ListItemText>
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

  const handleClose = () => {
    recomContainer.setState({
      selectedJob: null
    });
  };

  if (selectedJob != null) {
    return (
      <Dialog
            aria-labelledby={selectedJob.title}
            aria-describedby={selectedJob.title}
            open={selectedJob !== null}
            onClose={handleClose}
            maxWidth={false}
      >
        <DialogTitle align="center">
          {selectedJob.jobContent.jobDescriptions[0].title}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={16}>
            <Grid item xs={2}>
            <Paper>
                <span>
                  <strong>{selectedJob.jobContent.company.name}</strong>
                </span>
                <Typography>
                  {selectedJob.jobContent.company.street}
                </Typography>
                <Typography>
                  {selectedJob.jobContent.postalCode} {selectedJob.jobContent.city}
                </Typography>
                <span>
                  <strong>Votre personne de contact</strong>
                </span>
                <Typography>
                 {selectedJob.jobContent.publicContact.salutation == "MS" ? "Madame" : "Monsieur"} {selectedJob.jobContent.publicContact.firstName} {selectedJob.jobContent.publicContact.lastName}
                </Typography>
                <Typography>
                 {selectedJob.jobContent.publicContact.phone}
                </Typography>
                <Typography>
                 {selectedJob.jobContent.publicContact.email}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {selectedJob.jobContent.jobDescriptions[0].title} 
              </Typography>
              <Typography>
                Libre depuis : {selectedJob.createdTime ? new Date(selectedJob.createdTime).toLocaleDateString("fr-CH") : ""} 
              </Typography>
              <span className="inline">
                <strong>{selectedJob.jobContent.company.name}</strong>
              </span>
              <span className="inline">
                {selectedJob.jobContent.location.postalCode} {selectedJob.jobContent.location.city} ({selectedJob.jobContent.location.cantonCode})
              </span>
              <span className="inline">
                {(selectedJob.jobContent.employment.workloadPercentageMin && selectedJob.jobContent.employment.workloadPercentageMin !== "100")  ? selectedJob.jobContent.employment.workloadPercentageMin + "% - " : ""}
                {selectedJob.jobContent.employment.workloadPercentageMax + "%"}
              </span>
              <span className="inline">
                {selectedJob.jobContent.employment.immediately == true ? "Tout de suite" : (selectedJob.jobContent.employment.startDate ? selectedJob.jobContent.employment.startDate : "À convenir") }
              </span>
              <span className="inline">
                {selectedJob.jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
              </span>
              <Typography>
                {selectedJob.jobContent.jobDescriptions[0].description}
              </Typography>
              <Typography>
                Informations sur le poste 
              </Typography>
              <span>
                <strong>
                Lieu de travail
                </strong>
              </span>
              <Typography>
                {selectedJob.jobContent.location.postalCode} {selectedJob.jobContent.location.city} ({selectedJob.jobContent.location.cantonCode})
              </Typography>
              <span>
                <strong>
                Entrée en fonction
                </strong>
              </span>
              <Typography>
                {selectedJob.jobContent.employment.immediately == true ? "Tout de suite" : (selectedJob.jobContent.employment.startDate ? selectedJob.jobContent.employment.startDate : "À convenir") }
              </Typography>
              <span>
                <strong>
                Taux d'occupation
                </strong>
              </span>
              <Typography>
                {(selectedJob.jobContent.employment.workloadPercentageMin && selectedJob.jobContent.employment.workloadPercentageMin !== "100")  ? selectedJob.jobContent.employment.workloadPercentageMin + "% - " : ""}
                {selectedJob.jobContent.employment.workloadPercentageMax + "%"}
              </Typography>
              <span>
                <strong>
                Durée de l'engagement
                </strong>
              </span>
              <Typography>
                {selectedJob.jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
              </Typography>
              <Typography>
                Connaissances linguistiques
              </Typography>
              <span>
                <strong>
                Allemand
                </strong>
              </span>
              <Typography>
                Formes possibles de postulation 
              </Typography>
              <span>
                <strong>
                {selectedJob.jobContent.applyChannel.emailAddress ? "Par courriel" : ""}
                </strong>
              </span>
              <Typography>
                {selectedJob.jobContent.applyChannel.emailAddress ? selectedJob.jobContent.applyChannel.emailAddress : ""}
              </Typography>
              <span>
                <strong>
                {selectedJob.jobContent.applyChannel.postAddress ? "Par courrier" : ""}
                </strong>
              </span>
              <Typography>
                {selectedJob.jobContent.applyChannel.postAddress ? (
                  selectedJob.jobContent.applyChannel.postAddress.name ? selectedJob.jobContent.applyChannel.postAddress.name : ""
                ) : ""
              }
              </Typography>
              <Typography>
                {selectedJob.jobContent.applyChannel.postAddress ? (
                  selectedJob.jobContent.applyChannel.postAddress.street && selectedJob.jobContent.applyChannel.postAddress.houseNumber ? 
                    selectedJob.jobContent.applyChannel.postAddress.street + " " + selectedJob.jobContent.applyChannel.postAddress.houseNumber : ""
                  ) : ""
                }
              </Typography>
              <Typography>
              {selectedJob.jobContent.applyChannel.postAddress ? (
                selectedJob.jobContent.applyChannel.postAddress.postalCode && selectedJob.jobContent.applyChannel.postAddress.city ? 
                  selectedJob.jobContent.applyChannel.postAddress.postalCode + " " + selectedJob.jobContent.applyChannel.postAddress.city : ""
                ) : ""
              }
              </Typography>
              <Typography>
              {selectedJob.jobContent.applyChannel.postAddress ? (
                selectedJob.jobContent.applyChannel.postAddress.postOfficeBoxNumber ? selectedJob.jobContent.applyChannel.postAddress.postOfficeBoxNumber + " " + selectedJob.jobContent.applyChannel.postAddress.postOfficeBoxPostalCode + " " + selectedJob.jobContent.applyChannel.postAddress.postOfficeBoxCity : ""
                ) : ""
              }
              </Typography>
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
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
