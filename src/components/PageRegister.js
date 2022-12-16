import React, { useState } from 'react';
import { helpHttp } from '../helpers/helpHttp';
import RegisterForm from './RegisterForm';
import MessageError from "./MessageError";
import MessageSuccess from "./MessageSuccess";

function PageRegister() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  let api = helpHttp();
  let url = process.env.REACT_APP_PROD_API_URL || "http://localhost:9000/api/v1";

  const createUser = (data) => {
    let options = {
      body: data,
      headers: {
        "content-type": "application/json"
      }
    }

    api.post(`${url}/users`, options).then(res => {
      if (!res.err) {
        console.log(res);
        setError(null)
        setSuccess(true)
      } else {
        setError(res)
        setSuccess(null);
        console.log(res);
      }
    });

  }

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

          {/* <Message /> */}
    </div>
  );
}

export default PageRegister;