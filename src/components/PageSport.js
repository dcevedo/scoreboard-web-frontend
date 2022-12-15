
import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import SportAddButton from "./SportAddButton";
import SportForm from "./SportForm";
import SportTable from "./SportTable";
import Loader from "./Loader";
import Message from "./Message";

const PageSport = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  let api = helpHttp();
  let url = process.env.REACT_APP_PROD_API_URL || "http://localhost:9000/api/v1/sports";
  
  useEffect(() => {
    setLoading(true);
    helpHttp().get(url).then((res) => {
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
    let options = {
      body: data,
      headers: {
          "content-type":"application/json"
        }
    }

    api.post(url,options).then(res => {
      console.log(res);
      if(!res.err){
      setDb([...db, res]);
      setError(null)
      }else {
        setDb(null);
        setError(res)
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
    let endpoint =`${url}/${data._id}`;
    api.put(endpoint,options).then(res => {
      console.log(res);
      if(!res.err){
        let newData = db.map((el) => (el._id === data._id ? data : el));
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
      let endpoint =`${url}/${_id}`;
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
      <h2 className="text-center">Deportes</h2>
      <SportAddButton
        setShowModal={setShowModal}
      />
      <SportForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
        showModal={showModal}
        setShowModal={setShowModal}
        />
      <hr></hr>
      {loading && <Loader/>}
      {error && <Message/>}
      {db && <SportTable
        data={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
      />}
    </div>
  );
};

export default PageSport;
