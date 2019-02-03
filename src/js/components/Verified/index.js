import React from 'react';
import { Redirect } from 'react-router-dom';

function Verified(props) {
  return (
    <div>
      <p>
        Votre compte a été vérifié avec succès !
      </p>
      <Redirect to={{ pathname: '/signin' }} />;
    </div>
  )
}

export default Verified;