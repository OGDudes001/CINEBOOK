import { useState } from "react";
import { useNavigate } from "react-router";
import { X, Check, ChevronRight } from "lucide-react";

interface ReservePopupProps {
  isOpen: boolean;
  onClose: () => void;
  movie: {
    title: string;
    location: string;
    price: number;
    availableSeats: number;
  };
}

export default function ReservePopup({ isOpen, onClose, movie }: ReservePopupProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [ticketCount, setTicketCount] = useState<number | "">(1);
  const [formData, setFormData] = useState({
    name: "Dudes Aro Inihao",
    phone: "+63 912 345 6789",
    email: "dudes@example.com",
    gender: "Male"
  });

  if (!isOpen) return null;

  const resetAndClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    { id: 1, label: "Details" },
    { id: 2, label: "GCash Pay" },
    { id: 3, label: "Finish" }
  ];

  const totalAmount = movie.price * (Number(ticketCount) || 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#12171f] border border-[#1f2633] rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Reserve Ticket</h2>
            <p className="text-xs text-gray-400">{movie.title} • {movie.location}</p>
          </div>
          <button 
            onClick={resetAndClose}
            className="p-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Bar */}
        <div className="flex items-center justify-between px-2">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  currentStep > step.id
                    ? "bg-emerald-500 text-black"
                    : currentStep === step.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`text-xs font-medium ${
                  currentStep === step.id ? "text-white" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <div className="w-8 md:w-12 h-[2px] bg-gray-800 mx-1" />
              )}
            </div>
          ))}
        </div>

        {/* Step Form Content */}
        <form onSubmit={handleNextStep} className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-3 py-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0b0e13] border border-[#1f2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0b0e13] border border-[#1f2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0b0e13] border border-[#1f2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-400">Gender</label>
                  <input
                    type="text"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-[#0b0e13] border border-[#1f2633] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-xs font-medium text-gray-300">Number of Tickets</label>
                <input
                  type="number"
                  min="1"
                  max={movie.availableSeats}
                  required
                  value={ticketCount}
                  onChange={(e) => setTicketCount(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full bg-[#0b0e13] border border-[#1f2633] rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-red-500 font-bold"
                />
              </div>

              <div className="flex justify-between items-center bg-[#0b0e13] p-3 rounded-xl border border-[#1f2633] text-xs">
                <span className="text-gray-400">Total Price:</span>
                <span className="font-bold text-red-500 text-sm">₱{totalAmount}</span>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 py-2 flex flex-col items-center justify-center text-center">
              <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-3 w-full">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wide">Pay via GCash</span>
                <p className="text-[11px] text-gray-400 mt-0.5">Scan the QR code below to transfer ₱{totalAmount}</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-4 border-blue-500/40 shadow-xl flex flex-col items-center gap-2">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=GCASH-PAYMENT-AMOUNT-${totalAmount}`} 
                  alt="GCash QR Code" 
                  className="w-44 h-44 object-contain"
                />
                <span className="text-[10px] font-semibold text-gray-800 tracking-wider uppercase">GCash Account: Cinema Reserve</span>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 py-4 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white">Thank You!</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Your booking for <span className="text-white font-medium">{movie.title}</span> ({ticketCount} ticket{Number(ticketCount) > 1 ? "s" : ""}) has been submitted successfully.
                </p>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            {currentStep < 3 ? (
              <>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300"
                  >
                    Back
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white flex items-center gap-1.5 transition-all"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  resetAndClose();
                  navigate("/transactions");
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
              >
                <span>View Transactions</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}