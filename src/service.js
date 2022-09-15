import settings from "./settings";
import axios from "axios"
import cache from './cache'


const get = query => {
    return axios(settings.api + query, {
        headers: { Authorization: cache.token },
        method: 'GET',
    })

};


const getWithPage = (endpoint, page) => {

    const link = settings.api + endpoint + '?page=' + page;
    return axios(link, {
        headers: { Authorization: cache.token },
        method: 'GET',
    })

};

const postRegister = (endpoint, data) => {

    var data = JSON.stringify(data);
    var config = {
        method: 'post',
        url: settings.api + endpoint,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: data
    }
    return axios(config)

};

const postLogin = (endpoint, data) => {
    var data = JSON.stringify(data);
    var config = {
        method: 'post',
        url: settings.api + endpoint,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        data: data
    }
    return axios(config)

};


export { get, postRegister, postLogin, getWithPage }