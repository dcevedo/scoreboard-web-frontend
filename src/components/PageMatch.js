
import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import MatchAddButton from "./MatchAddButton";
import MatchForm from "./MatchForm";
import MatchTable from "./MatchTable";
import Loader from "./Loader";
import MessageError from "./MessageError";

const PageTeam = ({ currentUser, isHome }) => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [teamsList, setTeamsList] = useState([]);
  const [authorized, setAuthorized] = useState(true);

  let api = helpHttp();
  let url = process.env.REACT_APP_PROD_API_URL || "http://localhost:9000/api/v1";


  useEffect(() => {
    if (isHome === true || !currentUser) {
      setAuthorized(false);
    } else if(currentUser) {
      setAuthorized(true);
    }
  }, [authorized, setAuthorized, isHome,currentUser]);

  useEffect(() => {
    helpHttp().get(`${url}/teams`).then((res) => {
      if (!res.err) {
        setTeamsList(res);
      } else if(res.length === 0) {
        setError({error :
          {message: "No hay equipos registrados"}
      })
      }
      else {
        setTeamsList(null);
        setError(res)
      }
    });
  }, [url])


  useEffect(() => {
    setLoading(true);
    helpHttp().get(`${url}/matches`).then((res) => {
      if (!res.err) {
        setDb(res);
        setError(null)
      } else {
        setDb(null);
        setError(res)
      }
      setLoading(false);
    });
  }, [url]);

  const createData = (data) => {
    delete data._id;
    data.user["_id"] = currentUser._id;
    let options = {
      body: data,
      headers: {
        "content-type": "application/json"
      }
    }

    api.post(`${url}/matches`, options).then(res => {
      console.log(res);
      if (!res.err) {
        setDb([...db, res]);
        setError(null)
        console.log(res);
      } else {
        setDb(null);
        setError(res)
        console.log(res);
      }
    });
  };

  const updateData = (data) => {
    let options = {
      body: data,
      headers: {
        "content-type": "application/json"
      }
    }
    let endpoint = `${url}/matches/${data._id}`;
    api.put(endpoint, options).then(res => {
      if (!res.err) {
        let newData = db.map((el) => (el._id === data._id ? res : el));
        setDb(newData);
        setError(null)
      } else {
        setDb(null);
        setError(res)
      }
    });
  };

  const deleteData = (_id) => {
    let isConfirm = window.confirm(
      `¿Estas seguro de eliminar el registro con el id ${_id}`
    );
    if (isConfirm) {
      let options = {
        headers: {
          "content-type": "application/json"
        }
      }
      let endpoint = `${url}/matches/${_id}`;
      api.del(endpoint, options).then(res => {
        console.log(res);
        if (!res.err) {
          let newData = db.filter((el) => el._id !== _id);
          setDb(newData);
          setError(null)
        } else {
          setDb(null);
          setError(res)
        }
      })
    }
  };

  return (
    <div className="col-md-10 offset-md-1">
      <h2 className="text-center">Eventos</h2>
      {authorized && <MatchAddButton
        setShowModal={setShowModal}
      />}
      {authorized &&<MatchForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        showModal={showModal}
        setShowModal={setShowModal}
        teamsList={teamsList}
      />}
      <hr></hr>
      {loading && <Loader />}
      {error && <MessageError
        msg={error.message}
        title={error.statusText}
      />}
      {db && <MatchTable
        data={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
        authorized={authorized}
      />}
    </div>
  );
};

export default PageTeam;
