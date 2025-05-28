import { Genre } from "@/types/ervin.types"

type Props = {
  selected: string | null
  onSelect: (genre: string | null) => void
}

const genres : Genre[] = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Science Fiction',
  'Romance',
]

export default function GenreSelector({ selected, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-center">Géneros</h2>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => onSelect(null)}
          className={`px-4 py-2 rounded border transition ${
            selected === null
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
          }`}
        >
          Todos
        </button>

        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onSelect(selected === genre ? null : genre)}
            className={`px-4 py-2 rounded border transition ${
              selected === genre
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}
