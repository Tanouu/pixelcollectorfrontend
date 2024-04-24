import React, {useContext, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import RegisterForm from "./components/RegisterForm";
import AuthContext   from "./AuthContext";
import LoginForm from "./components/LoginForm";
import Marketplace from "./components/MarketPlace";
import Profile from "./components/Profile";

function App() {

  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
      <AuthContext.Provider value={{authToken, setAuthToken, isLoggedIn, setIsLoggedIn, userId, setUserId}}>
    <Router>
      <div className="App">
        <Header key={isLoggedIn ? 'loggedIn' : 'loggedOut'} />
        <Routes>
          <Route path="/" element={<Marketplace />} /> {/* Marketplace s'affiche sur la page d'accueil */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
      </AuthContext.Provider>
  );
}

export default App;