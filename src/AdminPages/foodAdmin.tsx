import { ImagePlus, Loader2, Plus, X } from "lucide-react";
import { useState, useRef, type ChangeEvent } from "react";
import { createFood, updateFood } from "../Services/food";
import FoodCardGrid, { type FoodCardGridHandle } from "./foodCard";

interface Food {
  _id: string;
  foodName: string;
  price: string;
  description: string;
  foodCategory: string;
  imageUrl: string;
}

function FoodAdmin() {
    const fishCardGridRef = useRef<FoodCardGridHandle>(null);
    
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const [foodName , setFoodName] = useState("")
    const [editFoodId, setEditFoodId] = useState<string | null>(null);
    const [price , setPrice] = useState("")
    const [description , setDescription] = useState("")
    const [foodCategory , setFoodCategoury] = useState("")
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const showAlert = (type: "success" | "error", message: string) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleEditClick = (food: Food) => {
        setIsEditMode(true);
        setEditFoodId(food._id);  
        setFoodName(food.foodName);
        setPrice(food.price);
        setDescription(food.description);
        setFoodCategoury(food.foodCategory);
        setPreview(food.imageUrl);
        setImage(null);
        setShowModal(true);
    };

    const handleAddNewClick = () => {
        setIsEditMode(false);
        resetForm();
        setShowModal(true);
    };

    const resetForm = () => {
        setFoodName("");
        setPrice("");
        setDescription("");
        setFoodCategoury("");
        setImage(null);
        setPreview("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
        setIsEditMode(false);
    };

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          setLoading(true);
          const formData = new FormData();
          formData.append("foodName", foodName);
          formData.append("price", price);
          formData.append("description", description);
          formData.append("foodCategory", foodCategory);
        
          if (image) {
            formData.append("image", image); 
          } else if (isEditMode) {
            formData.append("imageUrl", preview); 
          }

          if (isEditMode && editFoodId) {
            await updateFood(editFoodId, formData);
            showAlert("success", "Item updated successfully!");
          } else {
            await createFood(formData);
            showAlert("success", "Item added successfully!");
          }
        
          resetForm();
          setShowModal(false);
          setIsEditMode(false);
          fishCardGridRef.current?.refreshData();
        } catch (error : any) {
          if (error.response?.status === 400) {
            showAlert("error", error.response.data.message);
          } else {
            showAlert("error", "Action failed. Please try again!");
          }
        } finally {
          setLoading(false);
        }
      };

  return (
    <div className="animate-in fade-in duration-500">

      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter uppercase italic">
            Menu <span className="text-orange-500 not-italic">Management</span>
          </h2>
          <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[10px]">
            Catalog & Inventory Control
          </p>
        </div>

        <button
          onClick={handleAddNewClick}
          className="bg-[#0A0A0A] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-500 transition-all shadow-xl shadow-black/10 active:scale-95 cursor-pointer"
        >
          <Plus size={18} /> Add New Selection
        </button>
      </div>

      <div className="rounded-4xl overflow-hidden">
        <FoodCardGrid 
            ref={fishCardGridRef} 
            onEditClick={handleEditClick} 
            onDeleteSuccess={() => showAlert("success", "Item removed successfully!")}
        />
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          
          {/* Form Card */}
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight italic uppercase">
                        {isEditMode ? "Edit" : "New"} <span className="text-orange-500 not-italic">Entry</span>
                    </h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Update your culinary catalog</p>
                </div>
                <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors cursor-pointer"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Alert Notification inside Modal */}
            {alert && (
                <div className="px-8 pt-4">
                    <div className={`p-4 rounded-2xl border ${alert.type === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"} flex items-center justify-between font-bold text-xs uppercase tracking-wider`}>
                        <span>{alert.message}</span>
                        <button onClick={() => setAlert(null)}><X size={14}/></button>
                    </div>
                </div>
            )}

            <div className="p-8 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Item Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Selection Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Atlantic Salmon"
                          value={foodName}
                          onChange={(e) => setFoodName(e.target.value)}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-800"
                          required
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Price (LKR)</label>
                        <input
                          type="text"
                          placeholder="0.00"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-800"
                          required
                        />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Description</label>
                    <textarea
                      placeholder="Describe the flavors, origin, or preparation..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-medium text-gray-700 h-28 resize-none"
                    ></textarea>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Category</label>
                    <select
                        value={foodCategory}
                        onChange={(e) => setFoodCategoury(e.target.value)}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-bold text-gray-800 appearance-none cursor-pointer"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Rice">Rice</option>
                        <option value="Koththu">Koththu</option>
                        <option value="Indian Foods">Indian Foods</option>
                        <option value="Bekary Items">Bekary Items</option>
                        <option value="Hot Bevarages">Hot Bevarages</option>
                        <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Image Upload Area */}
                  <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Media Presentation</label>
                      <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-200 rounded-4xl cursor-pointer hover:bg-orange-50/50 hover:border-orange-200 transition-all overflow-hidden relative group">
                        {preview ? (
                            <>
                                <img src={preview} alt="preview" className="w-full h-full object-cover group-hover:opacity-75 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                    <ImagePlus className="text-white" size={32} />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center">
                                <ImagePlus className="text-orange-500 mb-2" size={32} />
                                <span className="text-sm font-bold text-gray-400">Click to upload imagery</span>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#0A0A0A] text-white py-5 rounded-4xl font-black text-lg shadow-xl hover:bg-orange-500 transition-all flex justify-center items-center gap-3 active:scale-[0.98] disabled:opacity-70 mt-8"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      isEditMode ? "Update Selection" : "Publish to Menu"
                    )}
                  </button>
                </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodAdmin;