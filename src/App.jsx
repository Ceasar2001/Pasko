import { useState, useRef } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { MusicSidebar } from './components/MusicSidebar';
import { Snowflakes } from './components/Snowflakes';
import { YouTubePlayer } from './components/YouTubePlayer';


export default function App() {
  const [currentEvent, setCurrentEvent] = useState('christmas');
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const playerRef = useRef(null);

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const handleStop = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (playerRef.current) {
      playerRef.current.setVolume(value[0]);
    }
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };

  const handleStateChange = (playing) => {
    setIsPlaying(playing);
  };

  return (
  <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-red-900 via-green-900 to-red-900">
    <Snowflakes />

    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 text-9xl">❄️</div>
      <div className="absolute top-20 right-20 text-9xl">🎄</div>
      <div className="absolute bottom-10 left-1/4 text-9xl">⭐</div>
      <div className="absolute bottom-20 right-1/3 text-9xl">🎁</div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl">✨</div>
    </div>

    <YouTubePlayer
      videoId={selectedSong?.videoId || null}
      isPlaying={isPlaying}
      volume={volume[0]}
      onPlayerReady={handlePlayerReady}
      onStateChange={handleStateChange}
    />

    <MusicSidebar
      currentEvent={currentEvent}
      selectedSong={selectedSong}
      isPlaying={isPlaying}
      volume={volume}
      onSongSelect={handleSongSelect}
      onTogglePlay={handleTogglePlay}
      onStop={handleStop}
      onVolumeChange={handleVolumeChange}
    />

    <main className="relative z-10 flex items-center justify-center h-full w-full p-4">
      <div className="w-full max-w-3xl">
        <CountdownTimer onEventChange={setCurrentEvent} />
      </div>
    </main>

    <footer className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-lg z-10">
      <p>May your holidays be filled with joy and wonder! ✨</p>
    </footer>
  </div>
);
}
