import React from 'react'

const SportTableRow = ({el,setDataToEdit,deleteData}) => {
  let {name,_id} = el;
  return (
    <tr>
      <td>{name}</td>
      <td>
        <button type="button" className="btn btn-warning "  style={{marginRight: '5px'}} onClick={() => setDataToEdit(el)}>Editar</button>
        {/* &nbsp; */}
        <button type="button" className="btn btn-danger " onClick={() => deleteData(_id)}>Eliminar</button>
      </td>
    </tr>
  )
}

export default SportTableRow