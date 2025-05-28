import { Metadata } from "next";
import { getMovieById } from "@/lib/contentApi";
import CatalogLayout from "@/components/ervin/templates/CatalogLayout";
import MovieCard from "@/components/ervin/molecules/MovieCard";
import ExtendedInfoBlock from "@/components/ervin/molecules/ExtendedInfoBlock";
import RatingWithComments from "@/components/ervin/molecules/RatingWithComments";


type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovieById(params.id);
  return { title: movie.title };
}

export default async function ContentDetailPage({ params }: Props) {
  const movie = await getMovieById(params.id);

  return (
    <CatalogLayout>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <MovieCard movie={movie} />
        <ExtendedInfoBlock movie={movie} />
      </div>
      <RatingWithComments movieId={params.id} />
    </CatalogLayout>
  );
}
