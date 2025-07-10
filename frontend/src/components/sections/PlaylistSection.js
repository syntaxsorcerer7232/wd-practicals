import React from 'react';
import { Play, Heart, MoreHorizontal, Download, Share, Edit, Clock, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { mockTracks, mockPlaylists } from '../../mock/mockData';

const PlaylistSection = ({ playlistId, setCurrentTrack, setIsPlaying }) => {
  const handlePlayTrack = (trackId) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const playlist = mockPlaylists.find(p => p.id === playlistId);
  
  if (!playlist) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Playlist Not Found</h2>
        <p className="text-gray-400">The playlist you're looking for doesn't exist.</p>
      </div>
    );
  }

  const playlistTracks = playlist.tracks.map(trackId => 
    mockTracks.find(track => track.id === trackId)
  ).filter(Boolean);

  const totalDuration = playlistTracks.reduce((acc, track) => {
    const [minutes, seconds] = track.duration.split(':').map(Number);
    return acc + minutes * 60 + seconds;
  }, 0);

  const formatTotalDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start space-x-8">
        <div className="w-64 h-64 rounded-lg overflow-hidden">
          <Avatar className="w-full h-full">
            <AvatarImage src={playlist.artwork} alt={playlist.name} className="object-cover" />
            <AvatarFallback className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-4xl">
              {playlist.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              {playlist.isPublic ? 'Public Playlist' : 'Private Playlist'}
            </p>
            <h1 className="text-6xl font-bold text-white mb-4">{playlist.name}</h1>
            <p className="text-gray-400 text-lg">{playlist.description}</p>
          </div>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>{playlist.trackCount} songs</span>
            <span>•</span>
            <span>{formatTotalDuration(totalDuration)}</span>
            {playlist.isPublic && (
              <>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{playlist.followers.toLocaleString()} followers</span>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              size="lg"
              onClick={() => playlistTracks.length > 0 && handlePlayTrack(playlistTracks[0].id)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6 text-lg font-semibold"
            >
              <Play className="h-6 w-6 mr-2" />
              Play All
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-400 hover:text-white rounded-full px-8 py-6"
            >
              <Download className="h-5 w-5 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-400 hover:text-white rounded-full px-8 py-6"
            >
              <Share className="h-5 w-5 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-400 hover:text-white rounded-full px-8 py-6"
            >
              <Edit className="h-5 w-5 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
          <span className="text-gray-400 text-sm w-6">#</span>
          <span className="text-gray-400 text-sm w-16">Cover</span>
          <span className="text-gray-400 text-sm flex-1">Title</span>
          <span className="text-gray-400 text-sm w-32">Album</span>
          <span className="text-gray-400 text-sm w-24">Quality</span>
          <span className="text-gray-400 text-sm w-20">Plays</span>
          <span className="text-gray-400 text-sm w-16">
            <Clock className="h-4 w-4" />
          </span>
          <span className="text-gray-400 text-sm w-12"></span>
        </div>

        {playlistTracks.length > 0 ? (
          playlistTracks.map((track, index) => (
            <div key={track.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group cursor-pointer">
              <span className="text-gray-400 text-sm w-6">{index + 1}</span>
              <Avatar className="w-16 h-16 rounded-lg">
                <AvatarImage src={track.artwork} alt={track.title} className="rounded-lg" />
                <AvatarFallback className="rounded-lg">{track.title.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{track.title}</h4>
                <p className="text-gray-400 text-sm truncate">{track.artist}</p>
              </div>
              <span className="text-gray-400 text-sm w-32 truncate">{track.album}</span>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-24">
                {track.audioQuality}
              </Badge>
              <span className="text-gray-400 text-sm w-20">{track.plays.toLocaleString()}</span>
              <span className="text-gray-400 text-sm w-16">{track.duration}</span>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePlayTrack(track.id)}
                  className="p-1 h-8 w-8 text-gray-400 hover:text-white"
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-1 h-8 w-8 ${track.liked ? 'text-green-500' : 'text-gray-400 hover:text-white'}`}
                >
                  <Heart className={`h-4 w-4 ${track.liked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-8 w-8 text-gray-400 hover:text-white"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">This playlist is empty</h3>
            <p className="text-gray-400 mb-6">
              Start building your playlist by adding some tracks!
            </p>
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6"
            >
              Find Songs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistSection;