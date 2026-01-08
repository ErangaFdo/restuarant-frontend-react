import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { feedabckSave } from "../Services/feedback";
import { MessageSquare, User, Mail, Star, Send } from "lucide-react"; // Added for modern look

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [customername, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!customername || !email || !rating || !feedback) {
      alert("Please fill all fields and select a rating.");
      return;
    }

    setLoading(true);

    const feedbackData = {
      customername,
      email,
      ratings: rating,
      feedback,
    };

    try {
      await feedabckSave(feedbackData);
      alert("Feedback Submitted Successfully!");
      setCustomerName("");
      setEmail("");
      setRating(0);
      setFeedback("");
    } catch (error) {
      console.error(error);
      alert("Error submitting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-20 bg-[#FAFAFA] flex items-center justify-center px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        
        {/* Left Side: Visual/Context */}
        <div className="bg-gray-900 p-10 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-8">
              <MessageSquare size={24} className="text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter mb-6">
              Your Taste <br />
              <span className="text-orange-500">Matters.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
              Help us refine our craft. Share your thoughts on our food, service, and atmosphere.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                <Star size={18} className="text-orange-500 group-hover:text-white" />
              </div>
              <p className="text-sm font-bold text-gray-300">Rate our hospitality</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-16 bg-white">
          <div className="space-y-8">
            
            {/* Input Group: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="text"
                    value={customername}
                    placeholder="John Doe"
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="email"
                    value={email}
                    placeholder="john@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-800"
                  />
                </div>
              </div>
            </div>

            {/* Star Rating Section */}
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Overall Experience
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="transition-transform duration-200 active:scale-90"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <FaStar
                      className={`text-4xl lg:text-5xl ${
                        star <= (hover || rating)
                          ? "text-orange-500 scale-110 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                          : "text-gray-100"
                      } transition-all duration-300`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs font-bold text-gray-400">
                {rating === 0
                  ? "Select a star to begin"
                  : `You've selected ${rating} out of 5 stars`}
              </p>
            </div>

            {/* Feedback Textarea */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">
                Your Review
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                maxLength={500}
                placeholder="Tell us about the flavors, the music, or the staff..."
                className="w-full bg-gray-50 border border-gray-100 p-5 rounded-3xl h-40 focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-medium text-gray-700 resize-none"
              ></textarea>
              <div className="flex justify-end">
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                  {feedback.length} / 500
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-gray-200 hover:bg-orange-500 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Send My Feedback <Send size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackForm;