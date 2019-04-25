import React from "react";
import { Subscribe } from "unstated";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";
import AppContainer from "js/containers/appContainer";
import UpdateContainer from "js/containers/UpdateContainer";
import UpdateInfos from "./UpdateInfos";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class UpdateDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
        Modifer les informations
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
            <UpdateInfos />
        </Dialog>
      </div>
    );
  }
}

function Account() {
  return (
    <Subscribe to={[AppContainer, UpdateContainer]}>
      {(appContainer, updateContainer) => {
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
            <UpdateDialog />
          </List>
        );
      }}
    </Subscribe>
  );
}

export default Account;
