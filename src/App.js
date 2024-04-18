import React from 'react';
import './App.css';
import Header from './components/Header';
import NFTList from './components/NFTList';
import SearchBar from './components/SearchBar';
import NFTDetail from './components/NFTDetail';

function App() {
  return (
      <div className="App">
        <Header />
        <SearchBar />
        <NFTList />
        <NFTDetail />
      </div>
  );
}

export default App;
