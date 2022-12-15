
import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import TeamAddButton from "./TeamAddButton";
import TeamForm from "./TeamForm";
import TeamTable from "./TeamTable";
import Loader from "./Loader";
import Message from "./Message";

const PageTeam = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sportsList, setSportsList] = useState([]);

  let api = helpHttp();
  let url = process.env.REACT_APP_PROD_API_URL || "http://localhost:9000/api/v1";
  

  useEffect(() => {
    helpHttp().get(`${url}/sports`).then((res) => {
      if(!res.err){
        setSportsList(res);
      }else {
        setSportsList(null);
        setError(res)
      }
    });
  }, [url])
  

  useEffect(() => {
    setLoading(true);
    helpHttp().get(`${url}/teams`).then((res) => {
      if(!res.err){
        setDb(res);
        setError(null)
      }else {
        setDb(null);
        setError(res)
      }
      setLoading(false);
    });
  }, [url]);

  
  const createData = (data) => {
    delete data._id;
    let options = {
      body: data,
      headers: {
          "content-type":"application/json"
        }
    }

    api.post(`${url}/teams`,options).then(res => {
      console.log(res);
      if(!res.err){
      setDb([...db, res]);
      setError(null)
      }else {
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
          "content-type":"application/json"
        }
    }
    let endpoint =`${url}/teams/${data._id}`;
    api.put(endpoint,options).then(res => {
      if(!res.err){
        let newData = db.map((el) => (el._id === data._id ? res : el));
        setDb(newData);
        setError(null)
      }else {
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
            "content-type":"application/json"
          }
      }
      let endpoint =`${url}/teams/${_id}`;
      api.del(endpoint,options).then(res => {
        console.log(res);
        if(!res.err){
          let newData = db.filter((el) => el._id !== _id);
          setDb(newData);
          setError(null)
        }else {
          setDb(null);
          setError(res)
        }
      })
    }
  };

  return (
    <div className="col-md-10 offset-md-1">
      <h2 className="text-center">Equipos</h2>
      <TeamAddButton
        setShowModal={setShowModal}
      />
      <TeamForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        showModal={showModal}
        setShowModal={setShowModal}
        sportsList={sportsList}
        />
      <hr></hr>
      {loading && <Loader/>}
      {error && <Message/>}
      {db && <TeamTable
        data={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
      />}
    </div>
  );
};

export default PageTeam;
