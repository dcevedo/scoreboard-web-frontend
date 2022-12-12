import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  let api = helpHttp();
  let url = "http://localhost:5000/santos";
  
  useEffect(() => {
    setLoading(true);
    helpHttp().get(url).then((res) => {
      // console.log(res);
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
    data.id = Date.now();

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
    let endpoint =`${url}/${data.id}`;
    api.put(endpoint,options).then(res => {
      console.log(res);
      if(!res.err){
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
        setError(null)
      }else {
        setDb(null);
        setError(res)
      }
    });
  };

  const deleteData = (id) => {
    let isConfirm = window.confirm(
      `¿Estas seguro de eliminar el registro con el id ${id}`
    );
    if (isConfirm) {
      let options = {
        headers: {
            "content-type":"application/json"
          }
      }
      let endpoint =`${url}/${id}`;
      api.del(endpoint,options).then(res => {
        console.log(res);
        if(!res.err){
          let newData = db.filter((el) => el.id !== id);
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
    <div>
      <h2>CRUD APP</h2>
      <CrudForm
        createData={createData}
        updateData={updateData}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
      <hr></hr>
      {loading && <Loader/>}
      {error && <Message/>}
      {db && <CrudTable
        data={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
      />}
    </div>
  );
};

export default CrudApi;
