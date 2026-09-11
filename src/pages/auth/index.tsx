import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Film, Mail, Lock, User, Hash, Calendar, 
  Users, Phone, MapPin, Camera, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    avatarUrl: "",
    firstName: "",
    middleName: "",
    lastName: "",
    age: "",
    birthday: "",
    gender: "Male",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setFormData((prev) => ({ ...prev, avatarUrl: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      console.log("Registering user:", formData);
    } else {
      console.log("Logging in user:", { email: formData.email, password: formData.password });
    }
    // Redirect to home
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0e14] text-white flex items-center justify-center p-4 relative overflow-hidden py-[60px]">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Auth Card Box */}
      <div className="w-full max-w-2xl bg-[#12171f] border border-[#1f2633] rounded-3xl p-6 sm:p-10 shadow-2xl relative z-10 transition-all duration-300">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-red-600/10 border border-red-600/20 rounded-2xl mb-3 text-red-500">
            <Film className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight transition-all duration-300">
            {isRegister ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 transition-all duration-300">
            {isRegister
              ? "Fill in your details below to get started"
              : "Enter your credentials to access your account"}
          </p>
        </div>

        {/* Auth Form with 60px Top Padding */}
        <form onSubmit={handleSubmit} className="pt-[60px] space-y-4">
          
          {/* Animated Wrapper Keyed to Mode Switch */}
          <div 
            key={isRegister ? "register" : "login"}
            className="space-y-4 transition-all duration-500 ease-in-out animate-in fade-in slide-in-from-bottom-3"
          >
            {/* REGISTER EXTRA FIELDS */}
            {isRegister && (
              <div className="space-y-5">
                
                {/* Profile Photo Upload */}
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-red-600/50 bg-[#18202c] flex items-center justify-center group">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-gray-500" />
                    )}
                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-[11px] font-medium gap-1">
                      <Camera className="w-4 h-4 text-white" />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <span className="text-xs text-gray-400">Profile Picture</span>
                </div>

                {/* Name Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Doe"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-red-500" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Age, Birthday & Gender Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-red-500" />
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      required
                      placeholder="22"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-red-500" />
                      Birthday
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      required
                      value={formData.birthday}
                      onChange={handleChange}
                      className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors [color-scheme:dark]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-red-500" />
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-red-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+63 912 345 6789"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Street, City, Country"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>

              </div>
            )}

            {/* COMMON FIELDS (Email & Password) */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-red-500" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#18202c] border border-[#232d3f] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all duration-200"
              >
                <span>{isRegister ? "Create Account" : "Sign In"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </form>

        {/* Form Toggle Switcher */}
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-400">
          {isRegister ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-red-500 font-semibold hover:underline ml-1"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-red-500 font-semibold hover:underline ml-1"
              >
                Register now
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}