import api from "./api"

type paymentData = {
    email : string
    phonenumber : string
    cardHolderName : string
    cardNumber : string
    expireDate : string
    cvv : string
    paymentDate : string
    amount : string
}

export const paymentSave = async (data: paymentData) => {
  const res = await api.post("/payment/create", data)
  return res.data
}


export const getAllPayment = async (page: number, limit: number) => {
  const res = await api.get(`/payment/getall?page=${page}&limit=${limit}`);
  return res.data;
};