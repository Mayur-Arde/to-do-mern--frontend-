import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './compoents/TodoList.js';

function App() {
  return (
  <>
    <div className="section-center">
      <Router>
        <Routes>
          <Route path="/" element={<TodoList />} />
        </Routes>
      </Router>
    </div>
  </>
  );
}

export default App;
