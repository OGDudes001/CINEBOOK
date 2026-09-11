import { useEffect, useRef, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { TransactionCard, type TransactionCardProps } from "@/components/ui/transaction-card";
// Mock transaction data matching your mockup
const MOCK_TRANSACTIONS: TransactionCardProps[] = [
  {
    id: "1",
    title: "Demon Slayer: Infinity Castle",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop",
    date: "Aug 30, 2025",
    time: "1:00 PM",
    location: "SM City Cebu",
    genres: ["Action", "Adventure", "Fantasy"],
    refCode: "CB-20250830-0012",
    seats: ["B12", "B13", "B14"],
    paymentMethod: "GCash",
    amount: 450.0,
    status: "Completed",
  },
  {
    id: "2",
    title: "John Wick 4",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop",
    date: "Aug 30, 2025",
    time: "6:00 PM",
    location: "SM City Cebu",
    genres: ["Action", "Thriller", "Crime"],
    refCode: "CB-20250830-0013",
    seats: ["E7", "E8"],
    paymentMethod: "Maya",
    amount: 360.0,
    status: "Completed",
  },
  {
    id: "3",
    title: "Inside Out 2",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&auto=format&fit=crop",
    date: "Aug 30, 2025",
    time: "8:30 PM",
    location: "Robinsons Galleria",
    genres: ["Animation", "Comedy", "Family"],
    refCode: "CB-20250830-0014",
    seats: ["C5", "C6"],
    paymentMethod: "GCash",
    amount: 320.0,
    status: "Completed",
  },
  {
    id: "4",
    title: "The Batman",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop",
    date: "Aug 29, 2025",
    time: "4:00 PM",
    location: "SM City Cebu",
    genres: ["Action", "Crime", "Drama"],
    refCode: "CB-20250829-0008",
    seats: ["A10", "A11"],
    paymentMethod: "Maya",
    amount: 400.0,
    status: "Completed",
  },
  {
    id: "5",
    title: "Kung Fu Panda 4",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&auto=format&fit=crop",
    date: "Aug 31, 2025",
    time: "2:00 PM",
    location: "SM City Cebu",
    genres: ["Animation", "Action", "Comedy"],
    refCode: "CB-20250831-0007",
    seats: ["D9", "D10"],
    paymentMethod: "GCash",
    amount: 300.0,
    status: "Pending", // Displays as 'Upcoming'
  },
];

const TABS = ["All", "Upcoming", "Completed", "Cancelled"] as const;
type TabType = (typeof TABS)[number];

export function TransactionsSection1() {
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter transactions based on tab and search query
  const filteredTransactions = MOCK_TRANSACTIONS.filter((item) => {
    // Status Filter
    let matchesTab = true;
    if (activeTab === "Upcoming") matchesTab = item.status === "Pending";
    else if (activeTab === "Completed") matchesTab = item.status === "Completed";
    else if (activeTab === "Cancelled") matchesTab = item.status === "Cancelled";

    // Search Filter
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.refCode.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0b0e13] text-white py-10 px-6 md:px-12"
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

      <div className="container mx-auto space-y-6">
        
        {/* Top Controls: Status Tabs + Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
                    isActive
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/30"
                      : "bg-[#12171f] text-gray-400 border-gray-800 hover:text-white hover:border-gray-700"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-80 flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by movie title or reference code..."
              className="w-full bg-[#12171f] border border-gray-800 rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
            />
          </div>

        </div>

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredTransactions.map((tx, index) => (
              <div
                key={tx.id}
                className={`w-full opacity-0 ${
                  isVisible ? "animate-card-up" : ""
                }`}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <TransactionCard
                  id={tx.id}
                  image={tx.image}
                  title={tx.title}
                  date={tx.date}
                  time={tx.time}
                  location={tx.location}
                  genres={tx.genres}
                  refCode={tx.refCode}
                  seats={tx.seats}
                  paymentMethod={tx.paymentMethod}
                  amount={tx.amount}
                  status={tx.status}
                  onViewTicket={() => {
                    // Open Ticket Modal or Details
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center space-y-2 bg-[#12171f]/50 rounded-2xl border border-gray-800/50">
            <p className="text-gray-400 text-sm">No transactions found.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredTransactions.length > 0 && (
          <div className="flex items-center justify-center gap-3 pt-6 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

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