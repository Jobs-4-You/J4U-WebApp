import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import history from 'js/router';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function D({ open, closeDialog }) {

  const handleClose = () => {
    closeDialog()
    history.push('/signin')
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>
        Compte créé
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Votre compte a bien été créé. Veuillez vous identifier pour continuer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          SE CONNECTER
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default D