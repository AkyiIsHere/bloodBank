import axios from "axios";
import { baseUrl, mainEndPoint } from "@/constants/api.url";

const api = axios.create({
	baseURL: baseUrl + mainEndPoint,
	headers: {
		"Content-Type": "application/json",
	},
});

// // Add token to request headers if it exists in localStorage
// api.interceptors.request.use((config) => {
// 	// Check if token exists in localStorage
// 	const token = localStorage.getItem("admin");

// 	// If token exists, add it to the authorization header
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`;
// 	}

// 	return config;
// });

const getBanks = async() => {
    const res = await api.get('banks');
    return res.data;
}

const createDonor = async(donorData) => {
	const res = await api.post('donors',donorData);
	return res.data;
}

const createRequest = async(requestData) => {
	const res = await api.post('requests', requestData);
	return res.data;
} 

export {getBanks, createDonor, createRequest};
