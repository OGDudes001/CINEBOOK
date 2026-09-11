import { useEffect, useRef, useState } from "react";
import { Edit3, ShieldCheck } from "lucide-react";
import wallpaper1 from "@/assets/wallpaper1.webp"; // Adjust path if needed
import { EditProfileModal } from "@/components/ui/edit-profile.tsx"; // Adjust path if needed

export function ProfileHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section 
        ref={sectionRef} 
        className="relative w-full h-[350px] md:h-[340px] flex items-center overflow-hidden bg-black text-white"
      >
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-up {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        {/* Background Image with Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={wallpaper1}
            alt="Cinema seats background"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex items-center">
          <div 
            className={`flex flex-col md:flex-row items-center md:items-end gap-6 w-full justify-between opacity-0 ${
              isVisible ? "animate-up" : ""
            }`}
            style={{ animationDelay: "100ms" }}
          >
            
            {/* Avatar & User Details */}
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              {/* Avatar Container */}
              <div className="relative group">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#12171f] border-2 border-red-600 p-1 flex items-center justify-center overflow-hidden shadow-xl shadow-red-600/20">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop"
                    alt="Profile Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="absolute bottom-0 right-0 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
                  title="Change Photo"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* User Title & Badge */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                    Dudes Aro Inihao
                  </h1>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600/20 text-emerald-400 border border-emerald-600/30">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="text-sm text-gray-400">
                  Member since August 2024 • Movie Enthusiast
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button 
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 active:scale-95"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>

          </div>
        </div>
      </section>

      {/* Popup Edit Profile Component */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updatedData) => {
          console.log("Updated user profile:", updatedData);
        }}
      />
    </>
  );
}