import React from 'react';
import { withRouter } from "react-router";
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

function SignInUp({ history, sign, from }) {

  const handleClose = () => {
    history.push('/')
  };

  const toSignIn = () => {
    history.push('/signin')
  };

  const toSignUp = () => {
    history.push('/signup')
  };

  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => (
        <div>
          <Button color="inherit" onClick={toSignIn}>Sign In</Button>
          <Button color="inherit" onClick={toSignUp}>Sign Up</Button>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={sign === 'in'}
            onClose={handleClose}
          >
            <ModalContent id='zou'>
              <SignIn from={from}/>
            </ModalContent>
          </Modal>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={sign === 'up'}
            onClose={handleClose}
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

export default withRouter(SignInUp);
