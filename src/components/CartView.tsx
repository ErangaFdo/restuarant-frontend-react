import { useCart } from "../Context/cardContext";
import { X, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, removeFromCart, clearCart, total } = useCart();

  return (
    <>
      {/* Dark Overlay when open */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl transition-transform duration-500 ease-out z-50 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-orange-500" size={24} />
            <h2 className="text-xl font-bold text-gray-900">Your Basket</h2>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
              {cart.length} Items
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-gray-300" />
              </div>
              <div>
                <p className="text-gray-900 font-bold text-lg">Your cart is empty</p>
                <p className="text-gray-500 text-sm">Looks like you haven't added any delicious food yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="text-orange-500 font-bold hover:underline"
              >
                Start ordering →
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4 group">
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.foodName} 
                      className="w-full h-full rounded-2xl object-cover shadow-sm" 
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-orange-500 transition-colors">
                        {item.foodName}
                      </h3>
                      <button
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        onClick={() => removeFromCart(item._id)}
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500 font-medium">
                        Qty: <span className="text-gray-900">{item.qty}</span>
                      </p>
                      <p className="font-bold text-orange-600">
                        Rs. {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500 text-sm font-medium">
                <span>Subtotal</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-black text-orange-500">
                  Rs. {total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-[0.98]"
                onClick={() => {
                  /* Link to your checkout page */
                  console.log("Proceed to Checkout");
                }}
              >
                Proceed to Checkout
              </button>
              
              <button
                className="w-full text-gray-400 text-sm font-bold py-2 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
                onClick={clearCart}
              >
                <Trash2 size={14} />
                Clear All Items
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}