import axios from 'axios';

const api = process.env.REACT_APP_RECORDS_API_URL || "https://5ad831de42a4a50014d5f321.mockapi.io/api/v1/records"  //默认值

//网络数据库
export const getAll = () => axios.get(`${api}/api/v1/records`);

export const addRecords = (body) => axios.post(`${api}/api/v1/records`,body);

export const deleteRecords = (id)=>axios.delete(`${api}/api/v1/records`,id);

export const updateRecords = (id,body)=>axios.put(`${api}/api/v1/records/${id}`,body);


//本地数据库
// export const getAll = () => axios.get(`${api}/records`);
//
// export const addRecords = (body) => axios.post(`${api}/records`,body);
//
// export const deleteRecords = (id)=>axios.delete(`${api}/records/${id}`);
//
// export const updateRecords = (id,body)=>axios.put(`${api}/records/${id}`,body);
