"use client";

import { useEffect, useRef, useState } from "react";
import VideoPlayerControls from "../molecules/VideoPlayerControls";
import { Movie } from "@/types/ervin.types";

type Props = {
  movie: Movie;
};

export default function AdvancedVideoPlayer({ movie }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          togglePlayback();
          break;
        case "m":
          e.preventDefault();
          setMuted((prev) => !prev);
          break;
        case "arrowup":
          e.preventDefault();
          setVolume((prev) => Math.min(1, prev + 0.1));
          setMuted(false);
          break;
        case "arrowdown":
          e.preventDefault();
          setVolume((prev) => Math.max(0, prev - 0.1));
          setMuted(false);
          break;
        case "k":
          e.preventDefault();
          togglePlayback();
          break;
        case "arrowright":
          e.preventDefault();
          skip(10);
          break;
        case "arrowleft":
          e.preventDefault();
          skip(-10);
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = muted;
    }
  }, [volume, muted]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += seconds;

    const dur = videoRef.current.duration;
    const cur = videoRef.current.currentTime + seconds;
    setCurrentTime(cur);
    setProgress((cur / dur) * 100);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const current = video.currentTime;
    const duration = video.duration;
    setProgress((current / duration) * 100);
    setCurrentTime(current);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current?.duration) {
      setCurrentTime(videoRef.current.duration);
    }
  };

  const handleSeek = (percent: number) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const time = (percent / 100) * videoRef.current.duration;
    videoRef.current.currentTime = time;

    setCurrentTime(time);
    setProgress(percent);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  const handleVideoClick = () => togglePlayback();

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        src={movie.videoUrl}
        className="w-full h-full object-contain bg-black"
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls={false}
      />

      <VideoPlayerControls
        onToggleMute={() => setMuted((prev) => !prev)}
        volume={volume}
        muted={muted}
        onChange={setVolume}
        isPlaying={isPlaying}
        onTogglePlay={togglePlayback}
        progress={progress}
        currentSeconds={currentTime}
        movieId={movie.id}
        quality={movie.quality}
        onSeek={handleSeek}
        onSkip={skip}
        onToggleFullscreen={toggleFullscreen}
      />
    </div>
  );
}
