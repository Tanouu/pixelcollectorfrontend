import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NFTList from './components/NFTList';
import SearchBar from './components/SearchBar';
import NFTDetail from './components/NFTDetail';
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <SearchBar />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<><NFTList /><NFTDetail /></>} />
            <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;