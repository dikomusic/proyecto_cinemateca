import ExerciseHeader from '@/components/organisms/ExerciseHeader';
import ExerciseList from '@/components/organisms/ExerciseList';

interface Exercise {
  id: string;
  name: string;
  series: number;
  repetitions: number;
  image: string;
}

interface ExerciseTemplateProps {
  exercises: Exercise[];
  onExerciseClick?: (exercise: Exercise) => void;
}

export default function ExerciseTemplate({ exercises, onExerciseClick }: ExerciseTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-md mx-auto">
        <ExerciseHeader title="Exercícios" count={exercises.length} />
        <ExerciseList exercises={exercises} onExerciseClick={onExerciseClick} />
      </div>
    </div>
  );
}
