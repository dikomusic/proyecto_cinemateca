interface ExerciseHeaderProps {
  title: string;
  count: number;
}

export default function ExerciseHeader({ title, count }: ExerciseHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-white text-2xl font-bold">{title}</h1>
        <p className="text-gray-400 text-sm">Item</p>
      </div>
      <span className="text-white text-lg font-semibold">{count}</span>
    </div>
  );
}
