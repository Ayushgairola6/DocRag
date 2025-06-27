import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Interface from './pages/Interface'
import LandingPage from './pages/LandingPage';
import About from './pages/About'
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import "./App.css"


const App = () => {

 const [currTab,setCurrTab] = useState("Home");

  return (<>
    <Router >
      <Navbar currTab={currTab} setCurrTab={setCurrTab} />
      {/* <Sidebar/> */}
      <Routes >
        <Route element={<LandingPage />} path='/'></Route>
        <Route element={<Interface />} path='/Interface' >
        </Route>
        <Route element={ <About/>} path="/About"/>

      </Routes>
      <Footer></Footer>
    </Router>
  </>)
}

export default App;