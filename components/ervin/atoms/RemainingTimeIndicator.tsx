type Props = {
  currentSeconds: number;
};

const formatTime = (seconds: number) => {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function CurrentTimeIndicator({ currentSeconds }: Props) {
  return <span className="text-sm">{formatTime(currentSeconds)}</span>;
}
