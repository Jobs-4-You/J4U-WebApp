import React from "react";
import { Subscribe } from "unstated";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";
import AppContainer from "js/containers/appContainer";
import SignContainer from "js/containers/SignContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import UpdateInfos from "./UpdateInfos";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class UpdateDialog extends React.Component {
  state = {
    open: false,
    openPwd: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpenPwd = () => {
    this.setState({ openPwd: true });
    this.props.passwordReset();
  };

  handleClosePwd = () => {
    this.setState({ openPwd: false });
  };

  const;

  render() {
    return (
      <Paper
        align="center"
        elevation={0}
        square={true}
        style={{ padding: "1rem 0" }}
      >
        <Typography paragraph={true}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}>
            Modifier les informations
          </Button>
        </Typography>
        <Typography paragraph={true}>
          <Button variant="contained" color="primary" onClick={this.handleOpenPwd}>
            Changer le mot de passe
          </Button>
        </Typography>
        <Typography paragraph={true}>
          <Button href="#/" color="primary" variant="contained">
            Page d'accueil
          </Button>
        </Typography>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <UpdateInfos />
        </Dialog>
        <Dialog
          open={this.state.openPwd}
          onClose={this.handleClosePwd}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="alert-dialog-slide-title">
          Changement de mot de passe
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Un mail a été envoyé pour ré-initialiser cotre mot de passe
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePwd} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

function Account() {
  return (
    <Subscribe to={[AppContainer, SignContainer, ErrorContainer]}>
      {(appContainer, signContainer, errorContainer) => {
        return (
          <List>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText
                primary="Prénom"
                secondary={appContainer.state.firstName}
              />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText
                primary="Nom"
                secondary={appContainer.state.lastName}
              />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText
                primary="Date de naissance"
                secondary={appContainer.state.birthDate}
              />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText
                primary="Email"
                secondary={appContainer.state.email}
              />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText
                primary="Numéro de téléphone"
                secondary={appContainer.state.phone}
              />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText
                primary="Plasta ID"
                secondary={appContainer.state.plastaId}
              />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <UpdateDialog passwordReset={() => signContainer.resetPassword(appContainer.state.email, errorContainer.displayError)}/>
          </List>
        );
      }}
    </Subscribe>
  );
}

export default Account;
