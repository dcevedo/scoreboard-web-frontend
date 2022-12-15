import React from "react";
import TeamTableRow from "./TeamTableRow";

const TeamTable = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Deporte</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <TeamTableRow
                key={el._id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
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

export default TeamTable;
