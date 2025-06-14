interface ExerciseSubtitleProps {
  series: number;
  repetitions: number;
  className?: string;
}

export default function ExerciseSubtitle({ series, repetitions, className = '' }: ExerciseSubtitleProps) {
  return (
    <p className={`text-gray-400 text-sm ${className}`}>
      {series} séries x {repetitions} repetições
    </p>
  );
}
