import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'discovery', // 'discovery' | 'playlists' | 'artists' | 'offline'
  selectedGenre: 'All',
  searchQuery: '',

  currentTrack: {
    id: 'TRK-01',
    title: 'Neon Ultraviolet Horizon',
    artist: 'Astral Echoes',
    album: 'Cosmic Drift LP',
    genre: 'Synthwave & Electronic',
    durationSec: 218,
    durationStr: '3:38',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    bpm: 124,
    key: 'F# Minor',
    playsCount: 342100
  },
  isPlaying: false,
  currentTime: 45,
  volume: 0.85,
  isMuted: false,

  tracks: [
    {
      id: 'TRK-01',
      title: 'Neon Ultraviolet Horizon',
      artist: 'Astral Echoes',
      album: 'Cosmic Drift LP',
      genre: 'Synthwave & Electronic',
      durationSec: 218,
      durationStr: '3:38',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      bpm: 124,
      key: 'F# Minor',
      playsCount: 342100
    },
    {
      id: 'TRK-02',
      title: 'Solstice in Kyoto (Lofi Ambient)',
      artist: 'Komorebi Sound Collective',
      album: 'Bamboo Mist Chronicles',
      genre: 'Lofi & Ambient',
      durationSec: 184,
      durationStr: '3:04',
      cover: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
      bpm: 82,
      key: 'C Major',
      playsCount: 890450
    },
    {
      id: 'TRK-03',
      title: 'Vortex of Infinite Reverberations',
      artist: 'Hyperion Deep',
      album: 'Subsurface Odyssey',
      genre: 'Progressive Deep House',
      durationSec: 345,
      durationStr: '5:45',
      cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      bpm: 128,
      key: 'A Minor',
      playsCount: 210900
    },
    {
      id: 'TRK-04',
      title: 'Ethereal Velvet Nights',
      artist: 'Luna Vespera',
      album: 'Midnight Mirage EP',
      genre: 'Neo-Soul & Chill',
      durationSec: 242,
      durationStr: '4:02',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      bpm: 96,
      key: 'E♭ Major',
      playsCount: 512000
    },
    {
      id: 'TRK-05',
      title: 'Cybernetic Monolith',
      artist: 'Astral Echoes',
      album: 'Cosmic Drift LP',
      genre: 'Synthwave & Electronic',
      durationSec: 200,
      durationStr: '3:20',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      bpm: 130,
      key: 'D Minor',
      playsCount: 178000
    }
  ],

  playlists: [
    {
      id: 'PL-01',
      title: 'Sonic Radar: Deep Focus & Coding Flow',
      curator: 'AuraSound Algorithm',
      description: 'Zero-distraction hypnotic electronic rhythms tuned to 124 BPM for deep mental clarity.',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      followersCount: '48.2K',
      trackIds: ['TRK-01', 'TRK-02', 'TRK-03']
    },
    {
      id: 'PL-02',
      title: 'Midnight Neo-Soul & Downtempo Lounge',
      curator: 'Luna Vespera (Official)',
      description: 'Lush Rhodes keyboards, organic vinyl grain, and nocturnal low-end grooves.',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      followersCount: '19.5K',
      trackIds: ['TRK-04', 'TRK-02']
    }
  ],

  artists: [
    {
      id: 'ART-01',
      name: 'Astral Echoes',
      avatar: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
      bio: 'Berlin-based synthesizer architects blending analog Moog filters with cinematic space ambiance.',
      genres: ['Synthwave', 'Electronic', 'Retrowave'],
      followersCount: '124,500',
      isFollowed: true
    },
    {
      id: 'ART-02',
      name: 'Komorebi Sound Collective',
      avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80',
      bio: 'A multidisciplinary audio team sampling field recordings across Japan and blending them with gentle jazz chords.',
      genres: ['Lofi', 'Ambient', 'Chillhop'],
      followersCount: '412,000',
      isFollowed: false
    },
    {
      id: 'ART-03',
      name: 'Luna Vespera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Vocalist and producer merging late-night downtempo grooves with sultry neo-soul harmonies.',
      genres: ['Neo-Soul', 'Downtempo', 'R&B'],
      followersCount: '89,300',
      isFollowed: true
    }
  ],

  offlineDownloads: ['TRK-01', 'TRK-02'],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  playTrack: (track) => set({
    currentTrack: track,
    isPlaying: true,
    currentTime: 0
  }),

  togglePlayPause: () => set((state) => ({
    isPlaying: !state.isPlaying
  })),

  seek: (seconds) => set({ currentTime: seconds }),

  nextTrack: () => set((state) => {
    const currentIndex = state.tracks.findIndex(t => t.id === state.currentTrack.id);
    const nextIndex = (currentIndex + 1) % state.tracks.length;
    return {
      currentTrack: state.tracks[nextIndex],
      isPlaying: true,
      currentTime: 0
    };
  }),

  prevTrack: () => set((state) => {
    const currentIndex = state.tracks.findIndex(t => t.id === state.currentTrack.id);
    const prevIndex = (currentIndex - 1 + state.tracks.length) % state.tracks.length;
    return {
      currentTrack: state.tracks[prevIndex],
      isPlaying: true,
      currentTime: 0
    };
  }),

  toggleFollowArtist: (artistId) => set((state) => ({
    artists: state.artists.map(a => a.id === artistId ? { ...a, isFollowed: !a.isFollowed } : a)
  })),

  toggleOfflineDownload: (trackId) => set((state) => {
    const exists = state.offlineDownloads.includes(trackId);
    const updated = exists
      ? state.offlineDownloads.filter(id => id !== trackId)
      : [...state.offlineDownloads, trackId];
    return { offlineDownloads: updated };
  }),

  createPlaylist: (playlistData) => set((state) => {
    const newPlaylist = {
      id: `PL-${Math.floor(10 + Math.random() * 90)}`,
      curator: 'You (Curator)',
      followersCount: '1',
      cover: playlistData.cover || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      trackIds: playlistData.trackIds || ['TRK-01'],
      ...playlistData
    };
    return {
      playlists: [newPlaylist, ...state.playlists],
      activeTab: 'playlists'
    };
  })
}));
