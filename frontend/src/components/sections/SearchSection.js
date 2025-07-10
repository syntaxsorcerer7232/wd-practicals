import React, { useState } from 'react';
import { Search, Play, Heart, MoreHorizontal, Filter, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockTracks, mockPlaylists, mockAlbums, mockGenres } from '../../mock/mockData';

const SearchSection = ({ setCurrentTrack, setIsPlaying }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const handlePlayTrack = (trackId) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const filteredTracks = mockTracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlaylists = mockPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = mockAlbums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Search</h1>
        <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder="Search for songs, artists, albums, or playlists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 text-lg py-6"
        />
      </div>

      {/* Browse Categories */}
      {!searchQuery && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockGenres.map((genre) => (
              <Card key={genre.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div 
                    className="w-full h-32 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: genre.color }}
                  >
                    <span className="text-white font-bold text-3xl">♪</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black opacity-20"></div>
                  </div>
                  <h3 className="text-white font-semibold text-lg">{genre.name}</h3>
                  <p className="text-gray-400 text-sm">{genre.trackCount.toLocaleString()} songs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
              <TabsTrigger value="all" className="text-gray-400 data-[state=active]:text-white">All</TabsTrigger>
              <TabsTrigger value="songs" className="text-gray-400 data-[state=active]:text-white">Songs</TabsTrigger>
              <TabsTrigger value="playlists" className="text-gray-400 data-[state=active]:text-white">Playlists</TabsTrigger>
              <TabsTrigger value="albums" className="text-gray-400 data-[state=active]:text-white">Albums</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              {/* Top Results */}
              {filteredTracks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Top Results</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTracks.slice(0, 2).map((track) => (
                      <Card key={track.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-20 h-20 rounded-lg">
                              <AvatarImage src={track.artwork} alt={track.title} className="rounded-lg" />
                              <AvatarFallback className="rounded-lg">{track.title.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-semibold text-lg mb-1">{track.title}</h3>
                              <p className="text-gray-400 mb-2">{track.artist}</p>
                              <div className="flex items-center space-x-4">
                                <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                  {track.audioQuality}
                                </Badge>
                                <span className="text-gray-500 text-sm">{track.duration}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePlayTrack(track.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600 text-white rounded-full p-3"
                            >
                              <Play className="h-5 w-5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Songs */}
              {filteredTracks.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
                  <div className="space-y-2">
                    {filteredTracks.slice(0, 5).map((track, index) => (
                      <div key={track.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group cursor-pointer">
                        <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                        <Avatar className="w-12 h-12 rounded-lg">
                          <AvatarImage src={track.artwork} alt={track.title} className="rounded-lg" />
                          <AvatarFallback className="rounded-lg">{track.title.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium truncate">{track.title}</h4>
                          <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                        </div>
                        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          {track.audioQuality}
                        </Badge>
                        <span className="text-gray-400 text-sm">{track.duration}</span>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                            className="p-1 h-8 w-8 text-gray-400 hover:text-white"
                          >
                            <Heart className="h-4 w-4" />
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
                </div>
              )}
            </TabsContent>

            <TabsContent value="songs">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                  <span className="text-gray-400 text-sm w-6">#</span>
                  <span className="text-gray-400 text-sm w-12">Cover</span>
                  <span className="text-gray-400 text-sm flex-1">Title</span>
                  <span className="text-gray-400 text-sm">Quality</span>
                  <span className="text-gray-400 text-sm w-16">
                    <Clock className="h-4 w-4" />
                  </span>
                </div>
                {filteredTracks.map((track, index) => (
                  <div key={track.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group cursor-pointer">
                    <span className="text-gray-400 text-sm w-6">{index + 1}</span>
                    <Avatar className="w-12 h-12 rounded-lg">
                      <AvatarImage src={track.artwork} alt={track.title} className="rounded-lg" />
                      <AvatarFallback className="rounded-lg">{track.title.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{track.title}</h4>
                      <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {track.audioQuality}
                    </Badge>
                    <span className="text-gray-400 text-sm w-16">{track.duration}</span>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
                        className="p-1 h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Heart className="h-4 w-4" />
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
            </TabsContent>

            <TabsContent value="playlists">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaylists.map((playlist) => (
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
                        <span>{playlist.followers} followers</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="albums">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlbums.map((album) => (
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
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SearchSection;