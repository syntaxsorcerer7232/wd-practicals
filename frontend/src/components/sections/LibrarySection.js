import React, { useState } from 'react';
import { Play, Heart, MoreHorizontal, Grid, List, SortAsc, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { mockTracks, mockPlaylists, mockAlbums } from '../../mock/mockData';

const LibrarySection = ({ setCurrentTrack, setIsPlaying }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  const handlePlayTrack = (trackId) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const sortedPlaylists = [...mockPlaylists].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'created':
        return new Date(b.created || '2024-01-01') - new Date(a.created || '2024-01-01');
      case 'tracks':
        return b.trackCount - a.trackCount;
      default:
        return 0;
    }
  });

  const sortedAlbums = [...mockAlbums].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'year':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Your Library</h1>
          <p className="text-gray-400 text-lg">Manage your music collection</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="tracks">Tracks</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="p-2"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="p-2"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
          <TabsTrigger value="playlists" className="text-gray-400 data-[state=active]:text-white">Playlists</TabsTrigger>
          <TabsTrigger value="albums" className="text-gray-400 data-[state=active]:text-white">Albums</TabsTrigger>
          <TabsTrigger value="artists" className="text-gray-400 data-[state=active]:text-white">Artists</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedPlaylists.map((playlist) => (
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
                    <p className="text-gray-400 text-sm mb-2 line-clamp-2">{playlist.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{playlist.trackCount} songs</span>
                      <span>{playlist.duration}</span>
                    </div>
                    <div className="flex items-center mt-3 space-x-2">
                      <Badge variant={playlist.isPublic ? 'default' : 'secondary'} className="text-xs">
                        {playlist.isPublic ? 'Public' : 'Private'}
                      </Badge>
                      <span className="text-xs text-gray-500">{playlist.followers} followers</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400 text-sm w-16">Cover</span>
                <span className="text-gray-400 text-sm flex-1">Name</span>
                <span className="text-gray-400 text-sm w-20">Songs</span>
                <span className="text-gray-400 text-sm w-20">Duration</span>
                <span className="text-gray-400 text-sm w-24">Visibility</span>
                <span className="text-gray-400 text-sm w-12"></span>
              </div>
              {sortedPlaylists.map((playlist) => (
                <div key={playlist.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group cursor-pointer">
                  <Avatar className="w-16 h-16 rounded-lg">
                    <AvatarImage src={playlist.artwork} alt={playlist.name} className="rounded-lg" />
                    <AvatarFallback className="rounded-lg">{playlist.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{playlist.name}</h4>
                    <p className="text-gray-400 text-sm truncate">{playlist.description}</p>
                  </div>
                  <span className="text-gray-400 text-sm w-20">{playlist.trackCount}</span>
                  <span className="text-gray-400 text-sm w-20">{playlist.duration}</span>
                  <Badge variant={playlist.isPublic ? 'default' : 'secondary'} className="text-xs w-24">
                    {playlist.isPublic ? 'Public' : 'Private'}
                  </Badge>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity w-12">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-8 w-8 text-gray-400 hover:text-white"
                    >
                      <Play className="h-4 w-4" />
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
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="albums" className="space-y-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedAlbums.map((album) => (
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
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-400 text-sm w-16">Cover</span>
                <span className="text-gray-400 text-sm flex-1">Album</span>
                <span className="text-gray-400 text-sm w-32">Artist</span>
                <span className="text-gray-400 text-sm w-20">Year</span>
                <span className="text-gray-400 text-sm w-20">Tracks</span>
                <span className="text-gray-400 text-sm w-12"></span>
              </div>
              {sortedAlbums.map((album) => (
                <div key={album.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group cursor-pointer">
                  <Avatar className="w-16 h-16 rounded-lg">
                    <AvatarImage src={album.artwork} alt={album.title} className="rounded-lg" />
                    <AvatarFallback className="rounded-lg">{album.title.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{album.title}</h4>
                    <p className="text-gray-400 text-sm truncate">{album.genre}</p>
                  </div>
                  <span className="text-gray-400 text-sm w-32">{album.artist}</span>
                  <span className="text-gray-400 text-sm w-20">{album.year}</span>
                  <span className="text-gray-400 text-sm w-20">{album.trackCount}</span>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity w-12">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-8 w-8 text-gray-400 hover:text-white"
                    >
                      <Play className="h-4 w-4" />
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
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="artists" className="space-y-6">
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
            <p className="text-gray-400">Artist management features will be available soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibrarySection;