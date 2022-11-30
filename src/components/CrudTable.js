import React from 'react'
import CrudTableRow from './CrudTableRow'

const CrudTable = ({data, setDataToEdit, deleteData}) => {
  return (
    <div className='table-responsive'>
      <h3>Tabla de Datos</h3>
      <table className='table table-striped'>
        <thead className='table-dark'>
          <tr>
            <th>Nombre</th>
            <th>Constelacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ?( 
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>):(
            data.map((el) => 
              <CrudTableRow 
                key={el.id} 
                el={el} 
                setDataToEdit={setDataToEdit} 
                deleteData={deleteData}
              />)
            )}
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable