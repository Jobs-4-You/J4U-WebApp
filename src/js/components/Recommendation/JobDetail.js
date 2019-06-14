import React from "react";
import { Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, Grid, Grow, Typography } from "@material-ui/core";
import Attestation from "js/components/Attestation";
import { JobBit, Pre } from "./StyledParts";
import Languages from "./Languages";

class JobDetail extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

render(){
  const { recomContainer, appContainer } = this.props;

    const { selectedJob } = recomContainer.state;

    const scrollToRef = (ref) => { document.body.scrollTo(0, ref.current.offsetTop); } 
    
    const handleClose = () => {
      recomContainer.setState({
        selectedJob: null,
        applied: false,
        certificatePreview: false
      });
    };
  
    const postulation = {
      marginTop: "1rem"
    };

    const buttonCertificate = {
      display: appContainer.state.group.indexOf("C0") !== -1 ? "none" : "block"
    }
  
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
            scroll="body" 
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
                      {(jobContent.location.postalCode || "")} {(jobContent.location.city || "")} {(jobContent.location.cantonCode || "")}
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
  
                  <div ref={this.myRef} />

                  <Attestation appContainer={appContainer} jobContent={jobContent} recomContainer={recomContainer}></Attestation>
  
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
                        
                        <Typography paragraph={true}>
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
                        </Typography>
                        <Typography paragraph={true}>
                          {
                              <Button
                                color="secondary"
                                size="medium"
                                variant="contained"
                                style={buttonCertificate}
                                disabled={recomContainer.state.certificatePreview}
                                onClick={() => {
                                  recomContainer.setState({ certificatePreview: true });
                                  scrollToRef(this.myRef);
                                }}>
                                  Générer certificat
                              </Button>
                          }
                        </Typography>
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

}
//function JobDetail({ recomContainer, appContainer }) {

export default JobDetail;