import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import { JobBit } from "./StyledParts";

function OpenPosition({ recomContainer, i }) {
  try {
    const openPos = recomContainer.state.openPositions[i];
    if (openPos) {
      try {
        return openPos.map(
          (job, i) =>
          <ListItem button key={i}>
            <ListItemText inset onClick={_ => recomContainer.setSelectedJob(recomContainer, job)}>
                <Typography>
                  <strong>{job.jobAdvertisement.jobContent.jobDescriptions[0].title.toString()}</strong>
                </Typography>
                <Typography>
                  {job.jobAdvertisement.createdTime ? new Date(job.jobAdvertisement.createdTime).toLocaleDateString("fr-CH") : ""}
                </Typography>
                <span className="inline">
                  <strong>{job.jobAdvertisement.jobContent.company.name}</strong>
                </span>
                <JobBit>
                  {job.jobAdvertisement.jobContent.location ? (job.jobAdvertisement.jobContent.location.postalCode || "") + " " + (job.jobAdvertisement.jobContent.location.city  || "") + " " + (job.jobAdvertisement.jobContent.location.cantonCode || "") : ""}
                </JobBit>
                <JobBit>
                  {(job.jobAdvertisement.jobContent.employment.workloadPercentageMin && job.jobAdvertisement.jobContent.employment.workloadPercentageMin !== "100")  ? job.jobAdvertisement.jobContent.employment.workloadPercentageMin.toString() + "% - " : ""}
                  {job.jobAdvertisement.jobContent.employment.workloadPercentageMax + "%"}
                </JobBit>
                <JobBit>
                  {job.jobAdvertisement.jobContent.employment.immediately == true ? "Tout de suite" : (job.jobAdvertisement.jobContent.employment.startDate ? job.jobAdvertisement.jobContent.employment.startDate.toString() : "À convenir") }
                </JobBit>
                <JobBit>
                  {job.jobAdvertisement.jobContent.employment.permanent == true ? "Indeterminé" : "Durée limitée"}
                </JobBit>
                <Typography>
                  {job.jobAdvertisement.jobContent.jobDescriptions[0].description.length >= 280 ? job.jobAdvertisement.jobContent.jobDescriptions[0].description.substring(0, 279) + "..." : job.jobAdvertisement.jobContent.jobDescriptions[0].description.toString()}
                </Typography>
              </ListItemText>
          </ListItem>
        );
        } catch (error) {
          console.log(error);
          return null;
        }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

  export default OpenPosition;