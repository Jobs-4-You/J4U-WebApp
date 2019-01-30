import React from 'react';
import { Subscribe } from 'unstated';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Button'
import SignIn from './SignIn';
import SignUp from './SignUp';
import AppContainer from 'js/containers/appContainer';

const ModalContent = styled(Paper)`
  position: absolute;
  top: 1%;
  margin-left: -200px !important;
  left: 50%;
  :hover {
    background-color: rgba(0,0,0,0) !important;
  }
`;

class SignInUp extends React.Component {
  state = {
    openSignIn: false,
    openSignUp: false,
  };

  handleOpenSignIn = () => {
    this.setState({ openSignIn: true });
  };

  handleOpenSignUp = () => {
    this.setState({ openSignUp: true });
  };

  handleCloseSignIn = () => {
    this.setState({ openSignIn: false });
  };

  handleCloseSignUp = () => {
    this.setState({ openSignUp: false });
  };

  render() {
    return (
      <Subscribe to={[AppContainer]}>
        {appContainer => (
          <div>
            <Button color="inherit" onClick={this.handleOpenSignIn}>Sign In</Button>
            <Button color="inherit" onClick={this.handleOpenSignUp}>Sign Up</Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.openSignIn}
              onClose={this.handleCloseSignIn}
            >
              <ModalContent id='zou'>
                <SignIn />
              </ModalContent>
            </Modal>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.openSignUp}
              onClose={this.handleCloseSignUp}
            >
              <ModalContent id='zou'>
                <SignUp />
              </ModalContent>
            </Modal>
          </div>
        )}
      </Subscribe>
    )
  }
}

export default SignInUp;
