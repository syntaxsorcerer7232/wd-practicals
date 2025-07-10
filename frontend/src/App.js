import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';

const MusicApp = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentTrack, setCurrentTrack] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-screen bg-gray-900 text-white overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
        />
        
        {/* Main Content */}
        <MainContent 
          activeSection={activeSection}
          setCurrentTrack={setCurrentTrack}
          setIsPlaying={setIsPlaying}
        />
      </div>
      
      {/* Player */}
      <Player 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MusicApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;