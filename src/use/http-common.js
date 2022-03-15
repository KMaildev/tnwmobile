import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `https://tatnaywonproperty.com/api/`,
    // baseURL: `http://localhost/projects/tatnaywon/api/`,

})