import React from 'react'
import { useState, useEffect } from 'react';
// import { Form,Button } from 'react-bootstrap';

const initialForm = {
  name: "",
  constellation: "",
  id: null,
}

export const CrudForm = ({createData,updateData,dataToEdit,setDataToEdit}) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if(dataToEdit){
      setForm(dataToEdit);
    }else {
      setForm(initialForm);
    }
  },[dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.name || !form.constellation){
      alert('datos incompletos');
      return;
    }
    if(form.id === null){
      createData(form);
    }
    else{
      updateData(form);
    }
    handleReset();
  };
  
  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h3 className='text-center'>{dataToEdit ? "Editar": "Agregar"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre :</label>
          <input className="form-control" type="text" name="name" placeholder='Nombre' onChange={handleChange} value={form.name}/>
        </div>
        <br></br>
        <div className="form-group">
          <label>Constelacion :</label>
          <input className="form-control" type="text" name="constellation" placeholder='Constelacion' onChange={handleChange} value={form.constellation}/>
        </div>
        <br></br>
        <div className='d-grid gap-2'>
          <input className="btn btn-primary" type="submit" value="Enviar"/>
          <input className="btn btn-secondary mb-3" type="reset" value="Limpiar" onClick={handleReset}/>
        </div>
      </form>
    </div>
  )
}

export default CrudForm;