import { useEffect, useState } from "react";
import { getAllOrder, updateOrderStatus } from "../Services/order";
import { FileText, ChevronLeft, ChevronRight, Package, CreditCard, Calendar, MapPin } from "lucide-react";

interface OrderList {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  paymentmethod: string;
  amount: string;
  orderType: string;
  orderDate: string;
  foodname: string;
  price: string;
  qty: number;
  status: string;
}

export default function Orders() {
  const [orderList, setOrderList] = useState<OrderList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  const loadData = async () => {
    try {
      const res = await getAllOrder(page, limit);
      setOrderList(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load orders:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateOrderStatus(id, newStatus);
      loadData(); 
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:row justify-between items-start md:items-center gap-6 border-b border-gray-200 pb-8">
        <div>
          <h2 className="text-4xl font-black text-[#0A0A0A] tracking-tighter uppercase italic">
            Order <span className="text-orange-500 not-italic">Registry</span>
          </h2>
          <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[10px]">
            Real-time fulfillment tracking
          </p>
        </div>

        <button
          onClick={() => window.open("http://localhost:5000/api/v1/report/pdf", "_blank")}
          className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-2xl font-bold hover:bg-orange-500 transition-all shadow-xl shadow-black/10 cursor-pointer text-sm"
        >
          <FileText size={18} />
          Export PDF Report
        </button>
      </div>

      {/* Order Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {orderList.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-black/5 overflow-hidden flex flex-col hover:border-orange-500/20 transition-all"
          >
            {/* Order Header */}
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-gray-900 leading-tight">
                  {order.firstname} {order.lastname}
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.email}</span>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                  order.status === "pending" ? "bg-orange-100 text-orange-600" : 
                  order.status === "success" ? "bg-green-100 text-green-600" : 
                  "bg-red-100 text-red-600"
              }`}>
                {order.status}
              </div>
            </div>

            {/* Order Details */}
            <div className="p-6 space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem icon={<MapPin size={14}/>} label="Delivery to" value={order.address} />
                <DetailItem icon={<Calendar size={14}/>} label="Ordered on" value={order.orderDate} />
                <DetailItem icon={<CreditCard size={14}/>} label="Payment" value={order.paymentmethod} />
                <DetailItem icon={<Package size={14}/>} label="Type" value={order.orderType} />
              </div>

              {/* Dish Info Box */}
              <div className="mt-6 p-5 bg-[#0A0A0A] rounded-3xl text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-2">Order Summary</p>
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-bold text-lg leading-tight">{order.foodname}</h4>
                    <p className="text-gray-400 text-xs mt-1">Qty: {order.qty} × LKR {order.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Total Amount</p>
                    <p className="text-xl font-black text-white">Rs.{order.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="p-6 pt-0">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 block mb-2">Update Fulfillment Status</label>
              <select
                defaultValue={order.status}
                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl font-bold text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer appearance-none"
              >
                <option value="pending">Pending Review</option>
                <option value="success">Mark as Completed</option>
                <option value="cancelled">Cancel Order</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-8 mt-16 pb-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all disabled:opacity-20 cursor-pointer"
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
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all disabled:opacity-20 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// Helper Component for Details
function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400">
        <span className="text-orange-500">{icon}</span>
        {label}
      </div>
      <p className="text-xs font-bold text-gray-700 truncate">{value}</p>
    </div>
  );
}