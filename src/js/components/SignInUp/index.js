import React from 'react';
import { withRouter } from "react-router";
import { Subscribe } from 'unstated';
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AppContainer from 'js/containers/appContainer';
import { ModalContent } from './StyledParts';


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
              <SignIn from={from} />
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
