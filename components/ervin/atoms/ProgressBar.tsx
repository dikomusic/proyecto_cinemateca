type Props = {
  progress: number // 0–100
  onSeek?: (percent: number) => void
}

export default function ProgressBar({ progress, onSeek }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = (x / rect.width) * 100
    onSeek(percent)
  }

  return (
    <div className="w-full h-2 bg-gray-700 rounded hover:cursor-pointer" onClick={handleClick}>
      <div
        className="h-full bg-blue-500 rounded"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}
