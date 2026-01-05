import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getAllFeedback } from "../Services/feedback";

type FeedbackType = {
  _id: string;
  customername: string;
  email: string;
  ratings: number;
  feedback: string;
  createdAt: string;
};

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 4;

  useEffect(() => {
    loadFeedback();
  }, [page]);

  const loadFeedback = async () => {
    try {
      const res = await getAllFeedback(page, limit);
      setFeedbacks(res.data);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative py-20 bg-black">
      {/* Decorative Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-400 text-center mb-4">
          Golden Experiences
        </h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-14">
          Hear what our guests say about the flavors, ambience, and service
          at Golden Spoon Restaurant.
        </p>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="group bg-black/60 backdrop-blur-md border border-orange-400/30 rounded-2xl p-6 shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Rating */}
              <div className="flex mb-4 gap-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-lg ${
                      index < fb.ratings
                        ? "text-orange-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-300 italic leading-relaxed text-sm">
                “{fb.feedback.length > 160
                  ? fb.feedback.slice(0, 160) + "..."
                  : fb.feedback}”
              </p>

              <div className="my-5 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"></div>

              {/* User */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-black flex items-center justify-center text-xl font-bold">
                  {fb.customername.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    {fb.customername}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {new Date(fb.createdAt).toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-14">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-6 py-2 rounded-full border border-orange-400/40 text-orange-300 hover:bg-orange-400 hover:text-black transition disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-gray-300 font-medium">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 rounded-full border border-orange-400/40 text-orange-300 hover:bg-orange-400 hover:text-black transition disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
