import { ImagePlus, Loader2 } from "lucide-react";
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
            showAlert("success", "Food updated successfully!");
          } else {
            await createFood(formData);
            showAlert("success", "Food added successfully!");
          }
        
          showAlert("success", isEditMode ? "Food updated successfully!" : "Food added successfully!");
          resetForm();
          setShowModal(false);
          setIsEditMode(false);
          
          // Refresh the food card grid
          fishCardGridRef.current?.refreshData();
        } catch (error : any) {
    
          if (error.response?.status === 400) {
            showAlert("error", error.response.data.message);
          } else {
            showAlert("error", "Failed to submit. Try again!");
          }
        
        } finally {
          setLoading(false);
        }
      };


  return (
    <div>

      {/* Header Section */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Fish Management</h2>
          <p className="text-gray-600 mt-2">Manage fish inventory and pricing</p>
        </div>

        {/* Add Fish Button */}
        <button
          onClick={handleAddNewClick}
          className="bg-blue-600 text-white px-5 py-2 cursor-pointer rounded-lg hover:bg-blue-700"
        >
          + Add Fish Details
        </button>
      </div>

      <div>
        <FoodCardGrid ref={fishCardGridRef} 
        onEditClick={handleEditClick} 
        onDeleteSuccess={() => showAlert("success", "Food deleted successfully!")}
      />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
            {alert && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%]">
              <div
                className={`
                  p-4 rounded-lg border-l-4 shadow-lg animate-fadeIn
                  ${
                    alert.type === "success"
                      ? "bg-green-100 border-green-500 text-green-800"
                      : "bg-red-100 border-red-500 text-red-800"
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{alert.message}</span>
                  <button
                    onClick={() => setAlert(null)}
                    className="font-bold text-xl leading-none ml-3"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white  border-black w-140 rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 cursor-pointer text-gray-600 hover:text-black text-4xl "
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-700">{isEditMode ? "Edit Fish Details" : "Add New Fish"}</h2>

            <form  onSubmit={handleSubmit} className="space-y-4">

              {/* Fish Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Fish Name</label>
                <input
                  type="text"
                  name="fishName"
                  placeholder="Enter fish Name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded px-3 py-2 mt-1"
                ></textarea>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600">Category</label>
                <select
                    name="fishCategory"
                    value={foodCategory}
                    onChange={(e) => setFoodCategoury(e.target.value)}
                    className="w-full border rounded px-3 py-2 mt-1"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Carps">Carps</option>
                    <option value="Barbs">Barbs</option>
                    <option value="Gouramies">Gouramies</option>
                    <option value="Tetras">Tetras</option>
                    <option value="Predatory">Predatory</option>
                    <option value="Others">Others</option>
                </select>
            </div>

              {/* Image Upload */}
              <div className="flex flex-col items-center mt-6">
              <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-sky-300 rounded-xl cursor-pointer hover:bg-sky-50 transition p-6">
                <ImagePlus className="text-sky-500 mb-2" size={30} />
                <span className="text-sky-600 font-medium">{image ? image.name : (isEditMode ? "Change Image (Optional)" : "Upload Image")}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-56 object-cover mt-4 rounded-xl shadow-md"
                />
              )}
            </div>

              {/* Submit */}
              <button
              type="submit"
              className="mt-8 bg-sky-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-sky-700 hover:shadow-xl transition shadow-md flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {loading ? "Saving..." : (isEditMode ? "Update Fish Details" : "Save Fish Details")}
            </button>
            </form>
          </div>

          
        </div>
        
      )}
    </div>

    
    
    
  )
}

export default FoodAdmin;