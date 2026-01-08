import api from "./api"

type OrderList = {
    email :string
    firstname : string 
    lastname : string
    address : string
    paymentmethod : string
    amount : string
    orderType :string
    orderDate : string
    foodname : string
    price : string
    qty : number
    status: string;
}



export const OrderSave = async (data: OrderList) => {
  const res = await api.post("/order/create", data)
  return res.data
}

export const getAllOrder = async (page: number, limit: number) => {
  const res = await api.get(`/order/getall?page=${page}&limit=${limit}`);
  return res.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await api.put(`/order/updateStatus/${id}`, { status });
  return res.data;
};


export const getUserOrders = async (email: string) => {
  const res = await api.get(`/order/viewOrder/${email}`);
  return res.data;
};