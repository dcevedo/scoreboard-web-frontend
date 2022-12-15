import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TeamAddButton = ({setShowModal}) => {
  return (
    <Button variant="primary" className="d-flex align-items-center" onClick={() => setShowModal(true)}>
      <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Agregar Equipo
    </Button>
  );
};

export default TeamAddButton;
