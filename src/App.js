import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"

import PageSport from "./components/PageSport";
import PageHome from "./components/PageHome";
import PageTeam from "./components/PageTeam";

import PageRegister from "./components/PageRegister";
import PageNavbar from "./components/PageNavbar";
import PageLogin from "./components/PageLogin";
import PageLogout from "./components/PageLogout";

function App() {

  const [currentUser, setCurrentUser] = useState(undefined);

  return (
    <div className="container-fluid">
      <PageNavbar
      setCurrentUser={setCurrentUser}
      currentUser={currentUser}
      />
      <Routes>
        <Route exact path="/" element={<PageHome/>} />
        <Route exact path="/sports" element={<PageSport/>} />
        <Route exact path="/teams" element={<PageTeam/>} />
        <Route exact path="/register" element={<PageRegister/>} />
        <Route exact path="/login" element={<PageLogin/>} />
        <Route exact path="/logout" element={<PageLogout/>} />
      </Routes>
    </div>
  );
}

export default App;