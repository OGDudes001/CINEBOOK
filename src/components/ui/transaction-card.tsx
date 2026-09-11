import { Calendar, MapPin, Film, Ticket, Armchair, CreditCard, ChevronRight } from "lucide-react";

export interface TransactionCardProps {
  id: string;
  image: string;
  title: string;
  date: string;
  time: string;
  location: string;
  genres: string[];
  refCode: string;
  seats: string[];
  paymentMethod: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
  onCardClick?: () => void;
}

export function TransactionCard({
  image,
  title,
  date,
  time,
  location,
  genres,
  refCode,
  seats,
  paymentMethod,
  amount,
  status,
  onCardClick,
}: TransactionCardProps) {
  // Dynamic status badge styling
  const getStatusStyles = (status: TransactionCardProps["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div
      onClick={onCardClick}
      className="w-full bg-[#12171f] border border-[#1f2633] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch justify-between gap-6 hover:border-red-600/40 transition-all duration-300 shadow-lg group cursor-pointer"
    >
      {/* Column 1: Movie Poster & Basic Info */}
      <div className="flex gap-4 flex-1 min-w-0">
        <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-xl overflow-hidden shrink-0 bg-black/40">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between py-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-white truncate leading-tight">
            {title}
          </h3>

          <div className="space-y-1 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{date} &nbsp;{time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{location}</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Film className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{genres.join(" • ")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Divider for Desktop */}
      <div className="hidden md:block w-px bg-gray-800/80 self-stretch" />

      {/* Column 2: Booking Reference Details */}
      <div className="flex flex-col justify-center space-y-2 text-xs text-gray-400 min-w-[200px]">
        {/* Ref Code */}
        <div className="flex items-start gap-2.5">
          <Ticket className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Ref Code</p>
            <p className="text-white font-semibold tracking-wide">{refCode}</p>
          </div>
        </div>

        {/* Seats */}
        <div className="flex items-start gap-2.5">
          <Armchair className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Seats</p>
            <p className="text-white font-semibold">{seats.join(", ")}</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex items-start gap-2.5">
          <CreditCard className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Payment Method</p>
            <p className="text-white font-semibold">{paymentMethod}</p>
          </div>
        </div>
      </div>

      {/* Divider for Desktop */}
      <div className="hidden md:block w-px bg-gray-800/80 self-stretch" />

      {/* Column 3: Status & Amount */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0">
        
        {/* Status Pill & Price */}
        <div className="flex flex-col items-start md:items-end gap-1.5">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${getStatusStyles(
              status
            )}`}
          >
            {status}
          </span>
          <p className="text-lg font-extrabold text-white">
            ₱ {amount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </p>
        </div>

        {/* Action Arrow Indicator */}
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />

      </div>

    </div>
  );
}