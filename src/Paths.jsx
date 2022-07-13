import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Song } from './pages/Song';
import NotFound from './components/NotFound/NotFound';
import SongDetail from './components/SongDetail/SongDetail';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Song />} />
        <Route path="/song" element={<Song />} />
        <Route path="/song/:id" element={<SongDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default Paths;
