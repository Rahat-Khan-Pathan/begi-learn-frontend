import axios from "axios";

// @ts-ignore 
const API_URL = import.meta.env.VITE_API_KEY + "test-case";
class TestCaseService {

    addTestCase = (payload: any, token: string) => {
        return axios.post(`${API_URL}/`, { ...payload }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getAllTestCase = (token: string) => {
        return axios.get(`${API_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getTestCaseById = (id:string, token: string) => {
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    getTestCaseByProblemId = (id:string, token: string) => {
        return axios.get(`${API_URL}/problem/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    updateTestCase = (id:number, payload: any, token: string) => {
        return axios.put(`${API_URL}/${id}`, {...payload}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };
    deleteTestCase = (id:number, token: string) => {
        return axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    };


}
const testCaseService = new TestCaseService()
export default testCaseService;