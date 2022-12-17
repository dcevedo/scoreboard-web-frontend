import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import MessageError from "./MessageError";
import MessageSuccess from "./MessageSuccess";
import AuthService from '../services/auth.service';

function PageRegister() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const createUser = async (user) => {
    const res = await AuthService.register(user);
    if (!res.err) {
      setError(null)
      setSuccess(true)
    } else {
      setError(res)
      setSuccess(null);
      console.log(res);
    }
  };

return (
  <div className="container-fluid col-md-6 offset-md-3 p-4 ">
    <RegisterForm
      validated={validated}
      setValidated={setValidated}
      createUser={createUser}
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
      msg={"El usuario se ha registrado correctamente"}
      title={"Registro exitoso"}
    />}
  </div>
);
}

export default PageRegister;