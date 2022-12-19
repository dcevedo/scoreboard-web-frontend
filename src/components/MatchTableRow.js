import React from 'react'

const MatchTableRow = ({el,setDataToEdit,deleteData,authorized}) => {
  let {name,_id,status,date,home_team,away_team,winner,home_score,away_score} = el;
  
  const parseDate = (date) => {
    const newDate = new Date(date);
    // return `${newDate.toISOString().split("T")[0]} ${newDate.toTimeString().split(" ")[0].substring(0, 5)}`;
    return `${newDate.toLocaleString('es-ES',{timeZone: 'America/Bogota', timeStyle: 'short', dateStyle: 'short'})}`
  }

  date = parseDate(date);

  return (
    <tr>
      <td>{name}</td>
      <td>{date}</td>
      <td>{status}</td>
      <td>{home_team.name}</td>
      <td>{away_team.name}</td>
      <td>{winner.name}</td>
      <td>{`${home_score} - ${away_score}`}</td>
      {authorized &&  <td>
        <button type="button" className="btn btn-warning "  style={{marginRight: '5px'}} onClick={() => setDataToEdit(el)}>Editar</button>
        {/* &nbsp; */}
        <button type="button" className="btn btn-danger " onClick={() => deleteData(_id)}>Eliminar</button>
      </td>}
    </tr>
  )
}

export default MatchTableRow