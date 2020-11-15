import requests from '../../app/api';

export const all = () => requests.get('/api/videos').then(resp => resp.data.data);
export const upload = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return requests
    .post('/api/videos', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(resp => resp.data.data);
};

export const update = (id, data) => requests.put(`/api/videos/${id}`, data).then(resp => resp.data.data);
