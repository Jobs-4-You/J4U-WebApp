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
  return (
    <div>
      <p>
        {console.log(appContainer.state.verified)}
        {(appContainer.state.verified && appContainer.state.formDone) ? `Welcome, you already have completed the Qualtrics survey 
          and you have verified your account. You can access the job recommendations pannel.` : null}
        {!appContainer.state.verified ? toVerify : null}
        {!appContainer.state.formDone ? toComp : null}
      </p>
    </div>
  )
}

export default AuthLanding;