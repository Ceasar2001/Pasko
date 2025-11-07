import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { ScrollArea } from './ui/scroll-area';
import { Music, Play, Pause, Square, Volume2 } from 'lucide-react';
import { motion } from "framer-motion";

const songs = [
  { id: '1', title: 'Last Christmas', videoId: 'ReK9MVrOq0w', type: 'christmas' },
  { id: '2', title: 'Jingle Bells', videoId: '3CWJNqyub3o', type: 'christmas' },
  { id: '3', title: 'This is Indian dont play haha', videoId: 'qrm8w-pV120', type: 'christmas' },
  { id: '4', title: 'Jose Mari Chan Christmas Songs', videoId: 'A75gZYk6gOg', type: 'christmas' },
  { id: '5', title: 'It\'s Beginning to Look a Lot Like Christmas', videoId: 'AN_R4pR1hck', type: 'christmas' },
  { id: '6', title: 'It\'s Christmas Time', videoId: 'zl-d6tHDFxs', type: 'christmas' },
  { id: '7', title: 'FREDDIE AGUILAR CHRISTMAS SONGS ', videoId: 'XplPzU_VidA', type: 'christmas' },
  { id: '8', title: 'Pamaskong Pilipino', videoId: 'IbBwAwzPuug', type: 'christmas' },
  { id: '9', title: 'Happy New Year - ABBA', videoId: '3Kwg58zq6UU', type: 'newyear' },
  { id: '10', title: 'Auld Lang Syne', videoId: 'qLfX2UkicF0', type: 'newyear' },
  { id: '11', title: 'Celebration - Kool & The Gang', videoId: '3GwjfUFyY6M', type: 'newyear' },
  { id: '12', title: 'What Are You Doing New Year\'s Eve', videoId: 'at3XxZqmDVc', type: 'newyear' },
];

export function MusicSidebar({ 
  currentEvent,
  selectedSong,
  isPlaying,
  volume,
  onSongSelect,
  onTogglePlay,
  onStop,
  onVolumeChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredSongs = songs.filter(song => song.type === currentEvent);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            size="lg" 
            className="fixed top-4 right-4 z-40 bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white rounded-full shadow-lg"
          >
            <Music className="mr-2 h-5 w-5" />
            Music
            {isPlaying && (
              <motion.div
                className="ml-2 w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[350px] sm:w-[400px] bg-gradient-to-b from-red-50 to-green-50">
          <SheetHeader>
            <SheetTitle className="text-2xl text-red-700">
              {currentEvent === 'christmas' ? '🎄 Christmas Songs' : '🎆 New Year Songs'}
            </SheetTitle>
            <SheetDescription>
              Select a song to play festive music
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {/* Song List */}
            <ScrollArea className="h-[300px] rounded-lg border p-4 bg-white/50">
              <div className="space-y-2">
                {filteredSongs.map((song) => (
                  <Card
                    key={song.id}
                    className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                      selectedSong?.id === song.id 
                        ? 'bg-gradient-to-r from-red-100 to-green-100 border-red-400' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => onSongSelect(song)}
                  >
                    <div className="flex items-center gap-2">
                      <Music className={`h-4 w-4 ${selectedSong?.id === song.id ? 'text-red-600' : 'text-gray-600'}`} />
                      <span className="text-sm">{song.title}</span>
                      {selectedSong?.id === song.id && isPlaying && (
                        <motion.div
                          className="ml-auto flex gap-0.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-red-600 rounded-full"
                              animate={{ height: ['4px', '12px', '4px'] }}
                              transition={{ 
                                duration: 0.6, 
                                repeat: Infinity,
                                delay: i * 0.1,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            {/* Player Controls */}
            {selectedSong && (
              <Card className="p-4 bg-white/80">
                <p className="mb-4 text-center text-sm text-gray-700">
                  Now Playing: <span className="text-red-700">{selectedSong.title}</span>
                </p>

                {/* Controls */}
                <div className="flex justify-center gap-2 mb-4">
                  <Button
                    size="sm"
                    onClick={onTogglePlay}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    onClick={onStop}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                </div>

                {/* Volume */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Volume: {volume[0]}%</span>
                  </div>
                  <Slider
                    value={volume}
                    onValueChange={onVolumeChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </Card>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Music Playing Indicator (when sidebar is closed) */}
      {!isOpen && selectedSong && isPlaying && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-4 right-4 z-30 bg-gradient-to-r from-red-600 to-green-600 text-white px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-2"
        >
          <Music className="h-4 w-4" />
          <span className="max-w-[150px] truncate">{selectedSong.title}</span>
          <motion.div
            className="flex gap-0.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-white rounded-full"
                animate={{ height: ['3px', '10px', '3px'] }}
                transition={{ 
                  duration: 0.6, 
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
