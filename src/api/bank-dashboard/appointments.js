import api from './index';

const getAppointments = async(page,limit)=>{
    const res = await api.get(`appointments?page=${page}&limit=${limit}`);
    return res.data;
}

const getAppointmentByID = async(id)=>{
    const res = await api.get(`appointments/${id}`);
    return res.data;
}

const createAppointment = async(appointmentData) => {
    const res = await api.post(`appointments`, appointmentData);
    return res.data;
}

const updateAppointment = async(id,appointmentData) => {
    const res = await api.patch(`appointments/${id}`, appointmentData);
    return res.data;
}

const deleteAppointmentByID = async(id) => {
    const res = await api.delete(`appointments/${id}`);
    return res.data;
}

export {getAppointments, getAppointmentByID, createAppointment, updateAppointment, deleteAppointmentByID};