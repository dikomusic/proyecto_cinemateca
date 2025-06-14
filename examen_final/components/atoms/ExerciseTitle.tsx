interface ExerciseTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function ExerciseTitle({ children, className = '' }: ExerciseTitleProps) {
  return (
    <h3 className={`font-semibold text-white ${className}`}>
      {children}
    </h3>
  );
}
