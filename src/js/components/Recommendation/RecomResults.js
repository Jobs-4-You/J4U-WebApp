import React from "react";
import { ResContainer, Loader, FullTypo } from "./StyledParts";
import PropTypes from "prop-types";
import "rc-pagination/assets/index.css";
import { Certificate } from "crypto";
import JobDetail from "./JobDetail";
import JobResult from "./JobResult";

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

function RecomResults({ recomContainer, errorContainer, appContainer }) {
  const { jobs, importance, vars, loading, avam, bfs } = recomContainer.state;

  if (loading) {
    return (
      <ResContainer>
        <FullTypo variant="title"  align="center">
          Vos recommandations
        </FullTypo>
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

export default RecomResults;
