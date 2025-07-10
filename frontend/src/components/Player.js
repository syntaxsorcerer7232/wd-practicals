import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Heart, MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockTracks } from '../mock/mockData';

const Player = ({ currentTrack, isPlaying, setIsPlaying }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // none, one, all
  const [isLiked, setIsLiked] = useState(false);

  const track = mockTracks.find(t => t.id === currentTrack) || mockTracks[0];
  const totalDuration = track.duration;

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          // Reset when song ends (mock duration in seconds)
          const [minutes, seconds] = totalDuration.split(':').map(Number);
          const totalSeconds = minutes * 60 + seconds;
          return newTime >= totalSeconds ? 0 : newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  useEffect(() => {
    setIsLiked(track.liked);
  }, [track]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const toggleRepeat = () => {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const [minutes, seconds] = totalDuration.split(':').map(Number);
  const totalSeconds = minutes * 60 + seconds;

  return (
    <div className="h-24 bg-gray-900 border-t border-gray-800 px-4 flex items-center justify-between">
      {/* Track Info */}
      <div className="flex items-center space-x-4 w-1/3">
        <Avatar className="w-14 h-14 rounded-lg">
          <AvatarImage src={track.artwork} alt={track.title} className="rounded-lg" />
          <AvatarFallback className="rounded-lg">{track.title.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h4 className="text-white font-medium truncate">{track.title}</h4>
          <p className="text-gray-400 text-sm truncate">{track.artist}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLike}
            className={`p-1 h-8 w-8 ${
              isLiked ? 'text-green-500 hover:text-green-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
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

      {/* Player Controls */}
      <div className="flex flex-col items-center space-y-2 w-1/3">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleShuffle}
            className={`p-1 h-8 w-8 ${
              isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-gray-400 hover:text-white"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={handlePlayPause}
            className="p-2 h-10 w-10 bg-white hover:bg-gray-100 text-black rounded-full"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-8 w-8 text-gray-400 hover:text-white"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRepeat}
            className={`p-1 h-8 w-8 ${
              repeatMode !== 'none' ? 'text-green-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Repeat className="h-4 w-4" />
            {repeatMode === 'one' && (
              <span className="absolute text-xs font-bold -mt-1 ml-1">1</span>
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 w-full max-w-md">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={totalSeconds}
            step={1}
            onValueChange={handleProgressChange}
            className="flex-1"
          />
          <span className="text-xs text-gray-400 w-10">
            {totalDuration}
          </span>
        </div>

        {/* Audio Quality Indicator */}
        <div className="flex items-center space-x-2">
          <div className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
            {track.audioQuality}
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3 w-1/3 justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8 text-gray-400 hover:text-white"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
        <Slider
          value={volume}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24"
        />
        <span className="text-xs text-gray-400 w-8">
          {volume[0]}%
        </span>
      </div>
    </div>
  );
};

export default Player;