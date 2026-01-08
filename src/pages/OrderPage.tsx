import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, MapPin, ShoppingBag, Truck, CreditCard, Wallet } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderSave } from '../Services/order';
import { useAuth } from '../Context/authContext';

const CheckoutPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const product = state || {
    foodName: "Unknown Food",
    price: "0",
    qty: 1,
    image: ""
  };

  const parsePrice = (price: any): number => {
    try {
      if (typeof price === 'number') return isNaN(price) ? 0 : price;
      if (typeof price === 'string') {
        const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        return isNaN(cleanPrice) ? 0 : cleanPrice;
      }
      return 0;
    } catch { return 0; }
  };

  const validPrice = parsePrice(product.price);
  const validQty = parseInt(String(product.qty)) || 1;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    address: '',
    qty: validQty.toString(),
    orderType: 'Delivery',     
    paymentMethod: 'cod',
    orderDate: new Date().toISOString().split('T')[0],
    amount: 0
  });

  const currentQty = formData.qty ? parseInt(formData.qty) : validQty;
  const subtotal = validPrice > 0 ? validPrice * currentQty : 0;

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, amount: subtotal }));
  }, [subtotal]);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'orderType' && value === 'Take Away') {
        return { ...prev, orderType: value, paymentMethod: 'card' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleOrderSubmit = async () => {
    if (!formData.email || !formData.firstname || !formData.lastname || !formData.address) {
      setAlert({ type: 'error', message: 'Please fill all required fields' });
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        address: formData.address,
        paymentmethod: formData.paymentMethod,
        amount: subtotal.toString(),
        orderType: formData.orderType,
        orderDate: formData.orderDate,
        foodname: product.foodName,
        price: validPrice.toString(),
        qty: currentQty,
        status: "pending",
      };

      await OrderSave(orderData);
      setAlert({ type: 'success', message: 'Order placed successfully!' });

      setTimeout(() => {
        if (formData.paymentMethod === 'card') {
          navigate('/payment', { state: { amount: subtotal } }); 
        } else {
          navigate('/dilivery'); 
        }
      }, 1500);
    
    } catch (error: any) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to place order' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-800 flex flex-col lg:flex-row">
      
      {/* Left Column: Form Area */}
      <div className="w-full lg:w-[60%] px-6 py-12 lg:px-24 lg:py-16 order-2 lg:order-1">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-12">
             <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <ShoppingBag className="text-white" size={20} />
             </div>
             <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
                Golden <span className="text-orange-500">Spoon</span>
             </h1>
          </div>
          
          <div className="space-y-12">
            {/* Step 1: Contact */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">1</span>
                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                value={formData.email}
                onChange={handleInputChange}
              />
            </section>

            {/* Step 2: Delivery */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">2</span>
                <h2 className="text-xl font-bold text-gray-900">Delivery Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  className="bg-white border border-gray-200 rounded-xl p-4 focus:border-orange-500 outline-none transition-all"
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  className="bg-white border border-gray-200 rounded-xl p-4 focus:border-orange-500 outline-none transition-all"
                  value={formData.lastname}
                  onChange={handleInputChange}
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                className="w-full bg-white border border-gray-200 rounded-xl p-4 mb-4 focus:border-orange-500 outline-none transition-all"
                value={formData.address}
                onChange={handleInputChange}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                   <input
                    type="number"
                    name="qty"
                    placeholder="Qty"
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 focus:border-orange-500 outline-none transition-all"
                    value={formData.qty}
                    onChange={handleInputChange}
                   />
                </div>
                <div className="relative">
                   <select 
                    name="orderType"
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 appearance-none focus:border-orange-500 outline-none cursor-pointer"
                    value={formData.orderType}
                    onChange={handleInputChange}
                   >
                    <option value="Delivery">Home Delivery</option>
                    <option value="Take Away">Take Away</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </section>

            {/* Step 3: Payment */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">3</span>
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 bg-white'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="hidden" />
                  <div className={`p-2 rounded-lg ${formData.paymentMethod === 'card' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <CreditCard size={20} />
                  </div>
                  <span className="font-bold text-sm text-gray-800">Online Card</span>
                </label>

                <label className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.orderType === 'Take Away' ? 'opacity-40 cursor-not-allowed' : formData.paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50/30' : 'border-gray-100 bg-white'}`}>
                  <input type="radio" name="paymentMethod" value="cod" disabled={formData.orderType === 'Take Away'} checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} className="hidden" />
                  <div className={`p-2 rounded-lg ${formData.paymentMethod === 'cod' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Wallet size={20} />
                  </div>
                  <span className="font-bold text-sm text-gray-800">Cash / COD</span>
                </label>
              </div>
            </section>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-10 border-t border-gray-100 gap-6">
              <button 
                className="group flex items-center text-gray-400 hover:text-orange-500 font-bold transition-colors"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="mr-1 group-hover:-translate-x-1 transition-transform" size={20} /> 
                Back to Shopping
              </button>
              <button 
                onClick={handleOrderSubmit}
                disabled={loading}
                className="w-full sm:w-auto bg-gray-900 text-white px-12 py-4 rounded-xl hover:bg-orange-500 font-bold shadow-2xl shadow-gray-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Complete Purchase'}
              </button>
            </div>

            {alert && (
              <div className={`p-4 rounded-xl font-bold text-center animate-bounce ${alert.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {alert.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Dynamic Summary Sticky Sidebar */}
      <div className="w-full lg:w-[40%] bg-gray-50/50 lg:h-screen lg:sticky lg:top-0 px-6 py-12 lg:px-16 flex flex-col order-1 lg:order-2">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest">Order Summary</h2>
          
          {/* Product Card */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex gap-5 mb-10 items-center">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.foodName} 
                className="w-24 h-24 rounded-2xl object-cover" 
              />
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                {currentQty}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.foodName}</h3>
              <p className="text-gray-400 text-sm mb-1">Price per item</p>
              <p className="font-bold text-orange-500">Rs. {validPrice.toLocaleString()}</p>
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-4 mb-10">
            <div className="flex justify-between text-gray-500 font-medium text-sm">
              <span>Subtotal</span>
              <span className="text-gray-900">Rs. {subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between text-gray-500 font-medium text-sm">
              <span>Estimated Shipping</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-end">
              <div>
                 <p className="text-gray-900 font-black text-xl">Total Payable</p>
                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Net amount in LKR</p>
              </div>
              <p className="text-4xl font-black text-gray-900 tracking-tighter">
                {subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </p>
            </div>
          </div>

          {/* Badge Section */}
          <div className="grid grid-cols-2 gap-3">
             <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="text-orange-500 mb-2 bg-orange-50 p-2 rounded-full">
                  {formData.orderType === 'Delivery' ? <Truck size={18}/> : <MapPin size={18}/>}
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{formData.orderType}</p>
                <p className="text-xs font-bold text-gray-800">Confirmed</p>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                <div className="text-orange-500 mb-2 bg-orange-50 p-2 rounded-full">
                  <Calendar size={18}/>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Date</p>
                <p className="text-xs font-bold text-gray-800">{formData.orderDate}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;