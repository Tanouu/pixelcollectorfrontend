import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NFTList from './components/NFTList';
import SearchBar from './components/SearchBar';
import NFTDetail from './components/NFTDetail';
import RegisterForm from "./components/RegisterForm";
import AuthContext   from "./AuthContext";
import LoginForm from "./components/LoginForm";
import Marketplace from "./components/MarketPlace";

function App() {

  const [authToken, setAuthToken] = useState(null);


  return (
      <AuthContext.Provider value={{authToken, setAuthToken}}>
    <Router>
      <div className="App">
        <Header />
        <SearchBar />
        <Marketplace />
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<><NFTList /><NFTDetail /></>} />
            <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
      </AuthContext.Provider>
  );
}

export default App;