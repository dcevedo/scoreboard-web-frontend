import React from 'react'
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const initialForm = {
  name: "",
  sport: {
    _id: "default",
    name: "",
  },
  _id: null,
}

export const TeamForm = ({ createData, updateData, dataToEdit, setDataToEdit, showModal, setShowModal,sportsList }) => {
  const [form, setForm] = useState(initialForm);

  const editForm = {
    ...form,
    name: "",
  }

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
      setShowModal(true);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit, setShowModal]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };
  const handleSportChange = (e) => {
    console.log(e.target);
    setForm({
      ...form,
      [e.target.name]:{
        _id: e.target.value
      },
    })
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) {
      alert('Es necesario un nombre');
      return;
    }
    if(form.sport._id === "default"){
      alert('debe seleccionar un deporte');
      return;
    }
    if (form._id === null) {
      createData(form);
    }
    else {
      updateData(form);
    }
    handleReset();
    setShowModal(false)
  };

  const handleReset = (e) => {
    setShowModal(false);
    setForm(initialForm);
    setDataToEdit(null);
  };

  const handleClean = (e) => {
    setForm(editForm);
  };

  return (
    <Modal show={showModal}
      onHide={handleReset}
      backdrop="static"
      keyboard={false}
      >
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{dataToEdit ? "Editar" : "Agregar"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Nombre :</label>
            <input className="form-control" type="text" name="name" placeholder='Nombre' onChange={handleChange} value={form.name} />
          </div>
          <div className="form-group">
            <label>Deporte :</label>
            <select className="form-control" name="sport" onChange={handleSportChange} value={form.sport._id}>
            <option value="default" disabled>Selecciona un deporte...</option>
              {sportsList.map((sport) => (
                <option key={sport._id} value={sport._id}>{sport.name}</option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <input className="btn btn-primary" type="submit" value="Enviar" />
          <input className="btn btn-secondary" type="reset" value="Limpiar" onClick={handleClean} />
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default TeamForm;