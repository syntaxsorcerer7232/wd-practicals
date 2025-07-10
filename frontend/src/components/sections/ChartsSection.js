import React from 'react';
import { Play, Heart, MoreHorizontal, TrendingUp, TrendingDown, Minus, Clock, Crown, Award, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { mockTracks, mockTopCharts } from '../../mock/mockData';

const ChartsSection = ({ setCurrentTrack, setIsPlaying }) => {
  const handlePlayTrack = (trackId) => {
    setCurrentTrack(trackId);
    setIsPlaying(true);
  };

  const chartTracks = mockTopCharts.map(chart => ({
    ...mockTracks.find(track => track.id === chart.trackId),
    position: chart.position,
    previousPosition: chart.previousPosition
  }));

  const getPositionChange = (current, previous) => {
    if (current < previous) {
      return { type: 'up', value: previous - current };
    } else if (current > previous) {
      return { type: 'down', value: current - previous };
    }
    return { type: 'same', value: 0 };
  };

  const getPositionIcon = (position) => {
    if (position === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (position === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (position === 3) return <Star className="h-5 w-5 text-orange-500" />;
    return null;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Top Charts</h1>
          <p className="text-gray-400 text-lg">The most popular tracks right now</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Updated Daily
          </Badge>
        </div>
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
              Trending Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">+12%</div>
            <p className="text-gray-400 text-sm">from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Play className="h-5 w-5 mr-2 text-blue-500" />
              Total Plays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">5.2M</div>
            <p className="text-gray-400 text-sm">this week</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              Most Liked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">1.8M</div>
            <p className="text-gray-400 text-sm">total likes</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Global Top 50</h2>
          <Button
            size="lg"
            onClick={() => chartTracks.length > 0 && handlePlayTrack(chartTracks[0].id)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-6 text-lg font-semibold"
          >
            <Play className="h-6 w-6 mr-2" />
            Play Charts
          </Button>
        </div>

        <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
          <span className="text-gray-400 text-sm w-12">#</span>
          <span className="text-gray-400 text-sm w-16">Cover</span>
          <span className="text-gray-400 text-sm flex-1">Title</span>
          <span className="text-gray-400 text-sm w-32">Album</span>
          <span className="text-gray-400 text-sm w-24">Quality</span>
          <span className="text-gray-400 text-sm w-20">Plays</span>
          <span className="text-gray-400 text-sm w-16">Change</span>
          <span className="text-gray-400 text-sm w-16">
            <Clock className="h-4 w-4" />
          </span>
          <span className="text-gray-400 text-sm w-12"></span>
        </div>

        {chartTracks.map((track) => {
          const change = getPositionChange(track.position, track.previousPosition);
          const positionIcon = getPositionIcon(track.position);

          return (
            <div key={track.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 group cursor-pointer">
              <div className="flex items-center space-x-2 w-12">
                <span className="text-gray-400 text-sm font-bold">{track.position}</span>
                {positionIcon}
              </div>
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
              <div className="flex items-center space-x-1 w-16">
                {change.type === 'up' && (
                  <>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-500 text-sm">+{change.value}</span>
                  </>
                )}
                {change.type === 'down' && (
                  <>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span className="text-red-500 text-sm">-{change.value}</span>
                  </>
                )}
                {change.type === 'same' && (
                  <Minus className="h-4 w-4 text-gray-500" />
                )}
              </div>
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
          );
        })}
      </div>
    </div>
  );
};

export default ChartsSection;