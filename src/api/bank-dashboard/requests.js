import api from './index';

//need to implement page and limit
const getRequests = async(page, limit)=>{
    const res = await api.get(`requests?page=${page}&limit=${limit}`);
    return res.data;
}

const getRequestWithoutPagination = async () => {
	const res = await api.get("requests/report");
	return res.data;
};

const getRequestByID = async(id)=>{
    const res = await api.get(`requests/${id}`);
    return res.data;
}

const createRequest = async(requestData)=>{
    const res = await api.post('requests', requestData);
    return res.data;
}

const updateRequest = async(id, requestData) => {
    const res = await api.patch(`requests/${id}`, requestData);
    return res.data;
}

const deleteRequestByID = async(id) => {
    const res = await api.delete(`requests/${id}`);
    return res.data;
}

export {getRequests, createRequest, getRequestByID, updateRequest, deleteRequestByID, getRequestWithoutPagination}