// app/movie/[slug]/page.tsx
import HeroSection from '../../../components/ui/movie-ui/HeroSection'; // Adjust path as needed
import PostCard from '../../../components/ui/movie-ui/PostCard'; // Adjust path as needed
import TrendingSection from '../../../components/ui/movie-ui/TrendingSection'; // Adjust path as needed
import Footer from '../../../components/ui/movie-ui/Footer'; // Adjust path as needed
import { notFound } from 'next/navigation';

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genres: { name: string }[];
  poster_path: string | null; // Can be null
  backdrop_path: string | null; // Can be null
  credits: {
    crew: { job: string; name: string }[];
    cast: { name: string }[];
  };
  runtime: number | null; // Can be null for TV shows or if not available
}

async function searchAndGetMovieDetails(movieTitle: string): Promise<MovieDetails | null> {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!API_KEY) {
    console.error('TMDB API Key is not set in environment variables.');
    return null;
  }

  try {
    // Step 1: Search for the movie by title
    const searchRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieTitle)}`
    );

    if (!searchRes.ok) {
      console.error(`TMDB Search failed: ${searchRes.statusText}`);
      return null;
    }

    const searchData = await searchRes.json();
    if (!searchData.results || searchData.results.length === 0) {
      console.warn(`No movie found for title: ${movieTitle}`);
      return null; // No movie found with this title
    }

    // For simplicity, take the first result.
    // In a real application, you might want to show a list of results
    // or have a more sophisticated way to pick the most relevant one.
    const movieId = searchData.results[0].id;

    // Step 2: Fetch detailed information for the found movie ID
    const detailsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
    );

    if (!detailsRes.ok) {
      console.error(`TMDB Details fetch failed for ID ${movieId}: ${detailsRes.statusText}`);
      return null;
    }

    const movieDetails: MovieDetails = await detailsRes.json();
    return movieDetails;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

interface MoviePageProps {
  params: {
    slug?: string; // The dynamic part of the URL, e.g., 'interstellar'
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieSlug = params.slug;

  if (!movieSlug) {
    // If no slug is provided, navigate to a general movie list or 404
    notFound();
  }

  // Convert the slug (e.g., 'interstellar') into a search query (e.g., 'Interstellar')
  // You might want to refine this (e.g., replace hyphens with spaces and capitalize words)
  const movieTitleQuery = movieSlug.replace(/-/g, ' ');

  const movie = await searchAndGetMovieDetails(movieTitleQuery);

  if (!movie) {
    notFound(); // Render Next.js 404 page if movie not found
  }

  // Extract director and stars
  const director = movie.credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A';
  const stars =
    movie.credits?.cast
      ?.slice(0, 10) // Get top 10 cast members
      .map(person => person.name)
      .join(', ') || 'N/A';

  // Format genres
  const genres = movie.genres?.map(g => g.name).join(', ') || 'N/A';

  // Format release year
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear().toString()
    : 'N/A';

  // Determine age rating (TMDB often provides 'release_dates' for certifications, but it's complex.
  // For simplicity, we'll generalize or use a placeholder if runtime is present.
  // For proper age rating, you'd fetch /movie/{movie_id}/release_dates and parse results.)
  const ageRating = 'N/A'; // Or implement more robust logic using TMDB's certifications

  // Choose a suitable backdrop image. TMDB backdrop_path is usually better for hero.
  const heroBgImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path // Fallback to poster if no backdrop
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : 'https://via.placeholder.com/1280x720.png?text=No+Image+Available'; // Generic placeholder

  return (
    <>
      <HeroSection
        title={movie.title}
        overview={movie.overview}
        rating={movie.vote_average.toFixed(1)}
        year={releaseYear}
        genres={genres}
        ageRating={ageRating}
        director={director}
        stars={stars}
        backgroundImage={heroBgImage}
      />

      <div className="mx-auto max-w-7xl">
        <main className="container mt-8 grid grid-cols-1 px-4 py-8 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          <section className="col-span-full md:col-span-2 lg:col-span-3">
            <h2 className="text-red-netflix mb-8 text-center text-4xl font-extrabold drop-shadow-md">
              Community Discussions
            </h2>

            <div className="bg-dark-secondary border-dark-red mb-6 flex items-center justify-center rounded-lg border p-4 shadow-lg md:justify-start">
              <div className="flex space-x-6">
                <button className="text-red-netflix border-red-netflix flex items-center border-b-2 pb-1 font-bold transition-colors duration-200">
                  <i className="fas fa-fire mr-2"></i> Hot
                </button>
                <button className="hover:text-red-netflix flex items-center text-gray-400 transition-colors duration-200">
                  <i className="fas fa-arrow-up mr-2"></i> New
                </button>
                <button className="hover:text-red-netflix flex items-center text-gray-400 transition-colors duration-200">
                  <i className="fas fa-star mr-2"></i> Top
                </button>
              </div>
              <button className="hover:text-red-netflix ml-auto hidden text-gray-400 transition-colors duration-200 md:block">
                <i className="fas fa-ellipsis-h text-lg"></i>
              </button>
            </div>

            <div id="posts-container" className="space-y-8">
              {/* You would fetch and render dynamic posts related to this movie here */}
              <PostCard
                avatarSrc="https://i.pravatar.cc/32?img=11"
                username="u/MovieFan"
                timeAgo="1 hour ago"
                tag="#Review"
                title={`My take on ${movie.title}`}
                content={`Just finished watching ${movie.title} again. The cinematography is breathtaking! What did you think?`}
                initialUpvotes={150}
                commentsCount={30}
              />
              <PostCard
                avatarSrc="https://i.pravatar.cc/32?img=12"
                username="u/TheoryCraft"
                timeAgo="3 hours ago"
                tag="#Discussion"
                title={`Plot Holes in ${movie.title}?`}
                content={`Are there any plot points in ${movie.title} that didn't quite make sense to you? Let's discuss!`}
                initialUpvotes={80}
                commentsCount={15}
              />
            </div>
          </section>

          <TrendingSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
