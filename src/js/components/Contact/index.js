import React from 'react';
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from '@material-ui/core/Button';

const Container = styled("div")`
  margin: auto;
  max-width: 600px;
  padding: 40px 20px;
  text-align: left;
`;

function Contact() {
    return (
        <Container>
            <Typography paragraph={true}>
                Vous pouvez à tout moment poser vos questions et demander des précisions complémentaires à l’adresse suivante : <a href="mailto:j4u@unil.ch">j4u@unil.ch</a>. Notre équipe se fera un plaisir de répondre.
            </Typography>                
            
            <Typography paragraph={true}>
                <Button href="#/" color="primary" variant="contained">
                Page d'accueil
                </Button>
            </Typography>

        </Container>
    );
}

export default Contact;