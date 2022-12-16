import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from 'react-bootstrap';

const initialForm = {
  name: "",
  email: "",
  password: "",
}
const RegisterForm = ({ createUser, validated, setValidated,error, setError,success,setSuccess}) => {

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if(error?.message === "User with that email already exists"){
      setForm(initialForm);
      setValidated(false);
    }
    setError(null)
  }, [error, setError,setValidated]);

  useEffect(() => {
    if(success){
      setForm(initialForm);
      setValidated(false);
    }
    setSuccess(null)
  },[success,setSuccess,setValidated])

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
      createUser(form);
    }
    setValidated(true);
  };

  return (
    <Card className="my-3 px-4">
      <Card.Body>
        <Card.Title>
          <h3 className='text-center'>Crea tu cuenta</h3>
        </Card.Title>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId="validationCustom01">
            <Form.Label>Nombre </Form.Label>
            <Form.Control
              required
              type="text"
              name='name'
              value={form.name}
              minLength="4"
              maxLength="50"
              pattern="^[A-Za-z\s]*$"
              placeholder="Escriba su nombre"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Escribe un nombre valido, sin numeros.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
          </Form.Group>
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
              Escriba una contraseña con al menos 8 caracteres, una mayuscula y un numero.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Bien!</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="btn-success btn-lg font-weight-bold col-md-6 offset-md-3 ">Registrarme</Button>
        </Form>
      </Card.Body>
    </Card>

  )
}

export default RegisterForm