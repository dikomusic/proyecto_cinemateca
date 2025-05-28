// Formatea segundos como "mm:ss" o "hh:mm:ss"
export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const padded = (n: number) => n.toString().padStart(2, "0");

  if (hrs > 0) return `${hrs}:${padded(mins)}:${padded(secs)}`;
  return `${mins}:${padded(secs)}`;
}

// Devuelve el porcentaje de progreso dado el tiempo actual y duración total
export function calculateProgress(current: number, duration: number): number {
  if (!duration || duration === 0) return 0;
  return (current / duration) * 100;
}
