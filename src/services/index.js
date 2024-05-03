import http from './http';
//----------------------------------

export const login = async (payload) => {
  const { data } = await http.post(`/auth/login`, payload);
  return data;
};
export const register = async (payload) => {
  const { data } = await http.post(`/auth/register`, payload);
  return data;
};
export const forgetPassword = async (payload) => {
  const { data } = await http.post('/auth/forget-password', payload);
  return data;
};
export const resetPassword = async ({ newPassword, token }) => {
  const { data } = await http.post('/auth/reset-password', {
    newPassword: newPassword,
    token: token,
  });
  return data;
};
// users
export const searchUser = async (search) => {
  const { data } = await http.get(`users?search=${search || ''}`);
  return data;
};
export const getUserById = async (uid) => {
  const { data } = await http.get(`/users/${uid}`);
  return data;
};

// chats
export const createChat = async (payload) => {
  const { data } = await http.post('/chats', payload);
  return data;
};
export const getChatList = async () => {
  const { data } = await http.get('/chats');
  return data;
};
export const getChatById = async (cid) => {
  const { data } = await http.get(`/chats/${cid}`);
  return data;
};
// conversation
export const addMessage = async ({ chatId, ...payload }) => {
  const { data } = await http.post(`/conversations/${chatId}`, payload);
  return data;
};
export const getMessagesByChatId = async (chatId) => {
  const { data } = await http.get(`/conversations/${chatId}`);
  return data;
};
export const deleteMessage = async (cid) => {
  const { data } = await http.delete(`/conversations/${cid}`);
  return data;
};
// alert messages
export const createAlert = async (payload) => {
  const { data } = await http.post('/admin/alert', payload);
  return data;
};
export const getAlert = async () => {
  const { data } = await http.get('/alert');
  return data;
};
export const deleteAlertMessage = async (aid) => {
  const { data } = await http.delete(`/alert/${aid}`);
  return data;
};
export const updateAlertMessage = async (aid) => {
  const { data } = await http.put(`/alert/${aid}`, {
    status: 'saved',
  });
  return data;
};
// alert schedule messages
export const createScheduleMessage = async (payload) => {
  const { data } = await http.post('/schedule', payload);
  return data;
};
export const getScheduleMessages = async () => {
  const { data } = await http.get('/schedule');
  return data;
};
export const deleteScheduleMessage = async (sid) => {
  const { data } = await http.delete(`/schedule/${sid}`);
  return data;
};
export const getSingleScheduleMessage = async (sid) => {
  const { data } = await http.get(`/schedule/${sid}`);
  return data;
};
export const updateScheduleMessage = async ({ id, ...payload }) => {
  const { data } = await http.put(`/schedule/${id}`, payload);
  return data;
};
