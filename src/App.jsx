import { useState } from 'react'
import Header from './pages/Header'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Country from './pages/Country';
import Elements from './pages/Elements';
import Galaxy from './pages/Galaxy'
import Constellations from './pages/Constellations';
import Wonders from './pages/Wonders';
import Home from './pages/Home';

function App() {

  return (
    <>

      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/country' element={<Country/>}></Route>
        <Route path='/elements' element={<Elements/>}></Route>
        <Route path='/galaxy' element={<Galaxy/>}></Route>
        <Route path='/constellations' element={<Constellations/>}></Route>
        <Route path='/wonders' element={<Wonders/>}></Route>
      </Routes>
    </>
  )
}

export default App
