import axios from "axios";
import { baseUrl, bankDashboardEndPoint } from "@/constants/api.url";

const api = axios.create({
	baseURL: baseUrl + bankDashboardEndPoint,
	headers: {
		"Content-Type": "application/json",
	},
});

// Add token to request headers if it exists in localStorage
api.interceptors.request.use((config) => {
	// Check if token exists in localStorage
	const token = localStorage.getItem("bank_admin");

	// If token exists, add it to the authorization header
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

const bankAdminAuth = async (loginData) => {
	const res = await api.post('/auth/login', loginData);
	return res.data;
}

export {api as default, bankAdminAuth};
