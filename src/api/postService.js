import axios from "axios";
import { SURV_URL } from "./survURL";

export async function sendSurvey(token, data, coords) {
    let survey = JSON.stringify(data)
    const URL = await SURV_URL()
    try {
        const response = await axios.post(`${URL}surveys/filled`, survey, {
            headers: {
                "Authorization":`Bearer ${token}`,
                //"Authorization":`Bearer token`,
                'Content-Type': 'application/json'
            },
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        if (response.status === 200 || response.status === 201) {
            console.log('response:\n' ,response);
            return response;
        }
    } catch (e) {
        if (e.response?.status === 400) {
            throw new Error(`Status: 400, Error: ${JSON.stringify(e.response?.data)}`);
        } else if (e.response?.status === 401) {
            throw new Error(`Status: 401, Error: ${JSON.stringify(e.response?.data)}`);
        }else if (e.response?.status === 404) {
            throw new Error(`Status: 404, Error: ${JSON.stringify(e.response?.data)}`);
        } else if (e.response?.status === 422) {
            throw new Error(`Status: 422, Error: ${JSON.stringify(e.response?.data)}`);
        } else if (e.response?.status === 500) {
            throw new Error(`Status: 500, Error: Internal server error`);
        } else {
            throw new Error("Something went wrong with app, please clear app's cache and reload app");
        }
    }
    throw new Error("Something wrong with sending survey");
}

export async function getToken(login, password) {
    try{
        const URL = await SURV_URL()
        const data = JSON.stringify({"login": login, "password": password})
        const resp = await axios.post(`${URL}auth/signin`, data, {
            headers: {
                'content-type': 'application/json'
            }
        })
        return resp;
    } catch (e) {
        console.log('error: \n' ,e);
        return e;
    }
}

export async function getSurveys(accessToken, coords) {
    try{
        const authStr = 'Bearer '+ accessToken
        const URL = await SURV_URL()
        const resp = await axios.get(`${URL}surveys`, { headers: { Authorization: authStr
                , latitude: coords.latitude, longitude: coords.longitude
        } })
        return resp
    } catch (e) {
        console.log(e)
        return e
    }
}
