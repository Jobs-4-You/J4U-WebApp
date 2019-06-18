import React from "react";
import { Chip, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, List, Typography } from "@material-ui/core";
import LoadingSeco from "./LoadingSeco";
import OpenPosition from "./OpenPosition";
import Pagination from "rc-pagination";

const pagStyle = {
    display: "inline-block"
};

function JobResultList({
    recomContainer,
    rank,
    avam,
    classes
}) {
    const { openPositions } = recomContainer.state;

    try {
        // rank starts from 1, while result arrays are obviously indexed from 0
        let jobIndex = rank !== 0 ? rank - 1 : 0;

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
            display: recomContainer.state.totalCounts[jobIndex] && recomContainer.state.openPositions[jobIndex] ? 'block' : 'none'
        };

        const noResults = {
            display: recomContainer.state.totalCounts[jobIndex] === 0 ? "block" : "none",
            textAlign: "center"
        };

        if (recomContainer.state.openPositions) {
            return (
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
                        {
                            /*  Only showing the loader when this component is not wrapped
                                by am expansion panel that contains a loader 
                            */
                            rank == 0 ? 
                                <LoadingSeco recomContainer={recomContainer} jobIndex={jobIndex} />
                            : ""
                        }
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
            );
        } else { return null }
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default JobResultList;