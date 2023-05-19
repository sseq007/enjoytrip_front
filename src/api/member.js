import { apiInstance } from "./index.js";
import axios from "axios";

const api = apiInstance();

async function login(user, success, fail) {
    await api.post(`/api/member/login`, JSON.stringify(user))
        .then(success).catch(fail);
}
async function findById(id, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.get(`/api/member/view/${id}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
    api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
    await api.post(`/api/member/refresh`, user).then(success).catch(fail);
}

async function logout(id, success, fail) {
    await api.get(`/api/member/logout/${id}`).then(success).catch(fail);
}

async function updateMember(user, success, fail) {
    axios.put('http://localhost:8081/api/member/modify', user, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(success).catch(fail);
}

async function deleteMember(id, success, fail){
    await api.delete(`/api/member/delete/${id}`).then(success).catch(fail);
}

async function registerMember(user, success, fail){
    await api.post(`/api/member/register`, JSON.stringify(user)).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout, updateMember, deleteMember, registerMember };

