type Props = {
  isPlaying: boolean;
  onClick: () => void;
};

export default function PlayPauseButton({ isPlaying, onClick }: Props) {
  return (
    <button onClick={onClick} className="text-white text-2xl hover:cursor-pointer">
      {isPlaying ? "⏸" : "▶️"}
    </button>
  );
}
