'use client';

import { useEffect, useRef } from 'react';

type BoomerangVideoBgProps = {
  src: string;
};

export function BoomerangVideoBg({ src }: BoomerangVideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let direction: 1 | -1 = 1;
    let lastTs = performance.now();

    const startPingPong = () => {
      video.currentTime = 0;
      void video.play();

      const tick = (now: number) => {
        const dt = Math.min((now - lastTs) / 1000, 0.05);
        lastTs = now;

        if (direction === 1) {
          if (video.paused && !video.ended) {
            void video.play();
          }
          if (
            video.ended ||
            (video.duration > 0 && video.currentTime >= video.duration - 0.04)
          ) {
            direction = -1;
            video.pause();
          }
        } else {
          video.currentTime = Math.max(0, video.currentTime - dt);
          if (video.currentTime <= 0.02) {
            direction = 1;
            void video.play();
          }
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    const handleReady = () => {
      startPingPong();
    };

    const tryPlay = () => {
      if (video.paused) {
        void video.play();
      }
    };

    if (video.readyState >= 2) {
      handleReady();
    } else {
      video.addEventListener('loadeddata', handleReady, { once: true });
    }

    video.addEventListener('canplay', tryPlay);
    document.addEventListener('click', tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });

    return () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', tryPlay);
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [src]);

  return (
    <div className="absolute inset-0 z-0 scale-[1.15] origin-top overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}
