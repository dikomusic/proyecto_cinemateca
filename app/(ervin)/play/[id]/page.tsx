import AdvancedVideoPlayer from '@/components/ervin/organims/AdvancedVideoPlayer'
import PlaybackLayout from '@/components/ervin/templates/PlaybackLayout'
import { getMovieById } from '@/lib/contentApi'

type Props = {
  params: { id: string }
}

export default async function PlayPage({ params }: Props) {
  const movie = await getMovieById(params.id)

  return (
    <PlaybackLayout>
      <AdvancedVideoPlayer movie={movie} />
    </PlaybackLayout>
  )
}
