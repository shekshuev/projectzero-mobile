import AsyncStorage from "@react-native-async-storage/async-storage";

export async function SURV_URL() {

    let IP = await AsyncStorage.getItem('IPserver');
    if(IP.indexOf('http') === -1)
        IP = "https://" + IP;
    try {
        const url = new URL (IP);
        url.protocol = "https:"
        if(url.username)
            url.username = '';
        if(url.password)
            url.password = '';
        if(!url.host)
            url.host = 'localhost:8080';
        url.pathname = '/api/v1.0/';
        url.search = '';
        url.hash = '';
        return url;
    }
    catch (e) {
        console.log(e)
    }

}
