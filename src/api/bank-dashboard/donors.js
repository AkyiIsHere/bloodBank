import api from './index';

const getDonors = async(page=1, limit=10) => { 
   const res = await api.get(`donors?page=${page}&limit=${limit}`);
   return res.data;
}

const getDonorsWithoutPagination = async() => {
    const res = await api.get("donors/report");
    return res.data;
}

const getDonorByID = async(id) => {
    const res = await api.get(`donors/${id}`);
    return res.data;
}

const createDonor = async(donorData) => {
    const res = await api.post('donors',donorData);
    return res.data;
}

const updateDonor = async(id, donorData) => {
    const res = await api.patch(`donors/${id}`, donorData);
    return res.data;
}

const deleteDonorByID = async(id) => {
    const res = await api.delete(`donors/${id}`);
    return res.data
}


export {getDonors, getDonorByID, createDonor, updateDonor, deleteDonorByID, getDonorsWithoutPagination};