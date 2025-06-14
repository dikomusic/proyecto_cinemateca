import ExerciseImage from '@/components/atoms/ExerciseImage';
import ExerciseContent from '@/components/molecules/ExerciseContent';
import ChevronIcon from '@/components/atoms/ChevronIcon';

interface Exercise {
  id: string;
  name: string;
  series: number;
  repetitions: number;
  image: string;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

export default function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <div 
      className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <ExerciseImage 
        src={exercise.image}
        alt={exercise.name}
        className="w-16 h-16"
      />
      <ExerciseContent 
        name={exercise.name}
        series={exercise.series}
        repetitions={exercise.repetitions}
      />
      <ChevronIcon />
    </div>
  );
}
