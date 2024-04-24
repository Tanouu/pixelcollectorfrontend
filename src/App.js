import React, {useContext, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import RegisterForm from "./components/RegisterForm";
import AuthContext   from "./AuthContext";
import LoginForm from "./components/LoginForm";
import Marketplace from "./components/MarketPlace";

function App() {

  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this line

  return (
      <AuthContext.Provider value={{authToken, setAuthToken, isLoggedIn, setIsLoggedIn}}> {/* Add isLoggedIn and setIsLoggedIn here */}
    <Router>
      <div className="App">
        <Header key={isLoggedIn ? 'loggedIn' : 'loggedOut'} />
        <Marketplace />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
      </AuthContext.Provider>
  );
}

export default App;