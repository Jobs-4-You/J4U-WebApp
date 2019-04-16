import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import { JobBit, Pre, ResContainer, Loader, FullTypo } from "./StyledParts";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import { Button } from "@material-ui/core";
import LoadingSeco from "./LoadingSeco";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import Languages from "./Languages";


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
    return openPos.map(
      (job, i) =>
      <ListItem button key={i}>
        <ListItemText inset onClick={_ => recomContainer.setSelectedJob(recomContainer, job)}>
            <Typography>
              <strong>{job.jobContent.jobDescriptions[0].title}</strong>
            </Typography>
            <Typography>
              {job.createdTime ? new Date(job.createdTime).toLocaleDateString("fr-CH") : ""}
            </Typography>
            <span className="inline">
              <strong>{job.jobContent.company.name} &nbsp;</strong>
            </span>
            <JobBit>
              {job.jobContent.location ? job.jobContent.location.postalCode + " " + job.jobContent.location.city  + " " + job.jobContent.location.cantonCode : null})
            </JobBit>
            <JobBit>
              {(job.jobContent.employment.workloadPercentageMin && job.jobContent.employment.workloadPercentageMin !== "100")  ? job.jobContent.employment.workloadPercentageMin + "% - " : ""}
              {job.jobContent.employment.workloadPercentageMax + "%"}
            </JobBit>
            <JobBit>
              {job.jobContent.employment.immediately == true ? "Tout de suite" : (job.jobContent.employment.startDate ? job.jobContent.employment.startDate : "À convenir") }
            </JobBit>
            <JobBit>
              {job.jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
            </JobBit>
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

function JobResult({ recomContainer, job, rank, avam, classes, errorContainer }) {
  const { openPositions } = recomContainer.state;

  // rank starts from 1, while result arrays are obviously indexed from 0
  let jobIndex = rank - 1;

  const onPaginationChange = (page) => {
    const { currentPage } = recomContainer.state;
    currentPage[jobIndex] = page;
    recomContainer.setState({
      currentPage,
    }, () =>{recomContainer.secoSearch(recomContainer, avam, jobIndex)});
  };

  const Center = {
    textAlign: 'center',
    display: recomContainer.state.totalCounts[jobIndex] ? 'block' : 'none'
  };

  const noResults = {
    display: recomContainer.state.totalCounts[jobIndex] === 0 ? 'block' : 'none',
    textAlign: 'center'
  };

  return (
    <ExpansionPanel
      onChange={(event, expanded) => {
        expanded ? recomContainer.secoSearch(recomContainer, avam, jobIndex, errorContainer.displayError) : null
      }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Chip label={`Rang: ${rank}`} variant="outlined" />
        <Chip label={job} variant="outlined" />
        <LoadingSeco recomContainer={recomContainer} jobIndex={jobIndex} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List component="nav" className={classes.root}>
          <div style={Center}>
            <Typography>{recomContainer.state.totalCounts[jobIndex]} résultats trouvés</Typography>
            <Pagination
              onChange={onPaginationChange}
              current={recomContainer.state.currentPage[jobIndex]}
              total={recomContainer.state.totalCounts[jobIndex]}
              style={{display: 'inline-block'}} />
          </div>

          <OpenPosition recomContainer={recomContainer} i={jobIndex} />

          <div style={Center}>
            <Pagination
              onChange={onPaginationChange}
              current={recomContainer.state.currentPage[jobIndex]}
              total={recomContainer.state.totalCounts[jobIndex]}
              style={{display: 'inline-block'}} />
          </div>
          <div style={noResults}>
            <Typography>Aucun résultat trouvé pour ce poste spécifique.</Typography>
          </div>
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

function JobDetail({ recomContainer }) {
  const { selectedJob } = recomContainer.state;

  const handleClose = () => {
    recomContainer.setState({
      selectedJob: null,
      applied: false
    });
  };

  const postulation = {
    marginTop: '1rem'
  }

  if (selectedJob != null) {

    const jobContent = selectedJob.jobContent;
    const applyChannel = jobContent.applyChannel;

    const postulerLink = {
      textDecoration: "none",
      color: "white"
    }
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
        <DialogContent>
        <Grid container spacing={16}>
            <Grid item xs={8}>
              <Typography variant="title" paragraph={true}>
                {jobContent.jobDescriptions[0].title}
              </Typography>
              <Typography>
                  <strong>{jobContent.company.name}</strong> | Libre depuis : {selectedJob.createdTime ? new Date(selectedJob.createdTime).toLocaleDateString("fr-CH") : ""}
              </Typography>
              <Typography paragraph={true}>
                <JobBit>
                  {jobContent.location.postalCode} {jobContent.location.city} ({jobContent.location.cantonCode})
                </JobBit>
                <JobBit>
                  {(jobContent.employment.workloadPercentageMin && jobContent.employment.workloadPercentageMin !== "100")  ? jobContent.employment.workloadPercentageMin + "% - " : ""}
                  {jobContent.employment.workloadPercentageMax + "%"}
                </JobBit>
                <JobBit>
                  {jobContent.employment.immediately == true ? "Tout de suite" : (jobContent.employment.startDate ? jobContent.employment.startDate : "À convenir") }
                </JobBit>
                <JobBit>
                  {jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
                </JobBit>
              </Typography>
                <Pre>
                  {jobContent.jobDescriptions[0].description}
                </Pre>
              <Typography variant="subheading">
                Informations sur le poste
              </Typography>
              <Typography>
                <strong>
                Lieu de travail
                </strong>
              </Typography>
              <Typography>
                {jobContent.location.postalCode} {jobContent.location.city} ({jobContent.location.cantonCode})
              </Typography>
              <Typography>
                <strong>
                Entrée en fonction
                </strong>
              </Typography>
              <Typography>
                {jobContent.employment.immediately == true ? "Tout de suite" : (jobContent.employment.startDate ? jobContent.employment.startDate : "À convenir") }
              </Typography>
              <Typography>
                <strong>
                Taux d'occupation
                </strong>
              </Typography>
              <Typography>
                {(jobContent.employment.workloadPercentageMin && jobContent.employment.workloadPercentageMin !== "100")  ? jobContent.employment.workloadPercentageMin + "% - " : ""}
                {jobContent.employment.workloadPercentageMax + "%"}
              </Typography>
              <Typography>
                <strong>
                Durée de l'engagement
                </strong>
              </Typography>
              <Typography>
                {jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
              </Typography>

              {jobContent.languageSkills !== undefined &&  jobContent.languageSkills.length !== 0  ?
                <Typography variant="subheading">
                  <strong>Connaissances linguistiques</strong>
                </Typography>
              : null }

              {
                jobContent.languageSkills.map((language, z) => (
                  <Typography key={z}>{Languages[language.languageIsoCode]}</Typography>
                ))
              }
            </Grid>

            <Grid item xs={4}>
              <Typography>
                <strong>{jobContent.company.name}</strong>
              </Typography>
              <Typography>
                {jobContent.company.street}
              </Typography>
              <Typography paragraph={true}>
                {jobContent.company.postalCode} {jobContent.company.city}
              </Typography>
              <Button
                onClick={ () => {
                  !jobContent.externalUrl ? recomContainer.setState({applied: true}) : {};
                  recomContainer.handleJobApplication(
                    {
                      TYPE: 'JOB_APPLICATION',
                      id: selectedJob.id,
                      occupations: jobContent.occupations,
                      timestamp: Date().toLocaleString()
                    }
                  )}
                }
                color="secondary"
                size="medium"
                variant="contained">
                  <a href={jobContent.externalUrl} target="_blank" style={postulerLink}>Postuler</a>
              </Button>
              <Grow in={recomContainer.state.applied}>
                <Card style={postulation}>
                  <CardContent>
                    <Typography variant="subheading">
                      Formes possibles de postulation
                    </Typography>
                    <Typography>
                      <strong>
                      {applyChannel ? (applyChannel.emailAddress ? "Par courriel" : "") : ""}
                      </strong>
                    </Typography>
                    <Typography>
                      {applyChannel ? (applyChannel.emailAddress ? applyChannel.emailAddress : "") : ""}
                    </Typography>
                    <Typography>
                      <strong>
                      {applyChannel ? (applyChannel.postAddress ? "Par courrier" : "") : ""}
                      </strong>
                    </Typography>
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
                    <Typography>
                      <strong>{jobContent.publicContact ? "Votre personne de contact" : ""}</strong>
                    </Typography>
                    <Typography>
                      {jobContent.publicContact ? (
                        (jobContent.publicContact.salutation == "MS" ? "Madame" : "Monsieur") + " " + jobContent.publicContact.firstName + " " + jobContent.publicContact.lastName
                      ) : ""}
                    </Typography>
                    <Typography>
                      {jobContent.publicContact ? jobContent.publicContact.phone : ""}
                    </Typography>
                    <Typography paragraph={true}>
                      {jobContent.publicContact ? jobContent.publicContact.email : ""}
                    </Typography>
                    <Button
                      color="secondary"
                      size="medium"
                      variant="contained">
                        Générer certificat
                    </Button>
                  </CardContent>
                </Card>
              </Grow>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  } else {
    return null;
  }
}

function RecomRsults({ recomContainer, errorContainer }) {
  const { jobs, importance, vars, loading, avam, bfs } = recomContainer.state;

  if (loading) {
    return (
      <ResContainer>
        <FullTypo variant="title">Vos recommandations</FullTypo>
        <Loader size={100} />
      </ResContainer>
    );
  }

  if (jobs) {
    return (
      <ResContainer>
        <FullTypo variant="title" align="center">Vos recommandations</FullTypo>
        <br />
        <JobDetail recomContainer={recomContainer} />
        {jobs.map((job, i) => (
          <JobResult
            errorContainer={errorContainer}
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
