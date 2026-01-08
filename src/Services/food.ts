import api from "./api"

export const createFood = async(data: any)=>{
     const res = await api.post("/menu/create", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return res.data
}

export const getAllFood = async (page: number, limit: number) => {
  const res = await api.get(`/menu/all?page=${page}&limit=${limit}`);
  return res.data;
};


export const updateFood = async (id: string, data: any) => {
  const res = await api.put(`/menu/updateFood/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const search = async (page: number, limit: number, category: string, search: string) => {
  const res = await api.get(`/menu/search?page=${page}&limit=${limit}&category=${category}&query=${search}`);
  return res.data;
};


export const deleteFood = async (id: string) => {
  const res = await api.delete(`/menu/deleteFood/${id}`);
  return res.data;
};