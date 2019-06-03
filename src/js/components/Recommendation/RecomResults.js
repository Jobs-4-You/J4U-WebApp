import React from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import { JobBit, Pre, ResContainer, Loader, FullTypo } from "./StyledParts";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grow from "@material-ui/core/Grow";
import { Button } from "@material-ui/core";
import LoadingSeco from "./LoadingSeco";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Languages from "./Languages";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    float: "inline",
    marginRight: "1rem"
  }
});

const pagStyle = {
  display: "inline-block"
};

function OpenPosition({ recomContainer, i }) {
  try {
    const openPos = recomContainer.state.openPositions[i];
    if (openPos) {
      return openPos.map((job, i) => (
        <ListItem button key={i}>
          <ListItemText
            inset
            onClick={_ => recomContainer.setSelectedJob(recomContainer, job)}
          >
            <Typography>
              <strong>
                {job.jobAdvertisement.jobContent.jobDescriptions[0].title}
              </strong>
            </Typography>
            <Typography>
              {job.jobAdvertisement.createdTime
                ? new Date(job.jobAdvertisement.createdTime).toLocaleDateString(
                    "fr-CH"
                  )
                : ""}
            </Typography>
            <span className="inline">
              <strong>{job.jobAdvertisement.jobContent.company.name}</strong>
            </span>
            <JobBit>
              {job.jobAdvertisement.jobContent.location
                ? (job.jobAdvertisement.jobContent.location.postalCode || "") +
                  " " +
                  (job.jobAdvertisement.jobContent.location.city || "") +
                  " " +
                  (job.jobAdvertisement.jobContent.location.cantonCode || "")
                : {}}
            </JobBit>
            <JobBit>
              {job.jobAdvertisement.jobContent.employment
                .workloadPercentageMin &&
              job.jobAdvertisement.jobContent.employment
                .workloadPercentageMin !== "100"
                ? job.jobAdvertisement.jobContent.employment
                    .workloadPercentageMin + "% - "
                : ""}
              {job.jobAdvertisement.jobContent.employment
                .workloadPercentageMax + "%"}
            </JobBit>
            <JobBit>
              {job.jobAdvertisement.jobContent.employment.immediately == true
                ? "Tout de suite"
                : job.jobAdvertisement.jobContent.employment.startDate
                ? job.jobAdvertisement.jobContent.employment.startDate
                : "À convenir"}
            </JobBit>
            <JobBit>
              {job.jobAdvertisement.jobContent.employment.permanent == true
                ? "Indeterminé"
                : "Durée limitée"}
            </JobBit>
            <Typography>
              {job.jobAdvertisement.jobContent.jobDescriptions[0].description
                .length >= 280
                ? job.jobAdvertisement.jobContent.jobDescriptions[0].description.substring(
                    0,
                    279
                  ) + "..."
                : job.jobAdvertisement.jobContent.jobDescriptions[0]
                    .description}
            </Typography>
          </ListItemText>
        </ListItem>
      ));
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

function JobResult({
  recomContainer,
  job,
  rank,
  avam,
  classes,
  errorContainer
}) {
  const { openPositions } = recomContainer.state;

  try {
    // rank starts from 1, while result arrays are obviously indexed from 0
    let jobIndex = rank - 1;

    const onPaginationChange = page => {
      const { currentPage } = recomContainer.state;
      currentPage[jobIndex] = page;
      recomContainer.setState(
        {
          currentPage
        },
        () => {
          recomContainer.secoSearch(recomContainer, avam, jobIndex);
        }
      );
    };

    const Center = {
      textAlign: "center",
      display: recomContainer.state.totalCounts[jobIndex] ? 'block' : 'none',
      //display: "none"
    };

    const noResults = {
      display:
        recomContainer.state.totalCounts[jobIndex] === 0 ? "block" : "none",
      textAlign: "center"
    };

    return (
      <ExpansionPanel
        onChange={(event, expanded) => {
          expanded
            ? recomContainer.secoSearch(
                recomContainer,
                avam,
                jobIndex,
                errorContainer.displayError
              )
            : null;
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Chip label={`Rang: ${rank}`} variant="outlined" />
          <Chip label={job} variant="outlined" />
          <LoadingSeco recomContainer={recomContainer} jobIndex={jobIndex} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List component="nav" className={classes.root}>
            <div style={Center}>
              <Typography>
                {recomContainer.state.totalCounts[jobIndex]} résultats trouvés
              </Typography>
              <Pagination
                onChange={onPaginationChange}
                current={recomContainer.state.currentPage[jobIndex]}
                total={recomContainer.state.totalCounts[jobIndex]}
                style={pagStyle}
              />
            </div>

            <OpenPosition recomContainer={recomContainer} i={jobIndex} />

            <div style={Center}>
              <Pagination
                onChange={onPaginationChange}
                current={recomContainer.state.currentPage[jobIndex]}
                total={recomContainer.state.totalCounts[jobIndex]}
                style={pagStyle}
              />
            </div>
            <div style={noResults}>
              <Typography>
                Aucun résultat trouvé pour ce poste spécifique.
              </Typography>
            </div>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
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
    marginTop: "1rem"
  };

  try {
    if (selectedJob != null) {
      const jobContent = selectedJob.jobAdvertisement.jobContent;
      const applyChannel = jobContent.applyChannel;

      const postulerLink = {
        textDecoration: "none",
        color: "white"
      };
      return (
        <Dialog
          aria-labelledby={selectedJob.jobAdvertisement.title}
          aria-describedby={selectedJob.jobAdvertisement.title}
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
                  <strong>{jobContent.company.name}</strong> | Libre depuis :{" "}
                  {selectedJob.jobAdvertisement.createdTime
                    ? new Date(
                        selectedJob.jobAdvertisement.createdTime
                      ).toLocaleDateString("fr-CH")
                    : ""}
                </Typography>
                <Typography paragraph={true}>
                  <JobBit>
                    {jobContent.location.postalCode || ""}{" "}
                    {jobContent.location.city || ""} (
                    {jobContent.location.cantonCode || ""})
                  </JobBit>
                  <JobBit>
                    {jobContent.employment.workloadPercentageMin &&
                    jobContent.employment.workloadPercentageMin !== "100"
                      ? jobContent.employment.workloadPercentageMin + "% - "
                      : ""}
                    {jobContent.employment.workloadPercentageMax + "%"}
                  </JobBit>
                  <JobBit>
                    {jobContent.employment.immediately == true
                      ? "Tout de suite"
                      : jobContent.employment.startDate
                      ? jobContent.employment.startDate
                      : "À convenir"}
                  </JobBit>
                  <JobBit>
                    {jobContent.employment.permanent == true
                      ? "Indeterminé"
                      : "Durée limitée"}
                  </JobBit>
                </Typography>
                <Pre>{jobContent.jobDescriptions[0].description}</Pre>
                <Typography variant="subheading">
                  Informations sur le poste
                </Typography>
                <Typography>
                  <strong>Lieu de travail</strong>
                </Typography>
                <Typography>
                  {jobContent.location.postalCode} {jobContent.location.city} (
                  {jobContent.location.cantonCode})
                </Typography>
                <Typography>
                  <strong>Entrée en fonction</strong>
                </Typography>
                <Typography>
                  {jobContent.employment.immediately == true
                    ? "Tout de suite"
                    : jobContent.employment.startDate
                    ? jobContent.employment.startDate
                    : "À convenir"}
                </Typography>
                <Typography>
                  <strong>Taux d'occupation</strong>
                </Typography>
                <Typography>
                  {jobContent.employment.workloadPercentageMin &&
                  jobContent.employment.workloadPercentageMin !== "100"
                    ? jobContent.employment.workloadPercentageMin + "% - "
                    : ""}
                  {jobContent.employment.workloadPercentageMax + "%"}
                </Typography>
                <Typography>
                  <strong>Durée de l'engagement</strong>
                </Typography>
                <Typography>
                  {jobContent.employment.permanent == true
                    ? "Indeterminé"
                    : "Durée limitée"}
                </Typography>

                {jobContent.languageSkills !== undefined &&
                jobContent.languageSkills.length !== 0 ? (
                  <Typography variant="subheading">
                    <strong>Connaissances linguistiques</strong>
                  </Typography>
                ) : (
                  ""
                )}

                {jobContent.languageSkills.map((language, z) => (
                  <Typography key={z}>
                    {Languages[language.languageIsoCode]}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={4}>
                <Typography>
                  <strong>{jobContent.company.name}</strong>
                </Typography>
                <Typography>{jobContent.company.street}</Typography>
                <Typography paragraph={true}>
                  {jobContent.company.postalCode} {jobContent.company.city}
                </Typography>
                <Button
                  onClick={() => {
                    recomContainer.setState({ applied: true });
                    recomContainer.handleJobApplication({
                      TYPE: "JOB_APPLICATION",
                      JOBID: selectedJob.jobAdvertisement.id,
                      OCCUPATIONS: jobContent.occupations
                    });
                  }}
                  color="secondary"
                  size="medium"
                  disabled={recomContainer.state.applied}
                  variant="contained"
                >
                  Postuler
                </Button>
                <Grow in={recomContainer.state.applied}>
                  <Card style={postulation}>
                    <CardContent>
                      <Typography variant="subheading" paragraph={true}>
                        Formes possibles de postulation
                      </Typography>

                      <Typography>
                        <strong>
                          {applyChannel
                            ? applyChannel.emailAddress
                              ? "Par courriel"
                              : ""
                            : ""}
                        </strong>
                      </Typography>
                      <Typography>
                        {applyChannel
                          ? applyChannel.emailAddress
                            ? applyChannel.emailAddress
                            : ""
                          : ""}
                      </Typography>
                      <Typography>
                        <strong>
                          {applyChannel
                            ? applyChannel.postAddress
                              ? "Par courrier"
                              : ""
                            : ""}
                        </strong>
                      </Typography>
                      <Typography>
                        {applyChannel && applyChannel.postAddress
                          ? applyChannel.postAddress.name
                            ? applyChannel.postAddress.name
                            : ""
                          : ""}
                      </Typography>
                      <Typography>
                        {applyChannel && applyChannel.postAddress
                          ? applyChannel.postAddress.street &&
                            applyChannel.postAddress.houseNumber
                            ? applyChannel.postAddress.street +
                              " " +
                              applyChannel.postAddress.houseNumber
                            : ""
                          : ""}
                      </Typography>
                      <Typography>
                        {applyChannel && applyChannel.postAddress
                          ? applyChannel.postAddress.postalCode &&
                            applyChannel.postAddress.city
                            ? applyChannel.postAddress.postalCode +
                              " " +
                              applyChannel.postAddress.city
                            : ""
                          : ""}
                      </Typography>
                      <Typography>
                        {applyChannel && applyChannel.postAddress
                          ? applyChannel.postAddress.postOfficeBoxNumber
                            ? applyChannel.postAddress.postOfficeBoxNumber +
                              " " +
                              applyChannel.postAddress.postOfficeBoxPostalCode +
                              " " +
                              applyChannel.postAddress.postOfficeBoxCity
                            : ""
                          : ""}
                      </Typography>
                      <Typography>
                        <strong>
                          {jobContent.publicContact
                            ? "Votre personne de contact"
                            : ""}
                        </strong>
                      </Typography>
                      <Typography>
                        {jobContent.publicContact
                          ? (jobContent.publicContact.salutation == "MS"
                              ? "Madame"
                              : "Monsieur") +
                            " " +
                            jobContent.publicContact.firstName +
                            " " +
                            jobContent.publicContact.lastName
                          : ""}
                      </Typography>
                      <Typography>
                        {jobContent.publicContact
                          ? jobContent.publicContact.phone
                          : ""}
                      </Typography>
                      <Typography paragraph={true}>
                        {jobContent.publicContact
                          ? jobContent.publicContact.email
                          : ""}
                      </Typography>

                      {jobContent.externalUrl ||
                      jobContent.applyChannel.formUrl ? (
                        <Button
                          onClick={() => {
                            recomContainer.handleJobApplication({
                              TYPE: "EXTERNAL_APPLICATION",
                              JOBID: selectedJob.jobAdvertisement.id,
                              OCCUPATIONS: jobContent.occupations,
                              EXTERNALURL:
                                jobContent.externalUrl ||
                                jobContent.applyChannel.formUrl
                            });
                            window.open(
                              jobContent.externalUrl ||
                                jobContent.applyChannel.formUrl,
                              "_blank"
                            );
                          }}
                          color="secondary"
                          size="medium"
                          variant="contained"
                        >
                          Site externe
                        </Button>
                      ) : (
                        ""
                      )}

                      {/*
                      <Button
                        color="secondary"
                        size="medium"
                        variant="contained">
                          Générer certificat
                      </Button>
                      */}
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
  } catch (error) {
    console.log(error);
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

  try {
    if (jobs) {
      return (
        <ResContainer>
          <FullTypo variant="title" align="center">
            Vos recommandations
          </FullTypo>
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default RecomRsults;
