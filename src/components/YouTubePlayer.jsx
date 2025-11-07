import { useEffect, useRef } from 'react';

export function YouTubePlayer({ 
  videoId, 
  //isPlaying, 
  volume, 
  onPlayerReady,
  onStateChange 
}) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  useEffect(() => {
    if (videoId && containerRef.current) {
      const initPlayer = () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        playerRef.current = new window.YT.Player(containerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            loop: 1,
            playlist: videoId, // Required for looping single video
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(volume);
              event.target.playVideo();
              onPlayerReady(event.target);
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                onStateChange(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                onStateChange(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                onStateChange(false);
              }
            },
          },
        });
      };

      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        window.onYouTubeIframeAPIReady = initPlayer;
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <div className="fixed bottom-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
      <div ref={containerRef} />
    </div>
  );
}
