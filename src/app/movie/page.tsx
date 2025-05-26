// app/page.tsx (for Next.js 13+ App Router)
import HeroSection from '@/components/ui/movie-ui/HeroSection';
import PostCard from '@/components/ui/movie-ui/PostCard';
import TrendingSection from '@/components/ui/movie-ui/TrendingSection';
import Footer from '@/components/ui/movie-ui/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />

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
              <PostCard
                avatarSrc="https://i.pravatar.cc/32?img=11"
                username="u/ElevenFanatic"
                timeAgo="2 hours ago"
                tag="#Theory"
                title="Mind-Blowing Theory: Vecna's True Puppet Master? 🤔"
                content="I've been rewatching everything, and there are subtle hints that Vecna might not be the top of the food chain. What if the *real* big bad is... Will Byers, corrupted by the Upside Down's influence since S1? His connection is too strong, his art is too predictive. Discuss!"
                initialUpvotes={1200}
                commentsCount={256}
              />
              <PostCard
                avatarSrc="https://i.pravatar.cc/32?img=12"
                username="u/HawkinsHero"
                timeAgo="5 hours ago"
                tag="#Characters"
                title="Beyond Steve: Who Had The Most Unexpected Glow-Up? ✨"
                content="Okay, Steve's arc is legendary, but who else truly surprised you with their character development? I'm thinking about Nancy's transformation into a fearless investigative journalist, or even Lucas stepping up as a true leader. Thoughts?"
                initialUpvotes={890}
                commentsCount={180}
              />
              <PostCard
                avatarSrc="https://i.pravatar.cc/32?img=13"
                username="u/DemogorgonHunter"
                timeAgo="1 day ago"
                tag="#Cosplay"
                title="My Latest Project: Demogorgon Cosplay, Next Level! 🤯"
                imageUrl="https://m.media-amazon.com/images/I/71uK2L0GzJL._AC_UF894,1000_QL80_.jpg"
                content="Took me weeks, but I finally finished my Demogorgon cosplay for this year's Comic-Con! Focused on realistic textures and articulated 'petals.' Super happy with how it turned out. Thoughts? Any tips for future improvements?"
                initialUpvotes={1500}
                commentsCount={300}
              />
              <PostCard
                avatarSrc="https://i.pravatar.cc/32?img=14"
                username="u/DustinFanClub"
                timeAgo="1 day ago"
                tag="#Discussion"
                title="Unpopular Opinion: Season 3 is STILL the best! Change my mind."
                content="From the Starcourt Mall chaos to the unexpected emotional depth, S3 just hit different. The action was intense, the humor was top-notch, and the character dynamics were on point. Am I alone in this?"
                initialUpvotes={550}
                commentsCount={95}
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
