import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { mockTracks, mockPlaylists, mockAlbums, mockRecentlyPlayed, mockGenres } from '../../mock/mockData';

const HomeSection = ({ setCurrentTrack, setIsPlaying }) => {
  const handlePlayTrack = (trackId) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const recentlyPlayedTracks = mockRecentlyPlayed.map(rp => 
    mockTracks.find(track => track.id === rp.trackId)
  );

  const featuredPlaylists = mockPlaylists.slice(0, 3);
  const topAlbums = mockAlbums.slice(0, 3);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Good afternoon</h1>
          <p className="text-gray-400 text-lg">Discover your next favorite song</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Premium
          </Badge>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentlyPlayedTracks.map((track) => (
          <Card key={track.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 rounded-lg">
                  <AvatarImage src={track.artwork} alt={track.title} className="rounded-lg" />
                  <AvatarFallback className="rounded-lg">{track.title.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{track.title}</h3>
                  <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePlayTrack(track.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Playlists */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlaylists.map((playlist) => (
            <Card key={playlist.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Avatar className="w-full h-48 rounded-lg">
                    <AvatarImage src={playlist.artwork} alt={playlist.name} className="rounded-lg object-cover" />
                    <AvatarFallback className="rounded-lg h-48">{playlist.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600 text-white rounded-full p-3"
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
                <h3 className="text-white font-semibold mb-2">{playlist.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{playlist.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{playlist.trackCount} songs</span>
                  <span>{playlist.duration}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Top Albums */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Top Albums</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topAlbums.map((album) => (
            <Card key={album.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Avatar className="w-full h-48 rounded-lg">
                    <AvatarImage src={album.artwork} alt={album.title} className="rounded-lg object-cover" />
                    <AvatarFallback className="rounded-lg h-48">{album.title.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600 text-white rounded-full p-3"
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
                <h3 className="text-white font-semibold mb-1">{album.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{album.artist}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{album.year}</span>
                  <span>{album.trackCount} tracks</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Browse by Genre */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Browse by Genre</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockGenres.map((genre) => (
            <Card key={genre.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group">
              <CardContent className="p-4">
                <div 
                  className="w-full h-24 rounded-lg mb-3 flex items-center justify-center"
                  style={{ backgroundColor: genre.color }}
                >
                  <span className="text-white font-bold text-lg">♪</span>
                </div>
                <h3 className="text-white font-medium text-sm">{genre.name}</h3>
                <p className="text-gray-400 text-xs">{genre.trackCount} songs</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;