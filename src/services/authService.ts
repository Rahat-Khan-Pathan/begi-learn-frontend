import axios from "axios";

// @ts-ignore 
const API_URL = import.meta.env.VITE_API_KEY + "user";
class AuthService {

    signUp = (payload: any) => {
        return axios.post(`${API_URL}/signup`, { ...payload });
    };
    logIn = (payload: any) => {
        return axios.post(`${API_URL}/login`, { ...payload });
    };
    verifyUser = (token: string) => {
        return axios.get(`${API_URL}/verify?user_t=${token}`);
    };
    forgotPassword = (payload: any) => {
        return axios.post(`${API_URL}/forgot-password`, {...payload});
    };
    changePassword = (token: string, payload: any) => {
        return axios.post(`${API_URL}/change-password?user_t=${token}`, {...payload});
    };
    getAllUsers = (page: number, limit: number, search: string, token: string) => {
        return axios.get(`${API_URL}/all?page=${page}&limit=${limit}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    updateActive = (payload: any, token: string) => {
        return axios.post(`${API_URL}/active`, {...payload} , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getLeaderboard = (page:number, limit: number, search: string, token: string) => {
        return axios.get(`${API_URL}/leaderboard?page=${page}&limit=${limit}&search=${search}` , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };


}
const authService = new AuthService()
export default authService;