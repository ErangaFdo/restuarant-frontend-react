import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getAllFeedback } from "../Services/feedback";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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

  const limit = 6; 

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
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Section Header */}
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter uppercase italic">
          Guest <span className="text-orange-500 not-italic">Voice</span>
        </h2>
        <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[10px]">
          Customer reviews & culinary feedback
        </p>
      </div>

      {/* Feedback Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {feedbacks.map((fb) => (
          <div
            key={fb._id}
            className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-100 hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Accent */}
            <Quote className="absolute -top-4 -right-4 w-24 h-24 text-gray-50 group-hover:text-orange-50/50 transition-colors -rotate-12" />

            <div className="relative z-10">
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-sm ${
                      index < fb.ratings ? "text-orange-500" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Feedback Message */}
              <p className="text-gray-700 font-medium italic leading-relaxed mb-8 text-sm h-24 overflow-hidden">
                "{fb.feedback.length > 160
                  ? fb.feedback.slice(0, 160) + "..."
                  : fb.feedback}"
              </p>

              <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                {/* Avatar Badge */}
                <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] text-orange-500 flex items-center justify-center text-lg font-black shadow-lg shadow-black/20">
                  {fb.customername.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4 className="font-black text-gray-900 text-sm tracking-tight uppercase">
                    {fb.customername}
                  </h4>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                    {new Date(fb.createdAt).toLocaleString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Pagination */}
      <div className="flex justify-center items-center gap-8 mt-16 pb-12">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all disabled:opacity-20 cursor-pointer shadow-sm hover:shadow-md"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2 font-black text-gray-400">
          <span className="text-[#0A0A0A] text-xl">{page}</span>
          <span className="opacity-30">/</span>
          <span className="opacity-30">{totalPages}</span>
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all disabled:opacity-20 cursor-pointer shadow-sm hover:shadow-md"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}