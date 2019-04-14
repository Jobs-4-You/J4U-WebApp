import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Slide from "@material-ui/core/Slide";
import history from "js/router";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function D({ open, closeDialog, value, valueChange, reset, displayError}) {
  const handleClose = async () => {
    await reset(value, displayError);
    closeDialog();
    history.push("/signin");
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted>
      <DialogTitle>Réinitialisation du mot de passe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Un email avec un lien permettant la réinitialisation de votre mot de
          passe va être envoyé.
        </DialogContentText>
      </DialogContent>
      <FormControl margin="normal" required error={false} style={{padding: '20px'}}>
        <InputLabel htmlFor="email" style={{padding: '20px'}}>Adresse Électronique</InputLabel>
        <Input
          id="email-forgotten"
          name="email"
          autoComplete="email"
          autoFocus
          value={value}
          onChange={valueChange}
        />
      </FormControl>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Réinitialiser
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default D;
