import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getAllFood , deleteFood } from "../Services/food";
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

interface Food {
  _id: string;
  foodName: string;
  price: string;
  description: string;
  foodCategory: string;
  imageUrl: string;
}

interface FoodCardGridProps {
  onEditClick?: (food: Food) => void;
  onDeleteSuccess?: () => void;
}

export interface FoodCardGridHandle {
  refreshData: () => void;
}

const FoodCardGrid = forwardRef<FoodCardGridHandle, FoodCardGridProps>(({ onEditClick, onDeleteSuccess }, ref) => {
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const loadData = async () => {
    const res = await getAllFood(page, limit);
    setFoodList(res.data);
    setTotalPages(res.totalPages);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this exquisite dish?");
    if (!confirmDelete) return;

    try {
      await deleteFood(id);
      loadData();
      onDeleteSuccess?.();
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  useImperativeHandle(ref, () => ({
    refreshData: () => {
      loadData();
    }
  }));

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="mt-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {foodList.map((food) => (
          <div
            key={food._id}
            className="group bg-[#1A1A1A] rounded-[2rem] overflow-hidden border border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl shadow-black/50"
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={food.imageUrl}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={food.foodName}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60"></div>
              
              {/* Floating Badge */}
              <span className="absolute bottom-4 left-4 px-3 py-1 bg-orange-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                {food.foodCategory}
              </span>
            </div>

            {/* Content Container */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white tracking-tight">{food.foodName}</h3>
                <span className="text-orange-500 font-black text-sm">LKR {food.price}</span>
              </div>
              
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 italic mb-6">
                "{food.description}"
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={() => onEditClick?.(food)}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-bold text-xs uppercase tracking-wider border border-white/5 group-hover:border-orange-500/20"
                >
                  <Edit2 size={14} className="text-orange-500" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all font-bold text-xs uppercase tracking-wider border border-red-500/10"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Pagination */}
      <div className="flex justify-center items-center gap-8 mt-16">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-3 rounded-full bg-[#1A1A1A] border border-white/10 text-orange-500 hover:bg-orange-500 hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-[#1A1A1A] cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2 font-black text-gray-400">
          <span className="text-white text-xl">{page}</span>
          <span className="opacity-30">/</span>
          <span className="opacity-30">{totalPages}</span>
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="p-3 rounded-full bg-[#1A1A1A] border border-white/10 text-orange-500 hover:bg-orange-500 hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-[#1A1A1A] cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
});

FoodCardGrid.displayName = "FoodCardGrid";

export default FoodCardGrid;