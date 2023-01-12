const getResponse = (res) => res.ok ? res.json() : Promise.reject(res.status);

export default getResponse;