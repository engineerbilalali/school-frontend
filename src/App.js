import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import StudentsPage from './components/StudentsPage';
import TeachersPage from './components/TeachersPage';
import SubjectsPage from './components/SubjectsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/students">Students</Link></li>
            <li><Link to="/teachers">Teachers</Link></li>
            <li><Link to="/subjects">Subjects</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
