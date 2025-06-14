import ExerciseTitle from '@/components/atoms/ExerciseTitle';
import ExerciseSubtitle from '@/components/atoms/ExerciseSubtitle';

interface ExerciseContentProps {
  name: string;
  series: number;
  repetitions: number;
}

export default function ExerciseContent({ name, series, repetitions }: ExerciseContentProps) {
  return (
    <div className="flex-1">
      <ExerciseTitle className="mb-1">{name}</ExerciseTitle>
      <ExerciseSubtitle series={series} repetitions={repetitions} />
    </div>
  );
}
