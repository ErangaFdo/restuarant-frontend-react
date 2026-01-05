import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { feedabckSave } from "../Services/feedback";

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
    <section className="py-20 bg-[url('https://images.unsplash.com/photo-1552566626-52f8b828add9')] bg-cover bg-center">
      <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/80 p-10 rounded-3xl shadow-2xl border border-amber-200">

        {/* Restaurant Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-amber-800 tracking-wide">
            🍽️ Dine With Us — Share Your Taste Experience
          </h1>

          <p className="text-gray-700 mt-4 text-lg">
            We value your thoughts about our food, service & ambience.
            Your feedback helps us serve you better.
          </p>
        </div>

        {/* Form Body */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Name */}
          <div>
            <label className="font-semibold text-amber-900 block mb-2">
              👤 Customer Name
            </label>
            <input
              type="text"
              value={customername}
              placeholder="Enter your full name"
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border-2 border-amber-300 p-3 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-amber-900 block mb-2">
              📧 Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-amber-300 p-3 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        {/* Feedback Text */}
        <div className="mt-8">
          <label className="font-semibold text-amber-900 block mb-2">
            📝 Tell Us About Your Dining Experience
          </label>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            maxLength={500}
            placeholder="How was the food, service, ambience, and hospitality?"
            className="w-full border-2 border-amber-300 p-4 rounded-xl bg-white h-32 focus:ring-2 focus:ring-amber-500 outline-none"
          ></textarea>

          <p className="text-gray-500 text-sm mt-1">
            {feedback.length}/500 characters
          </p>
        </div>

        {/* Rating */}
        <div className="mt-8">
          <label className="font-semibold text-amber-900 block mb-3">
            ⭐ Rate Your Restaurant Experience
          </label>

          <div className="flex gap-3 text-5xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer transition-transform duration-200 
                ${star <= (hover || rating)
                    ? "text-amber-500 scale-110"
                    : "text-gray-300"
                  }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>

          <p className="mt-2 text-gray-600">
            {rating === 0
              ? "Tap a star to rate your experience"
              : `You rated us ${rating} star(s)` }
          </p>
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-amber-700 text-white py-3 rounded-2xl text-lg font-bold shadow-md hover:bg-amber-900 transition"
          >
            {loading ? "Submitting Review..." : "Submit Feedback 🍴"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeedbackForm;