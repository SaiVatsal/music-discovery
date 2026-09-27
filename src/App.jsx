import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Compass,
  ListMusic,
  Users,
  DownloadCloud,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Heart,
  Share2,
  PlusCircle,
  Radio,
  Search,
  CheckCircle,
  Sparkles,
  Zap,
  Disc3
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    selectedGenre,
    setSelectedGenre,
    searchQuery,
    setSearchQuery,
    tracks,
    playlists,
    artists,
    offlineDownloads,
    currentTrack,
    isPlaying,
    currentTime,
    volume,
    playTrack,
    togglePlayPause,
    seek,
    nextTrack,
    prevTrack,
    toggleFollowArtist,
    toggleOfflineDownload,
    createPlaylist
  } = useStore();

  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [newPlaylistDesc, setNewPlaylistDesc] = useState('');
  const [shareToast, setShareToast] = useState(null);

  const genres = ['All', 'Synthwave & Electronic', 'Lofi & Ambient', 'Progressive Deep House', 'Neo-Soul & Chill'];

  const filteredTracks = tracks.filter(t => {
    const matchesGenre = selectedGenre === 'All' || t.genre === selectedGenre;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.album.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const offlineTrackList = tracks.filter(t => offlineDownloads.includes(t.id));

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (!newPlaylistTitle.trim()) return;
    createPlaylist({
      title: newPlaylistTitle,
      description: newPlaylistDesc || 'Personalized algorithmic sonic discovery mix.',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      trackIds: ['TRK-01', 'TRK-04']
    });
    setNewPlaylistTitle('');
    setNewPlaylistDesc('');
    setShowCreatePlaylistModal(false);
  };

  const triggerShare = (title) => {
    setShareToast(`Copied discovery link for "${title}" to clipboard!`);
    setTimeout(() => setShareToast(null), 3000);
  };

  const formatSec = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0e0720] text-purple-100 flex flex-col font-sans pb-28">
      {/* Deep-Purple Atmospheric Header */}
      <header className="bg-[#180d30]/90 backdrop-blur-md border-b border-purple-900/40 sticky top-0 z-30 shadow-lg shadow-purple-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('discovery')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 ring-2 ring-purple-400/20 animate-pulse">
                <Disc3 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-fuchsia-400 font-mono">Algorithmic Discovery</span>
                <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-pink-200">
                  AuraSound
                </h1>
              </div>
            </div>

            {/* Navigation Pills */}
            <nav className="flex space-x-1 sm:space-x-2 bg-[#251347]/60 p-1.5 rounded-full border border-purple-800/40">
              <button
                onClick={() => setActiveTab('discovery')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'discovery'
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Sonic Radar</span>
              </button>

              <button
                onClick={() => setActiveTab('playlists')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'playlists'
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <ListMusic className="w-4 h-4" />
                <span>Playlists</span>
              </button>

              <button
                onClick={() => setActiveTab('artists')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'artists'
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Followed Artists</span>
              </button>

              <button
                onClick={() => setActiveTab('offline')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'offline'
                    ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <DownloadCloud className="w-4 h-4" />
                <span>Offline Vault ({offlineDownloads.length})</span>
              </button>
            </nav>

            {/* Create Playlist CTA */}
            <button
              onClick={() => setShowCreatePlaylistModal(true)}
              className="hidden lg:flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-purple-200 border border-purple-600/40 rounded-full text-xs font-bold transition-all shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-fuchsia-400" />
              <span>Create Discovery Mix</span>
            </button>
          </div>
        </div>
      </header>

      {/* Share Toast */}
      {shareToast && (
        <div className="fixed top-24 right-6 bg-fuchsia-950 border border-fuchsia-500 text-fuchsia-200 text-xs px-4 py-2.5 rounded-2xl shadow-xl z-50 flex items-center space-x-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: SONIC RADAR & GENRE DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="space-y-8">
            {/* Hero Sonic Pulse Card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#291353] via-[#3b1c6e] to-[#200c3b] p-8 border border-purple-700/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 z-10">
                <div className="flex items-center space-x-2">
                  <span className="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <Radio className="w-3 h-3 text-fuchsia-400 animate-pulse" />
                    Algorithmic Recommendation Engine
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Discover Tomorrow’s Underground Sounds
                </h2>
                <p className="text-xs text-purple-200/80 max-w-lg leading-relaxed">
                  Real-time harmonic key matching, BPM grouping, and micro-genre feeds curated directly by indie audio synthesists worldwide.
                </p>
              </div>

              <div className="flex items-center space-x-3 z-10">
                <button
                  onClick={() => playTrack(tracks[0])}
                  className="px-6 py-3.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-lg shadow-fuchsia-500/30 flex items-center space-x-2 transition-transform hover:scale-105"
                >
                  <Zap className="w-4 h-4" />
                  <span>Launch Radar Flow</span>
                </button>
              </div>
            </div>

            {/* Search & Genre Selector */}
            <div className="bg-[#1c0f38] p-5 rounded-3xl border border-purple-900/40 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Search by track, artist name, or album..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-purple-800/40 bg-[#120826] text-purple-100 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Genre:</span>
                  {genres.map(g => (
                    <button
                      key={g}
                      onClick={() => setSelectedGenre(g)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                        selectedGenre === g
                          ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/30'
                          : 'bg-[#29174d] text-purple-300 hover:bg-[#341d63] border border-purple-800/30'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Track Grid with Large Album Art */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  className={`bg-[#1c0e39] rounded-3xl border transition-all p-5 shadow-lg group hover:border-fuchsia-500/60 ${
                    currentTrack.id === track.id ? 'border-fuchsia-500 ring-1 ring-fuchsia-500/50 bg-[#25134c]' : 'border-purple-900/40'
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => playTrack(track)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-fuchsia-500/90 text-white flex items-center justify-center shadow-xl backdrop-blur-xs opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:scale-110"
                    >
                      {currentTrack.id === track.id && isPlaying ? (
                        <Pause className="w-6 h-6 fill-white" />
                      ) : (
                        <Play className="w-6 h-6 fill-white ml-1" />
                      )}
                    </button>

                    {/* Harmonic Key & BPM Pill */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-fuchsia-300 border border-purple-500/30">
                      {track.bpm} BPM • {track.key}
                    </div>

                    {/* Offline Download indicator */}
                    <button
                      onClick={() => toggleOfflineDownload(track.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        offlineDownloads.includes(track.id)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-black/60 text-purple-300 hover:text-white'
                      }`}
                      title={offlineDownloads.includes(track.id) ? 'Downloaded for Offline' : 'Download for Offline'}
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-wide">
                        {track.genre}
                      </span>
                      <span className="text-xs text-purple-400 font-mono">{track.durationStr}</span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug truncate">{track.title}</h3>
                    <p className="text-xs text-purple-300 font-medium truncate">{track.artist} — <span className="text-purple-400">{track.album}</span></p>

                    <div className="pt-3 mt-2 border-t border-purple-900/40 flex items-center justify-between text-xs">
                      <span className="text-purple-400 font-mono text-[11px]">
                        {track.playsCount.toLocaleString()} radar plays
                      </span>

                      <button
                        onClick={() => triggerShare(track.title)}
                        className="p-1.5 text-purple-400 hover:text-fuchsia-300 transition-colors"
                        title="Share Track"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CURATED PLAYLISTS */}
        {activeTab === 'playlists' && (
          <div className="space-y-6">
            <div className="bg-[#1c0f38] p-6 rounded-3xl border border-purple-900/40 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-white">Curated Algorithmic Discovery Playlists</h2>
                <p className="text-xs text-purple-300">Continuous sonic flow streams matched to specific workflow brainwaves.</p>
              </div>
              <button
                onClick={() => setShowCreatePlaylistModal(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-full text-xs font-bold shadow-md shadow-purple-600/30"
              >
                + New Playlist
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {playlists.map(pl => (
                <div key={pl.id} className="bg-[#1c0e39] rounded-3xl border border-purple-900/40 p-6 shadow-lg flex gap-5">
                  <img src={pl.cover} alt={pl.title} className="w-32 h-32 rounded-2xl object-cover shadow-md shrink-0" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest">{pl.curator}</span>
                      <h3 className="text-lg font-bold text-white mt-0.5">{pl.title}</h3>
                      <p className="text-xs text-purple-300 mt-1 line-clamp-2">{pl.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-purple-900/40 text-xs">
                      <span className="text-purple-400 font-mono">{pl.followersCount} followers</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => triggerShare(pl.title)}
                          className="p-2 text-purple-400 hover:text-white"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => playTrack(tracks[0])}
                          className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-full font-bold flex items-center space-x-1"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Stream Mix</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ARTISTS RADAR */}
        {activeTab === 'artists' && (
          <div className="space-y-6">
            <div className="bg-[#1c0f38] p-6 rounded-3xl border border-purple-900/40">
              <h2 className="text-xl font-black text-white">Underground Artists & Audio Architects</h2>
              <p className="text-xs text-purple-300">Follow electronic, lofi, and ambient synthesists for immediate unreleased drop notifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artists.map(art => (
                <div key={art.id} className="bg-[#1c0e39] rounded-3xl border border-purple-900/40 p-6 shadow-lg text-center space-y-4">
                  <img
                    src={art.avatar}
                    alt={art.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-purple-600/30 shadow-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-white">{art.name}</h3>
                    <p className="text-xs text-fuchsia-400 font-mono mt-0.5">{art.genres.join(' • ')}</p>
                    <p className="text-xs text-purple-300 mt-2 leading-relaxed line-clamp-2">{art.bio}</p>
                  </div>

                  <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between text-xs">
                    <span className="text-purple-400 font-mono">{art.followersCount} followers</span>
                    <button
                      onClick={() => toggleFollowArtist(art.id)}
                      className={`px-4 py-1.5 rounded-full font-bold transition-colors ${
                        art.isFollowed
                          ? 'bg-purple-900/60 text-purple-200 border border-purple-600'
                          : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white'
                      }`}
                    >
                      {art.isFollowed ? 'Following' : '+ Follow'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: OFFLINE VAULT */}
        {activeTab === 'offline' && (
          <div className="space-y-6">
            <div className="bg-[#1c0f38] p-6 rounded-3xl border border-purple-900/40">
              <h2 className="text-xl font-black text-white">Offline Cached Audio Vault</h2>
              <p className="text-xs text-purple-300">Tracks downloaded to client storage for zero-latency playback in flights or offline sessions.</p>
            </div>

            <div className="space-y-3">
              {offlineTrackList.length === 0 ? (
                <div className="bg-[#1c0e39] p-12 text-center rounded-3xl border border-purple-900/40 text-purple-400">
                  No tracks currently downloaded for offline streaming.
                </div>
              ) : (
                offlineTrackList.map(t => (
                  <div key={t.id} className="bg-[#1c0e39] p-4 rounded-2xl border border-purple-900/40 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={t.cover} alt={t.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-white text-sm">{t.title}</h4>
                        <p className="text-xs text-purple-300">{t.artist} • {t.durationStr}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-emerald-400 font-mono flex items-center">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> Ready Offline
                      </span>
                      <button
                        onClick={() => playTrack(t)}
                        className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-full text-xs font-bold flex items-center space-x-1"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Play</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Persistent Bottom Audio Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#160a2c]/95 backdrop-blur-xl border-t border-purple-800/40 px-4 sm:px-8 py-3.5 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Currently Playing Track Dossier */}
          <div className="flex items-center space-x-3 w-full sm:w-1/4">
            <img src={currentTrack.cover} alt={currentTrack.title} className="w-12 h-12 rounded-xl object-cover shadow-md" />
            <div className="min-w-0">
              <h4 className="font-bold text-white text-xs truncate">{currentTrack.title}</h4>
              <p className="text-[11px] text-purple-300 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Player Transport Controls & Scrub Bar */}
          <div className="flex-1 w-full max-w-xl flex flex-col items-center space-y-1.5">
            <div className="flex items-center space-x-4">
              <button onClick={prevTrack} className="text-purple-400 hover:text-white transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-fuchsia-500/30 hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button onClick={nextTrack} className="text-purple-400 hover:text-white transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Scrubber Bar */}
            <div className="w-full flex items-center space-x-2 text-[10px] font-mono text-purple-400">
              <span>{formatSec(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={currentTrack.durationSec}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                className="flex-1 accent-fuchsia-500 h-1 bg-purple-950 rounded-lg cursor-pointer"
              />
              <span>{currentTrack.durationStr}</span>
            </div>
          </div>

          {/* Volume & Details */}
          <div className="hidden sm:flex items-center justify-end space-x-4 w-1/4">
            <span className="text-[10px] font-mono text-fuchsia-400 bg-purple-950/80 px-2 py-1 rounded-md border border-purple-800/40">
              {currentTrack.bpm} BPM
            </span>
            <div className="flex items-center space-x-2 text-purple-400">
              <Volume2 className="w-4 h-4" />
              <div className="w-16 bg-purple-950 h-1 rounded-full overflow-hidden">
                <div className="bg-fuchsia-500 h-full" style={{ width: `${volume * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Playlist Modal */}
      {showCreatePlaylistModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#1c0e39] border border-purple-800/60 max-w-md w-full rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setShowCreatePlaylistModal(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-bold text-xl text-white mb-1">Create Discovery Playlist</h3>
            <p className="text-xs text-purple-300 mb-4">Curate a fresh sonic collection for community discovery.</p>

            <form onSubmit={handleCreatePlaylist} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-purple-200 mb-1">Playlist Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cyberpunk Rainy Highway Flow"
                  value={newPlaylistTitle}
                  onChange={(e) => setNewPlaylistTitle(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-purple-800/60 bg-[#120826] text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-purple-200 mb-1">Curation Description</label>
                <textarea
                  rows="3"
                  placeholder="Explain the harmonic vibe, instruments, or BPM range..."
                  value={newPlaylistDesc}
                  onChange={(e) => setNewPlaylistDesc(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-purple-800/60 bg-[#120826] text-white text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreatePlaylistModal(false)}
                  className="px-4 py-2 border border-purple-800 text-purple-300 rounded-full text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-full text-xs shadow-md shadow-purple-600/30"
                >
                  Publish Playlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
