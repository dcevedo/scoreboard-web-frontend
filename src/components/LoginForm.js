import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  name: "",
  email: "",
  password: "",
}
const LoginForm = ({loginUser, validated, setValidated,error, setError,success,setSuccess}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if(error?.message === "invalid password"){
      setForm(initialForm);
      setValidated(false);
    }
    else if(error?.message === "email not found"){
      setForm(initialForm);
      setValidated(false);
    }
    setError(null)
  }, [error, setError,setValidated]);

  useEffect(() => {
    if(success){
      setForm(initialForm);
      setValidated(false);
      navigate('/', { replace: true });
      window.location.reload(true);
    }
    setSuccess(null)
  },[success,setSuccess,setValidated,navigate])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = (event) => {
    // event.stopPropagation();
    event.preventDefault();

    const formTarget = event.currentTarget;
    if (formTarget.checkValidity() === false) {
    }
    else if (formTarget.checkValidity() === true) {
      loginUser(form);
    }
    setValidated(true);
  };

  return (
    <Card className="my-3 px-4">
      <Card.Body>
        <Card.Title>
          <h3 className='text-center'>Inicia Sesion</h3>
        </Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name='email'
              value={form.email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              placeholder="Escriba su correo electronico"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Escribe un email valido.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId="validationCustom03">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              name='password'
              value={form.password}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder="Escriba Una contraseña"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              La contraseña tiene al menos 8 caracteres, una mayuscula y un numero.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="btn-success btn-lg font-weight-bold col-md-6 offset-md-3 ">Ingresar</Button>
        </Form>
      </Card.Body>
    </Card>

  )
}

export default LoginForm