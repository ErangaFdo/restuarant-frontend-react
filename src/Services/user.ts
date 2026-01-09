import api from "./api";

export const getAllUser = async (page: number, limit: number) => {
  const res = await api.get(`/user/allUser?page=${page}&limit=${limit}`);
  return res.data;
};