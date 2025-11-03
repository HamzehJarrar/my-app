import Image from "next/image";
import BackButton from "@/components/BackButton/BackButton";

interface Props {
  params: { id: string };
}

interface Trailer {
  key: string;
  site: string;
  type: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}
interface Genre {
  id: number;
  name: string;
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;

  const apiKey = "0fc676e7190331fa5aaae2651a56bf20";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`,
    { cache: "no-store" }
  );
  const movie = await res.json();
  const trailer = movie.videos?.results?.find(
    (v: Trailer) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white p-10 space-y-10">
      <div className="max-w-6xl mx-auto">
        <BackButton />
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative w-[300px] h-[450px] rounded-xl overflow-hidden shadow-lg">
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="300px"
              className="object-cover"
            />
          )}
        </div>

        <div className="space-y-4 flex-1">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <p className="opacity-80 text-lg">
            {movie.overview || "No description available."}
          </p>

          <p className="text-yellow-400 text-lg font-semibold">
            ⭐ {movie.vote_average?.toFixed?.(1) ?? "N/A"} / 10
          </p>

          <p className="text-sm text-gray-400">
            Runtime: {movie.runtime ? `${movie.runtime} min` : "N/A"}
          </p>

          <p className="text-sm text-gray-400">
            Genres:{" "}
            {movie.genres
              ? movie.genres.map((g: Genre) => g.name).join(", ")
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Top Cast</h2>

        <div className="flex gap-5 overflow-x-auto pb-3">
          {movie.credits?.cast?.slice(0, 10)?.map((actor: CastMember) => (
            <div key={actor.id} className="w-[120px] text-center">
              <div className="relative w-[120px] h-[150px] rounded-lg overflow-hidden mb-2">
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                      : "/images/person.png"
                  }
                  alt={actor.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium">{actor.name}</p>
              <p className="text-xs opacity-70">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {trailer && (
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Trailer</h2>
          <iframe
            className="w-full h-[400px] rounded-xl"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
