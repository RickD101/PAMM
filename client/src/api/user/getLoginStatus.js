// get user status backend API call
const getLoginStatus = async () => {
    try {
        const response = await fetch('/user', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin'
        });
        const data = await response.json();
        return data.status;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export default getLoginStatus;