import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import NoPage from './pages/NoPage';
import './App.css';

function App() {
  const [uname, unameSetter] = useState(null);
  const [categories, categoriesSetter] = useState([]);

  useEffect(() => {
    const url = 'http://localhost:5000/categories';
    const parameters = {
      method: 'GET'
    }
    fetch(url, parameters)
      .then(res => res.json())
      .then(json => categoriesSetter(json.categories))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home uname={uname} categories={categories} categoriesSetter={categoriesSetter} />} />
          <Route path='login' element={<Login uname={uname} unameSetter={unameSetter} />} />
          <Route path='register' element={<Register />} />
          <Route path='logout' element={<Logout uname={uname} unameSetter={unameSetter} />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
