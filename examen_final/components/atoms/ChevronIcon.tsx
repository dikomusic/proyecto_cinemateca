interface ChevronIconProps {
  className?: string;
}

export default function ChevronIcon({ className = '' }: ChevronIconProps) {
  return (
    <svg 
      className={`text-gray-400 ${className}`} 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="9,18 15,12 9,6"></polyline>
    </svg>
  );
}
