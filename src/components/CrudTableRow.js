import React from 'react'

const CrudTableRow = ({el,setDataToEdit,deleteData}) => {
  let {name,constellation,id} = el;
  return (
    <tr>
      <td>{name}</td>
      <td>{constellation}</td>
      <td>
        <button type="button" className="btn btn-info " onClick={() => setDataToEdit(el)}>Editar</button>
        <button type="button" className="btn btn-danger offset-sm-1" onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  )
}

export default CrudTableRow