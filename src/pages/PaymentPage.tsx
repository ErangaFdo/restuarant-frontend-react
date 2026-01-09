import React, { useState } from "react";
import { CreditCard, Calendar, User, Lock, Phone, Mail, AlertCircle, CheckCircle, Shield, ArrowLeft,  } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentSave } from "../Services/payment";
// import { useAuth } from "../Context/authContext";

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const orderAmount = state?.amount || 0;
  const formattedAmount = typeof orderAmount === 'string' ? parseFloat(orderAmount.replace(/[^0-9.]/g, '')) : orderAmount;

  const [email, setEmail] = useState("");
  const [phonenumber, setPhonNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === "cardNumber") {
      const formatted = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      setCardNumber(formatted);
      return;
    }

    if (name === "expireDate") {
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2").slice(0, 5);
      setExpireDate(formatted);
      return;
    }

    if (name === "cvv") {
      if (value.length <= 4) {
        setCvv(value);
      }
      return;
    }

    if (name === "email") setEmail(value);
    if (name === "phonenumber") setPhonNumber(value);
    if (name === "cardHolderName") setCardHolderName(value);
  };

  const validateForm = (): boolean => {
    if (!email || !phonenumber || !cardHolderName || !cardNumber || !expireDate || !cvv) {
      setAlert({ type: "error", message: "Please fill all fields" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlert({ type: "error", message: "Invalid email address" });
      return false;
    }

    const cardNum = cardNumber.replace(/\s/g, "");
    if (cardNum.length < 13) {
      setAlert({ type: "error", message: "Invalid card number" });
      return false;
    }

    if (cvv.length < 3) {
      setAlert({ type: "error", message: "Invalid CVV" });
      return false;
    }

    if (phonenumber.length < 10) {
      setAlert({ type: "error", message: "Invalid phone number" });
      return false;
    }

    return true;
  };

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setAlert(null);

      const paymentData = {
        email,
        phonenumber,
        cardHolderName,
        cardNumber,
        expireDate,
        cvv,
        paymentDate: new Date().toISOString(),
        amount: formattedAmount.toString(),
      };

      await paymentSave(paymentData);
      
      setAlert({ type: "success", message: "Payment processed successfully!" });
      setPaymentSuccess(true);

        setEmail("");
        setPhonNumber("");
        setCardHolderName("");
        setCardNumber("");
        setExpireDate("");
        setCvv("");

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Payment failed. Please try again.";
      setAlert({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
               <CheckCircle className="text-green-500" size={48} />
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Success!</h1>
          <p className="text-gray-500 mb-8">Your transaction has been completed securely.</p>
          
          <div className="bg-gray-50 rounded-3xl p-6 mb-8 border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Amount Paid</span>
               <span className="text-xl font-black text-gray-900">Rs. {formattedAmount.toLocaleString()}</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between items-center text-sm">
               <span className="text-gray-400">Date</span>
               <span className="font-bold text-gray-700">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

        
          
          <button 
            onClick={() => navigate('/')} 
            className="mt-6 text-gray-400 font-bold hover:text-gray-900 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col lg:flex-row">
      
      {/* Left side: Information (Visual) */}
      <div className="w-full lg:w-1/2 bg-gray-900 p-12 lg:p-24 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
        
        <div className="relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors font-bold uppercase text-xs tracking-widest">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">Secure <br/> <span className="text-orange-500">Checkout</span></h1>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            Your payment is protected with 256-bit SSL encryption. We never store your CVV or sensitive card details.
          </p>
        </div>

        <div className="relative z-10 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 max-w-sm">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Amount to Pay</p>
                <p className="text-4xl font-black">Rs. {formattedAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                <div className="mt-8 flex gap-3">
                    <Shield className="text-orange-500" size={20} />
                    <span className="text-sm font-bold text-gray-300">End-to-end encrypted</span>
                </div>
            </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 p-6 lg:p-24 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="flex items-center gap-6 mb-12 grayscale opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" className="h-6" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" className="h-8" alt="Mastercard" />
          </div>

          {alert && (
            <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
              alert.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}>
              {alert.type === "error" ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
              <span>{alert.message}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handlePaymentSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Cardholder Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="text"
                  name="cardHolderName"
                  placeholder="John Doe"
                  value={cardHolderName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all font-bold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-orange-500 outline-none transition-all text-sm font-bold"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                    <input
                      type="tel"
                      name="phonenumber"
                      value={phonenumber}
                      onChange={handleChange}
                      placeholder="07x xxxxxxx"
                      className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-orange-500 outline-none transition-all text-sm font-bold"
                      required
                    />
                  </div>
                </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-orange-500 outline-none transition-all font-mono text-lg font-bold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Expiry</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="text"
                    name="expireDate"
                    placeholder="MM/YY"
                    value={expireDate}
                    onChange={handleChange}
                    maxLength={5}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">CVV</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input
                    type="password"
                    name="cvv"
                    placeholder="***"
                    value={cvv}
                    onChange={handleChange}
                    maxLength={4}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-black py-5 rounded-2xl mt-4 shadow-xl shadow-orange-100 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Pay Rs. {formattedAmount.toLocaleString()}</>
              )}
            </button>
          </form>

          <div className="mt-12 flex justify-center items-center gap-8 opacity-30 grayscale">
            <Shield size={24} />
            <Lock size={24} />
            <CheckCircle size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}