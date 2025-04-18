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
  const [uname, unameSetter] = useState(localStorage.getItem('uname'));
  const [categories, categoriesSetter] = useState([]);
  const [questions, questionsSetter] = useState([]);

  // get category list
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
        <Route path='/' element={<Layout uname={uname} />}>
          <Route index element={<Home uname={uname} categories={categories} categoriesSetter={categoriesSetter} questions={questions} questionsSetter={questionsSetter} />} />
          <Route path='login' element={<Login uname={uname} unameSetter={unameSetter} />} />
          <Route path='register' element={<Register uname={uname} />} />
          <Route path='logout' element={<Logout uname={uname} unameSetter={unameSetter} />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
