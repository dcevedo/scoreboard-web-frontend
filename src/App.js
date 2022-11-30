import React from "react";
import CrudApp from "./components/CrudApp";
// import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "./index.css"
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="container">
      <h1 className="text-center">Ejercicios con react</h1>
      <CrudApp/>
    </div>
  );
}

export default App;
