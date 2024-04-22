import React from 'react';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import App from './App';
import SecondPage from './SecondPage';
import TicTacToe from './TicTacToe';

const RouterComponent = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/app" element={<App />} />
            <Route path="/second-page" element={<SecondPage />} />
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
        </Routes>
    </Router>
    
  );
};

export default RouterComponent;