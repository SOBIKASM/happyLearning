import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import './App.css';

import Home from './pages/Home';
import Country from './pages/Country';
import Elements from './pages/Elements';
import Galaxy from './pages/Galaxy';
import Constellations from './pages/Constellations';
import Wonders from './pages/Wonders';
import DetailPage from './pages/DetailPage'; // <-- import universal detail page

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country' element={<Country />} />
        <Route path='/elements' element={<Elements />} />
        <Route path='/galaxy' element={<Galaxy />} />
        <Route path='/constellations' element={<Constellations />} />
        <Route path='/wonders' element={<Wonders />} />

        {/* Universal detail page route */}
        <Route path='/detail/:type/:name' element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
