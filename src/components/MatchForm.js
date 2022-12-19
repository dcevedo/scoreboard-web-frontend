import React from 'react'
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const initialForm = {
  name: "",
  date: "",
  home_team: {
    _id: "default",
    name: "",
  },
  away_team: {
    _id: "default",
    name: "",
  },
  winner: {
    _id: "default",
    name: "",
  },
  user: {
    _id: null,
  },
  home_score: 0,
  away_score: 0,
  status: "scheduled",
  _id: null,
}

export const MatchForm = ({ createData, updateData, dataToEdit, setDataToEdit, showModal, setShowModal, teamsList }) => {
  const [form, setForm] = useState(initialForm);

  const editForm = {
    ...form,
    name: "",
    home_score: 0,
    away_score: 0,
    status: "scheduled",
  }

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
      setShowModal(true);
      console.log(dataToEdit);
      dataToEdit.date = dateParser(dataToEdit.date);
      console.log(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit, setShowModal]);


  const dateParser = (oldDate) => {
    const date = new Date(oldDate);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // pad with leading zero
    const day = `0${date.getDate()}`.slice(-2); // pad with leading zero
    const hours = `0${date.getHours()}`.slice(-2); // pad with leading zero
    const minutes = `0${date.getMinutes()}`.slice(-2); // pad with leading zero
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
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
      [e.target.name]: {
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
    // if(form.sport._id === "default"){
    //   alert('debe seleccionar un deporte');
    //   return;
    // }
    console.log(form);
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
          <div className="form-group mb-3">
            <label>Nombre :</label>
            <input className="form-control" type="text" name="name" placeholder='Nombre' onChange={handleChange} value={form.name} />
          </div>
          <div className="form-group mb-3">
            <label>Fecha :</label>
            <input className="form-control" type="datetime-local" name="date" placeholder='Fecha' onChange={handleChange} value={form.date} />
          </div>
          <div className="form-group mb-3">
            <label>Equipo Local:</label>
            <select className="form-control" name="home_team" onChange={handleSportChange} value={form.home_team._id}>
              <option value="default" disabled>Selecciona un equipo...</option>
              {teamsList.map((team) => (
                <option key={team._id} value={team._id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Equipo Visitante:</label>
            <select className="form-control" name="away_team" onChange={handleSportChange} value={form.away_team._id}>
              <option value="default" disabled>Selecciona un equipo...</option>
              {teamsList.map((team) => (
                <option key={team._id} value={team._id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Ganador(opcional):</label>
            <select className="form-control" name="winner" onChange={handleSportChange} value={form.winner._id}>
              <option value="default" disabled>Selecciona un equipo...</option>
              {teamsList.map((team) => (
                <option key={team._id} value={team._id}>{team.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label>Puntaje Local:</label>
            <input className="form-control" type="number" name="home_score" placeholder='Puntaje Local' onChange={handleChange} value={form.home_score} />
          </div>
          <div className="form-group mb-3">
            <label>Puntaje Visitante:</label>
            <input className="form-control" type="number" name="away_score" placeholder='Puntaje Visitante' onChange={handleChange} value={form.away_score} />
          </div>
          <div className="form-group mb-3">
            <label>Estado:</label>
            <select className="form-control" name="status" onChange={handleChange} value={form.status}>
              <option value="scheduled">Programado</option>
              <option value="in progress">En progreso</option>
              <option value="completed">Finalizado</option>
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

export default MatchForm;