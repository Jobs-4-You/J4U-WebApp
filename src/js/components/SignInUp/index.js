import React from "react";
import { withRouter } from "react-router";
import { Subscribe } from "unstated";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AppContainer from "js/containers/appContainer";
import { ModalContent, GrowTypo, MenuContainer } from "./StyledParts";
import { Link } from "js/components/Divers/Link";
import { Menu } from "@material-ui/core";

function SignInUp({ history, sign, from }) {
  const handleClose = () => {
    history.push("/");
  };

  const toSignIn = () => {
    history.push("/signin");
  };

  const toSignUp = () => {
    history.push("/signup");
  };

  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => (
        <div>
          <MenuContainer>
            <GrowTypo variant="subtitle1" color="inherit" grow={0}>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                {" "}
                SE CONNECTER
              </Link>
            </GrowTypo>

            <GrowTypo variant="subtitle1" color="inherit" grow={0}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                {" "}
                SE INSCRIRE
              </Link>
            </GrowTypo>
          </MenuContainer>

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={sign === "in"}
            onClose={handleClose}
          >
            <ModalContent id="zou">
              <SignIn from={from} />
            </ModalContent>
          </Modal>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={sign === "up"}
            onClose={handleClose}
          >
            <ModalContent id="zou">
              <SignUp />
            </ModalContent>
          </Modal>
        </div>
      )}
    </Subscribe>
  );
}

export default withRouter(SignInUp);
