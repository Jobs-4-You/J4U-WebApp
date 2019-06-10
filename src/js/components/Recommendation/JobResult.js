import React from "react";
import { Chip, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LoadingSeco from "./LoadingSeco";
import OpenPosition from "./OpenPosition";
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

export default JobResult;