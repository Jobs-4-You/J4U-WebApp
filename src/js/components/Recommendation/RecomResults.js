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
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from "@material-ui/core";
import LoadingSeco from "./LoadingSeco";


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
    <ExpansionPanel 
      onChange={(event, expanded) => {
        expanded ? recomContainer.secoSearch(recomContainer, avam, rank - 1) : null
      }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Chip label={`Rank: ${rank}`} variant="outlined" />
        <Chip label={job} variant="outlined" />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <LoadingSeco recomContainer={recomContainer} />
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
    
    const jobContent = selectedJob.jobContent;
    const applyChannel = jobContent.applyChannel;
    

    return (
      <Dialog
            aria-labelledby={selectedJob.title}
            aria-describedby={selectedJob.title}
            open={selectedJob !== null}
            onClose={handleClose}
            maxWidth={false}
      >
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
        <DialogTitle align="left">
          {jobContent.jobDescriptions[0].title}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={16}>
            <Grid item xs={3}>
              <span>
                <strong>{jobContent.company.name}</strong>
              </span>
              <Typography>
                {jobContent.company.street}
              </Typography>
              <Typography>
                {jobContent.company.postalCode} {jobContent.company.city}
              </Typography>
              <span>
                <strong>{jobContent.publicContact ? "Votre personne de contact" : ""}</strong>
              </span>
              <Typography>
                {jobContent.publicContact ? (
                  (jobContent.publicContact.salutation == "MS" ? "Madame" : "Monsieur") + " " + jobContent.publicContact.firstName + " " + jobContent.publicContact.lastName
                ) : ""}
              </Typography>
              <Typography>
                {jobContent.publicContact ? jobContent.publicContact.phone : ""}
              </Typography>
              <Typography>
                {jobContent.publicContact ? jobContent.publicContact.email : ""}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {jobContent.jobDescriptions[0].title} 
              </Typography>
              <Typography>
                Libre depuis : {selectedJob.createdTime ? new Date(selectedJob.createdTime).toLocaleDateString("fr-CH") : ""} 
              </Typography>
              <span className="inline">
                <strong>{jobContent.company.name}</strong>
              </span>
              <span className="inline">
                {jobContent.location.postalCode} {jobContent.location.city} ({jobContent.location.cantonCode})
              </span>
              <span className="inline">
                {(jobContent.employment.workloadPercentageMin && jobContent.employment.workloadPercentageMin !== "100")  ? jobContent.employment.workloadPercentageMin + "% - " : ""}
                {jobContent.employment.workloadPercentageMax + "%"}
              </span>
              <span className="inline">
                {jobContent.employment.immediately == true ? "Tout de suite" : (jobContent.employment.startDate ? jobContent.employment.startDate : "À convenir") }
              </span>
              <span className="inline">
                {jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
              </span>
              <Typography>
                {jobContent.jobDescriptions[0].description}
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
                {jobContent.location.postalCode} {jobContent.location.city} ({jobContent.location.cantonCode})
              </Typography>
              <span>
                <strong>
                Entrée en fonction
                </strong>
              </span>
              <Typography>
                {jobContent.employment.immediately == true ? "Tout de suite" : (jobContent.employment.startDate ? jobContent.employment.startDate : "À convenir") }
              </Typography>
              <span>
                <strong>
                Taux d'occupation
                </strong>
              </span>
              <Typography>
                {(jobContent.employment.workloadPercentageMin && jobContent.employment.workloadPercentageMin !== "100")  ? jobContent.employment.workloadPercentageMin + "% - " : ""}
                {jobContent.employment.workloadPercentageMax + "%"}
              </Typography>
              <span>
                <strong>
                Durée de l'engagement
                </strong>
              </span>
              <Typography>
                {jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
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
                {applyChannel ? (applyChannel.emailAddress ? "Par courriel" : "") : ""}
                </strong>
              </span>
              <Typography>
                {applyChannel ? (applyChannel.emailAddress ? applyChannel.emailAddress : "") : ""}
              </Typography>
              <span>
                <strong>
                {applyChannel ? (applyChannel.postAddress ? "Par courrier" : "") : ""}
                </strong>
              </span>
              <Typography>
                {applyChannel && applyChannel.postAddress ? (
                  applyChannel.postAddress.name ? applyChannel.postAddress.name : ""
                ) : ""
              }
              </Typography>
              <Typography>
                {applyChannel && applyChannel.postAddress ? (
                  applyChannel.postAddress.street && applyChannel.postAddress.houseNumber ? 
                    applyChannel.postAddress.street + " " + applyChannel.postAddress.houseNumber : ""
                  ) : ""
                }
              </Typography>
              <Typography>
              {applyChannel && applyChannel.postAddress ? (
                applyChannel.postAddress.postalCode && applyChannel.postAddress.city ? 
                  applyChannel.postAddress.postalCode + " " + applyChannel.postAddress.city : ""
                ) : ""
              }
              </Typography>
              <Typography>
              {applyChannel && applyChannel.postAddress ? (
                applyChannel.postAddress.postOfficeBoxNumber ? applyChannel.postAddress.postOfficeBoxNumber + " " + applyChannel.postAddress.postOfficeBoxPostalCode + " " + applyChannel.postAddress.postOfficeBoxCity : ""
                ) : ""
              }
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button
              onClick={ () => {
                recomContainer.handleJobApplication(
                  {
                    TYPE: 'JOB_APPLICATION',
                    id: selectedJob.id,
                    occupations: jobContent.occupations,
                    timestamp: Date().toLocaleString()
                  }
                )}
              }
              color="primary"
              size="medium"
              variant="outlined">
                <a href={jobContent.externalUrl} target="_blank">Postuler</a>
              </Button>
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
