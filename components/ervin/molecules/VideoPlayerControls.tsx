import PlayPauseButton from "../atoms/PlayPauseButton";
import RemainingTimeIndicator from "../atoms/RemainingTimeIndicator";
import QualityBadge from "../atoms/QualityBadge";
import FavoriteIcon from "../atoms/FavoriteIcon";
import ProgressBar from "../atoms/ProgressBar";

type Props = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  progress: number;
  currentSeconds: number;
  movieId: string;
  quality?: string;
  onSeek: (percent: number) => void;
  onSkip: (delta: number) => void;
  onToggleFullscreen: () => void;
  onToggleMute: () => void;
  volume: number;
  muted: boolean;
  onChange: (volume: number) => void;
};

export default function VideoPlayerControls({
  isPlaying,
  onTogglePlay,
  progress,
  currentSeconds,
  movieId,
  quality = "HD",
  onSeek,
  onSkip,
  onToggleFullscreen,
  onToggleMute,
  volume,
  muted,
  onChange,
}: Props) {
  return (
    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white select-none">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <button onClick={() => onSkip(-10)}>⏪</button>
          <PlayPauseButton isPlaying={isPlaying} onClick={onTogglePlay} />
          <button onClick={() => onSkip(10)}>⏩</button>
          <RemainingTimeIndicator currentSeconds={currentSeconds} />
        </div>
        <div className="flex items-center gap-4">
          <QualityBadge quality={quality} />
          <FavoriteIcon movieId={movieId} />
          <button
            className="text-white text-2xl hover:cursor-pointer"
            onClick={onToggleFullscreen}
            title="Pantalla completa"
          >
            ⛶
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMute}
              className="text-white text-xl hover:opacity-80"
              title="Mute / Unmute"
            >
              {muted ? "🔇" : "🔊"}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              className="w-24 h-2 accent-blue-500 cursor-pointer"
              title="Volumen"
            />
          </div>
        </div>
      </div>
      <ProgressBar progress={progress} onSeek={onSeek} />
    </div>
  );
}
