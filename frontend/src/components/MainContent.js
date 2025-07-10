import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import HomeSection from './sections/HomeSection';
import SearchSection from './sections/SearchSection';
import LibrarySection from './sections/LibrarySection';
import LikedSongsSection from './sections/LikedSongsSection';
import ProfileSection from './sections/ProfileSection';
import SettingsSection from './sections/SettingsSection';
import PlaylistSection from './sections/PlaylistSection';
import ChartsSection from './sections/ChartsSection';

const MobileHeader = ({ onMenuClick }) => {
  return (
    <div className="md:hidden bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="p-2 text-gray-400 hover:text-white"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">♪</span>
        </div>
        <h1 className="text-lg font-bold text-white">AudioStream</h1>
      </div>
      <div className="w-9"></div> {/* Spacer for center alignment */}
    </div>
  );
};

const MainContent = ({ activeSection, setCurrentTrack, setIsPlaying, onMenuClick }) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />;
      case 'search':
        return <SearchSection setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />;
      case 'library':
        return <LibrarySection setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />;
      case 'liked':
        return <LikedSongsSection setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />;
      case 'charts':
        return <ChartsSection setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />;
      case 'profile':
        return <ProfileSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        if (activeSection.startsWith('playlist-')) {
          const playlistId = parseInt(activeSection.split('-')[1]);
          return <PlaylistSection playlistId={playlistId} setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />;
        }
        return <HomeSection setCurrentTrack={setCurrentTrack} setIsPlaying={setIsPlaying} />;
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden flex flex-col">
      <MobileHeader onMenuClick={onMenuClick} />
      <div className="flex-1 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default MainContent;