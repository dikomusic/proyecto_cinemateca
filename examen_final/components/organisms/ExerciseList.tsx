import ExerciseCard from '@/components/molecules/ExerciseCard';

interface Exercise {
  id: string;
  name: string;
  series: number;
  repetitions: number;
  image: string;
}

interface ExerciseListProps {
  exercises: Exercise[];
  onExerciseClick?: (exercise: Exercise) => void;
}

export default function ExerciseList({ exercises, onExerciseClick }: ExerciseListProps) {
  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <ExerciseCard 
          key={exercise.id}
          exercise={exercise}
          onClick={() => onExerciseClick?.(exercise)}
        />
      ))}
    </div>
  );
}
