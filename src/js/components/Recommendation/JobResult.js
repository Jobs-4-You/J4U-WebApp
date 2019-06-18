import React from "react";
import { Chip, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LoadingSeco from "./LoadingSeco";
import OpenPosition from "./OpenPosition";
import JobResultList from "./JobResultList";
import Pagination from "rc-pagination";

const pagStyle = {
    display: "inline-block"
};

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
            textAlign: 'center',
            display: recomContainer.state.totalCounts[jobIndex] ? 'block' : 'none'
        };

        const noResults = {
            display: recomContainer.state.totalCounts[jobIndex] === 0 ? "block" : "none",
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
                    <JobResultList recomContainer={recomContainer} rank={rank} avam={avam} classes={classes} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default JobResult;