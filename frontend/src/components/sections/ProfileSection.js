import React, { useState } from 'react';
import { Edit, Settings, Music, Heart, Users, Calendar, Crown, Play, Share } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockUser, mockTracks, mockPlaylists } from '../../mock/mockData';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const userPlaylists = mockPlaylists.filter(playlist => 
    mockUser.playlists.includes(playlist.id)
  );
  
  const userLikedTracks = mockTracks.filter(track => 
    mockUser.likedTracks.includes(track.id)
  );

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start space-x-8">
        <div className="w-64 h-64 rounded-full overflow-hidden">
          <Avatar className="w-full h-full">
            <AvatarImage src={mockUser.avatar} alt={mockUser.displayName} className="object-cover" />
            <AvatarFallback className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-4xl">
              {mockUser.displayName.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Profile</p>
            <h1 className="text-6xl font-bold text-white mb-2">{mockUser.displayName}</h1>
            <p className="text-gray-400 text-lg">@{mockUser.username}</p>
          </div>
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{mockUser.followers.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{mockUser.following.toLocaleString()} following</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Joined {formatJoinDate(mockUser.joinDate)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Crown className="h-4 w-4 mr-1" />
              {mockUser.subscription}
            </Badge>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsEditing(!isEditing)}
              className="border-gray-600 text-gray-400 hover:text-white rounded-full px-8 py-6"
            >
              <Edit className="h-5 w-5 mr-2" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-600 text-gray-400 hover:text-white rounded-full px-8 py-6"
            >
              <Share className="h-5 w-5 mr-2" />
              Share Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Music className="h-5 w-5 mr-2 text-blue-500" />
              Playlists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{mockUser.playlists.length}</div>
            <p className="text-gray-400 text-sm">created</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Liked Songs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{mockUser.likedTracks.length}</div>
            <p className="text-gray-400 text-sm">tracks</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-500" />
              Followers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{mockUser.followers.toLocaleString()}</div>
            <p className="text-gray-400 text-sm">people</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Play className="h-5 w-5 mr-2 text-purple-500" />
              Listening Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">247h</div>
            <p className="text-gray-400 text-sm">this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
          <TabsTrigger value="playlists" className="text-gray-400 data-[state=active]:text-white">
            My Playlists
          </TabsTrigger>
          <TabsTrigger value="liked" className="text-gray-400 data-[state=active]:text-white">
            Liked Songs
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-gray-400 data-[state=active]:text-white">
            Recent Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPlaylists.map((playlist) => (
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
                    {playlist.isPublic && (
                      <span className="text-xs text-gray-500">{playlist.followers} followers</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userLikedTracks.map((track) => (
              <Card key={track.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Avatar className="w-full h-48 rounded-lg">
                      <AvatarImage src={track.artwork} alt={track.title} className="rounded-lg object-cover" />
                      <AvatarFallback className="rounded-lg h-48">{track.title.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-500 hover:bg-green-600 text-white rounded-full p-3"
                    >
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{track.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{track.artist}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{track.album}</span>
                    <span>{track.duration}</span>
                  </div>
                  <div className="flex items-center mt-3 space-x-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {track.audioQuality}
                    </Badge>
                    <Heart className="h-4 w-4 text-green-500 fill-current" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <div className="space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Created a new playlist</p>
                    <p className="text-gray-400 text-sm">"Chill Vibes" • 2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Liked a song</p>
                    <p className="text-gray-400 text-sm">"Bohemian Rhapsody" by Queen • 5 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white font-medium">Followed a user</p>
                    <p className="text-gray-400 text-sm">@music_lover123 • 1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSection;