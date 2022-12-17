import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import LoginForm from './LoginForm';
import MessageError from "./MessageError";
import MessageSuccess from "./MessageSuccess";

function PageLogin() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const loginUser = async (data) => {
    const res = await AuthService.login(data);
    if (!res.err) {
      setError(null)
      setSuccess(true)
    } else {
      setError(res)
      setSuccess(null);
    }
  };

  return (
    <div className="container-fluid col-md-6 offset-md-3 p-4 ">
      <LoginForm
        validated={validated}
        setValidated={setValidated}
        loginUser={loginUser}
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
      />
      {error && <MessageError
        msg={error.message}
        title={error.statusText}
      />}
      {success && <MessageSuccess
        msg={"El usuario se ha logueado correctamente"}
        title={"Login exitoso"}
      />}

      {/* <Message /> */}
    </div>
  );
}

export default PageLogin;