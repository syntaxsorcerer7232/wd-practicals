import React from 'react';
import HomeSection from './sections/HomeSection';
import SearchSection from './sections/SearchSection';
import LibrarySection from './sections/LibrarySection';
import LikedSongsSection from './sections/LikedSongsSection';
import ProfileSection from './sections/ProfileSection';
import SettingsSection from './sections/SettingsSection';
import PlaylistSection from './sections/PlaylistSection';
import ChartsSection from './sections/ChartsSection';

const MainContent = ({ activeSection, setCurrentTrack, setIsPlaying }) => {
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
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div className="h-full overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default MainContent;