import { useEffect, useRef, useState, type ComponentProps } from "react";
import { MovieCard } from "@/components/ui/movie-card";

// Extract the exact status type expected by MovieCard
type MovieCardStatus = ComponentProps<typeof MovieCard>["status"];

interface Movie {
  id: string;
  title: string;
  genres: string[];
  date: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
  location: string;
  status: MovieCardStatus;
  image: string;
}

const NOW_SHOWING_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Demon Slayer: Infinity Castle",
    genres: ["Action", "Adventure", "Fantasy"],
    date: "Aug 30, 2025",
    time: "1:00 PM",
    availableSeats: 120,
    totalSeats: 150,
    location: "SM City Cebu",
    status: "Available" as MovieCardStatus,
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
    status: "Available" as MovieCardStatus,
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
    status: "Available" as MovieCardStatus,
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
    status: "Available" as MovieCardStatus,
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
    status: "Full" as MovieCardStatus,
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
    status: "Available" as MovieCardStatus,
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
    status: "Available" as MovieCardStatus,
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
    status: "Available" as MovieCardStatus,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop",
  },
];

export function HomeSection1() {
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

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-cine-bg text-white py-12 px-6 md:px-12"
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Now Showing
            </h2>
            <div className="w-8 h-1 bg-cine-red rounded-full mt-1.5" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {NOW_SHOWING_MOVIES.map((movie, index) => (
            <div
              key={movie.id}
              className={`w-full flex justify-center opacity-0 ${
                isVisible ? "animate-card-up" : ""
              }`}
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <MovieCard
                image={movie.image}
                title={movie.title}
                genres={movie.genres}
                date={movie.date}
                time={movie.time}
                availableSeats={movie.availableSeats}
                totalSeats={movie.totalSeats}
                location={movie.location}
                status={movie.status}
                onViewDetails={() => {
                  // Handle view details navigation
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}