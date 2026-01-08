import { useEffect, useState } from "react";
import { getAllFood, search } from "../Services/food";
import { List, ShoppingCart, Search } from "lucide-react";
import { useCart } from "../Context/cardContext";
import CartDrawer from "../components/CartView";
import { Link } from "react-router-dom";

interface Food {
  _id: string;
  foodName: string;
  price: string;
  description: string;
  foodCategory: string;
  imageUrl: string;
}

const parsePrice = (price: any): number => {
  try {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      return isNaN(cleanPrice) ? 0 : cleanPrice;
    }
    return 0;
  } catch {
    return 0;
  }
};

export default function FoodCategorySection() {
  const categories = [
    { label: "All", value: "all" },
    { label: "Rice", value: "Rice" },
    { label: "Kothtu", value: "koththu" },
    { label: "Indian Foods", value: "Indian Foods" },
    { label: "Bekary Item", value: "Bekary Item" },
    { label: "Hot Bevarages", value: "Hot Bevarages" },
    { label: "Others", value: "Others" },
  ];

  const [selected, setSelected] = useState("all");
  const [foodList, setFoodList] = useState<Food[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, addToCart } = useCart();

  const limit = 12;

  const loadData = async () => {
    try {
      setLoading(true);
      if (searchQuery) {
        const res = await search(page, limit, "", searchQuery);
        setFoodList(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else if (selected !== "all") {
        const res = await search(page, limit, selected, "");
        setFoodList(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        const res = await getAllFood(page, limit);
        setFoodList(res.data || []);
        setTotalPages(res.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to load food:", error);
      setFoodList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, [selected, searchQuery]);

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <section className="relative py-16 lg:px-20 px-6 bg-white min-h-screen">
      
      {/* Top Right Cart Button */}
      <div className="absolute top-18 right-6 lg:right-20 z-20">
        <button
          onClick={() => setCartOpen(true)}
          className="flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-2xl hover:bg-orange-500 transition-all shadow-xl group"
        >
          <div className="relative">
            <ShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-bounce">
                {cart.length}
              </span>
            )}
          </div>
          <span className="font-bold hidden sm:block">My Cart</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Our <span className="text-orange-500">Delicious Menu</span>
          </h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Centered Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for your favorite dish..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 focus:ring-0 outline-none transition-all shadow-sm text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelected(cat.value);
                setPage(1);
              }}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-sm ${
                selected === cat.value
                  ? "bg-orange-500 text-white shadow-orange-200 scale-105"
                  : "bg-gray-50 text-gray-600 hover:bg-orange-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
             <p className="text-gray-500 font-medium tracking-wide">Cooking up results...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foodList.map((food) => (
              <div
                key={food._id}
                className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={food.imageUrl}
                    alt={food.foodName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-orange-600 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm">
                      {food.foodCategory}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-2">
                    {food.foodName}
                  </h3>
                  
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
                    {food.description}
                  </p>

                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-2xl font-black text-gray-900">
                        <span className="text-orange-500 text-sm font-bold mr-1">Rs.</span>
                        {food.price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => addToCart({ ...food, qty: 1 })}
                        className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3.5 rounded-2xl transition-all font-bold text-sm"
                      >
                        <ShoppingCart size={18} />
                        Add
                      </button>
                      
                      <Link
                        to="/orders"
                        state={{
                          foodName: food.foodName,
                          price: parsePrice(food.price),
                          qty: 1,
                          image: food.imageUrl
                        }}
                        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-2xl transition-all font-bold text-sm shadow-lg shadow-orange-100"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && foodList.length > 0 && (
          <div className="flex justify-center items-center gap-8 mt-20">
            <button
              disabled={page === 1}
              className="px-6 py-2.5 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-bold disabled:opacity-30 hover:border-orange-500 hover:text-orange-500 transition-all"
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <div className="flex items-center gap-3">
               <span className="text-gray-400 font-medium">Page</span>
               <span className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-2xl font-black shadow-lg shadow-orange-100">
                 {page}
               </span>
               <span className="text-gray-400 font-medium">of {totalPages}</span>
            </div>

            <button
              disabled={page === totalPages}
              className="px-6 py-2.5 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-bold disabled:opacity-30 hover:border-orange-500 hover:text-orange-500 transition-all"
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </section>
  );
}