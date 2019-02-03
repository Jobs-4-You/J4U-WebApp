import React from 'react';

function AuthLanding({ appContainer }) {
  const toVerify = (
    <p>
      You need to verify your account.
    </p>

  );
  const toComp = (
    <p>
      You need to complete the Qualtrics form by visiting: <br />
      <a href={`https://fpse.qualtrics.com/jfe/form/SV_3VjBHgE8Lu9uICN?id=${appContainer.state.surveyId}`}>Qualtrics Survey</a>
    </p>
  );
  const allRight = (
    <p>
      Welcome, you already have completed the Qualtrics survey
      and you have verified your account. You can access the job recommendations pannel.
    </p>
  );
  let text;
  if (appContainer.state.verified && appContainer.state.formDone) {
    text = allRight;
  } else if (!appContainer.state.verified) {
    text = toVerify;
  } else {
    text = toComp
  }

  return (
    <div>
      {text}
    </div>
  )
}

export default AuthLanding;