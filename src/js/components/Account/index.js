import React from 'react';
import { Subscribe } from 'unstated'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import AppContainer from 'js/containers/appContainer';


function Account() {
  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => {
        return (
          <List>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText primary="Prénom" secondary={appContainer.state.firstName} />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText primary="Nom" secondary={appContainer.state.lastName} />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText primary="Date de naissance" secondary={appContainer.state.birthDate} />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText primary="Email" secondary={appContainer.state.email} />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText primary="Numéro de téléphone" secondary={appContainer.state.phone} />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
            <ListItem>
              <Avatar>
                <FaceIcon />
              </Avatar>
              <ListItemText primary="Plasta ID" secondary={appContainer.state.plastaId} />
            </ListItem>
            <li>
              <Divider variant="inset" />
            </li>
          </List>
        )
      }}
    </Subscribe>
  );
}

export default Account;