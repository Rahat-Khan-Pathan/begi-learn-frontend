import axios from "axios";
import useAuthStore from "../store/auth";


// @ts-ignore 
const API_URL = import.meta.env.VITE_API_KEY + "problems";
// @ts-ignore 
const API_URL2 = import.meta.env.VITE_API_KEY + "user";
class ProblemsService {

    addProblem = (payload: any, token: string) => {
        return axios.post(`${API_URL}/`, { ...payload }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getAllProblems = (val: number, page: number, limit: number, search: string, tagId: number, token: string  ) => {
        return axios.get(`${API_URL}?verified=${val}&page=${page}&limit=${limit}&search=${search}&tagId=${tagId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getProblemById = (id:string, token: string)  => {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getProblemByIdForUpdate = (id:string, token: string)  => {
        return axios.get(`${API_URL}/for-update/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    updateProblemById = (id:string, payload: any, token: string) => {
        return axios.put(`${API_URL}/${id}`, {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    deleteProblem = (id:number, token: string) => {
        return axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    updateVerification = (payload: any, token: string) => {
        return axios.post(`${API_URL}/verify` , {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getSummary = (token: string) => {
        return axios.get(`${API_URL2}/summary`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };


}
const problemsService = new ProblemsService()
export default problemsService;