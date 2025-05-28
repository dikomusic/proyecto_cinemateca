type Props = {
  quality: string;
};

export default function QualityBadge({ quality }: Props) {
  return (
    <span className="text-xs bg-white text-black px-2 py-0.5 rounded font-semibold hover:cursor-pointer">
      {quality}
    </span>
  );
}
