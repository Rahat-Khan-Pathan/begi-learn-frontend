import axios from "axios";
import useAuthStore from "../store/auth";

// @ts-ignore 
const API_URL = import.meta.env.VITE_API_KEY + "tags";
class TagService {

    addTag = (payload: any, token: string) => {
        return axios.post(`${API_URL}/`, { ...payload }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getAllTags = (token: string) => {
        return axios.get(`${API_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };


}
const tagService = new TagService()
export default tagService;