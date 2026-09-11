import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FavoriteCard } from "@/components/ui/favorite-card";

// Mock saved favorites data
const INITIAL_FAVORITES = [
  {
    id: "1",
    title: "Demon Slayer: Infinity Castle",
    genres: ["Action", "Adventure", "Fantasy"],
    date: "Aug 30, 2025",
    time: "1:00 PM",
    availableSeats: 120,
    totalSeats: 150,
    location: "SM City Cebu",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "How to Train Your Dragon",
    genres: ["Animation", "Adventure", "Family"],
    date: "Aug 30, 2025",
    time: "3:30 PM",
    availableSeats: 98,
    totalSeats: 120,
    location: "Gaisano Grand",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "John Wick 4",
    genres: ["Action", "Thriller", "Crime"],
    date: "Aug 30, 2025",
    time: "6:00 PM",
    availableSeats: 45,
    totalSeats: 100,
    location: "SM City Cebu",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Inside Out 2",
    genres: ["Animation", "Comedy", "Family"],
    date: "Aug 30, 2025",
    time: "8:30 PM",
    availableSeats: 200,
    totalSeats: 200,
    location: "Robinsons Galleria",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "The Batman",
    genres: ["Action", "Crime", "Drama"],
    date: "Aug 29, 2025",
    time: "4:00 PM",
    availableSeats: 0,
    totalSeats: 120,
    location: "SM City Cebu",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Deadpool & Wolverine",
    genres: ["Action", "Comedy", "Adventure"],
    date: "Aug 30, 2025",
    time: "11:00 AM",
    availableSeats: 75,
    totalSeats: 120,
    location: "Gaisano Grand",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Kung Fu Panda 4",
    genres: ["Animation", "Action", "Comedy"],
    date: "Aug 31, 2025",
    time: "2:00 PM",
    availableSeats: 110,
    totalSeats: 150,
    location: "SM City Cebu",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop",
  },
  {
    id: "8",
    title: "The Super Mario Bros. Movie",
    genres: ["Animation", "Adventure", "Family"],
    date: "Aug 31, 2025",
    time: "5:00 PM",
    availableSeats: 95,
    totalSeats: 120,
    location: "Gaisano Grand",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop",
  },
];

export function FavoritesSection1() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0b0e13] text-white py-12 px-6 md:px-12"
    >
      <style>{`
        @keyframes fadeInUpCard {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-card-up {
          animation: fadeInUpCard 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="container mx-auto">
        {/* Responsive Grid Layout */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((movie, index) => (
              <div
                key={movie.id}
                className={`w-full flex justify-center opacity-0 ${
                  isVisible ? "animate-card-up" : ""
                }`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <FavoriteCard
                  id={movie.id}
                  image={movie.image}
                  title={movie.title}
                  genres={movie.genres}
                  date={movie.date}
                  time={movie.time}
                  availableSeats={movie.availableSeats}
                  totalSeats={movie.totalSeats}
                  location={movie.location}
                  onRemove={() => handleRemove(movie.id)}
                  onViewDetails={() => {
                    // Navigate to details page
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty Favorites Fallback */
          <div className="py-20 text-center space-y-3">
            <p className="text-lg text-gray-400">No favorite movies saved yet.</p>
          </div>
        )}

        {/* Pagination Bar */}
        {favorites.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-12 text-sm">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                  currentPage === page
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}