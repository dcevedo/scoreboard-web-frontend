import React from "react";
import MatchTableRow from "./MatchTableRow";

const MatchTable = ({ data, setDataToEdit, deleteData, authorized }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Local</th>
            <th>Visitante</th>
            <th>Ganador</th>
            <th>Marcador</th>
            {authorized && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <MatchTableRow
                key={el._id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
                authorized={authorized}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
