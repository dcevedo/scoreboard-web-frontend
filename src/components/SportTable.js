import React from "react";
import SportTableRow from "./SportTableRow";

const SportTable = ({ data, setDataToEdit, deleteData }) => {
  return (
    <div className="table-responsive">
      {/* <h3>Tabla de Deportes</h3> */}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            {/* <th>Lista</th> */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <SportTableRow
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

export default SportTable;
