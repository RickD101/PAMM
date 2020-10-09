// get user details backend API call
const userDetails = async () => {
    try {
        const response = await fetch('/user', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin'
        });
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export default userDetails;