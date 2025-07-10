// Mock data for music streaming service
export const mockTracks = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: "5:55",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioQuality: "Hi-Fi",
    plays: 1234567,
    liked: true,
    genre: "Rock"
  },
  {
    id: 2,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: "6:30",
    artwork: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop",
    audioQuality: "Hi-Fi",
    plays: 987654,
    liked: false,
    genre: "Rock"
  },
  {
    id: 3,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    duration: "8:02",
    artwork: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    audioQuality: "Master",
    plays: 876543,
    liked: true,
    genre: "Rock"
  },
  {
    id: 4,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: "4:54",
    artwork: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop",
    audioQuality: "Hi-Fi",
    plays: 765432,
    liked: false,
    genre: "Pop"
  },
  {
    id: 5,
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    duration: "6:13",
    artwork: "https://images.unsplash.com/photo-1458560871784-56d23406c091?w=300&h=300&fit=crop",
    audioQuality: "Hi-Fi",
    plays: 654321,
    liked: true,
    genre: "Folk Rock"
  }
];

export const mockPlaylists = [
  {
    id: 1,
    name: "Rock Classics",
    description: "The greatest rock songs of all time",
    trackCount: 25,
    duration: "1h 45m",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    tracks: [1, 2, 3],
    isPublic: true,
    followers: 1234
  },
  {
    id: 2,
    name: "Chill Vibes",
    description: "Relaxing tunes for any mood",
    trackCount: 18,
    duration: "1h 12m",
    artwork: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop",
    tracks: [4, 5],
    isPublic: false,
    followers: 567
  },
  {
    id: 3,
    name: "Daily Mix",
    description: "Your personalized daily soundtrack",
    trackCount: 30,
    duration: "2h 5m",
    artwork: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    tracks: [1, 3, 5],
    isPublic: true,
    followers: 2345
  }
];

export const mockAlbums = [
  {
    id: 1,
    title: "A Night at the Opera",
    artist: "Queen",
    year: 1975,
    trackCount: 12,
    duration: "43:08",
    artwork: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    genre: "Rock",
    tracks: [1]
  },
  {
    id: 2,
    title: "Hotel California",
    artist: "Eagles",
    year: 1976,
    trackCount: 9,
    duration: "43:28",
    artwork: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300&fit=crop",
    genre: "Rock",
    tracks: [2]
  },
  {
    id: 3,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    trackCount: 9,
    duration: "42:19",
    artwork: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop",
    genre: "Pop",
    tracks: [4]
  }
];

export const mockUser = {
  id: 1,
  username: "audiophile_john",
  displayName: "John Doe",
  email: "john@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  followers: 1547,
  following: 892,
  playlists: [1, 2, 3],
  likedTracks: [1, 3, 5],
  subscription: "Premium",
  joinDate: "2020-03-15"
};

export const mockRecentlyPlayed = [
  { trackId: 1, playedAt: "2024-07-15T10:30:00Z" },
  { trackId: 3, playedAt: "2024-07-15T09:45:00Z" },
  { trackId: 5, playedAt: "2024-07-15T08:20:00Z" }
];

export const mockTopCharts = [
  { trackId: 1, position: 1, previousPosition: 2 },
  { trackId: 4, position: 2, previousPosition: 1 },
  { trackId: 2, position: 3, previousPosition: 4 },
  { trackId: 3, position: 4, previousPosition: 3 },
  { trackId: 5, position: 5, previousPosition: 6 }
];

export const mockGenres = [
  { id: 1, name: "Rock", color: "#FF6B6B", trackCount: 1250 },
  { id: 2, name: "Pop", color: "#4ECDC4", trackCount: 980 },
  { id: 3, name: "Jazz", color: "#45B7D1", trackCount: 650 },
  { id: 4, name: "Classical", color: "#96CEB4", trackCount: 420 },
  { id: 5, name: "Electronic", color: "#FFEAA7", trackCount: 890 },
  { id: 6, name: "Hip-Hop", color: "#DDA0DD", trackCount: 1120 }
];