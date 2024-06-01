import axios from "axios";
import useAuthStore from "../store/auth";

// @ts-ignore 
const API_URL = import.meta.env.VITE_API_KEY + "submissions";
class SubmissionsService {

    addSubmission = (payload: any, token: string) => {
        return axios.post(`${API_URL}/submit`, { ...payload }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    runSample = (payload: any, token: string) => {
        return axios.post(`${API_URL}/run`, { ...payload }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getAllSubmissions = (problemId: string, page: number, limit: number, search: string, token: string) => {
        return axios.get(`${API_URL}/all?problemId=${problemId}&page=${page}&limit=${limit}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getMySubmissions = (id: number, problemId: string, page: number, limit: number, search: string, token: string) => {
        return axios.get(`${API_URL}/all/${id}?problemId=${problemId}&page=${page}&limit=${limit}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getSubmissionById = (id: string, token: string)  => {
        return axios.get(`${API_URL}/one/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };


}
const submissionsService = new SubmissionsService()
export default submissionsService;