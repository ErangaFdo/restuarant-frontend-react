import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getAllFeedback } from "../Services/feedback";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"; // Modern icons

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
    <section className="relative py-24 bg-[rgb(246,244,244)] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20">
          <span className="text-orange-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
            Guest Reviews
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-black text-center mb-6 tracking-tighter">
            Voices of <span className="text-orange-500">Excellence.</span>
          </h2>
          <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
        </div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="group relative bg-[#121212] border border-white/5 rounded-[2rem] p-8 transition-all duration-500 hover:bg-[#161616] hover:border-orange-500/30 hover:-translate-y-2 flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-8 text-orange-500/10 group-hover:text-orange-500/20 transition-colors" size={40} />
              
              <div>
                {/* Rating Stars */}
                <div className="flex mb-6 gap-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-sm ${
                        index < fb.ratings
                          ? "text-orange-500"
                          : "text-white/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Feedback Text */}
                <p className="text-gray-400 leading-relaxed font-medium italic mb-8">
                  "{fb.feedback.length > 140
                    ? fb.feedback.slice(0, 140) + "..."
                    : fb.feedback}"
                </p>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center text-lg font-black shadow-lg shadow-orange-500/20">
                  {fb.customername.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-orange-500 transition-colors">
                    {fb.customername}
                  </h4>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">
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

        {/* Modern Pagination */}
        <div className="flex justify-center items-center gap-8 mt-20">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white hover:bg-orange-500 hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-white/5 cursor-pointer group"
          >
            <ChevronLeft size={20} className="group-active:scale-75 transition-transform" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-white font-black text-xl">{page}</span>
            <span className="text-white/20 font-black text-xl">/</span>
            <span className="text-white/20 font-black text-xl">{totalPages}</span>
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white hover:bg-orange-500 hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-white/5 cursor-pointer group"
          >
            <ChevronRight size={20} className="group-active:scale-75 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}