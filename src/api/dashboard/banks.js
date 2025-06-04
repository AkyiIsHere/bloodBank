import api from "./index";

const getBanks = async (page, limit) => {
	const res = await api.get(`banks/?page=${page}&limit=${limit}`);
	return res.data;
};

const getBanksWithoutPagination = async () => {
	const res = await api.get("banks/report");
	return res.data;
};

const getBankById = async (id) => {
	const res = await api.get(`banks/${id}`);
	return res.data;
};

const createBank = async (bankData) => {
	const res = await api.post("banks", bankData);
	return res.data;
};

const updateBank = async (id, bankData) => {
	const res = await api.patch(`banks/${id}`, bankData);
	return res.data;
};

const deleteBankByID = async (id) => {
	const res = await api.delete(`banks/${id}`);
	return res.data;
}

export {
	getBanks,
	getBankById,
	createBank,
	updateBank,
	deleteBankByID,
	getBanksWithoutPagination,
};
